import Button from "../../components/Button/Button";
import Logo from "../../components/Logo/Logo";
import Tab from "../../components/Tab/Tab";
import UserButton from "../../components/UserButton/UserButton";
import styles from "./Logged.module.css";

function Logged() {
  return (
    <div className={styles.main}>
      <div className={styles.container}>
        <Logo />
        <Tab
          buttons={["Cities", "Countries"]}
          content={[
            [
              {
                name: "Lisbon",
                country: "Portugal",
                date: "2027-10-31T15:59:59.138Z",
                notes: "My favorite city so far!",
                position: {
                  lat: 38.727881642324164,
                  lng: -9.140900099907554,
                },
                id: 73930385,
              },
              {
                name: "Madrid",
                country: "Spain",
                date: "2027-07-15T08:22:53.976Z",
                notes: "",
                position: {
                  lat: 40.46635901755316,
                  lng: -3.7133789062500004,
                },
                id: 17806751,
              },
              {
                name: "Berlin",
                country: "Germany",
                date: "2027-02-12T09:24:11.863Z",
                notes: "Amazing 😃",
                position: {
                  lat: 52.53586782505711,
                  lng: 13.376933665713324,
                },
                id: 98443197,
              },
            ],
            [
              {
                name: "Portugal",
                emoji: "🇵🇹",
                date: "2027-10-31T15:59:59.138Z",
                notes: "My favorite city so far!",
                position: {
                  lat: 38.727881642324164,
                  lng: -9.140900099907554,
                },
                id: 73930385,
              },
              {
                name: "Spain",
                emoji: "🇪🇸",
                date: "2027-07-15T08:22:53.976Z",
                notes: "",
                position: {
                  lat: 40.46635901755316,
                  lng: -3.7133789062500004,
                },
                id: 17806751,
              },
              {
                name: "Germany",
                emoji: "🇩🇪",
                date: "2027-02-12T09:24:11.863Z",
                notes: "Amazing 😃",
                position: {
                  lat: 52.53586782505711,
                  lng: 13.376933665713324,
                },
                id: 98443197,
              },
            ],
          ]}
        />
      </div>
      <div className={styles.map}>
        <UserButton />
        <div className={styles.bottom}>
          <Button text="Use Your Position" />
        </div>
      </div>
    </div>
  );
}

export default Logged;
