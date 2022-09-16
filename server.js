/*********************************************************************************
 * WEB422 – Assignment 1
 * I declare that this assignment is my own work in accordance with Seneca Academic Policy. 
 * No part of this assignment has been copied manually or electronically from any other source
 * (including web sites) or distributed to other students.
 * 
 * Name: Bhavikkumar Hemantbhai Mistry Student ID: 128788213 Date: 16/09/2022
 * Cyclic Link: _______________________________________________________________
 *
 ********************************************************************************/

const express = require("express");
const app = express();
const cors = require("cors");
const dotenv = require("dotenv").config();
const MoviesDB = require("./modules/moviesDB.js");
const db = new MoviesDB();

var HTTP_PORT = process.env.PORT || 8080;

app.use(express.json());
app.use(cors());


app.get("/", function(req, res) {
    res.json({ message: "API Listening" });
});


app.post("/api/movies", function(req, res) {
    db.addNewMovie(req.body)
        .then((movie) => {
            res.json(movie);
        })
        .catch(function(err) {
            res.status(500).send("Unable to add new movie");
        });
});

app.get("/api/movies/:id", function(req, res) {
    db.getMovieById(req.params.id)
        .then((movie) => {
            res.json(movie);
        })
        .catch(function(err) {
            res.json({ message: "No movies found" });
        });
});


app.get("/api/movies", function(req, res) {
    db.getAllMovies(req.query.page, req.query.perPage, req.query.title)
        .then((movie) => {
            res.json(movie);
        })
        .catch(function(err) {
            res.json({ message: "No movies found" });
        });
});

app.put("/api/movies:id", function(req, res) {
    db.updateMovieById(req.params.id)
        .then((movie) => {
            res.json(movie);
        })
        .catch(function(err) {
            res.status(500).send("Unable to update movie");
        });
});

app.delete("/api/movies/:id", function(req, res) {
    db.deleteMovieById(req.params.id)
        .then(() => {
            res.send("Movie deleted successfully");
        })
        .catch(function(err) {
            res.status(500).send("Unable to Remove movie");
        });
});

db.initialize(process.env.MONGODB_CONN_STRING).then(() => {
    app.listen(HTTP_PORT, () => {
        console.log(`server listening on: ${HTTP_PORT}`);
    });
}).catch((err) => {
    console.log(err);
});