import React, { useState, useEffect } from 'react'
import { Box, Text, Form, Button } from 'grommet'
import FormField from './FormField'

const INIT_FORM_DATA = {
  sepalLength: 4,
  sepalWidth: 2,
  petalLength: 1,
  petalWidth: 0
}

const API_URL = 'http://127.0.0.1:5000/prediction'

const App = () => {
  const [isLoading, setIsLoading] = useState(false)
  const [formData, setFormData] = useState(INIT_FORM_DATA)
  const [result, setResult] = useState('')

  useEffect(() => {
    setIsLoading(true)
    fetch(API_URL,
      {
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        method: 'POST',
        body: JSON.stringify(formData)
      })
      .then(response => response.json())
      .then(response => {
        setResult(response.result)
        setIsLoading(false)
      })
  }, [formData])

  return (
    <Box width='medium' pad='large' responsive>
      <Text size='large' weight='bold'>Siri: Iris Plant Classifier</Text>
      <Form
        onSubmit={({ value }) => setFormData(value)}
        onReset={() => setFormData(INIT_FORM_DATA)}
      >
        <FormField name='sepalLength' label='Sepal Length' placeholder={INIT_FORM_DATA.sepalLength} />
        <FormField name='sepalWidth' label='Sepal Width' placeholder={INIT_FORM_DATA.sepalWidth} />
        <FormField name='petalLength' label='Petal Length' placeholder={INIT_FORM_DATA.petalLength} />
        <FormField name='petalWidth' label='Petal Width' placeholder={INIT_FORM_DATA.petalWidth} />
        <Box direction='row' justify='between'>
          <Button type='reset' label='Reset' />
          <Button type='submit' label='Predict' primary />
        </Box>
      </Form>
      <Text>{result}</Text>
      { isLoading ? <span>Loading...</span> : null}
    </Box>
  )
}

export default App
