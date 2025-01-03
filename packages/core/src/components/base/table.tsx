import * as TablePrimitive from '@rn-primitives/table';
import * as React from 'react';
import { Pressable, View } from 'react-native';
import { TextClassContext } from '../../components/base/text';
import { cn } from '../../lib/utils';

const Table = React.forwardRef<TablePrimitive.RootRef, TablePrimitive.RootProps>(
  ({ className, ...props }, ref) => (
    <TablePrimitive.Root
      ref={ref}
      className={cn('w-full caption-bottom text-sm flex-1', className)}
      {...props}
    />
  )
);
Table.displayName = 'Table';

const TableHeader = React.forwardRef<TablePrimitive.HeaderRef, TablePrimitive.HeaderProps>(
  ({ className, ...props }, ref) => (
    <TablePrimitive.Header
      ref={ref}
      className={cn('border-border min-w-full [&_tr]:border-b', className)}
      {...props}
    />
  )
);
TableHeader.displayName = 'TableHeader';

const TableBody = React.forwardRef<TablePrimitive.BodyRef, TablePrimitive.BodyProps>(
  ({ className, style, ...props }, ref) => (
    <TablePrimitive.Body
      ref={ref}
      className={cn('flex-1 border-border min-w-full [&_tr:last-child]:border-0', className)}
      style={[{ minHeight: 2 }, style]}
      {...props}
    />
  )
);
TableBody.displayName = 'TableBody';

const TableFooter = React.forwardRef<TablePrimitive.FooterRef, TablePrimitive.FooterProps>(
  ({ className, ...props }, ref) => (
    <TablePrimitive.Footer
      ref={ref}
      className={cn('bg-muted/50 font-medium [&>tr]:last:border-b-0', className)}
      {...props}
    />
  )
);
TableFooter.displayName = 'TableFooter';

const TableRow = React.forwardRef<View, TablePrimitive.RowProps>(({ className, ...props }, ref) => {
  return (
    <Pressable
      ref={ref}
      className={cn(
        'flex-row min-w-full border-border border-b web:transition-colors web:hover:bg-muted/50 web:data-[state=selected]:bg-muted',
        className
      )}
      {...props}
    />
  );
});
TableRow.displayName = 'TableRow';

const TableHead = React.forwardRef<TablePrimitive.HeadRef, TablePrimitive.HeadProps>(
  ({ className, ...props }, ref) => (
    <TextClassContext.Provider value="text-muted-foreground">
      <TablePrimitive.Head
        ref={ref}
        className={cn(
          'h-12 flex-1 px-4 text-left justify-center font-medium [&:has([role=checkbox])]:pr-0',
          className
        )}
        {...props}
      />
    </TextClassContext.Provider>
  )
);
TableHead.displayName = 'TableHead';

const TableCell = React.forwardRef<TablePrimitive.CellRef, TablePrimitive.CellProps>(
  ({ className, ...props }, ref) => (
    <TablePrimitive.Cell
      ref={ref}
      className={cn(
        'flex-1 p-2 flex-col justify-center align-middle [&:has([role=checkbox])]:pr-0',
        className
      )}
      {...props}
    />
  )
);
TableCell.displayName = 'TableCell';

export { Table, TableBody, TableCell, TableFooter, TableHead, TableHeader, TableRow };
