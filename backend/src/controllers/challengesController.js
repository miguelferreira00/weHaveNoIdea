import { getRandomTemplate } from '../models/challengesModel.js';

export async function getRandomChallengeTemplate(req, res) {
    try {
        const template = await getRandomTemplate();
        if (!template) {
            return res.status(404).json({ message: 'No challenge templates found' });
        }
        return res.status(200).json(template);
    } catch (error) {
        console.error('Error fetching random challenge template:', error);
        return res.status(500).json({ message: 'Internal server error' });
    }
}