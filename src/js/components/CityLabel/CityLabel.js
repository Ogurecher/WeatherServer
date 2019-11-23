import React, { Component } from 'react';

export default class CityLabel extends Component {

    render() {
        return (
            <p> {this.props.weather.name} </p>
        );
    }
}
