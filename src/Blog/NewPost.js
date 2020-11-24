import React from 'react'
import axios from "axios";

class NewPost extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            title: "A Title",
            content: "My first post",
            author: "Jake"
        }
    }

    postDataHandler = () => {
        const post = {
            title: this.state.title,
            body: this.state.body,
            author: this.state.author,

        }
        axios.post('https://jsonplaceholder.typicode.com/posts/', post)
            .then(response => {
                console.log(response)
            })
    }

    render() {
        return(
            <div>
                <p>{"Post data to the server"}</p>
                <button onClick={this.postDataHandler}>save post</button>
            </div>
        )
    }
}

export default NewPost