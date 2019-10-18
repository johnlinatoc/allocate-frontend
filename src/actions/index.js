export const SIGN_IN = 'SIGN_IN';
export const SIGN_OUT = 'SIGN_OUT';
export const VALID_USER = 'VALID_USER';

export const login = (data) => ({
  type: SIGN_IN,
  payload: data,
})

export const logout = () => ({
  type: SIGN_OUT,
  payload: { user: {} },
})

export const userLogin = (data) => ({
  type: VALID_USER,
  payload: data,
})
