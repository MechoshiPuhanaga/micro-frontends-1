import { ActionType } from '../action-types';

const initialState = { loading: false, error: null, data: [] };

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case ActionType.SEARCH_REPOSITORIES:
      return { loading: true, error: null, data: [] };

    case ActionType.SEARCH_REPOSITORIES_SUCCESS:
      return { loading: false, error: null, data: action.payload };

    case ActionType.SEARCH_REPOSITORIES_ERROR:
      return { loading: false, error: action.payload, data: [] };

    case ActionType.SEARCH_DELETE_REPOSITORY:
      return { ...state, data: action.payload };

    default:
      return state;
  }
};

export default reducer;
