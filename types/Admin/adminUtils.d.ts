import { DataTableRowClickEventParams, DataTableSelectParams } from 'primereact/datatable';
import { Address, Attribute } from './types';
export declare function valueForAttribute(attributes: Attribute[] | undefined, name: string): string;
export declare const rowToNewTab: (event: DataTableRowClickEventParams | DataTableSelectParams, route: string, onRowClick: (row: any, path?: string) => void) => void;
export declare function addressSingleLineFormat(address: Address): string;
export declare function isEqual(obj1: any, obj2: any): boolean;
