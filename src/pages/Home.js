import { useCallback } from 'react';
import { useGlobal } from '../store';

export const Manager1 = () => {
  const {
    data: { count },
    dispatch: countDispatch,
  } = useGlobal('Count');

  const login = useLogin();

  return (
    <div>
      <h3>manager: {count}</h3>
      <button onClick={() => countDispatch({ type: 'plus' })}>PLUS</button>
      <button onClick={() => countDispatch({ type: 'subtract' })}>
        SUBTRACT
      </button>

      <button onClick={login}>登录</button>
    </div>
  );
};

export const Manager2 = () => {
  const {
    data: { count },
    dispatch: countDispatch,
  } = useGlobal('Count');
  const { dispatch: userDispatch } = useGlobal('User');

  return (
    <div>
      <h3>manager: {count}</h3>

      <button onClick={() => countDispatch({ type: 'plus' })}>PLUS</button>
      <button onClick={() => countDispatch({ type: 'subtract' })}>
        SUBTRACT
      </button>

      <button onClick={() => userDispatch({ type: 'logout' })}>退出</button>
    </div>
  );
};

export const Consume1 = () => {
  const {
    data: { count },
  } = useGlobal('Count');
  const {
    data: { state, user },
  } = useGlobal('User');

  return (
    <div>
      <h3>
        Consume1: {count}; userState:{' '}
        {state === 'logout' ? '登出' : `${user?.name}-登入`}
      </h3>
    </div>
  );
};

export const Consume2 = () => {
  const {
    data: { count },
  } = useGlobal('Count');
  const {
    data: { state, user },
  } = useGlobal('User');

  const {
    data: [isMobile, isTablet, isPC, isWideMonitor],
  } = useGlobal('MediaQuery');

  return (
    <div>
      <div>
        {isMobile
          ? '手机'
          : isTablet
          ? '平板'
          : isPC
          ? 'PC'
          : isWideMonitor
          ? '大显示器'
          : '大屏'}
      </div>

      <h3>
        Consume2: {count}; userState:{' '}
        {state === 'logout' ? '登出' : `${user?.name}-登入`}
      </h3>
    </div>
  );
};

const mockLogin = () =>
  new Promise((resolve) => {
    setTimeout(() => resolve({ name: 'elonwu' }), 2000);
  });

const useLogin = () => {
  const { dispatch } = useGlobal('User');

  const login = useCallback(async () => {
    const user = await mockLogin();
    dispatch({ type: 'login', payload: user });
  }, []);

  return login;
};
