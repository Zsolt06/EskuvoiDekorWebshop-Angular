import { Product } from "./Product";

export interface User {
    email: string;
    name: string;
    cart: Array<Product>;
    role: string;
}