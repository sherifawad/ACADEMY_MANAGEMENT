/**
 * https://github.com/Ceveos/Fullstack-Boilerplate/blob/9e989c8059982412d598b36dedf23c6ad0044831/graphql/utils/assert.ts
 * Asserts an expression, and throws and error when failed.
 * This function can be used for type-assertions too.
 * @param shouldBeTruthy Expression to assert.
 * @param message Error message to throw when assertion fails.
 */
export function assert<T>(shouldBeTruthy: T, message?: string): asserts shouldBeTruthy {
	if (!shouldBeTruthy) throw new Error(message);
}
