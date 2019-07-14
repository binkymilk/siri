import React from 'react'
import { FormField as BaseFormField, TextInput } from 'grommet'

const FormField = ({ name, label, value }) => (
  <BaseFormField
    name={name}
    label={label}
    component={TextInput}
    type='number'
    step='0.1'
    required
  />
)

export default FormField
