import {
  Button,
  Table,
  TableBody,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
  Text,
  alert,
  cn,
} from '@nativebricks/core';
import { FlashList } from '@shopify/flash-list';
import { useMemo, useState, useCallback, useRef, forwardRef } from 'react';
import { Alert, ScrollView, View, useWindowDimensions } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

const INVOICES = [
  {
    invoice: 'INV001',
    paymentStatus: 'Paid',
    totalAmount: '$250.00',
    paymentMethod: 'Credit Card',
  },
];

const MIN_COLUMN_WIDTHS = [50, 80, 50, 120];

export default function TablePage() {
  const { width } = useWindowDimensions();
  const insets = useSafeAreaInsets();

  const columnWidths = useMemo(() => {
    return MIN_COLUMN_WIDTHS.map((minWidth, index) => {
      return minWidth;
    });
  }, [width]);

  return (
    <ScrollView
      horizontal
      bounces={false}
      showsHorizontalScrollIndicator={false}
      className="container"
      contentContainerClassName="min-w-full"
    >
      <Table aria-labelledby="invoice-table" className="min-w-full">
        <TableHeader>
          <TableRow>
            <TableHead className="px-0.5" style={{ minWidth: columnWidths[0] }}>
              <Text className="text-sm font-medium">Invoice</Text>
            </TableHead>
            <TableHead style={{ minWidth: columnWidths[1] }}>
              <Text className="text-sm font-medium">Status</Text>
            </TableHead>
            <TableHead style={{ minWidth: columnWidths[2] }}>
              <Text className="text-sm font-medium">Method</Text>
            </TableHead>
            <TableHead style={{ minWidth: columnWidths[3] }}>
              <Text className="text-center md:text-right md:pr-5 font-medium text-sm">Amount</Text>
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          <FlashList
            data={INVOICES}
            estimatedItemSize={45}
            contentContainerStyle={{
              paddingBottom: insets.bottom,
            }}
            extraData={[width]}
            showsVerticalScrollIndicator={false}
            renderItem={({ item: invoice, index }) => {
              return (
                <TableRow
                  key={invoice.invoice}
                  className={cn('active:bg-secondary', index % 2 && 'bg-muted/40 ')}
                >
                  <TableCell style={{ minWidth: columnWidths[0] }}>
                    <Text className="text-sm ">{invoice.invoice}</Text>
                  </TableCell>
                  <TableCell style={{ minWidth: columnWidths[1] }}>
                    <Text className="text-sm ">{invoice.paymentStatus}</Text>
                  </TableCell>
                  <TableCell style={{ minWidth: columnWidths[2] }}>
                    <Text className="text-sm ">{invoice.paymentMethod}</Text>
                  </TableCell>
                  <TableCell style={{ minWidth: columnWidths[3] }} className="items-end ">
                    <Button
                      variant="secondary"
                      size="sm"
                      className="shadow-sm shadow-foreground/10 mr-3"
                      onPress={() => {
                        alert({
                          title: invoice.totalAmount,
                          description: `You pressed the price button on invoice ${invoice.invoice}.`,
                        });
                      }}
                    >
                      <Text>{invoice.totalAmount}</Text>
                    </Button>
                  </TableCell>
                </TableRow>
              );
            }}
            ListFooterComponent={() => {
              return (
                <>
                  <TableFooter>
                    <TableRow>
                      <TableCell className="flex-1 justify-center">
                        <Text className="text-foreground text-sm">Total</Text>
                      </TableCell>
                      <TableCell className="items-end pr-8">
                        <Button
                          size="sm"
                          variant="ghost"
                          onPress={() => {
                            Alert.alert(
                              'Total Amount',
                              `You pressed the total amount price button.`
                            );
                            alert({
                              title: 'Total Amount',
                              description: `You pressed the total amount price button`,
                            });
                          }}
                        >
                          <Text>$2,500.00</Text>
                        </Button>
                      </TableCell>
                    </TableRow>
                  </TableFooter>
                  <View className="items-center py-3 ios:pb-0">
                    <Text
                      nativeID="invoice-table"
                      className="items-center text-sm text-muted-foreground"
                    >
                      A list of your recent invoices.
                    </Text>
                  </View>
                </>
              );
            }}
          />
        </TableBody>
      </Table>
    </ScrollView>
  );
}
