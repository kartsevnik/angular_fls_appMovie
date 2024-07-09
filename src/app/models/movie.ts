export class movie {
    id: number
    title: string
    year: number
    duration: number
    imgPath: string
    favorite: boolean
    toWatch: boolean
    rating: number
    description: string
    quality: string
    genres: string[]
    imgLargePath?: string

    constructor(id: number,
        title: string,
        year: number,
        duration: number,
        imgPath: string,
        favorite: boolean,
        toWatch: boolean,
        rating: number,
        description: string,
        quality: string,
        genres: string[],
        imgLargePath?: string,
    ) {
        this.id = id
        this.title = title
        this.year = year
        this.duration = duration
        this.imgPath = imgPath
        this.favorite = favorite
        this.toWatch = toWatch
        this.rating = rating
        this.description = description
        this.quality = quality
        this.genres = genres
        this.imgLargePath = imgLargePath
    }
}