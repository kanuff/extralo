import React from 'react';
import { connect } from 'react-redux';
import { updateList } from '../../actions/list_actions'


const msp = state => {
    return {

    }
}

const mdp = dispatch => {
    return {
        updateList: list => dispatch(updateList(list))
    }
}




class ListIndexItem extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            title: props.list.title,
            id: props.list.id,
        }
        this.update = this.update.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleSubmit(e) {
        e.preventDefault()
        this.props.updateList(
            this.state
            )
    }

    update(field) {
        return (e) => {
            this.setState({
                [field]: e.target.value,
            })
        }
    }

    render(){
        const { list } = this.props
        return (
            <li className={"list-index-item"} >
                <form onSubmit={this.handleSubmit}>
                    <input 
                        type="text"
                        value={this.state.title}
                        onChange={this.update("title")}
                        onBlur={this.handleSubmit}
                    />
                </form>
                <ul className={"card-container"}>
                    <div>CARDS GO HERE! askdfkj asdnf ahsdkfj haskjdfhkj ashdfkjhasdkjf</div>
                    <div>alsdfjlasdjflkajsdfl</div>
                    <div>alsdfjlasdjflkajsdfl</div>
                    <div>alsdfjlasdjflkajsdfl</div>
                    <div>alsdfjlasdjflkajsdfl</div>
                    <div>alsdfjlasdjflkajsdfl</div>
                    <div>alsdfjlasdjflkajsdfl</div>
                    <div>alsdfjlasdjflkajsdfl</div>
                    <div>alsdfjlasdjflkajsdfl</div>
                    <div>alsdfjlasdjflkajsdfl</div>
                    <div>alsdfjlasdjflkajsdfl</div>
                    <div>alsdfjlasdjflkajsdfl</div>
                    <div>alsdfjlasdjflkajsdfl</div>
                    <div>alsdfjlasdjflkajsdfl</div>
                    <div>alsdfjlasdjflkajsdfl</div>
                    <div>alsdfjlasdjflkajsdfl</div>
                    <div>alsdfjlasdjflkajsdfl</div>
                    <div>alsdfjlasdjflkajsdfl</div>
                    <div>alsdfjlasdjflkajsdfl</div>
                    <div>alsdfjlasdjflkajsdfl</div>
                    <div>alsdfjlasdjflkajsdfl</div>
                    <div>alsdfjlasdjflkajsdfl</div>
                    <div>alsdfjlasdjflkajsdfl</div>
                    <div>alsdfjlasdjflkajsdfl</div>
                    <div>alsdfjlasdjflkajsdfl</div>
                    <div>alsdfjlasdjflkajsdfl</div>
                    <div>alsdfjlasdjflkajsdfl</div>
                    <div>alsdfjlasdjflkajsdfl</div>
                    <div>alsdfjlasdjflkajsdfl</div>
                    <div>alsdfjlasdjflkajsdfl</div>
                    <div>alsdfjlasdjflkajsdfl</div>
                    <div>alsdfjlasdjflkajsdfl</div>
                    <div>alsdfjlasdjflkajsdfl</div>
                    <div>alsdfjlasdjflkajsdfl</div>
                    <div>alsdfjlasdjflkajsdfl</div>
                    <div>alsdfjlasdjflkajsdfl</div>
                    <div>alsdfjlasdjflkajsdfl</div>
                </ul>
            </li>
        )

    }
}

export default connect(msp, mdp)(ListIndexItem);