import { Next } from "koa";
import Router, { RouterContext } from "@koa/router";
import { handleOperation, extract } from "../../core/operation";
import { validateOrThrow } from "../../core/validation";
import { CreateShawrmaInput, createShawrmaSchema } from "./shawrma/create-shawrma.command";
import { deleteShawrmaSchema } from "./shawrma/delete-shawrma.command";
import { getShawrmaSchema } from "./shawrma/get-shawrma.command";
import { listShawrmasSchema } from "./shawrma/list-shawrmas.command";
import { replaceShawrmaSchema } from "./shawrma/replace-shawrma.command";
import { shawrmaExistsSchema } from "./shawrma/shawrma-exists.command";
import { updateShawrmaSchema } from "./shawrma/update-shawrma.command";
const router = new Router({prefix: '/food'});
export default router;
async function replaceShawrma(context: RouterContext, next: Next) {
    const input = {
        
        
        
        ...pick(context.params, "id"),
        
      }

    validateOrThrow(replaceShawrmaSchema, input)
    const output = await handleOperation('replace_shawrma', input)
    context.body = output
    await next()
}

router.put("/{id}/shawrma", replaceShawrma)
async function createShawrma(context: RouterContext, next: Next) {
    const input = {
        
        ...extract(context.request.body as CreateShawrmaInput, "kind"),
        
        
        
      }

    validateOrThrow(createShawrmaSchema, input)
    const output = await handleOperation('create_shawrma', input)
    context.body = output
    await next()
}

router.post("/shawrma", createShawrma)
async function deleteShawrma(context: RouterContext, next: Next) {
    const input = {
        
        
        
        ...pick(context.params, "id"),
        
      }

    validateOrThrow(deleteShawrmaSchema, input)
    const output = await handleOperation('delete_shawrma', input)
    context.body = output
    await next()
}

router.delete("/{id}/shawrma", deleteShawrma)
async function shawrmaExists(context: RouterContext, next: Next) {
    const input = {
        
        
        
        ...pick(context.params, "id"),
        
      }

    validateOrThrow(shawrmaExistsSchema, input)
    const output = await handleOperation('shawrma_exists', input)
    context.body = output
    await next()
}

router.head("/{id}/shawrma", shawrmaExists)
async function updateShawrma(context: RouterContext, next: Next) {
    const input = {
        
        
        
        ...pick(context.params, "id"),
        
      }

    validateOrThrow(updateShawrmaSchema, input)
    const output = await handleOperation('update_shawrma', input)
    context.body = output
    await next()
}

router.patch("/{id}/shawrma", updateShawrma)
async function getShawrma(context: RouterContext, next: Next) {
    const input = {
        
        
        
        ...pick(context.params, "id"),
        
      }

    validateOrThrow(getShawrmaSchema, input)
    const output = await handleOperation('get_shawrma', input)
    context.body = output
    await next()
}

router.get("/{id}/shawrma", getShawrma)
async function listShawrmas(context: RouterContext, next: Next) {
    const input = {
        
        
        ...pick(context.query as Record<string, any>, "pageSize","pageNo"),
        
        
      }

    validateOrThrow(listShawrmasSchema, input)
    const output = await handleOperation('list_shawrmas', input)
    context.body = output
    await next()
}

router.get("/shawrma", listShawrmas)
