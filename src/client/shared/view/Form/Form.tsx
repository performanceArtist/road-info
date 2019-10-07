import * as React from 'react';

interface IFields {
  [key: string]: any;
}

type IOwnProps = {
  status?: string | null;
  error?: boolean;
  onSubmit(formData: IFields): void;
};

type RawFormProps = React.DetailedHTMLProps<
  React.FormHTMLAttributes<HTMLFormElement>,
  HTMLFormElement
>;

class Form extends React.Component<IOwnProps & RawFormProps, {}> {
  constructor(props: IOwnProps) {
    super(props);

    this.handleSubmit = this.handleSubmit.bind(this);
  }

  static Header: React.FC = ({ children }) => (
    <div className="form__header">{children}</div>
  );

  static Content: React.FC = ({ children }) => (
    <div className="form__content">{children}</div>
  );

  static Footer: React.FC = ({ children }) => (
    <div className="form__footer">{children}</div>
  );

  handleSubmit(event: React.FormEvent) {
    event.preventDefault();
    const { onSubmit } = this.props;
    const target = event.currentTarget as HTMLFormElement;

    const formData = [...target.elements].reduce(
      (acc: { [key: string]: any }, { name, value, type, checked }: HTMLInputElement) => {
        if (type === 'radio') {
          acc[name] = checked;
        } else {
          if (type !== 'submit' && value) acc[name] = value;
        }

        return acc;
      },
      {}
    );

    return onSubmit(formData);
  }

  render() {
    const { status, error, children, ...props } = this.props;
    return (
      <form
        className="form"
        method="POST"
        autoComplete="off"
        {...props}
        onSubmit={this.handleSubmit}
      >
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
