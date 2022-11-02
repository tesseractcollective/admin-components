import React from 'react';
import { Attribute, AttributeType, ValueType } from '../types';
import { AdminDetailTextProps } from './AdminDetailComponents/AdminDetailDate';
export interface AdminDetailBaseProps {
    value?: string;
    type?: AttributeType;
    attribute?: Attribute;
    labelClassName?: string;
    hideLabel?: boolean;
}
export declare type AdminDetailLabelWrapperProps = AdminDetailBaseProps & React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement>;
export declare const AdminDetailLabelWrapper: React.FC<AdminDetailLabelWrapperProps>;
export declare const getValue: (props: AdminDetailBaseProps) => any;
export declare const detailComponentForValueType: (type: ValueType | undefined) => React.FC<AdminDetailTextProps>;
export declare const adminDetailForAttribute: (attribute: Attribute | undefined, props?: AdminDetailBaseProps) => React.FC<AdminDetailBaseProps>;
export declare const adminDetailsForAttributes: (attributes: Attribute[], props: AdminDetailBaseProps) => React.FC<AdminDetailBaseProps>[];
