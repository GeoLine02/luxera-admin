import AllShopsTable from "./components/AllShopsTable";
import { fetchAllShops } from "./services/allShops";

const AllShops = async () => {
  const allShops = await fetchAllShops();
  console.log(allShops.data);

  return (
    <div>
      <AllShopsTable shopsData={allShops.data} initialPage={allShops.page} />
    </div>
  );
};

export default AllShops;
