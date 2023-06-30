import {
  createBrowserRouter,
  RouterProvider,
  createRoutesFromElements,
  Route,
} from "react-router-dom";
import Layout from "./components/Layout";
import Home from "./pages/Home";
import ErrorPage from "./pages/ErrorPage";
import Details from "./pages/Details";
import ShoppingCart from "./pages/ShoppingCart";

function App() {
  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route errorElement={<ErrorPage />} path="/" element={<Layout />}>
        <Route index element={<Home />}></Route>
        <Route path="/details/:cardTitle" element={<Details />}></Route>
        <Route path="/shoppingCart" element={<ShoppingCart />}></Route>
      </Route>
    )
  );

  return (
    <div>
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
