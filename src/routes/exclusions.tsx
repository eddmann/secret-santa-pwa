import { useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import { useEffect, useState } from 'react';
import { entrySelector, toggleExclusion } from '../store/entry';
import { Participant } from '../types';
import { clearDrawStatus, draw, drawStatusSelector } from '../store/draws';
import ArrowIcon from '../assets/arrow.svg?react';
import styled, { css, keyframes } from 'styled-components';
import { Header } from '../components/Header';
import { Content } from '../components/Content';
import { FooterAction } from '../components/FooterAction';
import { Description } from '../components/Description';

const BackIcon = styled(ArrowIcon)`
  transform: rotate(180deg);
`;

const Participants = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.padding.m};
`;

const Exclusion = styled.div`
  display: flex;
  gap: ${({ theme }) => theme.spacing.padding.m};
`;

const ExclusionButton = styled.button<{ $isExcluded: boolean }>`
  background: ${({ theme }) => theme.colors.text};
  border: 2px solid #000;
  font-size: ${({ theme }) => theme.typography.size.m};
  outline: none;
  letter-spacing: 0.01rem;
  color: #000;
  line-height: ${({ theme }) => theme.typography.size.m};
  padding: ${({ theme }) => theme.spacing.padding.s};
  cursor: pointer;
  box-shadow:
    1px 1px 0 0,
    2px 2px 0 0,
    3px 3px 0 0,
    4px 4px 0 0,
    5px 5px 0 0;
  transition:
    box-shadow 150ms,
    transform 150ms;

  &:active {
    transform: translateY(2px) translateX(2px);
    box-shadow: none;
  }

  ${({ $isExcluded }) =>
    $isExcluded &&
    css`
      text-decoration: line-through;
    `}
`;

const Number = styled.div`
  background: rgba(0 0 0 / 15%);
  padding: ${({ theme }) => theme.spacing.padding.s};
  line-height: ${({ theme }) => theme.typography.size.s};
  border-radius: 50%;
  width: 1rem;
  height: 1rem;
  text-align: center;
`;

const ExclusionDetails = styled.div`
  overflow: hidden;
`;

const Name = styled.div`
  margin-top: ${({ theme }) => theme.spacing.padding.xs};
`;

const ExclusionList = styled.div`
  display: flex;
  gap: ${({ theme }) => theme.spacing.padding.m};
  margin-top: ${({ theme }) => theme.spacing.padding.m};
  overflow-y: scroll;
  padding: 0 ${({ theme }) => theme.spacing.padding.m} ${({ theme }) => theme.spacing.padding.m} 0;

  &::-webkit-scrollbar {
    display: none;
  }
`;

const shake = keyframes`
  0% { transform: translateX(0) }
  25%, 75% { transform: translateX(5px) }
  50% { transform: translateX(-5px) }
  100% { transform: translateX(0) }
`;

const DrawFooterAction = styled(FooterAction)<{ $hasError: boolean }>`
  ${({ $hasError }) =>
    $hasError &&
    css`
      animation: ${shake} 250ms ease;
    `}
`;

export const Exclusions = () => {
  const entry = useAppSelector(entrySelector);
  const drawStatus = useAppSelector(drawStatusSelector);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [drawError, setDrawError] = useState('');

  useEffect(() => {
    if (entry.title === '' || entry.participants.length < 3) {
      navigate('/entry/participants');
    }
  }, [entry, navigate]);

  useEffect(() => {
    if (drawStatus.type === 'failed') {
      setDrawError(drawStatus.reason);
    }
  }, [drawStatus]);

  useEffect(() => {
    if (drawStatus.type === 'drawn') {
      dispatch(clearDrawStatus());
      navigate(`/draw/${drawStatus.id}`, { replace: true });
    }
  }, [drawStatus, navigate, dispatch]);

  const handleNext = () => {
    void dispatch(draw(entry));
  };

  const handleExclusion = (participant: Participant, exclusion: Participant) => () => {
    setDrawError('');
    dispatch(toggleExclusion({ participant, exclusion }));
  };

  return (
    <>
      <Header
        title="Exclusions"
        icon={<BackIcon />}
        onClick={() => {
          navigate('/entry/participants');
        }}
      />
      <Content>
        <Description>Should someone not be a participants Secret Santa?</Description>

        <Participants>
          {entry.participants.map((name, idx) => (
            <Exclusion key={name}>
              <div>
                <Number>{idx + 1}</Number>
              </div>
              <ExclusionDetails>
                <Name>{name}</Name>
                <ExclusionList>
                  {entry.participants
                    .filter((participant) => participant !== name)
                    .map((exclusion) => (
                      <ExclusionButton
                        key={exclusion}
                        onClick={handleExclusion(name, exclusion)}
                        $isExcluded={(entry.exclusions[name] ?? []).includes(exclusion)}
                      >
                        {exclusion}
                      </ExclusionButton>
                    ))}
                </ExclusionList>
              </ExclusionDetails>
            </Exclusion>
          ))}
        </Participants>
      </Content>
      <DrawFooterAction
        $hasError={!!drawError}
        title={drawError || (drawStatus.type === 'drawing' ? 'Drawing' : 'Draw')}
        onClick={handleNext}
      />
    </>
  );
};
