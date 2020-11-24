import React from 'react'
import axios from "axios";

class FullPost extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            post: null
        }
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (this.props.id){
            if(!this.state.post || (this.state.post && this.state.post.id !== this.props.id)){
                axios.get('https://jsonplaceholder.typicode.com/posts/' + this.props.id)
                    .then(response => {
                        console.log(response)
                        this.setState({
                            post: response.data
                        })
                    })
            }
        }

    }

    render() {
        let post = <p>Please Select a Post</p>
        if (this.props.id) {
            post = <p>loading ...</p>
        }
        if(this.state.post){
            post = (
                <div>
                    <h1>{this.state.post.title}</h1>
                    <p>{this.state.post.body}</p>
                </div>
            )
        }
        return(
            <div>
                {post}
            </div>
        )
    }
}

export default FullPost