import { MovieCategory } from './movie-category.enum';

export interface Category {
    name: MovieCategory;
    code: string;
}

export const categoryList: Category[] = [
    { name: MovieCategory.Home, code: 'Home' },
    { name: MovieCategory.NowPlaying, code: 'Now playing' },
    { name: MovieCategory.Popular, code: 'Popular' },
    { name: MovieCategory.TopRate, code: 'Top rate' },
    { name: MovieCategory.Upcoming, code: 'Upcoming' },
    { name: MovieCategory.Favorites, code: 'Favorites' },
    { name: MovieCategory.WatchList, code: 'Watch list' },
];
