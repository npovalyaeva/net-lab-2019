import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchData, setActivePlace } from '../actions/act';
import "bootswatch/flatly/bootstrap.css";
import { Navbar,NavDropdown, MenuItem, Nav, Grid, Row, Col } from "react-bootstrap";
import '../styles/App.css';

import logo from '../resources/logo.svg';
import rightArrowImg from '../resources/right-arrow.svg';
import leftArrowImg from '../resources/left-arrow.svg';

class WeatherDisplay extends Component{

    collectData(place){
        let URL = `http://api.openweathermap.org/data/2.5/weather?q=${this.props.cities[place].name}&appid=e03fcde097d74790d2a8569aa4d88bd1&units=metric`;
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
            if (weatherData.weather) {
                const weatherMain = weatherData.weather[0]; 
                const iconUrl = `http://openweathermap.org/img/w/${weatherMain.icon}.png`;
                return (
                    <div className="weather-content" >
                        <h1>
                            {weatherData.name}
                        </h1>
                        <img src={iconUrl} width="250" height="250" alt={weatherData.description}/>
                        <h2>
                            {weatherData.main.temp}°C
                        </h2>
                        <p>
                            Wind Speed: {weatherData.wind.speed} m/s
                        </p>
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
                            <WeatherDisplay key={0} cities={this.props.cities} weatherData={this.props.weather} activePlace={this.props.activePlace} fetchData={this.props.fetchData}/>
                        </Col>
                        <Col className="arrow">
                            <img
                                src={rightArrowImg}
                                width="50"
                                height="50"
                                className="d-inline-block align-top"
                                alt="SSAW Weather logo"
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

export default connect(
mapStateToProps,
mapDispatchToProps)(App);

