import React from 'react';
import { InputTextProps } from 'primereact/inputtext';
import { AdminInputBaseProps } from '../AdminForm';
import { InputTextareaProps } from 'primereact/inputtextarea';
interface InputProps {
    isTextArea?: boolean;
}
export declare type AdminInputTextProps = InputTextProps & AdminInputBaseProps & InputTextareaProps & InputProps;
export declare const AdminInputText: React.FC<AdminInputTextProps>;
export {};
