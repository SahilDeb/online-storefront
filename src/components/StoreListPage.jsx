import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import storeItems from '../assets/storeItems';
import { AiFillShopping } from 'react-icons/ai';
import classes from './storeListPage.module.css';

const StoreListPage = () => {
  const [items, setItems] = useState(storeItems);
  const [filter, setFilter] = useState('');
  const [sortConfig, setSortConfig] = useState({ key: null, direction: null });
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const navigate = useNavigate();

  const handleSort = (key) => {
    let direction = 'ascending';
    if (sortConfig.key === key && sortConfig.direction === 'ascending') {
      direction = 'descending';
    }
    setSortConfig({ key, direction });
    setItems(
      [...items].sort((a, b) => {
        if (a[key] < b[key]) return direction === 'ascending' ? -1 : 1;
        if (a[key] > b[key]) return direction === 'ascending' ? 1 : -1;
        return 0;
      })
    );
  };

  const handleFilter = (event) => {
    setFilter(event.target.value);
  };

  const filteredItems = items.filter((item) =>
    item.title.toLowerCase().includes(filter.toLowerCase())
  );

  return (
    <div className={classes.container}>
      <header className={classes.header}>
        <AiFillShopping size={35} />
        <br />
        <h1>MyStoreFront</h1>
      </header>
      <div className={classes.mainContent}>
        <div className={classes.content}>
          <input
            className={classes.filterText}
            type="text"
            placeholder="Filter by name"
            value={filter}
            onChange={handleFilter}
          />
          <table>
            <thead className={classes.table}>
              <tr className={classes.tableRow}>
                <th className={classes.tableHeader}>Thumbnail</th>
                <th className={classes.tableHeader} onClick={() => handleSort('title')}>
                  Name {sortConfig.direction === 'ascending' ? '↑' : '↓'}
                </th>
                <th className={classes.tableHeader}>Description</th>
                <th className={classes.tableHeader}>Discounted Price</th>
                <th className={classes.tableHeader} onClick={() => handleSort('price')}>
                  Actual Price {sortConfig.direction === 'ascending' ? '↑' : '↓'}
                </th>
                <th className={classes.tableHeader}>Discount</th>
                <th className={classes.tableHeader}>Action</th>
              </tr>
            </thead>
            <tbody className={classes.table}>
              {filteredItems.map((item) => (
                <tr className={classes.tableRow} key={item.id}>
                  <td className={classes.tableCell}>
                    <img className={classes.image} src={item.thumbnail} />
                  </td>
                  <td className={`${classes.tableCell} ${classes.name}`}>{item.title}</td>
                  <td className={`${classes.tableCell} ${classes.description}`}>
                    {item.description}
                  </td>
                  <td className={`${classes.tableCell} ${classes.rightAlignment}`}>
                    {item.discountPrice}
                  </td>
                  <td className={`${classes.tableCell} ${classes.rightAlignment}`}>{item.price}</td>
                  <td className={`${classes.tableCell} ${classes.centerAlignment}`}>
                    {item.discountPercentage}%
                  </td>
                  <td className={`${classes.tableCell} ${classes.centerAlignment}`}>
                    <button onClick={() => navigate(`/buy/${item.id}`)}>Buy</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default StoreListPage;
