import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

// import Home from "./components/home";
import NotFound from "./components/notFound";
import Footer from "@/components/layout/footer";
import ClientForm from "./components/client/ClientForm";
import ClientList from "./components/admins/ClientList";

import Navbar from "@/components/layout/Navbar";
import Home from "@/pages/Home";
import Products from "@/pages/Products";
import Categories from "@/pages/Categories";
import Contact from "@/pages/Contact";
import Account from "@/pages/Account";
//import Layout from "./components/layout/layout.js";

const App = () => {
  return (
    <Router>
      {/* <Layout> */}
        <Navbar />
        <Routes>

          <Route path="*" element={<NotFound />} />
          <Route path="/" element={<Home />} />
          <Route path="/footer" element={<Footer />} />
           <Route path="/ClientForm" element={<ClientForm />} />
            <Route path="/ClientList" element={<ClientList />} />
             <Route path="/products" element={<Products />} />
        <Route path="/categories" element={<Categories />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/account" element={<Account />} />
          
        </Routes>
         <Footer />
      {/* </Layout> */}
    </Router>
  );
};

export default App;

