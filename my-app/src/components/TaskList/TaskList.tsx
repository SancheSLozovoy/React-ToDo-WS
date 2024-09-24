import React from 'react';
import Task from '../Task/Task';
import './TaskList.css'
import UserSelect from '../TaskSelectUser/TaskSelectUser';
import { loadTasks } from '../../service/TaskService';

interface TaskId {
    id: number;
    title: string;
    completed: boolean;
    userId: number;
}

interface TaskListState {
    tasks: TaskId[];
    filterTasks: TaskId[];
    selectedUserId: number | null;
}

class TaskList extends React.Component<{}, TaskListState> {
    constructor(props: {}) {
        super(props);
        this.state = {
            tasks: [],
            filterTasks: [],
            selectedUserId: null,
        };
    }

    async componentDidMount() {
        const tasks = await loadTasks();
        this.setState({ tasks, filterTasks: tasks });
    }

    handleUserChange = (userId: number) => {
        this.setState({ selectedUserId: userId }, this.filterTasks);
    };

    filterTasks = () => {
        this.setState(prevState => {
            const { tasks, selectedUserId } = prevState;
            const filterTasks = selectedUserId ? tasks.filter(task => task.userId === selectedUserId) : tasks;
            return { filterTasks };
        });
    };

    render() {
        const userIds = Array.from(new Set(this.state.tasks.map(task => task.userId)));

        return (
            <div className="tasks">
                <h1 className="list-title">Tasks List</h1>
                <div className="buttons-container">
                    <button className="add-button">Add task</button>
                    <button className="mark-button">Mark all</button>
                    <button className="delete-button">Delete completed</button>
                    <UserSelect 
                        userIds={userIds} 
                        selectedUserId={this.state.selectedUserId} 
                        onUserChange={this.handleUserChange} 
                    />
                </div>
                <ul className="tasks-list">
                    {this.state.filterTasks.map(task => (
                        <Task
                            key={task.id}
                            title={task.title}
                            id={task.id}
                            completed={task.completed}
                            userId={task.userId}
                        />
                    ))}
                </ul>
            </div>
        );
    }
}

export default TaskList;
