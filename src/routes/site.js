const express = require('express')
const router = express.Router()

const {
   show,
} = require('../controller/siteController')

router.get('/', show)

module.exports = router