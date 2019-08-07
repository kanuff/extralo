import React from 'react';
import ListIndexItem from './list_index_item';
import CreateListForm from './create_list_form';
import { DragDropContext, Droppable } from 'react-beautiful-dnd';



export default class ListIndex extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            listOrder: [],
        }
        this.generateListOrder = this.generateListOrder.bind(this);
        this.onDragEnd = this.onDragEnd.bind(this);
    }

    componentDidUpdate(prevProps, prevState){
        console.log("....... PROPS .......")
        console.log(prevProps)
        console.log(this.props)
        console.log("^^^^^ PROPS ^^^^^^^^")
        if(prevProps !== this.props){
            const { listOrder } = this.state;
            const oldListOrder = prevProps.listOrder || []
           if (oldListOrder.length !== this.props.length){
                console.log("This should trigger on creating a new list")
                this.generateListOrder();
            } else if (listOrder.length === 0) {
                this.generateListOrder();
            }
        }
    }


    generateListOrder(){
        const { lists } = this.props;
        if(lists.length > 0){
            debugger
            const listOrder = [];
            let current_list = lists.find(list => list.prev_id === null && list.archived===false)
            debugger
            if ( current_list){
                debugger
                listOrder.push(current_list.id)
                while( current_list.next_id !== null){
                    debugger
                    current_list = lists.find(list => current_list.next_id === list.id)
                    debugger
                    listOrder.push(current_list.id)
                }
                this.setState({
                    listOrder: listOrder
                })
            }
        }
    }

    renderLists(){
        const { lists } = this.props;
        if ( lists.length > 0){
            const { listOrder } = this.state
            return listOrder.map( (list_id, idx) => {
                // change to hash in the future to increase lookup speed?
                const list = lists.find(list => list.id === list_id)
                if(!list.archived){
                    return (
                        <ListIndexItem
                            list={list} 
                            key={`list_${list.id}`}
                            board_id={this.props.board_id}
                            index={idx}
                        />
                    )
                }
            })
        }
    }

    onDragEnd(result){
        const { listOrder } = this.state 
        const { destination, source, draggableId } = result;
        if(!destination){
            return
        }
        if  (destination.droppableId === source.droppableId &&
            destination.index === source.index){
                return
            }

        const list = this.props.lists.find( list => list.id === draggableId)

        listOrder.splice(source.index, 1)
        listOrder.splice(destination.index, 0, draggableId)

        this.setState({
            listOrder: listOrder
        })

        list.next_id = listOrder[destination.index + 1] || 'sentinel'
        list.prev_id = listOrder[destination.index - 1] || 'sentinel'
        console.log(list)
        list.order_change = true;
        this.props.updateList(list)
    }

    render(){
        return (
            <DragDropContext onDragEnd={this.onDragEnd}>
                <section className={"lists-index-container"}>
                    <Droppable droppableId={`board_${this.props.board_id}`} direction="horizontal">
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