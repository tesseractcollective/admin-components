import React, { useState } from 'react'
import { Controller } from 'react-hook-form'
import { InputTextProps, InputText } from 'primereact/inputtext'
import AceEditor, { IAceEditorProps } from 'react-ace'
import 'ace-builds/src-noconflict/mode-javascript'
import 'ace-builds/src-noconflict/mode-json'
import 'ace-builds/src-noconflict/theme-textmate'
import 'ace-builds/src-noconflict/theme-monokai'
import 'ace-builds/src-noconflict/mode-css'
import 'ace-builds/src-noconflict/mode-yaml'
import 'ace-builds/src-noconflict/theme-twilight'
import 'ace-builds/src-noconflict/theme-chrome'
import 'ace-builds/src-noconflict/ext-language_tools'
import 'ace-builds/src-noconflict/mode-java'
import 'ace-builds/src-noconflict/mode-jsx'
import 'ace-builds/src-noconflict/theme-github'

import { AdminInputBaseProps, buildClassName, validateProps } from '../AdminForm'
import useTheme from '../../useTheme'

export type AdminInputTextProps = InputTextProps & AdminInputBaseProps & IAceEditorProps

const AdminInputCode: React.FC<AdminInputTextProps> = props => {
  validateProps(props)
  const { control, name, label, helpText, containerClassName, required, attributeType, mode, ...baseProps } = props

  const [isExpanded, setIsExpanded] = useState(false)
  const { isLightMode } = useTheme()

  const editorTheme = isLightMode ? 'chrome' : 'twilight'
  const priorityLabel = attributeType?.label ?? label ?? name
  const description = attributeType?.description
  const attributeTypeProps = attributeType?.props
  const color = 'var(--text-color-secondary)'

  return (
    <Controller
      control={control}
      name={name}
      rules={{
        required,
        ...attributeType?.validation
      }}
      render={({ field, fieldState, formState: _formState }) => {
        const errorMessage = fieldState.error?.message || fieldState.error?.type

        if (!isExpanded) {
          return (
            <div className={containerClassName}>
              <div className="p-input-icon-left p-input-icon-right p-float-label w-full">
                <i className="pi pi-code" />
                <i className="pi pi-angle-down cursor-pointer" aria-hidden="true" onClick={() => setIsExpanded(true)} />
                <InputText
                  {...baseProps}
                  {...attributeTypeProps}
                  id={name}
                  className={buildClassName(baseProps.className, errorMessage)}
                  onBlur={field.onBlur}
                  onChange={field.onChange}
                  ref={field.ref}
                  value={field.value}
                  about={description}
                />
                <label htmlFor={name} className="capitalize">
                  {priorityLabel}
                </label>
                <small id={`${name}-help`} className="p-d-block">
                  {helpText}
                </small>
                <small className="p-error p-d-block">{errorMessage}</small>
              </div>
            </div>
          )
        }

        return (
          <div className={`${containerClassName || 'relative'} relative`}>
            <i
              className="pi pi-angle-up cursor-pointer absolute right-2 top-8 z-40"
              style={{ color }}
              onClick={() => setIsExpanded(false)}
              aria-hidden="true"
            />
            <label htmlFor={name} className="text-xs ml-3" style={{ color }}>
              {priorityLabel}
            </label>
            <AceEditor
              name={name}
              {...baseProps}
              className={buildClassName(baseProps.className, errorMessage)}
              height={props.height || '20rem'}
              style={props.style || { border: '1px solid var(--form-border)', width: '100%' }}
              mode={mode || 'javascript'}
              theme={props.theme || editorTheme}
              editorProps={props.editorProps || { $blockScrolling: true }}
              setOptions={{ useWorker: false }}
              value={field.value}
              onChange={field.onChange}
              onBlur={field.onBlur}
              highlightActiveLine
            />
          </div>
        )
      }}
    />
  )
}

export default AdminInputCode
