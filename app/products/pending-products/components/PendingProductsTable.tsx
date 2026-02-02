"use client";

import TableComponent, { Column } from "@/components/shared/Table";
import Dropdown from "@/components/ui/DropDown";
import { ProductRow } from "@/types/products";
import { EllipsisVertical } from "lucide-react";
import Image from "next/image";
import { useState } from "react";
import DeleteProductModal from "./DeleteProductModal";

interface PendingProductsTableProps {
  pendingProducts: ProductRow[];
  page: number;
  pageSize: number;
  hasMore: boolean;
}

interface ActionsProps {
  row: ProductRow;
  onDelete: (row: ProductRow) => void;
  onEdit: (row: ProductRow) => void;
}

const Actions = ({ onDelete, onEdit, row }: ActionsProps) => {
  return (
    <Dropdown>
      <Dropdown.Trigger>
        <EllipsisVertical color="black" />
      </Dropdown.Trigger>
      <Dropdown.Menu>
        <Dropdown.Item>View</Dropdown.Item>
        <Dropdown.Item onClick={() => onEdit(row)}>Edit</Dropdown.Item>
        <Dropdown.Item onClick={() => onDelete(row)}>Delete</Dropdown.Item>
      </Dropdown.Menu>
    </Dropdown>
  );
};

const PendingProductsTable = ({
  pendingProducts,
  page,
}: PendingProductsTableProps) => {
  const rows = pendingProducts.map((p) => ({
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
        <span className="px-2 py-1 rounded bg-yellow-100 text-yellow-800">
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

  const [selectedProductId, setSelectedProductId] = useState<number | null>(
    null,
  );
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  const onOpenDeleteModal = (row: ProductRow) => {
    setSelectedProductId(row.id);
    setIsDeleteModalOpen(true);
  };

  const onCloseDeleteModal = () => {
    setIsDeleteModalOpen(false);
    setSelectedProductId(null);
  };

  const onEdit = () => {};

  return (
    <div>
      <TableComponent
        columns={columns}
        handleChangePage={() => {}}
        handleChangeRowsPerPage={() => {}}
        page={page - 1}
        rowKey={"id"}
        rows={rows}
        rowsPerPage={10}
        actions={(row) => (
          <Actions row={row.raw} onDelete={onOpenDeleteModal} onEdit={onEdit} />
        )}
      />
      {isDeleteModalOpen && (
        <DeleteProductModal
          selectedProductId={Number(selectedProductId)}
          onCloseDeleteModal={onCloseDeleteModal}
        />
      )}
    </div>
  );
};

export default PendingProductsTable;
