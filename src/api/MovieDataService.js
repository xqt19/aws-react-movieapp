import axios from 'axios'

class MovieDataService {
    retrieveAllMovies(){
        return axios.get(`http://localhost:8080/movies`)
    }
}

export default new MovieDataService()