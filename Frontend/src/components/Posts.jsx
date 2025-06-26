import React from "react";
import Post from "./Post";

const Posts = () => {
    return (
        <div>
            {[1, 2, 3, 4,5,6,7].map((item, index) => <Post key={index} />)}

        </div>
    )
}

export default Posts;