import React, { Component } from 'react';
import CityInfo from '../CityInfo/CityInfo';
import './Favourites.css';

export default class Favourites extends Component {
    
    render() {
        let cities = this.props.cities.slice();
        cities = cities.reduce((unique, elem1) => {
            if(!unique.some(elem2 => elem2.position.city === elem1.position.city)) {
              unique.push(elem1);
            }
            return unique;
        },[]);
        cities = cities.map((element, index) => {
            if (this.props.favourites.includes(element.position.city.toString())) {
                return (<CityInfo key={index} city={element} />);
            }
            return null;
        }
                
        );
        return (
            <div className='favourites-cities-wrapper'>
                {cities}
            </div>
        );
    }
}