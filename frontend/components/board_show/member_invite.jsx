import React from 'react';
import { connect } from 'react-redux';
import { addMember } from '../../actions/board_membership_actions';
import { fetchUsers } from '../../actions/session_actions';
import { withRouter } from 'react-router-dom';

const mdp = dispatch => {
    return {
        addMember: (user_id, board_id) => dispatch(addMember(user_id, board_id)),
        fetchUsers: name => dispatch(fetchUsers(name)),
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
        this.state = {
            name: "",
            user_id: 0,
            board_id: this.props.board_id,
        }
        this.fetchUsers = this.fetchUsers.bind(this);
        this.setUserId = this.setUserId.bind(this);
    }

    fetchUsers(name){
        this.props.fetchUsers(name)
    }

    setUserId(user){
        return () => {
            return this.setState({
                user_id: user.id,
                name: user.name
            })
        }
    }

    handleSubmit(e) {
        e.preventDefault();
        const membership = {
            user_id: this.state.user_id,
            board_id: this.state.board_id,
        }
        this.props.addMember(membership, membership.board_id);
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
        const { users } = this.props
        const sharableMembers = Object.values(users).map( (user, idx) => {
            if (idx > 0 ){ //render all for now, later add logic to intelligently render the most relevant
                return(
                    <li className={"member-invite-listing"}
                        onClick={this.setUserId(user)}
                        key={user.id}>
                        {user.name}
                    </li>
                )
            }
        })

        return (
            <div className={"member-invite"}>
                <form className={"member-invite-form"} onSubmit={this.handleSubmit}>
                    <input
                        onChange={this.update("name")}
                        value={this.state.name}
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