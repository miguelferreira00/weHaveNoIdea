import { create, getGroups, addMember, deleteGroup, removeMember } from '../models/groupsModel.js';


export async function createGroup(req, res) {
    // Add validation for req.body
    if (!req.body) {
        return res.status(400).json({ message: 'Request body is missing' });
    }

    const { name, description, groupNickname } = req.body;
    const ownerId = req.user.id; // Assuming req.user is set by authentication middleware

    if (!ownerId) {
        return res.status(400).json({ message: 'Owner ID is required (middleware not working properly)' });
    }

    // Add validation for required fields
    if (!name || !description || !groupNickname) {
        return res.status(400).json({
            message: 'name, description and groupNickname are required'
        });
    }

    try {
        const group = await create({ name, description, ownerId });

        await addMember(group.id, ownerId, groupNickname);
        return res.status(201).json(group);
    }
    catch (error) {
        console.error('Error creating group:', error);
        return res.status(500).json({ message: 'Internal server error' });
    }
}


export async function deleteGroupById(req, res) {
    try {
        const groupId = req.params.id;
        const deletedGroup = await deleteGroup(groupId);

        if (!deletedGroup) {
            return res.status(404).json({ message: 'Group not found' });
        }

        return res.status(200).json(deletedGroup);
    }
    catch (error) {
        console.error('Error deleting group:', error);
        return res.status(500).json({ message: 'Internal server error' });
    }
}

export async function joinGroup(req, res) {
    // Add validation for req.body
    if (!req.body) {
        return res.status(400).json({ message: 'Request body is missing' });
    }

    const { groupId, groupNickname } = req.body;
    const userId = req.user.id; // Assuming req.user is set by authentication middleware

    if (!groupId || !groupNickname) {
        return res.status(400).json({ message: 'groupId and groupNickname are required' });
    }

    if (!userId) {
        return res.status(400).json({ message: 'User ID is required (middleware not working properly)' });
    }

    try {
        const group = await addMember(groupId, userId, groupNickname);
        return res.status(201).json({ message: 'Successfully joined group', group });
    }
    catch (error) {
        console.error('Error joining group:', error);
        return res.status(500).json({ message: 'Internal server error' });
    }
}

export async function getAllGroups(req, res) {
    try {
        const groups = await getGroups(10, 0);
        return res.status(200).json(groups);
    } catch (error) {
        console.error('Error fetching groups:', error);
        return res.status(500).json({ message: 'Internal server error' });
    }
}

export async function leaveGroup(req, res) {
    // Add validation for req.body
    if (!req.body) {
        return res.status(400).json({ message: 'Request body is missing' });
    }

    const { groupId } = req.body;
    const userId = req.user.id; // Assuming req.user is set by authentication middleware

    if (!groupId) {
        return res.status(400).json({ message: 'groupId is required' });
    }

    if (!userId) {
        return res.status(400).json({ message: 'User ID is required (middleware not working properly)' });
    }

    try {
        const group = await removeMember(groupId, userId);
        return res.status(200).json({ message: 'Successfully left group', group });
    }
    catch (error) {
        console.error('Error leaving group:', error);
        return res.status(500).json({ message: 'Internal server error' });
    }
}
