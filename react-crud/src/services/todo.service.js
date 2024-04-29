import httpCommon from "../http-common";

class TodoDataService{
    getAllTodo(){
        return httpCommon.get("/todo-list");
    }
}

export default new TodoDataService();