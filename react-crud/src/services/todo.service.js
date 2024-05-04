import httpCommon from "../http-common";

class TodoDataService{

    getTodoLimit(limit){
        return httpCommon.get(`/todo-list/limit/${limit}`)
    }

    getAllTodo(){
        return httpCommon.get("/todo-list");
    }

    addTodoItem(data){
        return httpCommon.post("/todo-list",data)
    }

    getOne(todoId){
        return httpCommon.get(`/todo-list/${todoId ? todoId : ''}`);
    }

    updateTodo(id, data){
        return httpCommon.put(`/todo-list/${id}`, data);
    }

    deleteTodo(id){
        return httpCommon.delete(`/todo-list/${id}`)
    }

    deleteAllTodo(){
        return httpCommon.delete("/todo-list");
    }

    findByTodoTitle(title){
        return httpCommon.get(`/todo-list/?title=${title}`);
    }

    filterPublished(value){
        return httpCommon.get(`/todo-list/published/?value=${value}`);
    }
}

export default new TodoDataService();