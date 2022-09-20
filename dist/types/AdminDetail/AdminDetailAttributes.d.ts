import React from 'react';
import { Attribute, AttributeGroup } from '../types';
export interface AdminDetailAttributesProps {
    attributes: Attribute[];
    groups: AttributeGroup[];
    onEditButtonClick?: () => void;
}
export declare const AdminDetailAttributes: React.FC<AdminDetailAttributesProps>;
