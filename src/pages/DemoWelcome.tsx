// src/pages/DemoWelcome.tsx
import { useDemoMode } from '../context/DemoModeContext';
import Button  from '../ui/common/Button';

export default function DemoWelcome() {
  const { toggleDemoMode } = useDemoMode();

  return (
    <div className="demo-welcome-container">
      <div className="demo-welcome-card">
        <h1>Demo Trading Mode</h1>
        <p>
          You're about to enter demo mode with 1,000,000 EPG virtual money.
          All trades and portfolio changes will be simulated.
        </p>
        
        <div className="demo-features">
          <h2>Features:</h2>
          <ul>
            <li>Virtual 1,000,000 EGP starting balance</li>
            <li>Real-time market data with simulated trading</li>
            <li>Full portfolio tracking</li>
            <li>Watchlist functionality</li>
            <li>No risk to your real money</li>
          </ul>
        </div>

        <div className="demo-actions">
          <Button 
            onClick={toggleDemoMode}
            variant="primary"
          >
            Exit Demo Mode
          </Button>
          <Button 
            onClick={() => {/* Start demo */}}
            variant="success"
          >
            Start Trading in Demo Mode
          </Button>
        </div>
      </div>
    </div>
  );
}