export const SIGN_IN = 'SIGN_IN';
export const SIGN_OUT = 'SIGN_OUT';
export const VALID_USER = 'VALID_USER';

export const login = () => ({
  type: SIGN_IN,
})

export const logout = () => ({
  type: SIGN_OUT,
})

export const userLogin = (data) => ({
  type: VALID_USER,
  payload: data,
})