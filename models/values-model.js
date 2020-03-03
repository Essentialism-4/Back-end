const db = require('../config/db-config.js');

module.exports = {
    getAllValues,
    findValuesByUserID,
    getValueByID,
    insert,
    update,
    // remove
};

function getAllValues() { // Works
    return db('values');
}

function getValueByID(id) { // Untested 
    return db('values')
        .where({ id });
}

function findValuesByUserID(id) { // Works
    return db('values')
        .join('users_values', 'users_values.value_id', '=', 'values.id')
        .select('values.*')
        .where({ user_id: id });
}


//Post
function insert(value) {    // Needs work, we want to post values to only a user, not the total list of values
    return db('values')
        .insert(value, 'id')
        .then(ids => {
            const [id] = ids;
            return getValueByID(id).first();
        })
}


// Put  // To be continued with at a later time
function update(value, id) {
    return db('values')
        .where('id', Number(id))
        .update(value)
        .then(()=>{
            return getValueByID(id)
        });
};

// function remove(id) {
//     return db('users')
//     .where({ id })
//     .del
// }


