import React from 'react';
import { DataAdapter } from '../../DataAdapter';
import { AdminInputBaseProps } from '../AdminForm';
import { AutoCompleteProps } from 'primereact/autocomplete';
interface InputRelationProps {
    relationshipColumnNameForLabel: string;
    relationshipColumnNameForValue: string;
    adapter: DataAdapter;
    where?: Record<string, any>;
}
export declare type AdminInputRelationProps = AutoCompleteProps & AdminInputBaseProps & InputRelationProps;
export declare const AdminInputRelation: React.FC<AdminInputRelationProps>;
export {};
