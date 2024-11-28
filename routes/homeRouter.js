const { Router } = require('express');
const {
	getHomepage,
	getLogout,
	getMessageForm,
	postMessageForm,
	getMembershipForm,
	postMembershipForm,
} = require('../controllers/homeController');

const homeRouter = Router();

homeRouter.get('/', getHomepage);
homeRouter.get('/new-message', getMessageForm);
homeRouter.post('/new-message', postMessageForm);
homeRouter.get('/membership', getMembershipForm);
homeRouter.post('/membership', postMembershipForm);
homeRouter.get('/logout', getLogout);

module.exports = homeRouter;
