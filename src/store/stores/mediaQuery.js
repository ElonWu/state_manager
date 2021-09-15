// 初始值
const initialValue = [];

// 更新
const reducers = {
  update(draft, payload = []) {
    payload.forEach((value, i) => (draft[i] = value));
  },
};

// store
const mediaQueryStore = {
  key: 'MediaQuery',
  initialValue,
  reducers,
};

export default mediaQueryStore;
