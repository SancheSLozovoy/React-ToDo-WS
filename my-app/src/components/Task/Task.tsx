import React from 'react';
import './Task.css'
import { TaskProps } from '../../types/Task.type';

class Task extends React.Component<TaskProps> {
    constructor(props: TaskProps){
        super(props);
    }

    render(){

        const { title, completed, onToggle, onDelete, id} = this.props;

        const titleClass = completed ? 'task-title completed' : 'task-title';

        return(
            <div className="task-container">
                <div className="task-content">
                    <span className={titleClass}>{title}</span>
                    <input type='checkbox' checked={completed} onClick={() => onToggle(id)}></input>
                    <button onClick={() => onDelete(id)}>Delete</button>
                </div>
            </div>
        )
    }
}

export default Task;