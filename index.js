const appBuilder = require('./app');


const app = appBuilder();
const PORT = 8000;

app.listen(PORT, () => {
  console.log(`⚡️[server]: Server is running at https://localhost:${PORT}`);
});