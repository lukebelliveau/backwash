import { useState } from "react";
import styled from "styled-components";

const AppContainer = styled.div`
  text-align: center;
  padding: 20px;
`;

const Title = styled.h1`
  color: #333;
  font-size: 2em;
`;

const Button = styled.button`
  background-color: #4caf50;
  border: none;
  color: white;
  padding: 15px 32px;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  font-size: 16px;
  margin: 4px 2px;
  cursor: pointer;
`;

function App() {
  const [count, setCount] = useState(0);

  return (
    <AppContainer>
      <Title>Welcome to Backwash</Title>
      <Button onClick={() => setCount((count) => count + 1)}>
        Count is {count}
      </Button>
    </AppContainer>
  );
}

export default App;
