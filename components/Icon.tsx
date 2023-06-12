import React from "react";
import iconMap from "./icons/icon-map";

const EmptyIcon = () => <div />;

/**
 * Generic icon
 * @param name - icon name as defined in icon-map.js
 * @param size - icon size (width and height)
 * @param color - icon color (hexadecimal or TailwindCSS color)
 * @param className - additional TailwindCSS classes
 * @param rest - additional props
 * @returns {JSX.Element} - icon component
 */

interface IconProps {
    name?: string,
    size?: string,
    color?: string,
    width?: string,
    height?: string,
    className?: string 
    disabled?: boolean
}
const Icon:React.FC<IconProps> = ({ name, size, width, height, color, className, disabled, ...rest }) => {
// @ts-ignore
  const Icon = iconMap[name] || EmptyIcon;
  return (
    <Icon
      color={color}
      className={className}
      style={{ width: size, height: size }}
      width={width}
      height={height}
      disabled={disabled}
      {...rest}
    />
  );
};

Icon.defaultProps = {
  size: "32px",
  color: "black",
};

export default Icon;