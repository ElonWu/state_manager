// 初始值
const initialValue = { count: 99 };

// 更新
const reducers = {
  plus(draft, payload = 1) {
    draft.count += payload;
  },
  subtract(draft, payload = 1) {
    draft.count -= payload;
  }
};

// store
const countStore = {
  key: "Count",
  initialValue,
  reducers
};

export default countStore;
