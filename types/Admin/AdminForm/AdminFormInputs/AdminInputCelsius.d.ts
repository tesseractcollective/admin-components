import React from 'react';
import { InputNumberProps } from 'primereact/inputnumber';
import { AdminInputBaseProps } from '../AdminForm';
export declare type AdminInputCeslisusProps = AdminInputBaseProps & Omit<InputNumberProps, 'disabled'> & {
    mode?: 'celsius' | 'fahrenheit';
    inputMode?: 'decimal' | 'currency';
    disabled?: boolean;
};
export declare type AdminInputOption = {
    label: string;
    value: number;
};
export declare const AdminInputCelsius: React.FC<AdminInputCeslisusProps>;
