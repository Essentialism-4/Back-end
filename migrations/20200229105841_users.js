
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



    });

};

exports.down = function (knex) {
    return knex.schema.dropTableIfExists('users');
};
