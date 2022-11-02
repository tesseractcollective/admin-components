import { DataTableFilterMeta, DataTablePFSEvent, DataTableSortOrderType } from 'primereact/datatable';
import { HasuraDataAdapter } from '../DataAdapter';
export declare type WhereClause = Record<string, any>;
export interface AdminTableState {
    current: any[];
    total: number;
    first: number;
    rows: number;
    sortField?: string;
    sortOrder?: DataTableSortOrderType;
    filters?: DataTableFilterMeta;
    error?: string;
}
export declare type AdminTableAdapterEventName = 'reload' | 'data';
export interface AdminTableEventListener {
    (evt: Event, data: any): void;
}
export interface ExportOptions {
    fields?: string[];
    sortField?: string;
    sortOrder?: DataTableSortOrderType;
    filters?: DataTableFilterMeta;
}
export declare abstract class AdminTableAdapter {
    events: Record<AdminTableAdapterEventName, AdminTableEventListener[]>;
    abstract readonly initialState: AdminTableState;
    abstract handlePrimeReactEvent(e: DataTablePFSEvent | undefined, fields: string[]): Promise<AdminTableState>;
    abstract fetchAllAsRecords(options: ExportOptions): Promise<Record<string, any>[]>;
    on(eventName: AdminTableAdapterEventName, listener: AdminTableEventListener): void;
    emit(eventName: AdminTableAdapterEventName, data?: any): void;
    reload(): void;
}
export declare class AdminTableHasuraAdapter extends AdminTableAdapter {
    dataAdapter: HasuraDataAdapter;
    baseWhere?: WhereClause;
    readonly initialState: AdminTableState;
    constructor(dataAdapter: HasuraDataAdapter, baseWhere?: WhereClause);
    handlePrimeReactEvent(e: DataTablePFSEvent | undefined, fields: string[]): Promise<AdminTableState>;
    fetchAllAsRecords(_options: ExportOptions): Promise<Record<string, any>[]>;
}
