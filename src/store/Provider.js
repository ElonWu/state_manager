import React, { useMemo } from "react";
import { useImmerReducer } from "use-immer";

import createContext from "../hooks/createContext";
import duplicate from "../utils/duplicate";


const { Provider, useContext } = createContext("global");

export const useGlobalContext = (key) => {
  const [value, dispatch] = useContext();

  return {
    data: value?.[key],
    dispatch: ({ type, payload }) => dispatch({ key, type, payload })
  };
};

export const GlobalProvider = ({ stores, children }) => {
  const { reducer, initialValue } = useMemo(() => {
    if (!Array.isArray(stores)) {
      return { reducer: () => null, initialValue: {} };
    }

    const duplicateKeys = duplicate(stores.map(store => store.key));

    if (duplicateKeys.length > 0) {
      console.error(`重复的key: ${duplicateKeys.join(";")}`);
      return { reducer: () => null, initialValue: {} };
    }

    // 合并后的 reducer;
    const reducer = (draft, { key, type, payload }) => {
      const matchedStore = stores.find((store) => store.key === key);

      const dispatchReducer = matchedStore?.reducers?.[type];

      if (!matchedStore || typeof dispatchReducer !== "function") {
        console.error(`${key}/${type} 未匹配到合法的 reducer`);
      } else {
        const dispatchDraft = draft[matchedStore.key];
        dispatchReducer(dispatchDraft, payload);
      }
    };

    // 初始值
    const initialValue = {};
    stores.forEach(({ key, initialValue: value }) => {
      initialValue[key] = value;
    });

    return { reducer, initialValue };
  }, [stores]);

  const store = useImmerReducer(reducer, initialValue);

  return <Provider value={store}>{children}</Provider>;
};