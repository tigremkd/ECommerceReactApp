import { useContext, useEffect, useState } from "react";
import productsDB from "../data/products.json";
import ProductCard from "../components/ProductCard";
import { StateContext } from "../components/ContextProvider";
import { HiArrowUp, HiArrowDown } from "react-icons/hi";

const Home = () => {
  const [products, setProducts] = useState(productsDB);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortOrder, setSortOrder] = useState("ascending");
  const [minPrice, setMinPrice] = useState(0);
  const [maxPrice, setMaxPrice] = useState(50000);

  useEffect(() => {
    const filteredProducts = productsDB.filter((product) =>
      product.cardTitle.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const updatedProducts = filteredProducts.filter(
      (product) =>
        product.listOfPlans[0].price.amount >= minPrice &&
        product.listOfPlans[0].price.amount <= maxPrice
    );

    setProducts(updatedProducts);
  }, [searchTerm, minPrice, maxPrice]);

  useEffect(() => {
    const sortedProducts = [...products].sort((a, b) => {
      if (sortOrder === "ascending") {
        return a.cardTitle.localeCompare(b.cardTitle);
      } else {
        return b.cardTitle.localeCompare(a.cardTitle);
      }
    });

    setProducts(sortedProducts);
  }, [sortOrder]);

  const handleSortOrderToggle = () => {
    const newSortOrder = sortOrder === "ascending" ? "descending" : "ascending";
    setSortOrder(newSortOrder);
  };

  return (
    <>
      <div className="flex items-center m-4">
        <label
          htmlFor="search-input"
          className="mr-2 text-sm font-medium text-gray-900 dark:text-white"
        >
          Search by name:
        </label>
        <input
          id="search-input"
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Search by name"
          className="w-40 px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
        />
        <p className="text-sm font-medium text-gray-900 pl-2">Order by:</p>
        <button
          className="ml-2 focus:outline-none"
          onClick={handleSortOrderToggle}
        >
          {sortOrder === "ascending" ? (
            <HiArrowUp size={20} />
          ) : (
            <HiArrowDown size={20} />
          )}
        </button>
        <div className="">
          <div className="flex items-center m-2">
            <input
              id="price-slider"
              type="range"
              min={0}
              max={50000}
              value={maxPrice}
              onChange={(e) => setMaxPrice(e.target.value)}
              className="range flex-grow mr-2 bg-gray-700"
            />
            <p className="text-sm font-medium text-gray-900 pl-2">
              {minPrice} - {maxPrice}
            </p>
          </div>
        </div>
      </div>

      <div className="mt-6 grid grid-cols-1 gap-x-6 gap-y-10 lg:grid-cols-4 xl:gap-x-8 w-full lg:w-8/12 md:w-8/12 md:gap-x-10 mx-auto">
        {products.map((product) => (
          <ProductCard
            product={product}
            key={product.cardTitle}
            isAlreadyInCart={product.isAlreadyInCart}
          />
        ))}
      </div>
    </>
  );
};

export default Home;
