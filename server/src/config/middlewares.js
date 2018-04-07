import bodyParser from 'body-parser';

export default app => {
  app.use(bodyParser.json());
  return app;
};
