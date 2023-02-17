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
    pagination.push(<a href={"?pagination=" + i}>{i}</a>);
  }

  return (
    <div className="pagination">
      <a href={"?pagination=" + prevPage}>&laquo;</a>
      {pagination}
      <a href={"?pagination=" + nextPage}>&raquo;</a>
    </div>
  );
}
