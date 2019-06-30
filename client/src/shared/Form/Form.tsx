import React from 'react';

import './form.scss';

interface FormProps {
  status?: string | null;
  error?: boolean;
  props?: Object;
}

class Form extends React.Component<FormProps, {}> {
  constructor(props: FormProps) {
    super(props);
  }

  static Header: React.SFC = ({ children }) => (
    <div className="form__header">{children}</div>
  );

  static Content: React.SFC = ({ children }) => (
    <div className="form__content">{children}</div>
  );

  static Footer: React.SFC = ({ children }) => (
    <div className="form__footer">{children}</div>
  );

  render() {
    const { status, error, props, children } = this.props;
    return (
      <form className="form" method="POST" autoComplete="off" {...props}>
        <div className="form__wrapper">{children}</div>
        <div
          className={error ? 'form__status form__status_error' : 'form__status'}
        >
          {status}
        </div>
      </form>
    );
  }
}

export default Form;
