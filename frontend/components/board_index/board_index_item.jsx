import React from 'react';
import { Link } from 'react-router-dom';

export const BoardIndexItem = (props) => {
  const star = props.board.starred ? <div id="filled-star"><i className="fas fa-star"></i></div> : null;
  return(
    <li>
      <Link className={"board-index-item"} to={`/boards/${props.board.id}`}>
        {props.board.title}
        {star}
      </Link>
    </li>
  )
}