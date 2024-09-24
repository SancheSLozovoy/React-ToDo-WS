import React from 'react';
import Task from '../task/task';
import './taskList.css'

interface TaskId {
    id: number;
    title: string;
    completed: boolean;
    userId: number;
}

interface TaskListState {
    tasks: TaskId[];
    filterTasks: TaskId[];
    selectUserId: number | null;
}


class TaskList extends React.Component<{}, TaskListState> {
    constructor(props: {}) {
        super(props);
        this.state = {
            tasks: [],
            filterTasks: [],
            selectUserId: null,
        }
        this.loadTaks = this.loadTaks.bind(this)
        this.handleUserChange = this.handleUserChange.bind(this)
    }



    componentDidMount() {
        this.loadTaks()
    }


    loadTaks() {
        fetch('https://jsonplaceholder.typicode.com/todos/')
            .then(response => response.json())
            .then(data => this.setState({ tasks: data, filterTasks: data }));
    }

    deleteTask() {

    }

    toggleTask() {

    }

    addTask() {

    }

    handleUserChange(event: React.ChangeEvent<HTMLSelectElement>) {
        const choose = +(event.target.value);

        this.setState({ selectUserId: choose });

        const filterTasks = choose ? this.state.tasks.filter(task => task.userId === choose) : this.state.tasks;

        this.setState({ filterTasks });
    }

    render() {
        const userIds = Array.from(new Set(this.state.tasks.map(task => task.userId)))

        return (
            <div className="tasks">
                <h1 className="list-title">Tasks List</h1>
                <div className="buttons-container">
                    <button className="add-button">Add task</button>
                    <button className="mark-button">Mark all</button>
                    <button className="delete-button">Delete completed</button>
                    <select onChange={this.handleUserChange} defaultValue="">
                        <option value="">All users</option>
                        {userIds.map(id => (
                            <option key={id} value={id}>
                                User Id : {id}
                            </option>
                        ))}
                    </select>
                </div>
                <ul className="tasks-list">
                    {this.state.filterTasks.map(task => (
                        <Task
                            key={task.id}
                            title={task.title}
                            id={task.id}
                            completed={task.completed}
                            userId={task.userId}
                            onDelete={this.deleteTask}
                            onToggle={this.toggleTask}
                        />
                    ))}
                </ul>
            </div>
        )
    }
}

export default TaskList;