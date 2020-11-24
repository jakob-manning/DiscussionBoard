import axios from 'axios';

const instance = axios.create({
    baseURL: 'https://react-message-board-21068.firebaseio.com/',

})

export default instance;