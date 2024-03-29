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
        title: "",
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
            board_id: props.board_id,
            placeholder: " + Add another main thought"
        }
        this.update = this.update.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.editTitle = this.editTitle.bind(this)
        this.fillTitle = this.fillTitle.bind(this)
    }

    editTitle() {
        this.setState(
            { placeholder: "Enter main thought link" }
        )
    }

    fillTitle() {
        this.setState(
            { placeholder: " + Add another main thought" }
        )
    }

    handleSubmit(e){
        e.preventDefault()
        e.persist()
        const newList = {
            title: this.state.title
        }
        if (newList.title){
            this.props.createList(newList, this.props.board_id)
                      .then( () => {
                          e.target.reset()
                          this.setState({title: null})
                        })
        }
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
                    value={"Add Main Thought"}
                />
            </form>
        )
    }
}

export default withRouter(connect(msp, mdp)(CreateListForm))