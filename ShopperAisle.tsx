// Buyer Discovery Feed — represents the shopper's city-based fashion discovery experience
import { useState, useEffect } from 'react';
import { MapPin, Heart, Star, Clock, Sparkles, Navigation, Filter, Search } from 'lucide-react';

interface ShopperAisleProps {
  newArrival: boolean;
  visitorCount: number;
  salePercent: number;
}

const PRODUCTS = [
  { id: 1, name: 'Silk Wrap Dress', store: 'Atelier Mira', dist: '0.4 km', price: 2800, orig: 3500, tag: 'New Drop', tagColor: '#a78bfa', img: '👗', liked: false },
  { id: 2, name: 'Linen Co-ord Set', store: 'Label Zara Collective', dist: '1.1 km', price: 3200, orig: null, tag: 'Trending', tagColor: '#f97316', img: '👔', liked: true },
  { id: 3, name: 'Crop Blazer', store: 'Bandra Archive', dist: '0.8 km', price: 4100, orig: 5200, tag: 'Sale', tagColor: '#fbbf24', img: '🧥', liked: false },
  { id: 4, name: 'Printed Kurta', store: 'Rang by Riya', dist: '1.6 km', price: 1600, orig: null, tag: 'Nearby', tagColor: '#34d399', img: '👘', liked: false },
];

const NEARBY_STORES = [
  { name: 'Atelier Mira', type: 'Luxury Ethnic', dist: '0.4 km', open: true, rating: 4.9, color: '#a78bfa' },
  { name: 'Bandra Archive', type: 'Contemporary', dist: '0.8 km', open: true, rating: 4.7, color: '#34d399' },
  { name: 'Label Zara', type: 'Indo-Western', dist: '1.1 km', open: false, rating: 4.5, color: '#f97316' },
];

function ProductCard({ product, salePercent, newArrival, delay }: {
  product: typeof PRODUCTS[0];
  salePercent: number;
  newArrival: boolean;
  delay: number;
}) {
  const [liked, setLiked] = useState(product.liked);
  const effectivePrice = (product.tag === 'Sale' && salePercent > 0)
    ? Math.round(product.price * (1 - salePercent / 100))
    : product.price;

  return (
    <div
      className="flex items-center gap-3 px-3 py-2.5 rounded-xl cursor-pointer transition-all duration-200 hover:scale-[1.02] animate-slide-up-in"
      style={{
        background: 'rgba(255,255,255,0.04)',
        border: '1px solid rgba(255,255,255,0.07)',
        animationDelay: `${delay}ms`,
      }}
    >
      {/* Emoji product icon */}
      <div
        className="flex items-center justify-center rounded-xl flex-shrink-0 text-2xl"
        style={{ width: 48, height: 48, background: 'rgba(167,139,250,0.1)', fontSize: 24 }}
      >
        {product.img}
      </div>

      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-1.5 mb-0.5">
          <span className="text-sm font-bold truncate" style={{ color: '#f0eafa' }}>{product.name}</span>
          {(product.tag === 'New Drop' && newArrival) || product.tag !== 'New Drop' ? (
            <span
              className="flex-shrink-0 text-xs font-bold px-1.5 py-0.5 rounded-full"
              style={{ background: `${product.tagColor}22`, color: product.tagColor, fontSize: 8 }}
            >
              {product.tag}
            </span>
          ) : null}
        </div>
        <div className="flex items-center gap-1">
          <MapPin size={9} style={{ color: '#7c6fad' }} />
          <span className="text-xs truncate" style={{ color: '#7c6fad', fontSize: 10 }}>{product.store} · {product.dist}</span>
        </div>
        <div className="flex items-center gap-1.5 mt-0.5">
          <span className="text-sm font-black" style={{ color: '#34d399' }}>₹{effectivePrice.toLocaleString()}</span>
          {(product.orig || (product.tag === 'Sale' && salePercent > 0)) && (
            <span className="text-xs line-through" style={{ color: '#4a3a6a' }}>
              ₹{(product.orig ?? product.price).toLocaleString()}
            </span>
          )}
        </div>
      </div>

      <button
        onClick={() => setLiked(l => !l)}
        className="flex-shrink-0 p-1.5 rounded-full transition-all duration-200 hover:scale-110 active:scale-95"
        style={{ background: liked ? 'rgba(239,68,68,0.15)' : 'rgba(255,255,255,0.05)' }}
      >
        <Heart
          size={16}
          style={{ color: liked ? '#ef4444' : '#4a3a6a', fill: liked ? '#ef4444' : 'none' }}
        />
      </button>
    </div>
  );
}

export function ShopperAisle({ newArrival, visitorCount, salePercent }: ShopperAisleProps) {
  const [activeTab, setActiveTab] = useState<'discover' | 'nearby'>('discover');
  const [liveActivity, setLiveActivity] = useState('Priya just saved "Silk Wrap Dress" from Atelier Mira');

  const ACTIVITIES = [
    'Priya just saved "Silk Wrap Dress" from Atelier Mira',
    'Aarav is browsing Bandra Archive (0.8 km away)',
    'Riya bought "Crop Blazer" — 2 left in stock!',
    '12 people viewing Linen Co-ord Set right now',
  ];

  useEffect(() => {
    let i = 0;
    const id = setInterval(() => {
      i = (i + 1) % ACTIVITIES.length;
      setLiveActivity(ACTIVITIES[i]);
    }, 4000);
    return () => clearInterval(id);
  }, []);

  return (
    <div
      className="relative w-full rounded-2xl overflow-hidden flex flex-col"
      style={{
        background: 'linear-gradient(160deg, #0f0f1a 0%, #080812 100%)',
        border: '1px solid rgba(52,211,153,0.15)',
      }}
    >
      {/* App top bar */}
      <div
        className="flex items-center justify-between px-4 py-3"
        style={{ borderBottom: '1px solid rgba(52,211,153,0.1)', background: 'rgba(52,211,153,0.05)' }}
      >
        <div className="flex items-center gap-2">
          <Navigation size={12} style={{ color: '#34d399' }} />
          <span className="text-xs font-bold" style={{ color: '#34d399', letterSpacing: '0.1em' }}>BUYER APP</span>
        </div>
        <div className="flex items-center gap-1.5">
          <div className="w-1.5 h-1.5 rounded-full animate-sign-pulse" style={{ background: '#22c55e' }} />
          <span className="text-xs" style={{ color: '#34d399', fontSize: 10 }}>{visitorCount} shoppers nearby</span>
        </div>
      </div>

      {/* Search bar */}
      <div className="px-3 pt-3 pb-2">
        <div
          className="flex items-center gap-2 px-3 py-2 rounded-xl"
          style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.08)' }}
        >
          <Search size={12} style={{ color: '#4a5568' }} />
          <span className="text-xs flex-1" style={{ color: '#4a5568' }}>Search fashion near you…</span>
          <Filter size={12} style={{ color: '#34d399' }} />
        </div>
      </div>

      {/* Tabs */}
      <div className="flex px-3 gap-2 mb-2">
        {(['discover', 'nearby'] as const).map(tab => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className="flex-1 py-1.5 rounded-lg text-xs font-bold capitalize transition-all duration-200"
            style={{
              background: activeTab === tab ? 'rgba(52,211,153,0.15)' : 'rgba(255,255,255,0.03)',
              color: activeTab === tab ? '#34d399' : '#4a3a6a',
              border: `1px solid ${activeTab === tab ? 'rgba(52,211,153,0.3)' : 'rgba(255,255,255,0.05)'}`,
            }}
          >
            {tab === 'discover' ? '✦ Discover' : '📍 Nearby'}
          </button>
        ))}
      </div>

      {/* Content */}
      <div className="flex flex-col gap-1.5 px-3 pb-2">
        {activeTab === 'discover' ? (
          <>
            {/* New drop banner */}
            {newArrival && (
              <div
                className="flex items-center gap-2 px-3 py-2 rounded-xl animate-bounce-in mb-1"
                style={{ background: 'linear-gradient(90deg, rgba(167,139,250,0.15), rgba(124,58,237,0.08))', border: '1px solid rgba(167,139,250,0.25)' }}
              >
                <Sparkles size={13} style={{ color: '#a78bfa' }} />
                <span className="text-xs font-bold" style={{ color: '#a78bfa' }}>New drops from stores near you!</span>
              </div>
            )}
            {PRODUCTS.map((p, i) => (
              <ProductCard key={p.id} product={p} salePercent={salePercent} newArrival={newArrival} delay={i * 80} />
            ))}
          </>
        ) : (
          <div className="flex flex-col gap-2">
            {NEARBY_STORES.map((store, i) => (
              <div
                key={store.name}
                className="flex items-center gap-3 px-3 py-2.5 rounded-xl animate-slide-up-in cursor-pointer transition-all duration-200 hover:scale-[1.02]"
                style={{
                  background: 'rgba(255,255,255,0.04)',
                  border: '1px solid rgba(255,255,255,0.07)',
                  animationDelay: `${i * 100}ms`,
                }}
              >
                <div
                  className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 text-lg"
                  style={{ background: `${store.color}18` }}
                >
                  🏪
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-1.5">
                    <span className="text-sm font-bold" style={{ color: '#f0eafa' }}>{store.name}</span>
                    <span className="text-xs" style={{ color: store.open ? '#22c55e' : '#ef4444', fontSize: 8 }}>
                      {store.open ? '● Open' : '● Closed'}
                    </span>
                  </div>
                  <div className="flex items-center gap-1">
                    <MapPin size={9} style={{ color: '#4a3a6a' }} />
                    <span className="text-xs" style={{ color: '#7c6fad', fontSize: 10 }}>{store.type} · {store.dist}</span>
                  </div>
                </div>
                <div className="flex items-center gap-0.5">
                  <Star size={10} style={{ color: '#fbbf24', fill: '#fbbf24' }} />
                  <span className="text-xs font-bold" style={{ color: '#fbbf24' }}>{store.rating}</span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Live activity ticker */}
      <div
        className="flex items-center gap-2 px-3 py-2 mx-3 mb-3 rounded-xl"
        style={{ background: 'rgba(52,211,153,0.07)', border: '1px solid rgba(52,211,153,0.12)' }}
      >
        <Clock size={10} style={{ color: '#34d399' }} />
        <span key={liveActivity} className="text-xs animate-slide-up-in flex-1 truncate" style={{ color: '#34d399', fontSize: 10 }}>
          {liveActivity}
        </span>
      </div>
    </div>
  );
}