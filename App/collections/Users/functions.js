const queries = require('./queries');
const connection = require('../../db/index');

module.exports = {
    tableExist: async(done) => {
        connection.query(queries.LIST, (err, result) => {
            if (err) {
                done({
                    status: false,
                    message: 'Something went wrong',
                    error: err
                })
            }
            done({
                status: true,
                exist: true
            })
        });
    },
    createTable: (done) => {
        connection.query(queries.CREATE_TABLE, (err, result) => {
            if (err) {
                done({
                    status: false,
                    message: 'Something went wrong',
                    error: err
                })
            }
            done({
                status: true,
                message: 'Table created successfully.',
                data: result
            })
        })
    },
    create: (payload, done) => {
        connection.query(queries.INSERT, [payload.name, payload.email, payload.password], (err, result) => {
            if (err) {
                done({
                    status: false,
                    message: 'Something went wrong',
                    error: err
                })
            }
            done({
                status: true,
                message: 'User created successfully.',
                data: result
            })
        })
    },
    findOne: (id, done) => {
        connection.query(queries.READ, [id], (err, result) => {
            if (err) {
                done({
                    status: false,
                    message: 'Something went wrong',
                    error: err
                })
            }
            done({
                status: true,
                data: result
            })
        })
    },
    findByEmail: (email, done) => {
        connection.query(queries.FIND_BY_EMAIL, [email], (err, result) => {
            if (err) {
                done({
                    status: false,
                    message: 'Something went wrong',
                    error: err
                })
            }
            done({
                status: true,
                data: result
            })
        })
    },
    update: (data, done) => {
        connection.query(queries.UPDATE, [data.payload.name, data.id], (err, result) => {
            if (err) {
                done({
                    status: false,
                    message: 'Something went wrong',
                    error: err
                })
            }
            done({
                status: true,
                message: 'User updated successfully',
                data: result
            })
        })
    },
    delete: (id, done) => {
        connection.query(queries.DELETE, [id], (err, result) => {
            if (err) {
                done({
                    status: false,
                    message: 'Something went wrong',
                    error: err
                })
            }
            done({
                status: true,
                data: result
            })
        })
    },
    findAll: (done) => {
        connection.query(queries.LIST, (err, result) => {
            if (err) {
                done({
                    status: false,
                    message: 'Something went wrong',
                    error: err
                })
            }
            done({
                status: true,
                data: result
            })
        })
    },
    updateToken: (data, done) => {
        connection.query(queries.UPDATE_TOKEN, [data.payload.token, data.id], (err, result) => {
            if (err) {
                done({
                    status: false,
                    message: 'Something went wrong',
                    error: err
                })
            }
            done({
                status: true,
                message: 'Token updated successfully',
                data: result
            })
        })
    }
}