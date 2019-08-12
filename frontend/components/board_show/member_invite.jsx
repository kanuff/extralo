import React from 'react';
import { connect } from 'react-redux';
import { addMember } from '../../actions/board_membership_actions';
import { fetchUsers } from '../../actions/session_actions';
import { withRouter } from 'react-router-dom';

const mdp = dispatch => {
    return {
        addMember: (user_id, board_id) => dispatch(addMember(user_id, board_id)),
    }
}

const msp = (state, ownProps) => {
    return{
        board_id: ownProps.location.pathname.split("/").pop(),
        users: state.entities.users,
    }
}

class MemberInvite extends React.Component{
    constructor(props){
        super(props)
        this.handleSubmit = this.handleSubmit.bind(this)
        debugger
        this.state = {
            name: "",
            board_id: this.props.board_id,
        }
        this.fetchUsers = this.fetchUsers.bind(this);
    }

    fetchUsers(name){
        this.props.fetchUsers(name)
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
            this.fetchUsers(e.target.value)
        }
    }

    render(){
        const { users } = this.props;
        const sharableMembers = users.map( user => {
            <li key={user.id}>
                {user.name}
            </li>
        })

        return (
            <div className={"member-invite"}>
                <form className={"member-invite-form"} onSubmit={this.handleSubmit}>
                    <input
                        onChange={this.update("name")}
                        type="text"
                        />
                    <ul>
                        {sharableMembers}
                    </ul>
                    <input type="submit" value="Invite members"/>
                </form>
            </div>
        )
    }
}

export default withRouter(connect(msp, mdp)(MemberInvite));