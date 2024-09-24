import React from 'react';
import './Task.css'

interface TaskProps{
    id: number;
    title : string;
    completed: boolean;
    userId  :number;
}

class Task extends React.Component<TaskProps> {
    constructor(props: TaskProps){
        super(props);
    }

    render(){

        const { title, completed, id } = this.props;

        const titleClass = completed ? 'task-title completed' : 'task-title';

        return(
            <div className="task-container">
                <div className="task-content">
                    <span className={titleClass}>{title}</span>
                    <input type='checkbox' checked={completed}></input>
                    <button>Delete</button>
                </div>
            </div>
        )
    }
}

export default Task;