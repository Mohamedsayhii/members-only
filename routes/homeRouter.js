const { Router } = require('express');
const { getHomepage, getLogout } = require('../controllers/homeController');

const homeRouter = Router();

homeRouter.get('/', getHomepage);
homeRouter.get('/logout', getLogout);

module.exports = homeRouter;
