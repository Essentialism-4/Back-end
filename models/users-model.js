const db = require('../config/db-config.js');

module.exports = {
    getAll,
    findBy,
    findByID,
    insert,
    update,
    remove,
};
//==============
function getAll() {
    return db('users');
}

function findBy(filter) {
    return db('users').where(filter);
}

function findByID(id) {
    return db('users')
        .where({ id })
        .first();
}


//Post
function insert(user) {
    return db('users')
        .insert(user, 'id')
        .then(ids => {
            const [id] = ids;
            return findByID(id);
        })
}


// Put
function update(user, id) {
    return db('users')
        .where('id', Number(id))
        .update(user)
        .then(()=>{
            return findByID(id)
        });
}


function remove(id) {
    return db('users')
        .where({ id })
        .del
}

//================================================================================
