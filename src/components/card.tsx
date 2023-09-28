import type { Card } from "../services/cards";

export function Card({ card }: { card: Card }) {
  return (
    <div className="card">
      <h2>{card.name}</h2>
    </div>
  );
}
