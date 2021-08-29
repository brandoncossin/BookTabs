import React from 'react';

const Blog = (props) =>{
    return(
        <div className="container-fluid">
            
            <br></br>
            <p>This is the Blog where I will post progress and website updates on. </p>
            {props.isLoggedIn && (
                <div>
          <b>Thanks for creating an account. This project means a lot to mean. Back in May I was rejected from all
              the internship opportunities I applied for. This gave me the motivation I needed to learn the MERN
              stack and create a worthwhile application.
          </b>
          </div>
        )}        
        <br></br>
        <div>
            <p>-7/11/2021: Tonight I finished setting up the feature for adding to list.
                This site has come a long way, it actually originally started as a movie
                review site however the APIs were not fun to work with for that. I will try to
                keep this concise, however I am eager to share what is new. Soon we will have many 
                more features, and Im not even certain if I even want to make this a bigger thing
                than just a small project, I do have faith in it however.
            </p>
        </div>
        <div>
            <p>-8/01/2021: Site is close to deployment. Just waiting on the UX design to implement. The Review 
                portion is also in the works. Very excited for what is to come.
            </p>
        </div>
        <div>
            <p>-8/07/2021: Added functionality to search by author, and for books to have custom urls that 
                can be used to find individual books.
            </p>
        </div>
        <div>
            <p>-8/22/2021: Finishing up last few tasks before MVP deployment.
                Working on bug checks, "like" feature, and making sure login 
                credentials are secure(long passwords, making sure email is real).
            </p>
        </div>
        <div>
            <p>-8/26/2021: I have been coding up final touches to prepare for deployment. Making sure every page has 
                a loading component and buttons are all the same and working as intended. Alos going to clean up
                the profile list portion since it is not as mobile responsive.
            </p>
        </div>
        </div>
    );
}
export default Blog;