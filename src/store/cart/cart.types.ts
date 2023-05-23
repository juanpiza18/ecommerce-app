import { ProductItem } from "../shop/shop.types";

export type CartProduct = ProductItem & {
  quantity: number;
};
