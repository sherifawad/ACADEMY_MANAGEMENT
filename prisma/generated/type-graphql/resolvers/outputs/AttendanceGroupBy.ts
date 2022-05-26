import * as TypeGraphQL from "type-graphql";
import * as GraphQLScalars from "graphql-scalars";
import { Prisma } from "@prisma/client";
import { DecimalJSScalar } from "../../scalars";
import { AttendanceCountAggregate } from "../outputs/AttendanceCountAggregate";
import { AttendanceMaxAggregate } from "../outputs/AttendanceMaxAggregate";
import { AttendanceMinAggregate } from "../outputs/AttendanceMinAggregate";

@TypeGraphQL.ObjectType("AttendanceGroupBy", {
  isAbstract: true
})
export class AttendanceGroupBy {
  @TypeGraphQL.Field(_type => String, {
    nullable: false
  })
  id!: string;

  @TypeGraphQL.Field(_type => Date, {
    nullable: false
  })
  startAt!: Date;

  @TypeGraphQL.Field(_type => Date, {
    nullable: true
  })
  endAt!: Date | null;

  @TypeGraphQL.Field(_type => String, {
    nullable: true
  })
  note!: string | null;

  @TypeGraphQL.Field(_type => String, {
    nullable: false
  })
  profileId!: string;

  @TypeGraphQL.Field(_type => String, {
    nullable: true
  })
  groupId!: string | null;

  @TypeGraphQL.Field(_type => AttendanceCountAggregate, {
    nullable: true
  })
  _count!: AttendanceCountAggregate | null;

  @TypeGraphQL.Field(_type => AttendanceMinAggregate, {
    nullable: true
  })
  _min!: AttendanceMinAggregate | null;

  @TypeGraphQL.Field(_type => AttendanceMaxAggregate, {
    nullable: true
  })
  _max!: AttendanceMaxAggregate | null;
}
