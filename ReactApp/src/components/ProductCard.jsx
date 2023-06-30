import React from "react";
import { NavLink } from "react-router-dom";

const ProductCard = ({ product, isAlreadyInCart }) => {
  return (
    <NavLink to={`/details/${product.cardTitle}`}>
      <div className="group relative">
        <div className="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-md bg-gray-200 lg:aspect-none group-hover:opacity-75 lg:h-80 ">
          <img
            src={product.primaryMediaUrl}
            alt="Product image."
            className="object-cover object-center lg:h-full lg:w-full "
          />
        </div>
        <div className="mt-4 flex justify-between">
          <div>
            <h3 className="text-sm text-gray-700">
              <span aria-hidden="true" className="absolute inset-0"></span>
              {product.cardTitle}
            </h3>
            <p className="mt-1 text-sm text-gray-500">
              {product.cardDescription}
            </p>
          </div>
          <p className="text-sm font-medium text-gray-900">
            {product.listOfPlans[0].price.amount},00
            {product.listOfPlans[0].price.currency}
          </p>
        </div>
        <div>
          <p className="text-sm font-medium text-gray-900">
            Available count : {product.availableQuantity}
          </p>
          {isAlreadyInCart && (
            <p className="text-sm font-medium text-red-700">
              Items is in your cart.
            </p>
          )}
        </div>
      </div>
    </NavLink>
  );
};

export default ProductCard;
