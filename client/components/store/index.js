import axios from 'axios';
// import history from '../history'
import { createStore, applyMiddleware } from 'redux';
import { createLogger } from 'redux-logger';
import thunkMiddleware from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';

/**
 * ACTION TYPES
 */
const GET_LYRICS = 'GET_LYRICS';

/**
 * INITIAL STATE
 */
const defaultState = {};

/**
 * ACTION CREATORS
 */
const getLyrics = lyrics => ({ type: GET_LYRICS, lyrics });

/**
 * THUNK CREATORS
 */
export const gotLyrics = lyricFragment => async dispatch => {
  try {
    let res = await axios.get(`/api/:${lyricFragment}`);
    dispatch(getLyrics(res.data));
    console.log('RARARA', res.data);
  } catch (error) {
    console.log(error);
  }
};

/**
 * REDUCER
 */
const reducer = function(state = defaultState, action) {
  switch (action.type) {
    case GET_LYRICS:
      return action.lyrics;
    default:
      return state;
  }
};

const middleware = composeWithDevTools(
  applyMiddleware(
    thunkMiddleware.withExtraArgument({ axios }),
    createLogger({ collapsed: true })
  )
);
export const store = createStore(reducer, middleware);
