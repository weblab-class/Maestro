import React from "react";
import ReactDOM from "react-dom/client";
import App from "./components/App";
import "./utilities.css";

import Composer from "./components/pages/Composer";
import NotFound from "./components/pages/NotFound";
// import GuyCreator from "./components/pages/GuyCreator";
import Search from "./components/pages/Search";
import ProfileCard from "./components/pages/ProfileCard";

import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";

import { GoogleOAuthProvider } from "@react-oauth/google";
import NewSoundMaker from "./components/pages/NewSoundMaker";

//TODO: REPLACE WITH YOUR OWN CLIENT_ID
const GOOGLE_CLIENT_ID = "755479868382-tunoraa77oa1skp6dg05m3g0ttvho489.apps.googleusercontent.com";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route errorElement={<NotFound />} element={<App />}>
      <Route path="/" element={<Composer />} />
      <Route path="/search" element={<Search />} />
      <Route path="/guycreator" element={<NewSoundMaker />} />
      <Route path="/profile/:userId" element={<ProfileCard />} />
      <Route path="/profile" element={<ProfileCard />} />
    </Route>
  )
);

// renders React Component "Root" into the DOM element with ID "root"
ReactDOM.createRoot(document.getElementById("root")).render(
  <GoogleOAuthProvider clientId={GOOGLE_CLIENT_ID}>
    <RouterProvider router={router} />
  </GoogleOAuthProvider>
);
