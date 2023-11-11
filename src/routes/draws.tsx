import { Link, useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import { drawsSelector, removeDraw } from '../store/draws';
import styled from 'styled-components';
import { Button } from '../components/Button';
import TrashIcon from '../assets/trash.svg?react';
import HomeIcon from '../assets/home.svg?react';
import { Header } from '../components/Header';
import { Content } from '../components/Content';
import { Description } from '../components/Description';

const Draw = styled.div`
  display: flex;
`;

const Title = styled(Link)`
  flex: 1;
  color: ${({ theme }) => theme.colors.text};
  text-decoration: none;

  span {
    opacity: 0.5;
  }
`;

export const Draws = () => {
  const draws = useAppSelector(drawsSelector);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  return (
    <>
      <Header
        title="History"
        icon={<HomeIcon />}
        onClick={() => {
          navigate('/');
        }}
      />
      <Content>
        <Description>Previous draws that have taken place are listed below.</Description>

        {draws.map((draw) => (
          <Draw key={draw.id}>
            <Title to={`/draw/${draw.id}`}>
              {draw.entry.title} <span>{draw.entry.type}</span>
            </Title>
            <Button
              icon={<TrashIcon />}
              onClick={(e) => {
                e.preventDefault();
                dispatch(removeDraw(draw.id));
              }}
            />
          </Draw>
        ))}
      </Content>
    </>
  );
};
