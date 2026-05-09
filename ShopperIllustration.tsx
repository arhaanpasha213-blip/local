// Illustrated aisle with animated human shopper — the original visual representation of the buyer
interface ShopperIllustrationProps {
  newArrival: boolean;
  visitorCount: number;
  onClick?: () => void;
}

const SHELF_COLORS = [
  ['#b5c9d8','#94b4c4','#c5bba8','#8faabc','#a8c4d4','#d4cbb8','#7d9aaa','#bac8d5'],
  ['#d4cbb8','#c5bba8','#94b4c4','#b5c9d8','#8faabc','#c8d5df','#9aaebc','#d8cfc0'],
  ['#8faabc','#b5c9d8','#d4cbb8','#94b4c4','#bac5cc','#c5bba8','#a8c4d4','#d0c8b8'],
  ['#c5bba8','#8faabc','#b5c9d8','#d4cbb8','#94b4c4','#bac8d5','#a0b8c8','#ccc4b4'],
  ['#94b4c4','#d4cbb8','#8faabc','#b5c9d8','#c5bba8','#7d9aaa','#b8c8d5','#d4ccbc'],
];

const SHELF_WIDTHS = [
  [18,14,16,20,12,18,14,16],
  [14,20,12,16,18,14,20,12],
  [16,12,18,14,20,16,12,18],
  [20,16,14,12,18,20,16,14],
  [12,18,20,16,14,12,18,20],
];

export function ShopperIllustration({ newArrival, visitorCount, onClick }: ShopperIllustrationProps) {
  return (
    <div
      onClick={onClick}
      className="relative w-full rounded-xl overflow-hidden cursor-pointer group"
      style={{ background: '#3a2f20', border: '2px solid #5a4a30' }}
    >
      {/* Hover ring */}
      <div
        className="absolute inset-0 rounded-xl pointer-events-none z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
        style={{ border: '2px solid rgba(52,211,153,0.7)', boxShadow: '0 0 24px 4px rgba(52,211,153,0.15)' }}
      />

      {/* Click hint */}
      <div
        className="absolute top-10 right-2 z-20 px-2 py-1 rounded-full text-xs font-bold opacity-0 group-hover:opacity-100 transition-opacity duration-200"
        style={{ background: 'rgba(52,211,153,0.9)', color: '#0f0f1a', fontSize: 9 }}
      >
        Open Buyer App →
      </div>

      {/* Browser chrome top bar */}
      <div
        className="flex items-center gap-2 px-3 py-2"
        style={{ background: '#2a1f12', borderBottom: '1px solid #4a3a22' }}
      >
        <div className="flex gap-1.5">
          <div className="w-3 h-3 rounded-full" style={{ background: '#ff5f57' }} />
          <div className="w-3 h-3 rounded-full" style={{ background: '#ffbd2e' }} />
          <div className="w-3 h-3 rounded-full" style={{ background: '#28ca41' }} />
        </div>
        <div className="flex-1 text-center text-xs" style={{ color: '#c4a87a', letterSpacing: '0.12em', fontFamily: 'monospace' }}>
          interior — shelf view
        </div>
      </div>

      {/* Shelf area */}
      <div className="relative" style={{ background: '#e8dcc8' }}>
        {/* Rating badge */}
        <div
          className="absolute top-2 left-2 z-20 animate-float-y flex items-center gap-1 px-2 py-1 rounded-full text-xs font-bold shadow-lg"
          style={{ background: '#4db6ac', color: '#fff', fontSize: 10 }}
        >
          <span className="animate-star-twinkle">★</span>
          <span>4.9 · {(312 + Math.floor(visitorCount / 3)).toLocaleString()}</span>
        </div>

        {/* NEW IN badge */}
        {newArrival && (
          <div
            className="absolute top-2 right-2 z-20 animate-new-badge-bounce px-2 py-1 rounded font-black shadow-lg"
            style={{ background: '#f5f0e8', color: '#5a4a30', border: '1.5px solid #c4a87a', fontSize: 10, letterSpacing: '0.08em' }}
          >
            NEW IN
          </div>
        )}

        {/* Shelves */}
        <div className="flex flex-col gap-0 pt-8">
          {SHELF_COLORS.map((colors, rowIdx) => (
            <div
              key={rowIdx}
              className="flex items-end gap-0.5 px-2 relative overflow-hidden"
              style={{ background: '#c4a87a', borderBottom: '6px solid #a08050', paddingTop: 4, paddingBottom: 2 }}
            >
              <div className="shelf-shimmer absolute inset-0 pointer-events-none" />
              {colors.map((color, i) => (
                <div
                  key={i}
                  className="rounded-sm hover:scale-110 transition-transform duration-200"
                  style={{ width: SHELF_WIDTHS[rowIdx][i], height: 28 + (i % 3) * 8, background: color, border: '1px solid rgba(0,0,0,0.08)', flexShrink: 0 }}
                />
              ))}
            </div>
          ))}
        </div>

        {/* Aisle floor with animated shopper */}
        <div className="relative" style={{ background: '#d4b896', height: 52 }}>
          {/* Shopper character */}
          <div className="animate-shopper-walk absolute bottom-0" style={{ width: 32 }}>
            <div className="animate-shopper-lean" style={{ transformOrigin: 'bottom center' }}>
              {/* Head */}
              <div className="mx-auto rounded-full" style={{ width: 14, height: 14, background: '#6b4c3b' }} />
              {/* Hijab */}
              <div className="mx-auto rounded-t-full" style={{ width: 18, height: 10, background: '#5a3d2b', marginTop: -8 }} />
              {/* Body / coat */}
              <div className="mx-auto rounded-sm" style={{ width: 22, height: 28, background: '#7d5a3c' }} />
              {/* Bag */}
              <div className="absolute" style={{ right: 2, top: 18, width: 10, height: 14, background: '#c4a07a', borderRadius: 3, border: '1px solid #a08050' }} />
              {/* Legs */}
              <div className="mx-auto flex gap-1">
                <div style={{ width: 8, height: 12, background: '#5a3d2b', borderRadius: '0 0 2px 2px' }} />
                <div style={{ width: 8, height: 12, background: '#5a3d2b', borderRadius: '0 0 2px 2px' }} />
              </div>
            </div>
            {/* Shopping list clipboard */}
            <div
              className="animate-clipboard-bob absolute"
              style={{ left: -14, top: 16, width: 14, height: 16, background: '#f5f0e8', borderRadius: 2, border: '1px solid #c4a87a' }}
            >
              <div className="flex flex-col gap-0.5 px-1 mt-1">
                {[3, 4, 2].map((w, i) => (
                  <div key={i} style={{ height: 1.5, width: `${w * 25}%`, background: '#c4a87a', borderRadius: 1 }} />
                ))}
              </div>
            </div>
          </div>

          {/* Aisle label */}
          <div
            className="absolute bottom-1 right-2 text-xs rounded px-1.5 py-0.5"
            style={{ background: 'rgba(90,70,40,0.35)', color: '#c4a87a', fontSize: 9 }}
          >
            list
          </div>
        </div>
      </div>

      {/* Visitor counter footer */}
      <div
        className="flex items-center justify-between px-3 py-1.5"
        style={{ background: '#2a1f12', borderTop: '1px solid #4a3a22' }}
      >
        <span className="text-xs" style={{ color: '#c4a87a', fontSize: 10 }}>👁 Live visitors</span>
        <span key={visitorCount} className="font-bold animate-slide-up-in" style={{ color: '#4db6ac', fontSize: 12 }}>
          {visitorCount.toLocaleString()}
        </span>
      </div>
    </div>
  );
}