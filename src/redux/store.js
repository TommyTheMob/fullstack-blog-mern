import {configureStore} from "@reduxjs/toolkit";
import {postsReducer} from "./slices/postsSlice.js";
import {authReducer} from "./slices/authSlice.js";
import {commentsReducer} from "./slices/commentsSlice.js";

const store = configureStore({
    reducer: {
        posts: postsReducer,
        auth: authReducer,
        comments: commentsReducer
    }
})

export default store