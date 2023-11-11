import { useEffect, useState } from 'react';
import { RemoteReveal as RemoteRevealType } from '../types';
import { useNavigate, useParams } from 'react-router-dom';
import styled, { keyframes } from 'styled-components';
import HomeIcon from '../assets/home.svg?react';
import { Content } from '../components/Content';
import { Header } from '../components/Header';
import { FooterAction } from '../components/FooterAction';
import { Description } from '../components/Description';
import { useRemoteReveal } from '../hooks/useRemoteReveal';
import { REMOTE_REVEAL_WRAPPED_PASSWORD } from '../env';
import SantaVector from '../assets/santa.svg?react';
import Snowfall from 'react-snowfall';

const Name = styled.div`
  font-size: ${({ theme }) => theme.typography.size.l};
  font-weight: ${({ theme }) => theme.typography.weight.bold};
  line-height: ${({ theme }) => theme.typography.size.l};
`;

const RevealName = styled.div<{ $isRevealed: boolean }>`
  font-size: ${({ theme }) => theme.typography.size.l};
  font-weight: ${({ theme }) => theme.typography.weight.bold};
  line-height: ${({ theme }) => theme.typography.size.l};
  transition: filter 1s ease-out;
  filter: ${({ $isRevealed }) => ($isRevealed ? 'blur(0px)' : 'blur(6px)')};
  will-change: filter;
`;

const Result = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.padding.l};
`;

const slideUp = keyframes`
  from {
    transform: translateY(200px);
  }
  to {
    transform: translateY(50px);
  }
`;

const SantaRoot = styled.div`
  position: fixed;
  inset: auto 0 0;
  display: flex;
  justify-content: center;
  transform: translateY(50px);
  animation: ${slideUp} 1s ease;
`;

const Santa = styled(SantaVector)`
  height: 50vh;
`;

const UnwrappingIndicator = styled.div`
  margin: 0 auto;
`;

export const RemoteReveal = () => {
  const { wrapped } = useParams();
  const [reveal, setReveal] = useState<RemoteRevealType | null>();
  const [isRevealed, setIsRevealed] = useState(false);
  const { unwrap } = useRemoteReveal(REMOTE_REVEAL_WRAPPED_PASSWORD);
  const navigate = useNavigate();

  useEffect(() => {
    void (async () => {
      try {
        setReveal(await unwrap(wrapped ?? ''));
      } catch {
        navigate('/');
      }
    })();
  }, [wrapped, unwrap, navigate]);

  return (
    <>
      <Header
        title={reveal?.title ?? ''}
        icon={<HomeIcon />}
        onClick={() => {
          navigate('/');
        }}
      />
      <Content>
        {reveal ? (
          <>
            <Description>
              Hey {reveal.participant}, the draw has taken place, find out who you are Secret Santa for below.
            </Description>
            <Result>
              <Name>{reveal.participant}</Name>
              <span>you&apos;re Secret Santa for...</span>
              <RevealName key={reveal.recipient} $isRevealed={isRevealed}>
                {isRevealed ? reveal.recipient : 'SECRET'}
              </RevealName>
            </Result>
          </>
        ) : (
          <UnwrappingIndicator>🎁 Unwrapping...</UnwrappingIndicator>
        )}
      </Content>
      {reveal && !isRevealed && (
        <FooterAction
          title="Reveal"
          onClick={() => {
            setIsRevealed(true);
          }}
        />
      )}
      {isRevealed && (
        <>
          <SantaRoot>
            <Santa />
          </SantaRoot>
          <Snowfall />
        </>
      )}
    </>
  );
};
