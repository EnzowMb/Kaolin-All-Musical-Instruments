import { Outlet } from "react-router-dom";
import Header from "../../components/Header";
import { Footer } from "../../components/Footer";
import UserProvider, { UserContext } from "../../contexts/UserContext";

export const BasePage = () => {
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
