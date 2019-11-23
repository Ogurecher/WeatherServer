import React, { Component } from 'react';
import GeolocationButton from '../GeolocationButton/GeolocationButton'
import InputForm from '../InputForm/InputForm'
import Favourites from '../Favourites/Favourites';
import CityInfo from '../CityInfo/CityInfo';
import { connect } from 'react-redux';
import { getWeather } from '../../actions/index';
import './App.css';

export class App extends Component {

  componentDidMount() {
    for (let i = 0; i < this.props.cities.length; i++) {
      this.props.getWeather(this.props.cities[i].position, i);
    }
  }

  componentDidUpdate(prevProps) {
    if (JSON.stringify(this.props.position) !== JSON.stringify(prevProps.position)) {
      this.props.getWeather(this.props.position, null);
    }

    for (let i = 0; i < this.props.cities.length; i++) {
      if (!prevProps.cities[i] || JSON.stringify(this.props.cities[i].weather) !== JSON.stringify(prevProps.cities[i].weather)) {
        this.props.getWeather(this.props.cities[i].position, i);
      }
    }
  }

  render() {
    return (
      <div>
        <GeolocationButton />
        <CityInfo city={{weather: this.props.weather, loading: this.props.loading, errorMsg: this.props.errorMsg}} id='main' />
        <InputForm />
        <Favourites cities={this.props.cities} favourites={this.props.favourites} />
      </div>
    );
  }
}


function mapStateToProps(state) {
  return {
    position: state.position,
    weather: state.weather,
    loading: state.loading,
    errorMsg: state.errorMsg,
    cities: state.cities,
    favourites: state.favourites
  };
}

export default connect(
  mapStateToProps,
  { getWeather }
)(App);