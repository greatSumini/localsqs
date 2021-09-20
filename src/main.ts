import Fastify from 'fastify';
import app from './app';

const port = Number(process.env.PORT) || 4413;
const ip = process.env.IP || 'localhost';

const fastify = Fastify({
  ignoreTrailingSlash: true,
  disableRequestLogging: true,
  logger: {
    level: 'info',
    prettyPrint: true,
  },
});

fastify.register(app);

fastify.listen(port, ip, (err) => {
  if (err) {
    fastify.log.error(err);
    process.exit(1);
  }
});
