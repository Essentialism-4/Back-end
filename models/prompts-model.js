//Importing db config for use
// ======================================================================================
const db = require('../config/db-config.js');
// ======================================================================================



// Helper functions to be exported
// ======================================================================================
module.exports = {
    updateImportancePrompt,
    updateInvolvementPrompt
}
// ======================================================================================


// Update why certain values are important to a user
// ======================================================================================
function updateImportancePrompt(prompt, id){
    return db('users')
    .where('id', Number(id))
    .select("importance_prompt")
    .update({importance_prompt : prompt});
}
// ======================================================================================


// Update what the user is currently involved in
// ======================================================================================
function updateInvolvementPrompt(prompt, id){
    return db('users')
    .where('id', Number(id))
    .select("involvement_prompt")
    .update({involvement_prompt : prompt});
}
// ======================================================================================



// NOTE: 

// Only used PUT's here since when an account is created there is a null Importance and Value prompt by default. 
// Any change, addition or deletion can be done through PUT.