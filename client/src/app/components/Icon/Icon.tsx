import React from 'react';

export enum IconImage {
  WARNING = 'warning.png',
  EDIT = 'edit.png',
  DELETE = 'trashbin.png',
  ANGLE = 'angle-down.png',
  ZOOM_OUT = 'zoom-out.png',
  SETTINGS = 'settings.png',
  MAX = 'max.png',
  MIN = 'min.png',
  BACK_ARROW = 'back-arrow.png',
  TABLE = 'table.png',
  GRAPH = 'graph.png',
  EXPAND = 'expand.png',
  COMPASS = 'compass.png',
  WIFI = 'wifi.png'
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
    style={{ backgroundImage: `url("images/${image}")` }}
    title={title}
    onClick={onClick}
  />
);
