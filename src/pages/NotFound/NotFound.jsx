import Main from "../../components/Main/Main";
import Title from "../../components/Title/Title";

function NotFound() {
  return (
    <Main>
      <div
        style={{
          display: "flex",
          flexGrow: "1",
          justifyContent: "center",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Title text="Ops... Not found any page with this URL" />
        <Title text="🤖" />
      </div>
    </Main>
  );
}

export default NotFound;
