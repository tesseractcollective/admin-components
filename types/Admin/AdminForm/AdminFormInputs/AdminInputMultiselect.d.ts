import React from 'react';
import { MultiSelectProps } from 'primereact/multiselect';
import { AdminInputBaseProps } from '../AdminForm';
export declare type AdminInputMultiSelectProps = MultiSelectProps & AdminInputBaseProps & {
    optionValueType?: 'string' | 'number';
};
export declare const AdminInputMultiSelect: React.FC<AdminInputMultiSelectProps>;
