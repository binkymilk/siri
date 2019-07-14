import React, { useState, useEffect } from 'react'
import { Box, Text, Form, Button } from 'grommet'
import styled from 'styled-components'
import FormField from './FormField'

import irisSetosa from './images/iris_setosa.jpg'
import irisVeriscolor from './images/iris_veriscolor.jpeg'
import irisVirginica from './images/iris_virginica.jpg'

const images = {
  'Iris Setosa': irisSetosa,
  'Iris Versicolour': irisVeriscolor,
  'Iris Virginica': irisVirginica
}

const INIT_FORM_DATA = {
  sepalLength: 0,
  sepalWidth: 0,
  petalLength: 0,
  petalWidth: 0
}

const API_URL = 'http://127.0.0.1:5000/prediction'

const App = styled(({ className }) => {
  const [formData, setFormData] = useState()
  const [result, setResult] = useState('')

  useEffect(() => {
    if (formData !== INIT_FORM_DATA) {
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
      .then(response => setResult(response.result))
    }
  }, [formData])

  return (
    <Box width='100vw' height='100vh' align='center' justify='center' className={className}>
      <Text size='xlarge' weight='bold'>Siri: Iris Plant Classifier</Text>
      <Box direction='row'>
        <Box width='medium' pad='large'>
          <Form
            onSubmit={({ value }) => setFormData(value)}
            onReset={() => {
              setFormData(INIT_FORM_DATA)
              setResult(null)
            }}
          >
            <FormField name='sepalLength' label='Sepal Length' />
            <FormField name='sepalWidth' label='Sepal Width' />
            <FormField name='petalLength' label='Petal Length' />
            <FormField name='petalWidth' label='Petal Width' />
            <Box direction='row' justify='between' pad={{ top: '25px' }}>
              <Button type='reset' label='Reset' />
              <Button type='submit' label='Predict' primary />
            </Box>
          </Form>
        </Box>
        { result ? <Box pad='large'>
          <Text>This type of iris plant is:</Text>
          <Text color='#514ac3' weight='bold'>{result}</Text>
          <img alt={result} className='image' src={images[result]} />
        </Box> : null }
       </Box>
    </Box>
  )
})`
  .image {
    height: 300px;
    width: 300px;
    object-fit: cover;
    object-position: center;
    padding: 10px 0;
  }
`

export default App
