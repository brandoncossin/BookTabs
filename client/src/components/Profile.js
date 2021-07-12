import React from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';

export default class Profile extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      uid: "",
      name: "",
      myList: [],
    }
  }
  componentDidMount() {
    if (sessionStorage.getItem('token')) {
      const token = sessionStorage.getItem('token')
      axios.get("http://localhost:8080/profile", {
        params: {
          token: token
        }
      })
        .then(data => {
          this.setState({ uid: data.data.profile.uid })
          this.setState({ name: data.data.profile.name })
          this.setState({ myList: data.data.profile.myList })
          console.log(this.state.myList)
        });
    }
  }
  render() {
    return (
      <div className="container">
        <h1>Welcome {this.state.uid}</h1>
        <hr></hr>
        <h3>My List</h3>
        <table class="table">
          <thead>
            <tr>
              <th scope="col">Cover</th>
              <th scope="col">Title</th>
              <th scope="col">Author</th>
              <th scope="col">Date Added</th>
            </tr>
          </thead>
          <tbody>
            {this.state.myList.length === 0 && (
              <p>No matching items!</p>
            )}
            {this.state.myList.map((book, i) => (
          
                  <tr>
                    <th scope="row" class="ProfileBookList "><img src={`${book.bookImage}`} class="ProfileBookList" alt={book.title} /></th>
                    <td>{book.bookTitle}</td>
                    <td>"book auther here"</td>
                    <td>Data Added</td>
                    <td><button></button></td>
                  </tr>

                  
            ))}
          </tbody>
        </table>

      </div>
    );
  }
}
