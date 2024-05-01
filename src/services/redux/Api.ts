   import axios from 'axios';

   export const fetchUsers = async (page: number, results: number) => {
     try {
       const response = await axios.get(`https://randomuser.me/api/?page=${page}&results=${results}`);
       return response.data.results;
     } catch (error) {
       throw error;
     }
   };