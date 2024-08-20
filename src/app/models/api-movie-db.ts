export interface movieDB {
    adult: boolean;
    backdrop_path: string;
    genre_ids: number[];
    id: number;
    original_language: string;
    original_title: string;
    overview: string;
    popularity: number;
    poster_path: string;
    release_date: string;
    title: string;
    video: boolean;
    vote_average: number;
    vote_count: number;
    favorite?: boolean
    toWatch?: boolean
}

export interface moviesResponse {
    dates: {
        maximum: string;
        minimum: string;
    };
    page: number;
    results: movieDB[]; // Используем интерфейс Movie
    total_pages: number;
    total_results: number;
}
