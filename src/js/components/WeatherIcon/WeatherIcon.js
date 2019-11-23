import React, { Component } from 'react';
import { WEATHER_ICON_BASE_URL } from '../../constants/resources'

export default class WeatherIcon extends Component {

    render() {
        return (
            <img src={`${WEATHER_ICON_BASE_URL}${this.props.weather.weather[0].icon}@2x.png`}/>
        );
    }
}