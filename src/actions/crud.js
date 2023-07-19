import {
    CREATE_CRUD,
    RETRIEVE_CRUD,
    UPDATE_CRUD,
    DELETE_CRUD,
  } from "./types";
  
  import CrudDataService from "../service/crud.service";
  
  export const createCrud = (title, priority, is_active, activity_group_id) => async (dispatch) => {
    try {
      const res = await CrudDataService.create({ title, priority, is_active, activity_group_id });
  
      dispatch({
        type: CREATE_CRUD,
        payload: res.data,
      });
  
      return Promise.resolve(res.data);
    } catch (err) {
      return Promise.reject(err);
    }
  };
  
  export const retrieveCruds = () => async (dispatch) => {
    try {
      const res = await CrudDataService.getAll();
  
      dispatch({
        type: RETRIEVE_CRUD,
        payload: res.data,
      });
    } catch (err) {
      console.log(err);
    }
  };
  
  export const updateCruds = (id, data) => async (dispatch) => {
    try {
      const res = await CrudDataService.update(id, data);
  
      dispatch({
        type: UPDATE_CRUD,
        payload: data,
      });
  
      return Promise.resolve(res.data);
    } catch (err) {
      return Promise.reject(err);
    }
  };
  
  export const deleteCruds = (id) => async (dispatch) => {
    try {
      await CrudDataService.delete(id);
  
      dispatch({
        type: DELETE_CRUD,
        payload: { id },
      });
    } catch (err) {
      console.log(err);
    }
  };
  
  