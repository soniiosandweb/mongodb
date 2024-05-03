import http from '../http-common';

class TutorialDataService{

    getTutorialLimit(limit){
        return http.get(`/tutorials/limit/${limit}`);
    }

    getAll(){
        return http.get("/tutorials");
    }

    getOne(tutorialId){
        return http.get(`/tutorials/${tutorialId ? tutorialId : ''}`);
    }

    create(data){
        return http.post("/tutorials", data);
    }

    update(id, data){
        return http.put(`/tutorials/${id}`, data);
    }

    delete(id){
        return http.delete(`/tutorials/${id}`);
    }

    deleteAll(){
        return http.delete("/tutorials");
    }

    findByTitle(title){
        return http.get(`/tutorials/?title=${title}`);
    }

    filterPublished(value){
        return http.get(`/tutorials/published/?value=${value}`);
    }
}

export default new TutorialDataService();