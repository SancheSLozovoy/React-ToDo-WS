import React from 'react';
import Task from '../task/task';
import './taskList.css'

interface TaskId{
    id: number;
    title: string;
    completed: boolean;
}

interface TaskListState{
    tasks : TaskId[];
}


class TaskList extends React.Component<{}, TaskListState> {
    constructor(props: {}){
        super(props);
        this.state = {
            tasks : []
        }
       
    }

    render(){
        return(
            <div className="tasks">
                <h1 className="list-title">Tasks List</h1>
                <div className="buttons-container">
                    <button className="add-button">Add task</button>
                    <button className="mark-button">Mark all</button>
                    <button className="delete-button">Delete completed</button>
                </div>
                <ul className="tasks-list">

                </ul>
            </div>
        )
    }
}

export default TaskList;