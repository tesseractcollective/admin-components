import React from 'react';
import { EditorProps } from 'primereact/editor';
import { AdminInputBaseProps } from '../AdminForm';
export declare type AdminInputTextProps = EditorProps & AdminInputBaseProps & {
    required?: boolean;
};
export declare const AdminInputRichText: React.FC<AdminInputTextProps>;
