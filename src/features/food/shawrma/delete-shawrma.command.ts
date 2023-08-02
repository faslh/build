import dataSource from "../../../core/data-source";
import Shawrma from "../shawrma.entity";
export const deleteShawrmaSchema = createSchema<DeleteShawrmaInput>({
  "id": {
    "type": "string"
  }
});

export interface DeleteShawrmaInput {
    id?: string;
}

import { createSchema } from "../../../core/validation";
import { listen } from "../../../core/operation";

export async function deleteShawrma(input: DeleteShawrmaInput) {
    const shawrmaRepository = dataSource.getRepository(Shawrma);
    const deletedShawrmaQB = shawrmaRepository.createQueryBuilder('Shawrma');
                deletedShawrmaQB.andWhere((qb => {deletedShawrmaQB.andWhere('Shawrma.id = :id', { id: input.id })}))
                const deletedShawrma= await deletedShawrmaQB.getOneOrFail();
                await shawrmaRepository.softDelete(deletedShawrma.id);
                
    
}

listen('delete_shawrma', deleteShawrma);
