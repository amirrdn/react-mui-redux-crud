import http from "../http-common";

class CrudDataService {
  getAll() {
    return http.get("/contact");
  }

  get(id) {
    return http.get(`/contact/${id}`);
  }

  create(data) {
    return http.post("/contact", data);
  }

  update(id, data) {
    return http.patch(`/contact/${id}`, data);
  }

  delete(id) {
    return http.delete(`/contact/${id}`);
  }

  deleteAll(data) {
    let id;
    data.forEach((b,index) =>{
      if (index + 1 === data.length){ 
        id += 'id[$in]='+b;
      }else{
        id += 'id[$in]='+b+'&';
      }

    })
    if(id !== undefined){
      let string = id.replace('undefined', '');
      return http.delete(`/contact?${string}`);

    }
  }
}

export default new CrudDataService();