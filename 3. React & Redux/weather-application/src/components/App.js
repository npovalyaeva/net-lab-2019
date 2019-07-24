import React, { Component } from 'react';
import moment from 'moment';
import { connect } from 'react-redux';
import { fetchData, setActivePlace } from '../actions/act';
import "bootswatch/flatly/bootstrap.css";
import { Navbar, Grid, Row, Col } from "react-bootstrap";
import '../styles/App.css';

import logo from '../resources/logo.svg';
import rightArrowImg from '../resources/right-arrow.svg';
import leftArrowImg from '../resources/left-arrow.svg';

class WeatherDisplay extends Component{

    collectData(place){
        let URL = `https://cors-anywhere.herokuapp.com/https://api.weather.yandex.ru/v1/forecast?lat=${this.props.cities[place].lat}&lon=${this.props.cities[place].lon}&lang=en_USlimit=7&hours=false&extra=false`;
        this.props.fetchData(URL);
    }

    componentWillReceiveProps(nextProps) {
            if (this.props.activePlace !== nextProps.activePlace) {
                this.collectData(nextProps.activePlace);
            } 
    }

    componentDidMount() {
        this.collectData(this.props.activePlace);
    }

    render() {
        let weatherData = this.props.weatherData;
            if (weatherData.now) {
                const weatherMain = weatherData.fact; 
                const iconUrl = `https://yastatic.net/weather/i/icons/blueye/color/svg/${weatherMain.icon}.svg`;
                return (
                    <div className="weather">
                        <h1>{weatherMain.condition} in {this.props.cities[0].name}</h1>
                        <div className="weather-content">
                            {(() => {
                                switch(this.props.countOfDays) {
                                    case 1:
                                        return <div className="one-day-weather" >
                                            <img src={iconUrl} width="300" height="300" alt={weatherMain.condition}/>
                                            <h2>
                                                {weatherMain.temp}°C
                                            </h2>
                                            <h4>
                                                Feels like {weatherMain.feels_like}°C
                                            </h4>
                                            <h6>
                                                Wind Speed: {weatherMain.wind_speed} m/s
                                            </h6>
                                            <h6>
                                                Humidity: {weatherMain.humidity} %
                                            </h6>
                                        </div>
                                    default:
                                        const weatherForecasts = weatherData.forecasts.slice(0, this.props.countOfDays);
                                        return weatherForecasts.map(item =>
                                            <div className="one-of-several-days-weather">
                                                <h3>
                                                    {moment(item.date).format('MMM Do')}
                                                </h3>
                                                {(() => {
                                                    if (this.props.countOfDays < 6)
                                                        return <img src={`https://yastatic.net/weather/i/icons/blueye/color/svg/${item.parts.day_short.icon}.svg`} 
                                                            width="250" height="250" alt={weatherMain.condition}/>
                                                    else
                                                        return <img src={`https://yastatic.net/weather/i/icons/blueye/color/svg/${item.parts.day_short.icon}.svg`} 
                                                            width="190" height="190" alt={weatherMain.condition}/>
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

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {countOfDays: 1};

        // Привязка необходима, чтобы сделать this доступным в коллбэке
        this.changeCountOfDaysToTheLeft = this.changeCountOfDaysToTheLeft.bind(this);
        this.changeCountOfDaysToTheRight = this.changeCountOfDaysToTheRight.bind(this);
      }

      changeCountOfDaysToTheLeft(){
        this.setState((state) => {
            let count;
            switch (state.countOfDays) {
                case 1: count = 7; break;
                case 3: count = 1; break;
                case 5: count = 3; break;
                case 7: count = 5; break;
            }
            return {countOfDays: count}
          });
      }

      changeCountOfDaysToTheRight(){
        this.setState((state) => {
            let count;
            switch (state.countOfDays) {
                case 1: count = 3; break;
                case 3: count = 5; break;
                case 5: count = 7; break;
                case 7: count = 1; break;
            }
            return {countOfDays: count}
          });
      }
    render() {
        return (
            <div className="App">
                <Grid>
                    <Row>
                        <Col className="arrow">
                            <img
                                src={leftArrowImg}
                                width="50"
                                height="50"
                                className="d-inline-block align-top"
                                alt="SSAW Weather logo"
                                onClick={this.changeCountOfDaysToTheLeft}
                            />
                            
                        </Col>
                        <Col className="main-content">
                            <Navbar className="nav-strip">
                                <Navbar.Header>
                                    <Navbar.Brand href="#home">
                                        <img
                                            src={logo}
                                            width="100"
                                            height="100"
                                            className="d-inline-block align-top"
                                            alt="SSAW Weather logo"
                                        />
                                    </Navbar.Brand>
                                </Navbar.Header>
                            </Navbar>
                            <WeatherDisplay key={0} countOfDays={this.state.countOfDays} cities={this.props.cities} weatherData={this.props.weather} activePlace={this.props.activePlace} fetchData={this.props.fetchData}/>
                        </Col>
                        <Col className="arrow">
                            <img
                                src={rightArrowImg}
                                width="50"
                                height="50"
                                className="d-inline-block align-top"
                                alt="SSAW Weather logo"
                                onClick={this.changeCountOfDaysToTheRight}
                            />
                        </Col>
                    </Row>
                </Grid>
            </div>
        )
    };
};

const mapStateToProps = (state) => {
    return {
        weather: state.weatherData,
        activePlace: state.activePlace,
        cities: state.cities
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        fetchData: (url) => dispatch(fetchData(url)),
        setActivePlace: (index) => dispatch(setActivePlace(index))
    };
};

function changeCountOfDays(direction) {
   
  }

export default connect(
mapStateToProps,
mapDispatchToProps)(App);

