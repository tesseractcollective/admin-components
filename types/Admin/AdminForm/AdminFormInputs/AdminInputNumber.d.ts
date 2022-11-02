import React from 'react';
import { InputNumberProps } from 'primereact/inputnumber';
import { AdminInputBaseProps } from '../AdminForm';
export declare type AdminInputNumberProps = InputNumberProps & AdminInputBaseProps & {
    mode?: 'decimal' | 'currency';
};
export declare const AdminInputNumber: React.FC<AdminInputNumberProps>;
