import httpCommon from "../http-common";

class TodoDataService{
    getAllTodo(){
        return httpCommon.get("/todo-list");
    }

    addTodoItem(data){
        return httpCommon.post("/todo-list",data)
    }
}

export default new TodoDataService();