export interface Shop {
  id: number;
  owner_id: number;
  shop_name: string;
  password: string;
  city: string | null;
  city_id: number | null;
  custom_city_name: string | null;
  createdAt: string;
  updatedAt: string;
  deleted_at: string | null;
}

export interface ShopRow {
  id: number;
  shop_name: string;
  owner_id: number;
  city: string;
  createdAt: string;
  raw: Shop;
}
