import { useEffect, useState } from 'react';
import styled from 'styled-components';

const POINTER_FILL_COLOR = 'rgba(236, 74, 10, 0.2)';

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

  return <Pointer $x={position.x} $y={position.y} />;
}

const Pointer = styled.div`
  position: fixed;
  left: ${({ $x }) => $x}px;
  top: ${({ $y }) => $y}px;
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
