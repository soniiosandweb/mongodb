import http from '../http-common';

class TutorialDataService{
    create(data){
        return http.post("/tutorials", data);
    }
}

export default new TutorialDataService();