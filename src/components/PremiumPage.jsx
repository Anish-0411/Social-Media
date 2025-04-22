import React, { useState } from 'react';
import './PremiumPage.css';
// import './styles.css';
console.log('PremiumPage loaded');
const PremiumPage = () => {
  const [selectedPlan, setSelectedPlan] = useState(null);
  const [isYearly, setIsYearly] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const plans = [
    {
      name: 'Basic',
      priceMonthly: '$5/month',
      priceYearly: '$50/year',
      features: ['Ad-free experience', 'Priority support', 'Basic analytics'],
    },
    {
      name: 'Pro',
      priceMonthly: '$10/month',
      priceYearly: '$100/year',
      features: ['All Basic features', 'Advanced analytics', 'Exclusive content'],
    },
    {
      name: 'Elite',
      priceMonthly: '$20/month',
      priceYearly: '$200/year',
      features: ['All Pro features', 'Custom profile', 'Premium badge'],
    },
  ];

  const handlePlanSelect = (plan) => {
    setSelectedPlan(plan);
    setIsModalOpen(true);
  };

  const handleTogglePricing = () => {
    setIsYearly(!isYearly);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedPlan(null);
  };

  const handleProceedToPayment = () => {
    alert(`Proceeding to payment for ${selectedPlan.name} plan!`);
    setIsModalOpen(false);
    setSelectedPlan(null);
  };

  return (
    <div className="premium-page">
      {/* Header */}
      <header className="header">
        <h1>Choose Your Premium Plan</h1>
        <p>Unlock exclusive features with a subscription tailored for you.</p>

        {/* Toggle Switch for Monthly/Yearly Pricing */}
        <div className="toggle-container">
          <span>Monthly</span>
          <label className="switch">
            <input
              type="checkbox"
              checked={isYearly}
              onChange={handleTogglePricing}
            />
            <span className="slider"></span>
          </label>
          <span>Yearly (Save 16%)</span>
        </div>
      </header>

      {/* Subscription Plans */}
      <div className="plans-container">
        {plans.map((plan, index) => (
          <div
            key={index}
            className={`plan-card ${selectedPlan?.name === plan.name ? 'selected' : ''}`}
            onClick={() => handlePlanSelect(plan)}
          >
            <h2>{plan.name}</h2>
            <p className="price">{isYearly ? plan.priceYearly : plan.priceMonthly}</p>
            <ul>
              {plan.features.map((feature, i) => (
                <li key={i}>{feature}</li>
              ))}
            </ul>
            <button className="select-btn">Select Plan</button>
          </div>
        ))}
      </div>

      {/* Modal for Plan Confirmation */}
      {isModalOpen && (
        <div className="modal-overlay">
          <div className="modal">
            <h2>Confirm Your Selection</h2>
            <p>
              You have selected the <strong>{selectedPlan?.name}</strong> plan for{' '}
              {isYearly ? selectedPlan?.priceYearly : selectedPlan?.priceMonthly}.
            </p>
            <div className="modal-buttons">
              <button className="modal-btn cancel" onClick={handleCloseModal}>
                Cancel
              </button>
              <button className="modal-btn proceed" onClick={handleProceedToPayment}>
                Proceed to Payment
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Footer */}
      <footer className="footer">
        <p>© 2025 YourPlatform. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default PremiumPage;