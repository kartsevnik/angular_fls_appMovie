import { Category } from "../models/category";
import { movie } from "../models/movie";

export const categoryList: Category[] = [
    { name: "Now playing", code: 'Now playing' },
    { name: "Popular", code: 'Popular' },
    { name: "Top rate", code: 'Top rate' },
    { name: "Upcoming", code: 'Upcoming' },
]

export const movies: movie[] = [
    new movie(1, "The Shawshank Redemption", 1994, 142, "assets/img-movies/The Shawshank Redemption.jpg", false, false, 9.3, "Two imprisoned men bond over a number of years, finding solace and eventual redemption through acts of common decency.", "HD", ["Drama", "Crime"], "/assets/img-movies/The Shawshank Redemption.jpg",),
    new movie(2, "The Godfather", 1972, 175, "assets/img-movies/The Godfather.jpg", false, false, 9.2, "The aging patriarch of an organized crime dynasty transfers control of his clandestine empire to his reluctant son.", "HD", ["Crime", "Drama"]),
    new movie(3, "The Dark Knight", 2008, 152, "assets/img-movies/The Dark Knight.jpg", false, false, 9.0, "When the menace known as the Joker emerges from his mysterious past, he wreaks havoc and chaos on the people of Gotham.", "HD", ["Action", "Crime", "Drama"], "assets/img-movies/The Dark Knight.jpg",),
    new movie(4, "Pulp Fiction", 1994, 154, "assets/img-movies/Pulp Fiction.jpg", false, false, 8.9, "The lives of two mob hitmen, a boxer, a gangster and his wife, and a pair of diner bandits intertwine in four tales of violence and redemption.", "HD", ["Crime", "Drama"]),
    new movie(5, "Schindler's List", 1993, 195, "assets/img-movies/Schindler's List.jpg", false, false, 8.9, "In German-occupied Poland during World War II, Oskar Schindler gradually becomes concerned for his Jewish workforce after witnessing their persecution by the Nazis.", "HD", ["Biography", "Drama", "History"]),
    new movie(6, "Fight Club", 1999, 139, "assets/img-movies/Fight Club.jpg", false, false, 8.8, "An insomniac office worker and a devil-may-care soap maker form an underground fight club that evolves into much more.", "HD", ["Drama"]),
    new movie(7, "Forrest Gump", 1994, 142, "assets/img-movies/Forrest Gump.jpg", false, false, 8.8, "The presidencies of Kennedy and Johnson, the events of Vietnam, Watergate, and other historical events unfold from the perspective of an Alabama man with an IQ of 75.", "HD", ["Drama", "Romance"]),
    new movie(8, "Inception", 2010, 148, "assets/img-movies/Inception.jpg", false, false, 8.8, "A thief who steals corporate secrets through the use of dream-sharing technology is given the inverse task of planting an idea into the mind of a C.E.O.", "HD", ["Action", "Adventure", "Sci-Fi"]),
    new movie(9, "The Matrix", 1999, 136, "assets/img-movies/The Matrix.jpg", false, false, 8.7, "A computer hacker learns from mysterious rebels about the true nature of his reality and his role in the war against its controllers.", "HD", ["Action", "Sci-Fi"]),
    new movie(10, "Goodfellas", 1990, 146, "assets/img-movies/Goodfellas.jpg", false, false, 8.7, "The story of Henry Hill and his life in the mob, covering his relationship with his wife Karen Hill and his mob partners.", "HD", ["Biography", "Crime", "Drama"]),
    new movie(11, "The Lord of the Rings: The Return of the King", 2003, 201, "assets/img-movies/The Lord of the Rings The Return of the King.jpg", false, false, 8.9, "Gandalf and Aragorn lead the World of Men against Sauron's army to draw his gaze from Frodo and Sam as they approach Mount Doom with the One Ring.", "HD", ["Action", "Adventure", "Drama"]),
    new movie(12, "Se7en", 1995, 127, "assets/img-movies/Se7en.jpg", false, false, 8.6, "Two detectives, a rookie and a veteran, hunt a serial killer who uses the seven deadly sins as his motives.", "HD", ["Crime", "Drama", "Mystery"])
];


export const favoriteMovies: movie[] = []
export const toWatchMovies: movie[] = []