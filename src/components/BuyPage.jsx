import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import storeItems from '../assets/storeItems';
import classes from './buyPage.module.css';

const BuyPage = () => {
  const { itemId } = useParams();
  const item = storeItems.find((item) => item.id === parseInt(itemId));
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    fullName: '',
    address: '',
    email: '',
    phoneNumber: '',
    creditCardNumber: ''
  });

  const [formErrors, setFormErrors] = useState({});

  if (!item) {
    return <div className={classes.noItem}>Item not found</div>;
  }

  const validate = () => {
    const errors = {};
    if (!/^[A-Za-z\s]+$/.test(formData.fullName)) {
      errors.fullName = 'Full Name should only contain letters and spaces';
    }
    if (!/\S+@\S+\.\S+/.test(formData.email)) {
      errors.email = 'Email is invalid';
    }
    if (!/^\d{10}$/.test(formData.phoneNumber)) {
      errors.phoneNumber = 'Phone Number should be in the format xxxxxxxxxx';
    }
    if (!/^\d{16}$/.test(formData.creditCardNumber.replace(/\s+/g, ''))) {
      errors.creditCardNumber = 'Credit Card Number should be 16 digits long';
    }
    return errors;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({ ...prevState, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const errors = validate();
    if (Object.keys(errors).length === 0) {
      const orderDetails = {
        orderId: Math.floor(Math.random() * 1000000), // Simple order number generation
        item,
        amount: item.price,
        billingInfo: formData
      };
      localStorage.setItem('orderDetails', JSON.stringify(orderDetails));
      navigate('/confirmation');
    } else {
      setFormErrors(errors);
    }
  };

  return (
    <div className={classes.container}>
      <h1>Buy {item.title}</h1>
      <div className={classes.itemInfo}>
        <p>{item.description}</p>
        <p>
          <strong>Discounted Price:</strong> ${item.discountPrice}
        </p>
        <p>
          <strong>Actual Price:</strong> ${item.price}
        </p>
        <p>
          <strong>Discount:</strong> {item.discountPercentage}%
        </p>
      </div>
      <form className={classes.form} onSubmit={handleSubmit}>
        <div>
          <label className={classes.label}>Full Name:</label>
          <input
            className={classes.input}
            type="text"
            name="fullName"
            value={formData.fullName}
            onChange={handleChange}
            required
          />
          {formErrors.fullName && <p className={classes.error}>{formErrors.fullName}</p>}
        </div>
        <div>
          <label className={classes.label}>Address:</label>
          <input
            className={classes.input}
            type="text"
            name="address"
            value={formData.address}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label className={classes.label}>Email:</label>
          <input
            className={classes.input}
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
          {formErrors.email && <p className={classes.error}>{formErrors.email}</p>}
        </div>
        <div>
          <label className={classes.label}>Phone Number:</label>
          <input
            className={classes.input}
            type="tel"
            name="phoneNumber"
            value={formData.phoneNumber}
            onChange={handleChange}
            required
            pattern="\d{10}"
          />
          {formErrors.phoneNumber && <p className={classes.error}>{formErrors.phoneNumber}</p>}
        </div>
        <div>
          <label className={classes.label}>Credit Card Number:</label>
          <input
            className={classes.input}
            type="text"
            name="creditCardNumber"
            value={formData.creditCardNumber}
            onChange={handleChange}
            required
            maxLength="19"
          />
          {formErrors.creditCardNumber && (
            <p className={classes.error}>{formErrors.creditCardNumber}</p>
          )}
        </div>
        <button type="submit">Submit Order</button>
      </form>
    </div>
  );
};

export default BuyPage;
