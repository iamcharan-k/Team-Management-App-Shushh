const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const Member = require('../models/member');

// Configure multer for file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, './uploads/');
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  }
});

const upload = multer({ storage });

// GET all members
router.get('/', async (req, res) => {
  try {
    const members = await Member.find().sort({ createdAt: -1 });
    res.json(members);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// GET single member by ID
router.get('/:id', async (req, res) => {
  try {
    const member = await Member.findById(req.params.id);
    if (!member) {
      return res.status(404).json({ message: 'Member not found' });
    }
    res.json(member);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// POST a new member with image upload
router.post('/', upload.single('image'), async (req, res) => {
  try {
    const memberData = req.body;
    
    // Add image path if an image was uploaded
    if (req.file) {
      memberData.image = req.file.filename;
    }
    
    const newMember = new Member(memberData);
    const savedMember = await newMember.save();
    res.status(201).json(savedMember);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

router.put('/:id', upload.single('image'), async (req, res) => {
  try {
    // If there's a new image, update the image field
    const updatedData = req.body;
    if (req.file) {
      updatedData.image = req.file.filename; // Save the uploaded file's name
    }

    const member = await Member.findByIdAndUpdate(req.params.id, updatedData, { new: true });
    if (!member) return res.status(404).json({ message: 'Member not found' });

    res.json(member);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

// DELETE a member
router.delete('/:id', async (req, res) => {
  try {
    const member = await Member.findByIdAndDelete(req.params.id);
    if (!member) {
      return res.status(404).json({ message: 'Member not found' });
    }
    res.json({ message: 'Member deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;