import React, { Component } from 'react';

export default class Temperature extends Component {

    render() {
        return (
            <p> {this.props.weather.main.temp}°C </p>
        );
    }
}