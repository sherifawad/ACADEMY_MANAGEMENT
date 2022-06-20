import * as TypeGraphQL from "type-graphql";
import * as GraphQLScalars from "graphql-scalars";
import { Prisma } from "@prisma/client";
import { DecimalJSScalar } from "../../scalars";
import { GradeCountAggregate } from "../outputs/GradeCountAggregate";
import { GradeMaxAggregate } from "../outputs/GradeMaxAggregate";
import { GradeMinAggregate } from "../outputs/GradeMinAggregate";

@TypeGraphQL.ObjectType("AggregateGrade", {
  isAbstract: true
})
export class AggregateGrade {
  @TypeGraphQL.Field(_type => GradeCountAggregate, {
    nullable: true
  })
  _count!: GradeCountAggregate | null;

  @TypeGraphQL.Field(_type => GradeMinAggregate, {
    nullable: true
  })
  _min!: GradeMinAggregate | null;

  @TypeGraphQL.Field(_type => GradeMaxAggregate, {
    nullable: true
  })
  _max!: GradeMaxAggregate | null;
}
