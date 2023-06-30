import React, { useContext } from "react";
import { StateContext } from "../components/ContextProvider";
import { useNavigate } from "react-router-dom";

const ShoppingCart = () => {
  const { shoppingCart, setShoppingCart } = useContext(StateContext);
  const navigate = useNavigate();

  const totalPrice = shoppingCart.items.reduce((total, item) => {
    const itemPrice = item.listOfPlans[0]?.price?.amount || 0;
    return total + itemPrice;
  }, 0);

  const handleCheckout = () => {
    setShoppingCart({ items: [] });

    alert("Purchase successful!");

    navigate("/");
  };

  const handleRemoveItem = (item) => {
    const updatedItems = shoppingCart.items.filter(
      (cartItem) => cartItem.cardTitle !== item.cardTitle
    );
    setShoppingCart({ items: updatedItems });
  };

  const handleContinueShopping = () => {
    navigate("/");
  };

  return (
    <div className="md:w-4/6 mx-auto p-4">
      <div className="flex h-full flex-col overflow-y-scroll bg-white shadow-xl">
        <div className="flex-1 overflow-y-auto px-4 py-6 sm:px-6">
          <div className="flex items-start justify-between">
            <h2
              className="text-2xl font-medium text-gray-900"
              id="slide-over-title"
            >
              Checkout & Payment
            </h2>
          </div>
          <div className="mt-8">
            <div className="flow-root">
              <ul role="list" className="-my-6 divide-y divide-gray-200">
                {shoppingCart.items.map((item) => (
                  <li className="flex py-6" key={item.cardTitle}>
                    <div className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-md border border-gray-200">
                      <img
                        src={item.primaryMediaUrl}
                        alt={item.cardTitle}
                        className="h-full w-full object-cover object-center"
                      />
                    </div>

                    <div className="ml-4 flex flex-1 flex-col">
                      <div>
                        <div className="flex justify-between text-base font-medium text-gray-900">
                          <h3>
                            <a href="#">{item.cardTitle}</a>
                          </h3>
                          <p className="ml-4">
                            {item.listOfPlans[0].price.amount},00
                            {item.listOfPlans[0].price.currency}
                          </p>
                        </div>
                        <p className="mt-1 text-sm text-gray-500">
                          {item.color}
                        </p>
                      </div>
                      <div className="flex flex-1 items-end justify-between text-sm">
                        <p className="text-gray-500">
                          Total availible : {item.availableQuantity}
                        </p>

                        <div className="flex">
                          <button
                            onClick={() => handleRemoveItem(item)}
                            type="button"
                            className="font-medium text-indigo-600 hover:text-indigo-500"
                          >
                            Remove
                          </button>
                        </div>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-200 px-4 py-6 sm:px-6">
          <div className="flex justify-between text-base font-medium text-gray-900">
            <p>Subtotal</p>
            <p className="font-extrabold">{totalPrice.toFixed(2)} EUR </p>
          </div>
          <p className="mt-0.5 text-sm text-gray-500">
            Shipping and taxes calculated at checkout.
          </p>
          <div className="mt-6">
            <button
              type="button"
              onClick={handleCheckout}
              className="flex items-center justify-center rounded-md border border-transparent bg-indigo-600 px-6 py-3 text-base font-medium text-white shadow-sm hover:bg-indigo-700"
            >
              Checkout
            </button>
          </div>
          <div className="mt-6 flex justify-center text-center text-sm text-gray-500">
            <p>
              or
              <button
                onClick={handleContinueShopping}
                type="button"
                className="font-medium text-indigo-600 hover:text-indigo-500"
              >
                Continue Shopping
                <span aria-hidden="true"> &rarr;</span>
              </button>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ShoppingCart;
