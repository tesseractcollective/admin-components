import React from 'react';
import { DropdownProps } from 'primereact/dropdown';
import { DataAdapter } from '../../DataAdapter';
import { AdminInputBaseProps } from '../AdminForm';
interface InputRelationProps {
    relationshipColumnNameForLabel: string;
    relationshipColumnNameForValue: string;
    adapter: DataAdapter;
    where?: Record<string, any>;
}
export declare type AdminInputRelationProps = DropdownProps & AdminInputBaseProps & InputRelationProps;
declare const AdminInputRelation: React.FC<AdminInputRelationProps>;
export default AdminInputRelation;
