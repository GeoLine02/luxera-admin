import PendingProductsTable from "./components/PendingProductsTable";
import { fetchPendingProducts } from "./services/pendingProducts";

const PendingProducts = async () => {
  const pendingProducts = await fetchPendingProducts(1);
  return (
    <div>
      <PendingProductsTable
        pendingProducts={pendingProducts.data}
        hasMore={pendingProducts.hasMore}
        page={pendingProducts.page}
        pageSize={pendingProducts.pageSize}
      />
    </div>
  );
};

export default PendingProducts;
