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

function getByID(id) {
    return db('users')
    .where({ id })
    .first();
}  


//Post
function insert() {
    return db('users')
    .insert(user, 'id')
    .then(ids => {
        const [id] = ids;
        return findById(id);
    })
}


// Put
function update(user) {
    return db('users')
    .insert(user, 'id')
    .then(ids => {
        const [id] = ids;
        return findById(id);
    });
}

function remove() {
    return db('users')
    .wher({ id })
    .del
}


