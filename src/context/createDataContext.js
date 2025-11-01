import React, { useReducer, useMemo } from "react";

export default (reducer, actions, defaultValue) => {
  const Context = React.createContext();

  const Provider = ({ children }) => {
    const [state, dispatch] = useReducer(reducer, defaultValue);

    const boundActions = useMemo(() => {
      const bound = {};
      for (let key in actions) {
        bound[key] = actions[key](dispatch);
      }
      return bound;
      // actions is a closure variable and is stable, dispatch is stable from useReducer
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [dispatch]);

    const value = useMemo(
      () => ({ state, ...boundActions }),
      [state, boundActions]
    );

    return (
      <Context.Provider value={value}>
        {children}
      </Context.Provider>
    );
  };

  return { Context, Provider };
};
