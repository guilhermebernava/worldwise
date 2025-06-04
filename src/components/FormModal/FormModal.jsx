import styles from "./FormModal.module.css";
import Input from "../Input/Input";
import Textarea from "../Textarea/Textarea";
import Button from "../Button/Button";
import { useReducer } from "react";
import { useCities } from "../../context/CitiesContext";
import { useNavigate, useParams } from "react-router-dom";
import Error from "../Error/Error";

const initialState = {
  name: "",
  date: "",
  notes: "",
};

function reducer(state, action) {
  switch (action.type) {
    case "onChange":
      return { ...state, [action.payload.name]: action.payload.value };
    case "reset":
      return initialState;
    default:
      return { ...state };
  }
}

function FormModal() {
  const { lat, lng } = useParams();
  const [{ name, date, notes }, dispatch] = useReducer(reducer, initialState);
  const navigate = useNavigate();
  const { addCity, status } = useCities();

  const handleAddCity = async () => {
    if (!name || !date || !notes || lat == null || lng == null) {
      return;
    }

    await addCity({
      name,
      date,
      notes,
      lat: Number(lat),
      lng: Number(lng),
    });

    dispatch({ type: "reset" });
    navigate("/app");
  };

  return (
    <div className={styles.container}>
      <div className={styles.form}>
        <button
          className={styles.closeButton}
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            dispatch({ type: "reset" });
            navigate("/app");
          }}
        >
          X
        </button>
        <Input
          value={name}
          name="name"
          onChange={(e) =>
            dispatch({
              type: "onChange",
              payload: { name: e.target.name, value: e.target.value },
            })
          }
          label="City Name"
        />
        <Input
          value={date}
          name="date"
          type="date"
          onChange={(e) =>
            dispatch({
              type: "onChange",
              payload: { name: e.target.name, value: e.target.value },
            })
          }
          label="Notes about your trip"
        />
        <Textarea
          value={notes}
          name="notes"
          onChange={(e) =>
            dispatch({
              type: "onChange",
              payload: { name: e.target.name, value: e.target.value },
            })
          }
          label="Notes about your trip"
        />
        {status === "error" && <Error text="Error in fetching data from API" />}
        <Button
          text={`${status === "loading" ? "Loading" : "Add City"}`}
          bigButton={true}
          onClick={async () => {
            await handleAddCity();
          }}
        />
      </div>
    </div>
  );
}

export default FormModal;
