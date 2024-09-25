interface TaskProps{
    id: number;
    title : string;
    completed: boolean;
    userId  :number;
    onToggle: (id: number) => void;
    onDelete: (id: number) =>void;
}

interface TaskState{
    selected: boolean;
}

interface TaskListState {
    tasks: TaskProps[];
    filterTasks: TaskProps[];
    selectedUserId: number | null;
    
}

export type {TaskProps, TaskListState, TaskState}