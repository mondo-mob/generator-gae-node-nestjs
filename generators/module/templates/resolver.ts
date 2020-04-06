import { Resolver, Query, Mutation } from '@nestjs/graphql';
import { Context, IUser } from '@mondomob/gae-node-nestjs';
import { <%= module %>Service } from './<%= moduleSlugged %>.service';
<% if (includeRepository) { %> import { <%= typeName %> } from './<%= moduleSlugged %>.repository'; <% } %>

  <% if (includeRepository) { %> interface <%= typeName %>List {
  values: ReadonlyArray<<%= typeName %>>;
  next ?: string;
  more: boolean;
} <% } %>

@Resolver(<% if (includeRepository) { %> '<%= typeName %>' <% } %>)
export class <%= module %>Resolver {
  constructor(
    private readonly service: <%= module %>Service,
  ) { }

  <% if (includeRepository) { %>
    @Query('<%= lowerTypeName %>ById')
  async byId(_req: void, { id }: { id: string}, context: Context<IUser>): Promise<<%= typeName %> | undefined> {
    return await this.service.getById(context, id);
  }

    @Query('<%= lowerTypeNamePlural %>')
    async list(_req: void, { cursor, limit }: { cursor?: string, limit?: number }, context: Context<IUser>): Promise <<%= typeName %>List> {
      const [results, info] = await this.service.getAll(context, limit, cursor);

      return {
        values: results,
        next: info.endCursor,
        more: info.moreResults === "MORE_RESULTS_AFTER_LIMIT"
      };
  }

  @Mutation('create<%= typeName %>')
    async create(_req: void, { <%= lowerTypeName %> }: { <%= lowerTypeName %>: <%= typeName %> }, context: Context<IUser>): Promise<<%= typeName %>> {
    return await this.service.create(context, <%= lowerTypeName %>);
    }

    @Mutation('update<%= typeName %>')
  async update(_req: void, { <%= lowerTypeName %>, id }: { <%= lowerTypeName %>: <%= typeName %>, id: string }, context: Context<IUser>): Promise<<%= typeName %> | undefined> {
  return await this.service.update(context, id, <%= lowerTypeName %>);
    }

    @Mutation('delete<%= typeName %>')
async deleteEntity(_req: void, { id }: { id: string }, context: Context<IUser>): Promise<void> {
  return await this.service.delete(context, id);
    }
  <% } %>
}
