'use strict'

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    return queryInterface.bulkInsert(
      'items',
      [
        {
          name: 'Beef Brisket - 1 Pount',
          price: 28.0,
          description:
            'Texas style sliced USDA Prime Beef Brisket.  Your choice of Moist, Lean or Mixed',
          image: 'https://i.imgur.com/VFURCte.jpg',
          restaurantId: 1,
          orderId: 1,
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          name: 'Pork Sandwich',
          price: 9.5,
          description:
            'Chopped pork, tossed in our Eastern NC vinegar sauce.  Served on a bun w/ slaw',
          image: 'https://i.imgur.com/4ZwCnhW.jpg',
          restaurantId: 1,
          orderId: 1,
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          name: 'Pecan Cobbler',
          price: 6.5,
          description:
            'Just like classic pecan pie except thicker and better, w/ a dollop of whipped cream',
          image: 'https://i.imgur.com/oJUfg7g.jpg',
          restaurantId: 1,
          orderId: 1,
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          name: 'Classic Buttery Jack Combo',
          price: 9.38,
          image: 'https://i.imgur.com/ewRtxpk.png',
          description:
            'Melted garlic herb butter on 100% beef seasoned as it grills with Swiss cheese, lettuce, tomato, ketchup & mayo on signature brioche, with fries & a drink',
          restaurantId: 2,
          orderId: 2,
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          name: 'Jacks Spicy Chicken w/ Cheese Combo',
          price: 10.28,
          image: 'https://i.imgur.com/nnZe5z5.png',
          description:
            '100% all white meat spicy crispy chicken fillet with melty Swiss style cheese, tomato, lettuce & mayo on a toasted buttery bakery bun, plus fries & drink.',
          restaurantId: 2,
          orderId: 2,
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          name: 'Tiny Tacos',
          price: 3.79,
          image: 'https://i.imgur.com/3amm2EP.png',
          description:
            '13 crunchy, bite-size Tiny Tacos with a side of creamy avocado lime sauce. They are like little love letters to your mouth.',
          restaurantId: 2,
          orderId: 2,
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          name: 'Tacos de Carne Asada Plate',
          price: 10.95,
          image: 'https://i.imgur.com/fJPbm9j.jpg',
          description:
            'Marinated steak diced and served on corn tortillas with onion, cilantro & fresh squeezed lime. Includes a side of rice and beans.',
          restaurantId: 3,
          orderId: 3,
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          name: 'Tacos de Birria',
          price: 14.0,
          image: 'https://i.imgur.com/oIrjOHM.jpg',
          description:
            'Thin cut steak mixed with onion, bell pepper, bacon and melted cheese. Includes a side of rice, beans and tortillas.',
          restaurantId: 3,
          orderId: 3,
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          name: 'Chimichanga Plate',
          price: 12.95,
          image: 'https://i.imgur.com/uaO5PNr.jpg',
          description:
            'Deep fried and rolled tortilla with your choice of meat, cheese, rice & refried beans. Topped with queso, sliced avocado, lettuce, tomato, onion, queso fresco and sour cream. Served with side of rice and beans.',
          restaurantId: 3,
          orderId: 3,
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          name: 'Caffè Americano',
          price: 2.5,
          image: 'https://i.imgur.com/RGg1dRM.jpg',
          description:
            'Espresso shots topped with hot water create a light layer of crema culminating in this wonderfully rich cup with depth and nuance.',
          restaurantId: 4,
          orderId: 4,
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          name: 'Cappuccino',
          price: 2.39,
          image: 'https://i.imgur.com/Gs8sDk1.jpg',
          description:
            'Dark, rich espresso lies in wait under a smoothed and stretched layer of thick milk foam. An alchemy of barista artistry and craft.',
          restaurantId: 4,
          orderId: 4,
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          name: 'Pumpkin Spice Latte',
          price: 3.5,
          image: 'https://i.imgur.com/H0qA11r.jpg',
          description:
            'Our signature espresso and steamed milk with the celebrated flavor combination of pumpkin, cinnamon, nutmeg and clove. Enjoy it topped with whipped cream and real pumpkin-pie spices.',
          restaurantId: 4,
          orderId: 4,
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          name: 'Foot Long Dog',
          price: 1.99,
          image: 'https://i.imgur.com/bibymaJ.jpg',
          description: 'Bun and Hot Dog',
          restaurantId: 5,
          orderId: 5,
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          name: 'Cook Out Style Burger',
          price: 1.89,
          image: 'https://i.imgur.com/UJIWmFm.jpg',
          description: 'Homemade chili, slaw, mustard, and onions.',
          restaurantId: 5,
          orderId: 5,
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          name: 'Hersheys Chocolate Milkshake',
          price: 2.79,
          image: 'https://i.imgur.com/k3cJGHB.jpg',
          description: 'Creamy delicious milkshake.',
          restaurantId: 5,
          orderId: 5,
          createdAt: new Date(),
          updatedAt: new Date()
        }
        // {
        //   name: '6 Wings & Fries',
        //   price: 10.95,
        //   image: 'https://i.imgur.com/aCnzAin.jpg',
        //   description: 'Wings and fries',
        //   restaurantId: 6,
        //   orderId: 6,
        //   createdAt: new Date(),
        //   updatedAt: new Date()
        // },
        // {
        //   name: 'Shrimp Po Boy',
        //   price: 7.85,
        //   image: 'https://i.imgur.com/MZf8AUm.jpg',
        //   description: 'Shrimp Po Boy',
        //   restaurantId: 6,
        //   orderId: 6,
        //   createdAt: new Date(),
        //   updatedAt: new Date()
        // },
        // {
        //   name: '100 Wings & Fries',
        //   price: 105.99,
        //   image: 'https://i.imgur.com/aCnzAin.jpg',
        //   description: 'All the wings you need.',
        //   restaurantId: 6,
        //   orderId: 6,
        //   createdAt: new Date(),
        //   updatedAt: new Date()
        // }
      ],
      {}
    )
  },

  async down(queryInterface, Sequelize) {
    return queryInterface.bulkDelete('items', null, {})
  }
}

// 'use strict'
// const falso = require('@ngneat/falso')

// /** @type {import('sequelize-cli').Migration} */
// module.exports = {
//   up: async (queryInterface, Sequelize) => {
//     const items = [...Array(5)].map(() => ({
//       name: falso.randFood(),
//       description: falso.randProductDescription(),
//       image: falso.randImg(),
//       price: falso.randNumber(),
//       orderId: falso.randNumber({ min: 1, max: 5 }),
//       restaurantId: falso.randNumber({ min: 1, max: 5 }),
//       createdAt: falso.randPastDate(),
//       updatedAt: falso.randRecentDate()
//     }))
//     await queryInterface.bulkInsert('items', items)
//   },

//   down: async (queryInterface, Sequelize) => {
//     await queryInterface.bulkDelete('items')
//   }
// }

//20221209025740
//20221211185501
