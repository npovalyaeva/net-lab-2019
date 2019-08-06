import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import { fetchData, fetchCity, setActivePlace } from '../actions/act';
import "bootswatch/dist/flatly/bootstrap.css";
import { Navbar, Grid, Row, Col, Form, FormControl } from "react-bootstrap";
import '../styles/App.css';

import { Header } from './Header';
import { OneDayWeather, SeveralDaysWeather } from './WeatherForecast';
import { Footer } from './Footer';

import rightArrowImg from '../resources/right-arrow.svg';
import leftArrowImg from '../resources/left-arrow.svg';

class WeatherDisplay extends PureComponent{

    collectData(placeLat, placeLon) {
        let URL = `https://cors-anywhere.herokuapp.com/https://api.weather.yandex.ru/v1/forecast?lat=${placeLat}&lon=${placeLon}&lang=en_USlimit=7&hours=false&extra=false`;
        this.props.fetchData(URL);
    }

    render() {
        let weatherData = this.collectData(this.props.currentCity);


            if (weatherData.now) {
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

    componentWillReceiveProps(nextProps) {
        if (this.props.activePlace !== nextProps.activePlace) {
            this.collectData(nextProps.activePlace);
        } 
    }

    componentDidMount() {
        this.collectData(this.props.activePlace);
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

    findCoordinates(cityName) {
        let URL = `https://geocode-maps.yandex.ru/1.x/?format=json&?apikey=7d5334f1-6bfb-484f-a173-ebf8c560139b&geocode=${cityName}`;
        this.props.fetchCity(URL);
    }

    render() {
        let cityData = this.findCoordinates(this.state.currentCity);

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
                            <WeatherDisplay countOfDays={this.state.countOfDays} cityName={this.state.currentCity} cityData={cityData}/>
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

const mapStateToProps = (state) => {
    return {
        weather: state.weatherData,
        activePlace: state.currentCity,
        cities: state.cities
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        fetchData: (url) => dispatch(fetchData(url)),
        setActivePlace: (index) => dispatch(setActivePlace(index))
    };
};

export default connect(
mapStateToProps,
mapDispatchToProps)(App);