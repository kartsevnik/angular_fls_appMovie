import { Category } from "../models/category";
import { movie } from "../models/movie";

export const categoryList: Category[] = [
    { name: "Now playing", code: 'Now playing' },
    { name: "Popular", code: 'Popular' },
    { name: "Top rate", code: 'Top rate' },
    { name: "Upcoming", code: 'Upcoming' },
];

export const movies: movie[] = [
    {
        id: 1,
        title: "The Shawshank Redemption",
        year: 1994,
        duration: 142,
        imgPath: "assets/img-movies/The Shawshank Redemption.jpg",
        favorite: false,
        toWatch: false,
        rating: 9.3,
        description: "Two imprisoned men bond over a number of years, finding solace and eventual redemption through acts of common decency.",
        quality: "HD",
        genres: ["Drama", "Crime"],
        imgLargePath: "/assets/img-movies/The Shawshank Redemption.jpg"
    },
    {
        id: 2,
        title: "The Godfather",
        year: 1972,
        duration: 175,
        imgPath: "assets/img-movies/The Godfather.jpg",
        favorite: false,
        toWatch: false,
        rating: 9.2,
        description: "The aging patriarch of an organized crime dynasty transfers control of his clandestine empire to his reluctant son.",
        quality: "HD",
        genres: ["Crime", "Drama"]
    },
    {
        id: 3,
        title: "The Dark Knight",
        year: 2008,
        duration: 152,
        imgPath: "assets/img-movies/The Dark Knight.jpg",
        favorite: false,
        toWatch: false,
        rating: 9.0,
        description: "When the menace known as the Joker emerges from his mysterious past, he wreaks havoc and chaos on the people of Gotham.",
        quality: "HD",
        genres: ["Action", "Crime", "Drama"],
        imgLargePath: "assets/img-movies/The Dark Knight.jpg"
    },
    {
        id: 4,
        title: "Pulp Fiction",
        year: 1994,
        duration: 154,
        imgPath: "assets/img-movies/Pulp Fiction.jpg",
        favorite: false,
        toWatch: false,
        rating: 8.9,
        description: "The lives of two mob hitmen, a boxer, a gangster and his wife, and a pair of diner bandits intertwine in four tales of violence and redemption.",
        quality: "HD",
        genres: ["Crime", "Drama"]
    },
    {
        id: 5,
        title: "Schindler's List",
        year: 1993,
        duration: 195,
        imgPath: "assets/img-movies/Schindler's List.jpg",
        favorite: false,
        toWatch: false,
        rating: 8.9,
        description: "In German-occupied Poland during World War II, Oskar Schindler gradually becomes concerned for his Jewish workforce after witnessing their persecution by the Nazis.",
        quality: "HD",
        genres: ["Biography", "Drama", "History"]
    },
    {
        id: 6,
        title: "Fight Club",
        year: 1999,
        duration: 139,
        imgPath: "assets/img-movies/Fight Club.jpg",
        favorite: false,
        toWatch: false,
        rating: 8.8,
        description: "An insomniac office worker and a devil-may-care soap maker form an underground fight club that evolves into much more.",
        quality: "HD",
        genres: ["Drama"]
    },
    {
        id: 7,
        title: "Forrest Gump",
        year: 1994,
        duration: 142,
        imgPath: "assets/img-movies/Forrest Gump.jpg",
        favorite: false,
        toWatch: false,
        rating: 8.8,
        description: "The presidencies of Kennedy and Johnson, the events of Vietnam, Watergate, and other historical events unfold from the perspective of an Alabama man with an IQ of 75.",
        quality: "HD",
        genres: ["Drama", "Romance"]
    },
    {
        id: 8,
        title: "Inception",
        year: 2010,
        duration: 148,
        imgPath: "assets/img-movies/Inception.jpg",
        favorite: false,
        toWatch: false,
        rating: 8.8,
        description: "A thief who steals corporate secrets through the use of dream-sharing technology is given the inverse task of planting an idea into the mind of a C.E.O.",
        quality: "HD",
        genres: ["Action", "Adventure", "Sci-Fi"]
    },
    {
        id: 9,
        title: "The Matrix",
        year: 1999,
        duration: 136,
        imgPath: "assets/img-movies/The Matrix.jpg",
        favorite: false,
        toWatch: false,
        rating: 8.7,
        description: "A computer hacker learns from mysterious rebels about the true nature of his reality and his role in the war against its controllers.",
        quality: "HD",
        genres: ["Action", "Sci-Fi"]
    },
    {
        id: 10,
        title: "Goodfellas",
        year: 1990,
        duration: 146,
        imgPath: "assets/img-movies/Goodfellas.jpg",
        favorite: false,
        toWatch: false,
        rating: 8.7,
        description: "The story of Henry Hill and his life in the mob, covering his relationship with his wife Karen Hill and his mob partners.",
        quality: "HD",
        genres: ["Biography", "Crime", "Drama"]
    },
    {
        id: 11,
        title: "The Lord of the Rings: The Return of the King",
        year: 2003,
        duration: 201,
        imgPath: "assets/img-movies/The Lord of the Rings The Return of the King.jpg",
        favorite: false,
        toWatch: false,
        rating: 8.9,
        description: "Gandalf and Aragorn lead the World of Men against Sauron's army to draw his gaze from Frodo and Sam as they approach Mount Doom with the One Ring.",
        quality: "HD",
        genres: ["Action", "Adventure", "Drama"]
    },
    {
        id: 12,
        title: "Se7en",
        year: 1995,
        duration: 127,
        imgPath: "assets/img-movies/Se7en.jpg",
        favorite: false,
        toWatch: false,
        rating: 8.6,
        description: "Two detectives, a rookie and a veteran, hunt a serial killer who uses the seven deadly sins as his motives.",
        quality: "HD",
        genres: ["Crime", "Drama", "Mystery"]
    }
];

export const favoriteMovies: movie[] = [];
export const toWatchMovies: movie[] = [];
