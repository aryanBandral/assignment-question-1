import { useState } from "react";

// Data
import mockData from "../assets/data.json";
import timestamps from "../assets/timeStamps.json";

// Components
import Dropdown from "../component/dropdown/Dropdown";
import HeaderTitle from "../component/header-title/HeaderTitle";
import Search from "../component/search/Search";
import List from "../component/list/List";

// Styles
import styles from "./Dashboard.module.css";
import Card from "../component/card/Card";

const Dashboard = () => {
  const [currency, setCurrency] = useState("EUR");
  const [searchText, setSearchText] = useState("");
  const [selectedOrderDetails, setSelectedOrderDetails] = useState({});
  const [selectedOrderTimeStamps, setSelectedOrderTimeStamps] = useState({});

  let ordersWithTimeStamp = mockData?.results?.map((item) => {
    // find the timestamp corresponding to item.&id
    const timeStamp = timestamps?.results?.find(
      (timeStamp) => timeStamp['&id'] === item['&id']
    );
    return {
      ...item,
      ...timeStamp,
    };
  })

  if(searchText) {
    ordersWithTimeStamp = ordersWithTimeStamp.filter((item) => {
      return item['&id'].includes(searchText);
    })
  }

  return (
    <div>
      <div className={styles.header}>
        <HeaderTitle primaryTitle="Orders" secondaryTitle={`${mockData?.results?.length} orders`} />
        <div className={styles.actionBox}>
          <Search
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
          />
          <Dropdown
            options={["GBP", "USD", "JPY", "EUR"]}
            onChange={(e) => setCurrency(e.target.value)}
            selectedItem={currency}
          />
        </div>
      </div>
      <div className={styles.content}>
        <div className={styles.section}>
          <Card
            cardData={selectedOrderDetails}
            title="Selected Order Details"
          />
          <Card
            cardData={selectedOrderTimeStamps}
            title="Selected Order Timestamps"
          />
        </div>
        <List 
          rows={ordersWithTimeStamp} 
          currency={currency} 
          setSelectedOrderDetails={setSelectedOrderDetails}
          setSelectedOrderTimeStamps={setSelectedOrderTimeStamps}
        />
      </div>
    </div>
  );
};

export default Dashboard;