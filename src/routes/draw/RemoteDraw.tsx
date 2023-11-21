import { useEffect, useState } from 'react';
import { Participant, Draw as DrawType, WrappedRemoteReveal } from '../../types';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { Button } from '../../components/Button';
import HomeIcon from '../../assets/home.svg?react';
import ShareIcon from '../../assets/share.svg?react';
import CopyIcon from '../../assets/copy.svg?react';
import { Content } from '../../components/Content';
import { Header } from '../../components/Header';
import { Description } from '../../components/Description';
import { useRemoteReveal } from '../../hooks/useRemoteReveal';
import { REMOTE_REVEAL_URL_TEMPLATE, REMOTE_REVEAL_WRAPPED_PASSWORD } from '../../env';

const RemoteParticipant = styled.div`
  display: flex;
  gap: ${({ theme }) => theme.spacing.padding.m};
`;

const Name = styled.div`
  flex: 1;
`;

const ParticipantsList = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.padding.m};
`;

const WrappingIndicator = styled.div`
  margin: 0 auto;
`;

type Props = {
  draw: DrawType;
};

type WrappedDraw = [Participant, WrappedRemoteReveal][];

export const RemoteDraw = ({ draw }: Props) => {
  const [wrapped, setWrapped] = useState<WrappedDraw | null>(null);
  const navigate = useNavigate();
  const { wrap } = useRemoteReveal(REMOTE_REVEAL_WRAPPED_PASSWORD);

  useEffect(() => {
    void (async () => {
      setWrapped(
        await Promise.all(
          Object.entries(draw.allocation).map(async ([participant, recipient]) => [
            participant,
            await wrap({ title: draw.entry.title, participant, recipient }),
          ]),
        ),
      );
    })();

    console.log(draw);
  }, [draw, wrap]);

  return (
    <>
      <Header
        title={draw.entry.title}
        icon={<HomeIcon />}
        onClick={() => {
          navigate('/');
        }}
      />
      <Content>
        <>
          <Description>Share the remote draw results with each participant.</Description>
          {wrapped ? (
            <ParticipantsList>
              {wrapped.map(([participant, wrappedRemoteReveal]) => (
                <RemoteParticipant key={participant}>
                  <Name>{participant}</Name>
                  <Button
                    icon={<ShareIcon />}
                    onClick={() => {
                      void navigator.share({
                        title: `Secret Santa: ${draw.entry.title}`,
                        text: `Hey ${participant}, the draw has been done! Find out who you're Secret Santa for... `,
                        url: REMOTE_REVEAL_URL_TEMPLATE.replace('{wrapped}', wrappedRemoteReveal),
                      });
                    }}
                  />
                  <Button
                    icon={<CopyIcon />}
                    onClick={() => {
                      void window.navigator.clipboard.writeText(
                        REMOTE_REVEAL_URL_TEMPLATE.replace('{wrapped}', wrappedRemoteReveal),
                      );
                    }}
                  />
                </RemoteParticipant>
              ))}
            </ParticipantsList>
          ) : (
            <WrappingIndicator>🎁 Wrapping...</WrappingIndicator>
          )}
        </>
      </Content>
    </>
  );
};
