const styles = (extraSmall: boolean) => ({
  card: {
    borderRadius: 2,
    width: extraSmall ? "100%" : 430,
  },
  content: {
    display: "flex",
    flexDirection: "column",
    alignItems: "start",
    width: "100%",
  },
  overlay: {
    position: "absolute",
    height: 300,
    width: "100%",
    background: "rgba(0, 0, 0, 0.3)",
    textAlign: "left",
    pl: 2,
    pt: 2,
    mt: -12,
  },
  cardActions: {
    justifyContent: "space-between",
  },
  cardAction: {
    display: "flex",
    alignItems: "center",
    gap: 1,
    justifyContent: "center",
  },
});

export default styles;
