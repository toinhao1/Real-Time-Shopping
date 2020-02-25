import axios from 'axios';
import {
  GET_ITEMS,
  ADD_ITEM,
  ADDING_ITEM,
  DELETE_ITEM,
  DELETING_ITEM,
  ITEMS_LOADING,
  EDIT_ITEM,
  EDITING_ITEM
} from './types';
import { returnErrors } from './errorActions';

export const getItems = () => dispatch => {
  dispatch(setItemsLoading());
  axios
    .get('/api/items')
    .then(res =>
      dispatch({
        type: GET_ITEMS,
        payload: res.data
      })
    )
    .catch(err =>
      dispatch(returnErrors(err.response.data, err.response.status))
    );
};

// Passing data via sockets
export const addItem = (item, socket) => dispatch => {
  dispatch({ type: ADDING_ITEM })
  socket.emit('addItem', item)
};

export const showItemAddedBySocket = item => dispatch => {
  dispatch({
    type: ADD_ITEM,
    payload: item
  })
}

export const editItem = (updatedItem, socket) => dispatch => {
  dispatch({ type: EDITING_ITEM })
  socket.emit('updateItem', updatedItem)
};

export const showItemEditedBySocket = item => dispatch => {
  dispatch({
    type: EDIT_ITEM,
    payload: item
  })
}

export const deleteItem = (id, socket) => (dispatch) => {
  dispatch({ type: DELETING_ITEM })
  socket.emit('deleteItem', id)
};

export const showItemDeletedBySocket = data => dispatch => {
  dispatch({
    type: DELETE_ITEM,
    payload: data._id
  })
}

export const setItemsLoading = () => {
  return {
    type: ITEMS_LOADING
  };
};
