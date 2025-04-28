// import { useState } from 'react'
// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./pages/Layout";
import Home from "./pages/Home";
import Services from "./pages/Services";
import DashBoard from "./pages/DashBoard";
import NoPage from "./pages/NoPage";
import SignUp from "./components/SignUp";
import { Provider } from "./provider/Provider";

import 'flowbite';

function App() {
  return (
    <Provider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="services" element={<Services />} />
            <Route path="dashboard" element={<DashBoard />} />
            <Route path="signup" element={<SignUp />} />
            <Route path="*" element={<NoPage />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </Provider>
  );
}

export default App;