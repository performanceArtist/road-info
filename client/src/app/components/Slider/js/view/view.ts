import { createSlider } from './utils';

function View(model, root: HTMLElement) {
  this.model = model;
  if (!root) throw new Error(`Invalid root element`);
  this.root = root;

  model.addObserver(this);
}

// initializes the controller used in render function
View.prototype.init = function init(controller) {
  this.controller = controller;
  this.render();
};

View.prototype.render = function render() {
  if (this.controller === undefined) {
    throw new Error('Controller was not initialized.');
  }

  const { horizontal, interval } = this.model.getState();
  const dom = createSlider(this.model);

  dom.slider.addEventListener('click', this.controller.handleClick);
  dom.slider.addEventListener('drag', (event: MouseEvent) =>
    event.preventDefault()
  );
  dom.input.addEventListener('blur', this.controller.handleInput);

  if (interval) {
    dom.firstHandle.addEventListener('mousedown', this.controller.handleDrag);
    dom.secondHandle.addEventListener('mousedown', this.controller.handleDrag);
  } else {
    dom.sliderHandle.addEventListener('mousedown', this.controller.handleDrag);
  }

  this.root.innerHTML = '';
  this.model.props.errors = [];
  this.root.appendChild(dom.container);
  this.dom = dom;

  // can only get slider length after it's been rendered
  const length = horizontal ? dom.slider.offsetWidth : dom.slider.offsetHeight;
  this.helpers = { sliderLength: length };

  this.update();
};

interface PositionArgs {
  handle: HTMLElement;
  done: HTMLElement;
  bubble: HTMLElement;
  position: number;
  horizontal: boolean;
}

function changePosition({
  handle,
  done,
  bubble,
  position,
  horizontal
}: PositionArgs) {
  if (horizontal) {
    handle.style.left = `${position - 2}px`;
    done.style.width = `${position + 5}px`;
    bubble.style.left = `${position - 6}px`;
  } else {
    handle.style.top = `${position - 2}px`;
    done.style.height = `${position + 5}px`;
    bubble.style.top = `${position - 6}px`;
  }
}

// value update only, no rerender
View.prototype.update = function update() {
  const { interval } = this.model.getState();

  if (interval) {
    const {
      firstValue,
      secondValue,
      min,
      max,
      horizontal
    } = this.model.getState();

    changePosition({
      handle: this.dom.firstHandle,
      done: this.dom.firstDone,
      bubble: this.dom.firstBubble,
      position: (this.helpers.sliderLength * (firstValue - min)) / (max - min),
      horizontal
    });

    changePosition({
      handle: this.dom.secondHandle,
      done: this.dom.selected,
      bubble: this.dom.secondBubble,
      position: (this.helpers.sliderLength * (secondValue - min)) / (max - min),
      horizontal
    });

    this.dom.firstBubble.innerHTML = firstValue;
    this.dom.secondBubble.innerHTML = secondValue;
    this.dom.input.value = secondValue - firstValue;
  } else {
    const { value, min, max, horizontal } = this.model.getState();

    changePosition({
      handle: this.dom.sliderHandle,
      done: this.dom.selected,
      bubble: this.dom.bubble,
      position: (this.helpers.sliderLength * (value - min)) / (max - min),
      horizontal
    });

    this.dom.bubble.innerHTML = value;
    this.dom.input.value = value;
  }
};

export default View;