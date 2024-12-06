import { FlashList } from '@shopify/flash-list';
import * as React from 'react';
import { ScrollView, useWindowDimensions, View } from 'react-native';
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

export type ColumnType<TData extends Record<string, any>> = {
  label: string;
  headClassName?: string;
  headTextClassName?: string;
  cellClassName?: string;
  cellTextClassName?: string;
} & (
  | {
      accessor: (item: TData) => any;
      render?: never;
    }
  | {
      render: (item: TData) => JSX.Element;
      accessor?: never;
    }
);
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
  renderRow?: (item: TData, index: number) => JSX.Element;
  renderCell?: (item: TData, index: number) => JSX.Element;
  onRowPress?: (item: TData, index: number) => void;
  containerScrollViewProps?: React.ComponentProps<typeof ScrollView>;
  tableClassName?: string;
  tableHeaderClassName?: string;
  tableBodyClassName?: string;
} & ClassNames;
export function DataTable<TData extends Record<string, any>>(props: DataTableProps<TData>) {
  const { width } = useWindowDimensions();
  const insets = useSafeAreaInsets();

  const columnWidths = React.useMemo(() => {
    if (!props.minColumnWidths) {
      return [];
    }
    return props.columns?.map((_, index) => {
      const minWidth = props.minColumnWidths[index];
      const evenWidth = width / props.columns.length;
      return evenWidth > minWidth ? evenWidth : minWidth;
    });
  }, [width]);
  const oddClassName = useNthClassNames('odd', props.bodyRowClassName);
  const evenClassName = useNthClassNames('even', props.bodyRowClassName);
  const oddEvenRemovedClassName = React.useMemo(() => {
    if (!props.bodyRowClassName) return '';

    return props.bodyRowClassName
      .split(' ')
      .filter((c) => !c.includes('odd') && !c.includes('even'))
      .join(' ');
  }, [props.bodyRowClassName]);
  return (
    <ScrollView
      horizontal
      bounces={false}
      {...props.containerScrollViewProps}
      contentContainerClassName={cn(
        'min-w-full ',
        props.containerScrollViewProps.contentContainerClassName
      )}
      className={cn('w-full', props.containerScrollViewProps.className)}
    >
      <Table className={cn('w-full', props.tableClassName)}>
        <TableHeader className={props.tableHeaderClassName}>
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
        <TableBody className={cn('min-w-full', props.tableBodyClassName)}>
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
              if (props.renderRow) {
                return props.renderRow(item, index);
              }
              return (
                <>
                  {nth === 'even' && <View />}
                  <TableRow
                    className={cn(
                      'active:bg-secondary',
                      nth === 'even' ? evenClassName : oddClassName,
                      oddEvenRemovedClassName
                    )}
                    onPress={() => {
                      if (props.onRowPress) {
                        props.onRowPress(item, index);
                      }
                    }}
                  >
                    {props.columns.map((col, idx) => {
                      if (props.renderCell) {
                        return props.renderCell(item, index);
                      }
                      return (
                        <TableCell
                          style={{ width: columnWidths[idx] }}
                          key={`row-${index}-column-${idx}`}
                          className={cn(props.bodyColumnClassName, col.cellClassName)}
                        >
                          {col.render ? (
                            col.render(item)
                          ) : (
                            <Text
                              className={cn(
                                'text-sm ',
                                props.bodyColumnTextClassName,
                                col.cellTextClassName
                              )}
                            >
                              {col.accessor(item)}
                            </Text>
                          )}
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

const useNthClassNames = (type: 'odd' | 'even', className?: string) => {
  return React.useMemo(() => {
    if (!className) return '';
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
