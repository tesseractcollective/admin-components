import React from 'react'
import { InputTextProps } from 'primereact/inputtext'
import { IAceEditorProps } from 'react-ace'
import { AdminInputBaseProps } from '../AdminForm'
import { AdminInputCode } from './AdminInputCode'

export type AdminInputTextProps = InputTextProps & AdminInputBaseProps & IAceEditorProps

export const AdminInputJson: React.FC<AdminInputTextProps> = props => <AdminInputCode {...props} mode="json" />
