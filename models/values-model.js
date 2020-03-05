const db = require('../config/db-config.js');

module.exports = {
    getAllValues,
    findValuesByUserID,
    getValueByID,
    addValueToProfile,
    update,
    getCustomValuesByID,
    insertCustomValue,
    viewAllCustomValues,
    updateCustomValue,
    deleteCustomValue,
    getTop3ByID,
    insertTop3,
};

function getAllValues() { // Works
    return db('values');
}

function getValueByID(id) { // Works
    return db('values')
        .where({ id });
}

function findValuesByUserID(id) { // Works //Remember to include new custom values, parsing into an array where appropriate
    return db('values')
        .join('users_values', 'users_values.value_id', '=', 'values.id')
        .select('values.*')
        .where({ user_id: id });
};

function addValueToProfile(valueInfo){
    return db('users_values')
    .insert(valueInfo, 'id');
}
//PERTAINING TO CUSTOM, USER-SUBMITTED VALUES 
// =======================================================================================================================

function viewAllCustomValues(){
    return db('custom_values');
}

function getCustomValuesByID(id) {    // Needs work, we want to post values to only a user, not the total list of values
    return db('custom_values')
    .where({user_id : id})
}

function insertCustomValue(value){  //may need id param
    return db('custom_values')
    // .where({user_id : id})
    .insert(value, 'id')
    // .then(([id]) =>{

    // })
}


function updateCustomValue(value, id) { //Works but not likely to be used
    return db('custom_values')
        .where('id', Number(id))
        .update(value);

};


function deleteCustomValue(id) {
    return db('custom_values')
    .where({ id })
    .del();
}

//TOP 3 Values functions
//=========================================================================================================================

function getTop3ByID(id){
    return db('users')
    .where({id})
    .select('users.top3_values');
}

function insertTop3(valuesString, id){
    return db('users')
    .where('id', Number(id))
    .select("top3_values")
    .update({top3_values:valuesString});  
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

// function remove(id) {  // Don't really want clients to be able to delete user accounts I reckon
//     return db('users')
//     .where({ id })
//     .del()
// }


