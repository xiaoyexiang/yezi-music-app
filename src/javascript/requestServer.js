import axios from 'axios';

let baseURL = process.env.NODE_ENV === 'production' ? 'http://www.xiaoyexiang.com/api_music' : 'http://localhost:4000';
if(window.location.protocol === 'https:') {
  baseURL = replace('http:', 'https:');
}
console.log('baseURL: ', baseURL);

const requestServer = axios.create({
  baseURL: baseURL,
  withCredentials: true,
  timeout: 60000,
});

requestServer.interceptors.response.use(
  (response) => {
    const res = response.data;
    if (+res.code !== 200) {
      console.error(`response error: ${res.msg}`);
      return Promise.reject(res);
      // report...
    }
    return Promise.resolve(res);
  },
  (error) => {
    console.error(`request error: ${error}`);
    // report...
  },
);

export default requestServer;