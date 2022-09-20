import React from 'react';
import { Control, RegisterOptions } from 'react-hook-form';
import { AttributeType } from '../types';
export interface AdminInputBaseProps {
    name: string;
    control?: Control<any>;
    label?: string;
    helpText?: string;
    containerClassName?: string;
    attributeType?: AttributeType;
    rules?: Omit<RegisterOptions, 'valueAsNumber' | 'valueAsDate' | 'setValueAs' | 'disabled'>;
    onBlur?: () => void;
    onChange?: (e: any) => void;
    [key: string]: any;
}
export interface AdminFormProps {
    className?: string;
    children: React.ReactNode;
    defaultValues?: Record<string, any>;
    attributeTypes?: AttributeType[] | Record<string, AttributeType>;
    onSubmit: (record: Record<string, any>) => void;
    onInvalid?: (errors: any) => void;
    shouldSubmit?: boolean;
}
export declare const AdminForm: React.FC<AdminFormProps>;
export declare function validateProps(props: AdminInputBaseProps & Record<string, any>): void;
export declare function buildClassName(classNameFromProps: string | undefined, errorMessage?: string): string | undefined;
