import "./App.css";
import { getCards } from "./services/cards";

export function App() {
  const cards = getCards();

  return (
    <>
      <h1>Marvel Mulligan</h1>
      {cards.map((card) => (
        <div key={card.code}>
          <h2>{card.name}</h2>
        </div>
      ))}
    </>
  );
}
