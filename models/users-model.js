// Import db config for use
// ======================================================================================
const db = require('../config/db-config.js');
// ======================================================================================


// Export db helper functions
// ======================================================================================
module.exports = {
    getAll,
    findBy,
    findByID,
    insert,
    update,
    remove,
};
// ======================================================================================


//User Functions
// ======================================================================================

//Get
function getAll() {
    return db('users');
}

//Get by param
function findBy(filter) {
    return db('users').where(filter);
}

//Get by ID
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

//Delete
function remove(id) {
    return db('users')
        .where({ id })
        .del
}

// ======================================================================================
