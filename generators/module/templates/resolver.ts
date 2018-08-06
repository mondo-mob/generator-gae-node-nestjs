import { Resolver, Query, Mutation } from '@nestjs/graphql';
import { Context, IUser } from '@3wks/gae-node-nestjs';
import { <%= module %>Service } from './<%= moduleSlugged %>.service';
<% if (includeRepository) { %> import { <%= typeName %> } from './<%= moduleSlugged %>.repository'; <% } %>

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
    async all(_req: void, _args: void, context: Context<IUser>): Promise < ReadonlyArray<<%= typeName %>>> {
      return await this.service.getAll(context);
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