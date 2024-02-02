// Create a user via Api.

const axios = require('axios');

async function createUserThroughAPI() {
    try {
      const response = await axios.post('https://api.club-administration.qa.qubika.com/api/auth/register', {
        email: 'brandonmansfield@qubika.com',
        password: 'brandonmansfield',
        roles: ['ROLE_ADMIN']
      });
      const newUser = response.data;
      console.log('New user created:', newUser);
      return newUser;
    } catch (error) {
      throw new Error('Error creating a new user through the API:', error.response.data);
    }
  }
  createUserThroughAPI();