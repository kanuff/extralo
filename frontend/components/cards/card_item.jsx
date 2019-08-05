import React from 'react';


export default class CardItem extends React.Component {
  constructor(props){
    super(props)
  }




  render(){
    return (
      <li>
        {this.props.card.title}
      </li>
    )
  }
}
