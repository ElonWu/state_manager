import useWatchMediaQuery from './hooks/useMediaQuery';
import { Manager1, Manager2, Consume1, Consume2 } from './pages/Home';

export default function App() {
  const [isMobile, isTablet, isPC, isWideMonitor, isHugeScreen] =
    useWatchMediaQuery();

  return (
    <div className="App">
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

      <Manager1 />
      <Manager2 />

      <Consume1 />
      <Consume2 />
    </div>
  );
}
