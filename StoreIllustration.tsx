// Illustrated boutique storefront — the original visual representation of the store
interface StoreIllustrationProps {
  isOpen: boolean;
  salePercent: number;
  newArrival: boolean;
  onClick?: () => void;
}

export function StoreIllustration({ isOpen, salePercent, newArrival, onClick }: StoreIllustrationProps) {
  return (
    <div
      onClick={onClick}
      className="relative w-full rounded-xl overflow-hidden transition-all duration-700 cursor-pointer group"
      style={{
        background: 'linear-gradient(180deg, #c0b49a 0%, #d4c5a9 60%, #a89070 100%)',
        filter: isOpen ? 'none' : 'brightness(0.62) saturate(0.5)',
        boxShadow: '0 0 0 0 rgba(167,139,250,0)',
        transition: 'filter 0.7s, box-shadow 0.3s',
      }}
    >
      {/* Hover ring */}
      <div
        className="absolute inset-0 rounded-xl pointer-events-none z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
        style={{ border: '2px solid rgba(167,139,250,0.7)', boxShadow: '0 0 24px 4px rgba(167,139,250,0.18)' }}
      />

      {/* Click hint */}
      <div
        className="absolute top-2 right-2 z-20 px-2 py-1 rounded-full text-xs font-bold opacity-0 group-hover:opacity-100 transition-opacity duration-200"
        style={{ background: 'rgba(167,139,250,0.9)', color: '#fff', fontSize: 9 }}
      >
        Open Dashboard →
      </div>

      {/* Awning */}
      <div className="w-full h-10 relative overflow-hidden" style={{ backgroundColor: '#8b1a1a' }}>
        {Array.from({ length: 14 }).map((_, i) => (
          <div
            key={i}
            className="absolute top-0 bottom-0"
            style={{ left: `${i * 7.2}%`, width: '3.8%', background: '#6b1111', opacity: 0.6, transform: 'skewX(-12deg)' }}
          />
        ))}
      </div>

      {/* Sign bar */}
      <div
        className="w-full py-2 text-center font-black tracking-widest text-lg select-none"
        style={{ background: '#2a1a0a', color: '#f5e6c8', letterSpacing: '0.18em' }}
      >
        MAISON · BOUTIQUE
      </div>

      {/* Storefront body */}
      <div className="flex gap-3 px-3 pt-3 pb-2">
        {/* Left window */}
        <div
          className="flex-1 rounded-sm overflow-hidden relative"
          style={{ background: '#e8dcc8', border: '3px solid #8b6f47', minHeight: 120 }}
        >
          <div className="absolute inset-0 p-2 flex flex-col gap-1">
            <div className="flex gap-1 items-end">
              <div className="flex flex-col items-center">
                <div className="rounded-full" style={{ width: 20, height: 26, background: '#d4837a' }} />
                <div style={{ width: 8, height: 4, background: '#c07068' }} />
              </div>
              <div style={{ width: 16, height: 32, background: '#8faabc', borderRadius: 2 }} />
              <div style={{ width: 16, height: 20, background: '#7d6b5d', borderRadius: 2 }} />
            </div>
            <div
              className="mt-1 flex-1 rounded-sm flex items-center justify-center text-xs font-medium"
              style={{ background: '#f0e8d5', border: '2px solid #c9a87c', color: '#7d6b5d', minHeight: 28 }}
            >
              display
            </div>
          </div>
          {newArrival && (
            <div
              className="absolute top-1 right-1 animate-new-badge-bounce text-white font-bold px-1 rounded"
              style={{ background: '#16a34a', fontSize: 9 }}
            >
              NEW
            </div>
          )}
        </div>

        {/* Right window */}
        <div
          className="flex-1 rounded-sm overflow-hidden relative"
          style={{ background: '#e8dcc8', border: '3px solid #8b6f47', minHeight: 120 }}
        >
          <div className="absolute inset-0 p-2 flex flex-col gap-1">
            <div className="text-xs font-medium" style={{ color: '#7d6b5d' }}>new</div>
            <div className="flex gap-1 mt-1 flex-wrap">
              {[
                { w: 20, h: 26, bg: '#e8dcc8', border: '#c9a87c' },
                { w: 16, h: 20, bg: '#94b4c4' },
                { w: 14, h: 22, bg: '#5b8fa8' },
                { w: 16, h: 16, bg: '#4a7a8a' },
              ].map((b, i) => (
                <div
                  key={i}
                  style={{ width: b.w, height: b.h, background: b.bg, border: b.border ? `2px solid ${b.border}` : undefined, borderRadius: 2 }}
                />
              ))}
            </div>
          </div>
          {salePercent > 0 && (
            <div
              className="absolute bottom-2 right-2 animate-sale-badge text-white font-bold px-2 py-1 rounded shadow-lg"
              style={{ background: '#c0392b', fontSize: 10, whiteSpace: 'nowrap' }}
            >
              SALE · {salePercent}% off
            </div>
          )}
        </div>
      </div>

      {/* Doors row */}
      <div className="flex gap-3 px-3 pb-3">
        {/* Left door */}
        <div
          className="flex-1 rounded-sm overflow-hidden relative animate-door-glow"
          style={{ background: '#c4a882', border: '2px solid', borderColor: isOpen ? 'rgba(251,191,36,0.5)' : 'rgba(100,100,100,0.3)', minHeight: 68 }}
        >
          <div className="absolute inset-2 flex gap-1">
            <div className="flex-1 rounded-sm" style={{ background: 'rgba(180,220,255,0.25)', border: '1px solid rgba(255,255,255,0.3)' }} />
            <div className="flex-1 rounded-sm" style={{ background: 'rgba(180,220,255,0.25)', border: '1px solid rgba(255,255,255,0.3)' }} />
          </div>
          <div
            className={`absolute bottom-2 left-2 px-1.5 py-0.5 rounded text-white font-bold ${isOpen ? 'animate-sign-pulse' : 'animate-sign-pulse-closed'}`}
            style={{ background: isOpen ? '#16a34a' : '#dc2626', fontSize: 9, whiteSpace: 'nowrap' }}
          >
            {isOpen ? 'OPEN · 9am–8pm' : 'CLOSED'}
          </div>
          <div className="absolute" style={{ right: 6, top: '50%', width: 5, height: 5, background: '#8b6f47', borderRadius: '50%', transform: 'translateY(-50%)' }} />
        </div>

        {/* Right door */}
        <div
          className="flex-1 rounded-sm overflow-hidden relative"
          style={{ background: '#c4a882', border: '2px solid rgba(100,100,100,0.2)', minHeight: 68 }}
        >
          <div className="absolute inset-2 flex gap-1">
            <div className="flex-1 rounded-sm" style={{ background: 'rgba(180,220,255,0.25)', border: '1px solid rgba(255,255,255,0.3)' }} />
            <div className="flex-1 rounded-sm" style={{ background: 'rgba(180,220,255,0.15)', border: '1px solid rgba(255,255,255,0.2)' }} />
          </div>
          <div className="absolute" style={{ left: 6, top: '50%', width: 5, height: 5, background: '#8b6f47', borderRadius: '50%', transform: 'translateY(-50%)' }} />
        </div>
      </div>

      {/* Sidewalk */}
      <div className="w-full h-3" style={{ background: '#b0a090', borderTop: '2px solid #8b7a6a' }} />

      {/* Closed overlay */}
      {!isOpen && (
        <div className="absolute inset-0 rounded-xl flex items-center justify-center pointer-events-none" style={{ background: 'rgba(0,0,0,0.18)' }}>
          <div className="px-4 py-1.5 rounded font-black text-white tracking-widest text-sm" style={{ background: 'rgba(220,38,38,0.85)', letterSpacing: '0.2em' }}>
            CLOSED
          </div>
        </div>
      )}
    </div>
  );
}