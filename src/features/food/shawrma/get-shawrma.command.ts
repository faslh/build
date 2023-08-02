import dataSource from "../../../core/data-source";
import { execute } from "../../../core/execute";
import { listen } from "../../../core/operation";
import { createSchema } from "../../../core/validation";
import Shawrma from "../shawrma.entity";

export const getShawrmaSchema = createSchema<GetShawrmaInput>({
  "id": {
    "type": "string"
  }
});

export interface GetShawrmaInput {
    id?: string;
}

export async function getShawrma(input: GetShawrmaInput) {
    const shawrmaRepository = dataSource.getRepository(Shawrma);
    const qb = shawrmaRepository.createQueryBuilder('Shawrma');
    qb.andWhere((qb => {qb.andWhere('Shawrma.id = :id', { id: input.id })}))
    
    const shawrma = (await execute(qb))[0];
    
}

listen('get_shawrma', getShawrma);
