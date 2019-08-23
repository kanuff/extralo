import React from 'react';
import { connect } from 'react-redux';
import { 
    destroyBoard,
    receiveErrors
} from '../../actions/board_actions';
import {
    closeModal
} from '../../actions/modal_actions'

// import {
//     fetchUsers
// } from '../../actions/session_actions';

import { withRouter } from 'react-router-dom';

const mdp = dispatch => {
    return {
        destroyBoard: id => dispatch(destroyBoard(id)),
        receiveErrors: errors => dispatch(receiveErrors(errors)),
        fetchUSers: errors => dispatch(fetchUSers(errors)),
        closeModal: () => dispatch(closeModal()),
    }
}

const msp = (state, ownProps) => {
    const defaultBoard = {
        title: "Title",
        description: "Description",
        favorited: false,
        member_ids: [],
    }
    //workaround since React doesn't allow params to be accessed globally without changing the structure of components on the root level
    const board_id = ownProps.history.location.pathname.split("/")[2]
    return {
        board: state.entities.boards[board_id] || defaultBoard,
        current_user_id: state.session.id,
        history: ownProps.history,
        errors: state.errors.board,
        users: state.entities.users,
    }
}

class BoardOptionsMenu extends React.Component{
    constructor(props){
        super(props)
        this.deleteBoard = this.deleteBoard.bind(this)
    }

    deleteBoard(){
        const { destroyBoard, board, current_user_id, history, receiveErrors} = this.props;
        if (current_user_id === board.creator_id) {
            destroyBoard(board.id)
                .then(() => history.push("/"))
        } else {
            receiveErrors({ responseJSON: ['Only the board owner and admins may delete this board'] })
        }
    }



    render(){
        const {users, board } = this.props;
        const boardMembers = Object.values(users).map( user => {
                if (board.member_ids.includes(user.id)) {
                    const admin = user.id === board.creator_id ? " (Admin)": ""
                    return (
                        <li className={"board-member"}
                            key={user.id}>
                            {user.name}
                            {admin}
                        </li>
                    )
                }
            }
        )

        return(
            <div className={"board-options-menu"}>
                <div className={"menu-title"}>
                    Menu
                    <button onClick={()=>this.props.closeModal()}>
                        x
                    </button>
                </div>
                <div className={"menu-options"}>
                    <div className={"board-members"}>
                        Board Members:
                        <ul>
                            {boardMembers}
                        </ul>
                    </div>
                    <button
                        id={"delete-board-button"}
                        onClick={() => this.deleteBoard()}
                    >
                        Delete This Board
                    </button>
                </div>
            </div>
        )
    }
}





export default withRouter(connect(msp,mdp)(BoardOptionsMenu));