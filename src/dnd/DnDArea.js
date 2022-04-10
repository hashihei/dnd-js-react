import React from 'react'
import { DragDropContext, Draggable, Droppable } from 'react-beautiful-dnd';
import { CHARACTERS } from '../test/caractersData';

const DnDArea = () => {

  //save item list
  const [boxes, updateBoxes] = React.useState(CHARACTERS);

  //reorder items
  const reorder = (list,startIndex, endIndex) => {
    const result = Array.from(list)
    const [removed] = result.splice(startIndex, 1)

    result.splice(endIndex, 0, removed)

    return result
  };

  // Item drag end then call this function
  const handleOnDragEnd = (result) => {
    if (!result.destination){
      return;
    }

    const items = reorder(
      boxes,
      result.source.index,
      result.destination.index
    );

    updateBoxes(items)
  }

  return (
    <div>
      <DragDropContext onDragEnd={handleOnDragEnd}>
        <Droppable key="droppableArea" droppableId="droppableArea" direction="horizontal">
          {
            (provided) => (
              <div key="App-list" className="App-list" {...provided.droppableProps} ref={provided.innerRef}>
              {
                  boxes && boxes.map(({id},index) => {
                  return (
                    <div>
                      <Draggable className="App-list-item" key={id} draggableId={id} index={index}>
                        {
                          (provided) => {
                            return (
                              <div key={id} ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps}>
                                <div>{id}</div>
                              </div>
                            );
                          }
                        }
                      </Draggable>
                    </div>
                  );
                })
              }
              {provided.placeholder}
              </div>
            )
          }
        </Droppable>
      </DragDropContext>
    </div>
  )

}

export default DnDArea