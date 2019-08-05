import React from 'react';
import BoardShowNavbar from './board_show_navbar';
import ListIndex from '../lists/list_index_container';

export default class BoardShow extends React.Component {
  constructor(props){
    super(props)

  }

  componentDidMount(){
    this.props.fetchBoard(this.props.board_id)
      .then(() => this.props.fetchLists(this.props.board_id));
  }
    
  componentWillUnmount(){
    this.props.clearCards();
    this.props.clearLists();
  }

  render(){
    return(
      <section className={'board-show-container'}>
        <BoardShowNavbar 
          board={this.props.board} 
          destroyBoard={this.props.destroyBoard} 
          updateBoard={this.props.updateBoard} 
          history={this.props.history}
          current_user_id={this.props.current_user_id}
          receiveErrors={this.props.receiveErrors}
          clearErrors={this.props.clearErrors}
          errors={this.props.errors}
        />
        <ListIndex />
      </section>
    )
  }
}