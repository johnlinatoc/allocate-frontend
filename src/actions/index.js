export const SIGN_IN = 'SIGN_IN';
export const SIGN_OUT = 'SIGN_OUT'

export const login = () => ({
  type: SIGN_IN,
})

export const logout = () => ({
  type: SIGN_OUT,
})
