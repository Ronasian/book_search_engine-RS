const { AuthenticationError } = require('apollo-server-express');
const jwt = require('jsonwebtoken');

const secret = 'mysecretsshhhhh';
const expiration = '2h';

module.exports = {
  authMiddleware: function ({ req }) {
    
    let token = req.headers.authorization;

    if (token.startsWith('Bearer ')) {
      token = token.slice(7, token.length);
    } else {
      throw new AuthenticationError('Invalid token format');
    }

    if (!token) {
      throw new AuthenticationError('You have no token!');
    }

    try {
      const { data } = jwt.verify(token, secret, { expiresIn: expiration });
      req.user = data;
    } catch (err) {
      console.log('Invalid token');
      throw new AuthenticationError('Invalid token');
    }
  },
  signToken: function ({ username, email, _id }) {
    const payload = { username, email, _id };
    return jwt.sign({ data: payload }, secret, { expiresIn: expiration });
  },
};






