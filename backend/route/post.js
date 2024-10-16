const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');


const postCtrl=require('../controllers/post');


router.get('/',auth ,postCtrl.getAllPosts);

router.post('/post' ,auth , postCtrl.createPost);

router.get('/:userId',auth ,postCtrl.findAllPostUser);

router.delete('/:id',auth, postCtrl.deletePost );

router.put('/:id' ,auth, postCtrl.updatePost );

//router.post('/:id/like', auth, postCtrl.likePost);

module.exports = router;