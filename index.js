const app = require("./app");

app.listen(process.env.PORT, () => {
  console.log(`server is running on http://localhost:${process.env.PORT}/api/v1 `);
});
