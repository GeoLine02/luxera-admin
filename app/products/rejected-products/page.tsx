import RejectedProductsTable from "./components/RejectedProductsTable";
import { fetchRejectedProducts } from "./services/rejectedProducts";

const RejectedProducts = async () => {
  const rejectedProducts = await fetchRejectedProducts(1);

  return (
    <div>
      <RejectedProductsTable
        initialPage={rejectedProducts.page}
        rejectedProducts={rejectedProducts.data}
      />
    </div>
  );
};

export default RejectedProducts;
