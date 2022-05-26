import * as TypeGraphQL from "type-graphql";
import * as GraphQLScalars from "graphql-scalars";
import { Prisma } from "@prisma/client";
import { DecimalJSScalar } from "../../scalars";
import { AttendanceCountAggregate } from "../outputs/AttendanceCountAggregate";
import { AttendanceMaxAggregate } from "../outputs/AttendanceMaxAggregate";
import { AttendanceMinAggregate } from "../outputs/AttendanceMinAggregate";

@TypeGraphQL.ObjectType("AggregateAttendance", {
  isAbstract: true
})
export class AggregateAttendance {
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
