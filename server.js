const express = require('express');

const db = require('./data/dbConfig.js');

const server = express();

function getAllAccounts() {
	return db('accounts');
}

function getAccountById(id) {
	return db('accounts').where({ id });
}

function createNewAccount({ name, budget }) {
	return db('accounts').insert({ name, budget });
}

function updateAccountById(id, { name, budget }) {
	return db('accounts')
		.where({ id })
		.update({ name, budget });
}

function deleteAccountById(id) {
	return db('accounts')
		.where({ id })
		.del();
}

server.use(express.json());

server.get('/api/accounts', async (req, res, next) => {
	try {
		const accounts = await getAllAccounts();
		res.status(200).json(accounts);
	} catch (error) {
		res.status(500).json({
			message: 'Unable to retrieve accounts. Please try again later.'
		});
	}
});

server.get('/api/accounts/:id', async (req, res) => {
	try {
		const account = await getAccountById(req.params.id);
		res.status(200).json(account);
	} catch {
		res
			.status(500)
			.json({ message: `Unable to retrieve account ${req.params.id}` });
	}
});

server.post('/api/accounts', async (req, res) => {
	try {
		const newAccountId = await createNewAccount(req.body);
		const newAccount = await getAccountById(newAccountId[0]);
		res.status(201).json(newAccount);
	} catch (error) {
		res.status(500).json({ message: 'Unable to add account to the database.' });
	}
});

server.put('/api/accounts/:id', async (req, res) => {
	try {
		const { name, budget } = req.body;
		if (!req.body.name || !req.body.budget) {
			json.status(500).json({ message: 'Name and Budget are required!' });
		} else {
			const updateAccount = await updateAccountById(req.params.id, {
				name,
				budget
			});
			const updatedAccount = await getAccountById(req.params.id);
			res.status(200).json(updatedAccount);
		}
	} catch (error) {
		res.status(500).json({
			message: `Unable to update account ${req.params.id}!`
		});
	}
});

server.delete('/api/accounts/:id', async (req, res) => {
	try {
		const deleteAccount = await deleteAccountById(req.params.id);
		res
			.status(200)
			.json({ message: `Account ${req.params.id} has been deleted` });
	} catch (error) {
		res.status(500).json({
			message: `Unable to delete account ${req.params.id}`
		});
	}
});

module.exports = server;
