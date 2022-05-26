import * as TypeGraphQL from "type-graphql";
import * as GraphQLScalars from "graphql-scalars";
import { Prisma } from "@prisma/client";
import { DecimalJSScalar } from "../../scalars";
import { AttendanceCreateManyGroupInput } from "../inputs/AttendanceCreateManyGroupInput";

@TypeGraphQL.InputType("AttendanceCreateManyGroupInputEnvelope", {
  isAbstract: true
})
export class AttendanceCreateManyGroupInputEnvelope {
  @TypeGraphQL.Field(_type => [AttendanceCreateManyGroupInput], {
    nullable: false
  })
  data!: AttendanceCreateManyGroupInput[];

  @TypeGraphQL.Field(_type => Boolean, {
    nullable: true
  })
  skipDuplicates?: boolean | undefined;
}
