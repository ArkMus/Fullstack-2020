import axios from 'axios'
const api_key = process.env.REACT_APP_API_KEY
const baseUrl = `http://api.weatherstack.com/current?access_key=${api_key}`

const getCountries = () => {
    return axios.get('https://restcountries.eu/rest/v2/all')
}

const getWeather = (capital) => {
    let query = `${baseUrl}&query=${capital}`
    console.log(query);
    return axios.get(query)
    // const request = axios.get(query)
    // return request.then(response => response.data)
}

export default {getCountries, getWeather}