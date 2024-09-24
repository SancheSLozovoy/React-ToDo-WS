import { BASE_URL } from "./Base.url";

export class TaskService{

    static loadTasks = async () => {
        const response = await fetch(BASE_URL);
        if (!response.ok) {
            throw new Error('Failed to fetch tasks');
    
        }
        return response.json();
        
    };
    
    static deleteTask = async (id: number) => {
        const response = await fetch(`${BASE_URL}/${id}`, {
            method: 'DELETE',
        });

        if (!response.ok) {
            throw new Error('Failed to delete task');
        }

        return response.status === 204; 
    };

}

