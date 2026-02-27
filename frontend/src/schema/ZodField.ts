import { z, ZodType } from "zod";
import type { FieldConfig } from "../field-links/expenseFields";

const zodFieldFactory = (field: FieldConfig): ZodType => {
  let schema: ZodType;

  switch (field.type) {
    case "text":
      schema = z.string();
      break;

    case "number":
      schema = z.coerce.number();
      break;

    case "date":
      schema = z.coerce.date();
      break;

    default:
      schema = z.any();
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
