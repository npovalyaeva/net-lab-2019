import React, { PureComponent } from 'react';

import { GetIconURL } from '../../constants'; 

export class OneDayWeather extends PureComponent {

    render() {
        let weatherForecast = this.props.oneDayWeather;

        return (
            <div className="one-day-weather" >
                <img src={GetIconURL(weatherForecast.icon)} width="300" height="300" alt={weatherForecast.condition}/>
                <h2>
                    {weatherForecast.temp}°C
                </h2>
                <h4>
                    Feels like {weatherForecast.feels_like}°C
                </h4>
                <h6>
                    Wind Speed: {weatherForecast.wind_speed} m/s
                </h6>
                <h6>
                    Humidity: {weatherForecast.humidity} %
                </h6>
            </div>
        );
    }
}