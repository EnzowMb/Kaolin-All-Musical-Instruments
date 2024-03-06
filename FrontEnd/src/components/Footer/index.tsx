import styled from "styled-components";
import linkedin from "./assets/linkedin.png";
import instagram from "./assets/instagram.png";

const StyledFooter = styled.footer`
  display: flex;
  flex-direction: column;
  height: 100%;
  color: white;
  padding: 1em;
  background-color: var(--cor-secundaria);
  text-align: center;
`;

const StyledSocialMedia = styled.div`
  display: flex;
  justify-content: center;
  width: 50%;
  margin: 0.5em auto;
`;

const StyledTextArea = styled.div`
  text-align: center;
`;

const StyledItem = styled.li`
  list-style-type: none;
  padding: 0.5rem;
`;

export const Footer = () => {
  return (
    <StyledFooter>
      <StyledSocialMedia>
        <StyledItem>
          <a
            href="https://www.linkedin.com/in/enzo-martinelli-brunozi-404b23229/"
            target="_blank"
            rel="noreferrer"
          >
            <img src={linkedin} alt="logo do whatsapp" />
          </a>
        </StyledItem>
        <StyledItem>
          <a
            href="https://www.instagram.com/enzow.mb/"
            target="_blank"
            rel="noreferrer"
          >
            <img src={instagram} alt="logo do instagram" />
          </a>
        </StyledItem>
      </StyledSocialMedia>
      <StyledTextArea>
        <p>
          2023 © Desenvolvido por Enzo Martinelli Brunozi | Projeto fictício sem
          fins comerciais.
        </p>
        <p>Espero que goste :D</p>
      </StyledTextArea>
    </StyledFooter>
  );
};
