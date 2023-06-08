export type Product = {
  id: string;
  nameFrom1C: string;
  name: string;
  codeFrom1C: string;
  brand: Brand;
  description: string;
  images: string[];
  price: number;
  volume?: string;
  catalog_product: Category;
  sub_catalog_product: SubCategory;
  variations: {
    id: number;
    value: string;
    code: string;
  }[];
  characteristics: {
    id: string;
    key: string;
    value: string;
  }[];
  tags: {
    id?: string;
    name: string;
  }[];
};

export type Brand = {
  id?: string;
  name: string;
  icon?: string;
  margin?: number;
  __v?: number;
};

export type Category = {
  id?: string;
  name: string;
  position?: number;
  __v?: number;
};

export type SubCategory = {
  id?: string;
  name: string;
  position?: number;
  catalog_product?: string;
  __v?: number;
};
