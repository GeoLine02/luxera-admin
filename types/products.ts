export interface ProductType {
  id: number;
  product_rating: number;
  product_status: string;
  product_owner_id: number;
  product_sub_category_id: number;
  product_description: string;
  shop_id: number;
  primary_variant_id: number;
  views_per_day: number;
  views_per_month: number;
  sales_per_day: number;
  sales_per_month: number;
  variants: ProductVariantType[];
}

export interface ProductImage {
  id: number;
  imageUrl: string;
}

export interface ProductVariantType {
  id: number;
  variant_name: string;
  images: ProductImage[];
  product_id: number;
  variant_price: number;
  variant_quantity: number;
  variant_discount: number;
}

export interface ProductWithPrimaryVariantType extends ProductType {
  primaryVariant: ProductVariantType;
}

export type ProductRow = {
  id: number;
  primaryVariant: ProductVariantType;
  shop_id: number;
  product_status: string;
  variant_price: number;
  variant_quantity: number;
};
