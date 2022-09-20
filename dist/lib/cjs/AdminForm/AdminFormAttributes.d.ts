import React from 'react';
import { Attribute, AttributeGroup } from '..';
export interface AdminFormAttributesProps {
    attributes: Attribute[];
    groups: AttributeGroup[];
    shouldSave?: boolean;
    onCompletion: (newAttributes: Attribute[]) => void;
}
export declare const AdminFormAttributes: React.FC<AdminFormAttributesProps>;
