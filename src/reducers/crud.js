import {
    CREATE_CRUD,
    RETRIEVE_CRUD,
    UPDATE_CRUD,
    DELETE_CRUD,
  } from "../actions/types";
  
  const initialState = [];
  
  function crudReducer(cruds = initialState, action) {
    const { type, payload } = action;
  
    switch (type) {
      case CREATE_CRUD:
        return [cruds, payload];
  
      case RETRIEVE_CRUD:
        return payload;
  
      case UPDATE_CRUD:
        return [cruds, payload];
  
      case DELETE_CRUD:
        return cruds;
  
      default:
        return cruds;
    }
  };
  
  export default crudReducer;