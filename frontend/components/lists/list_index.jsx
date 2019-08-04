import React from 'react';


export default class ListIndex extends React.Component{
    constructor(props){
        super(props)
    }


    renderLists(){
        const { lists } = this.props;
        return lists.map( (list, idx) => {
            return (
                <li key={`list_${idx}`}>
                    {list.title}
                </li>
            )
        })
    }



    render(){
        return (
            <section className={"lists-index-container"}>
                <ul className={"lists-index"}>
                    {this.renderLists()}
                </ul>
            </section>
        )
    }
}