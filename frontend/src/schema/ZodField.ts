import { z, ZodType } from "zod";
import type { FieldConfig } from "../field-links/expenseFields";

const zodFieldFactory = (field: FieldConfig): ZodType => {
  let schema;

  switch (field.type) {
    case "text":
      schema = z.string();

      if (field.validation?.minLength)
        schema = schema.min(field.validation.minLength, {
          error: `Requires minimum ${field.validation.minLength} characters`,
        });

      if (field.validation?.maxLength)
        schema = schema.max(field.validation.maxLength, {
          error: `Requires maximum ${field.validation.maxLength} characters`,
        });

      break;

    case "number":
      schema = z.coerce.number();

      if (field.validation?.min !== undefined)
        schema = schema.min(field.validation.min, {
          error: `Field cannot be less than ${field.validation.min}`,
        });

      if (field.validation?.max !== undefined)
        schema = schema.max(field.validation.max, {
          error: `Field cannot exceed ${field.validation.max}`,
        });

      break;

    case "date":
      schema = z.coerce.date();
      break;

    default:
      schema = z.any();
  }

  if (!field.validation?.required) {
    schema = schema.optional();
  }

  return schema;
};

export const buildSchema = (fields: FieldConfig[]) => {
  const shape: Record<string, ZodType> = {};

  for (const field of fields) {
    shape[field.name] = zodFieldFactory(field);
  }

  return z.object(shape);
};
   