import { useDemoMode } from '../../context/DemoModeContext';

interface DemoToggleProps {
  mobile?: boolean;
}

export const DemoToggle = ({ mobile = false }: DemoToggleProps) => {
  const { isDemoMode, toggleDemoMode } = useDemoMode();

  return (
    <button
      onClick={toggleDemoMode}
      className={`demo-toggle ${isDemoMode ? 'active' : ''} ${
        mobile ? 'w-full justify-center py-2 px-3' : ''
      }`}
      aria-label={isDemoMode ? 'Exit demo mode' : 'Enter demo mode'}
    >
      <span className="demo-toggle-label">
        {isDemoMode ? 'DEMO MODE' : 'TRY DEMO'}
      </span>
      <span className="demo-toggle-indicator" />
    </button>
  );
};