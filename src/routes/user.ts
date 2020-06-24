import * as express from 'express'
const UserController = require('../modules/users/users.controller')

var router = express.Router()

router.get("/:id", UserController.getUserInformation)


module.exports = router