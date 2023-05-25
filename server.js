const express = require('express');
const route = express.Router();

const controllers = require('./controllers');

const app = express();

app.use(express.json());

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

const PORT = 3000;

//ROTAS
route.post('/presc', controllers.presc)
route.post('/disp', controllers.disp)
route.post('/getpresc', controllers.getpresc)
route.get('/bites', controllers.bites)

app.use('/', route);

app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
});
