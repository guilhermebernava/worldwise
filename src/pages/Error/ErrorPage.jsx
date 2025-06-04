import styles from "./ErrorPage.module.css";
import Main from "../../components/Main/Main";
import Error from "../../components/Error/Error";

function ErrorPage({ error }) {
  return (
    <Main>
      <div className={styles.content}>
        <Error text={`⚠️ ${error} ⚠️`} />
      </div>
    </Main>
  );
}

export default ErrorPage;
