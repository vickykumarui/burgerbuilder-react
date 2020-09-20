import axios from 'axios';

const instance = axios.create({
    baseURL: "https://react-my-burger-67010.firebaseio.com/"
});

export default instance;