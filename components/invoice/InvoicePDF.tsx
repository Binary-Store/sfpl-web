'use client';

import React from 'react';
import { Document, Page, Text, View, StyleSheet, Image } from '@react-pdf/renderer';

// Create styles
const styles = StyleSheet.create({
  page: {
    flexDirection: 'column',
    backgroundColor: '#FFFFFF',
    padding: 30,
    fontFamily: 'Helvetica',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 30,
    paddingBottom: 20,
    borderBottomWidth: 2,
    borderBottomColor: '#DC2626',
  },
  companyInfo: {
    flexDirection: 'column',
  },
  companyName: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#DC2626',
    marginBottom: 5,
  },
  companyAddress: {
    fontSize: 10,
    color: '#6B7280',
    lineHeight: 1.4,
  },
  invoiceInfo: {
    flexDirection: 'column',
    alignItems: 'flex-end',
  },
  invoiceTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#1F2937',
    marginBottom: 10,
  },
  invoiceNumber: {
    fontSize: 12,
    color: '#6B7280',
    marginBottom: 5,
  },
  invoiceDate: {
    fontSize: 12,
    color: '#6B7280',
  },
  customerInfo: {
    marginBottom: 30,
    padding: 20,
    backgroundColor: '#F9FAFB',
    borderRadius: 8,
  },
  sectionTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#1F2937',
    marginBottom: 10,
  },
  customerDetails: {
    fontSize: 11,
    color: '#374151',
    lineHeight: 1.5,
  },
  itemsTable: {
    marginBottom: 30,
  },
  tableHeader: {
    flexDirection: 'row',
    backgroundColor: '#F3F4F6',
    padding: 10,
    borderRadius: 4,
    marginBottom: 5,
  },
  tableRow: {
    flexDirection: 'row',
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#E5E7EB',
  },
  col1: {
    width: '40%',
    fontSize: 10,
  },
  col2: {
    width: '15%',
    fontSize: 10,
    textAlign: 'center',
  },
  col3: {
    width: '20%',
    fontSize: 10,
    textAlign: 'right',
  },
  col4: {
    width: '25%',
    fontSize: 10,
    textAlign: 'right',
  },
  headerText: {
    fontWeight: 'bold',
    color: '#1F2937',
  },
  productName: {
    fontWeight: 'bold',
    color: '#1F2937',
    marginBottom: 3,
  },
  productDescription: {
    color: '#6B7280',
    fontSize: 9,
  },
  summary: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    marginTop: 20,
  },
  summaryTable: {
    width: '50%',
  },
  summaryRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 8,
    fontSize: 11,
  },
  summaryTotal: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 12,
    backgroundColor: '#F3F4F6',
    fontSize: 12,
    fontWeight: 'bold',
    borderTopWidth: 2,
    borderTopColor: '#DC2626',
  },
  footer: {
    marginTop: 40,
    paddingTop: 20,
    borderTopWidth: 1,
    borderTopColor: '#E5E7EB',
    textAlign: 'center',
  },
  footerText: {
    fontSize: 9,
    color: '#6B7280',
    lineHeight: 1.4,
  },
  statusBadge: {
    padding: 4,
    borderRadius: 4,
    fontSize: 9,
    fontWeight: 'bold',
    textAlign: 'center',
    marginTop: 5,
  },
  statusPaid: {
    backgroundColor: '#D1FAE5',
    color: '#065F46',
  },
  statusPending: {
    backgroundColor: '#FEF3C7',
    color: '#92400E',
  },
});

interface InvoicePDFProps {
  order: any;
}

const InvoicePDF: React.FC<InvoicePDFProps> = ({ order }) => {
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      minimumFractionDigits: 0
    }).format(amount / 100);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-IN', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        {/* Header */}
        <View style={styles.header}>
          <View style={styles.companyInfo}>
            <Text style={styles.companyName}>SFPL Fire Safety</Text>
            <Text style={styles.companyAddress}>
              Fire Safety Equipment & Solutions{'\n'}
              Mumbai, Maharashtra, India{'\n'}
              Email: info@sfpl.com{'\n'}
              Phone: +91 98765 43210
            </Text>
          </View>
          <View style={styles.invoiceInfo}>
            <Text style={styles.invoiceTitle}>INVOICE</Text>
            <Text style={styles.invoiceNumber}>Invoice #: {order.id.slice(-8)}</Text>
            <Text style={styles.invoiceDate}>Date: {formatDate(order.created_at)}</Text>
          </View>
        </View>

        {/* Customer Information */}
        <View style={styles.customerInfo}>
          <Text style={styles.sectionTitle}>Bill To:</Text>
          <Text style={styles.customerDetails}>
            Customer ID: {order.customer_id.slice(-8)}{'\n'}
            Order Status: {order.status.toUpperCase()}{'\n'}
            Payment Status: {order.is_paid ? 'PAID' : 'PENDING'}
          </Text>
        </View>

        {/* Items Table */}
        <View style={styles.itemsTable}>
          <View style={styles.tableHeader}>
            <Text style={[styles.col1, styles.headerText]}>Product</Text>
            <Text style={[styles.col2, styles.headerText]}>Qty</Text>
            <Text style={[styles.col3, styles.headerText]}>Unit Price</Text>
            <Text style={[styles.col4, styles.headerText]}>Total</Text>
          </View>
          
          {order.products && order.products.map((product: any, index: number) => (
            <View key={index} style={styles.tableRow}>
              <View style={styles.col1}>
                <Text style={styles.productName}>{product.name}</Text>
                <Text style={styles.productDescription}>{product.description}</Text>
              </View>
              <Text style={styles.col2}>{product.quantity}</Text>
              <Text style={styles.col3}>{formatCurrency(product.price)}</Text>
              <Text style={styles.col4}>{formatCurrency(product.price * product.quantity)}</Text>
            </View>
          ))}
        </View>

        {/* Summary */}
        <View style={styles.summary}>
          <View style={styles.summaryTable}>
            <View style={styles.summaryRow}>
              <Text>Sub Total:</Text>
              <Text>{formatCurrency(order.sub_total)}</Text>
            </View>
            <View style={styles.summaryRow}>
              <Text>GST ({order.gst_percentage}%):</Text>
              <Text>{formatCurrency(order.gst_amount)}</Text>
            </View>
            <View style={styles.summaryTotal}>
              <Text>Total Amount:</Text>
              <Text>{formatCurrency(order.total)}</Text>
            </View>
          </View>
        </View>

        {/* Footer */}
        <View style={styles.footer}>
          <Text style={styles.footerText}>
            Thank you for choosing SFPL Fire Safety for your fire safety needs.{'\n'}
            For any queries regarding this invoice, please contact us at info@sfpl.com{'\n'}
            This is a computer-generated invoice and does not require a signature.
          </Text>
        </View>
      </Page>
    </Document>
  );
};

export default InvoicePDF;
