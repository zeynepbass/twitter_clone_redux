import express from "express"
import { getPosts,CreatePost,Delete,Detay,duzenle, commentPost,likePost, goruntuPost} from "../controllers/post.js"

const router=express.Router()

router.get('/panel',getPosts);
router.post('/panel',CreatePost);
router.delete('/panel/:id',Delete);
router.get('/detay/:id',Detay);
router.put('/duzenle/:id',duzenle);
router.post('/detay/:id',commentPost);
router.put('/detay/:id/likeCount',likePost);
router.put('/detay/:id/goruntuCount',goruntuPost);
export default router;