import { ColumnDef } from '@tanstack/react-table';
import { VehicleItem } from 'features/Vehicle/types/Vehicle.types';
import { DataTableColumnHeader } from 'components/blocks/data-table/data-table-column-header';

export const createVehicleColumns = (): ColumnDef<VehicleItem>[] => [
  {
    accessorKey: 'Name',
    header: ({ column }) => <DataTableColumnHeader column={column} title="Name" />,
    cell: ({ row }) => <div className="font-medium">{row.getValue('Name')}</div>,
    enableSorting: true,
  },
  {
    accessorKey: 'Brand',
    header: ({ column }) => <DataTableColumnHeader column={column} title="Brand" />,
    cell: ({ row }) => <div className="font-medium">{row.getValue('Brand')}</div>,
    enableSorting: true,
  },
  {
    accessorKey: 'Model',
    header: ({ column }) => <DataTableColumnHeader column={column} title="Model" />,
    cell: ({ row }) => <div className="font-medium">{row.getValue('Model')}</div>,
    enableSorting: true,
  },
  {
    accessorKey: 'Type',
    header: ({ column }) => <DataTableColumnHeader column={column} title="Type" />,
    cell: ({ row }) => <div className="font-medium">{row.getValue('Type')}</div>,
    enableSorting: true,
  },
  {
    accessorKey: 'Price',
    header: ({ column }) => <DataTableColumnHeader column={column} title="Price" />,
    cell: ({ row }) => {
      const value = parseFloat(row.getValue('Price'));
      const formatted = new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
      }).format(value);
      return <div className="font-medium">{formatted}</div>;
    },
    enableSorting: true,
  },
  {
    accessorKey: 'Stock',
    header: ({ column }) => <DataTableColumnHeader column={column} title="Stock" />,
    cell: ({ row }) => {
      const value = parseFloat(row.getValue('Stock'));
      return <div className="font-medium">{value}</div>;
    },
    enableSorting: true,
  },
  {
    accessorKey: 'CreatedDate',
    header: ({ column }) => <DataTableColumnHeader column={column} title="Created Date" />,
    cell: ({ row }) => {
      const date = new Date(row.getValue('CreatedDate'));
      return <div>{date.toLocaleDateString()}</div>;
    },
    enableSorting: true,
  },
];