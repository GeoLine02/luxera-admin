"use client";

import TableComponent, { Column } from "@/components/shared/Table";
import { useState } from "react";
import ViewShopModal from "../../components/ViewShopModal";
import { ShopRow } from "@/types/shops";
import ShopActionts from "../../components/ShopActionts";
import DeleteShopModal from "../../components/DeleteShopModal";
import { refetchAllShops } from "../services/allShops.client";

interface AllShopsTableProps {
  shopsData: ShopRow[];
  initialPage: number;
}

const AllShopsTable = ({ shopsData, initialPage }: AllShopsTableProps) => {
  const [shops, setShops] = useState(shopsData);
  const [page, setPage] = useState(initialPage);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);
  const [selectedShopId, setSelectedShopId] = useState<number | null>(null);

  const rows = shops.map((shop) => ({
    id: shop.id,
    shop_name: shop.shop_name,
    owner_id: shop.owner_id,
    city: shop.city,
    createdAt: new Date(shop.createdAt).toLocaleDateString(),
    raw: shop,
  }));

  const columns: Column<(typeof rows)[0], keyof (typeof rows)[0]>[] = [
    { id: "id", label: "ID" },
    { id: "shop_name", label: "Shop Name" },
    { id: "owner_id", label: "Owner ID" },
    { id: "city", label: "City" },
    { id: "createdAt", label: "Created At" },
  ];

  const onOpenDeleteModal = (row: ShopRow) => {
    setSelectedShopId(row.id);
    setIsDeleteModalOpen(true);
  };

  const onCloseDeleteModal = () => {
    setIsDeleteModalOpen(false);
    setSelectedShopId(null);
  };

  const onOpenViewModal = (row: ShopRow) => {
    setSelectedShopId(row.id);
    setIsViewModalOpen(true);
  };

  const onCloseViewModal = () => {
    setIsViewModalOpen(false);
    setSelectedShopId(null);
  };

  const handleChangePage = async (_: unknown, newPage: number) => {
    try {
      setPage(newPage + 1);
      const res = await refetchAllShops(page);
      setShops(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const newRowsPerPage = parseInt(event.target.value, 10);
    setRowsPerPage(newRowsPerPage);
    setPage(1);
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
          <ShopActionts
            row={row.raw}
            onDelete={onOpenDeleteModal}
            onView={onOpenViewModal}
          />
        )}
      />
      {isViewModalOpen && (
        <ViewShopModal
          onClose={onCloseViewModal}
          setShops={setShops}
          shopId={selectedShopId as number}
        />
      )}
      {isDeleteModalOpen && (
        <DeleteShopModal
          onCloseDeleteModal={onCloseDeleteModal}
          selectedShopId={selectedShopId as number}
          shops={shops}
          setShops={setShops}
        />
      )}
    </div>
  );
};

export default AllShopsTable;
