import React, { PureComponent } from 'react';

import { OneDayWeather } from './OneDayWeather';
import { SeveralDaysWeather } from './SeveralDaysWeather';

export class WeatherDisplay extends PureComponent{
    render() {
        const factWeatherData = this.props.factWeatherData
        const weatherData = this.props.weatherData;

        if (weatherData) {
            return (
                <div className="weather">
                    <h1>{factWeatherData.condition} in {this.props.cityName}</h1>
                    <div className="weather-content">
                        {(() => {
                            switch(this.props.countOfDays) {
                                case 1:
                                    return ( <OneDayWeather oneDayWeather={factWeatherData}/> );
                                default:
                                    return ( <SeveralDaysWeather countOfDays={this.props.countOfDays} sevenDaysWeather={weatherData}/> );
                            }
                        })()}                           
                    </div>
                </div>
            );
        }
        
        return (
            <div>
                Loading...
            </div>
        );
    }  
}