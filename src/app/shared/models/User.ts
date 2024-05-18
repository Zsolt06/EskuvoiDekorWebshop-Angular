import { Product } from "./Product";

export interface User {
    id: string;
    email: string;
    name: string;
    cart: Array<Product>;
}