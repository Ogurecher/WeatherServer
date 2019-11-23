import React, { Component } from 'react';
import { removeFromFavourites } from '../../actions/index';
import { connect } from 'react-redux';

export class CloseButton extends Component {
    constructor(props) {
        super(props);

        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleSubmit(event) {
        event.preventDefault();
        
        this.props.removeFromFavourites(this.props.city.position.city);
    }
    
    render() {
        return (
            <form onSubmit={this.handleSubmit}>
                <input type='submit' value='X' />
            </form>
        );
    }
}

function mapStateToProps(state) {
    return {};
}

export default connect(
    mapStateToProps,
    { removeFromFavourites }
)(CloseButton);