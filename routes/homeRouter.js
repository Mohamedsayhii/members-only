const { Router } = require('express');
const {
	getHomepage,
	getLogout,
	getMessageForm,
	postMessageForm,
	getMembershipForm,
	postMembershipForm,
	deleteMessage,
} = require('../controllers/homeController');

const homeRouter = Router();

homeRouter.get('/', getHomepage);
homeRouter.get('/new-message', getMessageForm);
homeRouter.post('/new-message', postMessageForm);
homeRouter.get('/membership', getMembershipForm);
homeRouter.post('/membership', postMembershipForm);
homeRouter.post('/:messageId/delete', deleteMessage);
homeRouter.get('/logout', getLogout);

module.exports = homeRouter;
