import axios from 'axios';

/**
 * INFO: normally this file could we named
 * 'apiService' or just 'api' for demo purposes
 * just 'axios'
 */

/**
 * INFO: just for the exercise purposes,
 * in commercial projects we would most likely
 * create axios instance with some baseURL and
 * bunch of other attributes defined along with
 * interceptors for auth implementation purposes
 */

const axiosInstance = axios.create({
    /**
     * INFO: we are fetching here CSV file from /public
     * directory so baseURL is set to '/'
     */
    baseURL: '/',
});

export default axiosInstance;