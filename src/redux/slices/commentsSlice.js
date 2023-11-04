import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import axios from "../../axios.js";

export const fetchCommentsByPost = createAsyncThunk('comments/fetchCommentsByPost', async (postId) => {
    const {data} = await axios.get(`/comments/${postId}`)

    return data
})

export const fetchLastComments = createAsyncThunk('comments/fetchLastComments', async () => {
    const {data} = await axios.get('/comments')

    return data
})

export const fetchCreateComment = createAsyncThunk('comments/fetchCreateComment', async (params) => {
    const {postId, text} = params

    const {data} = await axios.post(`/comments/${postId}`, {text})

    return data
})

export const fetchDeleteComment = createAsyncThunk('comments/fetchDeleteComment', async (id) => {
    const {data} = await axios.delete(`/comments/${id}`)

    return data
})

export const fetchUpdateComment = createAsyncThunk('comments/fetchUpdateComment', async (params) => {
    const {id, text} = params

    const {data} = await axios.patch(`/comments/${id}`, {text})

    return data
})

const initialState = {
    comments: {
        items: [],
        status: 'loading'
    }
}

const commentsSlice = createSlice({
    name: 'comments',
    initialState,
    reducers: {},
    extraReducers: builder => {
        builder
            // fetchCommentsByPost
            .addCase(fetchCommentsByPost.pending, (state, action) => {
                state.comments.items = []
                state.comments.status = 'loading'
            })
            .addCase(fetchCommentsByPost.fulfilled, (state, action) => {
                state.comments.items = action.payload
                state.comments.status = 'loaded'
            })
            .addCase(fetchCommentsByPost.rejected, (state, action) => {
                state.comments.items = []
                state.comments.status = 'error'
            })

            // fetchLastComments
            .addCase(fetchLastComments.pending, state => {
                state.comments.items = []
                state.comments.status = 'loading'
            })
            .addCase(fetchLastComments.fulfilled, (state, action) => {
                state.comments.items = action.payload
                state.comments.status = 'loaded'
            })
            .addCase(fetchLastComments.rejected, state => {
                state.comments.items = []
                state.comments.status = 'error'
            })

            // fetchCreateComment
            .addCase(fetchCreateComment.pending, state => {
                state.comments.status = 'loading'
            })
            .addCase(fetchCreateComment.fulfilled, (state, action) => {
                state.comments.items.unshift(action.payload)
                state.comments.status = 'loaded'
            })

            // delete comment
            .addCase(fetchDeleteComment.pending, (state, action) => {
                state.comments.items = state.comments.items.filter(comment => comment._id !== action.meta.arg)
            })

            // update comment
            .addCase(fetchUpdateComment.fulfilled, (state, action) => {
                state.comments.items = state.comments.items.map(comment =>
                    comment._id === action.meta.arg.id
                        ? {...comment, text: action.meta.arg.text}
                        : comment
                )
            })
    }
})

export const commentsReducer = commentsSlice.reducer