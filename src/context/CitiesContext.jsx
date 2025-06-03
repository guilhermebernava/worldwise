import {
  createContext,
  useContext,
  useEffect,
  useReducer,
  useCallback,
} from "react";

const BASE_URL = "http://localhost:9000";

const CitiesContext = createContext();
const initialState = {
  cities: [],
  countries: [],
  status: "loading",
  error: null,
};

function reducer(state, action) {
  switch (action.type) {
    case "login":
      return { ...state, user: action.payload, status: "ready" };
    case "error":
      return { ...state, status: "error" };
    case "loading":
      return { ...state, status: "loading" };
    case "cities/loaded":
      return { ...state, status: "ready", cities: action.payload };
    case "cities/added":
      return {
        ...state,
        status: "ready",
        cities: [...state.cities, action.payload],
      };
    default:
      return { ...state };
  }
}

export function CitiesProvider({ children }) {
  const [{ cities, status, countries, error }, dispatch] = useReducer(
    reducer,
    initialState
  );

  useEffect(() => {
    async function fetchCities() {
      dispatch({ type: "loading" });

      try {
        const res = await fetch(`${BASE_URL}/cities`);
        const data = await res.json();

        const mappedData = data.map((item) => {
          return {
            ...item,
            name: item.cityName,
          };
        });

        dispatch({ type: "cities/loaded", payload: mappedData });
      } catch {
        dispatch({
          type: "error",
          payload: "There was an error loading cities...",
        });
      }
    }

    async function fetchCountries() {
      dispatch({ type: "loading" });

      try {
        const res = await fetch(`${BASE_URL}/cities`);
        const data = await res.json();

        const mappedData = data.map((item) => {
          return {
            ...item,
            name: item.cityName,
          };
        });

        dispatch({ type: "cities/loaded", payload: mappedData });
      } catch {
        dispatch({
          type: "error",
          payload: "There was an error loading cities...",
        });
      }
    }

    setTimeout(() => {
      fetchCities();
      fetchCountries();
    }, 2500);
  }, []);

  const getCityInfo = useCallback(async (lat, lng) => {
    dispatch({ type: "loading" });
    const res = await fetch(
      `https://nominatim.openstreetmap.org/reverse?lat=${lat}&lon=${lng}&format=json`
    );

    setTimeout(() => {
      const city =
        data.address.city ||
        data.address.town ||
        data.address.village ||
        "Unknown";
      const country = data.address.country || "Unknown";
      console.log(data);
      const countryCode = data.address.country_code?.toUpperCase() || "";

      dispatch({
        type: "cities/added",
        payload: {
          name: city,
          id: Date.now(),
          date: new Date().toISOString(),
          country: country,
          emoji: countryCode,
          position: {
            lat: lat,
            lng: lng,
          },
        },
      });
    }, 2000);
    const data = await res.json();
  }, []);

  return (
    <CitiesContext.Provider
      value={{ cities, status, countries, error, getCityInfo }}
    >
      {children}
    </CitiesContext.Provider>
  );
}

export function useCities() {
  const context = useContext(CitiesContext);
  if (context === undefined)
    throw new Error("CitiesContext was used outside of the QuizProvider");
  return context;
}
