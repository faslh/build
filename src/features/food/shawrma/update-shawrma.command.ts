import dataSource from "../../../core/data-source";
import { listen } from "../../../core/operation";
import { createSchema } from "../../../core/validation";
import Shawrma from "../shawrma.entity";

export const updateShawrmaSchema = createSchema<UpdateShawrmaInput>({
  "id": {
    "type": "string"
  }
});

export interface UpdateShawrmaInput {
    id?: string;
}

export async function updateShawrma(input: UpdateShawrmaInput) {
    const shawrmaRepository = dataSource.getRepository(Shawrma);
    const updatedShawrma = await shawrmaRepository.save({id: input.id});
    
}

listen('update_shawrma', updateShawrma);
