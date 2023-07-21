import {
    CREATE_CRUD,
    RETRIEVE_CRUD,
    UPDATE_CRUD,
    DELETE_CRUD,
    DELETE_ALL_CRUD
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
      
      case DELETE_ALL_CRUD:
        return [cruds, payload];

      case DELETE_ALL_CRUD:
        return [];

      default:
        return cruds;
    }
  };
  
  export default crudReducer;