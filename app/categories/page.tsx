import { CategoriesList } from "./components/CategoriesList";
import { fetchCategories } from "./services/categories";

const CategoriesPage = async () => {
  const categoriesData = await fetchCategories();
  console.log("data " + categoriesData)

  return (
    <div>
      <h1 className="text-2xl font-bold">Categories</h1>

      <div className="mt-4">
        <CategoriesList categories={categoriesData} />
      </div>
    </div>
  );
};

export default CategoriesPage;
