"use client";

import Table from "@/components/shared/Table";
import { ProductWithPrimaryVariantType } from "@/types/products";
import { Column } from "@/types/table";

const COLUMNS: Column<ProductWithPrimaryVariantType>[] = [
  {
    header: "ID",
    accessor: "id",
  },
  {
    header: "Rating",
    accessor: "product_rating",
  },
  {
    header: "status",
    accessor: "product_status",
  },
  {
    header: "owner ID",
    accessor: "product_owner_id",
  },
  {
    header: "shop ID",
    accessor: "shop_id",
  },
  {
    header: "Views/day",
    accessor: "views_per_day",
  },
  {
    header: "Views/month",
    accessor: "views_per_month",
  },
  {
    header: "Sales/day",
    accessor: "sales_per_day",
  },
  {
    header: "Sales/month",
    accessor: "sales_per_month",
  },
];

const ProductsTable = () => {
  return (
    <>
      <Table columns={COLUMNS} data={[]} />
    </>
  );
};

export default ProductsTable;
