// Platform controls — simulates store owner actions visible to both sides
import { Store, Percent, Sparkles, RotateCcw } from 'lucide-react';

interface ControlsBarProps {
  isOpen: boolean;
  salePercent: number;
  newArrival: boolean;
  visitorCount: number;
  onToggleOpen: () => void;
  onSaleChange: (v: number) => void;
  onToggleNew: () => void;
  onReset: () => void;
}

function Toggle({ active, onClick, activeColor }: { active: boolean; onClick: () => void; activeColor: string }) {
  return (
    <button
      onClick={onClick}
      className="relative inline-flex items-center rounded-full transition-colors duration-300 focus:outline-none flex-shrink-0"
      style={{ width: 40, height: 22, background: active ? activeColor : 'rgba(255,255,255,0.1)' }}
    >
      <span
        className="inline-block rounded-full bg-white shadow transition-transform duration-300"
        style={{ width: 16, height: 16, transform: active ? 'translateX(20px)' : 'translateX(3px)' }}
      />
    </button>
  );
}

export function ControlsBar({
  isOpen, salePercent, newArrival, visitorCount,
  onToggleOpen, onSaleChange, onToggleNew, onReset,
}: ControlsBarProps) {
  return (
    <div
      className="rounded-2xl px-5 py-4 flex flex-col gap-4"
      style={{ background: '#0d0b16', border: '1px solid rgba(167,139,250,0.15)' }}
    >
      {/* Section label */}
      <div className="flex items-center justify-between">
        <span className="text-xs font-black tracking-widest" style={{ color: '#a78bfa', letterSpacing: '0.15em' }}>
          STORE CONTROLS
        </span>
        <button
          onClick={onReset}
          className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-semibold transition-all duration-200 hover:opacity-80 active:scale-95"
          style={{ background: 'rgba(167,139,250,0.1)', color: '#a78bfa', border: '1px solid rgba(167,139,250,0.2)' }}
        >
          <RotateCcw size={10} />
          Reset
        </button>
      </div>

      {/* Controls grid */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {/* Store open/closed */}
        <div
          className="flex items-center gap-3 px-3 py-2.5 rounded-xl"
          style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.06)' }}
        >
          <Store size={14} style={{ color: isOpen ? '#22c55e' : '#ef4444' }} />
          <div className="flex-1">
            <div className="text-xs font-bold" style={{ color: '#e2d9f3' }}>Store Status</div>
            <div className="text-xs" style={{ color: isOpen ? '#22c55e' : '#ef4444', fontSize: 10 }}>
              {isOpen ? 'Open for orders' : 'Currently closed'}
            </div>
          </div>
          <Toggle active={isOpen} onClick={onToggleOpen} activeColor="#22c55e" />
        </div>

        {/* Sale slider */}
        <div
          className="flex flex-col gap-2 px-3 py-2.5 rounded-xl"
          style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.06)' }}
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-1.5">
              <Percent size={12} style={{ color: '#fbbf24' }} />
              <span className="text-xs font-bold" style={{ color: '#e2d9f3' }}>Sale Discount</span>
            </div>
            <span className="text-xs font-black" style={{ color: '#fbbf24' }}>{salePercent}%</span>
          </div>
          <input
            type="range"
            min={0} max={70} step={5}
            value={salePercent}
            onChange={e => onSaleChange(Number(e.target.value))}
            className="w-full cursor-pointer"
            style={{ accentColor: '#fbbf24' }}
          />
        </div>

        {/* New Arrival toggle */}
        <div
          className="flex items-center gap-3 px-3 py-2.5 rounded-xl"
          style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.06)' }}
        >
          <Sparkles size={14} style={{ color: newArrival ? '#a78bfa' : '#4a3a6a' }} />
          <div className="flex-1">
            <div className="text-xs font-bold" style={{ color: '#e2d9f3' }}>New Drop</div>
            <div className="text-xs" style={{ color: newArrival ? '#a78bfa' : '#4a3a6a', fontSize: 10 }}>
              {newArrival ? 'Visible to buyers' : 'Hidden from feed'}
            </div>
          </div>
          <Toggle active={newArrival} onClick={onToggleNew} activeColor="#a78bfa" />
        </div>
      </div>

      {/* Stats row */}
      <div
        className="flex flex-wrap gap-x-6 gap-y-1 pt-1"
        style={{ borderTop: '1px solid rgba(255,255,255,0.05)' }}
      >
        {[
          { label: 'Status', value: isOpen ? 'Open' : 'Closed', color: isOpen ? '#22c55e' : '#ef4444' },
          { label: 'Active Promotion', value: salePercent > 0 ? `${salePercent}% off` : 'None', color: salePercent > 0 ? '#fbbf24' : '#4a3a6a' },
          { label: 'New Drop Live', value: newArrival ? 'Yes' : 'No', color: newArrival ? '#a78bfa' : '#4a3a6a' },
          { label: "Today's Buyers", value: visitorCount.toLocaleString(), color: '#34d399' },
        ].map(s => (
          <span key={s.label} className="text-xs" style={{ color: '#4a3a6a' }}>
            {s.label}:{' '}
            <span className="font-bold" style={{ color: s.color }}>{s.value}</span>
          </span>
        ))}
      </div>
    </div>
  );
}