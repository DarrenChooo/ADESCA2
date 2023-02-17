export default function Pagination(props) {
  let prevPage = parseInt(props.page) - 1;
  let nextPage = parseInt(props.page) + 1;
  if (prevPage < 1) {
    prevPage = 1;
  }
  if (nextPage > props.pageCount) {
    nextPage = props.page;
  }
  const pagination = [];
  for (let i = 1; i <= props.pageCount; i++) {
    pagination.push( /*#__PURE__*/React.createElement("a", {
      href: "?pagination=" + i
    }, i));
  }
  return /*#__PURE__*/React.createElement("div", {
    className: "pagination"
  }, /*#__PURE__*/React.createElement("a", {
    href: "?pagination=" + prevPage
  }, "\xAB"), pagination, /*#__PURE__*/React.createElement("a", {
    href: "?pagination=" + nextPage
  }, "\xBB"));
}