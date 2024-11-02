import React from 'react';
import { FlatList, Text, View } from 'react-native';
import { cn } from '../utils/cn';
export type ColumnType<T extends any> = {
  title: string;
  render?: (row: T) => React.ReactNode;
  renderHeader?: () => React.ReactNode;
  headerClassName?: string;
  className?: string;
} & (
  | {
      children?: never;
      accessor: (row: T) => any;
    }
  | {
      children: ColumnType<T>[];
      accessor?: never;
    }
);
export type DataTableProps<T extends any> = {
  columns: ColumnType<T>[];
  headRowClassName?: string;
  headRowTextClassName?: string;
  data: T[];
  keyExtractor?: (item: T) => string;
};
export function DataTable<T extends any>(props: DataTableProps<T>) {
  return (
    <FlatList
      data={props.data}
      className="w-full border border-border rounded-radius h-max flex-none overflow-clip"
      contentContainerClassName="w-full"
      renderItem={({ item, index }) => (
        <Row
          columns={props.columns}
          item={item}
          wrapperClassname={cn('flex-row items-center w-full')}
          index={index}
        />
      )}
      ListHeaderComponent={() => (
        <Header
          columns={props.columns}
          headerClassName={props.headRowClassName}
          headerTextClassName={props.headRowTextClassName}
        />
      )}
      {...props}
    />
  );
}

const Header = <T extends any>({
  columns,
  headerClassName,
  headerTextClassName,
}: {
  columns: ColumnType<T>[];
  headerClassName?: string;
  headerTextClassName?: string;
}) => {
  const renderChildren = (columns: ColumnType<T>[], depth: number) => {
    return (
      <View className="flex-row flex-1">
        {columns.map((column) => (
          <View className="flex-1">
            <View
              className={cn('flex-1 justify-center', column.headerClassName)}
              style={{
                padding: 8 - depth,
              }}
            >
              {column.renderHeader ? (
                column.renderHeader()
              ) : (
                <Text className={cn('text-sm font-medium text-foreground', headerTextClassName)}>
                  {column.title}
                </Text>
              )}
            </View>
            {column.children && renderChildren(column.children, depth + 1)}
          </View>
        ))}
      </View>
    );
  };
  return (
    <View
      className={cn('flex-row border-b border-border rounded-t-radius bg-card', headerClassName)}
    >
      {renderChildren(columns, 0)}
    </View>
  );
};

const Row = <T extends any>({
  columns,
  item,
  wrapperClassname,
  index,
}: {
  columns: ColumnType<T>[];
  item: T;
  wrapperClassname?: string;
  index: number;
}) => {
  //check if index is odd using bitwise operator
  const isOdd = index & 1;
  const renderColumns = (columns: ColumnType<T>[], depth: number) => {
    return columns.map((column) => (
      <View className="flex-1">
        {!!column.accessor && (
          <View className={cn('flex-1 p-2', column.className)}>
            {column.render ? (
              column.render(item)
            ) : (
              <Text className="text-sm">{column.accessor(item)}</Text>
            )}
          </View>
        )}
        {!!column.children && (
          <View className="flex-row">{renderColumns(column.children, depth + 1)}</View>
        )}
      </View>
    ));
  };
  return (
    <View
      className={cn('flex-row border-b border-border', isOdd ? 'bg-card' : '', wrapperClassname)}
    >
      {renderColumns(columns, 0)}
    </View>
  );
};
