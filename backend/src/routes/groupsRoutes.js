import { Router } from 'express';
import { authenticateToken } from '../middleware/auth.js';
const router = Router();
import { createGroup, getAllGroups, joinGroup, deleteGroupById, leaveGroup } from '../controllers/groupsController.js';

router.use(authenticateToken);

router.post('/create', createGroup);
router.get('/getAllGroups', getAllGroups);
router.post('/joinGroup', joinGroup);
// router.post('/deleteGroup', deleteGroupById);
router.post('/leaveGroup', leaveGroup);


export default router;
