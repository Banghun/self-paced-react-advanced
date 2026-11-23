import { useEffect, useRef } from 'react';
import styled, { createGlobalStyle } from 'styled-components';

const POINTER_FILL_COLOR = 'rgba(236, 74, 10, 0.2)';

const HideDefaultCursor = createGlobalStyle`
  * {
    cursor: none !important;
  }
`;

function CustomPointer() {
  const pointerRef = useRef(null);

  useEffect(() => {
    const handleMouseMove = (event) => {
      const pointer = pointerRef.current;
      if (!pointer) return;
      pointer.style.left = `${event.clientX}px`;
      pointer.style.top = `${event.clientY}px`;
      pointer.style.visibility = 'visible';
    };

    window.addEventListener('mousemove', handleMouseMove);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  return (
    <>
      <HideDefaultCursor />
      <Pointer ref={pointerRef} />
    </>
  );
}

const Pointer = styled.div`
  position: fixed;
  transform: translate(-50%, -50%);
  visibility: hidden;

  width: 24px;
  height: 24px;

  border: 2px solid var(--primary-color);
  border-radius: 50%;
  background: ${POINTER_FILL_COLOR};

  pointer-events: none;
  z-index: 9999;
`;

export default CustomPointer;
