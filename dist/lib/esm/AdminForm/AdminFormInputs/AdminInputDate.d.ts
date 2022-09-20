import React from 'react';
import { MaterialUiPickersDate } from '@material-ui/pickers/typings/date';
import { KeyboardDatePickerProps } from '@material-ui/pickers/DatePicker';
import { ParsableDate } from '@material-ui/pickers/constants/prop-types';
import { AdminInputBaseProps } from '../AdminForm';
export declare type AdminInputDateProps = AdminInputBaseProps & Omit<KeyboardDatePickerProps, 'onChange' | 'value'> & {
    onChange?: (date: MaterialUiPickersDate, value?: string | null | undefined) => void;
    value?: ParsableDate | null | undefined;
};
declare const AdminInputDate: React.FC<AdminInputDateProps>;
export default AdminInputDate;
