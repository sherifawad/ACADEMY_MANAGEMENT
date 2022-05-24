import * as TypeGraphQL from "type-graphql";
import * as GraphQLScalars from "graphql-scalars";
import { Prisma } from "@prisma/client";
import { DecimalJSScalar } from "../../scalars";
import { DateTimeFieldUpdateOperationsInput } from "../inputs/DateTimeFieldUpdateOperationsInput";
import { ExamUpdateManyWithoutProfileInput } from "../inputs/ExamUpdateManyWithoutProfileInput";
import { GroupUpdateOneRequiredWithoutProfilesInput } from "../inputs/GroupUpdateOneRequiredWithoutProfilesInput";
import { NullableStringFieldUpdateOperationsInput } from "../inputs/NullableStringFieldUpdateOperationsInput";
import { UserUpdateOneRequiredWithoutProfileInput } from "../inputs/UserUpdateOneRequiredWithoutProfileInput";

@TypeGraphQL.InputType("ProfileUpdateInput", {
  isAbstract: true
})
export class ProfileUpdateInput {
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

  @TypeGraphQL.Field(_type => ExamUpdateManyWithoutProfileInput, {
    nullable: true
  })
  exams?: ExamUpdateManyWithoutProfileInput | undefined;

  @TypeGraphQL.Field(_type => GroupUpdateOneRequiredWithoutProfilesInput, {
    nullable: true
  })
  group?: GroupUpdateOneRequiredWithoutProfilesInput | undefined;
}
