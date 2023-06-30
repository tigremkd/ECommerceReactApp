import { useState, useEffect, useContext } from "react";
import { StarIcon } from "@heroicons/react/20/solid";
import { useNavigate, useParams } from "react-router-dom";
import data from "../data/products.json";
import { StateContext } from "../components/ContextProvider";

const reviews = { href: "#", average: 4, totalCount: 117 };

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function Details() {
  const [productData, setProductData] = useState(null);
  const [isDisabled, setIsDisabled] = useState(false);
  const params = useParams();
  const navigate = useNavigate();
  const { shoppingCart, setShoppingCart } = useContext(StateContext);

  useEffect(() => {
    const item = data.find((x) => x.cardTitle === params.cardTitle);
    setProductData(item);
    const isInCart = shoppingCart.items.find(
      (x) => x.cardTitle === params.cardTitle
    );
    setIsDisabled(!!isInCart); // Set isDisabled based on whether the item is already in the cart
  }, [params.id, shoppingCart.items]);

  const handleAddToCart = () => {
    const isInCart = shoppingCart.items.find(
      (item) => item.cardTitle === productData.cardTitle
    );

    if (isInCart) {
      console.log("Product is already in the cart");
      return;
    }

    const updatedCart = {
      ...shoppingCart,
      items: [...shoppingCart.items, productData],
    };

    setShoppingCart(updatedCart);
    setIsDisabled(true); // Disable the button after adding the item to the cart
    navigate("/");
  };

  return (
    <div className="bg-white">
      {productData && (
        <div className="pt-6">
          {/* Image gallery */}
          <div className="mx-auto mt-6 max-w-2xl sm:px-6 lg:grid lg:max-w-7xl lg:grid-cols-3 lg:gap-x-8 lg:px-8">
            <div className="aspect-h-4 aspect-w-3 hidden overflow-hidden rounded-lg lg:block">
              <img
                src={productData.primaryMediaUrl}
                alt={productData.cardTitle}
                className="h-full w-full object-cover object-center"
              />
            </div>
            <div className="hidden lg:grid lg:grid-cols-1 lg:gap-y-8">
              <div className="aspect-h-2 aspect-w-3 overflow-hidden rounded-lg">
                <img
                  src={productData.primaryMediaUrl}
                  alt={productData.cardTitle}
                  className="h-full w-full object-cover object-center"
                />
              </div>
              <div className="aspect-h-2 aspect-w-3 overflow-hidden rounded-lg">
                <img
                  src={productData.primaryMediaUrl}
                  alt={productData.cardTitle}
                  className="h-full w-full object-cover object-center"
                />
              </div>
            </div>
            <div className="aspect-h-5 aspect-w-4 lg:aspect-h-4 lg:aspect-w-3 sm:overflow-hidden sm:rounded-lg">
              <img
                src={productData.primaryMediaUrl}
                alt={productData.cardTitle}
                className="h-full w-full object-cover object-center"
              />
            </div>
          </div>

          {/* Product info */}
          <div className="mx-auto max-w-2xl px-4 pb-16 pt-10 sm:px-6 lg:grid lg:max-w-7xl lg:grid-cols-3 lg:grid-rows-[auto,auto,1fr] lg:gap-x-8 lg:px-8 lg:pb-24 lg:pt-16">
            <div className="lg:col-span-2 lg:border-r lg:border-gray-200 lg:pr-8">
              <h1 className="text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl">
                {productData.cardTitle}
              </h1>
            </div>

            {/* Options */}
            <div className="mt-4 lg:row-span-3 lg:mt-0">
              <h2 className="sr-only">Product information</h2>
              <p className="text-3xl tracking-tight text-gray-900">
                {productData.listOfPlans[0].price.amount},00
                {productData.listOfPlans[0].price.currency}
              </p>

              {/* Reviews */}
              <div className="mt-6">
                <h3 className="sr-only">Reviews</h3>
                <div className="flex items-center">
                  <div className="flex items-center">
                    {[0, 1, 2, 3, 4].map((rating) => (
                      <StarIcon
                        key={rating}
                        className={classNames(
                          reviews.average > rating
                            ? "text-gray-900"
                            : "text-gray-200",
                          "h-5 w-5 flex-shrink-0"
                        )}
                        aria-hidden="true"
                      />
                    ))}
                  </div>
                  <p className="sr-only">{reviews.average} out of 5 stars</p>
                  <a
                    href={reviews.href}
                    className="ml-3 text-sm font-medium text-indigo-600 hover:text-indigo-500"
                  >
                    {reviews.totalCount} reviews
                  </a>
                </div>
              </div>

              <div className="mt-10">
                <button
                  disabled={isDisabled}
                  onClick={handleAddToCart}
                  type="submit"
                  className="mt-10 flex w-full items-center justify-center rounded-md border border-transparent bg-indigo-600 px-8 py-3 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 disabled:bg-gray-700"
                >
                  Add to Cart
                </button>
              </div>
            </div>

            <div className="py-10 lg:col-span-2 lg:col-start-1 lg:border-r lg:border-gray-200 lg:pb-16 lg:pr-8 lg:pt-6">
              {/* Description and details */}
              <div>
                <h3 className="sr-only">Description</h3>

                <div className="space-y-6">
                  <p className="text-base text-gray-900">
                    {productData.cardDescription}
                  </p>
                </div>
              </div>

              <div className="mt-10">
                <h2 className="text-sm font-medium text-gray-900">Details</h2>

                <div className="mt-4 space-y-6">
                  <p className="text-sm text-gray-600">
                    {productData.cardDescription}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
