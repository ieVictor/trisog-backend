import config  from './config';
import app from './app';

const port = config.port

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
