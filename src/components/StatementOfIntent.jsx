import React from 'react';
import VoteButton from './VoteButton';
import '../styles/StatementOfIntent.css';

function StatementOfIntent() {
  return (
    <div className="statement-container">
      <div className="statement-header">
        <h2>📜 Statement of Intent</h2>
        <p className="statement-subtitle">
          A Comprehensive Plan for Responsible Alcohol Sales & Economic Growth
        </p>
      </div>

      <div className="statement-content">
        <div className="intro-section">
          <p className="intro-text">
            As your representative, I stand before you with a clear and urgent message: 
            <strong> Our alcohol sales industry is a critical economic engine that demands smart, responsible regulation.</strong>
          </p>
        </div>

        <div className="data-analysis">
          <h3>📊 What the Data Tells Us</h3>
          <p>
            The comprehensive sales data reveals several critical trends about our local economy:
          </p>
          <ul>
            <li>
              <strong>Warehouse sales significantly outpace retail sales</strong>, showing that bulk purchasing 
              and distribution are driving our economy. This demonstrates the importance of supporting 
              warehouse operations and distribution networks.
            </li>
            <li>
              <strong>Wine, Liquor, and Beer sales show consistent growth patterns</strong>, indicating a stable 
              and growing market that provides jobs and tax revenue to our community.
            </li>
            <li>
              <strong>Monthly fluctuations reveal seasonal patterns</strong> that businesses rely on for planning 
              and inventory management. Understanding these patterns is crucial for economic stability.
            </li>
            <li>
              <strong>Retail transfers show active distribution networks</strong>, demonstrating that our local 
              businesses are interconnected and supporting each other through supply chains.
            </li>
          </ul>
        </div>

        <div className="stance-section">
          <h3>🎯 My Stance: Supporting Business Growth While Ensuring Responsibility</h3>
          <p>
            I reject the false choice between economic growth and public safety. We can have both. My plan includes:
          </p>
          
          <div className="policy-points">
            <div className="policy-card">
              <h4>1. 🏢 Support Warehouse & Distribution Operations</h4>
              <ul>
                <li>Streamline licensing processes for warehouse operations</li>
                <li>Provide tax incentives for businesses that create distribution jobs</li>
                <li>Invest in infrastructure to support efficient supply chains</li>
                <li>Reduce regulatory barriers that slow down warehouse operations</li>
              </ul>
            </div>

            <div className="policy-card">
              <h4>2. 🛒 Strengthen Retail Sales Environment</h4>
              <ul>
                <li>Support small retail businesses with competitive tax rates</li>
                <li>Create programs to help retailers modernize their operations</li>
                <li>Ensure fair competition between large and small retailers</li>
                <li>Promote local retail through marketing and support programs</li>
              </ul>
            </div>

            <div className="policy-card">
              <h4>3. 📈 Data-Driven Economic Policy</h4>
              <ul>
                <li>Use sales data to inform economic development decisions</li>
                <li>Identify growth opportunities based on actual market trends</li>
                <li>Support businesses in high-performing categories</li>
                <li>Create forecasting tools to help businesses plan effectively</li>
              </ul>
            </div>

            <div className="policy-card">
              <h4>4. 🛡️ Responsible Sales Practices</h4>
              <ul>
                <li>Enforce age verification requirements strictly</li>
                <li>Support responsible serving training programs</li>
                <li>Promote safe consumption through public education</li>
                <li>Work with businesses to prevent sales to minors</li>
              </ul>
            </div>

            <div className="policy-card">
              <h4>5. 💰 Tax Revenue & Public Services</h4>
              <ul>
                <li>Ensure fair tax collection from all sales channels</li>
                <li>Use alcohol tax revenue to fund public services</li>
                <li>Support addiction treatment and prevention programs</li>
                <li>Invest in public safety and health initiatives</li>
              </ul>
            </div>

            <div className="policy-card">
              <h4>6. 🌱 Support Local Suppliers & Businesses</h4>
              <ul>
                <li>Create incentives for local suppliers and distributors</li>
                <li>Support small businesses in the alcohol industry</li>
                <li>Promote local products and brands</li>
                <li>Ensure fair competition in the marketplace</li>
              </ul>
            </div>
          </div>
        </div>

        <div className="funding-section">
          <h3>💰 Economic Impact</h3>
          <p>
            This comprehensive plan will:
          </p>
          <ul>
            <li>Create jobs in warehouse, distribution, and retail sectors</li>
            <li>Generate tax revenue to fund public services</li>
            <li>Support local businesses and suppliers</li>
            <li>Maintain responsible sales practices</li>
          </ul>
          <p className="funding-note">
            <strong>Every dollar in sales generates tax revenue and supports local jobs.</strong> 
            By supporting this industry responsibly, we strengthen our economy while maintaining public safety.
          </p>
        </div>

        <div className="commitment-section">
          <h3>✊ My Commitment to You</h3>
          <p>
            If you elect me, I promise to:
          </p>
          <ul>
            <li>Make <strong>economic growth through responsible sales</strong> a top priority</li>
            <li>Use data to inform all policy decisions</li>
            <li>Support businesses while ensuring public safety</li>
            <li>Create quarterly reports on sales trends and economic impact</li>
            <li>Work with businesses to create win-win solutions</li>
          </ul>
        </div>

        <div className="call-to-action">
          <h3>🗳️ Your Voice Matters</h3>
          <p>
            By voting below, you are expressing your support for this comprehensive 
            approach to supporting our local economy through responsible alcohol sales regulation. 
            Together, we can create jobs, generate revenue, and maintain safety.
          </p>
          
          <VoteButton />
          
          <p className="closing-message">
            <strong>The time for outdated policies is over. The time for data-driven, responsible growth is now.</strong>
          </p>
          <p className="signature">
            — Your Candidate for Economic Growth
          </p>
        </div>
      </div>
    </div>
  );
}

export default StatementOfIntent;
