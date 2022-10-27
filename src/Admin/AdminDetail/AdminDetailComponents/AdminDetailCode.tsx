import React from 'react'
import AceEditor, { IAceEditorProps } from 'react-ace'
import 'ace-builds/src-noconflict/mode-javascript'
import 'ace-builds/src-noconflict/mode-yaml'
import 'ace-builds/src-noconflict/theme-twilight'
import 'ace-builds/src-noconflict/ext-language_tools'
import useTheme from '../../useTheme'
import { AdminDetailBaseProps, AdminDetailLabelWrapper, AdminDetailLabelWrapperProps, getValue } from '../AdminDetail'

export type AdminDetailCodeProps = AdminDetailBaseProps & IAceEditorProps

export const AdminDetailCode: React.FC<AdminDetailCodeProps> = props => {
  const { isLightMode } = useTheme()
  const editorTheme = isLightMode ? 'chrome' : 'twilight'

  const { className, attribute, type, value, ...rest } = props

  const wrapperProps: AdminDetailLabelWrapperProps = {
    className,
    attribute,
    type,
    value
  }

  return (
    <AdminDetailLabelWrapper {...wrapperProps}>
      <AceEditor
        {...rest}
        height={props.height || '20rem'}
        style={props.style || { border: '1px solid var(--form-border)', width: '100%' }}
        mode={props.mode || 'javascript'}
        theme={props.theme || editorTheme}
        editorProps={props.editorProps || { $blockScrolling: true }}
        value={getValue(props)}
        readOnly
      />
    </AdminDetailLabelWrapper>
  )
}
