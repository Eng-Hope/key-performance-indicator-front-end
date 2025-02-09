import React, { ReactNode } from "react";
import HomeNavBar from "../_components/home_nav";
import Footer from "../_components/footer";

const HomeLayout = ({ children }: { children: ReactNode }) => {
  return (
    <div className="w-screen h-screen">
      <HomeNavBar />
      {children}
      <Footer />
    </div>
  );
};

export default HomeLayout;