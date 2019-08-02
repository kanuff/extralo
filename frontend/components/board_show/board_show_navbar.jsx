import React from 'react';
import { connect } from 'react-redux';


class BoardShowNavbar extends React.Component{
  constructor(props){
    super(props)
  }



  render (){
    return (
      <section className={"board-show-navbar-container"}>
        <section className={"float-left"} >
          <button id={'board-title'}>{this.props.board.title}</button>
          <button id={'board-favorited'}>Star</button>
          <div className={'board-member-icons'}>
            <button className={'member-icon'}>Circle icon</button>
          </div>
          <button id={'board-invite-btn'}></button>
        </section>
        <section className={"float-right"} >
          <button id={'board-show-menu-btn'}>Show Menu</button>
        </section>
      </section>
    )
  }
}


export default connect(null, null)(BoardShowNavbar);