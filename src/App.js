import { DisplayData } from "./components/DisplayData";
import { useState, useEffect } from "react";
function App() {
  const branch1_url = "./branch1.json";
  const branch2_url = "./branch2.json";
  const branch3_url = "./branch3.json";

  const [salesTableData, setSalesTableData] = useState([]);
  const [products, setProducts] = useState([]);
  const [salesInfo, setSalesInfo] = useState([]);
  const [branch, setBranch] = useState("All");

  const fetch_data = (url) => {
    return fetch(url, {
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json"
      }
    }).then((res) => res.json());
  };

  const compile_data = () => {
    Promise.all([
      fetch_data(branch1_url),
      fetch_data(branch2_url),
      fetch_data(branch3_url)
    ]).then((values) => {
      let tempSalesData = [];
      let tempProducts = [];
      values.forEach((branch) => {
        const branch_name = branch.branchId;

        branch.products.forEach((product) => {
          if (!tempProducts.includes(product.name)) {
            tempProducts.push(product.name);
          }
          tempSalesData.push({ ...product, branch: branch_name });
        });
      });

      tempProducts.sort();
      setProducts(tempProducts);
      setSalesInfo(tempSalesData);
    });
  };

  const calculateRevenue = (branch) => {
    //-1 indicates all branches
    if (branch === "all") {
      let tempSalesTableData = [];
      products.forEach((product) => {
        let totalSale = 0;
        salesInfo.forEach((data) => {
          if (data.name === product) {
            totalSale += data.sold * data.unitPrice;
          }
        });
        tempSalesTableData.push({ name: product, revenue: totalSale });
      });
      setSalesTableData(tempSalesTableData);
    } else {
      let tempSalesTableData = [];
      products.forEach((product) => {
        let totalSale = 0;
        salesInfo.forEach((data) => {
          if (data.name === product && data.branch === branch) {
            totalSale += data.sold * data.unitPrice;
          }
        });
        tempSalesTableData.push({ name: product, revenue: totalSale });
      });
      setSalesTableData(tempSalesTableData);
    }
  };

  useEffect(() => {
    compile_data();
  }, []);

  useEffect(() => {
    calculateRevenue("all");
  }, [salesInfo]);

  return (
    <div className="App">
      <DisplayData
        branch={branch}
        setBranch={setBranch}
        salesTableData={salesTableData}
        calculateRevenue={calculateRevenue}
      />
    </div>
  );
}

export default App;
