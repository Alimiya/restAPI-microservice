const express = require('express')
const router = express.Router()
const Controller = require('../controllers/userController')

router.get('/users', Controller.getAllUsers)
router.get('/users/:id', Controller.getUserById)
router.post('/users', Controller.createUser)
router.put('/users/:id', Controller.updateUserById)
router.delete('/users/:id', Controller.deleteUserById)

module.exports = router