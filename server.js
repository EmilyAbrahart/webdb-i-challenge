const express = require('express');

const db = require('./data/dbConfig.js');

const server = express();

server.use(express.json());

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

module.exports = server;
