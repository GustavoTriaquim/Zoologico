import styled from "styled-components";
import { Link } from "react-router-dom";

const NavbarContainer = styled.nav`
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  padding: 1rem 2rem;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const Logo = styled.h1`
  color: white;
  margin: 0;
  font-size: 1.8rem;
  font-weight: 700;
`;

const NavLinks = styled.div`
  display: flex;
  gap: 2rem;
`;

const StyledLink = styled(Link)`
  color: white;
  text-decoration: none;
  font-weight: 600;
  font-size: 1rem;
  transition: all 0.3s ease;
  padding: 0.5rem 1rem;
  border-radius: 4px;

  &:hover {
    background-color: rgba(255, 255, 255, 0,2);
    transform: translateY(-2px);
  }
`;

function Navbar() {
  return(
    <NavbarContainer>
      <Logo>🐾 Zoo PetCare</Logo>
      <NavLinks>
        <StyledLink to="/">Animais</StyledLink>
        <StyledLink to="/cuidados">Cuidados</StyledLink>
      </NavLinks>
    </NavbarContainer>
  );
}

export default Navbar;