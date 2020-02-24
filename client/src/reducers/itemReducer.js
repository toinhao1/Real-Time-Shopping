import {
  GET_ITEMS,
  ADD_ITEM,
  ADDING_ITEM,
  EDIT_ITEM,
  EDITING_ITEM,
  DELETE_ITEM,
  DELETING_ITEM,
  ITEMS_LOADING
} from '../actions/types';

const initialState = {
  items: [],
  loading: false
};

export default function (state = initialState, action) {
  switch (action.type) {
    case GET_ITEMS:
      return {
        ...state,
        items: action.payload,
        loading: false
      };
    case DELETE_ITEM:
      return {
        ...state,
        items: state.items.filter(item => item._id !== action.payload),
        loading: false
      };
    case DELETING_ITEM:
      return {
        ...state,
        loading: true
      }
    case EDITING_ITEM:
      return {
        ...state,
        loading: true
      }
    case EDIT_ITEM:
      return {
        ...state,
        items: state.items.map(item =>
          item._id === action.payload._id ? action.payload : item
        ),
        loading: false
      };
    case ADDING_ITEM:
      return {
        ...state,
        loading: true,
      }
    case ADD_ITEM:
      return {
        ...state,
        items: [action.payload, ...state.items],
        loading: false
      };
    case ITEMS_LOADING:
      return {
        ...state,
        loading: true
      };
    default:
      return state;
  }
}
