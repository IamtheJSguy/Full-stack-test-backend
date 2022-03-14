const users = require('../collections/Users/routes');
const sports = require('../collections/Sports/routes');

module.exports = app => {
    app.use('/api/users', users);
    app.use('/api/sports', sports);
}