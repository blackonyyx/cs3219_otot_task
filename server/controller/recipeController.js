// import * as db from '../model/db.js'
// import CategoryTest from '../model/categoryModel.js'
// /**
//  * Get /
//  * Homepage
//  */

// export default async function homepage (req, res) {
//   try {
//     const limit = 5
//     const categories = await CategoryTest.find({}).limit(limit)
//     res.render('index', { title: 'Homepage', category: categories })
//   } catch (error) {
//     res.status(500).send({ message: error.message || ' Error Occurred!' })
//   }
// }

// async function insertDummyCatData() {
//   try {
//     await CategoryTest.insertMany([
//       {
//         name: "Thai",
//         image: "thai-food.jpg",
//       },
//       {
//         name: "American",
//         image: "american-food.jpg",
//       },
//       {
//         name: "Chinese",
//         image: "chinese-food.jpg",
//       },
//       {
//         name: "Mexican",
//         image: "mexican-food.jpg",
//       },
//       {
//         name: "Indian",
//         image: "indian-food.jpg",
//       },
//       {
//         name: "Spanish",
//         image: "spanish-food.jpg",
//       },
//     ]);
//   } catch (error) {
//     console.log("err: ", +error);
//   }
// }
