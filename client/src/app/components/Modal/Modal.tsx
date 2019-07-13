import React from 'react';

type Props = {
  open?: boolean;
  coordinates?: { x: number; y: number };
  onClose: () => void;
  children: JSX.Element[] | JSX.Element | string;
}

interface State {
  open: boolean;
}

class Modal extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);

    this.handleClick = this.handleClick.bind(this);
    this.handleKeyDown = this.handleKeyDown.bind(this);
  }

  componentDidMount() {
    document.addEventListener('keydown', this.handleKeyDown);
  }

  componentWillUnmount() {
    document.removeEventListener('keydown', this.handleKeyDown);
  }

  static Header: React.FC = ({ children }) => (
    <div className="modal__header">
      {children}
      <span className="modal__close-button">&times;</span>
    </div>
  );

  static Content: React.FC = ({ children }) => (
    <div className="modal__content">{children}</div>
  );

  static Footer: React.FC = ({ children }) => (
    <div className="modal__footer">{children}</div>
  );

  handleClick(event: React.MouseEvent) {
    const target = event.target as HTMLElement;
    const { onClose } = this.props;
    if (target.className === 'modal__close-button') {
      onClose();
    }
  }

  handleKeyDown(event: KeyboardEvent) {
    const { onClose } = this.props;

    event.stopImmediatePropagation();

    if (event.keyCode === 27) {
      onClose();
    }
  }

  render() {
    const { children, coordinates, open } = this.props;

    if (!open) {
      return null;
    }

    return (
      <div className="modal" onClick={this.handleClick}>
        <div
          className={
            coordinates
              ? 'modal__wrapper modal__wrapper_absolute'
              : 'modal__wrapper'
          }
          style={
            coordinates
              ? {
                  left: coordinates.x,
                  top: coordinates.y
                }
              : {}
          }
        >
          {children}
        </div>
      </div>
    );
  }
}

export default Modal;
