import { ClassType } from "type-graphql";
import * as tslib from "tslib";
import * as crudResolvers from "./resolvers/crud/resolvers-crud.index";
import * as argsTypes from "./resolvers/crud/args.index";
import * as actionResolvers from "./resolvers/crud/resolvers-actions.index";
import * as relationResolvers from "./resolvers/relations/resolvers.index";
import * as models from "./models";
import * as outputTypes from "./resolvers/outputs";
import * as inputTypes from "./resolvers/inputs";

const crudResolversMap = {
  UserPassword: crudResolvers.UserPasswordCrudResolver,
  RefreshToken: crudResolvers.RefreshTokenCrudResolver,
  User: crudResolvers.UserCrudResolver,
  Profile: crudResolvers.ProfileCrudResolver,
  Grade: crudResolvers.GradeCrudResolver,
  Group: crudResolvers.GroupCrudResolver,
  Exam: crudResolvers.ExamCrudResolver,
  Attendance: crudResolvers.AttendanceCrudResolver
};
const actionResolversMap = {
  UserPassword: {
    userPassword: actionResolvers.FindUniqueUserPasswordResolver,
    findFirstUserPassword: actionResolvers.FindFirstUserPasswordResolver,
    userPasswords: actionResolvers.FindManyUserPasswordResolver,
    createUserPassword: actionResolvers.CreateUserPasswordResolver,
    createManyUserPassword: actionResolvers.CreateManyUserPasswordResolver,
    deleteUserPassword: actionResolvers.DeleteUserPasswordResolver,
    updateUserPassword: actionResolvers.UpdateUserPasswordResolver,
    deleteManyUserPassword: actionResolvers.DeleteManyUserPasswordResolver,
    updateManyUserPassword: actionResolvers.UpdateManyUserPasswordResolver,
    upsertUserPassword: actionResolvers.UpsertUserPasswordResolver,
    aggregateUserPassword: actionResolvers.AggregateUserPasswordResolver,
    groupByUserPassword: actionResolvers.GroupByUserPasswordResolver
  },
  RefreshToken: {
    refreshToken: actionResolvers.FindUniqueRefreshTokenResolver,
    findFirstRefreshToken: actionResolvers.FindFirstRefreshTokenResolver,
    refreshTokens: actionResolvers.FindManyRefreshTokenResolver,
    createRefreshToken: actionResolvers.CreateRefreshTokenResolver,
    createManyRefreshToken: actionResolvers.CreateManyRefreshTokenResolver,
    deleteRefreshToken: actionResolvers.DeleteRefreshTokenResolver,
    updateRefreshToken: actionResolvers.UpdateRefreshTokenResolver,
    deleteManyRefreshToken: actionResolvers.DeleteManyRefreshTokenResolver,
    updateManyRefreshToken: actionResolvers.UpdateManyRefreshTokenResolver,
    upsertRefreshToken: actionResolvers.UpsertRefreshTokenResolver,
    aggregateRefreshToken: actionResolvers.AggregateRefreshTokenResolver,
    groupByRefreshToken: actionResolvers.GroupByRefreshTokenResolver
  },
  User: {
    user: actionResolvers.FindUniqueUserResolver,
    findFirstUser: actionResolvers.FindFirstUserResolver,
    users: actionResolvers.FindManyUserResolver,
    createUser: actionResolvers.CreateUserResolver,
    createManyUser: actionResolvers.CreateManyUserResolver,
    deleteUser: actionResolvers.DeleteUserResolver,
    updateUser: actionResolvers.UpdateUserResolver,
    deleteManyUser: actionResolvers.DeleteManyUserResolver,
    updateManyUser: actionResolvers.UpdateManyUserResolver,
    upsertUser: actionResolvers.UpsertUserResolver,
    aggregateUser: actionResolvers.AggregateUserResolver,
    groupByUser: actionResolvers.GroupByUserResolver
  },
  Profile: {
    profile: actionResolvers.FindUniqueProfileResolver,
    findFirstProfile: actionResolvers.FindFirstProfileResolver,
    profiles: actionResolvers.FindManyProfileResolver,
    createProfile: actionResolvers.CreateProfileResolver,
    createManyProfile: actionResolvers.CreateManyProfileResolver,
    deleteProfile: actionResolvers.DeleteProfileResolver,
    updateProfile: actionResolvers.UpdateProfileResolver,
    deleteManyProfile: actionResolvers.DeleteManyProfileResolver,
    updateManyProfile: actionResolvers.UpdateManyProfileResolver,
    upsertProfile: actionResolvers.UpsertProfileResolver,
    aggregateProfile: actionResolvers.AggregateProfileResolver,
    groupByProfile: actionResolvers.GroupByProfileResolver
  },
  Grade: {
    grade: actionResolvers.FindUniqueGradeResolver,
    findFirstGrade: actionResolvers.FindFirstGradeResolver,
    grades: actionResolvers.FindManyGradeResolver,
    createGrade: actionResolvers.CreateGradeResolver,
    createManyGrade: actionResolvers.CreateManyGradeResolver,
    deleteGrade: actionResolvers.DeleteGradeResolver,
    updateGrade: actionResolvers.UpdateGradeResolver,
    deleteManyGrade: actionResolvers.DeleteManyGradeResolver,
    updateManyGrade: actionResolvers.UpdateManyGradeResolver,
    upsertGrade: actionResolvers.UpsertGradeResolver,
    aggregateGrade: actionResolvers.AggregateGradeResolver,
    groupByGrade: actionResolvers.GroupByGradeResolver
  },
  Group: {
    group: actionResolvers.FindUniqueGroupResolver,
    findFirstGroup: actionResolvers.FindFirstGroupResolver,
    groups: actionResolvers.FindManyGroupResolver,
    createGroup: actionResolvers.CreateGroupResolver,
    createManyGroup: actionResolvers.CreateManyGroupResolver,
    deleteGroup: actionResolvers.DeleteGroupResolver,
    updateGroup: actionResolvers.UpdateGroupResolver,
    deleteManyGroup: actionResolvers.DeleteManyGroupResolver,
    updateManyGroup: actionResolvers.UpdateManyGroupResolver,
    upsertGroup: actionResolvers.UpsertGroupResolver,
    aggregateGroup: actionResolvers.AggregateGroupResolver,
    groupByGroup: actionResolvers.GroupByGroupResolver
  },
  Exam: {
    exam: actionResolvers.FindUniqueExamResolver,
    findFirstExam: actionResolvers.FindFirstExamResolver,
    exams: actionResolvers.FindManyExamResolver,
    createExam: actionResolvers.CreateExamResolver,
    createManyExam: actionResolvers.CreateManyExamResolver,
    deleteExam: actionResolvers.DeleteExamResolver,
    updateExam: actionResolvers.UpdateExamResolver,
    deleteManyExam: actionResolvers.DeleteManyExamResolver,
    updateManyExam: actionResolvers.UpdateManyExamResolver,
    upsertExam: actionResolvers.UpsertExamResolver,
    aggregateExam: actionResolvers.AggregateExamResolver,
    groupByExam: actionResolvers.GroupByExamResolver
  },
  Attendance: {
    attendance: actionResolvers.FindUniqueAttendanceResolver,
    findFirstAttendance: actionResolvers.FindFirstAttendanceResolver,
    attendances: actionResolvers.FindManyAttendanceResolver,
    createAttendance: actionResolvers.CreateAttendanceResolver,
    createManyAttendance: actionResolvers.CreateManyAttendanceResolver,
    deleteAttendance: actionResolvers.DeleteAttendanceResolver,
    updateAttendance: actionResolvers.UpdateAttendanceResolver,
    deleteManyAttendance: actionResolvers.DeleteManyAttendanceResolver,
    updateManyAttendance: actionResolvers.UpdateManyAttendanceResolver,
    upsertAttendance: actionResolvers.UpsertAttendanceResolver,
    aggregateAttendance: actionResolvers.AggregateAttendanceResolver,
    groupByAttendance: actionResolvers.GroupByAttendanceResolver
  }
};
const crudResolversInfo = {
  UserPassword: ["userPassword", "findFirstUserPassword", "userPasswords", "createUserPassword", "createManyUserPassword", "deleteUserPassword", "updateUserPassword", "deleteManyUserPassword", "updateManyUserPassword", "upsertUserPassword", "aggregateUserPassword", "groupByUserPassword"],
  RefreshToken: ["refreshToken", "findFirstRefreshToken", "refreshTokens", "createRefreshToken", "createManyRefreshToken", "deleteRefreshToken", "updateRefreshToken", "deleteManyRefreshToken", "updateManyRefreshToken", "upsertRefreshToken", "aggregateRefreshToken", "groupByRefreshToken"],
  User: ["user", "findFirstUser", "users", "createUser", "createManyUser", "deleteUser", "updateUser", "deleteManyUser", "updateManyUser", "upsertUser", "aggregateUser", "groupByUser"],
  Profile: ["profile", "findFirstProfile", "profiles", "createProfile", "createManyProfile", "deleteProfile", "updateProfile", "deleteManyProfile", "updateManyProfile", "upsertProfile", "aggregateProfile", "groupByProfile"],
  Grade: ["grade", "findFirstGrade", "grades", "createGrade", "createManyGrade", "deleteGrade", "updateGrade", "deleteManyGrade", "updateManyGrade", "upsertGrade", "aggregateGrade", "groupByGrade"],
  Group: ["group", "findFirstGroup", "groups", "createGroup", "createManyGroup", "deleteGroup", "updateGroup", "deleteManyGroup", "updateManyGroup", "upsertGroup", "aggregateGroup", "groupByGroup"],
  Exam: ["exam", "findFirstExam", "exams", "createExam", "createManyExam", "deleteExam", "updateExam", "deleteManyExam", "updateManyExam", "upsertExam", "aggregateExam", "groupByExam"],
  Attendance: ["attendance", "findFirstAttendance", "attendances", "createAttendance", "createManyAttendance", "deleteAttendance", "updateAttendance", "deleteManyAttendance", "updateManyAttendance", "upsertAttendance", "aggregateAttendance", "groupByAttendance"]
};
const argsInfo = {
  FindUniqueUserPasswordArgs: ["where"],
  FindFirstUserPasswordArgs: ["where", "orderBy", "cursor", "take", "skip", "distinct"],
  FindManyUserPasswordArgs: ["where", "orderBy", "cursor", "take", "skip", "distinct"],
  CreateUserPasswordArgs: ["data"],
  CreateManyUserPasswordArgs: ["data", "skipDuplicates"],
  DeleteUserPasswordArgs: ["where"],
  UpdateUserPasswordArgs: ["data", "where"],
  DeleteManyUserPasswordArgs: ["where"],
  UpdateManyUserPasswordArgs: ["data", "where"],
  UpsertUserPasswordArgs: ["where", "create", "update"],
  AggregateUserPasswordArgs: ["where", "orderBy", "cursor", "take", "skip"],
  GroupByUserPasswordArgs: ["where", "orderBy", "by", "having", "take", "skip"],
  FindUniqueRefreshTokenArgs: ["where"],
  FindFirstRefreshTokenArgs: ["where", "orderBy", "cursor", "take", "skip", "distinct"],
  FindManyRefreshTokenArgs: ["where", "orderBy", "cursor", "take", "skip", "distinct"],
  CreateRefreshTokenArgs: ["data"],
  CreateManyRefreshTokenArgs: ["data", "skipDuplicates"],
  DeleteRefreshTokenArgs: ["where"],
  UpdateRefreshTokenArgs: ["data", "where"],
  DeleteManyRefreshTokenArgs: ["where"],
  UpdateManyRefreshTokenArgs: ["data", "where"],
  UpsertRefreshTokenArgs: ["where", "create", "update"],
  AggregateRefreshTokenArgs: ["where", "orderBy", "cursor", "take", "skip"],
  GroupByRefreshTokenArgs: ["where", "orderBy", "by", "having", "take", "skip"],
  FindUniqueUserArgs: ["where"],
  FindFirstUserArgs: ["where", "orderBy", "cursor", "take", "skip", "distinct"],
  FindManyUserArgs: ["where", "orderBy", "cursor", "take", "skip", "distinct"],
  CreateUserArgs: ["data"],
  CreateManyUserArgs: ["data", "skipDuplicates"],
  DeleteUserArgs: ["where"],
  UpdateUserArgs: ["data", "where"],
  DeleteManyUserArgs: ["where"],
  UpdateManyUserArgs: ["data", "where"],
  UpsertUserArgs: ["where", "create", "update"],
  AggregateUserArgs: ["where", "orderBy", "cursor", "take", "skip"],
  GroupByUserArgs: ["where", "orderBy", "by", "having", "take", "skip"],
  FindUniqueProfileArgs: ["where"],
  FindFirstProfileArgs: ["where", "orderBy", "cursor", "take", "skip", "distinct"],
  FindManyProfileArgs: ["where", "orderBy", "cursor", "take", "skip", "distinct"],
  CreateProfileArgs: ["data"],
  CreateManyProfileArgs: ["data", "skipDuplicates"],
  DeleteProfileArgs: ["where"],
  UpdateProfileArgs: ["data", "where"],
  DeleteManyProfileArgs: ["where"],
  UpdateManyProfileArgs: ["data", "where"],
  UpsertProfileArgs: ["where", "create", "update"],
  AggregateProfileArgs: ["where", "orderBy", "cursor", "take", "skip"],
  GroupByProfileArgs: ["where", "orderBy", "by", "having", "take", "skip"],
  FindUniqueGradeArgs: ["where"],
  FindFirstGradeArgs: ["where", "orderBy", "cursor", "take", "skip", "distinct"],
  FindManyGradeArgs: ["where", "orderBy", "cursor", "take", "skip", "distinct"],
  CreateGradeArgs: ["data"],
  CreateManyGradeArgs: ["data", "skipDuplicates"],
  DeleteGradeArgs: ["where"],
  UpdateGradeArgs: ["data", "where"],
  DeleteManyGradeArgs: ["where"],
  UpdateManyGradeArgs: ["data", "where"],
  UpsertGradeArgs: ["where", "create", "update"],
  AggregateGradeArgs: ["where", "orderBy", "cursor", "take", "skip"],
  GroupByGradeArgs: ["where", "orderBy", "by", "having", "take", "skip"],
  FindUniqueGroupArgs: ["where"],
  FindFirstGroupArgs: ["where", "orderBy", "cursor", "take", "skip", "distinct"],
  FindManyGroupArgs: ["where", "orderBy", "cursor", "take", "skip", "distinct"],
  CreateGroupArgs: ["data"],
  CreateManyGroupArgs: ["data", "skipDuplicates"],
  DeleteGroupArgs: ["where"],
  UpdateGroupArgs: ["data", "where"],
  DeleteManyGroupArgs: ["where"],
  UpdateManyGroupArgs: ["data", "where"],
  UpsertGroupArgs: ["where", "create", "update"],
  AggregateGroupArgs: ["where", "orderBy", "cursor", "take", "skip"],
  GroupByGroupArgs: ["where", "orderBy", "by", "having", "take", "skip"],
  FindUniqueExamArgs: ["where"],
  FindFirstExamArgs: ["where", "orderBy", "cursor", "take", "skip", "distinct"],
  FindManyExamArgs: ["where", "orderBy", "cursor", "take", "skip", "distinct"],
  CreateExamArgs: ["data"],
  CreateManyExamArgs: ["data", "skipDuplicates"],
  DeleteExamArgs: ["where"],
  UpdateExamArgs: ["data", "where"],
  DeleteManyExamArgs: ["where"],
  UpdateManyExamArgs: ["data", "where"],
  UpsertExamArgs: ["where", "create", "update"],
  AggregateExamArgs: ["where", "orderBy", "cursor", "take", "skip"],
  GroupByExamArgs: ["where", "orderBy", "by", "having", "take", "skip"],
  FindUniqueAttendanceArgs: ["where"],
  FindFirstAttendanceArgs: ["where", "orderBy", "cursor", "take", "skip", "distinct"],
  FindManyAttendanceArgs: ["where", "orderBy", "cursor", "take", "skip", "distinct"],
  CreateAttendanceArgs: ["data"],
  CreateManyAttendanceArgs: ["data", "skipDuplicates"],
  DeleteAttendanceArgs: ["where"],
  UpdateAttendanceArgs: ["data", "where"],
  DeleteManyAttendanceArgs: ["where"],
  UpdateManyAttendanceArgs: ["data", "where"],
  UpsertAttendanceArgs: ["where", "create", "update"],
  AggregateAttendanceArgs: ["where", "orderBy", "cursor", "take", "skip"],
  GroupByAttendanceArgs: ["where", "orderBy", "by", "having", "take", "skip"]
};

type ResolverModelNames = keyof typeof crudResolversMap;

type ModelResolverActionNames<
  TModel extends ResolverModelNames
  > = keyof typeof crudResolversMap[TModel]["prototype"];

export type ResolverActionsConfig<
  TModel extends ResolverModelNames
  > = Partial<Record<ModelResolverActionNames<TModel> | "_all", MethodDecorator[]>>;

export type ResolversEnhanceMap = {
  [TModel in ResolverModelNames]?: ResolverActionsConfig<TModel>;
};

export function applyResolversEnhanceMap(
  resolversEnhanceMap: ResolversEnhanceMap,
) {
  for (const resolversEnhanceMapKey of Object.keys(resolversEnhanceMap)) {
    const modelName = resolversEnhanceMapKey as keyof typeof resolversEnhanceMap;
    const crudTarget = crudResolversMap[modelName].prototype;
    const resolverActionsConfig = resolversEnhanceMap[modelName]!;
    const actionResolversConfig = actionResolversMap[modelName];
    if (resolverActionsConfig._all) {
      const allActionsDecorators = resolverActionsConfig._all;
      const resolverActionNames = crudResolversInfo[modelName as keyof typeof crudResolversInfo];
      for (const resolverActionName of resolverActionNames) {
        const actionTarget = (actionResolversConfig[
          resolverActionName as keyof typeof actionResolversConfig
        ] as Function).prototype;
        tslib.__decorate(allActionsDecorators, crudTarget, resolverActionName, null);
        tslib.__decorate(allActionsDecorators, actionTarget, resolverActionName, null);
      }
    }
    const resolverActionsToApply = Object.keys(resolverActionsConfig).filter(
      it => it !== "_all"
    );
    for (const resolverActionName of resolverActionsToApply) {
      const decorators = resolverActionsConfig[
        resolverActionName as keyof typeof resolverActionsConfig
      ] as MethodDecorator[];
      const actionTarget = (actionResolversConfig[
        resolverActionName as keyof typeof actionResolversConfig
      ] as Function).prototype;
      tslib.__decorate(decorators, crudTarget, resolverActionName, null);
      tslib.__decorate(decorators, actionTarget, resolverActionName, null);
    }
  }
}

type ArgsTypesNames = keyof typeof argsTypes;

type ArgFieldNames<TArgsType extends ArgsTypesNames> = Exclude<
  keyof typeof argsTypes[TArgsType]["prototype"],
  number | symbol
>;

type ArgFieldsConfig<
  TArgsType extends ArgsTypesNames
  > = FieldsConfig<ArgFieldNames<TArgsType>>;

export type ArgConfig<TArgsType extends ArgsTypesNames> = {
  class?: ClassDecorator[];
  fields?: ArgFieldsConfig<TArgsType>;
};

export type ArgsTypesEnhanceMap = {
  [TArgsType in ArgsTypesNames]?: ArgConfig<TArgsType>;
};

export function applyArgsTypesEnhanceMap(
  argsTypesEnhanceMap: ArgsTypesEnhanceMap,
) {
  for (const argsTypesEnhanceMapKey of Object.keys(argsTypesEnhanceMap)) {
    const argsTypeName = argsTypesEnhanceMapKey as keyof typeof argsTypesEnhanceMap;
    const typeConfig = argsTypesEnhanceMap[argsTypeName]!;
    const typeClass = argsTypes[argsTypeName];
    const typeTarget = typeClass.prototype;
    applyTypeClassEnhanceConfig(
      typeConfig,
      typeClass,
      typeTarget,
      argsInfo[argsTypeName as keyof typeof argsInfo],
    );
  }
}

const relationResolversMap = {
  UserPassword: relationResolvers.UserPasswordRelationsResolver,
  RefreshToken: relationResolvers.RefreshTokenRelationsResolver,
  User: relationResolvers.UserRelationsResolver,
  Profile: relationResolvers.ProfileRelationsResolver,
  Grade: relationResolvers.GradeRelationsResolver,
  Group: relationResolvers.GroupRelationsResolver,
  Exam: relationResolvers.ExamRelationsResolver,
  Attendance: relationResolvers.AttendanceRelationsResolver
};
const relationResolversInfo = {
  UserPassword: ["user"],
  RefreshToken: ["user"],
  User: ["password", "profile", "tokens"],
  Profile: ["user", "exams", "attendances", "group"],
  Grade: ["groups"],
  Group: ["profiles", "attendance", "grade"],
  Exam: ["Profile"],
  Attendance: ["Profile", "group"]
};

type RelationResolverModelNames = keyof typeof relationResolversMap;

type RelationResolverActionNames<
  TModel extends RelationResolverModelNames
  > = keyof typeof relationResolversMap[TModel]["prototype"];

export type RelationResolverActionsConfig<TModel extends RelationResolverModelNames>
  = Partial<Record<RelationResolverActionNames<TModel> | "_all", MethodDecorator[]>>;

export type RelationResolversEnhanceMap = {
  [TModel in RelationResolverModelNames]?: RelationResolverActionsConfig<TModel>;
};

export function applyRelationResolversEnhanceMap(
  relationResolversEnhanceMap: RelationResolversEnhanceMap,
) {
  for (const relationResolversEnhanceMapKey of Object.keys(relationResolversEnhanceMap)) {
    const modelName = relationResolversEnhanceMapKey as keyof typeof relationResolversEnhanceMap;
    const relationResolverTarget = relationResolversMap[modelName].prototype;
    const relationResolverActionsConfig = relationResolversEnhanceMap[modelName]!;
    if (relationResolverActionsConfig._all) {
      const allActionsDecorators = relationResolverActionsConfig._all;
      const relationResolverActionNames = relationResolversInfo[modelName as keyof typeof relationResolversInfo];
      for (const relationResolverActionName of relationResolverActionNames) {
        tslib.__decorate(allActionsDecorators, relationResolverTarget, relationResolverActionName, null);
      }
    }
    const relationResolverActionsToApply = Object.keys(relationResolverActionsConfig).filter(
      it => it !== "_all"
    );
    for (const relationResolverActionName of relationResolverActionsToApply) {
      const decorators = relationResolverActionsConfig[
        relationResolverActionName as keyof typeof relationResolverActionsConfig
      ] as MethodDecorator[];
      tslib.__decorate(decorators, relationResolverTarget, relationResolverActionName, null);
    }
  }
}

type TypeConfig = {
  class?: ClassDecorator[];
  fields?: FieldsConfig;
};

type FieldsConfig<TTypeKeys extends string = string> = Partial<
  Record<TTypeKeys | "_all", PropertyDecorator[]>
>;

function applyTypeClassEnhanceConfig<
  TEnhanceConfig extends TypeConfig,
  TType extends object
>(
  enhanceConfig: TEnhanceConfig,
  typeClass: ClassType<TType>,
  typePrototype: TType,
  typeFieldNames: string[]
) {
  if (enhanceConfig.class) {
    tslib.__decorate(enhanceConfig.class, typeClass);
  }
  if (enhanceConfig.fields) {
    if (enhanceConfig.fields._all) {
      const allFieldsDecorators = enhanceConfig.fields._all;
      for (const typeFieldName of typeFieldNames) {
        tslib.__decorate(allFieldsDecorators, typePrototype, typeFieldName, void 0);
      }
    }
    const configFieldsToApply = Object.keys(enhanceConfig.fields).filter(
      it => it !== "_all"
    );
    for (const typeFieldName of configFieldsToApply) {
      const fieldDecorators = enhanceConfig.fields[typeFieldName]!;
      tslib.__decorate(fieldDecorators, typePrototype, typeFieldName, void 0);
    }
  }
}

const modelsInfo = {
  UserPassword: ["id", "password", "forceChange", "createdAt", "updatedAt"],
  RefreshToken: ["id", "label", "createdAt", "updatedAt", "hash", "valid", "expiration", "userId"],
  User: ["id", "name", "avatar", "email", "emailConfirmed", "role", "createdAt", "updatedAt"],
  Profile: ["id", "bio", "createdAt", "updatedAt", "groupId"],
  Grade: ["id", "name", "createdAt", "updatedAt"],
  Group: ["id", "name", "createdAt", "updatedAt", "startAt", "endAt", "gradeId"],
  Exam: ["id", "createdAt", "updatedAt", "score", "note", "date", "profileId"],
  Attendance: ["id", "startAt", "endAt", "note", "profileId", "groupId"]
};

type ModelNames = keyof typeof models;

type ModelFieldNames<TModel extends ModelNames> = Exclude<
  keyof typeof models[TModel]["prototype"],
  number | symbol
>;

type ModelFieldsConfig<TModel extends ModelNames> = FieldsConfig<
  ModelFieldNames<TModel>
>;

export type ModelConfig<TModel extends ModelNames> = {
  class?: ClassDecorator[];
  fields?: ModelFieldsConfig<TModel>;
};

export type ModelsEnhanceMap = {
  [TModel in ModelNames]?: ModelConfig<TModel>;
};

export function applyModelsEnhanceMap(modelsEnhanceMap: ModelsEnhanceMap) {
  for (const modelsEnhanceMapKey of Object.keys(modelsEnhanceMap)) {
    const modelName = modelsEnhanceMapKey as keyof typeof modelsEnhanceMap;
    const modelConfig = modelsEnhanceMap[modelName]!;
    const modelClass = models[modelName];
    const modelTarget = modelClass.prototype;
    applyTypeClassEnhanceConfig(
      modelConfig,
      modelClass,
      modelTarget,
      modelsInfo[modelName as keyof typeof modelsInfo],
    );
  }
}

const outputsInfo = {
  AggregateUserPassword: ["_count", "_min", "_max"],
  UserPasswordGroupBy: ["id", "password", "forceChange", "createdAt", "updatedAt", "_count", "_min", "_max"],
  AggregateRefreshToken: ["_count", "_min", "_max"],
  RefreshTokenGroupBy: ["id", "label", "createdAt", "updatedAt", "hash", "valid", "expiration", "userId", "_count", "_min", "_max"],
  AggregateUser: ["_count", "_min", "_max"],
  UserGroupBy: ["id", "name", "avatar", "email", "emailConfirmed", "role", "createdAt", "updatedAt", "_count", "_min", "_max"],
  AggregateProfile: ["_count", "_min", "_max"],
  ProfileGroupBy: ["id", "bio", "createdAt", "updatedAt", "groupId", "_count", "_min", "_max"],
  AggregateGrade: ["_count", "_min", "_max"],
  GradeGroupBy: ["id", "name", "createdAt", "updatedAt", "_count", "_min", "_max"],
  AggregateGroup: ["_count", "_min", "_max"],
  GroupGroupBy: ["id", "name", "createdAt", "updatedAt", "startAt", "endAt", "gradeId", "_count", "_min", "_max"],
  AggregateExam: ["_count", "_avg", "_sum", "_min", "_max"],
  ExamGroupBy: ["id", "createdAt", "updatedAt", "score", "note", "date", "profileId", "_count", "_avg", "_sum", "_min", "_max"],
  AggregateAttendance: ["_count", "_min", "_max"],
  AttendanceGroupBy: ["id", "startAt", "endAt", "note", "profileId", "groupId", "_count", "_min", "_max"],
  AffectedRowsOutput: ["count"],
  UserPasswordCountAggregate: ["id", "password", "forceChange", "createdAt", "updatedAt", "_all"],
  UserPasswordMinAggregate: ["id", "password", "forceChange", "createdAt", "updatedAt"],
  UserPasswordMaxAggregate: ["id", "password", "forceChange", "createdAt", "updatedAt"],
  RefreshTokenCountAggregate: ["id", "label", "createdAt", "updatedAt", "hash", "valid", "expiration", "userId", "_all"],
  RefreshTokenMinAggregate: ["id", "label", "createdAt", "updatedAt", "hash", "valid", "expiration", "userId"],
  RefreshTokenMaxAggregate: ["id", "label", "createdAt", "updatedAt", "hash", "valid", "expiration", "userId"],
  UserCount: ["tokens"],
  UserCountAggregate: ["id", "name", "avatar", "email", "emailConfirmed", "role", "createdAt", "updatedAt", "_all"],
  UserMinAggregate: ["id", "name", "avatar", "email", "emailConfirmed", "role", "createdAt", "updatedAt"],
  UserMaxAggregate: ["id", "name", "avatar", "email", "emailConfirmed", "role", "createdAt", "updatedAt"],
  ProfileCount: ["exams", "attendances"],
  ProfileCountAggregate: ["id", "bio", "createdAt", "updatedAt", "groupId", "_all"],
  ProfileMinAggregate: ["id", "bio", "createdAt", "updatedAt", "groupId"],
  ProfileMaxAggregate: ["id", "bio", "createdAt", "updatedAt", "groupId"],
  GradeCount: ["groups"],
  GradeCountAggregate: ["id", "name", "createdAt", "updatedAt", "_all"],
  GradeMinAggregate: ["id", "name", "createdAt", "updatedAt"],
  GradeMaxAggregate: ["id", "name", "createdAt", "updatedAt"],
  GroupCount: ["profiles", "attendance"],
  GroupCountAggregate: ["id", "name", "createdAt", "updatedAt", "startAt", "endAt", "gradeId", "_all"],
  GroupMinAggregate: ["id", "name", "createdAt", "updatedAt", "startAt", "endAt", "gradeId"],
  GroupMaxAggregate: ["id", "name", "createdAt", "updatedAt", "startAt", "endAt", "gradeId"],
  ExamCountAggregate: ["id", "createdAt", "updatedAt", "score", "note", "date", "profileId", "_all"],
  ExamAvgAggregate: ["score"],
  ExamSumAggregate: ["score"],
  ExamMinAggregate: ["id", "createdAt", "updatedAt", "score", "note", "date", "profileId"],
  ExamMaxAggregate: ["id", "createdAt", "updatedAt", "score", "note", "date", "profileId"],
  AttendanceCountAggregate: ["id", "startAt", "endAt", "note", "profileId", "groupId", "_all"],
  AttendanceMinAggregate: ["id", "startAt", "endAt", "note", "profileId", "groupId"],
  AttendanceMaxAggregate: ["id", "startAt", "endAt", "note", "profileId", "groupId"]
};

type OutputTypesNames = keyof typeof outputTypes;

type OutputTypeFieldNames<TOutput extends OutputTypesNames> = Exclude<
  keyof typeof outputTypes[TOutput]["prototype"],
  number | symbol
>;

type OutputTypeFieldsConfig<
  TOutput extends OutputTypesNames
  > = FieldsConfig<OutputTypeFieldNames<TOutput>>;

export type OutputTypeConfig<TOutput extends OutputTypesNames> = {
  class?: ClassDecorator[];
  fields?: OutputTypeFieldsConfig<TOutput>;
};

export type OutputTypesEnhanceMap = {
  [TOutput in OutputTypesNames]?: OutputTypeConfig<TOutput>;
};

export function applyOutputTypesEnhanceMap(
  outputTypesEnhanceMap: OutputTypesEnhanceMap,
) {
  for (const outputTypeEnhanceMapKey of Object.keys(outputTypesEnhanceMap)) {
    const outputTypeName = outputTypeEnhanceMapKey as keyof typeof outputTypesEnhanceMap;
    const typeConfig = outputTypesEnhanceMap[outputTypeName]!;
    const typeClass = outputTypes[outputTypeName];
    const typeTarget = typeClass.prototype;
    applyTypeClassEnhanceConfig(
      typeConfig,
      typeClass,
      typeTarget,
      outputsInfo[outputTypeName as keyof typeof outputsInfo],
    );
  }
}

const inputsInfo = {
  UserPasswordWhereInput: ["AND", "OR", "NOT", "id", "password", "forceChange", "createdAt", "updatedAt", "user"],
  UserPasswordOrderByWithRelationInput: ["id", "password", "forceChange", "createdAt", "updatedAt", "user"],
  UserPasswordWhereUniqueInput: ["id"],
  UserPasswordOrderByWithAggregationInput: ["id", "password", "forceChange", "createdAt", "updatedAt", "_count", "_max", "_min"],
  UserPasswordScalarWhereWithAggregatesInput: ["AND", "OR", "NOT", "id", "password", "forceChange", "createdAt", "updatedAt"],
  RefreshTokenWhereInput: ["AND", "OR", "NOT", "id", "label", "createdAt", "updatedAt", "hash", "valid", "expiration", "userId", "user"],
  RefreshTokenOrderByWithRelationInput: ["id", "label", "createdAt", "updatedAt", "hash", "valid", "expiration", "userId", "user"],
  RefreshTokenWhereUniqueInput: ["id"],
  RefreshTokenOrderByWithAggregationInput: ["id", "label", "createdAt", "updatedAt", "hash", "valid", "expiration", "userId", "_count", "_max", "_min"],
  RefreshTokenScalarWhereWithAggregatesInput: ["AND", "OR", "NOT", "id", "label", "createdAt", "updatedAt", "hash", "valid", "expiration", "userId"],
  UserWhereInput: ["AND", "OR", "NOT", "id", "name", "avatar", "email", "emailConfirmed", "role", "createdAt", "updatedAt", "password", "profile", "tokens"],
  UserOrderByWithRelationInput: ["id", "name", "avatar", "email", "emailConfirmed", "role", "createdAt", "updatedAt", "password", "profile", "tokens"],
  UserWhereUniqueInput: ["id", "email"],
  UserOrderByWithAggregationInput: ["id", "name", "avatar", "email", "emailConfirmed", "role", "createdAt", "updatedAt", "_count", "_max", "_min"],
  UserScalarWhereWithAggregatesInput: ["AND", "OR", "NOT", "id", "name", "avatar", "email", "emailConfirmed", "role", "createdAt", "updatedAt"],
  ProfileWhereInput: ["AND", "OR", "NOT", "id", "bio", "createdAt", "updatedAt", "user", "exams", "attendances", "groupId", "group"],
  ProfileOrderByWithRelationInput: ["id", "bio", "createdAt", "updatedAt", "user", "exams", "attendances", "groupId", "group"],
  ProfileWhereUniqueInput: ["id"],
  ProfileOrderByWithAggregationInput: ["id", "bio", "createdAt", "updatedAt", "groupId", "_count", "_max", "_min"],
  ProfileScalarWhereWithAggregatesInput: ["AND", "OR", "NOT", "id", "bio", "createdAt", "updatedAt", "groupId"],
  GradeWhereInput: ["AND", "OR", "NOT", "id", "name", "createdAt", "updatedAt", "groups"],
  GradeOrderByWithRelationInput: ["id", "name", "createdAt", "updatedAt", "groups"],
  GradeWhereUniqueInput: ["id"],
  GradeOrderByWithAggregationInput: ["id", "name", "createdAt", "updatedAt", "_count", "_max", "_min"],
  GradeScalarWhereWithAggregatesInput: ["AND", "OR", "NOT", "id", "name", "createdAt", "updatedAt"],
  GroupWhereInput: ["AND", "OR", "NOT", "id", "name", "createdAt", "updatedAt", "startAt", "endAt", "profiles", "attendance", "gradeId", "grade"],
  GroupOrderByWithRelationInput: ["id", "name", "createdAt", "updatedAt", "startAt", "endAt", "profiles", "attendance", "gradeId", "grade"],
  GroupWhereUniqueInput: ["id"],
  GroupOrderByWithAggregationInput: ["id", "name", "createdAt", "updatedAt", "startAt", "endAt", "gradeId", "_count", "_max", "_min"],
  GroupScalarWhereWithAggregatesInput: ["AND", "OR", "NOT", "id", "name", "createdAt", "updatedAt", "startAt", "endAt", "gradeId"],
  ExamWhereInput: ["AND", "OR", "NOT", "id", "createdAt", "updatedAt", "score", "note", "date", "profileId", "Profile"],
  ExamOrderByWithRelationInput: ["id", "createdAt", "updatedAt", "score", "note", "date", "profileId", "Profile"],
  ExamWhereUniqueInput: ["id"],
  ExamOrderByWithAggregationInput: ["id", "createdAt", "updatedAt", "score", "note", "date", "profileId", "_count", "_avg", "_max", "_min", "_sum"],
  ExamScalarWhereWithAggregatesInput: ["AND", "OR", "NOT", "id", "createdAt", "updatedAt", "score", "note", "date", "profileId"],
  AttendanceWhereInput: ["AND", "OR", "NOT", "id", "startAt", "endAt", "note", "profileId", "Profile", "groupId", "group"],
  AttendanceOrderByWithRelationInput: ["id", "startAt", "endAt", "note", "profileId", "Profile", "groupId", "group"],
  AttendanceWhereUniqueInput: ["id"],
  AttendanceOrderByWithAggregationInput: ["id", "startAt", "endAt", "note", "profileId", "groupId", "_count", "_max", "_min"],
  AttendanceScalarWhereWithAggregatesInput: ["AND", "OR", "NOT", "id", "startAt", "endAt", "note", "profileId", "groupId"],
  UserPasswordCreateInput: ["password", "forceChange", "createdAt", "updatedAt", "user"],
  UserPasswordUpdateInput: ["password", "forceChange", "createdAt", "updatedAt", "user"],
  UserPasswordCreateManyInput: ["id", "password", "forceChange", "createdAt", "updatedAt"],
  UserPasswordUpdateManyMutationInput: ["password", "forceChange", "createdAt", "updatedAt"],
  RefreshTokenCreateInput: ["id", "label", "createdAt", "updatedAt", "hash", "valid", "expiration", "user"],
  RefreshTokenUpdateInput: ["id", "label", "createdAt", "updatedAt", "hash", "valid", "expiration", "user"],
  RefreshTokenCreateManyInput: ["id", "label", "createdAt", "updatedAt", "hash", "valid", "expiration", "userId"],
  RefreshTokenUpdateManyMutationInput: ["id", "label", "createdAt", "updatedAt", "hash", "valid", "expiration"],
  UserCreateInput: ["id", "name", "avatar", "email", "emailConfirmed", "role", "createdAt", "updatedAt", "password", "profile", "tokens"],
  UserUpdateInput: ["id", "name", "avatar", "email", "emailConfirmed", "role", "createdAt", "updatedAt", "password", "profile", "tokens"],
  UserCreateManyInput: ["id", "name", "avatar", "email", "emailConfirmed", "role", "createdAt", "updatedAt"],
  UserUpdateManyMutationInput: ["id", "name", "avatar", "email", "emailConfirmed", "role", "createdAt", "updatedAt"],
  ProfileCreateInput: ["bio", "createdAt", "updatedAt", "user", "exams", "attendances", "group"],
  ProfileUpdateInput: ["bio", "createdAt", "updatedAt", "user", "exams", "attendances", "group"],
  ProfileCreateManyInput: ["id", "bio", "createdAt", "updatedAt", "groupId"],
  ProfileUpdateManyMutationInput: ["bio", "createdAt", "updatedAt"],
  GradeCreateInput: ["id", "name", "createdAt", "updatedAt", "groups"],
  GradeUpdateInput: ["id", "name", "createdAt", "updatedAt", "groups"],
  GradeCreateManyInput: ["id", "name", "createdAt", "updatedAt"],
  GradeUpdateManyMutationInput: ["id", "name", "createdAt", "updatedAt"],
  GroupCreateInput: ["id", "name", "createdAt", "updatedAt", "startAt", "endAt", "profiles", "attendance", "grade"],
  GroupUpdateInput: ["id", "name", "createdAt", "updatedAt", "startAt", "endAt", "profiles", "attendance", "grade"],
  GroupCreateManyInput: ["id", "name", "createdAt", "updatedAt", "startAt", "endAt", "gradeId"],
  GroupUpdateManyMutationInput: ["id", "name", "createdAt", "updatedAt", "startAt", "endAt"],
  ExamCreateInput: ["id", "createdAt", "updatedAt", "score", "note", "date", "Profile"],
  ExamUpdateInput: ["id", "createdAt", "updatedAt", "score", "note", "date", "Profile"],
  ExamCreateManyInput: ["id", "createdAt", "updatedAt", "score", "note", "date", "profileId"],
  ExamUpdateManyMutationInput: ["id", "createdAt", "updatedAt", "score", "note", "date"],
  AttendanceCreateInput: ["id", "startAt", "endAt", "note", "Profile", "group"],
  AttendanceUpdateInput: ["id", "startAt", "endAt", "note", "Profile", "group"],
  AttendanceCreateManyInput: ["id", "startAt", "endAt", "note", "profileId", "groupId"],
  AttendanceUpdateManyMutationInput: ["id", "startAt", "endAt", "note"],
  StringFilter: ["equals", "in", "notIn", "lt", "lte", "gt", "gte", "contains", "startsWith", "endsWith", "mode", "not"],
  BoolFilter: ["equals", "not"],
  DateTimeFilter: ["equals", "in", "notIn", "lt", "lte", "gt", "gte", "not"],
  UserRelationFilter: ["is", "isNot"],
  UserPasswordCountOrderByAggregateInput: ["id", "password", "forceChange", "createdAt", "updatedAt"],
  UserPasswordMaxOrderByAggregateInput: ["id", "password", "forceChange", "createdAt", "updatedAt"],
  UserPasswordMinOrderByAggregateInput: ["id", "password", "forceChange", "createdAt", "updatedAt"],
  StringWithAggregatesFilter: ["equals", "in", "notIn", "lt", "lte", "gt", "gte", "contains", "startsWith", "endsWith", "mode", "not", "_count", "_min", "_max"],
  BoolWithAggregatesFilter: ["equals", "not", "_count", "_min", "_max"],
  DateTimeWithAggregatesFilter: ["equals", "in", "notIn", "lt", "lte", "gt", "gte", "not", "_count", "_min", "_max"],
  RefreshTokenCountOrderByAggregateInput: ["id", "label", "createdAt", "updatedAt", "hash", "valid", "expiration", "userId"],
  RefreshTokenMaxOrderByAggregateInput: ["id", "label", "createdAt", "updatedAt", "hash", "valid", "expiration", "userId"],
  RefreshTokenMinOrderByAggregateInput: ["id", "label", "createdAt", "updatedAt", "hash", "valid", "expiration", "userId"],
  StringNullableFilter: ["equals", "in", "notIn", "lt", "lte", "gt", "gte", "contains", "startsWith", "endsWith", "mode", "not"],
  EnumRoleFilter: ["equals", "in", "notIn", "not"],
  UserPasswordRelationFilter: ["is", "isNot"],
  ProfileRelationFilter: ["is", "isNot"],
  RefreshTokenListRelationFilter: ["every", "some", "none"],
  RefreshTokenOrderByRelationAggregateInput: ["_count"],
  UserCountOrderByAggregateInput: ["id", "name", "avatar", "email", "emailConfirmed", "role", "createdAt", "updatedAt"],
  UserMaxOrderByAggregateInput: ["id", "name", "avatar", "email", "emailConfirmed", "role", "createdAt", "updatedAt"],
  UserMinOrderByAggregateInput: ["id", "name", "avatar", "email", "emailConfirmed", "role", "createdAt", "updatedAt"],
  StringNullableWithAggregatesFilter: ["equals", "in", "notIn", "lt", "lte", "gt", "gte", "contains", "startsWith", "endsWith", "mode", "not", "_count", "_min", "_max"],
  EnumRoleWithAggregatesFilter: ["equals", "in", "notIn", "not", "_count", "_min", "_max"],
  ExamListRelationFilter: ["every", "some", "none"],
  AttendanceListRelationFilter: ["every", "some", "none"],
  GroupRelationFilter: ["is", "isNot"],
  ExamOrderByRelationAggregateInput: ["_count"],
  AttendanceOrderByRelationAggregateInput: ["_count"],
  ProfileCountOrderByAggregateInput: ["id", "bio", "createdAt", "updatedAt", "groupId"],
  ProfileMaxOrderByAggregateInput: ["id", "bio", "createdAt", "updatedAt", "groupId"],
  ProfileMinOrderByAggregateInput: ["id", "bio", "createdAt", "updatedAt", "groupId"],
  GroupListRelationFilter: ["every", "some", "none"],
  GroupOrderByRelationAggregateInput: ["_count"],
  GradeCountOrderByAggregateInput: ["id", "name", "createdAt", "updatedAt"],
  GradeMaxOrderByAggregateInput: ["id", "name", "createdAt", "updatedAt"],
  GradeMinOrderByAggregateInput: ["id", "name", "createdAt", "updatedAt"],
  ProfileListRelationFilter: ["every", "some", "none"],
  GradeRelationFilter: ["is", "isNot"],
  ProfileOrderByRelationAggregateInput: ["_count"],
  GroupCountOrderByAggregateInput: ["id", "name", "createdAt", "updatedAt", "startAt", "endAt", "gradeId"],
  GroupMaxOrderByAggregateInput: ["id", "name", "createdAt", "updatedAt", "startAt", "endAt", "gradeId"],
  GroupMinOrderByAggregateInput: ["id", "name", "createdAt", "updatedAt", "startAt", "endAt", "gradeId"],
  FloatFilter: ["equals", "in", "notIn", "lt", "lte", "gt", "gte", "not"],
  ExamCountOrderByAggregateInput: ["id", "createdAt", "updatedAt", "score", "note", "date", "profileId"],
  ExamAvgOrderByAggregateInput: ["score"],
  ExamMaxOrderByAggregateInput: ["id", "createdAt", "updatedAt", "score", "note", "date", "profileId"],
  ExamMinOrderByAggregateInput: ["id", "createdAt", "updatedAt", "score", "note", "date", "profileId"],
  ExamSumOrderByAggregateInput: ["score"],
  FloatWithAggregatesFilter: ["equals", "in", "notIn", "lt", "lte", "gt", "gte", "not", "_count", "_avg", "_sum", "_min", "_max"],
  DateTimeNullableFilter: ["equals", "in", "notIn", "lt", "lte", "gt", "gte", "not"],
  AttendanceCountOrderByAggregateInput: ["id", "startAt", "endAt", "note", "profileId", "groupId"],
  AttendanceMaxOrderByAggregateInput: ["id", "startAt", "endAt", "note", "profileId", "groupId"],
  AttendanceMinOrderByAggregateInput: ["id", "startAt", "endAt", "note", "profileId", "groupId"],
  DateTimeNullableWithAggregatesFilter: ["equals", "in", "notIn", "lt", "lte", "gt", "gte", "not", "_count", "_min", "_max"],
  UserCreateNestedOneWithoutPasswordInput: ["create", "connectOrCreate", "connect"],
  StringFieldUpdateOperationsInput: ["set"],
  BoolFieldUpdateOperationsInput: ["set"],
  DateTimeFieldUpdateOperationsInput: ["set"],
  UserUpdateOneRequiredWithoutPasswordInput: ["create", "connectOrCreate", "upsert", "connect", "update"],
  UserCreateNestedOneWithoutTokensInput: ["create", "connectOrCreate", "connect"],
  UserUpdateOneRequiredWithoutTokensInput: ["create", "connectOrCreate", "upsert", "connect", "update"],
  UserPasswordCreateNestedOneWithoutUserInput: ["create", "connectOrCreate", "connect"],
  ProfileCreateNestedOneWithoutUserInput: ["create", "connectOrCreate", "connect"],
  RefreshTokenCreateNestedManyWithoutUserInput: ["create", "connectOrCreate", "createMany", "connect"],
  NullableStringFieldUpdateOperationsInput: ["set"],
  EnumRoleFieldUpdateOperationsInput: ["set"],
  UserPasswordUpdateOneWithoutUserInput: ["create", "connectOrCreate", "upsert", "disconnect", "delete", "connect", "update"],
  ProfileUpdateOneWithoutUserInput: ["create", "connectOrCreate", "upsert", "disconnect", "delete", "connect", "update"],
  RefreshTokenUpdateManyWithoutUserInput: ["create", "connectOrCreate", "upsert", "createMany", "set", "disconnect", "delete", "connect", "update", "updateMany", "deleteMany"],
  UserCreateNestedOneWithoutProfileInput: ["create", "connectOrCreate", "connect"],
  ExamCreateNestedManyWithoutProfileInput: ["create", "connectOrCreate", "createMany", "connect"],
  AttendanceCreateNestedManyWithoutProfileInput: ["create", "connectOrCreate", "createMany", "connect"],
  GroupCreateNestedOneWithoutProfilesInput: ["create", "connectOrCreate", "connect"],
  UserUpdateOneRequiredWithoutProfileInput: ["create", "connectOrCreate", "upsert", "connect", "update"],
  ExamUpdateManyWithoutProfileInput: ["create", "connectOrCreate", "upsert", "createMany", "set", "disconnect", "delete", "connect", "update", "updateMany", "deleteMany"],
  AttendanceUpdateManyWithoutProfileInput: ["create", "connectOrCreate", "upsert", "createMany", "set", "disconnect", "delete", "connect", "update", "updateMany", "deleteMany"],
  GroupUpdateOneRequiredWithoutProfilesInput: ["create", "connectOrCreate", "upsert", "connect", "update"],
  GroupCreateNestedManyWithoutGradeInput: ["create", "connectOrCreate", "createMany", "connect"],
  GroupUpdateManyWithoutGradeInput: ["create", "connectOrCreate", "upsert", "createMany", "set", "disconnect", "delete", "connect", "update", "updateMany", "deleteMany"],
  ProfileCreateNestedManyWithoutGroupInput: ["create", "connectOrCreate", "createMany", "connect"],
  AttendanceCreateNestedManyWithoutGroupInput: ["create", "connectOrCreate", "createMany", "connect"],
  GradeCreateNestedOneWithoutGroupsInput: ["create", "connectOrCreate", "connect"],
  ProfileUpdateManyWithoutGroupInput: ["create", "connectOrCreate", "upsert", "createMany", "set", "disconnect", "delete", "connect", "update", "updateMany", "deleteMany"],
  AttendanceUpdateManyWithoutGroupInput: ["create", "connectOrCreate", "upsert", "createMany", "set", "disconnect", "delete", "connect", "update", "updateMany", "deleteMany"],
  GradeUpdateOneWithoutGroupsInput: ["create", "connectOrCreate", "upsert", "disconnect", "delete", "connect", "update"],
  ProfileCreateNestedOneWithoutExamsInput: ["create", "connectOrCreate", "connect"],
  FloatFieldUpdateOperationsInput: ["set", "increment", "decrement", "multiply", "divide"],
  ProfileUpdateOneWithoutExamsInput: ["create", "connectOrCreate", "upsert", "disconnect", "delete", "connect", "update"],
  ProfileCreateNestedOneWithoutAttendancesInput: ["create", "connectOrCreate", "connect"],
  GroupCreateNestedOneWithoutAttendanceInput: ["create", "connectOrCreate", "connect"],
  NullableDateTimeFieldUpdateOperationsInput: ["set"],
  ProfileUpdateOneRequiredWithoutAttendancesInput: ["create", "connectOrCreate", "upsert", "connect", "update"],
  GroupUpdateOneWithoutAttendanceInput: ["create", "connectOrCreate", "upsert", "disconnect", "delete", "connect", "update"],
  NestedStringFilter: ["equals", "in", "notIn", "lt", "lte", "gt", "gte", "contains", "startsWith", "endsWith", "not"],
  NestedBoolFilter: ["equals", "not"],
  NestedDateTimeFilter: ["equals", "in", "notIn", "lt", "lte", "gt", "gte", "not"],
  NestedStringWithAggregatesFilter: ["equals", "in", "notIn", "lt", "lte", "gt", "gte", "contains", "startsWith", "endsWith", "not", "_count", "_min", "_max"],
  NestedIntFilter: ["equals", "in", "notIn", "lt", "lte", "gt", "gte", "not"],
  NestedBoolWithAggregatesFilter: ["equals", "not", "_count", "_min", "_max"],
  NestedDateTimeWithAggregatesFilter: ["equals", "in", "notIn", "lt", "lte", "gt", "gte", "not", "_count", "_min", "_max"],
  NestedStringNullableFilter: ["equals", "in", "notIn", "lt", "lte", "gt", "gte", "contains", "startsWith", "endsWith", "not"],
  NestedEnumRoleFilter: ["equals", "in", "notIn", "not"],
  NestedStringNullableWithAggregatesFilter: ["equals", "in", "notIn", "lt", "lte", "gt", "gte", "contains", "startsWith", "endsWith", "not", "_count", "_min", "_max"],
  NestedIntNullableFilter: ["equals", "in", "notIn", "lt", "lte", "gt", "gte", "not"],
  NestedEnumRoleWithAggregatesFilter: ["equals", "in", "notIn", "not", "_count", "_min", "_max"],
  NestedFloatFilter: ["equals", "in", "notIn", "lt", "lte", "gt", "gte", "not"],
  NestedFloatWithAggregatesFilter: ["equals", "in", "notIn", "lt", "lte", "gt", "gte", "not", "_count", "_avg", "_sum", "_min", "_max"],
  NestedDateTimeNullableFilter: ["equals", "in", "notIn", "lt", "lte", "gt", "gte", "not"],
  NestedDateTimeNullableWithAggregatesFilter: ["equals", "in", "notIn", "lt", "lte", "gt", "gte", "not", "_count", "_min", "_max"],
  UserCreateWithoutPasswordInput: ["id", "name", "avatar", "email", "emailConfirmed", "role", "createdAt", "updatedAt", "profile", "tokens"],
  UserCreateOrConnectWithoutPasswordInput: ["where", "create"],
  UserUpsertWithoutPasswordInput: ["update", "create"],
  UserUpdateWithoutPasswordInput: ["id", "name", "avatar", "email", "emailConfirmed", "role", "createdAt", "updatedAt", "profile", "tokens"],
  UserCreateWithoutTokensInput: ["id", "name", "avatar", "email", "emailConfirmed", "role", "createdAt", "updatedAt", "password", "profile"],
  UserCreateOrConnectWithoutTokensInput: ["where", "create"],
  UserUpsertWithoutTokensInput: ["update", "create"],
  UserUpdateWithoutTokensInput: ["id", "name", "avatar", "email", "emailConfirmed", "role", "createdAt", "updatedAt", "password", "profile"],
  UserPasswordCreateWithoutUserInput: ["password", "forceChange", "createdAt", "updatedAt"],
  UserPasswordCreateOrConnectWithoutUserInput: ["where", "create"],
  ProfileCreateWithoutUserInput: ["bio", "createdAt", "updatedAt", "exams", "attendances", "group"],
  ProfileCreateOrConnectWithoutUserInput: ["where", "create"],
  RefreshTokenCreateWithoutUserInput: ["id", "label", "createdAt", "updatedAt", "hash", "valid", "expiration"],
  RefreshTokenCreateOrConnectWithoutUserInput: ["where", "create"],
  RefreshTokenCreateManyUserInputEnvelope: ["data", "skipDuplicates"],
  UserPasswordUpsertWithoutUserInput: ["update", "create"],
  UserPasswordUpdateWithoutUserInput: ["password", "forceChange", "createdAt", "updatedAt"],
  ProfileUpsertWithoutUserInput: ["update", "create"],
  ProfileUpdateWithoutUserInput: ["bio", "createdAt", "updatedAt", "exams", "attendances", "group"],
  RefreshTokenUpsertWithWhereUniqueWithoutUserInput: ["where", "update", "create"],
  RefreshTokenUpdateWithWhereUniqueWithoutUserInput: ["where", "data"],
  RefreshTokenUpdateManyWithWhereWithoutUserInput: ["where", "data"],
  RefreshTokenScalarWhereInput: ["AND", "OR", "NOT", "id", "label", "createdAt", "updatedAt", "hash", "valid", "expiration", "userId"],
  UserCreateWithoutProfileInput: ["id", "name", "avatar", "email", "emailConfirmed", "role", "createdAt", "updatedAt", "password", "tokens"],
  UserCreateOrConnectWithoutProfileInput: ["where", "create"],
  ExamCreateWithoutProfileInput: ["id", "createdAt", "updatedAt", "score", "note", "date"],
  ExamCreateOrConnectWithoutProfileInput: ["where", "create"],
  ExamCreateManyProfileInputEnvelope: ["data", "skipDuplicates"],
  AttendanceCreateWithoutProfileInput: ["id", "startAt", "endAt", "note", "group"],
  AttendanceCreateOrConnectWithoutProfileInput: ["where", "create"],
  AttendanceCreateManyProfileInputEnvelope: ["data", "skipDuplicates"],
  GroupCreateWithoutProfilesInput: ["id", "name", "createdAt", "updatedAt", "startAt", "endAt", "attendance", "grade"],
  GroupCreateOrConnectWithoutProfilesInput: ["where", "create"],
  UserUpsertWithoutProfileInput: ["update", "create"],
  UserUpdateWithoutProfileInput: ["id", "name", "avatar", "email", "emailConfirmed", "role", "createdAt", "updatedAt", "password", "tokens"],
  ExamUpsertWithWhereUniqueWithoutProfileInput: ["where", "update", "create"],
  ExamUpdateWithWhereUniqueWithoutProfileInput: ["where", "data"],
  ExamUpdateManyWithWhereWithoutProfileInput: ["where", "data"],
  ExamScalarWhereInput: ["AND", "OR", "NOT", "id", "createdAt", "updatedAt", "score", "note", "date", "profileId"],
  AttendanceUpsertWithWhereUniqueWithoutProfileInput: ["where", "update", "create"],
  AttendanceUpdateWithWhereUniqueWithoutProfileInput: ["where", "data"],
  AttendanceUpdateManyWithWhereWithoutProfileInput: ["where", "data"],
  AttendanceScalarWhereInput: ["AND", "OR", "NOT", "id", "startAt", "endAt", "note", "profileId", "groupId"],
  GroupUpsertWithoutProfilesInput: ["update", "create"],
  GroupUpdateWithoutProfilesInput: ["id", "name", "createdAt", "updatedAt", "startAt", "endAt", "attendance", "grade"],
  GroupCreateWithoutGradeInput: ["id", "name", "createdAt", "updatedAt", "startAt", "endAt", "profiles", "attendance"],
  GroupCreateOrConnectWithoutGradeInput: ["where", "create"],
  GroupCreateManyGradeInputEnvelope: ["data", "skipDuplicates"],
  GroupUpsertWithWhereUniqueWithoutGradeInput: ["where", "update", "create"],
  GroupUpdateWithWhereUniqueWithoutGradeInput: ["where", "data"],
  GroupUpdateManyWithWhereWithoutGradeInput: ["where", "data"],
  GroupScalarWhereInput: ["AND", "OR", "NOT", "id", "name", "createdAt", "updatedAt", "startAt", "endAt", "gradeId"],
  ProfileCreateWithoutGroupInput: ["bio", "createdAt", "updatedAt", "user", "exams", "attendances"],
  ProfileCreateOrConnectWithoutGroupInput: ["where", "create"],
  ProfileCreateManyGroupInputEnvelope: ["data", "skipDuplicates"],
  AttendanceCreateWithoutGroupInput: ["id", "startAt", "endAt", "note", "Profile"],
  AttendanceCreateOrConnectWithoutGroupInput: ["where", "create"],
  AttendanceCreateManyGroupInputEnvelope: ["data", "skipDuplicates"],
  GradeCreateWithoutGroupsInput: ["id", "name", "createdAt", "updatedAt"],
  GradeCreateOrConnectWithoutGroupsInput: ["where", "create"],
  ProfileUpsertWithWhereUniqueWithoutGroupInput: ["where", "update", "create"],
  ProfileUpdateWithWhereUniqueWithoutGroupInput: ["where", "data"],
  ProfileUpdateManyWithWhereWithoutGroupInput: ["where", "data"],
  ProfileScalarWhereInput: ["AND", "OR", "NOT", "id", "bio", "createdAt", "updatedAt", "groupId"],
  AttendanceUpsertWithWhereUniqueWithoutGroupInput: ["where", "update", "create"],
  AttendanceUpdateWithWhereUniqueWithoutGroupInput: ["where", "data"],
  AttendanceUpdateManyWithWhereWithoutGroupInput: ["where", "data"],
  GradeUpsertWithoutGroupsInput: ["update", "create"],
  GradeUpdateWithoutGroupsInput: ["id", "name", "createdAt", "updatedAt"],
  ProfileCreateWithoutExamsInput: ["bio", "createdAt", "updatedAt", "user", "attendances", "group"],
  ProfileCreateOrConnectWithoutExamsInput: ["where", "create"],
  ProfileUpsertWithoutExamsInput: ["update", "create"],
  ProfileUpdateWithoutExamsInput: ["bio", "createdAt", "updatedAt", "user", "attendances", "group"],
  ProfileCreateWithoutAttendancesInput: ["bio", "createdAt", "updatedAt", "user", "exams", "group"],
  ProfileCreateOrConnectWithoutAttendancesInput: ["where", "create"],
  GroupCreateWithoutAttendanceInput: ["id", "name", "createdAt", "updatedAt", "startAt", "endAt", "profiles", "grade"],
  GroupCreateOrConnectWithoutAttendanceInput: ["where", "create"],
  ProfileUpsertWithoutAttendancesInput: ["update", "create"],
  ProfileUpdateWithoutAttendancesInput: ["bio", "createdAt", "updatedAt", "user", "exams", "group"],
  GroupUpsertWithoutAttendanceInput: ["update", "create"],
  GroupUpdateWithoutAttendanceInput: ["id", "name", "createdAt", "updatedAt", "startAt", "endAt", "profiles", "grade"],
  RefreshTokenCreateManyUserInput: ["id", "label", "createdAt", "updatedAt", "hash", "valid", "expiration"],
  RefreshTokenUpdateWithoutUserInput: ["id", "label", "createdAt", "updatedAt", "hash", "valid", "expiration"],
  ExamCreateManyProfileInput: ["id", "createdAt", "updatedAt", "score", "note", "date"],
  AttendanceCreateManyProfileInput: ["id", "startAt", "endAt", "note", "groupId"],
  ExamUpdateWithoutProfileInput: ["id", "createdAt", "updatedAt", "score", "note", "date"],
  AttendanceUpdateWithoutProfileInput: ["id", "startAt", "endAt", "note", "group"],
  GroupCreateManyGradeInput: ["id", "name", "createdAt", "updatedAt", "startAt", "endAt"],
  GroupUpdateWithoutGradeInput: ["id", "name", "createdAt", "updatedAt", "startAt", "endAt", "profiles", "attendance"],
  ProfileCreateManyGroupInput: ["id", "bio", "createdAt", "updatedAt"],
  AttendanceCreateManyGroupInput: ["id", "startAt", "endAt", "note", "profileId"],
  ProfileUpdateWithoutGroupInput: ["bio", "createdAt", "updatedAt", "user", "exams", "attendances"],
  AttendanceUpdateWithoutGroupInput: ["id", "startAt", "endAt", "note", "Profile"]
};

type InputTypesNames = keyof typeof inputTypes;

type InputTypeFieldNames<TInput extends InputTypesNames> = Exclude<
  keyof typeof inputTypes[TInput]["prototype"],
  number | symbol
>;

type InputTypeFieldsConfig<
  TInput extends InputTypesNames
  > = FieldsConfig<InputTypeFieldNames<TInput>>;

export type InputTypeConfig<TInput extends InputTypesNames> = {
  class?: ClassDecorator[];
  fields?: InputTypeFieldsConfig<TInput>;
};

export type InputTypesEnhanceMap = {
  [TInput in InputTypesNames]?: InputTypeConfig<TInput>;
};

export function applyInputTypesEnhanceMap(
  inputTypesEnhanceMap: InputTypesEnhanceMap,
) {
  for (const inputTypeEnhanceMapKey of Object.keys(inputTypesEnhanceMap)) {
    const inputTypeName = inputTypeEnhanceMapKey as keyof typeof inputTypesEnhanceMap;
    const typeConfig = inputTypesEnhanceMap[inputTypeName]!;
    const typeClass = inputTypes[inputTypeName];
    const typeTarget = typeClass.prototype;
    applyTypeClassEnhanceConfig(
      typeConfig,
      typeClass,
      typeTarget,
      inputsInfo[inputTypeName as keyof typeof inputsInfo],
    );
  }
}

