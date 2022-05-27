import * as TypeGraphQL from "type-graphql";
import * as GraphQLScalars from "graphql-scalars";
import { Prisma } from "@prisma/client";
import { DecimalJSScalar } from "../../scalars";
import { AttendanceUpdateManyWithoutProfileInput } from "../inputs/AttendanceUpdateManyWithoutProfileInput";
import { DateTimeFieldUpdateOperationsInput } from "../inputs/DateTimeFieldUpdateOperationsInput";
import { ExamUpdateManyWithoutProfileInput } from "../inputs/ExamUpdateManyWithoutProfileInput";
import { NullableStringFieldUpdateOperationsInput } from "../inputs/NullableStringFieldUpdateOperationsInput";
import { StringFieldUpdateOperationsInput } from "../inputs/StringFieldUpdateOperationsInput";
import { UserUpdateOneRequiredWithoutProfileInput } from "../inputs/UserUpdateOneRequiredWithoutProfileInput";

@TypeGraphQL.InputType("ProfileUpdateWithoutGroupInput", {
  isAbstract: true
})
export class ProfileUpdateWithoutGroupInput {
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

  @TypeGraphQL.Field(_type => UserUpdateOneRequiredWithoutProfileInput, {
    nullable: true
  })
  user?: UserUpdateOneRequiredWithoutProfileInput | undefined;

  @TypeGraphQL.Field(_type => ExamUpdateManyWithoutProfileInput, {
    nullable: true
  })
  exams?: ExamUpdateManyWithoutProfileInput | undefined;

  @TypeGraphQL.Field(_type => AttendanceUpdateManyWithoutProfileInput, {
    nullable: true
  })
  attendances?: AttendanceUpdateManyWithoutProfileInput | undefined;
}
