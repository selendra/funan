import { useState, useEffect, useRef } from 'react';
import { useStaking } from '../context/StakingContext';

export function useEraTimeLeft() {
  const { sessionEra, getEraTimeLeft } = useStaking();

  // store era time left as state object
  const [eraTimeLeft, _setEraTimeLeft] = useState(0);

  const eraTimeLeftRef = useRef(eraTimeLeft);
  const setEraTimeLeft = (_timeleft) => {
    _setEraTimeLeft(_timeleft);
    eraTimeLeftRef.current = _timeleft;
  };
  // update time left every second
  // clears and resets interval on `eraProgress` update.
  useEffect(() => {
    let timeleftInterval;
    setEraTimeLeft(getEraTimeLeft());

    timeleftInterval = setInterval(() => {
      setEraTimeLeft(eraTimeLeftRef.current - 1);
    }, 1000);
    
    return () => {
      clearInterval(timeleftInterval);
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [sessionEra]);

  return eraTimeLeftRef.current;
}