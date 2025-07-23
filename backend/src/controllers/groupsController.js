import { create, delete_group, findById, findByOwner, addMember, removeMember } from '../models/groupsModel.js';


export async function createGroup(req, res) {
    // Add validation for req.body
    if (!req.body) {
        return res.status(400).json({ message: 'Request body is missing' });
    }

    const { name, description } = req.body;
    const ownerId = req.user.id; // Assuming req.user is set by authentication middleware

}