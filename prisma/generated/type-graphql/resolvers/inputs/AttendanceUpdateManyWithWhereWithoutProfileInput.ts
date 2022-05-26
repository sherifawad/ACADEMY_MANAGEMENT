import * as TypeGraphQL from "type-graphql";
import * as GraphQLScalars from "graphql-scalars";
import { Prisma } from "@prisma/client";
import { DecimalJSScalar } from "../../scalars";
import { AttendanceScalarWhereInput } from "../inputs/AttendanceScalarWhereInput";
import { AttendanceUpdateManyMutationInput } from "../inputs/AttendanceUpdateManyMutationInput";

@TypeGraphQL.InputType("AttendanceUpdateManyWithWhereWithoutProfileInput", {
  isAbstract: true
})
export class AttendanceUpdateManyWithWhereWithoutProfileInput {
  @TypeGraphQL.Field(_type => AttendanceScalarWhereInput, {
    nullable: false
  })
  where!: AttendanceScalarWhereInput;

  @TypeGraphQL.Field(_type => AttendanceUpdateManyMutationInput, {
    nullable: false
  })
  data!: AttendanceUpdateManyMutationInput;
}
