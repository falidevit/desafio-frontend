import axios from 'axios';
const KEY = 'AIzaSyCY-rS5s9vbhoeA2an5xqMEFQ7kkuF88m8';

export default axios.create({
    baseURL: 'https://www.googleapis.com/youtube/v3/',
    params: {
        part: 'snippet',
        maxResults: 24,
        key: KEY
    }
})