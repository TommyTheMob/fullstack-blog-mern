import HomePage from "./pages/HomePage/HomePage.jsx";
import Navbar from "./components/Navbar/Navbar.jsx";
import {Route, Routes} from "react-router-dom";
import PostPage from "./pages/PostPage/PostPage.jsx";
import LoginPage from "./pages/LoginPage/LoginPage.jsx";
import RegisterPage from "./pages/RegisterPage/RegisterPage.jsx";
import AddPost from "./pages/AddPost/AddPost.jsx";
import {useDispatch, useSelector} from "react-redux";
import {useEffect} from "react";
import {fetchAuthMe, selectIsAuth} from "./redux/slices/authSlice.js";

function App() {
    const dispatch = useDispatch()
    const isAuth = useSelector(selectIsAuth)

    useEffect(() => {
        dispatch(fetchAuthMe())
    }, [])

    return (
        <>
            <Navbar/>
            <Routes>
                <Route path='/' element={<HomePage/>} />
                <Route path='/posts/:id' element={<PostPage/>} />
                <Route path='/login' element={<LoginPage />} />
                <Route path='/register' element={<RegisterPage />} />
                <Route path='/add' element={<AddPost />} />
            </Routes>
        </>
    )
}

export default App
