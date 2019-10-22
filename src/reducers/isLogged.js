import { SIGN_IN, SIGN_OUT } from '../actions/index.js'

const loggedReducer = (state = { user: {} }, action) => {
  switch(action.type){
    case SIGN_IN:
      return state = {
        loggedIn: true,
        auth: action.payload,
        jwt: action.payload.jwt,
      };
    case SIGN_OUT:
      return state = {
        loggedIn: false,
        auth: { user: {} },
        jwt: null,
      };
    default:
      return state;
  }
};

export default loggedReducer;
