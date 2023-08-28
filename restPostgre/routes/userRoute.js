const Router=require('express')
const userController = require('../controllers/userController')
const router=new Router()

router.get('/users', userController.getUsers)
router.get('/users/:id', userController.getUserById)
router.post('/users', userController.createUser)
router.put('/users/:id', userController.updateUser)
router.delete('/users/:id',userController.deleteUser)


module.exports = router