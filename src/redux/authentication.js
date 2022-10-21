import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'
const initialUser = () => {
}

export const getUserData = createAsyncThunk('authentication/getUserData', async () => {
})

export const authSlice = createSlice({
  name: 'authentication',
  initialState: {
    userData: initialUser(),
    ability: {}
  },
  reducers: {
    handleLogin: (state, action) => {
    },
    handleLogout: state => {
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
