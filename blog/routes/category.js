const express = require('express');
const { PrismaClient } = require('@prisma/client');

const router = express.Router();
const prisma = new PrismaClient();

router.post('/', async (req, res) => {
    const { name } = req.body;

    try {
        if (!name) {
            return res.status(400).json({ error: 'Category name is required.' });
        }

        const newCategory = await prisma.category.create({
            data: { name },
        });

        res.status(201).json(newCategory);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

router.get('/', async (req, res) => {
    try {
        const categories = await prisma.category.findMany();
        res.status(200).json(categories);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

router.get('/:id', async (req, res) => {
    const { id } = req.params;

    try {
        const category = await prisma.category.findUnique({
            where: { id: parseInt(id, 10) },
        });

        if (!category) {
            return res.status(404).json({ error: 'Category not found.' });
        }

        res.status(200).json(category);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

router.put('/:id', async (req, res) => {
    const { id } = req.params;
    const { name } = req.body;

    try {
        if (!name) {
            return res.status(400).json({ error: 'Category name is required for update.' });
        }

        const updatedCategory = await prisma.category.update({
            where: { id: parseInt(id, 10) },
            data: { name },
        });

        res.status(200).json(updatedCategory);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

router.delete('/:id', async (req, res) => {
    const { id } = req.params;

    try {
        await prisma.category.delete({
            where: { id: parseInt(id, 10) },
        });

        res.status(200).json({ message: 'Category deleted successfully.' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;
