import React from 'react';

export enum IconImage {
  WARNING = 'url("images/warning.png")',
  EDIT = 'url("images/edit.png")',
  DELETE = 'url("images/trashbin.png")',
  ANGLE = 'url("images/angle-down.png")',
  ZOOM_OUT = 'url("images/zoom-out.png")'
}

interface IconProps {
  image?: IconImage;
  size?: string;
  onClick: Function;
}

export const Icon: React.SFC<IconProps> = ({
  image = IconImage.WARNING,
  size = 'medium',
  title = '',
  onClick = () => {}
}) => (
  <div
    className={`icon icon_${size}`}
    style={{ backgroundImage: image }}
    title={title}
    onClick={onClick}
  />
);
