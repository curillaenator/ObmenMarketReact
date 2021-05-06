import styled from "styled-components";

import { colors } from "../../../Utils/palette";

const ButtonWrap = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  width: fit-content;
  height: 40px;
  padding: 0 16px;
  flex-shrink: 0;
  border: none;
  outline: none;
  background-color: transparent;
  cursor: pointer;
  will-change: filter;
`;

const Shape = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  border-radius: 16px;
  background-color: ${colors.shape};
  z-index: -10;
`;

const Icon = styled.div`
  display: flex;
  align-items: center;
  margin-right: ${(props) => (props.title ? "8px" : "0px")};

  & > svg {
    width: 24px;
    height: 24px;
  }
`;

const titleColor = ({ base, active, danger, disabled }) => {
  if (disabled) return colors.fontDisabled;
  if (danger) return colors.fontDanger;
  if (active) return colors.fontTitle;
  return base;
};

const Title = styled.div`
  width: fit-content;
  color: ${(props) => titleColor({ ...props, base: colors.fontTitle })};
  font-style: normal;
  font-size: 14px;
  font-weight: 600;
  line-height: 1.4;
  letter-spacing: -0.149333px;
  transition: 0.08s linear;

  &:hover {
    color: ${(props) => titleColor({ ...props, base: colors.primary })};
  }

  &:active {
    color: ${(props) => titleColor({ ...props, base: colors.fontActive })};
  }
`;

export const ButtonGhost = ({
  title = "",
  icon = null,
  shape = false,
  active = false,
  danger = false,
  disabled = false,
  handler = () => {},
  fontsize = null,
}) => {
  return (
    <ButtonWrap onClick={handler} disabled={disabled}>
      {shape && active && <Shape />}

      <Icon disabled={disabled} title={title} active={active}>
        {icon}
      </Icon>

      <Title
        disabled={disabled}
        active={active}
        danger={danger}
        fontsize={fontsize}
      >
        {title}
      </Title>
    </ButtonWrap>
  );
};
