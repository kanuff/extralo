import React from 'react';
import { connect } from 'react-redux';
import { 
    destroyBoard,
    receiveErrors
} from '../../actions/board_actions';
import { withRouter } from 'react-router-dom';

const mdp = dispatch => {
    return {
        destroyBoard: id => dispatch(destroyBoard(id)),
        receiveErrors: errors => dispatch(receiveErrors(errors)),
    }
}

const msp = (state, ownProps) => {
    const defaultBoard = {
        title: "Title",
        description: "Description",
        favorited: false,
        members: [],
    }
    //workaround since React doesn't allow params to be accessed globally without changing the structure of components on the root level
    const board_id = ownProps.history.location.pathname.split("/")[2]
    return {
        board: state.entities.boards[board_id] || defaultBoard,
        current_user_id: state.session.id,
        history: ownProps.history,
        errors: state.errors.board,
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
  
        console.log(this.props)
        return(
            <div className={"board-options-menu"}>
                <div className={"menu-title"}>
                    Menu
                </div>
                <div className={"menu-options"}>
                    <button 
                        id={"delete-board-button"}
                        onClick={ () => this.deleteBoard() }
                    >
                        Delete This Board
                    </button>
                </div>
            </div>
        )
    }
}





export default withRouter(connect(msp,mdp)(BoardOptionsMenu));