const express = require('express');
const Task = require('../models/task');
const router = express.Router();

// POST /createTasks - Create a new task
router.post('/createTask', async (req, res) => {
    const { title, description, priority, status, userAssociated } = req.body;
    try {
        const newTask = await Task.create({ title, description, priority, status, userAssociated });
        res.status(201).send(newTask);
    } catch (error) {
        // Send error message to frontend
        res.status(400).send({ message: error.message });
    }
});

// GET /username - Get all tasks for a user
router.get('/:username', async (req, res) => {
    try {
        const tasks = await Task.find({ userAssociated: req.params.username });
        res.send(tasks);
    } catch (error) {
        // Send error message to frontend
        res.status(500).send({ message: error.message });
    }
});

// PUT /update/:id - Update a task
router.put('/update/:id', async (req, res) => {
    const updates = req.body;
    const options = { new: true, runValidators: true };  // To return the updated document and run schema validators
    try {
        const updatedTask = await Task.findByIdAndUpdate(req.params.id, updates, options);

        if (!updatedTask) {
            return res.status(404).send({ message: 'Task not found.' });
        }

        res.send(updatedTask);  // Send the updated document back to the client
    } catch (error) {
        // Send error message to frontend
        res.status(400).send({ message: error.message });
    }
});


// DELETE /delete/:id - Delete a task
router.delete('/delete/:id', async (req, res) => {
    try {
        const task = await Task.findByIdAndDelete(req.params.id);
        if (!task) {
            return res.status(404).send({ message: 'Task not found.' });
        }
        res.send(task);
    } catch (error) {
        // Send error message to frontend
        res.status(500).send({ message: error.message });
    }
});

module.exports = router;
