import React from 'react'
import { Controller } from 'react-hook-form'
import { Editor, EditorProps } from 'primereact/editor'
import { AdminInputBaseProps, buildClassName, validateProps } from '../AdminForm'

export type AdminInputTextProps = EditorProps &
  AdminInputBaseProps & {
    required?: boolean
  }

export const AdminInputRichText: React.FC<AdminInputTextProps> = props => {
  validateProps(props)
  const { control, name, label, helpText, containerClassName, required, attributeType, headerTemplate, defaultValue, ...baseProps } = props

  const priorityLabel = attributeType?.label ?? label ?? name

  // TODO: customize theme

  const toolbarHeader = (
    <span className="ql-formats">
      <select className="ql-size" aria-label="Size" defaultValue="normal">
        <option label="Small" value="small" />
        <option label="Normal" value="normal" />
        <option label="Large" value="large" />
      </select>
      <button type="button" className="ql-bold" aria-label="Bold" />
      <button type="button" className="ql-italic" aria-label="Italic" />
      <button type="button" className="ql-underline" aria-label="Underline" />
      <button type="button" className="ql-strike" aria-label="Strike" />
      <button type="button" className="ql-link" aria-label="Link" />
      <button type="button" className="ql-blockquote" aria-label="Blockquote" />
      <button type="button" className="ql-list" value="ordered" aria-label="Ordered List" />
      <button type="button" className="ql-list" value="bullet" aria-label="Unordered List" />
      <button type="button" className="ql-align" aria-label="Align" />
    </span>
  )

  return (
    <Controller
      control={control}
      defaultValue={defaultValue}
      name={name}
      rules={{
        required,
        ...attributeType?.validation
      }}
      render={({ field, fieldState, formState: _formState }) => {
        const errorMessage = fieldState.error?.message || fieldState.error?.type

        return (
          <div className={containerClassName}>
            <div className="p-float-label">
              <Editor
                {...baseProps}
                id={name}
                className={buildClassName(`p-inputwrapper-filled ${baseProps.className}`, errorMessage)}
                onTextChange={e => field.onChange(e.htmlValue, e.textValue)}
                ref={field.ref}
                value={field.value}
                headerTemplate={headerTemplate || toolbarHeader}
                formats={[
                  'bold',
                  'font',
                  'color',
                  'italic',
                  'link',
                  'size',
                  'strike',
                  'underline',
                  'blockquote',
                  'header',
                  'indent',
                  'list',
                  'align',
                  'direction'
                ]}
              />
              <label htmlFor={name} className="capitalize">
                {priorityLabel}
              </label>
            </div>
            <small id={`${name}-help`} className="p-d-block">
              {helpText}
            </small>
            <small className="p-error p-d-block">{errorMessage}</small>
          </div>
        )
      }}
    />
  )
}
