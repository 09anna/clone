import React from "react";
import { Outlet } from "react-router-dom";
import Feed from "./Feed.jsx";
import RightSidebar from "./RightSidebar.jsx";
import useGetAllPosts from "../hooks/useGetAllPosts";
const Home = () => {
    useGetAllPosts();
    return (
        <div className='flex'>
            <div className='flex-grow'>
                <Feed />
                <Outlet />
            </div>
            <RightSidebar />
        </div>
    )
}

export default Home;