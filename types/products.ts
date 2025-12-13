export interface ProductType {
  id: number;
  product_rating: number;
  product_status: string;
  product_owner_id: number;
  product_sub_category_id: number;
  shop_id: number;
  primary_variant_id: number;
  views_per_day: number;
  views_per_month: number;
  sales_per_day: number;
  sales_per_month: number;
}

export interface ProductVariantType {
  id: number;
  variant_name: string;
  product_id: number;
  variant_price: number;
  variant_qunatity: number;
  variant_discount: number;
}

export interface ProductImage {
  id: number;
  image: string;
  product_id: number;
  variant_id: number;
}

export interface ProductWithPrimaryVariantType extends ProductType {
  primaryVariant: ProductVariantType;
}
