import { randomUUID as v4 } from 'crypto';
import { EventEmitter, once } from 'events';
import { pick } from 'lodash';

const end = Symbol('A symbol to mark the end of the operation');
const messageBus = new EventEmitter({ captureRejections: true });

export async function handleOperation(operation: string, input: any) {
  const operationId = v4();
  const message = {
    ...input,
    [end]: (output: any, error: any) => {
      if (error) {
        console.error(`Error processing ${operation} operation `, error);
        throw error;
      }
      messageBus.emit(operationId, output);
    },
  };
  messageBus.emit(operation, message);
  const output = await once(messageBus, operationId);
  messageBus.removeAllListeners(operationId);
  return output;
}

export function listen(operation: string, callback: (...args: any) => any) {
  messageBus.on(operation, async (message) => {
    const { [end]: endFn, ...input } = message;
    try {
      const output = await callback(input);
      endFn(output, null);
    } catch (error) {
      endFn(null, error);
    }
  });
}

export function extract<T, K extends keyof T>(
  object: T,
  ...paths: K[]
): Pick<T, K> {
  return pick(object, ...paths) as Pick<T, K>;
}
