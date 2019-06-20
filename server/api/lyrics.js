const router = require('express').Router();
const { Lyric } = require('../db/models');
const Sequelize = require('sequelize');
const Op = Sequelize.Op;

router.get('/', async (req, res, next) => {
  let partialLyric = req.partialLyric;

  try {
    const lyrics = await Lyric.findAndCountAll({
      where: {
        lyrics: {
          [Op.like]: `%${partialLyric}%`,
        },
      },
      attributes: ['lyrics', 'name', 'artist'],
    });
    res.json(lyrics);
  } catch (error) {
    next(error);
  }
});

// router.get('/', (req, res) => {
//   res.send('Hello');
// });
module.exports = router;
