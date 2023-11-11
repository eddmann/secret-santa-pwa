import { ReactNode } from 'react';
import styled from 'styled-components';

type Props = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  title?: string;
  icon?: ReactNode;
  variant?: 'large' | 'small';
};

const Root = styled.div`
  position: fixed;
  box-sizing: border-box;
  inset: auto 0 0;
  width: 100%;
  padding: ${({ theme }) => theme.spacing.padding.s} ${({ theme }) => theme.spacing.padding.m}
    max(${({ theme }) => theme.spacing.padding.m}, env(safe-area-inset-bottom))
    ${({ theme }) => theme.spacing.padding.m};
  background-color: ${({ theme }) => theme.colors.background};
  max-width: 600px;
  margin: 0 auto;

  &::before {
    content: '';
    position: absolute;
    top: -1rem;
    left: 0;
    pointer-events: none;
    background-image: linear-gradient(to bottom, rgba(202 5 44 / 0%), rgba(202 5 44 / 100%) 90%);
    width: 100%;
    height: 1rem;
  }

  @media (width >= 800px) {
    position: static;
    padding: 1rem 0 0;
  }
`;

const InternalButton = styled.button`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.padding.s};
  justify-content: center;
  background: ${({ theme }) => theme.colors.text};
  border: 2px solid #000;
  font-weight: ${({ theme }) => theme.typography.weight.bold};
  font-size: ${({ theme }) => theme.typography.size.m};
  outline: none;
  letter-spacing: 0.01rem;
  color: #000;
  line-height: ${({ theme }) => theme.typography.size.m};
  padding: ${({ theme }) => theme.spacing.padding.m};
  width: 100%;
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
  -webkit-tap-highlight-color: transparent;

  &:active {
    transform: translateY(2px) translateX(2px);
    box-shadow: none;
  }
`;

export const FooterAction = ({ title, icon, ...rest }: Props) => {
  return (
    <Root>
      <InternalButton {...rest}>
        {title} {icon}
      </InternalButton>
    </Root>
  );
};
