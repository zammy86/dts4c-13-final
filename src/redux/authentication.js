import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

export const getUserData = createAsyncThunk('auth/getUserData', async () => {
})

export const authSlice = createSlice({
  name: 'auth',
  initialState: {
    userData: null
  },
  reducers: {
    handleLogin: (state, action) => {
      state.userData = action.payload
    },
    handleLogout: state => {
      state.userData = null
    }
  },
  extraReducers: builder => {
    builder
      .addCase(getUserData.fulfilled, (state, action) => {
      })
    }
})

export const { handleLogin, handleLogout } = authSlice.actions

export default authSlice.reducer
