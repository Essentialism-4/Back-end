//Schema for Users, Values, Saved values, Custom values, Top 3 values, Importance prompts, Involvement prompts



// UP
// ==================================================================================================================================================
exports.up = function (knex) {
    return knex.schema.createTable('users', tbl => { //Stores all users, usernames and passwords, along with their top picks and prompts
        
        tbl //Primary key 'id'
        .increments(); 

        tbl //Username
            .string('username', 64)
            .notNullable()
            .unique();

        tbl //Password
            .string('password', 64)
            .notNullable();

        tbl //Top 3 Values a user chooses
            .string('top3_values');


        tbl //Why are these values of importance to you? 
            .string('importance_prompt');

        tbl //What projects and activities are you currently involved in?
            .string('involvement_prompt');
    })
// ==================================================================================================================================================

        .createTable('values', tbl => { //Stores all of our predetermined values that users can choose from 
           
            tbl //Primary key 'id'
            .increments();

            tbl //Name of this value
            .string('name', 128);

        })
// ==================================================================================================================================================

        .createTable('custom_values', tbl => { //Stores any custom values users type in themselves. 
            
            tbl //Primary key 'id'
            .increments();

            tbl //Name of this custom value
            .string('name', 128)
            .notNullable();

            tbl //What user posted this custom value? 1:M relationship, references primary key in 'users' table
            .integer('user_id') 
            .unsigned()
            .notNullable()
            .references('id')
            .inTable('users')
            .onUpdate('CASCADE')
            .onDelete('CASCADE');

        })
// ==================================================================================================================================================

        .createTable('users_values', tbl => { //Linking table for the M:M relationship between default values and user profiles
            
            tbl //Primary key 'id'
            .increments();

            tbl //Foreign key references primary key in 'users' table
            .integer('user_id')
                .unsigned()
                .notNullable()
                .references('id')
                .inTable('users')
                .onUpdate('CASCADE')
                .onDelete('CASCADE');

            tbl //Foreign key references primary key in 'values' table
            .integer('value_id')
                .unsigned()
                .notNullable()
                .references('id')
                .inTable('values')
                .onUpdate('CASCADE')
                .onDelete('CASCADE');
        })

};


// DOWN
// ==================================================================================================================================================
exports.down = function (knex) {
    return knex.schema
        .dropTableIfExists('users_values')
        .dropTableIfExists('values')
        .dropTableIfExists('custom_values')
        .dropTableIfExists('users');
};
// ==================================================================================================================================================
