import { BASE_URL } from "./Base.url";

export class TaskService{

    static loadTasks = async () => {
        const response = await fetch(BASE_URL, {
            method: 'GET',
        });
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

    static addTask = async (title: string, userId: number) => {
        const response = await fetch(BASE_URL, {
            method: 'POST',
            body: JSON.stringify({
                title: title,
                completed: false,
                userId: userId,
            }),
            headers: {
                'Content-type': 'application/json; charset=UTF-8',
            },
        });

        if (!response.ok) {
            throw new Error('Не удалось добавить задачу');
        }

        return response.json(); 
    };
}

