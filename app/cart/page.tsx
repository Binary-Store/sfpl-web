"use client";
import { useGetCart, useAddToCart, useRemoveFromCart } from "@/hooks/useProducts";
import { useCreateOrder, useVerifyOrder } from "@/hooks/useOrder";
import { IndianRupee, Trash2, Plus, Minus, ShoppingCart, ArrowLeft, CreditCard } from "lucide-react";
import Link from "next/link";
import { useState, useEffect } from "react";
import { toast } from "react-hot-toast";
import { useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { serverDetails } from "@/config";

export default function CartPage() {
    const { data: cartItems, isLoading, error } = useGetCart();
    const { addToCartMutation, isLoading: isAddingToCart } = useAddToCart();
    const { removeFromCartMutation, isLoading: isRemovingFromCart } = useRemoveFromCart();
    const [updatingItems, setUpdatingItems] = useState(new Set());
    const [quantityInputs, setQuantityInputs] = useState<{ [key: string]: number }>({});
    const [isCheckoutLoading, setIsCheckoutLoading] = useState(false);
    const [isClient, setIsClient] = useState(false);
    const queryClient = useQueryClient();
    const router = useRouter();
    const { createOrderMutation, isLoading: isCreatingOrder } = useCreateOrder();
    const { verifyOrderMutation, isLoading: isVerifyingOrder } = useVerifyOrder();

    // Initialize quantity inputs when cart data loads
    useEffect(() => {
        if (cartItems && Array.isArray(cartItems)) {
            const initialQuantities: { [key: string]: number } = {};
            cartItems.forEach((item: any) => {
                initialQuantities[item.id] = item.quantity;
            });
            setQuantityInputs(initialQuantities);
        }
    }, [cartItems]);

    // Set client state to prevent hydration mismatch
    useEffect(() => {
        setIsClient(true);
    }, []);

    // Load Razorpay script
    useEffect(() => {
        if (isClient) {
            const script = document.createElement('script');
            script.src = 'https://checkout.razorpay.com/v1/checkout.js';
            script.async = true;
            document.body.appendChild(script);

            return () => {
                if (document.body.contains(script)) {
                    document.body.removeChild(script);
                }
            };
        }
    }, [isClient]);

    const handleQuantityChange = async (itemId: string, type: 'increase' | 'decrease') => {
        const currentItem = cartItems?.find(item => item.product_id === itemId);
        if (!currentItem) return;

        let newQuantity = currentItem.quantity;
        if (type === 'increase') {
            newQuantity = currentItem.quantity + 1;
        } else if (type === 'decrease') {
            newQuantity = Math.max(1, currentItem.quantity - 1);
        }
        
        if (newQuantity < 1) return;
        
        setUpdatingItems(prev => new Set(prev).add(itemId));
        
        // Call API to update quantity
        addToCartMutation({ product_id: itemId, quantity: newQuantity }, {
            onSuccess: () => {
                toast.success('Quantity updated successfully!');
                // Invalidate cart cache to refetch latest data
                queryClient.invalidateQueries({ queryKey: ['cart'] });
                // Update local quantity input state
                setQuantityInputs(prev => ({
                    ...prev,
                    [itemId]: newQuantity
                }));
                setUpdatingItems(prev => {
                    const newSet = new Set(prev);
                    newSet.delete(itemId);
                    return newSet;
                });
            },
            onError: () => {
                toast.error('Failed to update quantity');
                setUpdatingItems(prev => {
                    const newSet = new Set(prev);
                    newSet.delete(itemId);
                    return newSet;
                });
            }
        });
    };

    const handleDirectQuantityUpdate = async (itemId: string, newQuantity: number) => {
        if (newQuantity < 1) return;
        
        setUpdatingItems(prev => new Set(prev).add(itemId));
        
        addToCartMutation({ product_id: itemId, quantity: newQuantity }, {
            onSuccess: () => {
                toast.success('Quantity updated successfully!');
                queryClient.invalidateQueries({ queryKey: ['cart'] });
                // Update local quantity input state
                setQuantityInputs(prev => ({
                    ...prev,
                    [itemId]: newQuantity
                }));
                setUpdatingItems(prev => {
                    const newSet = new Set(prev);
                    newSet.delete(itemId);
                    return newSet;
                });
            },
            onError: () => {
                toast.error('Failed to update quantity');
                setUpdatingItems(prev => {
                    const newSet = new Set(prev);
                    newSet.delete(itemId);
                    return newSet;
                });
            }
        });
    };

    const handleDeleteItem = async (productId: string) => {
        removeFromCartMutation({ product_id: productId }, {
            onSuccess: () => {
                toast.success('Item removed from cart successfully!');
                // Invalidate cart cache to refetch latest data
                queryClient.invalidateQueries({ queryKey: ['cart'] });
            },
            onError: () => {
                toast.error('Failed to remove item from cart');
            }
        });
    };

    const handleCheckout = async () => {
        if (!cartItems || cartItems.length === 0) {
            toast.error('Cart is empty');
            return;
        }

        setIsCheckoutLoading(true);

        try {
            createOrderMutation({}, {
                onSuccess: (response: any) => {
                    const orderId = response.id;
                    
                    if (!orderId) {
                        toast.error('Failed to create order');
                        setIsCheckoutLoading(false);
                        return;
                    }
                    const options = {
                        key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID || 'rzp_test_YOUR_KEY',
                        amount: (calculateTotal() * 1.18 * 100), // Convert to paise and add tax
                        currency: 'INR',
                        name: 'SFPL Fire Safety',
                        description: 'Fire Safety Products',
                        order_id: orderId,
                        handler: function (response: any) {
                            verifyOrderMutation({
                                razorpay_order_id: response.razorpay_order_id,
                                razorpay_payment_id: response.razorpay_payment_id,
                                razorpay_signature: response.razorpay_signature
                            }, {
                                onSuccess: () => {
                                    toast.success('Payment successful! Order verified.');
                                    queryClient.invalidateQueries({ queryKey: ['cart'] });
                                    router.push('/dashboard/orders');
                                },
                                onError: () => {
                                    toast.error('Payment verification failed');
                                }
                            });
                        },
                        prefill: {
                            name: 'Customer Name',
                            email: 'customer@example.com',
                            contact: '9999999999'
                        },
                        theme: {
                            color: '#DC2626' // Red color matching your theme
                        }
                    };

                    const razorpay = new (window as any).Razorpay(options);
                    razorpay.open();
                    setIsCheckoutLoading(false);
                },
                onError: () => {
                    toast.error('Failed to create order');
                    setIsCheckoutLoading(false);
                }
            });
        } catch (error) {
            toast.error('Checkout failed');
            setIsCheckoutLoading(false);
        }
    };

    const calculateTotal = () => {
        if (!cartItems || !Array.isArray(cartItems)) return 0;
        return cartItems.reduce((total, item) => total + (item.price * item.quantity), 0);
    };

    // Show loading state only on client side to prevent hydration mismatch
    if (!isClient || isLoading) {
        return (
            <div className="min-h-screen bg-gray-50 flex items-center justify-center">
                <div className="text-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-4 border-red-500 border-t-transparent mx-auto mb-4"></div>
                    <p className="text-gray-600">Loading cart...</p>
                </div>
            </div>
        );
    }

    if (error || !cartItems || cartItems.length === 0) {
        return (
            <div className="min-h-screen bg-gray-50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                    <div className="text-center">
                        <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
                            <ShoppingCart className="h-12 w-12 text-gray-400" />
                        </div>
                        <h2 className="text-2xl font-bold text-gray-900 mb-4">Your cart is empty</h2>
                        <p className="text-gray-600 mb-8">Looks like you haven't added any products to your cart yet.</p>
                        <Link 
                            href="/products"
                            className="inline-flex items-center bg-red-600 hover:bg-red-700 text-white font-bold py-3 px-6 rounded-lg transition-colors"
                        >
                            <ArrowLeft className="h-4 w-4 mr-2" />
                            Continue Shopping
                        </Link>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50 p-2">
            <div className="max-w-7xl mx-auto space-y-2">
                {/* Header */}
                <div className="mb-4">
                    <Link 
                        href="/products"
                        className="inline-flex items-center text-gray-600 hover:text-red-600 transition-colors mb-4"
                    >
                        <ArrowLeft className="h-4 w-4 mr-2" />
                        Back to Services
                    </Link>
                    <h1 className="text-3xl font-bold text-gray-900">Shopping Cart</h1>
                    <p className="text-gray-600 mt-2">You have {cartItems?.length || 0} item{(cartItems?.length || 0) !== 1 ? 's' : ''} in your cart</p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
                    {/* Cart Items */}
                    <div className="lg:col-span-2">
                        <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden">
                            <div className="p-4 border-b border-gray-100">
                                <h2 className="text-xl font-semibold text-gray-900">Cart Items</h2>
                            </div>
                            <div className="p-4">
                                {cartItems && cartItems.length > 0 ? (
                                    <div className="space-y-2">
                                        {cartItems?.map((item) => (
                                            <div key={item.id} className="flex items-start gap-4 p-4 border border-gray-100 rounded-xl">
                                                <div className="w-16 h-16 bg-gray-100 rounded-xl flex items-center justify-center flex-shrink-0">
                                                    <img 
                                                        src={`${serverDetails.socketPath}/files/${item?.photo_url}`} 
                                                        alt={item?.name}
                                                        className="w-full h-16 object-cover rounded-xl"
                                                    />
                                                </div>

                                                <div className="flex-1 min-w-0">
                                                    <h3 className="text-lg font-semibold text-gray-900 mb-2 capitalize">
                                                        {item.name}
                                                    </h3>
                                                    <p className="text-gray-600 text-sm mb-3 line-clamp-2">
                                                        {item.description}
                                                    </p>
                                                    
                                                    <div className="flex items-center justify-between">
                                                        <div className="flex items-center gap-2">
                                                            <span className="text-sm text-gray-500">Quantity:</span>
                                                            <span className="font-semibold text-gray-900">{item.quantity}</span>
                                                        </div>
                                                        <div className="flex items-center gap-2">
                                                            <IndianRupee className="w-4 h-4 text-green-600" />
                                                            <span className="text-lg font-bold text-green-600">
                                                                {(item.price * item.quantity / 100).toLocaleString()}
                                                            </span>
                                                        </div>
                                                    </div>

                                                    {/* Quantity Controls */}
                                                    <div className="flex items-center gap-3 mt-3">
                                                        <div className="flex items-center gap-2">
                                                            <button
                                                                onClick={() => handleQuantityChange(item.product_id, 'decrease')}
                                                                disabled={updatingItems.has(item.id) || item.quantity <= 1}
                                                                className="w-8 h-8 rounded-lg border border-gray-200 flex items-center justify-center hover:border-red-500 hover:bg-red-50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                                                            >
                                                                <Minus className="h-4 w-4 text-gray-600" />
                                                            </button>
                                                            
                                                            <input
                                                                type="number"
                                                                min="1"
                                                                value={quantityInputs[item.id] !== undefined ? quantityInputs[item.product_id] : item.quantity}
                                                                onChange={(e) => {
                                                                    const newQty = parseInt(e.target.value) || 1;
                                                                    setQuantityInputs(prev => ({
                                                                        ...prev,
                                                                        [item.id]: newQty
                                                                    }));
                                                                }}
                                                                onBlur={(e) => {
                                                                    const newQty = parseInt(e.target.value) || 1;
                                                                    if (newQty >= 1 && newQty !== item.quantity) {
                                                                        handleDirectQuantityUpdate(item.product_id, newQty);
                                                                    }
                                                                }}
                                                                onKeyDown={(e) => {
                                                                    if (e.key === 'Enter') {
                                                                        const newQty = parseInt(e.currentTarget.value) || 1;
                                                                        if (newQty >= 1 && newQty !== item.quantity) {
                                                                            handleDirectQuantityUpdate(item.product_id, newQty);
                                                                        }
                                                                        e.currentTarget.blur();
                                                                    }
                                                                }}
                                                                className="w-16 h-8 text-center border border-gray-200 rounded-lg focus:border-red-500 focus:ring-1 focus:ring-red-500 text-lg font-semibold text-gray-900"
                                                                disabled={updatingItems.has(item.id)}
                                                            />
                                                            
                                                            <button
                                                                onClick={() => handleQuantityChange(item.product_id, 'increase')}
                                                                disabled={updatingItems.has(item.id)}
                                                                className="w-8 h-8 rounded-lg border border-gray-200 flex items-center justify-center hover:border-red-500 hover:bg-red-50 transition-colors"
                                                            >
                                                                <Plus className="h-4 w-4 text-gray-600" />
                                                            </button>
                                                        </div>

                                                        {/* Delete Button */}
                                                        <button
                                                            onClick={() => handleDeleteItem(item.id)}
                                                            className="w-8 h-8 rounded-lg border border-red-200 flex items-center justify-center hover:border-red-500 hover:bg-red-50 transition-colors"
                                                        >
                                                            <Trash2 className="h-4 w-4 text-red-600" />
                                                        </button>
                                                    </div>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                ) : (
                                    <div className="text-center py-4">
                                        <ShoppingCart className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                                        <p className="text-gray-600">No items in cart</p>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>

                    {/* Order Summary */}
                    <div className="lg:col-span-1">
                        <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-4 sticky top-4">
                            <h2 className="text-xl font-semibold text-gray-900 mb-4">Order Summary</h2>
                            
                            <div className="space-y-2 mb-4">
                                <div className="flex justify-between text-gray-600">
                                    <span>Subtotal ({cartItems?.length || 0} items)</span>
                                    <span>₹{calculateTotal() / 100}</span>
                                </div>
                                <div className="flex justify-between text-gray-600">
                                    <span>Shipping</span>
                                    <span className="text-green-600">Free</span>
                                </div>
                                <div className="flex justify-between text-gray-600">
                                    <span>Tax</span>
                                    <span>₹{(calculateTotal() * 0.18 / 100)}</span>
                                </div>
                                <div className="border-t border-gray-200 pt-4">
                                    <div className="flex justify-between text-lg font-bold text-gray-900">
                                        <span>Total</span>
                                        <span>₹{(calculateTotal() * 1.18 / 100)}</span>
                                    </div>
                                </div>
                            </div>

                            <button 
                                onClick={handleCheckout}
                                disabled={isCheckoutLoading || isCreatingOrder || !cartItems || cartItems.length === 0}
                                className="w-full bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white font-bold py-4 px-6 rounded-xl text-lg transition-all duration-200 shadow-lg hover:shadow-xl transform hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                            >
                                {isCheckoutLoading || isCreatingOrder ? (
                                    <>
                                        <div className="animate-spin rounded-full h-5 w-5 border-2 border-white border-t-transparent"></div>
                                        Processing...
                                    </>
                                ) : (
                                    <>
                                        <CreditCard className="h-5 w-5" />
                                        Proceed to Checkout
                                    </>
                                )}
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}