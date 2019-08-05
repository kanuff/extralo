import React from 'react';




const ListIndexItem = (props) => {
    const { list } = props
    return (
        <li className={"list-index-item"} >
            {list.title}
        </li>
    )
}

export default ListIndexItem;