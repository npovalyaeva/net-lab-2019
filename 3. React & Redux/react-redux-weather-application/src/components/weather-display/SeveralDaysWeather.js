import React, { PureComponent } from 'react';
import moment from 'moment';

import { GetIconURL } from '../../constants'; 

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
                    return <img src={GetIconURL(item.parts.day_short.icon)} 
                        width="150" height="150" alt={item.parts.day_short.condition}/>
                    else if (this.props.countOfDays > 3)
                        return <img src={GetIconURL(item.parts.day_short.icon)} 
                            width="210" height="210" alt={item.parts.day_short.condition}/>
                    else if (this.props.countOfDays > 1)
                        return <img src={GetIconURL(item.parts.day_short.icon)} 
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