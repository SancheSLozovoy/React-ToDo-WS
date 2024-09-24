export const loadTasks = async () => {
    const response = await fetch('https://jsonplaceholder.typicode.com/todos/');
    if (!response.ok) {
        throw new Error('Failed to fetch tasks');

    }
    return response.json();
    
};
