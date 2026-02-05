import ActiveProductsTable from "./components/ActiveProductsTable";
import { fetchActiveProducts } from "./services/activeProducts";

const ActiveProducts = async () => {
  const activeProducts = await fetchActiveProducts(1);

  return (
    <div>
      <ActiveProductsTable
        activeProducts={activeProducts.data}
        initialPage={activeProducts.page}
      />
    </div>
  );
};

export default ActiveProducts;
