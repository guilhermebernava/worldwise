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
    case "countries/loaded":
      return { ...state, status: "ready", countries: action.payload };
    case "cities/added":
      return {
        ...state,
        status: "ready",
        cities: [...state.cities, action.payload],
      };
    case "countries/added":
      return {
        ...state,
        status: "ready",
        countries: [...state.countries, action.payload],
      };
    case "cities/delete":
      const newCities = state.cities.filter(
        (city) => city.id !== action.payload
      );
      return { ...state, cities: [...newCities] };
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
            name: item.country,
          };
        });

        console.log(mappedData);

        dispatch({ type: "countries/loaded", payload: mappedData });
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
    try {
      const res = await fetch(
        `https://nominatim.openstreetmap.org/reverse?lat=${lat}&lon=${lng}&format=json`
      );
      const data = await res.json();

      const city =
        data.address.city ||
        data.address.town ||
        data.address.village ||
        "Unknown";
      const country = data.address.country || "Unknown";
      const countryCode = data.address.country_code?.toUpperCase() || "";

      return {
        name: city,
        id: Date.now(),
        country: country,
        emoji: countryCode,
        position: {
          lat: lat,
          lng: lng,
        },
      };
    } catch {
      return null;
    }
  }, []);

  const addCity = async (data) => {
    dispatch({
      type: "cities/added",
      payload: {
        cityName: data.name,
        name: data.name,
        id: Date.now(),
        date: data.date,
        notes: data.notes,
        position: {
          lat: data.lat,
          lng: data.lng,
        },
      },
    });

    var country = await getCityInfo(data.lat, data.ln);

    if (country == null) {
      dispatch({ type: "error" });
      return;
    }

    dispatch({
      type: "countries/added",
      payload: {
        ...country,
        date: data.date,
        notes: data.notes,
      },
    });
  };

  const deleteCity = (id) => {
    dispatch({ type: "cities/delete", payload: id });
  };

  return (
    <CitiesContext.Provider
      value={{
        cities,
        status,
        countries,
        error,
        lastCity: cities[cities.length - 1],
        getCityInfo,
        addCity,
        deleteCity,
      }}
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
