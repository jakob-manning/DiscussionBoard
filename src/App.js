import React from 'react'
import './App.css';
import Blog from "./Blog/Blog";
import axios from "./axios-updates";

//clean-up the project. Create separate components for each aspect

class App extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            currentMessage: "",
            currentPoster:"",
            comments: [],
            users: null,
            loading: false
        }
    this.submitRef =  React.createRef()
    }

    //Use state to handle form input
    handleChange = (event) => {
        const inputName = event.target.name
        const inputValue = event.target.value
        this.setState({
            [inputName] : inputValue
        })
    }

    now = new Date()

    //Push new item to shopping list on submit
    handleSubmit = (event) => {
        event.preventDefault();
        let milliseconds = new Date().getTime();
        let displayTime =  new Date(milliseconds);
        let name = this.state.currentPoster.trim();
        let message = this.state.currentMessage.trim();
        let currentPost = {
                name: name,
                message: message,
                displayTime: displayTime,
                timeStamp: milliseconds
        }
        if (currentPost.name === '' || currentPost.message === ''){
            this.setState({
                currentPoster: name,
                currentMessage: message
            });
            return;
        }

        this.setState({
            loading: true
        })

        //Get data from server
        axios.post('/comments.json', currentPost)
            .then( (response) => {
                console.log(response)
            })
            .then( () => {
                axios.get('/comments.json')
                    .then((response) => {
                        const comments = response.data
                        this.setState({
                            comments: comments,
                            currentMessage: '',
                            loading: false
                        })
                    })
            })
            .catch(error => {
                console.log(error)
                this.setState({
                    loading: false
                })
            } )

        //reset focus
        this.input.focus()

    }

    //delete individual items
    deleteHandler = (key) => {
        console.log("delete pressed for " + key)
        let prevComments = {...this.state.comments}
        let comments = {...this.state.comments}
        delete comments[key]
        this.setState({
            comments
        })
        for (let items in prevComments){
            if(items === key){
                axios.delete('/comments/' + key + '.json')
                    .then( () => {
                        axios.get('/comments.json')
                            .then((response) => {
                                const comments = response.data
                                this.setState({
                                    comments: comments,
                                    currentMessage: ''
                                })
                            })
                    })
                    .catch(error => console.log(error))
            }
        }
    }

    //clear the list
    clearHandler = () => {
        let comments = this.state.comments
        for (let items in comments){
            axios.delete('/comments/' + items + '.json')
                .then( () => {
                    axios.get('/comments.json')
                        .then((response) => {
                            const comments = response.data
                            this.setState({
                                comments: comments,
                                currentMessage: ''
                            })
                        })
                })
                .catch(error => console.log(error))
        }
    }

    //mirror key-strokes
    keyPressed = (event) =>{
        if (event.key === "Enter" && event.ctrlKey) {
            this.submitRef.current.click()
            console.log("click")
        }
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        //scroll back to submit button on key press
        this.submitRef.current.scrollIntoView(false)
    }

    componentDidMount() {
        //scroll back to submit button
        this.submitRef.current.scrollIntoView(false)

        axios.get('/comments.json')
            .then((response) => {
                const comments = response.data
                this.setState({
                    comments: comments,
                })
            })

    }

    render(){
        //Generate comments from state
        let comments = []
        let commentsObject = this.state.comments

        for (let item in commentsObject){
            comments.push(
                <div key={item} className={"comment"}>
                    <h3 className={"name"}>
                        {commentsObject[item].name}:
                    </h3>
                    <p className={"commentText"}>{commentsObject[item].message}</p>
                    {/*TODO: Move buttons off of main display*/}
                    <button className={"submitButton lighterColour"}>⬆</button>
                    <button className={"submitButton lighterColour"}>⬇</button>
                    <button className={"submitButton lighterColour"} onClick={this.deleteHandler.bind(this, item)}>Delete</button>
                    {/*{commentsObject[item].displayTime}*/}
                </div>
            )
        }

        if(this.state.loading){
            comments.push(
                <div className={"center padding-L"}>
                    <div className="loader center"> </div>
                </div>
            )
        }

        //TODO: add multiple discussion boards. Main page allows you to choose or delete a board
        return (
            <div className="App">
                <div className={"title"}>
                    <h2>Discussion Board</h2>
                </div>
                {comments}
                {/*<h3 className={"name"}>*/}
                {/*    {this.state.currentPoster}*/}
                {/*</h3>*/}
                {/*<p>{this.state.currentMessage}</p>*/}
                <form className={"form"} onSubmit={this.handleSubmit}>
                    <input
                        className={"inputField nameInput"}
                        name={"currentPoster"}
                        value={this.state.currentPoster}
                        placeholder="Name"
                        onChange={this.handleChange}
                    />
                    <br />
                    <textarea
                        className={"inputField commentInput"}
                        name={"currentMessage"}
                        rows={"4"}
                        cols={"40"}
                        onKeyDown={this.keyPressed}
                        value={this.state.currentMessage}
                        placeholder="Comment"
                        onChange={this.handleChange}
                        ref={(input) => { this.input = input; }}
                    />
                    <br />
                    <div className={"center"}>
                        <button
                            className={"submitButton"}
                            type="submit"
                            // ref={(submit) => { this.submit = submit; }}
                            ref = {this.submitRef}
                        >Post Comment</button>
                    </div>
                    {/*<button onClick={this.clearHandler}>Clear Message Board</button>*/}
                </form>
            </div>
        );
    }

}

export default App;
