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
}

export default new TodoDataService();