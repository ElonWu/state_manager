// 初始值
const initialValue = { state: "logout" };

// 更新
const reducers = {
  async login(draft, payload) {
    draft.state = "login";
    draft.user = payload;
  },
  logout(draft, payload) {
    draft.state = "logout";
    draft.user = null;
  }
};

// store
const userStore = {
  key: "User",
  initialValue,
  reducers
};

export default userStore;
