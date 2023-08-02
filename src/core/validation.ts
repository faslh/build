import Ajv, { JSONSchemaType } from 'ajv';
import addErrors from 'ajv-errors';
import addFormats from 'ajv-formats';
import { ProblemDetailsException } from 'rfc-7807-problem-details';
import validator from 'validator';

const ajv = new Ajv({
  allErrors: true,
  useDefaults: 'empty',
  removeAdditional: 'failing',
});

addErrors(ajv);
addFormats(ajv);
function isBetween(date: string, startDate: string, endDate: string) {
  if (!date) {
    return false;
  }
  if (!startDate) {
    return false;
  }
  if (!endDate) {
    return false;
  }

  return (
    validator.isAfter(date, startDate) && validator.isBefore(date, endDate)
  );
}

const validations = [
  ['isBefore', validator.isBefore],
  ['isAfter', validator.isAfter],
  ['isBoolean', validator.isBoolean],
  ['isDate', validator.isDate],
  ['isNumeric', validator.isNumeric],
  ['isLatLong', validator.isLatLong],
  ['isMobilePhone', validator.isMobilePhone],
  ['isEmpty', validator.isEmpty],
  ['isDecimal', validator.isDecimal],
  ['isURL', validator.isURL],
  ['isEmail', validator.isEmail],
  ['isBetween', isBetween],
];

validations.forEach(([key, value]) => {
  const keyword = key as string;
  ajv.addKeyword({
    keyword: keyword,
    validate: (schema: any, data: any) => {
      if (schema === undefined || schema === null) {
        return false;
      }
      const func = value as any;
      return func.apply(validator, [
        data,
        ...(Array.isArray(schema) ? schema : [schema]),
      ]);
    },
  });
});

export function createSchema<T>(
  properties: Record<
    keyof T,
    JSONSchemaType<any> & {
      required?: boolean;
    }
  >
): JSONSchemaType<T> {
  const required = (Object.entries(properties) as any[])
    .filter(([, value]) => value.required)
    .map(([key]) => key);

  const clearProperties = Object.fromEntries(
    (Object.entries(properties) as any[]).map(([key, value]) => {
      const { required, ...rest } = value;
      return [key, rest];
    })
  );

  return {
    type: 'object',
    properties: clearProperties,
    required: required,
    additionalProperties: false,
  } as JSONSchemaType<T>;
}

/**
 * Validate input against schema
 *
 * @param schema ajv augmented json-schema
 * @param input input to validate
 * @returns
 */
export function validateInput<T>(
  schema: JSONSchemaType<T>,
  input: T
): input is T {
  const validate = ajv.compile(schema);
  const valid = validate(input);
  if (!valid && validate.errors) {
    const errors = validate.errors.reduce<Record<string, string>>((acc, it) => {
      const property = it.instancePath.replace('.', '').replace('/', '');
      return { ...acc, [property]: it.message || '' };
    }, {});
    throw errors;
  }
  return true;
}

export class ValidationFailedException extends ProblemDetailsException {
  constructor(errors: Record<string, string>) {
    super({
      type: 'validation-failed',
      status: 400,
      title: 'Bad Request.',
      detail: 'Validation failed.',
    });
    this.Details.errors = errors;
  }
}

export function validateOrThrow<T>(schema: JSONSchemaType<T>, input: T) {
  try {
    validateInput(schema, input);
  } catch (errors: any) {
    throw new ValidationFailedException(errors);
  }
}
