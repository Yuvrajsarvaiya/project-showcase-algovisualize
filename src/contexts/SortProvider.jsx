import * as React from "react";

import { algorithmReducer } from "../reducers/AlgoReducer";

const SortContext = React.createContext();

export default function SortProvider({ initialState = {}, children }) {
  const [state, dispatch] = React.useReducer(algorithmReducer, initialState);

  return (
    <SortContext.Provider value={[state, dispatch]}>
      {children}
    </SortContext.Provider>
  );
}

function useAlgoSort() {
  const context = React.useContext(SortContext);
  if (context === undefined) {
    throw new Error("useAlgoSort must be used within SortProvider");
  }
  return context;
}

export { useAlgoSort };
