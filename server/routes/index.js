const resturantHandlers = require('../controllers').Handlers;
const loginHandler = require('../controllers').Login
const authHandler = require('../controllers').Auth
module.exports = (app) => {
  app.get('/api', (req, res) => res.status(200).send({
    message: 'Welcome to the Resturant Recommendations API!',
  }));

  app.post('/api/createRestrurant', authHandler.validateJwtToken, resturantHandlers.createRestrurant);
  app.get('/api/getAllResturantsList', authHandler.validateJwtToken, resturantHandlers.getAllResturantsList)
  app.get('/api/getAllDishes', authHandler.validateJwtToken, resturantHandlers.getAllDishes)
  app.get(`/api/getDishesofSingleResturant/:resturantId`, authHandler.validateJwtToken, resturantHandlers.getDishesofSingleResturant)
  app.get('/api/showOnlyAvaliableDishesList/:resturantId', authHandler.validateJwtToken, resturantHandlers.showOnlyAvaliableDishesList)
  app.post('/api/enterDishesOfAResturant', authHandler.validateJwtToken, resturantHandlers.enterDishesOfAResturant)
  app.put('/api/editADish', authHandler.validateJwtToken, resturantHandlers.editADish)
  app.delete('/api/`deleteResturant`', authHandler.validateJwtToken, resturantHandlers.deleteResturant)

  app.get('/api/getAllDishes', authHandler.validateJwtToken, resturantHandlers.getAllDishes)
  app.post('/api/registerUser', loginHandler.register)
  app.post('/api/login', loginHandler.login)
};





