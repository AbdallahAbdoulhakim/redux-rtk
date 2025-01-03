import useApi from "../../hooks/useApi";
import Spinner from "../Spinner";
import Error from "../Error";
import ProductsList from "./ProductsList";

const Products = () => {
  const { response, error, isLoading } = useApi("products/all?limit=8&page=8");

  return (
    <div className="flex-grow flex flex-col">
      {isLoading ? (
        <Spinner />
      ) : error ? (
        <Error message={error} />
      ) : (
        <ProductsList
          list={response?.products}
          pagingCounter={response?.pagingCounter}
          page={response?.page}
          hasNextPage={response?.hasNextPage}
          hasPrevPage={response?.hasPrevPage}
          prevPage={response?.prevPage}
          nextPage={response?.nextPage}
          limit={response?.limit}
          postCount={response?.postCount}
          pageCount={response?.pageCount}
        />
      )}
    </div>
  );
};
export default Products;
