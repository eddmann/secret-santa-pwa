import styled from 'styled-components';
import useBodyLock from '../hooks/useBodyLock';

const Input = styled.input`
  box-sizing: border-box;
  font-size: 1.2rem;
  width: 100%;
  outline: none;
  border-radius: 0;
  padding: ${({ theme }) => theme.spacing.padding.s};
  letter-spacing: 0.05em;
  -webkit-tap-highlight-color: transparent;
  border: 2px solid #000;
  -webkit-appearance: none;
  box-shadow:
    1px 1px 0 0,
    2px 2px 0 0,
    3px 3px 0 0,
    4px 4px 0 0;
`;

const InputField = (props: React.InputHTMLAttributes<HTMLInputElement>) => {
  const { lock, unlock } = useBodyLock();

  return (
    <Input
      {...props}
      name="notASearchField"
      onFocus={(e) => {
        lock();
        props.onFocus?.(e);
      }}
      onBlur={(e) => {
        unlock();
        props.onBlur?.(e);
      }}
    />
  );
};

export default InputField;
