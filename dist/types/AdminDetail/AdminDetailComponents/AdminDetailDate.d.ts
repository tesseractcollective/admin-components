import React from 'react';
import { AdminDetailBaseProps } from '../AdminDetail';
export declare type AdminDetailTextProps = AdminDetailBaseProps & React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement> & {
    showTime?: boolean;
};
declare const AdminDetailText: React.FC<AdminDetailTextProps>;
export default AdminDetailText;
