const { Router } = require('express');
const {
	getHomepage,
	getLogout,
	getMessageForm,
	postMessagesForm,
} = require('../controllers/homeController');

const homeRouter = Router();

homeRouter.get('/', getHomepage);
homeRouter.get('/new-message', getMessageForm);
homeRouter.post('/new-message', postMessagesForm);
homeRouter.get('/logout', getLogout);

module.exports = homeRouter;
