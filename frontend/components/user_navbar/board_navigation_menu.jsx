import React from 'react';
import { connect } from 'react-redux';
import { fetchBoards } from '../../actions/board_actions';
import { clearErrors } from '../../actions/board_actions'
import { Link } from 'react-router-dom';

const msp = state => {
    return {
        boards: state.entities.boards,
    }
}


const mdp = dispatch => {
    return {
        fetchBoards: () => dispatch(fetchBoards()),
        clearErrors: () => dispatch(clearErrors()),
    }
}

class BoardNavigationMenu extends React.Component {
    constructor(props){
        super(props)
    }

    componentDidMount(){
        this.props.fetchBoards()
    }

    render(){
        const { boards } = this.props;
        if (!boards){
            return (
                <div></div>
            )
        } else {
            return (
                <ul className={"board-navigation-menu"}>
                    <li id={"board-navigation-menu-title"}>Boards</li>
                    {/* <hr className={"menu-line"}></hr> */}
                    {Object.values(boards).map(board => (
                        <div key={board.id}>
                            <li onClick={this.props.clearErrors}>
                                <Link to={`/boards/${board.id}`}>
                                    {board.id}: {board.title}
                                </Link>
                            </li>
                            <hr className={"menu-line"}></hr>
                        </div>
                    ))}
                </ul>
            )
        }
    }
}



export default connect(msp, mdp)(BoardNavigationMenu);