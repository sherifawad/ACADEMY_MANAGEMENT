import * as TypeGraphQL from "type-graphql";
import * as GraphQLScalars from "graphql-scalars";
import { Prisma } from "@prisma/client";
import { DecimalJSScalar } from "../../scalars";
import { AttendanceUpdateManyWithoutGroupInput } from "../inputs/AttendanceUpdateManyWithoutGroupInput";
import { DateTimeFieldUpdateOperationsInput } from "../inputs/DateTimeFieldUpdateOperationsInput";
import { GradeUpdateOneWithoutGroupsInput } from "../inputs/GradeUpdateOneWithoutGroupsInput";
import { NullableStringFieldUpdateOperationsInput } from "../inputs/NullableStringFieldUpdateOperationsInput";
import { StringFieldUpdateOperationsInput } from "../inputs/StringFieldUpdateOperationsInput";

@TypeGraphQL.InputType("GroupUpdateWithoutProfilesInput", {
  isAbstract: true
})
export class GroupUpdateWithoutProfilesInput {
  @TypeGraphQL.Field(_type => StringFieldUpdateOperationsInput, {
    nullable: true
  })
  id?: StringFieldUpdateOperationsInput | undefined;

  @TypeGraphQL.Field(_type => StringFieldUpdateOperationsInput, {
    nullable: true
  })
  name?: StringFieldUpdateOperationsInput | undefined;

  @TypeGraphQL.Field(_type => DateTimeFieldUpdateOperationsInput, {
    nullable: true
  })
  createdAt?: DateTimeFieldUpdateOperationsInput | undefined;

  @TypeGraphQL.Field(_type => DateTimeFieldUpdateOperationsInput, {
    nullable: true
  })
  updatedAt?: DateTimeFieldUpdateOperationsInput | undefined;

  @TypeGraphQL.Field(_type => NullableStringFieldUpdateOperationsInput, {
    nullable: true
  })
  startAt?: NullableStringFieldUpdateOperationsInput | undefined;

  @TypeGraphQL.Field(_type => NullableStringFieldUpdateOperationsInput, {
    nullable: true
  })
  endAt?: NullableStringFieldUpdateOperationsInput | undefined;

  @TypeGraphQL.Field(_type => AttendanceUpdateManyWithoutGroupInput, {
    nullable: true
  })
  attendance?: AttendanceUpdateManyWithoutGroupInput | undefined;

  @TypeGraphQL.Field(_type => GradeUpdateOneWithoutGroupsInput, {
    nullable: true
  })
  grade?: GradeUpdateOneWithoutGroupsInput | undefined;
}
