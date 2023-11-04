import {createSlice, createAsyncThunk} from "@reduxjs/toolkit";
import axios from '../../axios.js'

export const fetchPosts = createAsyncThunk('posts/fetchPosts', async (sortType) => {
    const {data} = await axios.get(`/posts/sort/${sortType}`)
    return data
})

export const fetchTags = createAsyncThunk('posts/fetchTags', async () => {
    const {data} = await axios.get('/tags')
    return data
})

export const fetchDeletePost = createAsyncThunk('posts/fetchDeletePost', async (id) => {
        const {data} = await axios.delete(`/posts/${id}`)
        return data
    }
)

const initialState = {
    posts: {
        items: [],
        sort: 'new',
        status: 'loading'
    },
    tags: {
        items: [],
        status: 'loading'
    }
}

const postsSlice = createSlice({
    name: 'posts',
    initialState,
    reducers: {
        setSort: (state, action) => {
            state.posts.sort = action.payload
        },
    },
    extraReducers: builder => {
        builder
            // fetch posts
            .addCase(fetchPosts.pending, state => {
                state.posts.items = []
                state.posts.status = 'loading'
            })
            .addCase(fetchPosts.fulfilled, (state, action) => {
                state.posts.items = action.payload
                state.posts.status = 'loaded'
            })
            .addCase(fetchPosts.rejected, state => {
                state.posts.items = []
                state.posts.status = 'error'
            })
            // fetch tags
            .addCase(fetchTags.pending, state => {
                state.tags.items = []
                state.tags.status = 'loading'
            })
            .addCase(fetchTags.fulfilled, (state, action) => {
                state.tags.items = action.payload
                state.tags.status = 'loaded'
            })
            .addCase(fetchTags.rejected, state => {
                state.tags.items = []
                state.tags.status = 'error'
            })
            // delete post
            .addCase(fetchDeletePost.pending, (state, action) => {
                state.posts.items = state.posts.items.filter(post => post._id !== action.meta.arg)
            })
    }
})

export const { setSort } = postsSlice.actions

export const postsReducer = postsSlice.reducer