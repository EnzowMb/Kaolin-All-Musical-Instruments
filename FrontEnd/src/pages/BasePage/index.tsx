import { Outlet } from "react-router-dom";
import Header from "../../components/Header";

export const BasePage = () => {
  return (
    <>
      <Header />
      <main>
        <Outlet />
      </main>
    </>
  );
};
