const Notification = ({ notification }) => {
  const { message, type } = notification;
  const basicStyle = {
    border: "5px solid black",
    fontStyle: "italic",
    fontSize: "2rem",
    margin: "5px 0",
    padding: "5px 10px",
  };
  const typeStyle =
    type === "error"
      ? { color: "white", backgroundColor: "red" }
      : { color: "black", backgroundColor: "MediumSeaGreen" };
  return message ? (
    <div style={{ ...basicStyle, ...typeStyle }}>
      <p style={{ margin: 0 }}>{message}</p>
    </div>
  ) : (
    <div></div>
  );
};

export default Notification;
