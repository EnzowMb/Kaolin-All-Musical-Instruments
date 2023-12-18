import { Outlet } from "react-router-dom";
import Header from "../../components/Header";
import { Footer } from "../../components/Footer";
import UserProvider, { UserContext } from "../../contexts/UserContext";
import { useContext, useState } from "react";

export const BasePage = () => {
  const { user, setUser } = useContext(UserContext);

  return (
    <>
      <UserProvider>
        <Header />
        <main>
          <Outlet />
        </main>
        <Footer />
      </UserProvider>
    </>
  );
};
