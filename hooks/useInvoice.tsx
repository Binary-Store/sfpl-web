'use client';

import { useState } from 'react';
import { pdf } from '@react-pdf/renderer';
import InvoicePDF from '@/components/invoice/InvoicePDF';

export const useInvoice = () => {
  const [isGenerating, setIsGenerating] = useState(false);

  const generateInvoice = async (order: any) => {
    try {
      setIsGenerating(true);
      
      // Create PDF blob
      const blob = await pdf(<InvoicePDF order={order} />).toBlob();
      
      // Create download link
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = `invoice-${order.id.slice(-8)}.pdf`;
      
      // Trigger download
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      
      // Clean up
      URL.revokeObjectURL(url);
      
    } catch (error) {
      console.error('Error generating invoice:', error);
      throw error;
    } finally {
      setIsGenerating(false);
    }
  };

  return {
    generateInvoice,
    isGenerating,
  };
};
