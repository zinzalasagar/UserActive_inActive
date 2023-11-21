
const Post = require('../models/PostModel');

const { validationResult } = require('express-validator');

const jwt = require('jsonwebtoken');

const SECRET_KEY = "node";


module.exports.CreatePost = async (req, res) => {

  const { title,body, active ,createdBy,latitude, longitude  } = req.body;
  if (!req.body.title) {
    res.status(401).send({ success: false, status: 0, message: "title can not be empty!" });
    return;
  }

  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  try {

    const authData = await jwt.verify(req.token, SECRET_KEY);
    
    let Data = await Post.findOne({
      userId: authData.id,
    })
    if (Data) {
      const updateData = await Post.findByIdAndUpdate(Data._id, { active: !Data.active });
      if (updateData) {
          return res.status(200).json({ success: true, message: Data.active ? "User Inactive post" : "User Active ", status: 1 });

      } else {
          return res.status(404).json({ success: false, message: "Data not updated", status: 0 });
      }
  } 
   
  if (!Data) {
    const activeData = new Post({
        title: title, 
        body: body,
        createdBy: authData.id,
        active: true,
        latitude, 
        longitude
       });
    await activeData.save();
    res.status(201).json(activeData);
    if (!activeData) {
        return res.status(404).json({ success: false, status: 0, message: "Data not inserted" });
    }
    if (activeData) {

        return res.status(200).json({ success: true, status: 1, message: "Data Inserted", data: activeData });
    }
}
  } catch (error) {
    res.status(500).json({ error: error.message },"error");
  }
};

module.exports.getActiveUsersCount = async (req, res) => {
  try {
    const count = await Post.countDocuments({ active: true });
    res.json({ activeUsersCount: count });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports.getInactiveUsersCount = async (req, res) => {
  try {
    const count = await Post.countDocuments({ active: false });
    res.json({ inactiveUsersCount: count });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports.getPostsByLocation = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    const { latitude, longitude, radius } = req.query;

    const maxDistance = radius || 10;

    const posts = await Post.find({
      location: {
        $near: {
          $geometry: {
            type: 'Point',
            coordinates: [parseFloat(longitude), parseFloat(latitude)],
          },
          $maxDistance: maxDistance * 1000, // Convert to meters
        },
      },
    });

    if (!posts) {
      return res.status(404).json({ success: false, status: 0, message: "Location Not Found" });
  }
  if (posts) {

      return res.status(200).json({ success: true, status: 1, message: "Location Found Successfully", data: posts });
  }  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};



module.exports.GetAllPost = async (req, res) => {
  try {
    const users = await Post.find();
    res.json(users);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};




