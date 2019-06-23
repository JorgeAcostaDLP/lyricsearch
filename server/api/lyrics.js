const router = require('express').Router();
const { Lyric } = require('../db/models');
const Sequelize = require('sequelize');
const Op = Sequelize.Op;

router.get('/:lyricFragment', async (req, res, next) => {
  let partialLyric = req.params.lyricFragment.slice(1).toLowerCase();

  try {
    const response = await Lyric.findAndCountAll({
      where: {
        lyrics: {
          [Op.like]: `%${partialLyric}%`,
          // [Op.like]: `%blame it on the sunshine%`,
        },
        // artist: 'Green Day',
      },
      attributes: ['name', 'artist', 'lyrics', 'link'],
    });
    res.json(response);
    console.log(response);
  } catch (error) {
    next(error);
  }
});

// router.get('/', (req, res) => {

module.exports = router;
