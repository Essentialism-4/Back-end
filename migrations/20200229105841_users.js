
exports.up = function (knex) {
    return knex.schema.createTable('users', tbl => {
        tbl.increments();

        tbl
            .string('username', 64)
            .notNullable()
            .unique();

        tbl
            .string('password', 64)
            .notNullable();

        tbl //Values
            .specificType('values_array', 'text ARRAY')

        tbl //Top 3 Values
            .specificType('top3_array', 'text ARRAY')



    })

    .createTable('values', tbl =>{
        tbl.increments();

        tbl.string('name', 128)
        .unique()

        // tbl.integer('user_id')
        // .unsigned()
        // .references('id')
        // .inTable('users')
        // .onUpdate('CASCADE')
        // .onDelete('CASCADE');

    })

    .createTable('users_values', tbl =>{
        tbl.increments();

        tbl.integer('user_id')
        .unsigned()
        .notNullable()
        .references('id')
        .inTable('users')
        .onUpdate('CASCADE')
        .onDelete('CASCADE');

        tbl.integer('value_id')
        .unsigned()
        .notNullable()
        .references('id')
        .inTable('values')
        .onUpdate('CASCADE')
        .onDelete('CASCADE');
    })

};

exports.down = function (knex) {
    return knex.schema.dropTableIfExists('users_values')
    .dropTableIfExists('values')
    .dropTableIfExists('users');
};
