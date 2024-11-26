const { Router } = require('express');
const {
	getHomepage,
	getLogout,
	getMessageForm,
} = require('../controllers/homeController');

const homeRouter = Router();

homeRouter.get('/', getHomepage);
homeRouter.get('/new-message', getMessageForm);

homeRouter.get('/logout', getLogout);

module.exports = homeRouter;
