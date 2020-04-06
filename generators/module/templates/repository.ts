import { Injectable } from '@nestjs/common';
import * as t from "@mondomob/gae-node-nestjs/dist/types";
import { Repository, DatastoreProvider } from '@mondomob/gae-node-nestjs';

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
