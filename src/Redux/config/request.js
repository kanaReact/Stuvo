import axios from 'axios';
import {Alert} from 'react-native';
import constant from './constant';

axios.defaults.baseURL = constant.BASE_URL;

const get = slug => {
  return new Promise((resolve, reject) => {
    axios
      .get(slug)
      .then(response => {
        resolve(response);
      })
      .catch(err => {
        reject(err);
       
      });
  });
};

const getWithParams = (slug, data) => {
  return new Promise((resolve, reject) => {
    axios
      .get(slug, data)
      .then(response => {
        resolve(response);
      })
      .catch(err => {
        reject(err);

      });
  });
};

const doPostWithAuth = (slug, data, token = null) => {
  return new Promise((resolve, reject) => {
    axios
      .post(slug, data, {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
          Authorization: token,
        },
      })
      .then(res => {
        resolve(res);
      })
      .catch(error => {
        reject(error);
      });
  });
};

const doPost = (slug, data) => {
  return new Promise((resolve, reject) => {
 
    axios.post(slug, data, {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
      })
      .then(res => {
        resolve(res.data);
      })
      .catch(error => {
        if (error.response) {
          if (error.response.data) {
            reject(error.response.data);
          }
          reject(error.response);
        } else {
          if (error.message == 'Network Error') {
            Alert.alert('No Internet', 'Check Your Internet Connection .');
          }
        }
      });
  });
};

const doPut = (slug, data, token) => {
  return new Promise((resolve, reject) => {
    axios
      .put(slug, data, {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
          Authorization: token,
        },
      })
      .then(res => {
   
        resolve(res.data);
      })
      .catch(error => {
       
        reject(error);
      });
  });
};

const doDelete = (slug, token) => {
  return new Promise((resolve, reject) => {
    axios
      .delete(slug, {
        headers: {
          Authorization: token,
        },
      })
      .then(res => {
       
        resolve(res.data);
      })
      .catch(error => {
        
        reject(error);
      });
  });
};

export {get, getWithParams, doPostWithAuth, doPost, doPut, doDelete};