import { User } from "./user";

export interface Review {
    user: User;
    text: string;
    date: string;
}