import Main from "../../components/Main/Main";
import Image from "../../components/Image/Image";
import styles from "./Pricing.module.css";
import Title from "../../components/Title/Title";
import Paragraph from "../../components/Paragraph/Paragraph";
import Button from "../../components/Button/Button";
import { useLogin } from "../../context/LoginContext";

function Pricing() {
  const { redirectToLoggedApp } = useLogin();
  return (
    <Main>
      <div className={styles.content}>
        <Image src="images/img-2.jpg" alt="city" />
        <div className={styles.textContent}>
          <div className={styles.title}>
            <Title text="Simple Pricing." />
            <Title text="Just $9 a month." />
          </div>

          <Paragraph
            text="Lorem ipsum dolor sit amet consectetur adipisicing elit. Commodi,
            distinctio? Odit eligendi facilis commodi voluptatum nesciunt
            perferendis! Rerum nisi, illum aspernatur dignissimos eos tempora.
            Quos facilis necessitatibus nemo pariatur corrupti.Lorem ipsum dolor
            sit amet consectetur adipisicing elit. Commodi, distinctio? Odit
            eligendi facilis commodi voluptatum nesciunt perferendis! Rerum
            nisi, illum aspernatur dignissimos eos tempora. Quos facilis
            necessitatibus nemo pariatur corrupti."
          />

          <Button text="START TRACKING NOW" onClick={redirectToLoggedApp} />
        </div>
      </div>
    </Main>
  );
}

export default Pricing;
