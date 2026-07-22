import { useEffect, useRef, useState } from 'react';

const STATS = [
  { label: 'Properties listed', value: 500, suffix: '+' },
  { label: 'Happy clients', value: 1200, suffix: '+' },
  { label: 'Cities covered', value: 15, suffix: '+' },
  { label: 'Support', value: 24, suffix: '/7' },
];

function Counter({ value, suffix }) {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const started = useRef(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !started.current) {
          started.current = true;
          const duration = 1200;
          const start = performance.now();

          const tick = (now) => {
            const progress = Math.min((now - start) / duration, 1);
            const eased = 1 - Math.pow(1 - progress, 3);
            setCount(Math.round(eased * value));
            if (progress < 1) requestAnimationFrame(tick);
          };
          requestAnimationFrame(tick);
        }
      },
      { threshold: 0.4 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [value]);

  return (
    <span ref={ref} className="stat-number">
      {count}{suffix}
    </span>
  );
}

export default function Stats() {
  return (
    <section className="stats">
      <div className="container stats-grid">
        {STATS.map((s) => (
          <div key={s.label} className="stat">
            <Counter value={s.value} suffix={s.suffix} />
            <p>{s.label}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
