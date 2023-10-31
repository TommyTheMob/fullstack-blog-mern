import {createSlice, createAsyncThunk} from "@reduxjs/toolkit";
import axios from "../../axios.js";

export const fetchAuth = createAsyncThunk('auth/fetchAuth', async (params) => {
    const { data } = await axios.post('auth/login', params)
    return data
})

export const fetchAuthMe = createAsyncThunk('auth/fetchAuthMe', async () => {
    const { data } = await axios.get('auth/me')
    return data
})

export const fetchRegister = createAsyncThunk('auth/fetchRegister', async (params) => {
    const { data } = await axios.post('auth/register', params)
    return data
})

const initialState = {
    data: null,
    status: 'loading'
}

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        logout: (state) => {
            state.data = null
            window.localStorage.removeItem('token')
        }
    },
    extraReducers: (builder) => {
        builder
            // auth
            .addCase(fetchAuth.pending, state => {
                state.data = null
                state.status = 'loading'
            })
            .addCase(fetchAuth.fulfilled, (state, action) => {
                state.data = action.payload
                state.status = 'loaded'
            })
            .addCase(fetchAuth.rejected, state => {
                state.data = null
                state.status = 'error'
            })
            // authMe
            .addCase(fetchAuthMe.pending, state => {
                state.data = null
                state.status = 'loading'
            })
            .addCase(fetchAuthMe.fulfilled, (state, action) => {
                state.data = action.payload
                state.status = 'loaded'
            })
            .addCase(fetchAuthMe.rejected, state => {
                state.data = null
                state.status = 'error'
            })
            // registration
            .addCase(fetchRegister.pending, state => {
                state.data = null
                state.status = 'loading'
            })
            .addCase(fetchRegister.fulfilled, (state, action) => {
                state.data = action.payload
                state.status = 'loaded'
            })
            .addCase(fetchRegister.rejected, state => {
                state.data = null
                state.status = 'error'
            })
    }
})

export const selectIsAuth = state => !!state.auth.data

export const authReducer = authSlice.reducer

export const { logout } = authSlice.actions