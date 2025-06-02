import PageNav from "../../components/PageNav/PageNav";
import styles from "./Home.module.css";
import Button from "../../components/Button/Button";

function Home() {
  return (
    <div className={styles.mainContainer}>
      <PageNav />
      <div className={styles.content}>
        <h1 className={styles.title}>
          You travel the world.
          <br />
          WorldWise keeps track of your adventures.
        </h1>
        <h2 className={styles.textContent}>
          A world map that tracks your footsteps into every city you can think
          of. Never forget your wonderful experiences, and show your friends how
          you have wandered the world.
        </h2>

        <Button
          text="START TRACKING NOW"
          onClick={() => console.log("start tracking")}
        />
      </div>
    </div>
  );
}

export default Home;
