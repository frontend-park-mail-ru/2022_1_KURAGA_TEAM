export interface Staff {
    id: number,
    photo: string,
    name: string,
    position: string,
}

export interface Staffs {
    staff: Staff,
}

export interface InfoHeadMovie {
    id: number,
    name_picture: string,
    rating: number,
    kinopoisk_rating: number,
    year: number,
    genre: Array<string>,
    country: Array<string>,
    duration: string,
    age_limit: number,
}

export interface Genre {
    genre: Array<string>,
}

export interface Genres {
    genre: Genre
}

export interface UserData {
    username: string,
    email: string,
    avatar: string,
}

export interface User {
    user: UserData
}

