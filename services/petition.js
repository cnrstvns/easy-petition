import axios from 'axios';

export const signPetition = function signPetition(petition, content) {
  return axios.post('/api/v1/signatures', { petitionId: petition, content })
    .then((response) => response.data);
};

export const createPetition = function createPetition(data) {
  return axios.post('/api/v1/petitions', data)
    .then((response) => response.data);
};
