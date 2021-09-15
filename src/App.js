// hooks
import useWatchMediaQuery from './hooks/useMediaQuery';
// compoennts
import { Manager, Consume, MediaConsume } from './pages/Home';

export default function App() {
  // 启用自适应监听
  useWatchMediaQuery();

  return (
    <div className="App">
      <Manager />
      <Consume />
      <MediaConsume />
    </div>
  );
}
