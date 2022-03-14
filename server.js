const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();

app.options('*', cors());
app.use(cors());

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json({
    verify: (req, res, buf) => {
        req.rawBody = buf
    }
}));

require('./App/routes/index')(app);

app.use(function(err, req, res, next) {
    if (err.message)
        res.status(404).json({ status: "Error", message: err.message });
    else if (err.status === 404)
        res.status(404).json({ message: "Not found" });
    else
        res.status(500).json({ message: "Something looks wrong :( !!!" });
});

const http = require('http').Server(app);

http.listen(process.env.PORT || 5000, () => console.log(`Listening on port: ${process.env.PORT || 5000}`));