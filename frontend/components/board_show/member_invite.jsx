import React from 'react';
import { connect } from 'react-redux';
import { addMember } from '../../actions/board_membership_actions';
import { withRouter } from 'react-router-dom';

const mdp = dispatch => {
    return {
        addMember: (user_id, board_id) => dispatch(addMember(user_id, board_id)),
    }
}

const msp = (state, ownProps) => {
    return{
        board_id: ownProps.location.pathname.split("/").pop(),
    }
}

class MemberInvite extends React.Component{
    constructor(props){
        super(props)
        this.handleSubmit = this.handleSubmit.bind(this)
        debugger
        this.state = {
            user_id: 0,
            board_id: this.props.board_id,
        }
    }


    handleSubmit(e) {
        e.preventDefault();
        this.props.addMember(this.state);
    }

    update(field) {
        return (e) => {
            this.setState({
                [field]: e.target.value,
            })
        }
    }

    render(){
        return (
            <div className={"member-invite"}>
                <form className={"member-invite-form"} onSubmit={this.handleSubmit}>
                    <input
                        onChange={this.update("user_id")}
                        type="text"
                        />
                    <input type="submit" value="Invite members"/>
                </form>
            </div>
        )
    }
}

export default withRouter(connect(msp, mdp)(MemberInvite));