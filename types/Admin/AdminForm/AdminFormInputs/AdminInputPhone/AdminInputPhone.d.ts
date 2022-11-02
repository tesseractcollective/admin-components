import React from 'react';
import 'react-phone-input-2/lib/style.css';
import { AdminInputBaseProps } from '../../AdminForm';
import './AdminInputPhone.scss';
export declare type AdminInputPhoneProps = AdminInputBaseProps & {
    number?: string;
    required?: boolean;
};
export declare const AdminInputPhone: React.FC<AdminInputPhoneProps>;
