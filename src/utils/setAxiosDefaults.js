import axios from "axios";

const setAxiosDefaults = () => {
  axios.defaults.timeout = 300000;
  axios.defaults.headers.common = {'Content-Type': 'application/json',
  'Accept':'application/json'};
};

export default setAxiosDefaults;
