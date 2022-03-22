const Users = require('./functions');

const bcryptjs = require('bcryptjs')

module.exports = {
    Create: async(req, res) => {
        try {
            req.body.password = await bcryptjs.hash(req.body.password, 8);
            Users.tableExist((result) => {
                if (!result.status) {
                    Users.createTable((result) => {
                        if (!result.status) {
                            return res.status(401).json(result)
                        }
                    })
                }
                Users.create(req.body, (result) => {
                    if (!result.status) {
                        return res.status(403).json(result)
                    }
                    Users.findByEmail(req.body.email, async(result) => {
                        if (!result.status) {
                            return res.status(401).json(result)
                        }
                        return res.status(200).json(result.data[0]);
                    })
                })
            });
        } catch (error) {
            return res.status(500).json({
                status: false,
                message: error.message
            });
        }
    },
    Login: async(req, res) => {
        try {
            Users.findByEmail(req.body.email, async(result) => {
                if (!result.status) {
                    return res.status(401).json(result)
                }
                let user = result.data[0]
                if (user) {
                    if (user.email) {
                        let checkPass = await bcryptjs.compare(req.body.password, user.password);
                        if (!checkPass) {
                            return res.status(401).json({
                                status: false,
                                errCredentials: 'Email/Password incorrect'
                            })
                        }
                        return res.status(200).json({
                            status: true,
                            message: 'Succesfully Logged In',
                            data: user
                        })
                    } else {
                        return res.status(401).json({
                            status: false,
                            errCredentials: 'Email/Password incorrect'
                        })
                    }
                } else {
                    return res.status(401).json({
                        status: false,
                        errCredentials: 'Email/Password incorrect'
                    })
                }

            });
        } catch (error) {
            return res.status(500).json({
                status: false,
                message: error.message
            })
        }
    },
    Read: async(req, res) => {
        try {
            const id = req.params.id;
            Users.findOne(id, (result) => {
                if (!result.status) {
                    return res.status(401).json(result);
                }
                return res.status(200).json(result.data[0]);
            });
        } catch (error) {
            return res.status(500).json({
                status: false,
                message: error.message
            });
        }
    },
    List: async(req, res) => {
        try {
            Users.findAll(id, (result) => {
                if (!result.status) {
                    return res.status(401).json(result);
                }
                return res.status(200).json(result.data);
            });
        } catch (error) {
            return res.status(500).json({
                status: false,
                message: error.message
            });
        }
    },
    Update: async(req, res) => {
        try {
            const data = {
                id: req.params.id,
                payload: req.body
            }
            Users.update(data, (result) => {
                if (!result.status) {
                    return res.status(401).json(result);
                }
                return res.status(200).json(result);
            });
        } catch (error) {
            return res.status(500).json({
                status: false,
                message: error.message
            });
        }
    },
    Delete: async(req, res) => {
        try {
            const id = req.params.id;
            Users.delete(id, (result) => {
                if (!result.status) {
                    return res.status(401).json(result);
                }
                return res.status(200).json(result);
            });
        } catch (error) {
            return res.status(500).json({
                status: false,
                message: error.message
            });
        }
    }
}