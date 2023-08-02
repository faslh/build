import { handleOperation, extract } from "../../core/operation";
import { validateOrThrow } from "../../core/validation";
import { pick } from "lodash";
import { Next } from "koa";
import Router, { RouterContext } from "@koa/router";
const router = new Router({prefix: '/food'});
export default router;
async function replaceShawrma(context: RouterContext, next: Next) {
    const input = {
        
        
        
        ...pick(context.params, "id"),
        
      }

    validateOrThrow(shawrma.replaceShawrmaSchema, input)
    const output = await handleOperation('replace_shawrma', input)
    context.body = output
    await next()
}

router.put("/{id}/shawrma", replaceShawrma)
import * as shawrma from "./shawrma";
async function createShawrma(context: RouterContext, next: Next) {
    const input = {
        
        ...extract(context.request.body as shawrma.CreateShawrmaInput, "kind"),
        
        
        
      }

    validateOrThrow(shawrma.createShawrmaSchema, input)
    const output = await handleOperation('create_shawrma', input)
    context.body = output
    await next()
}

router.post("/shawrma", createShawrma)

async function deleteShawrma(context: RouterContext, next: Next) {
    const input = {
        
        
        
        ...pick(context.params, "id"),
        
      }

    validateOrThrow(shawrma.deleteShawrmaSchema, input)
    const output = await handleOperation('delete_shawrma', input)
    context.body = output
    await next()
}

router.delete("/{id}/shawrma", deleteShawrma)

async function shawrmaExists(context: RouterContext, next: Next) {
    const input = {
        
        
        
        ...pick(context.params, "id"),
        
      }

    validateOrThrow(shawrma.shawrmaExistsSchema, input)
    const output = await handleOperation('shawrma_exists', input)
    context.body = output
    await next()
}

router.head("/{id}/shawrma", shawrmaExists)

async function updateShawrma(context: RouterContext, next: Next) {
    const input = {
        
        
        
        ...pick(context.params, "id"),
        
      }

    validateOrThrow(shawrma.updateShawrmaSchema, input)
    const output = await handleOperation('update_shawrma', input)
    context.body = output
    await next()
}

router.patch("/{id}/shawrma", updateShawrma)

async function getShawrma(context: RouterContext, next: Next) {
    const input = {
        
        
        
        ...pick(context.params, "id"),
        
      }

    validateOrThrow(shawrma.getShawrmaSchema, input)
    const output = await handleOperation('get_shawrma', input)
    context.body = output
    await next()
}

router.get("/{id}/shawrma", getShawrma)

async function listShawrmas(context: RouterContext, next: Next) {
    const input = {
        
        
        ...pick(context.query as Record<string, any>, "pageSize","pageNo"),
        
        
      }

    validateOrThrow(shawrma.listShawrmasSchema, input)
    const output = await handleOperation('list_shawrmas', input)
    context.body = output
    await next()
}

router.get("/shawrma", listShawrmas)
