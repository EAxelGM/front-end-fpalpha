const Table = ({ headers = [], items = [] }) => {
  //console.log({ headers, items });
  return (
    <div>
      <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
        <table className="w-full text-sm text-left text-gray-500 ">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50">
            <tr>
              {headers.map((head, index) => (
                <th key={index} scope="col" className="px-6 py-3">
                  {head.name}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {items.map((item, index) => (
              <tr key={index} className={index % 2 === 0 ? "bg-white border-b" : "border-b bg-gray-50"}>
                {headers.map((head, index_2) => (
                  <td key={index_2} scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">
                    {item[head.value]}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Table;
