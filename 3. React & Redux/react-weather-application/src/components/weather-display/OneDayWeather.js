import React, { PureComponent } from 'react';

export class OneDayWeather extends PureComponent {

    render() {
        let weatherForecast = this.props.oneDayWeather;
        const iconUrl = `https://yastatic.net/weather/i/icons/blueye/color/svg/${weatherForecast.icon}.svg`;

        return (
            <div className="one-day-weather" >
                <img src={iconUrl} width="300" height="300" alt={weatherForecast.condition}/>
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