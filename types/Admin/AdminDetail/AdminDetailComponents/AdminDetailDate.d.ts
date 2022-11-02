import React from 'react';
import { AdminDetailBaseProps } from '../AdminDetail';
export declare type AdminDetailTextProps = AdminDetailBaseProps & React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement> & {
    showTime?: boolean;
};
export declare const AdminDetailDate: React.FC<AdminDetailTextProps>;
