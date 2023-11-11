import { ReactNode } from 'react';
import styled, { css } from 'styled-components';

type Props = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  title?: string;
  icon?: ReactNode;
  variant?: 'large' | 'small';
};

const InternalButton = styled.button<{ $variant: 'large' | 'small' }>`
  box-sizing: border-box;
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
  padding: ${({ $variant }) => ($variant === 'large' ? '1rem' : '0.5rem')};
  -webkit-tap-highlight-color: transparent;
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

  ${({ $variant }) =>
    $variant === 'large' &&
    css`
      width: 100%;
    `};
`;

export const Button = ({ title, icon, variant = 'small', ...rest }: Props) => {
  return (
    <InternalButton $variant={variant} {...rest}>
      {title} {icon}
    </InternalButton>
  );
};
