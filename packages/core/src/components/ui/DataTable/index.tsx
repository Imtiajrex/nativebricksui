import { FlashList } from '@shopify/flash-list';
import * as React from 'react';
import { ScrollView, useWindowDimensions } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import {
  Table,
  TableBody,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
  Text,
} from '~/base';
import { cn } from '~/lib/utils';

const MIN_COLUMN_WIDTHS = [120, 120, 100, 120];
export type ColumnType<TData extends Record<string, any>> = {
  accessor: (item: TData) => any;
  label: string;
  headClassName?: string;
  headTextClassName?: string;
  cellClassName?: string;
  cellTextClassName?: string;
};
type ClassNames = {
  headRowClassName?: string;
  headColumnClassName?: string;
  headColumnTextClassName?: string;
  bodyRowClassName?: string;
  bodyColumnClassName?: string;
  bodyColumnTextClassName?: string;
};

export type DataTableProps<TData extends Record<string, any>> = {
  minColumnWidths?: number[];
  data: TData[];
  columns: ColumnType<TData>[];
} & ClassNames;
export function DataTable<TData extends Record<string, any>>(props: DataTableProps<TData>) {
  const { width } = useWindowDimensions();
  const insets = useSafeAreaInsets();

  const columnWidths = React.useMemo(() => {
    if (!props.minColumnWidths) {
      return props.columns.map((_) => {
        return width / props.columns.length;
      });
    }
    return props.columns?.map((_, index) => {
      const minWidth = props.minColumnWidths[index];
      const evenWidth = width / MIN_COLUMN_WIDTHS.length;
      return evenWidth > minWidth ? evenWidth : minWidth;
    });
  }, [width]);
  const oddClassName = useNthClassNames('odd', props.bodyRowClassName);
  const evenClassName = useNthClassNames('even', props.bodyRowClassName);
  const oddEvenRemovedClassName = props.bodyRowClassName
    .split(' ')
    .filter((c) => !c.includes('odd') && !c.includes('even'))
    .join(' ');
  return (
    <ScrollView horizontal bounces={false} showsHorizontalScrollIndicator={false}>
      <Table aria-labelledby="invoice-table">
        <TableHeader>
          <TableRow className={cn(props.headRowClassName)}>
            {props.columns.map((col, index) => {
              return (
                <TableHead
                  className={cn('px-0.5', props.headColumnClassName, col.headClassName)}
                  style={{ width: columnWidths[index] }}
                  key={`head-${index}`}
                >
                  <Text
                    className={cn(
                      'text-sm font-medium',
                      props.headColumnTextClassName,
                      col.headTextClassName
                    )}
                  >
                    {col.label}
                  </Text>
                </TableHead>
              );
            })}
          </TableRow>
        </TableHeader>
        <TableBody>
          <FlashList
            data={props.data}
            estimatedItemSize={45}
            contentContainerStyle={{
              paddingBottom: insets.bottom,
            }}
            extraData={[oddClassName, evenClassName]}
            showsVerticalScrollIndicator={false}
            keyExtractor={(_, index) => `row-${index}`}
            renderItem={({ item, index }) => {
              const nth = (index + 1) % 2 === 0 ? 'even' : 'odd';
              return (
                <>
                  {nth === 'even' && <TableRow />}
                  <TableRow
                    className={cn(
                      'active:bg-secondary',
                      nth === 'even' ? evenClassName : oddClassName,
                      oddEvenRemovedClassName
                    )}
                  >
                    {props.columns.map((col, idx) => {
                      return (
                        <TableCell
                          style={{ width: columnWidths[idx] }}
                          key={`row-${index}-column-${idx}`}
                          className={cn(props.bodyColumnClassName, col.cellClassName)}
                        >
                          <Text
                            className={cn(
                              'text-sm ',
                              props.bodyColumnTextClassName,
                              col.cellTextClassName
                            )}
                          >
                            {col.accessor(item)}
                          </Text>
                        </TableCell>
                      );
                    })}
                  </TableRow>
                </>
              );
            }}
            ListFooterComponent={() => {
              return (
                <>
                  <TableFooter>
                    <TableRow></TableRow>
                  </TableFooter>
                </>
              );
            }}
          />
        </TableBody>
      </Table>
    </ScrollView>
  );
}

const useNthClassNames = (type: 'odd' | 'even', className: string) => {
  return React.useMemo(() => {
    return type === 'odd'
      ? className
          .split(' ')
          .filter((c) => c.includes('odd:'))
          .join(' ')
      : className
          .split(' ')
          .filter((c) => c.includes('even'))
          .join(' ');
  }, [type, className]);
};
