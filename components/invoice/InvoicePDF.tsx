"use client";

import React from "react";
import {
  Document,
  Page,
  Text,
  View,
  StyleSheet,
  Image,
} from "@react-pdf/renderer";

// Create styles
const styles = StyleSheet.create({
  page: {
    flexDirection: "column",
    backgroundColor: "#FFFFFF",
    padding: 20,
    fontFamily: "Helvetica",
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 15,
    paddingBottom: 15,
    borderBottomWidth: 2,
    borderBottomColor: "#DC2626",
  },
  logo: {
    width: 160,
  },
  companyInfo: {
    flexDirection: "column",
  },
  companyName: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#DC2626",
    marginBottom: 5,
  },
  gstin: {
    fontSize: 10,
    color: "#6B7280",
    marginTop: 5,
    lineHeight: 1.4,
  },
  companyAddress: {
    fontSize: 10,
    color: "#6B7280",
    marginTop: 10,
    lineHeight: 1.4,
  },
  invoiceInfo: {
    flexDirection: "column",
    alignItems: "flex-end",
  },
  invoiceTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#1F2937",
    marginBottom: 10,
  },
  invoiceNumber: {
    fontSize: 12,
    color: "#6B7280",
    marginBottom: 5,
  },
  invoiceDate: {
    fontSize: 12,
    color: "#6B7280",
  },
  customerInfo: {
    marginBottom: 20,
    padding: 12,
    backgroundColor: "#F9FAFB",
    borderRadius: 8,
  },
  sectionTitle: {
    fontSize: 12,
    fontWeight: "bold",
    color: "#1F2937",
    marginBottom: 6,
  },
  customerRow: {
    fontSize: 10,
    color: "#374151",
    lineHeight: 1.4,
    marginBottom: 2,
  },
  customerLabel: {
    fontSize: 10,
    color: "#6B7280",
    marginRight: 4,
    fontWeight: "bold",
  },
  customerValue: {
    fontSize: 10,
    color: "#111827",
  },
  itemsTable: {
    marginBottom: 30,
  },
  tableHeader: {
    flexDirection: "row",
    backgroundColor: "#F3F4F6",
    padding: 10,
    borderRadius: 4,
    marginBottom: 5,
  },
  tableRow: {
    flexDirection: "row",
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#E5E7EB",
  },
  col1: {
    width: "40%",
    fontSize: 10,
  },
  col2: {
    width: "15%",
    fontSize: 10,
    textAlign: "center",
  },
  col3: {
    width: "20%",
    fontSize: 10,
    textAlign: "right",
  },
  col4: {
    width: "25%",
    fontSize: 10,
    textAlign: "right",
  },
  headerText: {
    fontWeight: "bold",
    color: "#1F2937",
  },
  productName: {
    fontWeight: "bold",
    color: "#1F2937",
    marginBottom: 3,
  },
  productDescription: {
    color: "#6B7280",
    fontSize: 9,
  },
  summary: {
    flexDirection: "row",
    justifyContent: "flex-end",
    marginTop: 20,
  },
  summaryTable: {
    width: "50%",
  },
  summaryRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 8,
    fontSize: 11,
  },
  summaryTotal: {
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 12,
    backgroundColor: "#F3F4F6",
    fontSize: 12,
    fontWeight: "bold",
    borderTopWidth: 2,
    borderTopColor: "#DC2626",
  },
  footer: {
    marginTop: 40,
    paddingTop: 20,
    borderTopWidth: 1,
    borderTopColor: "#E5E7EB",
    textAlign: "center",
  },
  footerText: {
    fontSize: 9,
    color: "#6B7280",
    lineHeight: 1.4,
  },
  // Info page styles
  infoContainer: {
    marginTop: 10,
  },
  infoTitle: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#1F2937",
    marginBottom: 10,
  },
  infoDivider: {
    height: 2,
    backgroundColor: "#DC2626",
    marginBottom: 10,
  },
  infoSectionTitle: {
    fontSize: 12,
    fontWeight: "bold",
    color: "#1F2937",
    marginBottom: 6,
    marginTop: 10,
  },
  infoParagraph: {
    fontSize: 10,
    color: "#374151",
    lineHeight: 1.4,
    marginBottom: 4,
  },
  infoListItem: {
    fontSize: 10,
    color: "#374151",
    lineHeight: 1.4,
    marginBottom: 3,
  },
  statusBadge: {
    padding: 4,
    borderRadius: 4,
    fontSize: 9,
    fontWeight: "bold",
    textAlign: "center",
    marginTop: 5,
  },
  statusPaid: {
    backgroundColor: "#D1FAE5",
    color: "#065F46",
  },
  statusPending: {
    backgroundColor: "#FEF3C7",
    color: "#92400E",
  },
});

interface InvoicePDFProps {
  order: any;
}

const InvoicePDF: React.FC<InvoicePDFProps> = ({ order }) => {
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      minimumFractionDigits: 0,
    }).format(amount / 100);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-IN", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        {/* Header */}
        <View style={styles.header}>
          <View style={styles.companyInfo}>
            {/* Company Logo */}
            {/* eslint-disable-next-line jsx-a11y/alt-text */}
            <Image style={styles.logo} src="/logo-full-black.png" />
            <Text style={styles.companyAddress}>
              10TH FLOOR, OFFICE NO 1005, THE SPIRE, 150 FEET RING ROAD, {"\n"}
              NR SHEETAL PARK CIRCLE RAJKOT
            </Text>
            <Text style={styles.gstin}>GSTIN: 24ABCS2003B1ZZ{"\n"}</Text>
            <Text style={styles.gstin}>State Name: Gujarat, Code: 24</Text>
          </View>
          <View style={styles.invoiceInfo}>
            <Text style={styles.invoiceTitle}>INVOICE</Text>
            <Text style={styles.invoiceNumber}>Invoice : #{order.serial}</Text>
            <Text style={styles.invoiceDate}>
              Date: {formatDate(order.created_at)}
            </Text>
          </View>
        </View>

        {/* Customer Information */}
        <View style={styles.customerInfo}>
          <Text style={styles.sectionTitle}>Bill To</Text>
          <View>
            <Text style={styles.customerRow}>
              <Text style={styles.customerLabel}>Name: </Text>
              <Text style={styles.customerValue}>
                {order.customer_name || "N/A"}
              </Text>
            </Text>
            <Text style={styles.customerRow}>
              <Text style={styles.customerLabel}>GSTIN: </Text>
              <Text style={styles.customerValue}>
                {order.customer_gstin || "N/A"}
              </Text>
            </Text>
            <Text style={styles.customerRow}>
              <Text style={styles.customerLabel}>Address: </Text>
              <Text style={styles.customerValue}>
                {order.customer_address || "N/A"}
              </Text>
            </Text>
          </View>
        </View>

        {/* Items Table */}
        <View style={styles.itemsTable}>
          <View style={styles.tableHeader}>
            <Text style={[styles.col1, styles.headerText]}>Product</Text>
            <Text style={[styles.col2, styles.headerText]}>Qty</Text>
            <Text style={[styles.col3, styles.headerText]}>Unit Price</Text>
            <Text style={[styles.col4, styles.headerText]}>Total</Text>
          </View>

          {order.items &&
            order.items.map((items: any, index: number) => (
              <View key={index} style={styles.tableRow}>
                <View style={styles.col1}>
                  <Text style={styles.productName}>{items.name}</Text>
                  <Text style={styles.productDescription}>
                    {items.description}
                  </Text>
                </View>
                <Text style={styles.col2}>{items.quantity}</Text>
                <Text style={styles.col3}>{formatCurrency(items.price)}</Text>
                <Text style={styles.col4}>
                  {formatCurrency(items.price * items.quantity)}
                </Text>
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
            Thank you for choosing SFPL Fire Safety for your fire safety needs.
            {"\n"}
            For any queries regarding this invoice, please contact us at
            info@sfpl.com{"\n"}
            This is a computer-generated invoice and does not require a
            signature.
          </Text>
        </View>
      </Page>
      {/* Info Page */}
      <Page size="A4" style={styles.page}>
        <View style={styles.infoContainer}>
          <Text style={styles.infoTitle}>Important Information</Text>
          <View style={styles.infoDivider} />

          {/* Terms & Conditions */}
          <Text style={styles.infoSectionTitle}>Terms & Conditions</Text>
          <Text style={styles.infoParagraph}>
            - Prices are in INR and inclusive of applicable taxes unless stated
            otherwise.
          </Text>
          <Text style={styles.infoParagraph}>
            - Payment confirms acceptance of these terms. Products remain
            property of SFPL until full payment is received.
          </Text>
          <Text style={styles.infoParagraph}>
            - Warranty, if applicable, is as per manufacturer terms.
          </Text>

          {/* Order & Shipping */}
          <Text style={styles.infoSectionTitle}>Order & Shipping</Text>
          <Text style={styles.infoParagraph}>
            - Dispatch timelines depend on stock availability and may vary.
          </Text>
          <Text style={styles.infoParagraph}>
            - Shipping charges and transit times are estimated; delays due to
            logistics are beyond our control.
          </Text>
          <Text style={styles.infoParagraph}>
            - Inspect packages upon delivery and report transit damage within 48
            hours.
          </Text>

          {/* Return & Refund */}
          <Text style={styles.infoSectionTitle}>Return & Refund</Text>
          <Text style={styles.infoParagraph}>
            - Returns are accepted only for unused items in original packaging
            within 7 days of delivery, unless otherwise specified.
          </Text>
          <Text style={styles.infoParagraph}>
            - Refunds (if approved) are processed to the original payment method
            within 7-10 business days after inspection.
          </Text>
          <Text style={styles.infoParagraph}>
            - Custom or special-order items are non-returnable.
          </Text>
        </View>
      </Page>
    </Document>
  );
};

export default InvoicePDF;
