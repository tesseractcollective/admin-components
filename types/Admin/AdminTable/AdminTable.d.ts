import React from 'react';
import { DataTable, DataTableProps } from 'primereact/datatable';
import { AdminTableAdapter } from './AdminTableAdapter';
export declare const AdminTable: React.ForwardRefExoticComponent<{
    adapter: AdminTableAdapter;
    paginator?: boolean | undefined;
} & DataTableProps & React.RefAttributes<DataTable>>;
