import { useEffect, useState } from 'react';
import styled, { createGlobalStyle } from 'styled-components';

const POINTER_FILL_COLOR = 'rgba(236, 74, 10, 0.2)';

const HideDefaultCursor = createGlobalStyle`
  * {
    cursor: none !important;
  }
`;

function CustomPointer() {
  const [position, setPosition] = useState(null); // 처음엔 위치 모름

  useEffect(() => {
    const handleMouseMove = (event) => {
      setPosition({ x: event.clientX, y: event.clientY });
    };

    window.addEventListener('mousemove', handleMouseMove);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  if (!position) return null;

  return (
    <>
      <HideDefaultCursor />
      <Pointer style={{ left: position.x, top: position.y }} />
    </>
  );
}

const Pointer = styled.div`
  position: fixed;
  transform: translate(-50%, -50%);

  width: 24px;
  height: 24px;

  border: 2px solid var(--primary-color);
  border-radius: 50%;
  background: ${POINTER_FILL_COLOR};

  pointer-events: none;
  z-index: 9999;
`;

export default CustomPointer;
