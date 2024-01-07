import express from 'express';
import * as controller from '../controllers/controller.js'

const router = express.Router();

router.get('/programmers', controller.prog_get);
router.post('/programmers', controller.prog_post);
router.get('/programmers/:id', controller.prog_details_get);
router.put('/programmers/:id', controller.prog_put);
router.delete('/programmers/:id', controller.prog_delete);

export default router;
