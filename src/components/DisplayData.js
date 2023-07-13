import React, { useEffect, useState } from "react";
import { Nav, Form, Table } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";

export const DisplayData = ({
  branch,
  setBranch,
  salesTableData,
  calculateRevenue
}) => {
  const [searchInput, setSearchInput] = useState("");
  let totalRevenue = 0;
  const handleDebounce = (fn, delay) => {
    let timer;
    return function (...args) {
      const context = this;
      clearTimeout(timer);
      timer = setTimeout(() => {
        fn.apply(context, args);
      }, delay);
    };
  };
  return (
    <div className="p-4">
      <h2>Revenue Aggregator Application</h2>
      <Nav
        variant="tabs"
        defaultActiveKey="All"
        onSelect={(key) => setBranch(key)}
      >
        <Nav.Item>
          <Nav.Link
            eventKey="All"
            onClick={() => {
              setBranch("All");
              calculateRevenue("all");
            }}
          >
            All
          </Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link
            eventKey="Branch 1"
            onClick={() => {
              setBranch("Branch 1");
              calculateRevenue("b1");
            }}
          >
            Branch 1
          </Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link
            eventKey="Branch 2"
            onClick={() => {
              setBranch("Branch 2");
              calculateRevenue("b2");
            }}
          >
            Branch 2
          </Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link
            eventKey="Branch 3"
            onClick={() => {
              setBranch("Branch 3");
              calculateRevenue("b3");
            }}
          >
            Branch 3
          </Nav.Link>
        </Nav.Item>
      </Nav>
      <br />
      <h2>{branch}</h2>
     <Form.Group className="d-flex align-items-center">
        <Form.Label className="m-2">
          <h5>Search :</h5>
        </Form.Label>
        <Form.Control
          onChange={handleDebounce((e) => {
            console.log("searching..");
            setSearchInput(e.target.value);
          }, 300)}
          style={{ fontSize: "16px", width: "70%" }}
          type="text"
          placeholder="Search..."
        />
      </Form.Group>
      <Table striped bordered>
        <thead>
          <tr>
            <th style={{ padding: "10px" }}>Sr. No</th>
            <th style={{ padding: "10px" }}>Product Name</th>
            <th style={{ padding: "10px" }}>Revenue</th>
          </tr>
        </thead>
        <tbody>
          {salesTableData
            .filter((row) =>
              row.name.toLowerCase().includes(searchInput.toLowerCase())
            )
            .map((value, key) => {
              totalRevenue += value.revenue;
              return (
                <tr key={key}>
                  <td style={{ padding: "10px" }}>{key + 1}</td>
                  <td style={{ padding: "10px" }}>{value.name}</td>
                  <td style={{ padding: "10px" }}>
                    {value.revenue.toLocaleString()}
                  </td>
                </tr>
              );
            })}
        </tbody>
        <tfoot>
          <tr>
            <td style={{ padding: "10px" }}></td>
            <td style={{ padding: "10px" }}>Total</td>
            <td style={{ padding: "10px" }}>{totalRevenue.toLocaleString()}</td>
          </tr>
        </tfoot>
      </Table>
    </div>
  );
};
