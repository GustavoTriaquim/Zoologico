import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import styled from "styled-components";
import Navbar from "./components/Navbar";
import ListaAnimais from "./components/ListaAnimais";
import ListaCuidados from "./components/ListaCuidados";

const AppContainer = styled.div`
  background-color: #f5f5f5;
  min-height: 100vh;
`;

const App = () => {
  return (
    <Router>
      <AppContainer>
        <Navbar />
        <Routes>
          <Route path="/" element={<ListaAnimais />} />
          <Route path="/cuidados" element={<ListaCuidados />} />
        </Routes>
      </AppContainer>
    </Router>
  );
}

export default App;