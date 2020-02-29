const db = require('../config/db-config.js');

module.exports = {
    getAll,
    getByID,
    insert,
    update,
    remove
};

function getAll() {
    return db('users');
}

function getByID() {
    return db('users');
}


function insert() {
    return db('users');
}


function update() {
    return db('users');
}


function remove() {
    return db('users');
}


