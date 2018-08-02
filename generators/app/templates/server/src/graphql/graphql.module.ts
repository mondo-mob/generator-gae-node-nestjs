import { Module, NestModule, MiddlewareConsumer } from '@nestjs/common';
import { GraphQLModule, GraphQLFactory } from '@nestjs/graphql';
import { graphqlExpress } from 'apollo-server-express';
import { GraphQLTime, GraphQLDateTime } from 'graphql-iso-date';
import * as _ from 'lodash';
import { rootLogger } from '@3wks/gae-node-nestjs';
import { fileLoader, mergeTypes } from 'merge-graphql-schemas';

@Module({
  imports: [GraphQLModule],
})
export class GraphQLConfiguration implements NestModule {
  constructor(private readonly graphqlFactory: GraphQLFactory) {}

  configure(consumer: MiddlewareConsumer) {
    const appTypeDefs = fileLoader('./src/**/*.graphqls');
    const libTypeDefs = fileLoader(
      './node_modules/@3wks/gae-node-nestjs/src/**/*.graphqls',
    );

    const typeDefs = mergeTypes([...appTypeDefs, ...libTypeDefs]);

    const schema = this.graphqlFactory.createSchema({
      typeDefs,
      resolvers: {
        Time: GraphQLTime,
        DateAndTime: GraphQLDateTime,
      },
      logger: {
        log: payload => {
          if (typeof payload === 'string') {
            rootLogger.info(payload);
          } else {
            rootLogger.error(payload);
          }
        },
      },
    });

    consumer
      .apply(
        graphqlExpress(async req => {
          return {
            schema,
            rootValue: req,
            context: _.get(req, 'context'),
          };
        }),
      )
      .forRoutes('/api/graphql');
  }
}
