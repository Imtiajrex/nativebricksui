import { DataTable } from '@nativebricks/core';
import React from 'react';
import { View } from 'react-native';

export default function DataTablePage() {
  return (
    <View className="container">
      <View>
        <DataTable
          data={[
            {
              invoice: 'INV001',
              paymentStatus: 'Paid',
              totalAmount: '$250.00',
              paymentMethod: 'Credit Card',
            },
            {
              invoice: 'INV002',
              paymentStatus: 'Pending',
              totalAmount: '$250.00',
              paymentMethod: 'Credit Card',
            },
            {
              invoice: 'INV003',
              paymentStatus: 'Cancelled',
              totalAmount: '$250.00',
              paymentMethod: 'Credit Card',
            },
            {
              invoice: 'INV003',
              paymentStatus: 'Pending',
              totalAmount: '$250.00',
              paymentMethod: 'Credit Card',
            },
          ]}
          columns={[
            {
              accessor: (item) => item.invoice,
              label: 'Invoice ID',
            },
            {
              accessor: (item) => item.paymentStatus,
              label: 'Status',
            },
            {
              accessor: (item) => item.paymentMethod,
              label: 'Method',
              cellTextClassName: 'font-bold text-primary',
            },
            {
              accessor: (item) => item.totalAmount,
              label: 'Amount',
            },
          ]}
          bodyRowClassName="odd:bg-card"
        />
      </View>
    </View>
  );
}
