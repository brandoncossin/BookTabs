import React from 'react';

const Blog = (props) =>{
    return(
        <div className="container">
            {props.isLoggedIn && (
                <p>This can be anyones blog</p>
            )}
        <p>This is the Blog</p>
        </div>
    );
}
export default Blog;