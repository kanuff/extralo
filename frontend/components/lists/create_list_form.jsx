import React from 'react';
import { connect } from 'react-redux';
import { closeModal } from '../../actions/modal_actions';
import { withRouter } from 'react-router-dom';
import { createList } from '../../actions/list_actions';

const mdp = dispatch => {
    return {
        createList: (list, board_id) => dispatch(createList(list, board_id)),
    }
}

const msp = (state, ownProps) => {
    const defaultList = {
        title: "Add another list",
        board_id: ownProps.match.params.board_id,
    }
    return {
        list: defaultList,
    }
}

class CreateListForm extends React.Component {
    constructor(props){
        super(props)
        this.state = {
            title: props.list.title,
            board_id: props.list.board_id,
        }
        this.update = this.update.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleSubmit(e){
        e.preventDefault()
        const newList = {
            title: this.state.title
        }
        this.props.createList(newList, this.state.board_id)
    }

    update(field){
        return (e) => {
            this.setState({
                [field]: e.target.value,
            })
        }
    }

    render() {
        return (
            <form className={"create-list-form"} onSubmit={this.handleSubmit}>
                <input 
                    type="text"
                    value={this.state.title}
                    onChange={this.update("title")}
                />
                <div>{this.props.list.title}</div>
                <div>{this.props.list.board_id}</div>
            </form>
        )
    }
}

export default withRouter(connect(msp, mdp)(CreateListForm))