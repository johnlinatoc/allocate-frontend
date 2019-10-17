import { VALID_USER } from '../actions/index.js'

const userReducer = (state = { user: {} }, action) => {
  switch(action.type){
    case VALID_USER:
      return action.payload;
    default: return state;
  }
}

export default userReducer;
