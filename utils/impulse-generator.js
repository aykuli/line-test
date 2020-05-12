const MIN = 1002;
const MAX = 1010;

const impulseGenerator = () => {
  let rand = Math.floor(MIN + Math.random() * (MAX + 1 - MIN));
  if ([1007, 1009].includes(rand)) {
    this.impulseGenerator()
  } else {
    return rand;
  }
}

module.exports = impulseGenerator;