// Import db config for use
// ======================================================================================
const db = require('../config/db-config.js');
// ======================================================================================


// Helper functions to be exported
// ======================================================================================
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
// ======================================================================================


//Default Values Functions
// ======================================================================================
// Get the list of our preset values
function getAllValues() {
    return db('values');
}

// Get a specific preset value 
function getValueByID(id) { 
    return db('values')
        .where({ id });
}

// Get the list of values a user has selected as important to them
function findValuesByUserID(id) { 
    return db('values')
        .join('users_values', 'users_values.value_id', '=', 'values.id')
        .select('values.*')
        .where({ user_id: id });
};

// Save a value to a user's favorites
function addValueToProfile(valueInfo){
    return db('users_values')
    .insert(valueInfo, 'id');
}

// Update a preset value ( Not needed by client )
function update(value, id) { 
    return db('values')
        .where('id', Number(id))
        .update(value)
        .then(()=>{
            return getValueByID(id)
        });
};


// Functions for custom, user-typed values
// ======================================================================================

// See all the custom values all the users have entered themselves
function viewAllCustomValues(){
    return db('custom_values');
}


// Get the custom values one specific user has added by ID
function getCustomValuesByID(id) {   
    return db('custom_values')
    .where({user_id : id})
}

// Add a custom value 
function insertCustomValue(value){  
    return db('custom_values')
    .insert(value, 'id')
}

// Change a custom value
function updateCustomValue(value, id) { //Works but not likely to be used
    return db('custom_values')
        .where('id', Number(id))
        .update(value);
};

// Delete a custom value
function deleteCustomValue(id) {
    return db('custom_values')
    .where({ id })
    .del();
}

// Top 3 Values functions
// ======================================================================================

// Get the top 3 values by a user's ID
function getTop3ByID(id){
    return db('users')
    .where({id})
    .select('users.top3_values');
}

// Change the top 3 values for a user
function insertTop3(valuesString, id){
    return db('users')
    .where('id', Number(id))
    .select("top3_values")
    .update({top3_values:valuesString});  
}
// ======================================================================================


// Don't really want clients to be able to delete user accounts I reckon

// function remove(id) {  
//     return db('users')
//     .where({ id })
//     .del()
// }

// ======================================================================================

