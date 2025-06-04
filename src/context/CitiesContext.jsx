import {
  createContext,
  useContext,
  useEffect,
  useReducer,
  useCallback,
} from "react";

const BASE_URL = "http://localhost:9000";

function countryCodeToFlagEmoji(countryCode) {
  return countryCode
    .toUpperCase()
    .split("")
    .map((char) => String.fromCodePoint(char.charCodeAt() + 127397))
    .join("");
}

const CitiesContext = createContext();
const initialState = {
  cities: [],
  status: "loading",
  error: null,
};

function reducer(state, action) {
  switch (action.type) {
    case "login":
      return { ...state, user: action.payload, status: "ready" };
    case "error":
      return { ...state, status: "error", error: action.payload };
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
  const [{ cities, status, error }, dispatch] = useReducer(
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

    setTimeout(() => {
      fetchCities();
    }, 2500);
  }, []);

  const getCityInfo = useCallback(async (lat, lng) => {
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
        id: Number(Date.now()),
        country: country,
        emoji: countryCodeToFlagEmoji(countryCode),
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
    dispatch({ type: "loading" });

    await setTimeout(async () => {
      var country = await getCityInfo(data.lat, data.lng);

      if (country == null) {
        dispatch({ type: "error" });
        return;
      }

      dispatch({
        type: "cities/added",
        payload: {
          ...country,
          cityName: data.name,
          name: data.name,
          date: data.date,
          notes: data.notes,
        },
      });
    }, 2000);
  };

  const deleteCity = (id) => {
    dispatch({ type: "cities/delete", payload: id });
  };

  const getCityById = (id) => {
    debugger;
    const city = cities.filter((city) => city.id === Number(id));

    if (city != null) return city[0];

    throw new Error("Not found any city with this ID");
  };

  return (
    <CitiesContext.Provider
      value={{
        cities,
        status,
        error,
        lastCity: cities[cities.length - 1],
        getCityInfo,
        addCity,
        deleteCity,
        getCityById,
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
