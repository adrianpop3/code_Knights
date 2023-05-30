import { Movie } from "./movie";
import { User } from "./user";

export class Review {
    user!: User;
    text!: string;
    date!: string;
    movie!: Movie; 
}