import React from "react";

const CreatePost=()=>{
    return (
        <div>
            <LeftSidebar/>
            <div>
                <Outlet/>
            </div>

        </div>
    )
}

export default CreatePost;