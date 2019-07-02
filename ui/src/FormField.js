import React from 'react'
import { FormField as BaseFormField, TextInput } from 'grommet'

const FormField = ({ name, label, placeholder }) => (
  <BaseFormField
    name={name}
    label={label}
    component={TextInput}
    placeholder={`${placeholder}`}
    type='number'
    step='0.1'
    required
  />
)

export default FormField
