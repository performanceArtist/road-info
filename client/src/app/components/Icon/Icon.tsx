import React from 'react';

export enum IconImage {
  WARNING = 'url("images/warning.png")',
  EDIT = 'url("images/edit.png")',
  DELETE = 'url("images/trashbin.png")',
  ANGLE = 'url("images/angle-down.png")',
  ZOOM_OUT = 'url("images/zoom-out.png")',
  SETTINGS = 'url("images/settings.png")',
  MAX = 'url("images/max.png")',
  MIN = 'url("images/min.png")',
  BACK_ARROW = 'url("images/back-arrow.png")'
}

type Props = {
  title?: string;
  image?: IconImage;
  size?: 'medium' | 'small';
  onClick?: (event: React.SyntheticEvent) => any;
};

export const Icon: React.FC<Props> = ({
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
