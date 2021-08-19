import axios from 'axios';

import { ActionType } from '../action-types';

export const searchRepositories = (term) => {
  console.log('term OUT: ', term);
  return async (dispatch) => {
    dispatch({
      type: ActionType.SEARCH_REPOSITORIES
    });

    try {
      const { data } = await axios.get(
        'https://registry.npmjs.org/-/v1/search',
        {
          params: {
            text: term
          }
        }
      );

      const names = data.objects.map((result) => {
        return result.package.name;
      });

      dispatch({
        type: ActionType.SEARCH_REPOSITORIES_SUCCESS,
        payload: names
      });
    } catch (error) {
      dispatch({
        type: ActionType.SEARCH_REPOSITORIES_ERROR,
        payload: error.message
      });
    }
  };
};

export const deleteRepository = (name) => (dispatch, getState) => {
  const {
    repositories: { data }
  } = getState();

  const newData = data.filter((repoName) => repoName !== name);

  dispatch({
    type: ActionType.SEARCH_DELETE_REPOSITORY,
    payload: newData
  });
};
