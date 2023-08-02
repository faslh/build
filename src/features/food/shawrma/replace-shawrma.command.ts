import dataSource from "../../../core/data-source";
import { listen } from "../../../core/operation";
import { createSchema } from "../../../core/validation";
import Shawrma from "../shawrma.entity";

export const replaceShawrmaSchema = createSchema<ReplaceShawrmaInput>({
  "id": {
    "type": "string"
  }
});

export interface ReplaceShawrmaInput {
    id?: string;
}

export async function replaceShawrma(input: ReplaceShawrmaInput) {
    const shawrmaRepository = dataSource.getRepository(Shawrma);
    const replacedShawrma = await shawrmaRepository.save({id: input.id});
    
}

listen('replace_shawrma', replaceShawrma);
