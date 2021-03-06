import express from 'express'
import userCtrl from '../controllers/user.controller'
import authCtrl from '../controllers/auth.controller'
import mediaCtrl from '../controllers/media.controller'

const router = express.Router()

router.route('/api/media/new/:userId')
    .post(authCtrl.requireSignin, mediaCtrl.create)

router.route('/api/media/song/:mediaId')
    .get(mediaCtrl.music)

router.route('/api/media/popular')
    .get(mediaCtrl.listPopular)

router.route('/api/media/related/:mediaId')
    .get(mediaCtrl.listRelated)

router.route('/api/media/by/:userId')
    .get(mediaCtrl.listByUser)

router.route('/api/media/:mediaId')
    .get(mediaCtrl.read)
    .delete(authCtrl.requireSignin, mediaCtrl.remove)
    .put(authCtrl.requireSignin, mediaCtrl.update)
    
router.param('userId', userCtrl.userByID)
router.param('mediaId', mediaCtrl.mediaByID)

export default router