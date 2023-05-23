export type ProductItem = {
  id: string;
  name: string;
  description: string;
  imageUrl: string;
  price: number;
  availableItems: number;
};

export type Product = {
  title: string;
  items: ProductItem[];
};

export type Category = {
  [key: string]: ProductItem[];
};
