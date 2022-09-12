import express from 'express';
import controller from '../controllers/school.controller';
const router = express.Router();

router.get('/general/board-types', controller.getBoardTypes);
router.get('/general/board-type/:id', controller.getBoardTypebyId);
router.put('/general/board-type/:id', controller.updateBoardTypeById);
// router.put('/general/board-type/:title', controller.getBoardTypebyTitle);


export default { router }