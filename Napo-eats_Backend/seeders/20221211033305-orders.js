'use strict'

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    return queryInterface.bulkInsert(
      'orders',
      [
        {
          customerId: 1,
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          customerId: 2,
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          customerId: 3,
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          customerId: 4,
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          customerId: 5,
          createdAt: new Date(),
          updatedAt: new Date()
        }
      ],
      {}
    )
  },

  async down(queryInterface, Sequelize) {
    return queryInterface.bulkDelete('orders', null, {})
  }
}

// 'use strict'
// const falso = require('@ngneat/falso')

// /** @type {import('sequelize-cli').Migration} */
// module.exports = {
//   up: async (queryInterface, Sequelize) => {
//     const orders = [...Array(5)].map(() => ({
//       customerId: falso.randNumber({ min: 1, max: 5 }),
//       createdAt: falso.randPastDate(),
//       updatedAt: falso.randRecentDate()
//     }))
//     await queryInterface.bulkInsert('orders', orders)
//   },

//   down: async (queryInterface, Sequelize) => {
//     await queryInterface.bulkDelete('orders')
//   }
// }

//20221209143958
//20221211033305
