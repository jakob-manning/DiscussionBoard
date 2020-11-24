import React from 'react'
import axios from "axios";
import Posts from "./Posts";
import FullPost from "./FullPost";
import NewPost from "./NewPost";

class Blog extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            posts: [],
            selectedPostId: null
        }
    }

    componentDidMount() {
        axios.get('https://jsonplaceholder.typicode.com/posts')
            .then((response) => {
                const posts = response.data.slice(0,4)
                this.setState({
                    posts: posts
                })
                console.log(response.data)
            })
    }

    handleClick = (id) => {
        console.log(id)
        this.setState({
            selectedPostId: id
        })
    }

    render() {
        const posts = this.state.posts.map((post, index) => {
            return(
                <Posts
                    click={this.handleClick.bind(this, post.id)}
                    key={post.id}
                    title={post.title}
                    body={post.body}></Posts>
                )
        })

        return(
            <div>
                <h1>Blog Posts</h1>
                {posts}
                <FullPost id={this.state.selectedPostId}></FullPost>
                <NewPost></NewPost>
            </div>
        )
    }
}

export default Blog