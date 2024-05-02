import httpCommon from "../http-common";

class TodoDataService{
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
}

export default new TodoDataService();