import Main from "../../components/Main/Main";
import Image from "../../components/Image/Image";
import styles from "./Product.module.css";
import Title from "../../components/Title/Title";
import Paragraph from "../../components/Paragraph/Paragraph";

function Product() {
  return (
    <Main flexDirection="row">
      <div className={styles.content}>
        <Image src="images/img-1.jpg" alt="man-in-the-wild" />
        <div>
          <Title text="About World Wide" />
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
          <br />
          <Paragraph
            text=" Lorem, ipsum dolor sit amet consectetur adipisicing elit. Commodi
            suscipit atque quasi, laboriosam explicabo minima nostrum at enim
            mollitia perspiciatis nam error ex sit et dicta in voluptates
            placeat quibusdam. Lorem, ipsum dolor sit amet consectetur
            adipisicing elit. Commodi suscipit atque quasi."
          />
        </div>
      </div>
    </Main>
  );
}

export default Product;
