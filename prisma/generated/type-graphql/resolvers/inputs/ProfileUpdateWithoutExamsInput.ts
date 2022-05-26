import * as TypeGraphQL from "type-graphql";
import * as GraphQLScalars from "graphql-scalars";
import { Prisma } from "@prisma/client";
import { DecimalJSScalar } from "../../scalars";
import { AttendanceUpdateManyWithoutProfileInput } from "../inputs/AttendanceUpdateManyWithoutProfileInput";
import { DateTimeFieldUpdateOperationsInput } from "../inputs/DateTimeFieldUpdateOperationsInput";
import { GroupUpdateOneRequiredWithoutProfilesInput } from "../inputs/GroupUpdateOneRequiredWithoutProfilesInput";
import { NullableStringFieldUpdateOperationsInput } from "../inputs/NullableStringFieldUpdateOperationsInput";
import { UserUpdateOneRequiredWithoutProfileInput } from "../inputs/UserUpdateOneRequiredWithoutProfileInput";

@TypeGraphQL.InputType("ProfileUpdateWithoutExamsInput", {
  isAbstract: true
})
export class ProfileUpdateWithoutExamsInput {
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

  @TypeGraphQL.Field(_type => UserUpdateOneRequiredWithoutProfileInput, {
    nullable: true
  })
  user?: UserUpdateOneRequiredWithoutProfileInput | undefined;

  @TypeGraphQL.Field(_type => AttendanceUpdateManyWithoutProfileInput, {
    nullable: true
  })
  attendances?: AttendanceUpdateManyWithoutProfileInput | undefined;

  @TypeGraphQL.Field(_type => GroupUpdateOneRequiredWithoutProfilesInput, {
    nullable: true
  })
  group?: GroupUpdateOneRequiredWithoutProfilesInput | undefined;
}
