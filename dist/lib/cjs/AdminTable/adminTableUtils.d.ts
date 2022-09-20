import { DataTableFilterMeta, DataTableMultiSortMetaType, DataTableSortOrderType } from 'primereact/datatable';
import { HasuraGraphQLNamingConvention } from '../DataAdapter';
export declare type WhereClause = Record<string, any>;
export declare function buildWhere(filters: DataTableFilterMeta | undefined, globalSearch?: string, globalFilterFields?: string[], baseWhere?: WhereClause): WhereClause;
export declare function buildOrderBy(namingConvention: HasuraGraphQLNamingConvention, sortField?: string, sortOrder?: DataTableSortOrderType, baseOrderBy?: DataTableMultiSortMetaType): Record<string, string>[] | undefined;
export declare function valueForPath(path: string[], item: Record<string, any>, existingValue: any): any;
