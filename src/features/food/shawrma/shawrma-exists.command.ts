import dataSource from "../../../core/data-source";
import { listen } from "../../../core/operation";
import { createSchema } from "../../../core/validation";
import Shawrma from "../shawrma.entity";

export const shawrmaExistsSchema = createSchema<ShawrmaExistsInput>({
  "id": {
    "type": "string"
  }
});

export interface ShawrmaExistsInput {
    id?: string;
}

export async function shawrmaExists(input: ShawrmaExistsInput) {
    const shawrmaRepository = dataSource.getRepository(Shawrma);
    const shawrmaExistsQB = shawrmaRepository.createQueryBuilder('Shawrma');
                shawrmaExistsQB.andWhere((qb => {shawrmaExistsQB.andWhere('Shawrma.id = :id', { id: input.id })}))
                const shawrmaExists = await shawrmaExistsQB.getOne().then(Boolean);
    
}

listen('shawrma_exists', shawrmaExists);
