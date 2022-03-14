const Sports = require('./functions');
const axios = require('axios');

module.exports = {
    Create: async(req, res) => {
        try {
            Sports.tableExist((result) => {
                if (!result.status) {
                    Sports.createTable((result) => {
                        if (!result.status) {
                            return res.status(401).json(result)
                        }
                    })
                }
                Sports.create(req.body, (result) => {
                    if (!result.status) {
                        return res.status(401).json(result)
                    }
                    return res.status(200).json(result);
                });
            })
        } catch (error) {
            return res.status(500).json({
                status: false,
                message: error.message
            });
        }
    },
    Read: async(req, res) => {
        try {
            const id = req.params.id;
            Sports.findOne(id, (result) => {
                if (!result.status) {
                    return res.status(401).json(result)
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
            Sports.findAll((result) => {
                if (!result.status) {
                    return res.status(401).json(result)
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
            Sports.update(data, (result) => {
                if (!result.status) {
                    return res.status(401).json(result)
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
            Sports.delete(id, (result) => {
                if (!result.status) {
                    return res.status(401).json(result)
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
    Search: async(req, res) => {
        try {
            axios.get(`https://sportplaces.api.decathlon.com/api/v1/places?origin=${req.body.lat},${req.body.lng}&radius=99&sports=${req.body.sportId}`)
                .then(
                    (response) => {
                        return res.status(200).json({
                            status: true,
                            data: response.data.data
                        });
                    }
                )
                .catch(
                    (error) => {
                        throw error
                    }
                )
        } catch (error) {
            return res.status(500).json({
                status: false,
                message: error.message
            });
        }
    },
    MySports: async(req, res) => {
        try {
            Sports.findMySports(req.params.id, (result) => {
                if (!result.status) {
                    return res.status(401).json(result)
                }
                return res.status(200).json(result.data);
            });
        } catch (error) {
            return res.status(500).json({
                status: false,
                message: error.message
            });
        }
    }
}