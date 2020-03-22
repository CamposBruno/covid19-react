import axios from 'axios'

const api = axios.create({
  baseURL: process.env.REACT_APP_COVID19_API_URL
})

export const curves = async (country) => {
  const { data } = await api.get(`/curve?country=${country}`)
  return data
}

export const countries = async () => {
  const { data } = await api.get('/countries')
  return data
}
