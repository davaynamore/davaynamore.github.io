export default class TodoService {
    constructor() {
        this._apiBase = 'https://jsonplaceholder.typicode.com'
    }

    async getTodos(url) {
        const result = await fetch(`${this._apiBase}${url}`);

        if (!result.ok) {
            throw new Error(`Could not fetch ${url}, received ${result.status}`);
        }

        return await result.json();
    }

    getAllTodos = async () => {
        return await this.getTodos('/todos/');
    }

    getTodo = async (id) => {
        return await this.getTodos(`/todos/${id}`);
    }
}