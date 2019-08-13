import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import { fetchData } from '../actions/index';
import "bootswatch/dist/flatly/bootstrap.css";
import { Navbar, Grid, Row, Col } from "react-bootstrap";

import { initialCity } from '../constants';
import '../styles/App.css';

import { Header } from './Header';
import { WeatherDisplay } from './weather-display/WeatherDisplay';
import { Footer } from './Footer';

import rightArrowImg from '../resources/right-arrow.svg';
import leftArrowImg from '../resources/left-arrow.svg';

class App extends PureComponent {

    constructor(props) {
        super(props);
        this.state = {
            countOfDays: 1
        };

        // Эта привязка обязательна для работы `this` в колбэке.
        this.changeCountOfDaysToTheLeft = this.changeCountOfDaysToTheLeft.bind(this);
        this.changeCountOfDaysToTheRight = this.changeCountOfDaysToTheRight.bind(this);
        this.handleKeyUp = this.handleKeyUp.bind(this);
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

    handleKeyUp(event) {
        const keyCode = event.keyCode || event.which;
        if (keyCode === 13) {
            this.props.getWeatherForecast(event.target.value);
        }
    };

    componentWillMount() {
        this.props.getWeatherForecast(initialCity);
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
                                <input 
                                    type="text" 
                                    placeholder="Enter a City"
                                    className="cityInput"
                                    onKeyUp={this.handleKeyUp}
                                />
                            </Navbar>
                            <WeatherDisplay countOfDays={this.state.countOfDays} cityName={this.props.currentCity} factWeatherData={this.props.factWeatherData} weatherData={this.props.weatherData}/>
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
        factWeatherData: state.weatherData.factWeatherData,
        weatherData: state.weatherData.weatherData,
        currentCity: state.weatherData.currentCity
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        getWeatherForecast: (currentCity) => dispatch(fetchData(currentCity))
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps)(App);