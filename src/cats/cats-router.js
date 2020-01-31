const express = require('express');
const CatsService = require('./cats-service');

const catsRouter = express.Router;

catsRouter
  .route('/')
  .get((req, res) => {
    const allCats = CatsService.getCats();
    return res
      .json(allCats);
  })
  .delete((req, res, next) => {
    return res
      .status(200)
      .send(CatsService.deleteCat());
  });


// .delete(requireAuth, (req, res, next) => {
//   UsersService.deleteUser(
//     req.app.get('db'),
//     req.params.user_id
//   )
//     .then(numRowsAffected => {
//       res.status(204).end();
//     })
//     .catch(next);
// });

// deleteUser(knex, id) {
//   return knex('street_users')
//     .where({ id })
//     .delete();
// }

module.exports = catsRouter;