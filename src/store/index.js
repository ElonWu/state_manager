import { GlobalProvider } from './Provider';

// 数据相关
import countStore from './stores/count';
// UI 相关
import mediaQueryStore from './stores/mediaQuery';

// 挂载 stores 到 prodvider
export const stores = [countStore, mediaQueryStore];

export const Provider = (props) => (
  <GlobalProvider {...props} stores={stores} />
);

export { useStore, useDispatch, useData } from './Provider';
