import { Injectable } from '@nestjs/common';
import * as t from "@3wks/gae-node-nestjs/dist/validator";
import { Repository, DatastoreProvider } from '@3wks/gae-node-nestjs';

const <%= lowerTypeName %> = t.intersection([
  t.interface({
    id: t.string,

    // required properties
  }),
  t.partial({
    // optional properties
  })
]);

export type <%= typeName %> = t.TypeOf<typeof <%= lowerTypeName %>>;

@Injectable()
export class <%= module %>Repository extends Repository<<%= typeName %>> {
  constructor(datastoreProvider: DatastoreProvider) {
    super(datastoreProvider.datastore, "<%= typeName %>", <%= lowerTypeName %>, {});
  }
}
