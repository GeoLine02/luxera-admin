import ProductsTable from "./components/ProductsTable";

const AllProducts = () => {
  return (
    <div className="flex flex-col gap-4 h-[calc(100vh-100px)]">
      <h1 className="text-3xl font-bold">Products</h1>
      <ProductsTable />
    </div>
  );
};

export default AllProducts;
