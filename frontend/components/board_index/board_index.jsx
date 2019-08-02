import React from 'react';
import { Link } from 'react-router-dom';
import { BoardIndexItem } from './board_index_item';

export default class BoardIndex extends React.Component{
  constructor(props){
    super(props)
  }

  componentDidMount(){
    this.props.fetchBoards();
  }



  render(){
    const boards = this.props.boards.map( (board,idx) => {
      return <BoardIndexItem board={board} key={`board_${idx}`}/>
    })
    return(
      <section className={"board-index"}>
        <section className={"board-index-navbar-container"}>
          <ul className={"board-index-navbar"}>
            <li className={""}><i className="fas fa-list"></i>  Boards</li>
            <li><Link to="/" className={""}><i className="fas fa-home"></i> Home</Link></li>
          </ul>
        </section>
        <section className={"board-index-list-container"}>
          <ul className={"board-index-list"}>
            {boards}
            <li>Create new board</li>
          </ul>
        </section>
      </section>
    )
  }


}

