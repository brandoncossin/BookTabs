import React from 'react';

const Blog = (props) =>{
    return(
        <div className="container">
            {props.isLoggedIn && (
          <p>Thanks for creating an account</p>
        )}
        <p>This is the Blog where I will post progress or whatever on</p>
        <div>
            <p>Tonight I finished setting up the feature for adding to list.
                This site has come a long way, it actually originally started as a movie
                review site however the APIs were not fun to work with for that. I will try to
                keep this concise, however I am eager to share what is new. Soon we will have many 
                more features, and Im not even certain if I even want to make this a bigger thing
                than just a small project, I do have faith in it however.
                -7/11/2021
            </p>
        </div>
        </div>
    );
}
export default Blog;