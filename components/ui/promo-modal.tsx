"use client";
import { useState } from "react";
import { X, Tag, CreditCard } from "lucide-react";

interface PromoModalProps {
    isOpen: boolean;
    onClose: () => void;
    onProceed: (promoCode?: string) => void;
    isProcessing: boolean;
}

export default function PromoModal({ isOpen, onClose, onProceed, isProcessing }: PromoModalProps) {
    const [promoCode, setPromoCode] = useState("");
    const [selectedOption, setSelectedOption] = useState<"with-promo" | "without-promo">("without-promo");

    const handleProceed = () => {
        if (selectedOption === "with-promo" && promoCode.trim()) {
            onProceed(promoCode.trim());
        } else {
            onProceed();
        }
    };

    const handleClose = () => {
        setPromoCode("");
        setSelectedOption("without-promo");
        onClose();
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full max-h-[90vh] overflow-y-auto">
                {/* Header */}
                <div className="flex items-center justify-between p-6 border-b border-gray-200">
                    <h2 className="text-xl font-bold text-gray-900">Checkout Options</h2>
                    <button
                        onClick={handleClose}
                        className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                        disabled={isProcessing}
                    >
                        <X className="h-5 w-5 text-gray-500" />
                    </button>
                </div>

                {/* Content */}
                <div className="p-6 space-y-6">
                    <p className="text-gray-600 text-center">
                        Choose your checkout option below
                    </p>

                    {/* Option 1: Without Promo Code */}
                    <div 
                        className={`border-2 rounded-xl p-4 cursor-pointer transition-all ${
                            selectedOption === "without-promo" 
                                ? "border-red-500 bg-red-50" 
                                : "border-gray-200 hover:border-gray-300"
                        }`}
                        onClick={() => setSelectedOption("without-promo")}
                    >
                        <div className="flex items-center gap-3">
                            <div className={`w-4 h-4 rounded-full border-2 ${
                                selectedOption === "without-promo" 
                                    ? "border-red-500 bg-red-500" 
                                    : "border-gray-300"
                            }`}>
                                {selectedOption === "without-promo" && (
                                    <div className="w-full h-full rounded-full bg-white scale-50"></div>
                                )}
                            </div>
                            <div className="flex-1">
                                <div className="flex items-center gap-2">
                                    <CreditCard className="h-5 w-5 text-gray-600" />
                                    <h3 className="font-semibold text-gray-900">Proceed without promo code</h3>
                                </div>
                                <p className="text-sm text-gray-600 mt-1">
                                    Continue with regular pricing
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Option 2: With Promo Code */}
                    <div 
                        className={`border-2 rounded-xl p-4 cursor-pointer transition-all ${
                            selectedOption === "with-promo" 
                                ? "border-red-500 bg-red-50" 
                                : "border-gray-200 hover:border-gray-300"
                        }`}
                        onClick={() => setSelectedOption("with-promo")}
                    >
                        <div className="flex items-center gap-3">
                            <div className={`w-4 h-4 rounded-full border-2 ${
                                selectedOption === "with-promo" 
                                    ? "border-red-500 bg-red-500" 
                                    : "border-gray-300"
                            }`}>
                                {selectedOption === "with-promo" && (
                                    <div className="w-full h-full rounded-full bg-white scale-50"></div>
                                )}
                            </div>
                            <div className="flex-1">
                                <div className="flex items-center gap-2">
                                    <Tag className="h-5 w-5 text-gray-600" />
                                    <h3 className="font-semibold text-gray-900">Apply promo code</h3>
                                </div>
                                <p className="text-sm text-gray-600 mt-1">
                                    Enter your discount code
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Promo Code Input */}
                    {selectedOption === "with-promo" && (
                        <div className="space-y-2">
                            <label className="block text-sm font-medium text-gray-700">
                                Promo Code
                            </label>
                            <input
                                type="text"
                                value={promoCode}
                                onChange={(e) => setPromoCode(e.target.value.toUpperCase())}
                                placeholder="Enter your promo code"
                                maxLength={12}
                                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500 transition-colors"
                                disabled={isProcessing}
                            />
                            <p className="text-xs text-gray-500">
                                Enter your 12-character discount code to apply special pricing
                            </p>
                        </div>
                    )}
                </div>

                {/* Footer */}
                <div className="p-6 border-t border-gray-200 space-y-3">
                    <button
                        onClick={handleProceed}
                        disabled={isProcessing || (selectedOption === "with-promo" && (!promoCode.trim() || promoCode.length !== 12))}
                        className="w-full bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white font-bold py-3 px-6 rounded-xl transition-all duration-200 shadow-lg hover:shadow-xl transform hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                    >
                        {isProcessing ? (
                            <>
                                <div className="animate-spin rounded-full h-5 w-5 border-2 border-white border-t-transparent"></div>
                                Processing...
                            </>
                        ) : (
                            <>
                                <CreditCard className="h-5 w-5" />
                                Proceed to Payment
                            </>
                        )}
                    </button>
                    
                    <button
                        onClick={handleClose}
                        disabled={isProcessing}
                        className="w-full text-gray-600 hover:text-gray-800 font-medium py-2 transition-colors disabled:opacity-50"
                    >
                        Cancel
                    </button>
                </div>
            </div>
        </div>
    );
}
