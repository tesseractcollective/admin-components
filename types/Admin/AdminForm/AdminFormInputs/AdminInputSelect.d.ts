import React from 'react';
import { DropdownProps } from 'primereact/dropdown';
import { AdminInputBaseProps } from '../AdminForm';
export declare type AdminInputSelectProps = DropdownProps & AdminInputBaseProps & {
    optionValueType?: 'string' | 'number';
};
export declare const AdminInputSelect: React.FC<AdminInputSelectProps>;
