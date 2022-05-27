import * as TypeGraphQL from "type-graphql";
import * as GraphQLScalars from "graphql-scalars";
import { Prisma } from "@prisma/client";
import { DecimalJSScalar } from "../../scalars";
import { GradeCountAggregate } from "../outputs/GradeCountAggregate";
import { GradeMaxAggregate } from "../outputs/GradeMaxAggregate";
import { GradeMinAggregate } from "../outputs/GradeMinAggregate";

@TypeGraphQL.ObjectType("GradeGroupBy", {
  isAbstract: true
})
export class GradeGroupBy {
  @TypeGraphQL.Field(_type => String, {
    nullable: false
  })
  id!: string;

  @TypeGraphQL.Field(_type => String, {
    nullable: false
  })
  name!: string;

  @TypeGraphQL.Field(_type => Date, {
    nullable: false
  })
  createdAt!: Date;

  @TypeGraphQL.Field(_type => Date, {
    nullable: false
  })
  updatedAt!: Date;

  @TypeGraphQL.Field(_type => String, {
    nullable: false
  })
  createdBy!: string;

  @TypeGraphQL.Field(_type => String, {
    nullable: true
  })
  updatedBy!: string | null;

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
