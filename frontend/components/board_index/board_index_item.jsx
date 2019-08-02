import React from 'react';
import { Link } from 'react-router-dom';

export const BoardIndexItem = (props) => {
  return(
    <li>
      <Link to={`/boards/${props.board.id}`}>
        {props.board.title}
      </Link>
    </li>
  )
}