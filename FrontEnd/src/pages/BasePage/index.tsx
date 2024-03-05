import { Outlet } from "react-router-dom";
import Header from "../../components/Header";
import { Footer } from "../../components/Footer";

export const BasePage = () => {
  return (
    <>
      <Header />
      <main>
        <Outlet />
      </main>
      <Footer />
    </>
  );
};
