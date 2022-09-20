import React from 'react';
import { AdminDetailTextProps } from '../AdminDetail';
declare type AdminDetailDateProps = AdminDetailTextProps & {
    showTime?: boolean;
};
declare const AdminDetailDate: React.FC<AdminDetailDateProps>;
export default AdminDetailDate;
