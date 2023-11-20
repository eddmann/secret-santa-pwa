import { useNavigate } from 'react-router-dom';
import { useAppDispatch } from '../store/hooks';
import { startLocalDraw, startRemoteDraw } from '../store/entry';
import { Button } from '../components/Button';
import styled, { keyframes } from 'styled-components';
import { useSnowfall } from '../hooks/useSnowfall';
import { SantaPopup } from '../components/SantaPopup';

const slideDown = keyframes`
  from {
    transform: translateY(-200px);
  }
  to {
    transform: translateY(0px);
  }
`;

const Title = styled.h1`
  margin: 2rem auto 1rem;
  height: 15vh;

  img {
    height: 100%;
  }
`;

const NavigationRoot = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.padding.l};
  animation: ${slideDown} 1s ease;
`;

const DrawRoot = styled.div`
  display: flex;
  flex-direction: row;
  gap: ${({ theme }) => theme.spacing.padding.m};
`;

export const Home = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const Snowfall = useSnowfall({
    snowflakes: {
      start: 200,
      max: 500,
    },
    speed: {
      start: [1.0, 3.0],
      max: [4.0, 10.0],
    },
    wind: {
      start: [-1, 1],
      max: [4.0, 7.0],
    },
  });

  return (
    <>
      <NavigationRoot>
        <Title>
          <img src="title.png" />
        </Title>
        <DrawRoot>
          <Button
            title="Local"
            variant="large"
            onClick={() => {
              dispatch(startLocalDraw());
              navigate(`/entry/participants`);
            }}
          />
          <Button
            title="Remote"
            variant="large"
            onClick={() => {
              dispatch(startRemoteDraw());
              navigate(`/entry/participants`);
            }}
          />
        </DrawRoot>
        <Button
          title="History"
          variant="large"
          onClick={() => {
            navigate(`/draws`);
          }}
        />
      </NavigationRoot>
      <SantaPopup />
      {Snowfall}
    </>
  );
};
