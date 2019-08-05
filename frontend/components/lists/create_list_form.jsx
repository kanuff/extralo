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
        title: " + Add another list",
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
            placeholder: " + Add another list"
        }
        this.update = this.update.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.editTitle = this.editTitle.bind(this)
        this.fillTitle = this.fillTitle.bind(this)
    }

    editTitle() {
        this.setState(
            { placeholder: "Enter list title..." }
        )
    }

    fillTitle() {
        this.setState(
            { placeholder: " + Add another list" }
        )
    }

    handleSubmit(e){
        e.preventDefault()
        e.persist()
        const newList = {
            title: this.state.title
        }
        this.props.createList(newList, this.state.board_id)
                  .then( () => e.target.reset())
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
                    onChange={this.update("title")}
                    onFocus={this.editTitle}
                    onBlur={this.fillTitle}
                    placeholder={this.state.placeholder}
                />
                <input
                    type="submit"
                    value={"Add List"}
                />
            </form>
        )
    }
}

export default withRouter(connect(msp, mdp)(CreateListForm))