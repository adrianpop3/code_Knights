import { Review } from "./review";

export interface Movie {
    id: number;
    title: string;
    category: string;
    ranking: number;
    description: string;
    imageUrl: string;

    reviews: Review[];
    likes: number;
    dislikes: number;
    trailerUrl: string;
    cast: string;
}
