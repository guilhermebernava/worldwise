import styles from "./FormModal.module.css";
import Input from "../Input/Input";
import { useEffect, useReducer } from "react";
import Textarea from "../Textarea/Textarea";
import Button from "../Button/Button";
import { useCities } from "../../context/CitiesContext";

const initialState = {
  name: "",
  date: "",
  notes: "",
};

function reducer(state, action) {
  switch (action.type) {
    case "onChange":
      return { ...state, [action.payload.name]: action.payload.value };
    case "addPosition":
      return { ...state, position: action.payload };
    case "reset":
      return initialState;
    default:
      return { ...state };
  }
}

function FormModal({ isOpen, onClose, position = null, setIsOpen }) {
  const [{ name, date, notes }, dispatch] = useReducer(reducer, initialState);
  const { addCity } = useCities();

  useEffect(() => {
    const handleEsc = (event) => {
      if (event.key === "Escape") onClose();
    };
    document.addEventListener("keydown", handleEsc);
    return () => document.removeEventListener("keydown", handleEsc);
  }, [onClose]);

  const handleAddCity = async () => {
    if (!name || !date || !notes || position == null) {
      return;
    }

    await addCity({
      name,
      date,
      notes,
      lat: position.lat,
      lng: position.lng,
    });

    dispatch({ type: "reset" });
    setIsOpen(false);
  };

  if (!isOpen) return null;
  return (
    <div className={styles.container}>
      <div className={styles.form}>
        <button
          className={styles.closeButton}
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            dispatch({ type: "reset" });
            onClose();
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
        <Button
          text="Add City"
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
