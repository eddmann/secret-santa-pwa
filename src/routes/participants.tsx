import { useMemo, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import { useNavigate } from 'react-router-dom';
import { addParticipant, entrySelector, updateTitle, removeParticipant } from '../store/entry';
import InputField from '../components/InputField';
import styled, { css, keyframes } from 'styled-components';
import { Button } from '../components/Button';
import CloseIcon from '../assets/close.svg?react';
import HomeIcon from '../assets/home.svg?react';
import { Header } from '../components/Header';
import { FooterAction } from '../components/FooterAction';
import { Content } from '../components/Content';
import { Description } from '../components/Description';

const fadeIn = keyframes`
  from { opacity: 0 }
  to { opacity: 1 }
`;

const shake = keyframes`
  0% { transform: translateX(0) }
  25%, 75% { transform: translateX(5px) }
  50% { transform: translateX(-5px) }
  100% { transform: translateX(0) }
`;

const AddParticipantForm = styled.div`
  display: flex;
  gap: ${({ theme }) => theme.spacing.padding.s};
`;

const ParticipantsList = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.padding.m};
`;

const Participant = styled.div`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.padding.m};
  animation: ${fadeIn} 250ms ease;
`;

const RemoveButton = styled(CloseIcon)`
  height: 2rem;
  cursor: pointer;
  -webkit-tap-highlight-color: transparent;
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

const Name = styled.div`
  width: 100%;
`;

const NameInputField = styled(InputField)<{ $hasError: boolean }>`
  ${({ $hasError }) =>
    $hasError &&
    css`
      animation: ${shake} 250ms ease;
    `}
`;

export const Participants = () => {
  const entry = useAppSelector(entrySelector);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const isValid = useMemo(() => entry.title !== '' && entry.participants.length > 2, [entry]);
  const [name, setName] = useState('');
  const [hasNameError, setHasNameError] = useState(false);

  const handleAdd = () => {
    if (name === '' || entry.participants.includes(name)) {
      setHasNameError(true);
      setTimeout(() => {
        setHasNameError(false);
      }, 250);
      return;
    }

    dispatch(addParticipant(name));
    setName('');
    setHasNameError(false);
  };

  return (
    <>
      <Header
        title="Participants"
        icon={<HomeIcon />}
        onClick={() => {
          navigate('/');
        }}
      />
      <Content>
        <Description>Name your {entry.type} draw and who is participating in it.</Description>

        <InputField
          value={entry.title}
          onChange={(event) => dispatch(updateTitle(event.target.value))}
          placeholder="Title"
        />

        {entry.participants.length > 0 && (
          <ParticipantsList>
            {entry.participants.map((name, idx) => (
              <Participant key={name}>
                <div>
                  <Number>{idx + 1}</Number>
                </div>
                <Name>{name}</Name>
                <RemoveButton onClick={() => dispatch(removeParticipant(name))} />
              </Participant>
            ))}
          </ParticipantsList>
        )}

        <AddParticipantForm>
          <NameInputField
            $hasError={hasNameError}
            placeholder="Partipcant name"
            value={name}
            onChange={(e) => {
              setName(e.target.value);
            }}
          />
          <Button onClick={handleAdd} title="Add" />
        </AddParticipantForm>
      </Content>
      {isValid && (
        <FooterAction
          onClick={() => {
            navigate('/entry/exclusions');
          }}
          title="Next"
        />
      )}
    </>
  );
};
