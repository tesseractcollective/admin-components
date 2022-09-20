import React from 'react';
import { Control, RegisterOptions } from 'react-hook-form';
import { AdminInputBaseProps } from './AdminForm';
import { AttributeType, ValueType } from '../types';
export declare const inputForValueType: (type: ValueType) => React.FC<AdminInputBaseProps>;
export interface AdminInputFieldProps {
    control: Control<Record<string, string>, any>;
    passthroughProps?: Record<string, {
        [key: string]: any;
        rules?: Omit<RegisterOptions, 'valueAsNumber' | 'valueAsDate' | 'setValueAs' | 'disabled'>;
    }>;
}
export declare const adminInputForAttributeType: (type: AttributeType, props: AdminInputFieldProps) => React.FC<AdminInputBaseProps>;
export declare const adminInputsForAttributeTypes: (attributeTypes: AttributeType[], props: AdminInputFieldProps) => React.FC<AdminInputBaseProps>[];
