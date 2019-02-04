import axios from 'axios';

const instance = axios.create({baseURL:'https://burger-builder-e5fbc.firebaseio.com/'});

export default instance;