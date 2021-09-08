import { Connection, createConnection, getConnectionOptions } from 'typeorm';

export default async (): Promise<Connection> => {
  const defaultOptions = await getConnectionOptions();
  // pelo host
  return createConnection(
    Object.assign(defaultOptions, {
      database:
        process.env.NODE_ENV === 'test'
          ? 'rentx_test'
          : defaultOptions.database,
    }),
  );
  // pelo docker
  // return createConnection(
  //   Object.assign(defaultOptions, {
  //     host: process.env.NODE_ENV === 'test' ? 'localhost' : host,

  //     database:
  //       process.env.NODE_ENV === 'test'
  //         ? 'rentx_test'
  //         : defaultOptions.database,
  //   }),
  // );
};
