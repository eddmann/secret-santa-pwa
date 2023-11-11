import { ReactNode } from 'react';
import styled from 'styled-components';
import { Button } from './Button';

const Root = styled.div`
  position: fixed;
  inset: 0 0 auto;
  width: 100%;
  padding: ${({ theme }) => theme.spacing.padding.m} ${({ theme }) => theme.spacing.padding.m}
    ${({ theme }) => theme.spacing.padding.s} ${({ theme }) => theme.spacing.padding.m};
  background-color: ${({ theme }) => theme.colors.background};
  max-width: 600px;
  margin: 0 auto;

  &::after {
    content: '';
    position: absolute;
    bottom: -1rem;
    left: 0;
    pointer-events: none;
    background-image: linear-gradient(to bottom, rgba(202 5 44 / 100%), rgba(202 5 44 / 0%) 90%);
    width: 100%;
    height: 1rem;
  }
`;

type Props = {
  title: string;
  icon?: ReactNode;
  onClick?: VoidFunction;
};

const Title = styled.h3`
  display: flex;
  gap: ${({ theme }) => theme.spacing.padding.m};
  align-items: center;
  line-height: ${({ theme }) => theme.spacing.padding.m};
  margin: 0;
  padding: 0;
`;

export const Header = ({ title, icon, onClick }: Props) => (
  <Root>
    <Title>
      {icon && <Button icon={icon} onClick={onClick} />} {title}
    </Title>
  </Root>
);
