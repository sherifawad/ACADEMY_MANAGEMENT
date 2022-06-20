import * as TypeGraphQL from "type-graphql";
import * as GraphQLScalars from "graphql-scalars";
import { Prisma } from "@prisma/client";
import { DecimalJSScalar } from "../../scalars";
import { ContactCountAggregate } from "../outputs/ContactCountAggregate";
import { ContactMaxAggregate } from "../outputs/ContactMaxAggregate";
import { ContactMinAggregate } from "../outputs/ContactMinAggregate";

@TypeGraphQL.ObjectType("AggregateContact", {
  isAbstract: true
})
export class AggregateContact {
  @TypeGraphQL.Field(_type => ContactCountAggregate, {
    nullable: true
  })
  _count!: ContactCountAggregate | null;

  @TypeGraphQL.Field(_type => ContactMinAggregate, {
    nullable: true
  })
  _min!: ContactMinAggregate | null;

  @TypeGraphQL.Field(_type => ContactMaxAggregate, {
    nullable: true
  })
  _max!: ContactMaxAggregate | null;
}
