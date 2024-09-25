import React from 'react';
import Task from '../Task/Task';
import './TaskList.css'
import UserSelect from '../TaskSelectUser/TaskSelectUser';
import { TaskService } from '../../service/TaskService';
import { TaskListState } from '../../types/Task.type';

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
        const tasks = await TaskService.loadTasks();
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

    deleteTask = async (id: number) => {
        try {
            await TaskService.deleteTask(id);
            this.setState(prevState => ({
                tasks: prevState.tasks.filter(task => task.id !== id),
                filterTasks: prevState.filterTasks.filter(task => task.id !== id),
            }));
        } catch (error) {
            console.error('Error deleting task:', error);
        }
    };

    markAllTasks = () => {
        this.setState(prevState => {
            const { tasks, selectedUserId } = prevState;
    
            const updatedTasks = tasks.map(task => {
                if (!selectedUserId || task.userId === selectedUserId) {
                    return { ...task, completed: true }; 
                }
                return task;
            });
    
            const updatedFilterTasks = prevState.filterTasks.map(task => {
                if (!selectedUserId || task.userId === selectedUserId) {
                    return { ...task, completed: true };
                }
                return task;
            });
    
            return { tasks: updatedTasks, filterTasks: updatedFilterTasks };
        });
    };

    deleteMarks = async () => {
        const { tasks, selectedUserId } = this.state;
        
        const tasksToDelete = tasks.filter(task => task.completed && (!selectedUserId || task.userId === selectedUserId));
    
        try {
            await Promise.all(tasksToDelete.map(task => TaskService.deleteTask(task.id)));
    
            this.setState(prevState => {
                const remainingTasks = prevState.tasks.filter(task => 
                    !(task.completed && (!selectedUserId || task.userId === selectedUserId))
                );
                return {
                    tasks: remainingTasks,
                    filterTasks: selectedUserId ? remainingTasks.filter(task => task.userId === selectedUserId) : remainingTasks,
                };
            });
        } catch (error) {
            console.error('Error deleting tasks:', error);
        }
    };
    
    

    toggleTask = (id: number) => {
        this.setState(prevState => {
            const { tasks, filterTasks } = prevState;
    
            const updatedTasks = tasks.map(task => {
                if (task.id === id) {
                    return { ...task, completed: !task.completed }; 
                }
                return task; 
            });
    
            const updatedFilterTasks = filterTasks.map(task => {
                if (task.id === id) {
                    return { ...task, completed: !task.completed };
                }
                return task; 
            });
    
            return { tasks: updatedTasks, filterTasks: updatedFilterTasks };
        });
    };
    
    
    render() {
        const userIds = Array.from(new Set(this.state.tasks.map(task => task.userId)));

        return (
            <div className="tasks">
                <h1 className="list-title">Tasks List</h1>
                <div className="buttons-container">
                    <button className="add-button">Add task</button>
                    <button className="mark-button" onClick={this.markAllTasks}>Mark all</button>
                    <button className="delete-button" onClick={this.deleteMarks}>Delete completed</button>
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
                            onDelete={this.deleteTask}
                            onToggle={this.toggleTask}
                        />
                    ))}
                </ul>
            </div>
        );
    }
}

export default TaskList;
