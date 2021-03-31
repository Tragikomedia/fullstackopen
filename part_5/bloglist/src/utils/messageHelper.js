const show = (func, message) => {
  func(message);
  setTimeout(() => func(""), 5000);
};

const toExport = { show };
export default toExport;
