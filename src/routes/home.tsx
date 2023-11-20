import { useNavigate } from 'react-router-dom';
import { useAppDispatch } from '../store/hooks';
import { startLocalDraw, startRemoteDraw } from '../store/entry';
import { Button } from '../components/Button';
import styled, { keyframes } from 'styled-components';
import SantaVector from '../assets/santa.svg?react';
import { useSnowfall } from '../hooks/useSnowfall';

const slideUp = keyframes`
  from {
    transform: translateY(200px);
  }
  to {
    transform: translateY(65px);
  }
`;

const slideDown = keyframes`
  from {
    transform: translateY(-200px);
  }
  to {
    transform: translateY(0px);
  }
`;

const Title = styled.h1`
  margin: 2rem auto 0;
  height: 15vh;

  img {
    height: 100%;
  }
`;

const SantaRoot = styled.div`
  position: fixed;
  inset: auto 0 0;
  display: flex;
  justify-content: center;
  transform: translateY(65px);
  animation: ${slideUp} 1s ease;
`;

const Santa = styled(SantaVector)`
  height: 50vh;
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
      <SantaRoot>
        <Santa />
      </SantaRoot>
      {Snowfall}
    </>
  );
};
