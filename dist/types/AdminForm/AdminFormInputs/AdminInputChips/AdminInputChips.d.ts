import React from 'react';
import { ChipsProps } from 'primereact/chips';
import { AdminInputBaseProps } from '../../AdminForm';
import './AdminInputChips.scss';
declare type IChipsProps = Omit<ChipsProps, 'value' | 'onChange'>;
export declare type AdminChipsInputProps = IChipsProps & AdminInputBaseProps & {
    required?: boolean;
};
declare const AdminInputChips: React.FC<AdminChipsInputProps>;
export default AdminInputChips;
