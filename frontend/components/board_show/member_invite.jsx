import React from 'react';
import { connect } from 'react-redux';
import { addMember } from '../../actions/board_membership_actions';
import { fetchUsers } from '../../actions/session_actions';
import { fetchBoard } from '../../actions/board_actions';
import { withRouter } from 'react-router-dom';

const mdp = dispatch => {
    return {
        addMember: (user_id, board_id) => dispatch(addMember(user_id, board_id)),
        fetchUsers: name => dispatch(fetchUsers(name)),
        fetchBoard: board_id => dispatch(fetchBoard(board_id)),
    }
}

const msp = (state, ownProps) => {
    return{
        board_id: ownProps.location.pathname.split("/").pop(),
        users: state.entities.users,
        inviteStatus: state.ui.membership
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

    // componentDidUpdate(prevProps){
    //     if(this.props !== prevProps){
    //         if(this.props.inviteStatus === "Success"){
    //             this.props.fetchBoard(this.props.board_id)
    //         }
    //     }
    // }

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
        this.props.addMember(membership, membership.board_id)
            .then( () => this.props.fetchBoard(this.props.board_id))
        this.setState({name: "", user_id: 0})
    }

    update(field) {
        return (e) => {
            this.setState({
                [field]: e.target.value,
            })
            if(e.target.value !== ""){
                this.fetchUsers(e.target.value)
            }
        }
    }

    // generateMembers(){
    //     const sharableMembers = Object.values(users).map((user, idx) => {
    //         if (idx > 0) {
    //             return (
    //                 <li className={"member-invite-listing"}
    //                     onClick={this.setUserId(user)}
    //                     key={user.id}>
    //                     {user.name}
    //                 </li>
    //             )
    //         }
    //     })
    //     return sharableMembers
    // }


    render(){
        const { users } = this.props
        const alert = this.props.inviteStatus.map((message, idx) => {
            const styling = {
                background: message === "Success" ? "rgb(85, 196, 85)" : "rgb(168, 23, 23)",
                width: message === "Success" ? "200px" : "300px",
            }
            return (
                <div style={styling} id={"invite-status-alert"} key={idx}>{message}</div>
            )
        })
        const sharableMembers = Object.values(users).map( (user, idx) => {
            if (idx > 0 ){
                if (user.name.includes(this.state.name) && this.state.name!==""){
                    return(
                        <li className={"member-invite-listing"}
                            onClick={this.setUserId(user)}
                            key={user.id}>
                            {user.name}
                        </li>
                    )
                }
            }
        })

        return (
            <div className={"member-invite"}>
                {alert}
                <form className={"member-invite-form"} onSubmit={this.handleSubmit}>
                    <input
                        onChange={this.update("name")}
                        value={this.state.name}
                        type="text"
                        />
                    <ul className={"member-list"}>
                        {sharableMembers}
                    </ul>
                    <input type="submit" value="Invite members"/>
                </form>
            </div>
        )
    }
}

export default withRouter(connect(msp, mdp)(MemberInvite));