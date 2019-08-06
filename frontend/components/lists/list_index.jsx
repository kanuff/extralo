import React from 'react';
import ListIndexItem from './list_index_item';
import CreateListForm from './create_list_form';
import { DragDropContext, Droppable } from 'react-beautiful-dnd';



export default class ListIndex extends React.Component{
    constructor(props){
        super(props)
        // this.innerRef = React.createRef();
    }

    renderLists(){
        const { lists } = this.props;
        return lists.map( (list, idx) => {
            if(!list.archived){
                return (
                    <ListIndexItem
                        list={list} 
                        key={`list_${idx}`}
                        board_id={this.props.board_id}
                        index={idx}
                    />
                )
            }
        })
    }

    onDragEnd(result){
        // eventually to do
    }

    render(){
        return (
            <DragDropContext onDragEnd={this.onDragEnd}>
                <section className={"lists-index-container"}>
                    <Droppable droppableId={this.props.board_id} direction="horizontal">
                        {(provided, snapshot) => (
                            <ul 
                                className={"lists-index"}
                                {...provided.droppableProps}
                                ref={provided.innerRef}
                            >
                                {this.renderLists()}
                                {provided.placeholder}
                                <CreateListForm />
                            </ul>
                        )}
                    </Droppable>
                </section>
            </DragDropContext>
        )
    }
}