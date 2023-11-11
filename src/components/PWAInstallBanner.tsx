import styled from 'styled-components';
import usePWAInstallPrompt from '../hooks/usePWAInstallPrompt';
import { useEffect, useRef, useState } from 'react';
import SafariIcon from '../assets/install-safari.svg?react';
import ShareIcon from '../assets/install-share.svg?react';
import HomeScreenIcon from '../assets/install-home-screen.svg?react';
import useOnClickOutside from '../hooks/useOnClickOutside';

const ENTRY_ANIMATION_DURATION = '250ms';
const ENTRY_ANIMATION_DELAY = '125ms';
const ACTION_ANIMATION_DURATION = '250ms';

const Overlay = styled.div<{ $isOpen: boolean }>`
  position: fixed;
  visibility: ${({ $isOpen }) => ($isOpen ? 'visible' : 'hidden')};
  inset: 0;
  background: ${({ $isOpen }) => ($isOpen ? 'rgba(0, 0, 0, 50%)' : 'rgba(0, 0, 0, 0%)')};
  backdrop-filter: ${({ $isOpen }) => ($isOpen ? 'blur(3px)' : 'blur(0px)')};
  -webkit-backdrop-filter: ${({ $isOpen }) => ($isOpen ? 'blur(3px)' : 'blur(0px)')};
  transition: ${({ $isOpen }) =>
    $isOpen ? ENTRY_ANIMATION_DURATION : `${ENTRY_ANIMATION_DURATION} ${ENTRY_ANIMATION_DELAY}`};
  touch-action: none;

  @media (width >= 800px), (orientation: landscape) {
    display: none;
  }
`;

const Modal = styled.div<{ $isOpen: boolean }>`
  position: fixed;
  overflow: hidden;
  margin: auto;
  display: flex;
  flex-direction: column;
  border-radius: ${({ theme }) => theme.spacing.padding.m} ${({ theme }) => theme.spacing.padding.m} 0 0;
  background: ${({ theme }) => theme.colors.background};
  inset: auto 0 0;
  max-width: 500px;
  transform: ${({ $isOpen }) => ($isOpen ? 'translateY(0)' : 'translateY(100%)')};
  transition: ${({ $isOpen }) =>
    $isOpen ? `${ENTRY_ANIMATION_DURATION} ${ENTRY_ANIMATION_DELAY}` : ENTRY_ANIMATION_DURATION};

  @media (width >= 800px), (orientation: landscape) {
    border: 1px solid ${({ theme }) => theme.colors.text};
    box-shadow: 0 10px 15px -3px ${({ theme }) => theme.colors.text};
  }
`;

const Sheet = styled.div<{ $isShown: boolean; $startX: string }>`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.padding.m};
  padding: ${({ $isShown, theme }) => ($isShown ? theme.spacing.padding.m : '0')};
  max-height: ${({ $isShown }) => ($isShown ? '' : '0')};
  transform: translateX(${({ $isShown, $startX }) => ($isShown ? '0' : $startX)});
  transition: transform ${ENTRY_ANIMATION_DURATION};

  h3 {
    margin: 0;
    padding: 0;
    line-height: ${({ theme }) => theme.typography.size.m};
    font-size: ${({ theme }) => theme.typography.size.l};
    font-weight: ${({ theme }) => theme.typography.weight.extrabold};
  }

  p {
    display: flex;
    gap: ${({ theme }) => theme.spacing.padding.s};
    align-items: center;
    margin: 0;
    padding: 0;
  }

  svg {
    color: ${({ theme }) => theme.colors.text};
    height: 1rem;
    width: 1rem;
  }
`;

const Action = styled.button<{ $variant: 'primary' | 'secondary' }>`
  color: ${({ $variant, theme }) => ($variant === 'primary' ? theme.colors.text : theme.colors.text)};
  margin: ${({ $variant }) => ($variant === 'primary' ? '0 0 -0.5rem' : '0')};
  font-size: ${({ theme }) => theme.typography.size.m};
  background: ${({ theme }) => theme.colors.text};
  border: ${({ $variant, theme }) => ($variant === 'primary' ? 'none' : `2px solid ${theme.colors.text}`)};
  padding: ${({ theme }) => theme.spacing.padding.xs} 0;
  border-radius: 1rem;
  cursor: pointer;
  outline: inherit;
  -webkit-tap-highlight-color: transparent;
  transition: transform ${ACTION_ANIMATION_DURATION};

  &:active {
    transform: scale(0.98);
  }
`;

const PWAInstallBanner = () => {
  const { isInstallable, isIOSBrowser, install, dismiss } = usePWAInstallPrompt();
  const [isOpen, setIsOpen] = useState(false);
  const [isIOSInstructionsShown, setIOSInstructionsShown] = useState(false);
  const modalRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    setIsOpen(isInstallable);
  }, [isInstallable]);

  useOnClickOutside(modalRef, dismiss);

  return (
    <>
      <Overlay $isOpen={isOpen} />
      <Modal $isOpen={isOpen} ref={modalRef}>
        <Sheet $isShown={!isIOSInstructionsShown} $startX="-100%">
          <h3>Install</h3>
          <p>Fancy installing this Progressive Web App?</p>
          <Action
            $variant="primary"
            onClick={() => {
              isIOSBrowser ? setIOSInstructionsShown(true) : void install();
            }}
          >
            Install
          </Action>
          <Action $variant="secondary" onClick={dismiss}>
            No thanks
          </Action>
        </Sheet>

        <Sheet $isShown={isIOSInstructionsShown} $startX="100%">
          <h3>Install</h3>
          <p>
            <SafariIcon />
            <span>Ensure you are using Safari on iOS</span>
          </p>
          <p>
            <ShareIcon />
            <span>Tap the share icon in the bottom menu</span>
          </p>
          <p>
            <HomeScreenIcon />
            <span>Tap &quot;Add to home screen&quot;</span>
          </p>
          <Action $variant="secondary" onClick={dismiss}>
            Done
          </Action>
        </Sheet>
      </Modal>
    </>
  );
};

export default PWAInstallBanner;
