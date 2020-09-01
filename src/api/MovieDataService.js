import axios from 'axios'

class MovieDataService {
    retrieveAllMovies(view){
        return axios.get(`http://rest-api-xq-dev.eba-bwit5cb9.ap-southeast-1.elasticbeanstalk.com/movies`)
        // return axios.get(`http://localhost:5000/index/${view}`, view)
        // return axios.get(`http://localhost:5000/movies`)
    }
    createNewMovie(movie){
        return axios.post(`http://rest-api-xq-dev.eba-bwit5cb9.ap-southeast-1.elasticbeanstalk.com/movies`, movie)
        // return axios.post(`http://localhost:5000/movies`, movie)
    }
    deleteMovie(id){
        return axios.delete(`http://rest-api-xq-dev.eba-bwit5cb9.ap-southeast-1.elasticbeanstalk.com/movies/${id}`)
        // return axios.delete(`http://localhost:5000/movies/${id}`)
    }
    updateMovie(movie){
        return axios.put(`http://rest-api-xq-dev.eba-bwit5cb9.ap-southeast-1.elasticbeanstalk.com/movies`,movie)
        // return axios.put(`http://localhost:5000/movies`, movie)
    }
    getMovie(id){
        return axios.get(`http://rest-api-xq-dev.eba-bwit5cb9.ap-southeast-1.elasticbeanstalk.com/movies/${id}`)
        // return axios.get(`http://localhost:5000/movies/${id}`)
    }
}

export default new MovieDataService()