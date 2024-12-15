const express = require('express');
const { PrismaClient } = require('@prisma/client');

const router = express.Router();
const prisma = new PrismaClient();

router.post('/', async (req, res) => {
    const { name, content, postId } = req.body;

    try {
        if (!name || !content || !postId) {
            return res.status(400).json({ error: 'All fields are required.' });
        }

        const newComment = await prisma.comment.create({
            data: {
                name,
                content,
                postId,
            },
        });

        res.status(201).json(newComment);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

router.get('/', async (req, res) => {
    try {
        const comments = await prisma.comment.findMany();
        res.status(200).json(comments);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

router.get('/:id', async (req, res) => {
    const { id } = req.params;

    try {
        const comment = await prisma.comment.findUnique({
            where: { id: parseInt(id, 10) },
        });

        if (!comment) {
            return res.status(404).json({ error: 'Comment not found.' });
        }

        res.status(200).json(comment);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

router.put('/:id', async (req, res) => {
    const { id } = req.params;
    const { name, content, postId } = req.body;

    try {
        if (!name || !content || !postId) {
            return res.status(400).json({ error: 'All fields are required for updating.' });
        }

        const updatedComment = await prisma.comment.update({
            where: { id: parseInt(id, 10) },
            data: {
                name,
                content,
                postId,
            },
        });

        res.status(200).json(updatedComment);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

router.delete('/:id', async (req, res) => {
    const { id } = req.params;

    try {
        await prisma.comment.delete({
            where: { id: parseInt(id, 10) },
        });

        res.status(200).json({ message: 'Comment deleted successfully.' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;
