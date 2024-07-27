import styled from "styled-components";
import WeatherWidget from "./components/WeatherWidget";

const AppContainer = styled.div`
  text-align: center;
  padding: 20px;
  color: white;
`;

const Title = styled.h1`
  font-size: 2em;
`;

function App() {
  return (
    <AppContainer>
      <Title>Backwash Weather</Title>
      <WeatherWidget />
    </AppContainer>
  );
}

export default App;
