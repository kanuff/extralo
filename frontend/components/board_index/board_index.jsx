import React from 'react';
import { Link } from 'react-router-dom';
import { BoardIndexItem } from './board_index_item';

export default class BoardIndex extends React.Component{
  constructor(props){
    super(props)
    this.openCreateBoardModal = this.openCreateBoardModal.bind(this);
  }

  componentDidMount(){
    this.props.fetchBoards();
    this.props.closeModal();
  }

  // componentDidUpdate(prevProps){
  //   if(this.props !== prevProps){
  //     this.props.fetchBoards()
  //     this.props.closeModal();
  //   }
  // }

  componentWillUnmount(){
    this.props.closeModal();
  }

  openCreateBoardModal(){
    this.props.openModal("create-board")
  }

  render(){
    const { current_user } = this.props;
    const boards = this.props.boards.map( (board,idx) => {
      if (board.creator_id === current_user.id){
        return <BoardIndexItem board={board} key={`board_${idx}`}/>
      }
    })

    const recentlyUpdatedBoards = this.props.boards.map((board, idx) => {
      const yesterday = new Date();
      const updated = new Date(board.updated_at)
      const created = new Date(board.created_at)

      yesterday.setDate(yesterday.getDate() - 1)
      created.setTime(created.getTime() + 3000)
      if ( updated > yesterday && updated > created ) {
        return <BoardIndexItem board={board} key={`board_${idx}`} />
      }

    })

    const sharedBoards = this.props.boards.map((board, idx) => {
      if (board.creator_id !== current_user.id) {
        return <BoardIndexItem board={board} key={`board_${idx}`} />
      }
    })
    return(
      <section className={"board-index"}>
        {/* <section className={"board-index-navbar-container"}>
          <ul className={"board-index-navbar"}>
            <li> <i className="fas fa-list"></i>  Boards</li>
            <li><Link to="/" className={""}><i className="fas fa-home"></i> Home</Link></li>
          </ul>
        </section> */}
        <section className={"board-index-list-container"}>
          <div id={"board-index-title"}><i className="fas fa-history"></i> Recently Updated</div>
          <ul className={"recently-updated board-index-list"}>
            {recentlyUpdatedBoards}
          </ul>
          <div id={"board-index-title"}><i className="fas fa-user-friends"></i> Shared Boards</div>
          <ul className={"shared board-index-list"}>
            {sharedBoards}
          </ul>
          <div id={"board-index-title"}><i className="far fa-user"></i> Personal Boards</div>
          <ul className={"board-index-list"}>
            {boards}
            <li id={"create-board-btn"} onClick={this.openCreateBoardModal}>Create new board</li>
          </ul>
        </section>
      </section>
    )
  }


}

