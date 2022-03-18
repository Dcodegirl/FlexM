import axios from "axios";

const setAxiosDefaults = () => {
  axios.defaults.timeout = 300000;
  axios.defaults.headers.common['Accept'] = 'application/json';
  axios.defaults.headers.post['Content-Type'] = 'application/json';
};

export default setAxiosDefaults;
