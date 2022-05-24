import * as TypeGraphQL from "type-graphql";
import * as GraphQLScalars from "graphql-scalars";
import { Prisma } from "@prisma/client";
import { DecimalJSScalar } from "../../scalars";
import { GroupCountAggregate } from "../outputs/GroupCountAggregate";
import { GroupMaxAggregate } from "../outputs/GroupMaxAggregate";
import { GroupMinAggregate } from "../outputs/GroupMinAggregate";

@TypeGraphQL.ObjectType("AggregateGroup", {
  isAbstract: true
})
export class AggregateGroup {
  @TypeGraphQL.Field(_type => GroupCountAggregate, {
    nullable: true
  })
  _count!: GroupCountAggregate | null;

  @TypeGraphQL.Field(_type => GroupMinAggregate, {
    nullable: true
  })
  _min!: GroupMinAggregate | null;

  @TypeGraphQL.Field(_type => GroupMaxAggregate, {
    nullable: true
  })
  _max!: GroupMaxAggregate | null;
}
