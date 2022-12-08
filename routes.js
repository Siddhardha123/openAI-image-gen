import {Router} from 'express'
import controller from './controller.js'
const router = Router()

router.post('/generateimage',controller.generateImage)

export default router