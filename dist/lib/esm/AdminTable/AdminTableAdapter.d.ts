import { DataTableFilterMeta, DataTableMultiSortMetaType, DataTablePFSEvent, DataTableSortOrderType } from 'primereact/datatable';
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
export declare type AdminTableAdapterEvent = 'reload';
export interface ExportOptions {
    fields?: string[];
    sortField?: string;
    sortOrder?: DataTableSortOrderType;
    filters?: DataTableFilterMeta;
}
export declare abstract class AdminTableAdapter {
    events: Record<AdminTableAdapterEvent, EventListener[]>;
    abstract readonly initialState: AdminTableState;
    abstract handlePrimeReactEvent(e: DataTablePFSEvent | undefined, fields: string[]): Promise<AdminTableState>;
    abstract subscribe(fields: string[], callback: (state: AdminTableState) => void): void;
    abstract unsubscribe(): void;
    abstract fetchAllAsRecords(options: ExportOptions): Promise<Record<string, any>[]>;
    on(event: AdminTableAdapterEvent, listener: EventListener): void;
    emit(event: AdminTableAdapterEvent): void;
    reload(): void;
}
export declare class AdminTableHasuraAdapter extends AdminTableAdapter {
    dataAdapter: HasuraDataAdapter;
    lastEvent?: DataTablePFSEvent;
    baseWhere?: WhereClause;
    baseDistinctOn?: string[];
    baseOrderBy?: DataTableMultiSortMetaType;
    readonly initialState: AdminTableState;
    constructor(dataAdapter: HasuraDataAdapter, baseWhere?: WhereClause, baseDistinctOn?: string[], baseOrderBy?: DataTableMultiSortMetaType);
    handlePrimeReactEvent(e: DataTablePFSEvent | undefined, fields: string[]): Promise<AdminTableState>;
    subscribe(fields: string[], callback: (state: AdminTableState) => void): void;
    unsubscribe(): void;
    private createNewState;
    fetchAllAsRecords(_options: ExportOptions): Promise<Record<string, any>[]>;
}
