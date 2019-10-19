import { SIGN_IN, SIGN_OUT } from '../actions/index.js'

const loggedReducer = (state = { user: {} }, action) => {
  console.log(action.payload)
  switch(action.type){
    case SIGN_IN:
      return state = {
        loggedIn: true,
        auth: action.payload
      };
    case SIGN_OUT:
      return state = {
        loggedIn: false,
        auth: { user: {} }
      };
    default:
      return state;
  }
};

export default loggedReducer;
