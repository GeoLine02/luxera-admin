"use client";

import TableComponent, { Column } from "@/components/shared/Table";
import { ProductRow } from "@/types/products";
import Image from "next/image";
import { useState } from "react";
import ProductActions from "../../components/ProductActions";
import DeleteProductModal from "../../components/DeleteProductModal";
import ViewProductModal from "../../components/ViewProductModal";
import { refetchActiveProducts } from "../services/activeProducts.client";

interface ActiveProductsTableProps {
  activeProducts: ProductRow[];
  initialPage: number;
}

const ActiveProductsTable = ({
  activeProducts,
  initialPage,
}: ActiveProductsTableProps) => {
  const [products, setProducts] = useState(activeProducts);
  const [page, setPage] = useState(initialPage);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);
  const [selectedProductId, setSelectedProductId] = useState<number | null>(
    null,
  );

  const rows = products.map((p) => ({
    id: p.id,
    primary_variant_image:
      p.primaryVariant.images?.[0]?.imageUrl || "/placeholder.png",
    primary_variant_name: p.primaryVariant.variant_name,
    product_status: p.product_status,
    variant_price: p.primaryVariant.variant_price,
    variant_quantity: p.primaryVariant.variant_quantity,
    raw: p,
  }));

  const columns: Column<(typeof rows)[0], keyof (typeof rows)[0]>[] = [
    { id: "id", label: "ID" },
    {
      id: "primary_variant_image",
      label: "Image",
      render: (url) => (
        <Image
          src={url as string}
          width={200}
          height={200}
          alt="Product"
          className="w-15 h-15 rounded object-cover"
        />
      ),
    },
    { id: "primary_variant_name", label: "Name" },
    {
      id: "product_status",
      label: "Status",
      render: (status) => (
        <span className="px-2 py-1 rounded bg-green-200 text-green-500">
          {status as string}
        </span>
      ),
    },
    {
      id: "variant_price",
      label: "Price",
      render: (v) => `$${v}`,
      align: "right",
    },
    { id: "variant_quantity", label: "Quantity", align: "right" },
  ];

  const onOpenDeleteModal = (row: ProductRow) => {
    setSelectedProductId(row.id);
    setIsDeleteModalOpen(true);
  };

  const onCloseDeleteModal = () => {
    setIsDeleteModalOpen(false);
    setSelectedProductId(null);
  };

  const onOpenViewModal = (row: ProductRow) => {
    setSelectedProductId(row.id);
    setIsViewModalOpen(true);
  };

  const onCloseViewModal = () => {
    setIsViewModalOpen(false);
    setSelectedProductId(null);
  };

  const handleChangePage = async (_: unknown, newPage: number) => {
    setPage(newPage + 1); // because your state is 1-based
    const res = await refetchActiveProducts(page);
    setProducts(res.data);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const newRowsPerPage = parseInt(event.target.value, 10);
    setRowsPerPage(newRowsPerPage);
    setPage(1); // reset to first page
  };

  return (
    <div>
      <TableComponent
        columns={columns}
        handleChangePage={handleChangePage}
        handleChangeRowsPerPage={handleChangeRowsPerPage}
        page={page - 1}
        rowKey={"id"}
        rows={rows}
        rowsPerPage={rowsPerPage}
        actions={(row) => (
          <ProductActions
            row={row.raw}
            onDelete={onOpenDeleteModal}
            onView={onOpenViewModal}
          />
        )}
      />
      {isDeleteModalOpen && (
        <DeleteProductModal
          products={products}
          selectedProductId={Number(selectedProductId)}
          onCloseDeleteModal={onCloseDeleteModal}
        />
      )}
      {isViewModalOpen && (
        <ViewProductModal
          setProducts={setProducts}
          productId={Number(selectedProductId)}
          onClose={onCloseViewModal}
        />
      )}
    </div>
  );
};

export default ActiveProductsTable;
