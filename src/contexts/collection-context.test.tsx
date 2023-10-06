import { act, renderHook } from "@testing-library/react";
import {
  CollectionContextProvider,
  useCollectionContext,
} from "./collection-context";

jest.mock("./local-storage");

describe("useCollectionContext()", () => {
  test("provides packages{} to children", () => {
    const { result } = renderHook(() => useCollectionContext(), {
      wrapper: CollectionContextProvider,
    });

    expect(result.current.packages).toEqual({
      Angel: false,
      "Ant-Man": false,
      "Black Widow": false,
      "Captain America": false,
      "Core Set": true, // XXX
      Cyclops: false,
      "Doctor Strange": false,
      Drax: false,
      "Galaxy's Most Wanted": false,
      Gambit: false,
      Gamora: false,
      Hulk: false,
      Ironheart: false,
      "Ms. Marvel": false,
      "Mutant Genesis": false,
      "NeXt Evolution": false,
      Nebula: false,
      Nova: false,
      Phoenix: false,
      Psylocke: false,
      Quicksilver: false,
      Rogue: false,
      "SP//dr": false,
      "Scarlet Witch": false,
      "Sinister Motives": false,
      "Spider-Ham": false,
      "Star-Lord": false,
      Storm: false,
      "The Mad Titan's Shadow": false,
      "The Rise of Red Skull": false,
      Thor: false,
      Valkyrie: false,
      Venom: false,
      Vision: false,
      "War Machine": false,
      Wasp: false,
      Wolverine: false,
    });
  });

  test("provides togglePackage() to children", () => {
    const { result } = renderHook(() => useCollectionContext(), {
      wrapper: CollectionContextProvider,
    });

    expect(result.current.togglePackage).toBeInstanceOf(Function);

    act(() => {
      result.current.togglePackage("Sinister Motives");
    });

    expect(result.current.packages["Sinister Motives"]).toBe(true);
  });
});
