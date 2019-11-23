import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getLocation } from '../../actions/index';
import './GeolocationButton.css';

export class GeolocationButton extends Component {
    constructor(props) {
        super(props);

        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleSubmit(event) {
        event.preventDefault();
        this.props.getLocation();
    }

    componentDidMount() {
        this.props.getLocation();
    }

    render() {
        return (
            <div className='geolocation-wrapper'>
                <p className='geolocation-text'>Weather here</p>
                <form onSubmit={this.handleSubmit}>
                    <input type='submit' value = 'Get location'/>
                </form>
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {};
}

export default connect(
    mapStateToProps,
    { getLocation }
  )(GeolocationButton);