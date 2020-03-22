import React, { useEffect, useState } from 'react'
import PropType from 'react-proptypes'
import { LineChart, Line, CartesianGrid, XAxis, YAxis, Tooltip, Legend } from 'recharts'
import * as covid19 from '../services/covid19'
let screenwidth = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth

screenwidth = screenwidth - 30
screenwidth = screenwidth > 1000 ? 1000 : screenwidth

NewCases.propTypes = {
  country: PropType.string
}

export default function NewCases ({ country }) {
  const [data, setData] = useState([])

  useEffect(() => {
    covid19.curves(country).then(result => {
      const casesCurve = result.cases_curve
      const deathsCurve = result.deaths_curve
      const recoveredCurve = result.recovered_curve
      const activesCurve = result.actives_curve

      const newCasesCurve = result.new_cases_curve
      const newDeathsCurve = result.new_deaths_curve

      const _data = casesCurve.map((cases, index) => {
        return {
          name: `Dia ${index + 1}`,
          Casos: cases,
          Mortes: deathsCurve[index],
          Recuperados: recoveredCurve[index],
          Ativos: activesCurve[index],
          'Novos casos': newCasesCurve[index],
          'Novas Mortes': newDeathsCurve[index]
        }
      })

      setData(_data)
    })
  }, [country])

  return (

    <LineChart margin={{ top: 5, right: 5, bottom: 5, left: -15 }} width={screenwidth} height={400} data={data}>
      <Line type="monotone" dataKey="Casos" stroke="#8884d8" />
      <Line type="monotone" dataKey="Mortes" stroke="#8283d8" />
      <Line type="monotone" dataKey="Recuperados" stroke="#4282f8" />
      <Line type="monotone" dataKey="Ativos" stroke="#32F2A8" />
      <Line type="monotone" dataKey="Novos Casos" stroke="#12FFC8" />
      <Line type="monotone" dataKey="Novas Mortes" stroke="#B242A1" />
      <CartesianGrid stroke="#ccc" />
      <XAxis tick='aloe' dataKey="name" />
      <YAxis />
      <Tooltip />
      <Legend />
    </LineChart>

  )
}
