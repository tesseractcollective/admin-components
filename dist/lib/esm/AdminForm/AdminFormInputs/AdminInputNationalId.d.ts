import React from 'react';
import { AdminInputBaseProps } from '../AdminForm';
declare enum NationalIdTypeEnum {
    UsSsn = "UsSsn",
    UsEin = "UsEin",
    Other = "Other"
}
export declare type AdminInputNationalIdProps = AdminInputBaseProps & {
    idType: NationalIdTypeEnum;
    idLength?: number;
};
declare const AdminInputNationalId: React.FC<AdminInputNationalIdProps>;
export default AdminInputNationalId;
