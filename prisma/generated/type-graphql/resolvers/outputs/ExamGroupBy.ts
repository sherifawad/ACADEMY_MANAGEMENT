import * as TypeGraphQL from "type-graphql";
import * as GraphQLScalars from "graphql-scalars";
import { Prisma } from "@prisma/client";
import { DecimalJSScalar } from "../../scalars";
import { ExamAvgAggregate } from "../outputs/ExamAvgAggregate";
import { ExamCountAggregate } from "../outputs/ExamCountAggregate";
import { ExamMaxAggregate } from "../outputs/ExamMaxAggregate";
import { ExamMinAggregate } from "../outputs/ExamMinAggregate";
import { ExamSumAggregate } from "../outputs/ExamSumAggregate";

@TypeGraphQL.ObjectType("ExamGroupBy", {
  isAbstract: true
})
export class ExamGroupBy {
  @TypeGraphQL.Field(_type => String, {
    nullable: false
  })
  id!: string;

  @TypeGraphQL.Field(_type => Date, {
    nullable: false
  })
  createdAt!: Date;

  @TypeGraphQL.Field(_type => Date, {
    nullable: false
  })
  updatedAt!: Date;

  @TypeGraphQL.Field(_type => TypeGraphQL.Float, {
    nullable: false
  })
  score!: number;

  @TypeGraphQL.Field(_type => String, {
    nullable: true
  })
  note!: string | null;

  @TypeGraphQL.Field(_type => Date, {
    nullable: false
  })
  date!: Date;

  @TypeGraphQL.Field(_type => String, {
    nullable: false
  })
  profileId!: string;

  @TypeGraphQL.Field(_type => ExamCountAggregate, {
    nullable: true
  })
  _count!: ExamCountAggregate | null;

  @TypeGraphQL.Field(_type => ExamAvgAggregate, {
    nullable: true
  })
  _avg!: ExamAvgAggregate | null;

  @TypeGraphQL.Field(_type => ExamSumAggregate, {
    nullable: true
  })
  _sum!: ExamSumAggregate | null;

  @TypeGraphQL.Field(_type => ExamMinAggregate, {
    nullable: true
  })
  _min!: ExamMinAggregate | null;

  @TypeGraphQL.Field(_type => ExamMaxAggregate, {
    nullable: true
  })
  _max!: ExamMaxAggregate | null;
}
