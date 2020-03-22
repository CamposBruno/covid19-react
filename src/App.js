import React, { useState, useEffect } from 'react'
import { Col, Row, Container, Input, FormGroup, Label } from 'reactstrap'
import NewCases from './components/NewCases'

import * as covid19 from './services/covid19'

import './assets/vendor/nucleo/css/nucleo.css'
import './assets/vendor/font-awesome/css/font-awesome.min.css'
import './assets/scss/argon-design-system-react.scss'
import './assets/css/custom.css'

function App () {
  const [currentCountry, setCurrentCountry] = useState('BRA')
  const [countries, setCountries] = useState([])

  useEffect(() => {
    covid19.countries().then(setCountries)
  }, [])

  const handleCountryChange = (e) => {
    e.preventDefault()
    setCurrentCountry(e.target.value)
  }

  return (
    <Container>
      <Row>
        <Col lg="12">
          <FormGroup>
            <Label for="exampleSelect">Selecione o País</Label>
            <Input onChange={handleCountryChange} type="select" name="select" id="exampleSelect">
              {countries.map((country, key) =>
                <option key={key} selected={country === currentCountry} value={country}>{country}</option>)}
            </Input>
          </FormGroup>
        </Col>
      </Row>
      <Row>
        <Col lg="12" >
          <NewCases country={currentCountry} />
        </Col>
      </Row>
    </Container>
  )
}

export default App
