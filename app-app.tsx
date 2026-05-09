'use client';

import '@/index.css';
import { useState, useEffect, useCallback } from 'react';
import { ArrowLeft } from 'lucide-react';
import { StoreIllustration } from './StoreIllustration';
import { ShopperIllustration } from './ShopperIllustration';
import { StoreFacade } from './StoreFacade';
import { ShopperAisle } from './ShopperAisle';
import { ControlsBar } from './ControlsBar';

type View = 'landing' | 'store' | 'buyer';

const INITIAL_STATE = {
  isOpen: true,
  salePercent: 30,
  newArrival: true,
  visitorCount: 312,
};

function BackButton({ onClick }: { onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      className="flex items-center gap-2 px-3 py-1.5 rounded-xl text-xs font-semibold transition-all duration-200 hover:opacity-80 active:scale-95"
      style={{ background: 'rgba(255,255,255,0.07)', color: '#a09070', border: '1px solid rgba(255,255,255,0.1)' }}
    >
      <ArrowLeft size={13} />
      Back to overview
    </button>
  );
}

function App() {
  const [view, setView] = useState<View>('landing');
  const [isOpen, setIsOpen] = useState(INITIAL_STATE.isOpen);
  const [salePercent, setSalePercent] = useState(INITIAL_STATE.salePercent);
  const [newArrival, setNewArrival] = useState(INITIAL_STATE.newArrival);
  const [visitorCount, setVisitorCount] = useState(INITIAL_STATE.visitorCount);

  useEffect(() => {
    if (!isOpen) return;
    const id = setInterval(() => setVisitorCount(v => v + 1), 4000);
    return () => clearInterval(id);
  }, [isOpen]);

  const handleReset = useCallback(() => {
    setIsOpen(INITIAL_STATE.isOpen);
    setSalePercent(INITIAL_STATE.salePercent);
    setNewArrival(INITIAL_STATE.newArrival);
    setVisitorCount(INITIAL_STATE.visitorCount);
  }, []);

  return (
    <div
      className="min-h-screen w-full flex flex-col"
      style={{ background: '#0a0812', fontFamily: 'var(--font-sans)' }}
    >
      <div className="flex flex-col gap-6 p-5 max-w-5xl mx-auto w-full">

        {/* Platform header */}
        <div className="flex items-center justify-between pt-2 animate-slide-up-in">
          <div className="flex items-center gap-2">
            <span className="text-xl">🏙️</span>
            <span className="font-black text-xl" style={{ color: '#f0eafa', letterSpacing: '0.04em' }}>nearfash</span>
            <span
              className="text-xs font-bold px-2 py-0.5 rounded-full"
              style={{ background: 'rgba(52,211,153,0.15)', color: '#34d399', border: '1px solid rgba(52,211,153,0.3)' }}
            >
              BETA
            </span>
          </div>
          {view !== 'landing' && <BackButton onClick={() => setView('landing')} />}
        </div>

        {/* ── LANDING VIEW ── */}
        {view === 'landing' && (
          <>
            <div className="text-center animate-slide-up-in" style={{ animationDelay: '60ms' }}>
              <p className="text-sm" style={{ color: '#4a3a6a' }}>
                Hyperlocal fashion discovery · connecting local stores with city shoppers
              </p>
              <p className="text-xs mt-1" style={{ color: '#332a50' }}>
                Click a panel to explore its experience
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Store side */}
              <div className="flex flex-col gap-2 animate-slide-up-in" style={{ animationDelay: '100ms' }}>
                <div className="text-center">
                  <p className="font-bold text-sm" style={{ color: '#a78bfa' }}>Store-facing</p>
                  <p className="text-xs" style={{ color: '#4a3a6a' }}>The physical retail presence</p>
                </div>
                <div className="animate-float-y-slow">
                  <StoreIllustration
                    isOpen={isOpen}
                    salePercent={salePercent}
                    newArrival={newArrival}
                    onClick={() => setView('store')}
                  />
                </div>
                <p className="text-center text-xs" style={{ color: '#4a3a6a' }}>
                  Street view · managing presence
                </p>
              </div>

              {/* Shopper side */}
              <div className="flex flex-col gap-2 animate-slide-up-in" style={{ animationDelay: '200ms' }}>
                <div className="text-center">
                  <p className="font-bold text-sm" style={{ color: '#34d399' }}>Shopper-facing</p>
                  <p className="text-xs" style={{ color: '#4a3a6a' }}>The human browsing experience</p>
                </div>
                <ShopperIllustration
                  newArrival={newArrival}
                  visitorCount={visitorCount}
                  onClick={() => setView('buyer')}
                />
                <p className="text-center text-xs" style={{ color: '#4a3a6a' }}>
                  Aisle view · browsing &amp; discovering
                </p>
              </div>
            </div>
          </>
        )}

        {/* ── STORE DASHBOARD VIEW ── */}
        {view === 'store' && (
          <div className="flex flex-col gap-4 animate-slide-up-in">
            <div className="text-center">
              <p className="font-bold text-sm" style={{ color: '#a78bfa' }}>Store Dashboard</p>
              <p className="text-xs" style={{ color: '#4a3a6a' }}>Manage your local presence · Bandra West, Mumbai</p>
            </div>
            <StoreFacade isOpen={isOpen} salePercent={salePercent} newArrival={newArrival} visitorCount={visitorCount} />
            <ControlsBar
              isOpen={isOpen}
              salePercent={salePercent}
              newArrival={newArrival}
              visitorCount={visitorCount}
              onToggleOpen={() => setIsOpen(v => !v)}
              onSaleChange={setSalePercent}
              onToggleNew={() => setNewArrival(v => !v)}
              onReset={handleReset}
            />
          </div>
        )}

        {/* ── BUYER DISCOVERY VIEW ── */}
        {view === 'buyer' && (
          <div className="flex flex-col gap-4 animate-slide-up-in">
            <div className="text-center">
              <p className="font-bold text-sm" style={{ color: '#34d399' }}>Buyer Discovery</p>
              <p className="text-xs" style={{ color: '#4a3a6a' }}>Explore fashion near you · Mumbai</p>
            </div>
            <ShopperAisle newArrival={newArrival} visitorCount={visitorCount} salePercent={salePercent} />
          </div>
        )}

      </div>
    </div>
  );
}

export default App;