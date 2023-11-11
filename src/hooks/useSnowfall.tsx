import { ReactNode, useEffect, useMemo, useState } from 'react';
import Snowfall from 'react-snowfall';

type DeviceOrientationEventiOS = DeviceOrientationEvent & {
  requestPermission: () => Promise<'granted' | 'denied'>;
};

type Props = {
  snowflakes: { start: number; max: number };
  speed: { start: [min: number, max: number]; max: [min: number, max: number] };
  wind: { start: [min: number, max: number]; max: [min: number, max: number] };
};

export const useSnowfall = (initial: Props): ReactNode => {
  const [snowflakes, setSnowflakes] = useState(initial.snowflakes.start);
  const [speed, setSpeed] = useState(initial.speed.start);
  const [wind, setWind] = useState(initial.speed.start);

  useEffect(() => {
    let x1 = 0,
      y1 = 0,
      z1 = 0;
    let x2 = 0,
      y2 = 0,
      z2 = 0;

    const handle = (e: DeviceMotionEvent) => {
      x1 = e.accelerationIncludingGravity?.x ?? 0;
      y1 = e.accelerationIncludingGravity?.y ?? 0;
      z1 = e.accelerationIncludingGravity?.z ?? 0;
    };

    const interval = setInterval(() => {
      const hasBeenShook = Math.abs(x1 - x2 + y1 - y2 + z1 - z2) > 30;

      if (hasBeenShook) {
        setSnowflakes((snowflakes) => Math.min(initial.snowflakes.max, snowflakes + 25));
        setSpeed(([min, max]) => [
          Math.min(min + 0.25, initial.speed.max[0]),
          Math.min(max + 0.25, initial.speed.max[1]),
        ]);
        setWind(([min, max]) => [Math.min(min + 0.25, initial.wind.max[0]), Math.min(max + 0.25, initial.wind.max[1])]);
      }

      x2 = x1;
      y2 = y1;
      z2 = z1;
    }, 150);

    if ('requestPermission' in DeviceMotionEvent) {
      void (DeviceMotionEvent as unknown as DeviceOrientationEventiOS).requestPermission().then(() => {
        window.addEventListener('devicemotion', handle);
      });
    } else {
      window.addEventListener('devicemotion', handle);
    }

    return () => {
      window.removeEventListener('devicemotion', handle);
      clearInterval(interval);
    };
  }, [initial]);

  return useMemo(
    () => <Snowfall color="#FFFFFF" snowflakeCount={snowflakes} speed={speed} wind={wind} />,
    [snowflakes, speed, wind],
  );
};
