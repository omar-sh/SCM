const {Router} = require('express');
const {UserController, ProductController, OrderController, UserMorphController} = require('../controllers');
const router = Router();

router.post('/user', UserController.create);
router.put('/user/:id', UserController.update);
router.delete('/user/:id', UserController.delete);

router.post('/order/user.append', UserMorphController.appendOrderToUser);
router.delete('/order/user.remove', UserMorphController.deleteUserFromOrder);

router.post('/product/user.append', UserMorphController.appendProductToUser);
router.delete('/product/user.remove', UserMorphController.deleteProductFromUser);

router.get('/product', ProductController.index);
router.post('/product', ProductController.create);
router.put('/product/:id', ProductController.update);
router.delete('/product/:id', ProductController.delete);




router.get('/order', OrderController.index);
router.post('/order', OrderController.create);
router.put('/order/:id', OrderController.update);
router.delete('/order/:id', OrderController.delete);




module.exports = router;