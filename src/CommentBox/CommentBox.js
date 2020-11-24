import React from 'react';

let currentComments = []

class CommentBox extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            text: "hello world",
        }
    }

    newInput = (event) => {
        this.setState({
            text: event.target.value
        })
    }

    saveComment = () => {
        console.log(this.state.text)
        currentComments.push(this.state.text)
        console.log(currentComments)
    }

    render() {
        return(
            <div className="CommentBox">
                <h2>Comments</h2>
                <p>{this.state.text}</p>
                <textarea id={"newComment"} name={"Comments"} rows={"4"} cols={"60"} onChange={this.newInput} value={this.state.text}></textarea>
                <p></p>
                <input type={"submit"} value={"Submit"} onClick={this.saveComment}/>
                <p></p>
                <input type="text" onChange={this.newInput} value={this.state.text} />
            </div>
        )
    }

}

export default CommentBox;