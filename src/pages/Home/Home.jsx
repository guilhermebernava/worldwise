import styles from "./Home.module.css";
import Button from "../../components/Button/Button";
import Main from "../../components/Main/Main";
import Title from "../../components/Title/Title";
import { useLogin } from "../../context/LoginContext";

function Home() {
  const { redirectToLoggedApp } = useLogin();
  return (
    <Main hasBackgroundImage={true}>
      <div className={styles.content}>
        <Title text="You travel the world." />
        <Title text="WorldWise keeps track of your adventures." />

        <h2 className={styles.textContent}>
          A world map that tracks your footsteps into every city you can think
          of. Never forget your wonderful experiences, and show your friends how
          you have wandered the world.
        </h2>

        <Button text="START TRACKING NOW" onClick={redirectToLoggedApp} />
      </div>
    </Main>
  );
}

export default Home;
