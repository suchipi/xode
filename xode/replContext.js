let replContext = null;
module.exports = {
  getValue() {
    return replContext;
  },
  setValue(newValue) {
    replContext = newValue;
  },
};
