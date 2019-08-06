import React, { PureComponent } from 'react';
import moment from 'moment';

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

export class SeveralDaysWeather extends PureComponent {

    render() {
        const weatherForecasts = this.props.sevenDaysWeather.slice(0, this.props.countOfDays);

        return weatherForecasts.map(item =>
            <div key={item.date.toString()} className="one-of-several-days-weather">
                <h3>
                    {moment(item.date).format('MMM Do')}
                </h3>
                {(() => {
                    if (this.props.countOfDays > 5)
                    return <img src={`https://yastatic.net/weather/i/icons/blueye/color/svg/${item.parts.day_short.icon}.svg`} 
                        width="150" height="150" alt={item.parts.day_short.condition}/>
                    else if (this.props.countOfDays > 3)
                        return <img src={`https://yastatic.net/weather/i/icons/blueye/color/svg/${item.parts.day_short.icon}.svg`} 
                            width="210" height="210" alt={item.parts.day_short.condition}/>
                    else if (this.props.countOfDays > 1)
                        return <img src={`https://yastatic.net/weather/i/icons/blueye/color/svg/${item.parts.day_short.icon}.svg`} 
                            width="250" height="250" alt={item.parts.day_short.condition}/>
                })()}
                <h2>
                    {item.parts.day_short.temp}°C
                </h2>
                <h6>
                    Wind Speed: {item.parts.day_short.wind_speed} m/s
                </h6>
                <h6>
                    Humidity: {item.parts.day_short.humidity} %
                </h6>
            </div>
        )
    }
}