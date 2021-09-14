// 初始值
const initialValue = [false, false, false, false];

// 更新
const reducers = {
  update(draft, payload = []) {
    console.log({ mediaUpdate: payload });
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
