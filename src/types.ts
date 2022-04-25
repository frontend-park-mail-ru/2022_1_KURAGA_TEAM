export interface Staff {
    id: number;
    photo: string;
    name: string;
    position: string;
}

export interface Staffs {
    staff: Staff;
}

export interface InfoHeadMovie {
    id: number;
    name_picture: string;
    rating: number;
    kinopoisk_rating: number;
    year: number;
    genre: Array<string>;
    country: Array<string>;
    duration: string;
    age_limit: number;
}

export interface Genre {
    genre: Array<string>;
}

export interface Genres {
    genre: Genre;
}

export interface UserData {
    username: string;
    email: string;
    avatar: string;
}

export interface User {
    user: UserData;
}

export interface PersonData {
    addit_photo_1: string;
    addit_photo_2: string;
    description: string;
    id: number;
    name: string;
    photo: string;
    position: string;
}

export interface MovieData {
    id: number;
    name: string;
    genre: string;
    picture: string;
    tagline: string;
    age_limit: string;
    is_movie: boolean;
    country: string;
    description: string;
    seasons: any;
    duration: string;
    kinopoisk_rating: string;
    name_picture: string;
    rating: string;
    staff: string;
    trailer: string;
    video: string;
    year: string;
}

export interface MovieCompilationData {
    id?: number;
    movies: Array<MovieData>;
    compilationName?: string;
    isMobile?: boolean;
}
export interface InfoHeadPerson {
    name: string;
    position: string;
    description: string;
    addit_photo_1: string;
    addit_photo_2: string;
}

export interface mainMovieData {
    name_picture: string;
    tagline: string;
}

export interface movingCarouselData {
    main: string;
    wrap: string;
    prev: string;
    next: string;
}

export interface privatesMovingCarousel {
    setting: movingCarouselData;
    sel?: selInfo;
    opt?: optInfo;
}
export interface optInfo {
    length: number;
    position: number;
    max_position: number;
}

export interface selInfo {
    main: HTMLElement;
    wrap: HTMLElement;
    children: HTMLCollection;
    prev: HTMLElement;
    next: HTMLElement;
}

export interface Info {
    username: string;
    email: string;
}
