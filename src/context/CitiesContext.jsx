import {
  createContext,
  useContext,
  useEffect,
  useReducer,
  useCallback,
  useMemo,
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
  position: {
    lat: 40,
    lng: 0,
  },
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
      return {
        ...state,
        status: "ready",
        cities: action.payload,
        position: action.payload[0].position,
      };
    case "cities/added":
      return {
        ...state,
        status: "ready",
        cities: [...state.cities, action.payload],
        position: action.payload.position,
      };
    case "cities/delete":
      const newCities = state.cities.filter(
        (city) => city.id !== action.payload
      );
      return {
        ...state,
        cities: [...newCities],
        position: initialState.position,
        status: "ready",
      };
    case "ready":
      return { ...state, status: "ready", error: null };
    case "setPosition":
      return { ...state, position: action.payload };
    default:
      return { ...state };
  }
}

export function CitiesProvider({ children }) {
  const [{ cities, status, error, position }, dispatch] = useReducer(
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
    }, 5000);
  }, []);

  const getCityInfo = useCallback(async (lat, lng) => {
    try {
      const res = await fetch(
        `https://nominatim.openstreetmap.org/reverse?lat=${lat}&lon=${lng}&format=json`
      );
      const data = await res.json();

      if (data?.error != null) {
        dispatch({
          type: "error",
          payload: "Error in getting informations about the city selected",
        });
        return;
      }

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

  const addCity = useCallback(async (data) => {
    dispatch({ type: "loading" });

    await setTimeout(async () => {
      var infoData = await getCityInfo(data.lat, data.lng);

      if (infoData != null) {
        const newCity = {
          ...infoData,
          cityName: data.name,
          name: data.name,
          date: data.date,
          notes: data.notes,
        };

        try {
          await fetch(`${BASE_URL}/cities`, {
            method: "POST",
            body: JSON.stringify(newCity),
            headers: {
              "Content-Type": "application/json",
            },
          });

          dispatch({
            type: "cities/added",
            payload: newCity,
          });
        } catch {
          dispatch({
            type: "error",
            payload: "There was an error creating the city...",
          });
        }
      }
    }, 2000);
  }, []);

  const deleteCity = useCallback(async (id) => {
    dispatch({ type: "loading" });
    try {
      const res = await fetch(`${BASE_URL}/cities/${Number(id)}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (res.status != 200) {
        dispatch({
          type: "error",
          payload: "There was an error deleting the city...",
        });
        return;
      }

      dispatch({ type: "cities/delete", payload: id });
    } catch {}
  }, []);

  const getCityById = useCallback(
    (id) => {
      dispatch({ type: "loading" });

      const list = cities.filter((city) => Number(city.id) === Number(id));

      if (list.length > 0) {
        dispatch({ type: "ready" });
        dispatch({ type: "setPosition", payload: list[0].position });

        return list[0];
      } else {
        dispatch({
          type: "error",
          payload: "Not found any city with this ID",
        });
      }
    },

    [cities]
  );

  const resetError = () => {
    dispatch({ type: "ready" });
  };

  const value = useMemo(() => {
    return {
      cities,
      status,
      error,
      position,
      getCityInfo,
      addCity,
      deleteCity,
      getCityById,
      resetError,
    };
  }, [cities, status, error, position]);

  return (
    <CitiesContext.Provider value={{ ...value }}>
      {children}
    </CitiesContext.Provider>
  );
}

export function useCities() {
  const context = useContext(CitiesContext);
  if (context === undefined)
    throw new Error("CitiesContext was used outside of the CitiesProvider");
  return context;
}
