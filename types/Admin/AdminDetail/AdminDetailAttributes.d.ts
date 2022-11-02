import React from 'react';
import { Attribute, AttributeType } from '../types';
export interface ValuesDetailProps {
    attributes: Attribute[];
    types?: AttributeType[];
    label?: string;
    onEditButtonClick?: () => void;
}
export declare const AdminDetailAttributes: React.FC<ValuesDetailProps>;
