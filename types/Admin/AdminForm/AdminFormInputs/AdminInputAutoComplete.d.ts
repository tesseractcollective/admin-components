import React from 'react';
import { DataAdapter } from '../../DataAdapter';
import { AdminInputBaseProps } from '../AdminForm';
import { AutoCompleteProps } from 'primereact/autocomplete';
import { NavigateFunction } from 'react-router-dom';
interface InputRelationProps {
    relationshipColumnNameForLabel: string;
    relationshipColumnNameForValue: string;
    adapter: DataAdapter;
    pkForRoute?: string;
    route?: string;
    navigate?: NavigateFunction;
}
export declare type AdminInputAutoCompleteProps = AutoCompleteProps & AdminInputBaseProps & InputRelationProps;
export declare const AdminInputAutoComplete: React.FC<AdminInputAutoCompleteProps>;
export {};
