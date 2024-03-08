import styled from "styled-components";

import { Outlet } from "react-router-dom";
import Header from "../../components/Header";
import { Footer } from "../../components/Footer";

export const BasePage = () => {
  const Main = styled.main`
    background: linear-gradient(var(--background-theme) 35%, #858e5f);
  `;

  return (
    <>
      <Header />
      <Main>
        <Outlet />
      </Main>
      <Footer />
    </>
  );
};
