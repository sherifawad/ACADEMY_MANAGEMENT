import * as TypeGraphQL from "type-graphql";
import * as GraphQLScalars from "graphql-scalars";
import { Prisma } from "@prisma/client";
import { DecimalJSScalar } from "../../scalars";
import { AttendanceUpdateManyWithoutProfileInput } from "../inputs/AttendanceUpdateManyWithoutProfileInput";
import { DateTimeFieldUpdateOperationsInput } from "../inputs/DateTimeFieldUpdateOperationsInput";
import { ExamUpdateManyWithoutProfileInput } from "../inputs/ExamUpdateManyWithoutProfileInput";
import { GroupUpdateOneRequiredWithoutProfilesInput } from "../inputs/GroupUpdateOneRequiredWithoutProfilesInput";
import { NullableStringFieldUpdateOperationsInput } from "../inputs/NullableStringFieldUpdateOperationsInput";
import { StringFieldUpdateOperationsInput } from "../inputs/StringFieldUpdateOperationsInput";

@TypeGraphQL.InputType("ProfileUpdateWithoutUserInput", {
  isAbstract: true
})
export class ProfileUpdateWithoutUserInput {
  @TypeGraphQL.Field(_type => NullableStringFieldUpdateOperationsInput, {
    nullable: true
  })
  bio?: NullableStringFieldUpdateOperationsInput | undefined;

  @TypeGraphQL.Field(_type => DateTimeFieldUpdateOperationsInput, {
    nullable: true
  })
  createdAt?: DateTimeFieldUpdateOperationsInput | undefined;

  @TypeGraphQL.Field(_type => DateTimeFieldUpdateOperationsInput, {
    nullable: true
  })
  updatedAt?: DateTimeFieldUpdateOperationsInput | undefined;

  @TypeGraphQL.Field(_type => StringFieldUpdateOperationsInput, {
    nullable: true
  })
  createdBy?: StringFieldUpdateOperationsInput | undefined;

  @TypeGraphQL.Field(_type => NullableStringFieldUpdateOperationsInput, {
    nullable: true
  })
  updatedBy?: NullableStringFieldUpdateOperationsInput | undefined;

  @TypeGraphQL.Field(_type => ExamUpdateManyWithoutProfileInput, {
    nullable: true
  })
  exams?: ExamUpdateManyWithoutProfileInput | undefined;

  @TypeGraphQL.Field(_type => AttendanceUpdateManyWithoutProfileInput, {
    nullable: true
  })
  attendances?: AttendanceUpdateManyWithoutProfileInput | undefined;

  @TypeGraphQL.Field(_type => GroupUpdateOneRequiredWithoutProfilesInput, {
    nullable: true
  })
  group?: GroupUpdateOneRequiredWithoutProfilesInput | undefined;
}
