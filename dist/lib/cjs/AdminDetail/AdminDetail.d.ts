import React from 'react';
import { Attribute, AttributeGroup, AttributeType, ValueType } from '../types';
export interface AdminDetailBaseProps {
    value?: string;
    type?: AttributeType;
    attribute?: Attribute;
    labelClassName?: string;
    hideLabel?: boolean;
}
export declare type AdminDetailLabelWrapperProps = AdminDetailBaseProps & React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement>;
export declare type AdminDetailTextProps = AdminDetailBaseProps & React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement>;
export declare const AdminDetailLabelWrapper: React.FC<AdminDetailLabelWrapperProps>;
export declare const getValue: (props: AdminDetailBaseProps) => any;
export declare const detailComponentForValueType: (type: ValueType | undefined) => React.FC<AdminDetailTextProps>;
export declare const adminDetailForAttribute: (attribute: Attribute | undefined, props?: AdminDetailLabelWrapperProps) => React.FC<AdminDetailBaseProps>;
export declare const adminDetailsForAttributes: (attributes: Attribute[], props: AdminDetailBaseProps) => React.FC<AdminDetailBaseProps>[];
export declare const findTypeInTypes: (types: AttributeType[], name: string) => AttributeType | undefined;
export declare const findTypeInGroups: (groups: AttributeGroup[], name: string) => AttributeType | undefined;
