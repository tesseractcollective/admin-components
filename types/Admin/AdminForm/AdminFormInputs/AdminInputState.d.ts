import React from 'react';
import { AutoCompleteProps } from 'primereact/autocomplete';
import { AdminInputBaseProps } from '../AdminForm';
export declare type AdminInputStateProps = AutoCompleteProps & AdminInputBaseProps & {
    countryCode: string;
};
export declare const AdminInputState: React.FC<AdminInputStateProps>;
