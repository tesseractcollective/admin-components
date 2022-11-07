import React from 'react'
import { Controller } from 'react-hook-form'
import MomentUtils from '@date-io/moment'
import MuiPickersUtilsProvider from '@material-ui/pickers/MuiPickersUtilsProvider'
import { MaterialUiPickersDate } from '@material-ui/pickers/typings/date'
import { KeyboardDatePicker, KeyboardDatePickerProps } from '@material-ui/pickers/DatePicker'
import { ParsableDate } from '@material-ui/pickers/constants/prop-types'
import moment from 'moment'
import { AdminInputBaseProps, buildClassName, validateProps } from '../../AdminForm'
import './AdminInputDate.scss'

export type AdminInputDateProps = AdminInputBaseProps &
  Omit<KeyboardDatePickerProps, 'onChange' | 'value'> & {
    onChange?: (date: MaterialUiPickersDate, value?: string | null | undefined) => void
    value?: ParsableDate | null | undefined
  }

export const AdminInputDate: React.FC<AdminInputDateProps> = props => {
  validateProps(props)
  const { control, name, label, helpText, containerClassName, required, attributeType, defaultValue, onBlur, ...baseprops } = props

  const priorityLabel = attributeType?.label ?? label ?? name
  const nameValue = attributeType?.name || props.name

  const fieldProps = {
    ...baseprops,
    ...attributeType?.props
  }

  return (
    <Controller
      control={control}
      defaultValue={defaultValue}
      name={nameValue}
      rules={{
        required,
        ...attributeType?.validation
      }}
      render={({ field, fieldState, formState: _formState }) => {
        const errorMessage = fieldState.error?.message || fieldState.error?.type

        return (
          <div className={containerClassName}>
            <MuiPickersUtilsProvider utils={MomentUtils}>
              <KeyboardDatePicker
                {...fieldProps}
                className={buildClassName(fieldProps.className, errorMessage)}
                autoOk
                variant="inline"
                inputVariant="outlined"
                label={priorityLabel}
                placeholder="MM/DD/YYYY"
                format="MM/DD/YYYY"
                value={field.value || null}
                onChange={date => field.onChange(moment(date))}
                onBlur={() => {
                  field.onBlur()
                  onBlur && onBlur()
                }}
              />
            </MuiPickersUtilsProvider>

            <small id={`${nameValue}-help`} className="p-d-block">
              {helpText}
            </small>
            <small className="p-error p-d-block">{errorMessage}</small>
          </div>
        )
      }}
    />
  )
}
