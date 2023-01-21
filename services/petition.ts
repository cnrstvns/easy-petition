import axios from 'axios';
import { Petition } from '@prisma/client';

export const signPetition = (petition: string, content: string) => {
  return axios
    .post('/api/v1/signatures', { petitionId: petition, content })
    .then((response) => response.data);
};

export const createPetition = (data: Petition) =>
  axios.post('/api/v1/petitions', data).then((response) => response.data);
