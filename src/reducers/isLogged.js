import { SIGN_IN } from '../actions/index.js'
import { SIGN_OUT } from '../actions/index.js'

const loggedReducer = (state = null, action) => {
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
