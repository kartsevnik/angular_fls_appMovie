Конечно! Давайте подробно разберём, как происходит взаимодействие компонента `SavedMoviesComponent` с NgRx Store с момента его загрузки. Мы рассмотрим каждый шаг процесса, начиная с инициализации компонента и заканчивая тем, как данные отображаются в других компонентах, таких как `HeaderComponent`.

### **1. Введение в NgRx Store**

**NgRx Store** — это библиотека для управления состоянием приложения в Angular, основанная на паттерне Redux. Она предоставляет централизованное хранилище (store) для состояния приложения, обеспечивая предсказуемость и простоту управления состоянием.

**Основные концепции NgRx:**
- **Store:** Централизованное хранилище состояния приложения.
- **Actions (Действия):** Объекты, описывающие события, происходящие в приложении.
- **Reducers (Редьюсеры):** Функции, которые принимают текущее состояние и действие, и возвращают новое состояние.
- **Selectors (Селекторы):** Функции для извлечения и выборки данных из состояния.
- **Effects (Эффекты):** Позволяют обрабатывать побочные эффекты, такие как HTTP-запросы.

### **2. Обзор Взаимодействия Компонента с Store**

Когда компонент `SavedMoviesComponent` загружается, он взаимодействует с Store следующим образом:

1. **Инициализация Компонента:**
   - Компонент инициируется и запускает метод `ngOnInit`.
   
2. **Получение Параметров Маршрута:**
   - Компонент использует `ActivatedRoute` для получения текущего маршрута и определения, какие фильмы отображать (избранные или в списке просмотра).

3. **Диспетчеризация Действий (Dispatching Actions):**
   - В зависимости от маршрута, компонент диспетчеризирует действие `setSelectedCategory`, указывая выбранную категорию (например, `Favorites` или `WatchList`).

4. **Выборка Данных из Store (Selecting Data):**
   - Компонент подписывается на соответствующие селекторы (`selectFavoriteMovies` или `selectToWatchMovies`), чтобы получать актуальные данные из Store.

5. **Отображение Данных:**
   - Полученные данные отображаются в шаблоне компонента.

### **3. Пошаговый Разбор Взаимодействия**

Давайте рассмотрим каждый из этих шагов более детально.

#### **Шаг 1: Инициализация Компонента (`ngOnInit`)**

Когда Angular инициализирует компонент `SavedMoviesComponent`, вызывается метод `ngOnInit`. Это идеальное место для запуска логики инициализации, такой как загрузка данных.

```typescript
// saved-movies.component.ts
ngOnInit() {
  this.loadMovies();
}
```

#### **Шаг 2: Получение Параметров Маршрута**

Компонент использует `ActivatedRoute` для получения текущего маршрута. Это необходимо, чтобы определить, какие фильмы нужно загрузить: избранные (`favorites`) или в списке просмотра (`watch-list`).

```typescript
// saved-movies.component.ts
loadMovies() {
  this.activatedRoute.url.subscribe(urlSegments => {
    const category = urlSegments[0]?.path;

    if (category) {
      if (category === 'favorites') {
        // Дальнейшие действия для избранных фильмов
      } else if (category === 'watch-list') {
        // Дальнейшие действия для списка просмотра
      }
    }
  });
}
```

#### **Шаг 3: Диспетчеризация Действий (Dispatching Actions)**

В зависимости от категории, компонент диспетчеризирует действие `setSelectedCategory`, передавая соответствующее значение из перечисления `MovieCategory`.

```typescript
// saved-movies.component.ts
if (category === 'favorites') {
  this.store.dispatch(MoviesActions.setSelectedCategory({ category: MovieCategory.Favorites }));
  this.nameOfCategory = "Favorites";
  this.savedMovies$ = this.store.pipe(select(selectFavoriteMovies));
} else if (category === 'watch-list') {
  this.store.dispatch(MoviesActions.setSelectedCategory({ category: MovieCategory.WatchList }));
  this.nameOfCategory = "Watch list";
  this.savedMovies$ = this.store.pipe(select(selectToWatchMovies));
}
```

**Что происходит здесь:**
- **Диспетчеризация действия:** `this.store.dispatch(MoviesActions.setSelectedCategory({ category: MovieCategory.Favorites }))` отправляет действие в Store, указывая, что пользователь выбрал категорию `Favorites`.
- **Выборка данных:** `this.savedMovies$` устанавливается как Observable, подписанный на соответствующий селектор (`selectFavoriteMovies` или `selectToWatchMovies`), чтобы получать актуальные данные из Store.

#### **Шаг 4: Выборка Данных из Store (Selecting Data)**

Компонент подписывается на селекторы, чтобы получать данные из Store. В данном случае, это `selectFavoriteMovies` или `selectToWatchMovies`.

```typescript
// saved-movies.component.ts
this.savedMovies$ = this.store.pipe(select(selectFavoriteMovies));
```

**Почему это важно:**
- **Реактивное обновление:** Любые изменения в Store автоматически обновляют данные, на которые подписан компонент.
- **Разделение ответственности:** Компонент не заботится о том, как данные загружаются или обрабатываются; он просто получает готовые данные из Store.

#### **Шаг 5: Отображение Данных в Шаблоне**

Полученные данные отображаются в шаблоне компонента с использованием асинхронного пайпа (`async`).

```html
<!-- saved-movies.component.html -->
<div *ngIf="savedMovies$ | async as movies">
  <div *ngFor="let movie of movies">
    <!-- Отображение информации о фильме -->
    <h3>{{ movie.title }}</h3>
    <p>{{ movie.description }}</p>
  </div>
</div>
```

### **4. Как Store Обрабатывает Действия**

Чтобы полностью понять процесс взаимодействия, нужно рассмотреть, как Store обрабатывает действие `setSelectedCategory`.

#### **4.1. Действие (Action)**

Действие — это объект, описывающий событие. В нашем случае, действие `setSelectedCategory` создаётся с помощью `createAction` и содержит свойство `category`.

```typescript
// actions.ts
export const setSelectedCategory = createAction(
  '[Category] Set Selected Category',
  props<{ category: MovieCategory }>()
);
```

#### **4.2. Редьюсер (Reducer)**

Редьюсер — это функция, которая принимает текущее состояние и действие, и возвращает новое состояние. В `moviesReducer` есть обработчик для `setSelectedCategory`.

```typescript
// reducer.ts
on(MoviesActions.setSelectedCategory, (state, { category }) => ({
  ...state,
  selectedCategory: category,
  moviesByCategory: {
    ...state.moviesByCategory,
    [category]: {
      ...state.moviesByCategory[category],
      movies: [],
      currentPage: 1,
    },
  },
}))
```

**Что происходит здесь:**
- **Обновление выбранной категории:** `selectedCategory` устанавливается на новое значение.
- **Сброс данных для новой категории:** Список фильмов и текущая страница для выбранной категории сбрасываются.

#### **4.3. Селекторы (Selectors)**

Селекторы используются для выборки данных из Store. Например, `selectFavoriteMovies` извлекает список избранных фильмов.

```typescript
// selectors.ts
export const selectFavoriteMovies = createSelector(
  selectMoviesState,
  (state: MoviesState) => state.favoriteMovies
);
```

#### **4.4. Эффекты (Effects)**

Эффекты позволяют обрабатывать побочные эффекты, такие как HTTP-запросы. Например, при смене категории может потребоваться загрузить новые фильмы.

```typescript
// effects.ts
loadMoviesOnCategoryChange$ = createEffect(() =>
  this.actions$.pipe(
    ofType(MoviesActions.setSelectedCategory),
    map(action => MoviesActions.loadMovies({ category: action.category }))
  )
);
```

**Что делает эффект:**
- **Перехватывает действие `setSelectedCategory`:** Когда это действие диспатчится, эффект реагирует на него.
- **Диспетчеризует новое действие `loadMovies`:** Это инициирует загрузку фильмов для выбранной категории.

### **5. Взаимодействие с `HeaderComponent`**

`HeaderComponent` подписывается на `selectedCategory` из Store, чтобы отображать текущую выбранную категорию.

```typescript
// header.component.ts
ngOnInit(): void {
  const categorySubscription = this.store.pipe(
    select(selectSelectedCategory)
  ).subscribe(category => {
    this.selectedCategory = category;
    console.log('Текущая категория из Store:', this.selectedCategory);
    // Дополнительная логика при изменении категории
  });

  this.subscriptions.add(categorySubscription);

  // Другой код инициализации...
}
```

**Что происходит:**
- **Подписка на `selectSelectedCategory`:** Компонент получает обновления о выбранной категории из Store.
- **Обновление отображаемых данных:** При изменении категории компонент может обновлять UI или выполнять дополнительные действия.

### **6. Полный Цикл Взаимодействия**

Давайте объединим все шаги и рассмотрим полный цикл взаимодействия.

1. **Пользователь переходит на маршрут `/favorites`:**
   - `SavedMoviesComponent` загружается.
   - `ngOnInit` вызывается и запускает `loadMovies`.

2. **`loadMovies` получает категорию `favorites`:**
   - Диспетчеризуется действие `setSelectedCategory` с категорией `Favorites`.

3. **Store обрабатывает действие:**
   - **Редьюсер обновляет состояние:**
     - `selectedCategory` устанавливается в `Favorites`.
     - Сброс данных для категории `Favorites` (фильмы очищаются, страница устанавливается на 1).

4. **Эффект реагирует на `setSelectedCategory`:**
   - Диспетчеризуется действие `loadMovies` с категорией `Favorites`.

5. **Store обрабатывает действие `loadMovies`:**
   - **Редьюсер обновляет состояние:**
     - Устанавливает `loading` в `true` для категории `Favorites`.

6. **Эффект `loadMovies$` реагирует на `loadMovies`:**
   - Выполняет HTTP-запрос для загрузки фильмов категории `Favorites`.
   - При успешном ответе диспетчеризуется действие `loadMoviesSuccess` с полученными фильмами.
   - При ошибке диспетчеризуется действие `loadMoviesFailure`.

7. **Store обрабатывает действие `loadMoviesSuccess`:**
   - **Редьюсер обновляет состояние:**
     - Добавляет новые фильмы в `moviesByCategory['Favorites'].movies`.
     - Увеличивает `currentPage` на 1.
     - Устанавливает `loading` в `false`.

8. **Селекторы извлекают обновленные данные:**
   - `SavedMoviesComponent` получает обновлённый список фильмов через `selectFavoriteMovies`.

9. **`HeaderComponent` получает обновлённую категорию:**
   - Подписка на `selectSelectedCategory` получает новое значение `Favorites`.
   - Компонент обновляет отображение текущей категории в UI.

### **7. Детальное Объяснение Кода**

Давайте ещё раз пройдёмся по ключевым частям кода и разберём, как они взаимодействуют между собой.

#### **7.1. Экспорт Перечисления Категорий**

```typescript
// movie-category.enum.ts
export enum MovieCategory {
  Home = 'Home',
  NowPlaying = 'Now playing',
  Popular = 'Popular',
  TopRate = 'Top rate',
  Upcoming = 'Upcoming',
  Favorites = 'Favorites',
  WatchList = 'Watch list',
}
```

**Цель:** Определить возможные категории фильмов, включая новые категории `Favorites` и `WatchList`.

#### **7.2. Список Категорий**

```typescript
// category.ts
import { MovieCategory } from './movie-category.enum';

export const categoryList: Category[] = [
  { name: MovieCategory.Home, code: 'Home' },
  { name: MovieCategory.NowPlaying, code: 'Now playing' },
  { name: MovieCategory.Popular, code: 'Popular' },
  { name: MovieCategory.TopRate, code: 'Top rate' },
  { name: MovieCategory.Upcoming, code: 'Upcoming' },
  { name: MovieCategory.Favorites, code: 'Favorites' },
  { name: MovieCategory.WatchList, code: 'Watch list' },
];
```

**Цель:** Создать список категорий, который будет использоваться в состоянии приложения.

#### **7.3. Определение Состояния (State)**

```typescript
// state.ts
export interface MoviesState {
  error: string | null;
  categories: Category[];
  selectedCategory: MovieCategory;
  genres: any[];
  favoriteMovies: movieDB[];
  toWatchMovies: movieDB[];
  moviesByCategory: {
    [key in MovieCategory]: {
      movies: movieDB[];
      currentPage: number;
      loading: boolean;
    };
  };
}

export const initialState: MoviesState = {
  error: null,
  categories: categoryList,
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
    [MovieCategory.Favorites]: { // Новая категория
      movies: [],
      currentPage: 1,
      loading: false,
    },
    [MovieCategory.WatchList]: { // Новая категория
      movies: [],
      currentPage: 1,
      loading: false,
    },
  },
};
```

**Цель:** Определить структуру состояния приложения, включая новые категории `Favorites` и `WatchList`.

#### **7.4. Редьюсер**

```typescript
// reducer.ts
export const moviesReducer = createReducer(
  initialState,

  // Обработка загрузки жанров
  on(MoviesActions.loadGenresSuccess, (state, { genres }) => ({
    ...state,
    genres: [...genres]
  })),

  // Обработка смены категории
  on(MoviesActions.setSelectedCategory, (state, { category }) => ({
    ...state,
    selectedCategory: category,
    moviesByCategory: {
      ...state.moviesByCategory,
      [category]: {
        ...state.moviesByCategory[category],
        movies: [],
        currentPage: 1,
      },
    },
  })),

  // Обработка загрузки фильмов
  on(MoviesActions.loadMovies, (state, { category }) => ({
    ...state,
    moviesByCategory: {
      ...state.moviesByCategory,
      [category]: {
        ...state.moviesByCategory[category],
        loading: true,
      },
    },
  })),

  // Обработка успешной загрузки фильмов
  on(MoviesActions.loadMoviesSuccess, (state, { category, movies }) => ({
    ...state,
    moviesByCategory: {
      ...state.moviesByCategory,
      [category]: {
        movies: [...state.moviesByCategory[category].movies, ...movies],
        currentPage: state.moviesByCategory[category].currentPage + 1,
        loading: false,
      },
    },
  })),

  // Обработка ошибки загрузки фильмов
  on(MoviesActions.loadMoviesFailure, (state, { category, error }) => ({
    ...state,
    error,
    moviesByCategory: {
      ...state.moviesByCategory,
      [category]: {
        ...state.moviesByCategory[category],
        loading: false,
      },
    },
  })),

  // Добавление и удаление фильмов из избранного
  on(MoviesActions.addMovieToFavorites, (state, { movie }) => ({
    ...state,
    favoriteMovies: [...state.favoriteMovies, movie]
  })),
  on(MoviesActions.removeMovieFromFavorites, (state, { movie }) => ({
    ...state,
    favoriteMovies: state.favoriteMovies.filter(m => m.id !== movie.id)
  })),

  // Добавление и удаление фильмов из списка просмотра
  on(MoviesActions.addMovieToWatchlist, (state, { movie }) => ({
    ...state,
    toWatchMovies: [...state.toWatchMovies, movie]
  })),
  on(MoviesActions.removeMovieFromWatchlist, (state, { movie }) => ({
    ...state,
    toWatchMovies: state.toWatchMovies.filter(m => m.id !== movie.id)
  })),
);
```

**Что делает редьюсер:**
- **Обновляет состояние на основе действий:**
  - При смене категории обновляет `selectedCategory` и сбрасывает данные для новой категории.
  - При загрузке фильмов устанавливает `loading` в `true`.
  - При успешной загрузке фильмов добавляет их в состояние и увеличивает номер страницы.
  - При ошибке устанавливает сообщение об ошибке и останавливает загрузку.
  - Позволяет добавлять и удалять фильмы из избранного и списка просмотра.

#### **7.5. Селекторы**

```typescript
// selectors.ts
import { createFeatureSelector, createSelector } from '@ngrx/store';
import { MoviesState } from './state';
import { AppState } from './state';

export const selectMoviesState = createFeatureSelector<AppState, MoviesState>('movies');

export const selectGenres = createSelector(
  selectMoviesState,
  state => state.genres
);

export const selectSelectedCategory = createSelector(
  selectMoviesState,
  state => state.selectedCategory
);

export const selectMoviesByCategory = createSelector(
  selectMoviesState,
  state => state.moviesByCategory
);

export const selectCurrentCategoryMovies = createSelector(
  selectMoviesByCategory,
  selectSelectedCategory,
  (moviesByCategory, selectedCategory) => moviesByCategory[selectedCategory]?.movies || []
);

export const selectCurrentCategoryLoading = createSelector(
  selectMoviesByCategory,
  selectSelectedCategory,
  (moviesByCategory, selectedCategory) => moviesByCategory[selectedCategory]?.loading || false
);

export const selectCurrentCategoryCurrentPage = createSelector(
  selectMoviesByCategory,
  selectSelectedCategory,
  (moviesByCategory, selectedCategory) => moviesByCategory[selectedCategory]?.currentPage || 1
);

// Селекторы для избранных и списка просмотра
export const selectFavoriteMovies = createSelector(
  selectMoviesState,
  (state: MoviesState) => state.favoriteMovies
);

export const selectToWatchMovies = createSelector(
  selectMoviesState,
  (state: MoviesState) => state.toWatchMovies
);
```

**Цель:** Обеспечить удобные функции для выборки данных из Store.

#### **7.6. Эффекты**

```typescript
// movies.effects.ts
import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import * as MoviesActions from './actions';
import { switchMap, withLatestFrom, map, catchError } from 'rxjs/operators';
import { DataService } from '../services/data.service';
import { of } from 'rxjs';
import { Store } from '@ngrx/store';
import { AppState } from './state';
import { MovieCategory } from '../models/movie-category.enum';
import { selectGenres } from './selectors';

@Injectable()
export class MoviesEffects {
  constructor(
    private actions$: Actions,
    private dataService: DataService,
    private store: Store<AppState>
  ) { }

  // Эффект для автоматической загрузки фильмов при смене категории
  loadMoviesOnCategoryChange$ = createEffect(() =>
    this.actions$.pipe(
      ofType(MoviesActions.setSelectedCategory),
      map(action => MoviesActions.loadMovies({ category: action.category }))
    )
  );

  // Эффект для загрузки жанров
  loadGenres$ = createEffect(() =>
    this.actions$.pipe(
      ofType(MoviesActions.loadGenres),
      withLatestFrom(this.store.select(selectGenres)),
      switchMap(([action, genres]) => {
        if (genres.length > 0) {
          return of();
        }

        return this.dataService.getAllGenres().pipe(
          map(response => MoviesActions.loadGenresSuccess({ genres: response.genres })),
          catchError(error => {
            console.error('Error loading genres:', error);
            return of(MoviesActions.loadGenresFailure({ error: error.message }));
          })
        );
      })
    )
  );

  // Эффект для загрузки фильмов
  loadMovies$ = createEffect(() =>
    this.actions$.pipe(
      ofType(MoviesActions.loadMovies),
      withLatestFrom(this.store.select(state => state.movies)),
      switchMap(([action, moviesState]) => {
        const { category } = action;
        const currentPage = moviesState.moviesByCategory[category].currentPage;

        let dataServiceCall;
        switch (category) {
          case MovieCategory.Home:
            dataServiceCall = this.dataService.getMoviesTrending(currentPage);
            break;
          case MovieCategory.NowPlaying:
            dataServiceCall = this.dataService.getMoviesNowPlaying(currentPage);
            break;
          case MovieCategory.Popular:
            dataServiceCall = this.dataService.getMoviesPopular(currentPage);
            break;
          case MovieCategory.TopRate:
            dataServiceCall = this.dataService.getMoviesTopRated(currentPage);
            break;
          case MovieCategory.Upcoming:
            dataServiceCall = this.dataService.getMoviesUpcoming(currentPage);
            break;
          case MovieCategory.Favorites:
          case MovieCategory.WatchList:
            // Для избранных и списка просмотра, предположим, что фильмы уже в состоянии
            return of();
          default:
            return of();
        }

        return dataServiceCall.pipe(
          map(response => MoviesActions.loadMoviesSuccess({ category, movies: response.results })),
          catchError(error => of(MoviesActions.loadMoviesFailure({ category, error: error.message })))
        );
      })
    )
  );
}
```

**Что делают эффекты:**
- **`loadMoviesOnCategoryChange$`:** При смене категории автоматически запускает загрузку фильмов для новой категории.
- **`loadGenres$`:** Загружает жанры, если они ещё не загружены.
- **`loadMovies$`:** Загружает фильмы для выбранной категории, кроме `Favorites` и `WatchList`, так как эти категории управляются локально.

#### **7.7. Компонент `SavedMoviesComponent`**

```typescript
// saved-movies.component.ts
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { movieDB } from '../../models/api-movie-db';
import { Store, select } from '@ngrx/store';
import { AppState } from '../../store/state';
import { selectFavoriteMovies, selectToWatchMovies } from '../../store/selectors';
import * as MoviesActions from '../../store/actions';
import { MovieCategory } from '../../models/movie-category.enum';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-saved-movies',
  templateUrl: './saved-movies.component.html',
  styleUrl: ['./saved-movies.component.scss']
})
export class SavedMoviesComponent implements OnInit {
  savedMovies$!: Observable<movieDB[]>;
  nameOfCategory: string = '';
  isLoading = false;

  constructor(
    private store: Store<AppState>,
    private activatedRoute: ActivatedRoute
  ) { }

  ngOnInit() {
    this.loadMovies();
  }

  loadMovies() {
    this.activatedRoute.url.subscribe(urlSegments => {
      const category = urlSegments[0]?.path;

      if (category) {
        if (category === 'favorites') {
          this.store.dispatch(MoviesActions.setSelectedCategory({ category: MovieCategory.Favorites }));
          this.nameOfCategory = "Favorites";
          this.savedMovies$ = this.store.pipe(select(selectFavoriteMovies));
        } else if (category === 'watch-list') {
          this.store.dispatch(MoviesActions.setSelectedCategory({ category: MovieCategory.WatchList }));
          this.nameOfCategory = "Watch list";
          this.savedMovies$ = this.store.pipe(select(selectToWatchMovies));
        }
      }
    });
  }

  loadNextPage() {
    // Поскольку пагинация для сохраненных списков отсутствует, можно оставить пустым или реализовать при необходимости
  }
}
```

**Что делает компонент:**
- **Подписывается на изменение маршрута:** Определяет, какие фильмы отображать.
- **Диспетчеризует действие `setSelectedCategory`:** Устанавливает выбранную категорию в Store.
- **Подписывается на соответствующий селектор:** Получает список избранных или списка просмотра фильмов.

#### **7.8. Компонент `HeaderComponent`**

```typescript
// header.component.ts
import { Component, ViewChild, ElementRef, OnInit, Input, OnDestroy } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs/operators';
import { select, Store } from '@ngrx/store';
import { AppState } from '../../store/state';
import { selectSelectedCategory } from '../../store/selectors';
import { Subscription } from 'rxjs';
import { MovieCategory } from '../../models/movie-category.enum';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: ['./header.component.scss']
})
export class HeaderComponent implements OnInit, OnDestroy {
  lastScrollTop = 0;
  isHeaderHidden = false;
  isSearchVisible = false;

  @ViewChild('searchInput') searchInput!: ElementRef<HTMLInputElement>;
  @Input() wrapper!: HTMLElement;

  selectedCategory: MovieCategory = MovieCategory.Home;
  filterText = '';

  private scrollListenerAdded = false;
  private subscriptions: Subscription = new Subscription();

  constructor(private router: Router, private store: Store<AppState>) {
    this.router.events
      .pipe(filter(event => event instanceof NavigationEnd))
      .subscribe(() => {
        this.clearSearchInput();
      });
  }

  ngOnInit(): void {
    const categorySubscription = this.store.pipe(
      select(selectSelectedCategory)
    ).subscribe(category => {
      this.selectedCategory = category;
      console.log('Текущая категория из Store:', this.selectedCategory);
      // Дополнительная логика при изменении категории
    });

    this.subscriptions.add(categorySubscription);

    if (!this.scrollListenerAdded && this.wrapper) {
      this.addScrollListener();
    }
  }

  addScrollListener(): void {
    if (this.wrapper) {
      this.wrapper.addEventListener('scroll', this.onWindowScroll.bind(this));
      console.log('Scroll listener added to wrapper');
      this.scrollListenerAdded = true;
    } else {
      console.error('Wrapper is not defined.');
    }
  }

  onWindowScroll() {
    if (this.wrapper) {
      const currentScroll = this.wrapper.scrollTop;

      if (currentScroll > this.lastScrollTop) {
        this.isHeaderHidden = true;
      } else if (currentScroll < this.lastScrollTop) {
        this.isHeaderHidden = false;
      }

      this.lastScrollTop = currentScroll <= 0 ? 0 : currentScroll;
    } else {
      console.error('Wrapper is not defined during scroll event.');
    }
  }

  toggleSearch() {
    this.isSearchVisible = !this.isSearchVisible;
  }

  onDocumentClick(event: MouseEvent) {
    const clickedElement = event.target as HTMLElement;
    const isClickInside = clickedElement.closest('.search-input') !== null || clickedElement.closest('.ramka-3') !== null;

    if (!isClickInside) {
      this.isSearchVisible = false;
    }
  }

  search(searchText: string) {
    // Реализуйте поиск через Store или соответствующий эффект
  }

  private clearSearchInput() {
    if (this.searchInput && this.searchInput.nativeElement) {
      this.searchInput.nativeElement.value = '';
    }
  }

  ngOnDestroy() {
    this.subscriptions.unsubscribe();
  }
}
```

**Что делает компонент:**
- **Подписывается на `selectSelectedCategory`:** Получает текущее значение выбранной категории из Store.
- **Отображает текущую категорию:** Можно использовать `selectedCategory` для отображения названия категории в заголовке.
- **Обрабатывает прокрутку и поиск:** Дополнительная функциональность для UI.

### **8. Пошаговый Цикл Взаимодействия**

Давайте последовательно пройдёмся по полному циклу взаимодействия при загрузке `SavedMoviesComponent`.

1. **Пользователь переходит на маршрут `/favorites`:**
   - Angular загружает компонент `SavedMoviesComponent`.
   - Вызывается `ngOnInit`, запускающий метод `loadMovies`.

2. **Компонент получает категорию `favorites`:**
   - Использует `ActivatedRoute` для получения текущего маршрута.
   - Определяет, что категория — `favorites`.

3. **Компонент диспетчеризует действие `setSelectedCategory`:**
   - `this.store.dispatch(MoviesActions.setSelectedCategory({ category: MovieCategory.Favorites }))`.
   - Это действие отправляется в Store.

4. **Store обрабатывает действие через редьюсер:**
   - `moviesReducer` обновляет `selectedCategory` на `Favorites`.
   - Сбрасывает данные для категории `Favorites` (очищает список фильмов и устанавливает `currentPage` на 1).

5. **Эффект `loadMoviesOnCategoryChange$` реагирует на `setSelectedCategory`:**
   - Диспетчеризует действие `loadMovies` для категории `Favorites`.

6. **Store обрабатывает действие `loadMovies`:**
   - `moviesReducer` устанавливает `loading` в `true` для категории `Favorites`.

7. **Эффект `loadMovies$` реагирует на `loadMovies`:**
   - Выполняет HTTP-запрос для загрузки фильмов категории `Favorites` через `DataService`.
   - При успешном ответе диспетчеризует `loadMoviesSuccess` с полученными фильмами.
   - При ошибке диспетчеризует `loadMoviesFailure` с сообщением об ошибке.

8. **Store обрабатывает `loadMoviesSuccess`:**
   - `moviesReducer` добавляет новые фильмы в `moviesByCategory['Favorites'].movies`.
   - Увеличивает `currentPage` на 1.
   - Устанавливает `loading` в `false`.

9. **Компонент `SavedMoviesComponent` получает обновлённый список фильмов:**
   - `savedMovies$` обновляется через подписку на `selectFavoriteMovies`.
   - В шаблоне отображаются новые фильмы.

10. **Компонент `HeaderComponent` получает обновлённую категорию:**
    - Подписка на `selectSelectedCategory` обновляет `selectedCategory` до `Favorites`.
    - Заголовок отображает текущую категорию.

### **9. Важные Моменты и Рекомендации**

- **Централизованное Управление Состоянием:**
  - Все изменения состояния происходят через Store, обеспечивая предсказуемость и удобство отладки.
  
- **Реактивное Программирование:**
  - Компоненты подписываются на Observable-потоки из Store, автоматически обновляясь при изменениях.
  
- **Чистота Компонентов:**
  - Компоненты не содержат бизнес-логики, связанной с данными, она управляется через Store и эффекты.
  
- **Единый Источник Истины:**
  - `selectedCategory` хранится в Store и доступен всем компонентам, обеспечивая консистентность.

### **10. Заключение**

Взаимодействие компонента с NgRx Store основывается на четком разделении ответственности и использовании реактивного программирования. Понимание этого процесса позволяет создавать масштабируемые и легко поддерживаемые приложения. В нашем случае, компонент `SavedMoviesComponent` централизует управление категориями через Store, что обеспечивает консистентность состояния и упрощает взаимодействие с другими компонентами, такими как `HeaderComponent`.

Если у вас возникнут дополнительные вопросы или потребуется разъяснение конкретных аспектов, не стесняйтесь спрашивать!