import { createContext, useContext, useState } from "react";

const MatchContext = createContext();

export function MatchProvider({ children }) {
  const [matchResult, setMatchResult] = useState(null);

  const resetMatch = () => {
    setMatchResult(null);
  };

  return (
    <MatchContext.Provider value={{ matchResult, setMatchResult, resetMatch }}>
      {children}
    </MatchContext.Provider>
  );
}

export const useMatch = () => useContext(MatchContext);
