import React from 'react';
import { AutoCompleteProps } from 'primereact/autocomplete';
import { AdminInputBaseProps } from '../AdminForm';
import { AddressCountry } from '../../types';
export declare type AdminInputCountryProps = AutoCompleteProps & AdminInputBaseProps & {
    defaultCountryCode?: string;
    onCountrySelect?: (country?: AddressCountry) => void;
    autofill?: boolean;
};
declare const AdminInputCountry: React.FC<AdminInputCountryProps>;
export default AdminInputCountry;
