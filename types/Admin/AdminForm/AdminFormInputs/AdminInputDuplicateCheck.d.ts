import React from 'react';
import { DataAdapter } from '../../DataAdapter';
import { NavigateFunction } from 'react-router-dom';
import { InputTextProps } from 'primereact/inputtext';
import { AdminInputBaseProps } from '../AdminForm';
interface InputDuplicateCheckProps {
    adapter: DataAdapter;
    pkForRoute?: string;
    route?: string;
    navigate?: NavigateFunction;
}
export declare type AdminInputTextCheckProps = InputTextProps & AdminInputBaseProps & InputDuplicateCheckProps;
export declare const AdminInputDuplicateCheck: React.FC<AdminInputTextCheckProps>;
export {};
