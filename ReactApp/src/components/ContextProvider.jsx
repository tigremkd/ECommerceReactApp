import { Children, createContext, useContext, useState } from "react";

export const StateContext = createContext();

const ContextProvider = ({ children }) => {
  const initialState = {
    items: [],
  };

  const [shoppingCart, setShoppingCart] = useState(initialState);

  return (
    <StateContext.Provider value={{ shoppingCart, setShoppingCart }}>
      {children}
    </StateContext.Provider>
  );
};

export default ContextProvider;
