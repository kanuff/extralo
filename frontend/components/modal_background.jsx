import React from 'react';
import { closeModal } from '../actions/modal_actions';
import { connect } from 'react-redux';


class Modal extends React.Component{

    render(){
        return (
            <div className={`modal-background transparent`} onClick={this.props.closeModal}></div>
        );
    }
}

const mdp = dispatch => {
    return {
        closeModal: () => dispatch(closeModal()),
    }
}

export default connect(null, mdp)(Modal);