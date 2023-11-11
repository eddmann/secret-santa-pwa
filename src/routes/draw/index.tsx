import { useLoaderData } from 'react-router-dom';
import { Draw as DrawType } from '../../types';
import { LocalDraw } from './LocalDraw';
import { RemoteDraw } from './RemoteDraw';

export const Draw = () => {
  const draw = useLoaderData() as DrawType;

  if (draw.entry.type === 'local') {
    return <LocalDraw draw={draw} />;
  }

  return <RemoteDraw draw={draw} />;
};
