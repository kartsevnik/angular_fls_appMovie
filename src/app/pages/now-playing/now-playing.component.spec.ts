// now-playing.component.spec.ts

import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NowPlayingComponent } from './now-playing.component';
import { provideMockStore, MockStore } from '@ngrx/store/testing';
import * as MoviesActions from '../../store/actions';
import { movieDB } from '../../models/api-movie-db';
import { MovieCategory } from '../../models/movie-category.enum';
import { selectCurrentCategoryMovies, selectCurrentCategoryLoading, selectCurrentCategoryCurrentPage } from '../../store/selectors';
import { DebugElement, NO_ERRORS_SCHEMA } from '@angular/core';
import { By } from '@angular/platform-browser';
import { HttpClientTestingModule } from '@angular/common/http/testing';

// Создание мок-компонента для app-movie-list
import { Component, Input } from '@angular/core';

@Component({
    selector: 'app-movie-list',
    template: `
    <div *ngFor="let movie of movies">
      <div class="movie-title">{{ movie.title }}</div>
      <!-- Другие элементы фильма -->
      <button (click)="loadNextPage()">Load Next Page</button>
    </div>
  `
})
class MockMovieListComponent {
    @Input() movies: movieDB[] = [];
    @Input() loadNextPage!: () => void;
}

describe('NowPlayingComponent', () => {
    let component: NowPlayingComponent;
    let fixture: ComponentFixture<NowPlayingComponent>;
    let store: MockStore;
    const initialState = {
        movies: {
            error: null,
            categories: [],
            selectedCategory: MovieCategory.Home,
            genres: [],
            favoriteMovies: [],
            toWatchMovies: [],
            moviesByCategory: {
                [MovieCategory.Home]: {
                    movies: [],
                    currentPage: 1,
                    loading: false,
                },
                [MovieCategory.NowPlaying]: {
                    movies: [],
                    currentPage: 1,
                    loading: false,
                },
                [MovieCategory.Popular]: {
                    movies: [],
                    currentPage: 1,
                    loading: false,
                },
                [MovieCategory.TopRate]: {
                    movies: [],
                    currentPage: 1,
                    loading: false,
                },
                [MovieCategory.Upcoming]: {
                    movies: [],
                    currentPage: 1,
                    loading: false,
                },
            },
        }
    };

    const mockMovies: movieDB[] = [
        {
            adult: false,
            backdrop_path: '/backdrop1.jpg',
            genre_ids: [28, 12],
            id: 1,
            original_language: 'en',
            original_title: 'Test Movie 1',
            overview: 'Overview of Test Movie 1',
            popularity: 100.0,
            poster_path: '/poster1.jpg',
            release_date: '2023-10-10',
            title: 'Test Movie 1',
            video: false,
            vote_average: 7.5,
            vote_count: 200,
            favorite: false,
            toWatch: true
        },
        {
            adult: false,
            backdrop_path: '/backdrop2.jpg',
            genre_ids: [35, 18],
            id: 2,
            original_language: 'en',
            original_title: 'Test Movie 2',
            overview: 'Overview of Test Movie 2',
            popularity: 150.0,
            poster_path: '/poster2.jpg',
            release_date: '2023-09-15',
            title: 'Test Movie 2',
            video: false,
            vote_average: 8.0,
            vote_count: 300,
            favorite: true,
            toWatch: false
        }
    ];

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [HttpClientTestingModule],
            declarations: [NowPlayingComponent, MockMovieListComponent],
            providers: [
                provideMockStore({ initialState })
            ],
            schemas: [NO_ERRORS_SCHEMA]
        }).compileComponents();

        store = TestBed.inject(MockStore);
        fixture = TestBed.createComponent(NowPlayingComponent);
        component = fixture.componentInstance;

        // Настройка селекторов
        store.overrideSelector(selectCurrentCategoryMovies, mockMovies);
        store.overrideSelector(selectCurrentCategoryLoading, false);
        store.overrideSelector(selectCurrentCategoryCurrentPage, 1);

        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should dispatch setSelectedCategory action on init', () => {
        const dispatchSpy = spyOn(store, 'dispatch').and.callThrough();
        component.ngOnInit();
        expect(dispatchSpy).toHaveBeenCalledWith(MoviesActions.setSelectedCategory({ category: MovieCategory.NowPlaying }));
    });

    it('should select movies from the store', () => {
        component.movies$.subscribe(movies => {
            expect(movies).toEqual(mockMovies);
        });
    });

    it('should display the main title correctly', () => {
        const compiled = fixture.nativeElement as HTMLElement;
        const mainTitle = compiled.querySelector('.main-title');

        expect(mainTitle).toBeTruthy();
        expect(mainTitle?.textContent).toContain('Now playing');

        const mainColorSpan = mainTitle?.querySelector('.main-color');
        expect(mainColorSpan).toBeTruthy();
        expect(mainColorSpan?.textContent).toContain('playing');
    });

    it('should display movie titles in the template', () => {
        const debugElement: DebugElement = fixture.debugElement;
        const movieTitleElements = debugElement.queryAll(By.css('.movie-title'));

        expect(movieTitleElements.length).toBe(2);
        expect(movieTitleElements[0].nativeElement.textContent).toContain('Test Movie 1');
        expect(movieTitleElements[1].nativeElement.textContent).toContain('Test Movie 2');
    });


    it('should load next page when loadNextPage is called', () => {
        const dispatchSpy = spyOn(store, 'dispatch').and.callThrough();
        component.loadNextPage();
        expect(dispatchSpy).toHaveBeenCalledWith(MoviesActions.loadMovies({ category: MovieCategory.NowPlaying }));
    });


    it('should hide loading indicator when isLoading$ is false', () => {
        store.overrideSelector(selectCurrentCategoryLoading, false);
        store.refreshState();
        fixture.detectChanges();

        const compiled = fixture.nativeElement as HTMLElement;
        const loadingIndicator = compiled.querySelector('.loading-indicator');

        expect(loadingIndicator).toBeFalsy();
    });
});
