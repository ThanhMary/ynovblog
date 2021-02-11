import axios from 'axios';


axios.defaults.headers['Accept'] = 'application/json';

function finfAll() {
    return axios.get('api/articles').then(response => response.data)
}

function getArticle(id) {
    return axios.get('api/articles/'+ id).then((response)=> response.data)
}

function create(article) {
    return axios.post('api/articles', article)
            .then((response) => response.data.id);
}


export default {
    finfAll,
    getArticle,
    create,
}


