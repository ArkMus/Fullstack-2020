import React, { useState, useEffect } from 'react';
import dataService from '../services/dataService';

const Weather = (props) => {
    const [weather, setWeather] = useState([])

    useEffect(() => {
        console.log('effect')
        dataService
            .getWeather(props.capital)
            .then(response => {
                console.log('promise fulfilled')
                setWeather(response.data)
            })
    }, [])


    return ( 
        <div>
            <p>
                <b>temperature:</b> {weather.current ? weather.current.temperature : "none"} Celcius
            </p>
            <img src={weather.current ? weather.current.weather_icons[0] : "none"} alt="img" width="100" height="100" />
            
            <p>
                <b>wind:</b> {weather.current ? weather.current.wind_speed : "none"} mph direction &nbsp;
                {weather.current ? weather.current.wind_dir : "none"}
            </p>
        </div>
    )
}

export default Weather