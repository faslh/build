import dataSource from "../../../core/data-source";
import { deferredJoinPagination, execute } from "../../../core/execute";
import { listen } from "../../../core/operation";
import { createSchema } from "../../../core/validation";
import Shawrma from "../shawrma.entity";

export const listShawrmasSchema = createSchema<ListShawrmasInput>({
  "pageSize": {
    "type": "number",
    "default": 50,
    "minimum": 1
  },
  "pageNo": {
    "type": "number",
    "minimum": 1
  }
});

export interface ListShawrmasInput {
    pageSize: number;
    pageNo?: number;
}

export async function listShawrmas(input: ListShawrmasInput) {
    const shawrmaRepository = dataSource.getRepository(Shawrma);
    const qb = shawrmaRepository.createQueryBuilder('Shawrma');
    

              const paginationMetadata = deferredJoinPagination(qb, {
                pageSize: input.pageSize,
                pageNo: input.pageNo,
                count: await qb.getCount(),
              });
            
    const records = (await execute(qb));
    const shawrmasList = {
                    meta: paginationMetadata(records),
                    records: records,
                  };
    return {
            data: shawrmasList.records,
            meta: shawrmasList.meta
        }
}

listen('list_shawrmas', listShawrmas);
