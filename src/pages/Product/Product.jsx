import PageNav from "../../components/PageNav/PageNav";
import styles from "./Product.module.css";

function Product() {
  return (
    <div className={styles.mainContainer}>
      <PageNav />
      <div className={styles.content}>
        <img
          className={styles.image}
          src="images/img-1.jpg"
          alt="man-in-the-wild"
        />
        <div>
          <h1 className={styles.title}>About World Wide</h1>
          <p className={styles.paragraph}>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Commodi,
            distinctio? Odit eligendi facilis commodi voluptatum nesciunt
            perferendis! Rerum nisi, illum aspernatur dignissimos eos tempora.
            Quos facilis necessitatibus nemo pariatur corrupti.Lorem ipsum dolor
            sit amet consectetur adipisicing elit. Commodi, distinctio? Odit
            eligendi facilis commodi voluptatum nesciunt perferendis! Rerum
            nisi, illum aspernatur dignissimos eos tempora. Quos facilis
            necessitatibus nemo pariatur corrupti.
          </p>
          <br />
          <p className={styles.paragraph}>
            Lorem, ipsum dolor sit amet consectetur adipisicing elit. Commodi
            suscipit atque quasi, laboriosam explicabo minima nostrum at enim
            mollitia perspiciatis nam error ex sit et dicta in voluptates
            placeat quibusdam. Lorem, ipsum dolor sit amet consectetur
            adipisicing elit. Commodi suscipit atque quasi.
          </p>
        </div>
      </div>
    </div>
  );
}

export default Product;
