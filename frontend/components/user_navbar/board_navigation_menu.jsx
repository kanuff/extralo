import React from 'react';
import { connect } from 'react-redux';
import { fetchBoards } from '../../actions/board_actions';
import { Link } from 'react-router-dom';

const msp = state => {
    return {
        boards: state.entities.boards,
    }
}


const mdp = dispatch => {
    return {
        fetchBoards: () => dispatch(fetchBoards()),
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
                    {Object.values(boards).map(board => (
                        <li key={board.id}>
                            <Link to={`/boards/${board.id}`}>
                                {board.id}: {board.title}
                            </Link>
                        </li>
                    ))}
                </ul>
            )
        }
    }
}



export default connect(msp, mdp)(BoardNavigationMenu);