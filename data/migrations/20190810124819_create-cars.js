
exports.up = function(knex) {
    return knex.schema.createTable('cars', table => {
        table.increments();
        table.text('VIN', 17).unique().notNullable();
        table.text('make').notNullable();
        table.text('model').notNullable();
        table.integer('mileage').notNullable();
        table.text('transmission');
        table.text('title_status');
    });
};

exports.down = function(knex) {
    return knex.schema.dropTableIfExists('cars');
};
