import http from "../http-common";

class CrudDataService {
  getAll() {
    return http.get("/activity-groups/71551");
  }

  get(id) {
    return http.get(`/tutorials/${id}`);
  }

  create(data) {
    return http.post("/todo-items", data);
  }

  update(id, data) {
    return http.patch(`/todo-items/${id}`, data);
  }

  delete(id) {
    return http.delete(`/todo-items/${id}`);
  }

  deleteAll() {
    return http.delete(`/tutorials`);
  }

}

export default new CrudDataService();