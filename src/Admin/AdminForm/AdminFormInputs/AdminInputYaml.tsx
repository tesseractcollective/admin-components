import React from 'react'
import { InputTextProps } from 'primereact/inputtext'
import { IAceEditorProps } from 'react-ace'
import { AdminInputBaseProps } from '../AdminForm'
import AdminInputCode from './AdminInputCode'

export type AdminInputTextProps = InputTextProps & AdminInputBaseProps & IAceEditorProps

const AdminInputYaml: React.FC<AdminInputTextProps> = props => <AdminInputCode {...props} mode="yaml" />

export default AdminInputYaml
