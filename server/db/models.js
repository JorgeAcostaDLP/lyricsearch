const Sequelize = require('sequelize');

const db = new Sequelize('postgres://localhost:5432/lyricsearch', {
  logging: false,
});

const Lyric = db.define('lyric', {
  name: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  artist: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  link: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  lyrics: {
    type: Sequelize.TEXT,
    allowNull: false,
  },
});

// const User = db.define("user", {
//   name: {
//     type: Sequelize.STRING,
//     allowNull: false
//   },
//   email: {
//     type: Sequelize.STRING,
//     isEmail: true,
//     allowNull: false
//   }
// });

module.exports = {
  db,
  Lyric,
  // User
};
