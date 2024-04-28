import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";
import { Provider } from "react-redux";
import "./index.css";
import Home from "./pages/Home/Home.jsx";
import Login from "./pages/Login/Login.jsx";
import Signup from "./pages/Signup/Signup.jsx";
import Root from "./pages/Root.jsx";
import UserContextProvider from "./context/UserContextProvider.jsx";
import store from "./Redux/store.js";
import { SocketContextProvider } from "./context/SocketContext.jsx";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<Root />}>
      <Route path="" element={<Home />} />
      <Route path="login" element={<Login />} />
      <Route path="signup" element={<Signup />} />
      {/* <Route path='' element={<Home/>}/>
       */}
    </Route>
  )
);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    {/* <UserContextProvider> */}
    <Provider store={store}>
      <SocketContextProvider>
        <RouterProvider router={router} />
      </SocketContextProvider>
    </Provider>

    {/* </UserContextProvider> */}
  </React.StrictMode>
);
