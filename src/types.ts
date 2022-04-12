interface Staff {
    id: number,
    photo: string,
    name: string,
    position: string,
}

interface Staffs {
    staff: Staff,
}

interface InfoHeadMovie {
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

interface Genre {
    genre: Array<string>,
}

interface Genres {
    genre: Genre
}

interface UserData {
    username: string,
    email: string,
    avatar: string,
}

interface User {
    user: UserData
}