const db = require('../config/db-config.js');

module.exports = {
    getAllValues,
    findValuesByUserID,
    getValueByID,
    // insert,
    update,
    getCustomValuesByID,
    insertCustomValue,
    viewAllCustomValues,
    // updateCustomValue,
    // deleteCustomValue,
    // insertTop3,
    // updateTop3,
    // deleteTop3,
    // remove
};

function getAllValues() { // Works
    return db('values');
}

function getValueByID(id) { // Untested 
    return db('values')
        .where({ id });
}

function findValuesByUserID(id) { // Works //Remember to include new custom values, parsing into an array where appropriate
    return db('values')
        .join('users_values', 'users_values.value_id', '=', 'values.id')
        .select('values.*')
        .where({ user_id: id });
};
//PERTAINING TO CUSTOM VALUES ON A USER PROFILE
// =======================================================================================================================

function viewAllCustomValues(){
    return db('custom_values');
}

function getCustomValuesByID(id) {    // Needs work, we want to post values to only a user, not the total list of values
    return db.select('custom_values')
    .from('users')
    .where({id})
    // .then(() =>{
    //     // console.log('Model res for custom values: ', res);
    // })
    
}


function insertCustomValue(value, id){
    return db.select('custom_values')
    .where({user_id : id})
    .insert(value)
    // .then(([id]) =>{

    // })
    
}
//=========================================================================================================================
//PUT to all values
function update(value, id) { //Works but not likely to be used
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


