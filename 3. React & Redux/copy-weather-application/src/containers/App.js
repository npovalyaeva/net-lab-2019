import React, { PureComponent } from 'react';
import "bootswatch/dist/flatly/bootstrap.css";
import { Navbar, Grid, Row, Col } from "react-bootstrap";
import '../styles/App.css';

import { Header } from '../components/Header';
import { OneDayWeather, SeveralDaysWeather } from '../components/WeatherForecast';
import { Footer } from '../components/Footer';

import rightArrowImg from '../resources/right-arrow.svg';
import leftArrowImg from '../resources/left-arrow.svg';

class WeatherDisplay extends PureComponent{
    constructor() {
        super();
        this.state = {
            cityData: null,
            weatherData: null
        };
    }

    // getCoordinates() {
        
    //     return new Promise((getForecast) => {

    //         const cityName = this.props.cityName;
    //         const yandexGeocoderURL = `https://geocode-maps.yandex.ru/1.x/?format=json&?apikey=7d5334f1-6bfb-484f-a173-ebf8c560139b&geocode=${cityName}`;
    //         fetch(yandexGeocoderURL)
    //         .then(res => res.json())
    //         .then(json => {
    //             this.setState({ cityData: json });
    //         })

    //         getForecast();
    //     })
    // }

    getCoordinates() {
            const cityName = this.props.cityName;
            const yandexGeocoderURL = `https://geocode-maps.yandex.ru/1.x/?format=json&?apikey=7d5334f1-6bfb-484f-a173-ebf8c560139b&geocode=${cityName}`;
            fetch(yandexGeocoderURL)
            .then(res => res.json())
            .then(json => {
                console.log(json);
                this.setState({ cityData: json });
            })
            .then(function() {
                return this.getForecast();
            });
    }

    getForecast() {
        const coordinates = this.state.cityData.response.GeoObjectCollection.featureMember[0].GeoObject.Point.pos.split(' ');
        const yandexWeatherURL = `https://cors-anywhere.herokuapp.com/https://api.weather.yandex.ru/v1/forecast?lat=${coordinates[1]}&lon=${coordinates[0]}&lang=en_USlimit=7&hours=false&extra=false`;
        //const yandexWeatherURL = `https://cors-anywhere.herokuapp.com/https://api.weather.yandex.ru/v1/forecast?lat=53.902496&lon=27.561481&lang=en_USlimit=7&hours=false&extra=false`;

        fetch(yandexWeatherURL, {
            method: 'GET',
            headers: {
                'X-Yandex-API-Key' : 'b5a43458-5c75-4958-bb67-b59a4142f220'
            }
        })
        .then(res => res.json())
        .then(json => {
            this.setState({ weatherData: json });
        });
    }

    componentWillMount() {
        this.getCoordinates();
    }

    render() {
            const weatherData = this.state.weatherData;

            if (weatherData) {
                return (
                    <div className="weather">
                        <h1>{weatherData.fact.condition} in {this.props.currentCity}</h1>
                        <div className="weather-content">
                            {(() => {
                                switch(this.props.countOfDays) {
                                    case 1:
                                        return ( <OneDayWeather oneDayWeather={weatherData.fact}/> );
                                    default:
                                        return ( <SeveralDaysWeather countOfDays={this.props.countOfDays} sevenDaysWeather={weatherData.forecasts}/> );
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

class App extends PureComponent {

    constructor(props) {
        super(props);
        this.state = {
            countOfDays: 1,
            currentCity: 'Minsk'
        };

        // Эта привязка обязательна для работы `this` в колбэке.
        this.changeCountOfDaysToTheLeft = this.changeCountOfDaysToTheLeft.bind(this);
        this.changeCountOfDaysToTheRight = this.changeCountOfDaysToTheRight.bind(this);
        //this.onKeyPress = this.onKeyPress.bind(this);
    }

    // Объединить в одну функцию
    changeCountOfDaysToTheLeft() {
        this.setState((state) => {
            let count;
            switch (state.countOfDays) {
                case 1: count = 7; break;
                case 3: count = 1; break;
                case 5: count = 3; break;
                case 7: count = 5; break;
                default: break;
            }
            return {countOfDays: count}
        });
    }

    changeCountOfDaysToTheRight() {
        this.setState((state) => {
            let count;
            switch (state.countOfDays) {
                case 1: count = 3; break;
                case 3: count = 5; break;
                case 5: count = 7; break;
                case 7: count = 1; break;
                default: break;
            }
            return {countOfDays: count}
        });
    }

    render() {
        return (
            <div className="App">
                <Grid>
                    <Row>
                        <Col className="arrow" onClick={this.changeCountOfDaysToTheLeft}>
                                <img
                                    src={leftArrowImg}
                                    width="40"
                                    height="40"
                                    className="d-inline-block align-top"
                                    alt="Prev"
                                />
                        </Col>
                        <Col className="main-content">
                            <Navbar className="nav-strip">
                                <Header/>
                            </Navbar>
                            <WeatherDisplay countOfDays={this.state.countOfDays} cityName={this.state.currentCity}/>
                        </Col>
                        <Col className="arrow" onClick={this.changeCountOfDaysToTheRight}>
                            <img
                                src={rightArrowImg}
                                width="40"
                                height="40"
                                className="d-inline-block align-top"
                                alt="Next"
                            />
                        </Col>
                    </Row>
                </Grid>
                <Footer/>
            </div>
        )
    };
}

export default App;