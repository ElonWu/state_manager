import { useGlobalContext, GlobalProvider } from './Provider';

// 数据相关
import countStore from './stores/count';
import userStore from './stores/user';

// UI 相关
import mediaQueryStore from './stores/mediaQuery';

export const stores = [countStore, userStore, mediaQueryStore];

export const Provider = (props) => (
  <GlobalProvider {...props} stores={stores} />
);
export const useGlobal = useGlobalContext;
