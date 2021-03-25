import React, { useEffect, useState } from "react";
import { AgGridColumn, AgGridReact } from "ag-grid-react";

import "ag-grid-community/dist/styles/ag-grid.css";
import "ag-grid-community/dist/styles/ag-theme-alpine.css";

const App = () => {
  const [gridApi, setGridApi] = useState(null);
  const [gridColumnApi, setGridColumnApi] = useState(null);
  const [rowData, setRowData] = useState([]);

  const [colData, setColData] = useState([
    { headerName: "Make", field: "make", sortable: true, filter: true,checkboxSelection:true },
    { headerName: "Model", field: "model" },
    { headerName: "Price", field: "price" },
  ]);

  useEffect(() => {
    fetch("https://www.ag-grid.com/example-assets/row-data.json")
      .then((result) => result.json())
      .then((rowData) => setRowData(rowData));
  }, []);

  const handleClick = (e) => {
    e.preventDefault();
    const selectedNodes = gridApi.getSelectedNodes();
    const selectedData = selectedNodes.map((node) =>node.data)
    const selectedDataStringPresentation = selectedData.map((node) => node.make+' '+node.model+''+node.price)
alert(`selected nodes ${selectedDataStringPresentation}`)
  };

  return (
    <div className="ag-theme-alpine" style={{ height: 400, width: 600 }}>
      <button onClick={(e) => handleClick(e)}>Select</button>
      <AgGridReact
        rowData={rowData}
        columnDefs={colData}
        rowSelection="multiple"
        onGridReady = {(params)=>setGridApi(params.api)}
      />
    </div>
  );
};

export default App;
