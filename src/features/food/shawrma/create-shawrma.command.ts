import dataSource from "../../../core/data-source";
import { listen } from "../../../core/operation";
import { createSchema } from "../../../core/validation";
import Shawrma from "../shawrma.entity";

export const createShawrmaSchema = createSchema<CreateShawrmaInput>({
  "kind": {
    "type": "string",
    "required": true,
    "minLength": 1
  }
});

export interface CreateShawrmaInput {
    kind: string;
}

export async function createShawrma(input: CreateShawrmaInput) {
    const shawrmaRepository = dataSource.getRepository(Shawrma);
    const newShawrma = await shawrmaRepository.save({kind: input.kind});
    return {
            id:newShawrma.id
        }
}

listen('create_shawrma', createShawrma);
