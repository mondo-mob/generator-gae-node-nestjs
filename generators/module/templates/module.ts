import { Module } from '@nestjs/common';
import { <%= module %>Service } from './<%= moduleSlugged %>.service';
<% if (includeRepository) { %> import { <%= module %>Repository } from './<%= moduleSlugged %>.repository';<% } %>
<% if (includeGraphQL) { %> import { <%= module %>Resolver } from './<%= moduleSlugged %>.resolver';<% } %>

@Module({
  providers: [
    <%= module %>Service,
    <% if(includeRepository) { %>
      <%= module %>Repository,
    <% } %>
  <% if (includeGraphQL) { %>
    <%= module %>Resolver,
      <% } %>
  ]
})
export class <%= module %>Module {} 