import { useState, useEffect } from "react";
import styled, { keyframes } from "styled-components";

import { ButtonGhost } from "../Button/ButtonGhost";

const appear = keyframes`
    from {
      opacity: 0;
      transform: translateY(20px)
    }
  
    to {
      opacity: 1;
      transform: translateY(0)
    }
    `;

const Wrapper = styled.div`
  position: relative;
`;

const Trigger = styled.div`
  cursor: pointer;

  svg {
    width: 26px;
    height: 26px;
    fill: #a09cae;
    fill: ${(props) => (props.trig ? "#3d3158" : "#a09cae")};
    transform: ${(props) => (props.trig ? "rotate(270deg)" : "rotate(90deg)")};
    transition: 0.08s linear;
  }
`;

const Menu = styled.div`
  position: absolute;
  top: 0;
  right: 34px;
  height: ${(props) => props.height};
  padding-right: 8px;
  border: 2px solid #efecff;
  border-radius: 16px;
  background-color: #f9f8ff;
  box-shadow: 0px 18px 32px 0px #1a1a1a3f;
  animation: ${appear} 0.12s ease-out;
  z-index: 999;
`;

export const Dropdown = ({ icon, items }) => {
  const [trig, setTrig] = useState(false);

  const close = () => setTrig(false);

  useEffect(() => {
    trig
      ? window.document.addEventListener("click", close)
      : window.document.removeEventListener("click", close);

    return () => window.document.removeEventListener("click", close);
  }, [trig]);

  return (
    <Wrapper>
      <Trigger trig={trig} onClick={() => setTrig(!trig)}>
        {icon}
      </Trigger>

      {trig && (
        <Menu trig={trig} height={items.length * 40 + 4}>
          {items.map((item) => (
            <ButtonGhost
              key={item.title}
              title={item.title}
              icon={item.icon}
              handler={item.handler}
            />
          ))}
        </Menu>
      )}
    </Wrapper>
  );
};
