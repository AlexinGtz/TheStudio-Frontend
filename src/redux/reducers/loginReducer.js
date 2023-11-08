import { createSlice } from '@reduxjs/toolkit'

const loginSlice = createSlice({
  name: 'login',
  initialState: {},
  reducers: {
    loginAction: (_, action) => {
      localStorage.setItem('token', action.payload.token);
      localStorage.setItem('userType', action.payload.userType);
    },
    logoutAction: () => {
      localStorage.removeItem('token');
      localStorage.removeItem('userType');
    }
  }
})

export const { loginAction, logoutAction } = loginSlice.actions
export default loginSlice.reducer