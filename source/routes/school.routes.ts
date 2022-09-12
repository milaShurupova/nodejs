import express from 'express';
import controller from '../controllers/school.controller';
const router = express.Router();

router.get('/general/board-types', controller.getBoardTypes);
router.get('/general/board-type/:id', controller.getBoardTypebyId);
router.put('/general/board-type/:id', controller.updateBoardTypeById);
router.get('/general/board-type-by-title/:title', controller.getBoardTypeByTitle);
router.post('/general/board-type', controller.addBoardType);
router.delete('/general/board-type/:id', controller.deleteBoardTypeById);


export default { router }