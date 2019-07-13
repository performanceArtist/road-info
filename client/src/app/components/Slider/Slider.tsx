import React from 'react';

import Model from './js/model/model';
import View from './js/view/view';
import Controller from './js/controller/controller';

import OptionsType from './js/Options';

function init(root: HTMLElement, options = {}) {
  const model = new Model(options);
  const view = new View(model, root);
  const controller = new Controller(model, view);

  return {
    setState: model.setState,
    getState: model.getState
  };
}

class Slider extends React.Component<{ options: OptionsType }> {
  constructor(props) {
    super(props);

    this.ref = React.createRef();
  }

  componentDidMount() {
    const { current: node } = this.ref;
    const { options } = this.props;
    init(node, options);
  }

  render() {
    return <div ref={this.ref} />;
  }
}

export default Slider;
