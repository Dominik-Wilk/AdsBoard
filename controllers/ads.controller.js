const User = require('../models/User.model');
const Ad = require('../models/Ad.model');
const getImageFileType = require('../utils/getImageFileType');
const fs = require('fs');
const util = require('util');
const unlinkAsync = util.promisify(fs.unlink);

exports.getAll = async (req, res) => {
  try {
    const ads = await Ad.find().populate('user');
    res.json(ads);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getAdById = async (req, res) => {
  try {
    const ad = await Ad.findById(req.params.id).populate('user');
    if (!ad) {
      res.status(404).json({ message: 'Ad Not Found' });
    } else res.json(ad);
  } catch (err) {
    res.status(500).json({ message: err });
  }
};

exports.addNewAd = async (req, res) => {
  try {
    const { title, content, date, price, location, user } = req.body;
    const fileType = req.file ? await getImageFileType(req.file) : 'unknown';

    if (
      title &&
      content &&
      date &&
      price &&
      location &&
      user &&
      req.file &&
      ['image/png', 'image/jpeg', 'image/jpg', 'image/gif'].includes(fileType)
    ) {
      const userFromDB = await User.findOne({ login: user });

      const newAd = await Ad.create({
        title,
        content,
        date,
        image: req.file.filename,
        price,
        location,
        user: userFromDB._id,
      });
      res.json(newAd);
    } else {
      if (req.file) {
        unlinkAsync(req.file.path);
        res.status(400).send({ message: 'Bad request' });
      }
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.deleteAd = async (req, res) => {
  try {
    const ad = await Ad.findById(req.params.id);
    if (!ad) {
      res.status(404).json({ message: 'Ad Not Found' });
    } else {
      await Ad.deleteOne({ _id: req.params.id });
      res.json({ message: 'Ad deleted successfully' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.editAd = async (req, res) => {
  try {
    const adToEdit = await Ad.findById(req.params.id);
    if (!adToEdit) {
      res.status(404).json({ message: 'Ad not found' });
    } else {
      const { title, content, date, image, price, location, user } = req.body;
      let newImage = req.file ? req.file.filename : undefined;

      if (newImage) {
        const editedAd = await Ad.updateOne(
          { _id: req.params.id },
          {
            $set: {
              title: title,
              content: content,
              date: date,
              image: newImage,
              price: price,
              location: location,
              user: user,
            },
          }
        );

        if (adToEdit.image) {
          await fs.unlink(`./public/uploads/${adToEdit.image}`);
        }

        res.json(editedAd);
      } else {
        const editedAd = await Ad.updateOne(
          { _id: req.params.id },
          {
            $set: {
              title: title,
              content: content,
              date: date,
              price: price,
              location: location,
              user: user,
            },
          }
        );

        res.json(editedAd);
      }
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.search = async (req, res) => {
  try {
    const ads = await Ad.find({
      title: new RegExp(req.params.searchPhrase, 'i'),
    });
    res.json(ads);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
