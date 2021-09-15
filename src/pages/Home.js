import { useStore, useDispatch, useData } from '../store';

export const Manager = () => {
  // 触发数据更新
  const countDispatch = useDispatch('Count');

  return (
    <div>
      <button onClick={() => countDispatch({ type: 'plus' })}>PLUS</button>
      <button onClick={() => countDispatch({ type: 'subtract' })}>
        SUBTRACT
      </button>
    </div>
  );
};
export const Consume = () => {
  // 消费数据
  const { count } = useData('Count');

  return <h3> Consume: {count} </h3>;
};

export const MediaConsume = () => {
  // 消费自适应监听结果
  const [isMobile, isTablet, isPC, isWideMonitor, isHugeScreen] =
    useData('MediaQuery');

  return (
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
  );
};
