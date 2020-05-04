const path = require('path');

const constructorMethod = app => {
    app.get('/', async (req, res) => {
        res.sendFile(path.resolve('public/index.html'));
    });

    app.use("*", (req, res) => {
        res.redirect("/");
    });
};

module.exports = constructorMethod;
