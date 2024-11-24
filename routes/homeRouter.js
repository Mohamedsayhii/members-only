const { Router } = require('express');
const { getHomepage } = require('../controllers/homeController');

const homeRouter = Router();

homeRouter.get('/', getHomepage);

module.exports = homeRouter;
