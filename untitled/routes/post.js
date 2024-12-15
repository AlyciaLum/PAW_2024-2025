const express = require('express');
const { PrismaClient } = require('@prisma/client');

const router = express.Router();
const prisma = new PrismaClient();

router.post('/', async (req, res) => {
    const { title, content, authorId, categoryId } = req.body;

    try {
        if (!title || !content || !authorId || !categoryId) {
            return res.status(400).json({ error: 'Missing required fields.' });
        }

        const newPost = await prisma.post.create({
            data: {
                title,
                content,
                authorId,
                categoryId,
            },
        });

        res.status(201).json(newPost);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

router.get('/', async (req, res) => {
    try {
        const allPosts = await prisma.post.findMany();
        res.status(200).json(allPosts);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

router.get('/:id', async (req, res) => {
    const { id } = req.params;

    try {
        const post = await prisma.post.findUnique({
            where: { id: parseInt(id, 10) },
        });

        if (!post) {
            return res.status(404).json({ error: 'Post not found.' });
        }

        res.status(200).json(post);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

router.put('/:id', async (req, res) => {
    const { id } = req.params;
    const { title, content, authorId, categoryId } = req.body;

    try {
        const updatedPost = await prisma.post.update({
            where: { id: parseInt(id, 10) },
            data: {
                title,
                content,
                authorId,
                categoryId,
            },
        });

        res.status(200).json(updatedPost);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

router.delete('/:id', async (req, res) => {
    const { id } = req.params;

    try {
        await prisma.post.delete({
            where: { id: parseInt(id, 10) },
        });

        res.status(200).json({ message: 'Post deleted successfully.' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;
