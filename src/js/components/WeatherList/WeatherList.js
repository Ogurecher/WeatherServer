import React, { Component } from 'react';
import WeatherListItem from '../WeatherListItem/WeatherListItem';
import './WeatherList.css';

export default class WeatherList extends Component {

    render() {
        return (
            <div className='city-info-weather-list'>
                <WeatherListItem label='Wind' content={[`${this.props.weather.wind.deg}deg`, `; ${this.props.weather.wind.speed} m/s`]} />
                <WeatherListItem label='Clouds'  content={[this.props.weather.weather[0].description]}/>
                <WeatherListItem label='Pressure' content={[`${this.props.weather.main.pressure} hpa`]} />
                <WeatherListItem label='Humidity' content={[`${this.props.weather.main.humidity}%`]} />
                <WeatherListItem label='Coordinates' content={[`[${this.props.weather.coord.lat}`, `; ${this.props.weather.coord.lon}]`]} />
            </div>
        );
    }
}