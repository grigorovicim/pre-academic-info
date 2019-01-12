var axios = require('axios');

module.exports = function(port) {
    var axiosInstance = axios.create({
        baseURL: 'http://localhost:' + port,
    });

    return axiosInstance;
}