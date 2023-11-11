import styled from 'styled-components';
import { Outlet } from 'react-router-dom';

const Root = styled.div`
  max-width: 600px;
  margin: 0 auto;
  padding: 0 ${({ theme }) => theme.spacing.padding.m};

  @media (width >= 800px), (orientation: landscape) {
    padding: 0 max(${({ theme }) => theme.spacing.padding.m}, env(safe-area-inset-right)) env(safe-area-inset-bottom)
      max(${({ theme }) => theme.spacing.padding.m}, env(safe-area-inset-left));
  }
`;

export const Layout = () => {
  return (
    <Root>
      <Outlet />
    </Root>
  );
};
