import React from 'react'

class Posts extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {

        return(
            <div onClick={this.props.click}>
                <h1>{this.props.title}</h1>
                <p>{this.props.body}</p>
            </div>
        )
    }
}

export default Posts