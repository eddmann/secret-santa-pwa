import styled from 'styled-components';

export const Content = styled.div`
  padding: 4.5rem 0 calc(6rem + env(safe-area-inset-bottom));
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.padding.xl};

  @media (width >= 800px) {
    padding-bottom: 1rem;
  }
`;
