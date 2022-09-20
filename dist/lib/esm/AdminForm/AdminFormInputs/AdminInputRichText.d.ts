import React from 'react';
import { EditorProps } from 'primereact/editor';
import { AdminInputBaseProps } from '../AdminForm';
export declare type AdminInputTextProps = EditorProps & AdminInputBaseProps & {
    required?: boolean;
};
declare const AdminInputRichText: React.FC<AdminInputTextProps>;
export default AdminInputRichText;
