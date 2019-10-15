import { SIGN_IN } from '../actions/index.js'
import { SIGN_OUT } from '../actions/index.js'

const loggedReducer = (state = false, action) => {
  switch(action.type){
    case 'SIGN_IN':
      return state = true;
    case SIGN_OUT:
      return state = false;
    default:
      return state;
  }
};

export default loggedReducer;
