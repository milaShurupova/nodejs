import express from 'express';
import { Role } from "../enums";
import controller from '../controllers/school.controller';
import middleware from '../middleware/auth.middleware';
const router = express.Router();

router.get('/board-types', middleware.verifyToken([Role.Administrator]), controller.getBoardTypes);
router.get('/board-type/:id', middleware.verifyToken([Role.Administrator, Role.RegularUser]), controller.getBoardTypebyId);
router.put('/board-type/:id', middleware.verifyToken([Role.Administrator, Role.RegularUser]), controller.updateBoardTypeById);
router.get('/board-type-by-title/:title', middleware.verifyToken([Role.Administrator, Role.RegularUser]), controller.getBoardTypeByTitle);
router.post('/board-type', middleware.verifyToken([Role.Administrator, Role.RegularUser]), controller.addBoardType);
router.delete('/board-type/:id', middleware.verifyToken([Role.Administrator, Role.RegularUser]), controller.deleteBoardTypeById);


export default { router }