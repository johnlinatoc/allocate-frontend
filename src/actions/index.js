export const SIGN_IN = 'SIGN_IN';
export const SIGN_OUT = 'SIGN_OUT';

export const login = (data) => ({
  type: SIGN_IN,
  payload: data
})

export const logout = () => ({
  type: SIGN_OUT,
  payload: { user: {} },
})
