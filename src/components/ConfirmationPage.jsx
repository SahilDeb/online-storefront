import React from 'react';
import classes from './confirmationPage.module.css';

const ConfirmationPage = () => {
  const orderDetails = JSON.parse(localStorage.getItem('orderDetails'));

  if (!orderDetails) {
    return <div className={classes.noOrder}>No order details found</div>;
  }

  const { orderId, item, amount, billingInfo } = orderDetails;

  return (
    <div className={classes.container}>
      <h1>Order Confirmation</h1>
      <p>Thank you for your purchase! Your order has been successfully placed.</p>
      <h2>Order Summary</h2>
      <p>
        <strong>Order Number:</strong> {orderId}
      </p>
      <p>
        <strong>Item:</strong> {item.name}
      </p>
      <p>
        <strong>Description:</strong> {item.description}
      </p>
      <p>
        <strong>Amount Charged:</strong> ${amount}
      </p>
      <h2>Billing Information</h2>
      <p>
        <strong>Full Name:</strong> {billingInfo.fullName}
      </p>
      <p>
        <strong>Address:</strong> {billingInfo.address}
      </p>
      <p>
        <strong>Email:</strong> {billingInfo.email}
      </p>
      <p>
        <strong>Phone Number:</strong> {billingInfo.phoneNumber}
      </p>
    </div>
  );
};

export default ConfirmationPage;
