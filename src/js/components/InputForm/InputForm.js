import React, { Component } from 'react';
import { addToFavourites } from '../../actions/index';
import { connect } from 'react-redux';
import './InputForm.css';

export class InputForm extends Component {
    constructor(props) {
        super(props);
        this.state = {value: ''};

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(event) {
        this.setState({value: event.target.value});
    }

    handleSubmit(event) {
        event.preventDefault();
        
        this.props.addToFavourites(this.state.value);
        this.setState({value: ''});
    }

    render() {
        return (
            <form onSubmit={this.handleSubmit} className='favourites-form-wrapper'>
                <p className='favourites-text'>Favourites</p>
                <input type='text' value={this.state.value} onChange={this.handleChange} />
                <input type='submit' value='+' />
            </form>
        );
    }
}

function mapStateToProps(state) {
    return {};
}

export default connect(
    mapStateToProps,
    { addToFavourites }
  )(InputForm);