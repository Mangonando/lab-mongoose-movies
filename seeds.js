// const mongoose = require("mongoose");

// const Celebrity = require("./models/Celebrity");

// mongoose.connect("mongodb://localhost/celebrities", {
//   useNewUrlParser: true,
//   useUnifiedTopology: true,
// });

// const celebrities = [
//   {
//     name: "Elizabeth 'La neta' Hinojos",
//     occupation: "Lead singer at Los Tigres del Norte",
//     catchPhrase: "No mancheeeees",
//   },
//   {
//     name: "Alan Sanchez",
//     occupation: "Astronaut",
//     catchPhrase: "chicos, sha vengo voy a preparar un mate",
//   },
//   {
//     name: "Josue Prieto",
//     occupation: "Politician",
//     catchPhrase: "Saturno, saturno, saturno!!",
//   },
// ];

// Celebrity.insertMany(celebrities)
//   .then((celebrities) => {
//     console.log(
//       `Success! Added ${celebrities.length} celebrities to the database`
//     );
//     mongoose.connection.close();
//   })
//   .catch((err) => {
//     console.log(err);
//   });

  const Movie = require("./models/Movie");

mongoose.connect("mongodb://localhost/movies", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const movies = [
  {
    title: "Titanic",
    genre: "Drama",
    plot: "A ship sinks",
    // cast: cast
  },
  // {
  //   title: "Alan Sanchez",
  //   genre: "Astronaut",
  //   plot: "chicos, sha vengo voy a preparar un mate",
  //   // cast: cast
  // },
  // {
  //   title: "Josue Prieto",
  //   genre: "Politician",
  //   plot: "Saturno, saturno, saturno!!",
  //   // cast: cast
  // },
];

Movie.insertMany(movies)
  .then((movies) => {
    console.log(
      `Success! Added ${movies.length} movies to the database`
    );
    mongoose.connection.close();
  })
  .catch((err) => {
    console.log(err);
  });
