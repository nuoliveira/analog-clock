const svgns = 'http://www.w3.org/2000/svg';

function createSVGElement(tagName, attributes, container) {
  const element = document.createElementNS(svgns, tagName);
  for (const attributeName in attributes)
    element.setAttribute(attributeName, attributes[attributeName]);
  container?.append(element);
  return element;
}

const clock = createSVGElement('svg', {
  class: 'clock',
  xmlns: svgns,
  viewBox: '0 0 100 100',
});

const markers = createSVGElement('g', {
  class: 'marker',
}, clock);

for (let i = 0; i < 60; ++i) {
  createSVGElement('circle', {
    cx: '50',
    cy: '2.5',
    r: i % 5 ? '0.5' : '1',
    transform: `rotate(${i * 360 / 60}, 50, 50)`,
  }, markers);
}

const hands = createSVGElement('g', {
  class: 'hand',
}, clock);

const hourHand = createSVGElement('line', {
  class: 'hour-hand',
  x1: '50',
  y1: '55',
  x2: '50',
  y2: '23.75',
}, hands);

const minuteHand = createSVGElement('line', {
  class: 'minute-hand',
  x1: '50',
  y1: '55',
  x2: '50',
  y2: '2.5',
}, hands);

const secondHand = createSVGElement('line', {
  class: 'second-hand',
  x1: '50',
  y1: '55',
  x2: '50',
  y2: '2.5',
}, hands);

const center = createSVGElement('circle', {
  class: 'center',
  cx: '50',
  cy: '50',
  r: '1',
}, clock);

const border = createSVGElement('circle', {
  class: 'border',
  cx: '50',
  cy: '50',
  r: '49.75',
}, clock);

document.body.replaceChildren(clock);
self.addEventListener('load', run);

function run() {
  requestAnimationFrame(animate);

  function animate() {
    const time = new Date();
    const milliseconds = time.getMilliseconds();
    const seconds = time.getSeconds() + milliseconds / 1000;
    const minutes = time.getMinutes() + seconds / 60;
    const hours = time.getHours() + minutes / 60;
    hourHand.setAttribute('transform', `rotate(${hours * 360 / 12}, 50, 50)`);
    minuteHand.setAttribute('transform', `rotate(${minutes * 360 / 60}, 50, 50)`);
    secondHand.setAttribute('transform', `rotate(${seconds * 360 / 60}, 50, 50)`);
    requestAnimationFrame(animate);
  }
}
