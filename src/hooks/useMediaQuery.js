import { useCallback, useEffect } from 'react';
import { debounce } from 'lodash';

import { useGlobal } from '../store';

const useWatchMediaQuery = (limits = [767, 1024, 1360, 1919]) => {
  const { data: matchList, dispatch } = useGlobal('MediaQuery');

  const setMatchList = useCallback(
    (payload, tag) => {
      console.log({ tag }); // 开发时验证判断了几次
      dispatch({ type: 'update', payload });
    },
    [dispatch],
  );

  useEffect(() => {
    const mediaQueryStrList = genMediaQueryStr(limits);

    if (!mediaQueryStrList?.length) return;

    const mediaList = mediaQueryStrList.map(window.matchMedia);

    // 首次判断
    if (matchList.every((match) => match === false)) {
      setMatchList(
        mediaList.map((m) => m.matches),
        'first',
      );
    }

    // 保存全部监听函数， 用于移除监听
    const onChangeList = mediaQueryStrList.map((_, i) => {
      // 防抖
      const onChange = debounce((ev) => {
        if (ev.matches) {
          // 只有一个 true, 无需更细致的判断
          let newMatchList = new Array(mediaQueryStrList.length).fill(false);
          newMatchList[i] = true;

          setMatchList(newMatchList, i);
        }
      }, 100);

      // 监听变化
      mediaList[i].addEventListener('change', onChange);
      return onChange;
    });

    return () => {
      // 卸载 hook 时移除监听
      mediaList.forEach((currMedia, i) =>
        currMedia.removeEventListener('change', onChangeList[i]),
      );
    };
  }, [matchList, setMatchList, limits]);

  return matchList;
};

function genMediaQueryStr(list) {
  let result = [];
  if (!Array.isArray(list) || list.length === 0) return result;

  // 去重 => 只保留数字 => 排序
  const limits = Array.from(new Set(list))
    .map((el) => Number(el))
    .filter((el) => !isNaN(el) && el > 0)
    .sort((a, b) => a - b);

  if (limits.length === 0) return result;

  // 第一个分割点
  result.push(`(max-width: ${limits[0]}px)`);

  // 中间点
  for (let i = 0; i < limits.length - 1; i++) {
    result.push(
      `(min-width: ${limits[i] + 1}px) and (max-width: ${limits[i + 1]}px)`,
    );
  }

  // 结束点
  result.push(`(min-width: ${limits[limits.length - 1] + 1}px)`);

  return result;
}

export default useWatchMediaQuery;
