const styles = (medium: boolean) => ({
  form: {
    p: 2,
    width: medium ? "100%" : "40%",
    textAlign: "center",
  },
  lockIcon: {
    backgroundColor: "red",
    height: "70px",
    width: "70px",
    my: 1,
  },
  submitButton: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    gap: 1,
  },
});

export default styles;
