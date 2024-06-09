import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import StoreListPage from './components/StoreListPage';
import BuyPage from './components/BuyPage';
import ConfirmationPage from './components/ConfirmationPage';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<StoreListPage />} />
        <Route path="/buy/:itemId" element={<BuyPage />} />
        <Route path="/confirmation" element={<ConfirmationPage />} />
      </Routes>
    </Router>
  );
};

export default App;
