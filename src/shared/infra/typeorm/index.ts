import { Connection, createConnection, getConnectionOptions } from 'typeorm';

export default async (): Promise<Connection> => {
  const defaultOptions = await getConnectionOptions();
  return createConnection(
    Object.assign(defaultOptions, {
      host: 'database_ignite',
    }),
  );

  // return createConnection(
  //   Object.assign(defaultOptions, {
  //     host: process.env.NODE_ENV === 'test' ? 'localhost' : host,

  //     database_ignite:
  //       process.env.NODE_ENV === 'test'
  //         ? 'rentalx_test'
  //         : defaultOptions.database,
  //   }),
  // );
};
