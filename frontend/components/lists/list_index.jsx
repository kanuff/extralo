import React from 'react';
import ListIndexItem from './list_index_item';
import CreateListForm from './create_list_form';


export default class ListIndex extends React.Component{
    constructor(props){
        super(props)
    }

    renderLists(){
        const { lists } = this.props;
        return lists.map( (list, idx) => {
            return (
                <ListIndexItem list={list} key={`list_${idx}`}/>
            )
        })
    }

    render(){
        return (
            <section className={"lists-index-container"}>
                <ul className={"lists-index"}>
                    {this.renderLists()}
                    <CreateListForm />
                </ul>
            </section>
        )
    }
}