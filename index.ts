import Koa from "koa";
import yargs from "yargs";
import {
  addAvailableScenarios,
  controlMiddleware,
  mockProxyMiddleware,
} from "../../src";
import {mocksDirectoryToday} from "./custom"

const server = new Koa();

const mode:any = yargs.argv.mode || "record"

console.log(mode)
// this middleware enables UI at the path /mockproxy/
server.use(controlMiddleware());

server.use(
  mockProxyMiddleware({
    mocksDirectory: mocksDirectoryToday,
    convertProxyResponse(body:Buffer, ctx) {
      console.log(Object.keys(ctx.response))
      console.log(Object.keys(ctx.res))
      return body
    },
    mode: mode,
    targetUrl: "https://github.com/",
    recordOptions: {
      overwrite: true,
    },
  })
);

// Adding available scenarios is necessary for use them


server.listen(3666);
