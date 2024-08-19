import { createBrowserRouter } from "react-router-dom";
import { Game, Home } from "../pages";

export const Routes = createBrowserRouter([
  {
    path: "",
    element: <Home />,
  },
  {
    path: "game",
    element: <Game />,
  },
]);
