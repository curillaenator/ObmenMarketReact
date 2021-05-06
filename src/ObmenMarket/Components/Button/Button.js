import styled from "styled-components";
import preloader from "../../../Assets/Images/loader.svg";
import { colors } from "../../../Utils/palette";

const shapeColor = ({ base, active, disabled }) => {
  if (active || disabled) return colors.primaryActive;
  return base;
};

const shapeFilter = ({ params, active, disabled }) => {
  if (active || disabled) return "none";
  return params;
};

const iconState = ({ icon, active, disabled, state }) => {
  if (disabled) return icon && icon.disabled;
  if (active) return icon && icon.active;
  return icon && icon[state];
};

const ttlColor = ({ base, active, disabled }) => {
  if (disabled) return colors.primaryDisabled;
  if (active) return colors.fontTitle;
  return base;
};

const ButtonWrap = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  position: relative;
  width: ${(props) => props.width}px;
  height: ${(props) => props.height}px;
  border: none;
  outline: none;
  background-color: transparent;
  cursor: pointer;
  transition: ${(props) => props.transition}s linear;
  will-change: filter, transform;

  &:hover {
    transform: ${(props) =>
      props.disabled || props.active
        ? "scale3d(1, 1, 1)"
        : "scale3d(1.04, 1.04, 1.04)"};
  }

  &:active {
    transform: scale3d(1, 1, 1);
  }

  .loader {
    width: 40px;
    height: 40px;
    object-fit: cover;
  }

  .shape {
    will-change: filter;
    position: absolute;
    top: 0;
    left: 0;
    fill: ${(props) => shapeColor({ ...props, base: colors.primary })};
    filter: drop-shadow(
      ${(props) => shapeFilter({ ...props, params: "0 10px 14px #1a1a1a3f" })}
    );
    transition: ${(props) => props.transition}s linear;
    z-index: -1;
  }

  &:hover .shape {
    fill: ${(props) => shapeColor({ ...props, base: colors.primaryHover })};
    filter: drop-shadow(
      ${(props) => shapeFilter({ ...props, params: "0 12px 16px ##1a1a1a48" })}
    );
  }

  &:active .shape {
    fill: ${(props) => shapeColor({ ...props, base: colors.primary })};
    filter: none;
  }

  .icon {
    height: 24px;
    width: 24px;
    margin-right: ${(props) => (props.title ? "12px" : "0px")};
    background-image: url(${(props) => iconState({ ...props, state: "idle" })});
    background-position: center;
    background-repeat: no-repeat;
    background-size: contain;
    transition: 0.08s linear;
  }

  &:hover .icon {
    background-image: url(${(props) =>
      iconState({ ...props, state: "hover" })});
  }

  &:active .icon {
    background-image: url(${(props) =>
      iconState({ ...props, state: "clicked" })});
  }

  .title {
    width: ${(props) => (props.titlewidth ? props.titlewidth : "fit-content")};
    color: ${(props) => ttlColor({ ...props, base: colors.fontWhite })};
    font-weight: 700;
    font-size: ${(props) => (props.fontsize ? props.fontsize + "px" : "14px")};
    line-height: 24px;
    letter-spacing: -0.149333px;
    transition: 0.08s linear;

    .subtitle {
      font-weight: 500;
      font-size: 12px;
      line-height: 16px;
      letter-spacing: -0.16px;
      opacity: 0.8;
    }
  }
`;

export const Button = ({
  width = 217,
  height = 56,
  title = "",
  subtitle = "",
  icon = null,
  loader = false,
  active = false,
  disabled = false,
  handler = () => console.log("click"),
  titlewidth = null,
  fontsize = null,
}) => {
  const transition = 0.06;
  const smoothQ = 98;
  const radius = 23.33; // 44

  const W = width;
  const H = height;
  const R = H / 2 < radius ? H / 2 : radius; // 2.4
  const S = (0.08 + R * 0.000012) * smoothQ - 4 / smoothQ - 3;
  return (
    <ButtonWrap
      icon={icon}
      width={width}
      height={height}
      title={title}
      active={active}
      disabled={disabled}
      titlewidth={titlewidth}
      fontsize={fontsize}
      transition={transition}
      onClick={handler}
    >
      <svg
        className="shape"
        version="1.1"
        width="100%"
        height="100%"
        viewBox={`0 0 ${width} ${height}`}
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d={`M ${R} 0 H${W - R} C ${W - S} 0 ${W} ${S} ${W} ${R}
          V ${H - R} C ${W} ${H - S} ${W - S} ${H} ${W - R} ${H}
          H ${R} C ${S} ${H} 0 ${H - S} 0 ${H - R}
          V ${R} C 0 ${S} ${S} 0 ${R} 0 Z`}
        ></path>
      </svg>

      {loader && <img className="loader" src={preloader} alt="Загрузка" />}

      {!loader && icon && <div className="icon"></div>}

      {title && (
        <div className="title">
          {title}
          {subtitle && <div className="subtitle">{subtitle}</div>}
        </div>
      )}
    </ButtonWrap>
  );
};
