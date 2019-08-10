
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('cars').truncate()
    .then(function () {
      // Inserts seed entries
      return knex('cars').insert([
        {
          VIN: 'WE65F1A56EF165AD5',
          make: 'Toyota',
          model: 'Matrix',
          mileage: 121521
        },
        {
          VIN: 'A5W6FE11FAW516EF6',
          make: 'Kia',
          model: 'Optima',
          mileage: 43286
        },
        {
          VIN: 'F56EFW5HH1H65RH65',
          make: 'Dodge',
          model: 'Ram',
          mileage: 116431
        }
      ]);
    });
};
