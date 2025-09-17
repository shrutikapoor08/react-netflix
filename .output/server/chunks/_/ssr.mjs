import { createFileRoute, lazyRouteComponent, createRootRoute, HeadContent, Outlet, Scripts, RouterProvider, createRouter } from '@tanstack/react-router';
import { jsx, jsxs } from 'react/jsx-runtime';
import { c } from 'react/compiler-runtime';
import { Sun, Moon } from 'lucide-react';
import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import D from 'tiny-invariant';
import { isPlainObject, isRedirect, isNotFound, joinPaths, trimPath, processRouteTree, isResolvedRedirect, rootRouteId, getMatchedRoutes } from '@tanstack/router-core';
import { mergeHeaders, json } from '@tanstack/router-core/ssr/client';
import { AsyncLocalStorage } from 'node:async_hooks';
import { createMemoryHistory } from '@tanstack/history';
import { attachRouterServerSsrUtils } from '@tanstack/router-core/ssr/server';
import { defineHandlerCallback, renderRouterToStream } from '@tanstack/react-router/ssr/server';

function hasProp(obj, prop) {
  try {
    return prop in obj;
  } catch {
    return false;
  }
}

var __defProp$2 = Object.defineProperty;
var __defNormalProp$2 = (obj, key, value) => key in obj ? __defProp$2(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __publicField$2 = (obj, key, value) => {
  __defNormalProp$2(obj, typeof key !== "symbol" ? key + "" : key, value);
  return value;
};
class H3Error extends Error {
  constructor(message, opts = {}) {
    super(message, opts);
    __publicField$2(this, "statusCode", 500);
    __publicField$2(this, "fatal", false);
    __publicField$2(this, "unhandled", false);
    __publicField$2(this, "statusMessage");
    __publicField$2(this, "data");
    __publicField$2(this, "cause");
    if (opts.cause && !this.cause) {
      this.cause = opts.cause;
    }
  }
  toJSON() {
    const obj = {
      message: this.message,
      statusCode: sanitizeStatusCode(this.statusCode, 500)
    };
    if (this.statusMessage) {
      obj.statusMessage = sanitizeStatusMessage(this.statusMessage);
    }
    if (this.data !== void 0) {
      obj.data = this.data;
    }
    return obj;
  }
}
__publicField$2(H3Error, "__h3_error__", true);
function createError(input) {
  if (typeof input === "string") {
    return new H3Error(input);
  }
  if (isError(input)) {
    return input;
  }
  const err = new H3Error(input.message ?? input.statusMessage ?? "", {
    cause: input.cause || input
  });
  if (hasProp(input, "stack")) {
    try {
      Object.defineProperty(err, "stack", {
        get() {
          return input.stack;
        }
      });
    } catch {
      try {
        err.stack = input.stack;
      } catch {
      }
    }
  }
  if (input.data) {
    err.data = input.data;
  }
  if (input.statusCode) {
    err.statusCode = sanitizeStatusCode(input.statusCode, err.statusCode);
  } else if (input.status) {
    err.statusCode = sanitizeStatusCode(input.status, err.statusCode);
  }
  if (input.statusMessage) {
    err.statusMessage = input.statusMessage;
  } else if (input.statusText) {
    err.statusMessage = input.statusText;
  }
  if (err.statusMessage) {
    const originalMessage = err.statusMessage;
    const sanitizedMessage = sanitizeStatusMessage(err.statusMessage);
    if (sanitizedMessage !== originalMessage) {
      console.warn(
        "[h3] Please prefer using `message` for longer error messages instead of `statusMessage`. In the future, `statusMessage` will be sanitized by default."
      );
    }
  }
  if (input.fatal !== void 0) {
    err.fatal = input.fatal;
  }
  if (input.unhandled !== void 0) {
    err.unhandled = input.unhandled;
  }
  return err;
}
function isError(input) {
  return input?.constructor?.__h3_error__ === true;
}
function isMethod(event, expected, allowHead) {
  if (typeof expected === "string") {
    if (event.method === expected) {
      return true;
    }
  } else if (expected.includes(event.method)) {
    return true;
  }
  return false;
}
function assertMethod(event, expected, allowHead) {
  if (!isMethod(event, expected)) {
    throw createError({
      statusCode: 405,
      statusMessage: "HTTP method is not allowed."
    });
  }
}
function getRequestHost(event, opts = {}) {
  if (opts.xForwardedHost) {
    const xForwardedHost = event.node.req.headers["x-forwarded-host"];
    if (xForwardedHost) {
      return xForwardedHost;
    }
  }
  return event.node.req.headers.host || "localhost";
}
function getRequestProtocol(event, opts = {}) {
  if (opts.xForwardedProto !== false && event.node.req.headers["x-forwarded-proto"] === "https") {
    return "https";
  }
  return event.node.req.connection?.encrypted ? "https" : "http";
}
function getRequestURL(event, opts = {}) {
  const host = getRequestHost(event, opts);
  const protocol = getRequestProtocol(event, opts);
  const path = (event.node.req.originalUrl || event.path).replace(
    /^[/\\]+/g,
    "/"
  );
  return new URL(path, `${protocol}://${host}`);
}
function toWebRequest(event) {
  return event.web?.request || new Request(getRequestURL(event), {
    // @ts-ignore Undici option
    duplex: "half",
    method: event.method,
    headers: event.headers,
    body: getRequestWebStream(event)
  });
}

const RawBodySymbol = Symbol.for("h3RawBody");
const PayloadMethods$1 = ["PATCH", "POST", "PUT", "DELETE"];
function readRawBody(event, encoding = "utf8") {
  assertMethod(event, PayloadMethods$1);
  const _rawBody = event._requestBody || event.web?.request?.body || event.node.req[RawBodySymbol] || event.node.req.rawBody || event.node.req.body;
  if (_rawBody) {
    const promise2 = Promise.resolve(_rawBody).then((_resolved) => {
      if (Buffer.isBuffer(_resolved)) {
        return _resolved;
      }
      if (typeof _resolved.pipeTo === "function") {
        return new Promise((resolve, reject) => {
          const chunks = [];
          _resolved.pipeTo(
            new WritableStream({
              write(chunk) {
                chunks.push(chunk);
              },
              close() {
                resolve(Buffer.concat(chunks));
              },
              abort(reason) {
                reject(reason);
              }
            })
          ).catch(reject);
        });
      } else if (typeof _resolved.pipe === "function") {
        return new Promise((resolve, reject) => {
          const chunks = [];
          _resolved.on("data", (chunk) => {
            chunks.push(chunk);
          }).on("end", () => {
            resolve(Buffer.concat(chunks));
          }).on("error", reject);
        });
      }
      if (_resolved.constructor === Object) {
        return Buffer.from(JSON.stringify(_resolved));
      }
      if (_resolved instanceof URLSearchParams) {
        return Buffer.from(_resolved.toString());
      }
      return Buffer.from(_resolved);
    });
    return encoding ? promise2.then((buff) => buff.toString(encoding)) : promise2;
  }
  if (!Number.parseInt(event.node.req.headers["content-length"] || "") && !String(event.node.req.headers["transfer-encoding"] ?? "").split(",").map((e) => e.trim()).filter(Boolean).includes("chunked")) {
    return Promise.resolve(void 0);
  }
  const promise = event.node.req[RawBodySymbol] = new Promise(
    (resolve, reject) => {
      const bodyData = [];
      event.node.req.on("error", (err) => {
        reject(err);
      }).on("data", (chunk) => {
        bodyData.push(chunk);
      }).on("end", () => {
        resolve(Buffer.concat(bodyData));
      });
    }
  );
  const result = encoding ? promise.then((buff) => buff.toString(encoding)) : promise;
  return result;
}
function getRequestWebStream(event) {
  if (!PayloadMethods$1.includes(event.method)) {
    return;
  }
  const bodyStream = event.web?.request?.body || event._requestBody;
  if (bodyStream) {
    return bodyStream;
  }
  const _hasRawBody = RawBodySymbol in event.node.req || "rawBody" in event.node.req || "body" in event.node.req || "__unenv__" in event.node.req;
  if (_hasRawBody) {
    return new ReadableStream({
      async start(controller) {
        const _rawBody = await readRawBody(event, false);
        if (_rawBody) {
          controller.enqueue(_rawBody);
        }
        controller.close();
      }
    });
  }
  return new ReadableStream({
    start: (controller) => {
      event.node.req.on("data", (chunk) => {
        controller.enqueue(chunk);
      });
      event.node.req.on("end", () => {
        controller.close();
      });
      event.node.req.on("error", (err) => {
        controller.error(err);
      });
    }
  });
}

const DISALLOWED_STATUS_CHARS = /[^\u0009\u0020-\u007E]/g;
function sanitizeStatusMessage(statusMessage = "") {
  return statusMessage.replace(DISALLOWED_STATUS_CHARS, "");
}
function sanitizeStatusCode(statusCode, defaultStatusCode = 200) {
  if (!statusCode) {
    return defaultStatusCode;
  }
  if (typeof statusCode === "string") {
    statusCode = Number.parseInt(statusCode, 10);
  }
  if (statusCode < 100 || statusCode > 999) {
    return defaultStatusCode;
  }
  return statusCode;
}
function splitCookiesString(cookiesString) {
  if (Array.isArray(cookiesString)) {
    return cookiesString.flatMap((c) => splitCookiesString(c));
  }
  if (typeof cookiesString !== "string") {
    return [];
  }
  const cookiesStrings = [];
  let pos = 0;
  let start;
  let ch;
  let lastComma;
  let nextStart;
  let cookiesSeparatorFound;
  const skipWhitespace = () => {
    while (pos < cookiesString.length && /\s/.test(cookiesString.charAt(pos))) {
      pos += 1;
    }
    return pos < cookiesString.length;
  };
  const notSpecialChar = () => {
    ch = cookiesString.charAt(pos);
    return ch !== "=" && ch !== ";" && ch !== ",";
  };
  while (pos < cookiesString.length) {
    start = pos;
    cookiesSeparatorFound = false;
    while (skipWhitespace()) {
      ch = cookiesString.charAt(pos);
      if (ch === ",") {
        lastComma = pos;
        pos += 1;
        skipWhitespace();
        nextStart = pos;
        while (pos < cookiesString.length && notSpecialChar()) {
          pos += 1;
        }
        if (pos < cookiesString.length && cookiesString.charAt(pos) === "=") {
          cookiesSeparatorFound = true;
          pos = nextStart;
          cookiesStrings.push(cookiesString.slice(start, lastComma));
          start = pos;
        } else {
          pos = lastComma + 1;
        }
      } else {
        pos += 1;
      }
    }
    if (!cookiesSeparatorFound || pos >= cookiesString.length) {
      cookiesStrings.push(cookiesString.slice(start));
    }
  }
  return cookiesStrings;
}

typeof setImmediate === "undefined" ? (fn) => fn() : setImmediate;
function getResponseStatus(event) {
  return event.node.res.statusCode;
}
function getResponseHeaders(event) {
  return event.node.res.getHeaders();
}
function sendStream(event, stream) {
  if (!stream || typeof stream !== "object") {
    throw new Error("[h3] Invalid stream provided.");
  }
  event.node.res._data = stream;
  if (!event.node.res.socket) {
    event._handled = true;
    return Promise.resolve();
  }
  if (hasProp(stream, "pipeTo") && typeof stream.pipeTo === "function") {
    return stream.pipeTo(
      new WritableStream({
        write(chunk) {
          event.node.res.write(chunk);
        }
      })
    ).then(() => {
      event.node.res.end();
    });
  }
  if (hasProp(stream, "pipe") && typeof stream.pipe === "function") {
    return new Promise((resolve, reject) => {
      stream.pipe(event.node.res);
      if (stream.on) {
        stream.on("end", () => {
          event.node.res.end();
          resolve();
        });
        stream.on("error", (error) => {
          reject(error);
        });
      }
      event.node.res.on("close", () => {
        if (stream.abort) {
          stream.abort();
        }
      });
    });
  }
  throw new Error("[h3] Invalid or incompatible stream provided.");
}
function sendWebResponse(event, response) {
  for (const [key, value] of response.headers) {
    if (key === "set-cookie") {
      event.node.res.appendHeader(key, splitCookiesString(value));
    } else {
      event.node.res.setHeader(key, value);
    }
  }
  if (response.status) {
    event.node.res.statusCode = sanitizeStatusCode(
      response.status,
      event.node.res.statusCode
    );
  }
  if (response.statusText) {
    event.node.res.statusMessage = sanitizeStatusMessage(response.statusText);
  }
  if (response.redirected) {
    event.node.res.setHeader("location", response.url);
  }
  if (!response.body) {
    event.node.res.end();
    return;
  }
  return sendStream(event, response.body);
}

var __defProp = Object.defineProperty;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __publicField = (obj, key, value) => {
  __defNormalProp(obj, typeof key !== "symbol" ? key + "" : key, value);
  return value;
};
class H3Event {
  constructor(req, res) {
    __publicField(this, "__is_event__", true);
    // Context
    __publicField(this, "node");
    // Node
    __publicField(this, "web");
    // Web
    __publicField(this, "context", {});
    // Shared
    // Request
    __publicField(this, "_method");
    __publicField(this, "_path");
    __publicField(this, "_headers");
    __publicField(this, "_requestBody");
    // Response
    __publicField(this, "_handled", false);
    // Hooks
    __publicField(this, "_onBeforeResponseCalled");
    __publicField(this, "_onAfterResponseCalled");
    this.node = { req, res };
  }
  // --- Request ---
  get method() {
    if (!this._method) {
      this._method = (this.node.req.method || "GET").toUpperCase();
    }
    return this._method;
  }
  get path() {
    return this._path || this.node.req.url || "/";
  }
  get headers() {
    if (!this._headers) {
      this._headers = _normalizeNodeHeaders(this.node.req.headers);
    }
    return this._headers;
  }
  // --- Respoonse ---
  get handled() {
    return this._handled || this.node.res.writableEnded || this.node.res.headersSent;
  }
  respondWith(response) {
    return Promise.resolve(response).then(
      (_response) => sendWebResponse(this, _response)
    );
  }
  // --- Utils ---
  toString() {
    return `[${this.method}] ${this.path}`;
  }
  toJSON() {
    return this.toString();
  }
  // --- Deprecated ---
  /** @deprecated Please use `event.node.req` instead. */
  get req() {
    return this.node.req;
  }
  /** @deprecated Please use `event.node.res` instead. */
  get res() {
    return this.node.res;
  }
}
function _normalizeNodeHeaders(nodeHeaders) {
  const headers = new Headers();
  for (const [name, value] of Object.entries(nodeHeaders)) {
    if (Array.isArray(value)) {
      for (const item of value) {
        headers.append(name, item);
      }
    } else if (value) {
      headers.set(name, value);
    }
  }
  return headers;
}

function defineEventHandler(handler) {
  if (typeof handler === "function") {
    handler.__is_handler__ = true;
    return handler;
  }
  const _hooks = {
    onRequest: _normalizeArray(handler.onRequest),
    onBeforeResponse: _normalizeArray(handler.onBeforeResponse)
  };
  const _handler = (event) => {
    return _callHandler(event, handler.handler, _hooks);
  };
  _handler.__is_handler__ = true;
  _handler.__resolve__ = handler.handler.__resolve__;
  _handler.__websocket__ = handler.websocket;
  return _handler;
}
function _normalizeArray(input) {
  return input ? Array.isArray(input) ? input : [input] : void 0;
}
async function _callHandler(event, handler, hooks) {
  if (hooks.onRequest) {
    for (const hook of hooks.onRequest) {
      await hook(event);
      if (event.handled) {
        return;
      }
    }
  }
  const body = await handler(event);
  const response = { body };
  if (hooks.onBeforeResponse) {
    for (const hook of hooks.onBeforeResponse) {
      await hook(event, response);
    }
  }
  return response.body;
}

function He(e){return jsx(RouterProvider,{router:e.router})}const De=defineHandlerCallback(({request:e,router:t,responseHeaders:r})=>renderRouterToStream({request:e,router:t,responseHeaders:r,children:jsx(He,{router:t})})),S={stringify:e=>JSON.stringify(e,function(r,n){const o=this[r],s=I.find(i=>i.stringifyCondition(o));return s?s.stringify(o):n}),parse:e=>JSON.parse(e,function(r,n){const o=this[r];if(isPlainObject(o)){const s=I.find(i=>i.parseCondition(o));if(s)return s.parse(o)}return n}),encode:e=>{if(Array.isArray(e))return e.map(r=>S.encode(r));if(isPlainObject(e))return Object.fromEntries(Object.entries(e).map(([r,n])=>[r,S.encode(n)]));const t=I.find(r=>r.stringifyCondition(e));return t?t.stringify(e):e},decode:e=>{if(isPlainObject(e)){const t=I.find(r=>r.parseCondition(e));if(t)return t.parse(e)}return Array.isArray(e)?e.map(t=>S.decode(t)):isPlainObject(e)?Object.fromEntries(Object.entries(e).map(([t,r])=>[t,S.decode(r)])):e}},b=(e,t,r,n)=>({key:e,stringifyCondition:t,stringify:o=>({[`$${e}`]:r(o)}),parseCondition:o=>Object.hasOwn(o,`$${e}`),parse:o=>n(o[`$${e}`])}),I=[b("undefined",e=>e===void 0,()=>0,()=>{}),b("date",e=>e instanceof Date,e=>e.toISOString(),e=>new Date(e)),b("error",e=>e instanceof Error,e=>({...e,message:e.message,stack:e.stack,cause:e.cause}),e=>Object.assign(new Error(e.message),e)),b("formData",e=>e instanceof FormData,e=>{const t={};return e.forEach((r,n)=>{const o=t[n];o!==void 0?Array.isArray(o)?o.push(r):t[n]=[o,r]:t[n]=r;}),t},e=>{const t=new FormData;return Object.entries(e).forEach(([r,n])=>{Array.isArray(n)?n.forEach(o=>t.append(r,o)):t.append(r,n);}),t}),b("bigint",e=>typeof e=="bigint",e=>e.toString(),e=>BigInt(e)),b("server-function",e=>typeof e=="function"&&"functionId"in e&&typeof e.functionId=="string",({functionId:e})=>({functionId:e,__serverFn:true}),e=>e)],Q=new AsyncLocalStorage;async function Pe(e,t){return Q.run(e,t)}function Le(e){const t=Q.getStore();if(!t&&(e==null?void 0:e.throwIfNotFound)!==false)throw new Error("No Start context found in AsyncLocalStorage. Make sure you are using the function within the server runtime.");return t}const ze=[],Ue=()=>{var e;return (e=Le({throwIfNotFound:false}))==null?void 0:e.router};function E(e,t){const r=t||e||{};return typeof r.method>"u"&&(r.method="GET"),{options:r,middleware:n=>E(void 0,Object.assign(r,{middleware:n})),validator:n=>E(void 0,Object.assign(r,{validator:n})),type:n=>E(void 0,Object.assign(r,{type:n})),handler:(...n)=>{const[o,s]=n;Object.assign(r,{...o,extractedFn:o,serverFn:s});const i=[...r.middleware||[],Ve(r)];return Object.assign(async a=>Y(i,"client",{...o,...r,data:a==null?void 0:a.data,headers:a==null?void 0:a.headers,signal:a==null?void 0:a.signal,context:{},router:Ue()}).then(c=>{if(r.response==="full")return c;if(c.error)throw c.error;return c.result}),{...o,__executeServer:async(a,c)=>{const u=a instanceof FormData?We(a):a;u.type=typeof r.type=="function"?r.type(u):r.type;const p={...o,...u,signal:c},f=()=>Y(i,"server",p).then(l=>({result:l.result,error:l.error,context:l.sendContext}));if(p.type==="static"){let l;if(_!=null&&_.getItem&&(l=await _.getItem(p)),l||(l=await f().then(R=>({ctx:R,error:null})).catch(R=>({ctx:void 0,error:R})),_!=null&&_.setItem&&await _.setItem(p,l)),D(l,"No response from both server and static cache!"),l.error)throw l.error;return l.ctx}return f()}})}}}async function Y(e,t,r){const n=k([...ze,...e]),o=async s=>{const i=n.shift();if(!i)return s;i.options.validator&&(t!=="client"||i.options.validateClient)&&(s.data=await Ge(i.options.validator,s.data));const a=t==="client"?i.options.client:i.options.server;return a?Ye(a,s,async c=>o(c).catch(u=>{if(isRedirect(u)||isNotFound(u))return {...c,error:u};throw u})):o(s)};return o({...r,headers:r.headers||{},sendContext:r.sendContext||{},context:r.context||{}})}let _;function Be(e){const t=_;return _=typeof e=="function"?e():e,()=>{_=t;}}async function Je(e){const t=new TextEncoder().encode(e),r=await crypto.subtle.digest("SHA-1",t);return Array.from(new Uint8Array(r)).map(s=>s.toString(16).padStart(2,"0")).join("")}Be(()=>{const e=async(n,o)=>`/__tsr/staticServerFnCache/${await Je(`${n.functionId}__${o}`)}.json`,t=n=>JSON.stringify(n??"",(i,a)=>a&&typeof a=="object"&&!Array.isArray(a)?Object.keys(a).sort().reduce((c,u)=>(c[u]=a[u],c),{}):a).replace(/[/\\?%*:|"<>]/g,"-").replace(/\s+/g,"_"),r=typeof document<"u"?new Map:null;return {getItem:async n=>{if(typeof document>"u"){const o=t(n.data),s=await e(n,o),i="/Users/shrutikapoor/Development/react/crash-course/netflix/.output/public",{promises:a}=await import('node:fs'),u=(await import('node:path')).join(i,s),[p,f]=await a.readFile(u,"utf-8").then(l=>[S.parse(l),null]).catch(l=>[null,l]);if(f&&f.code!=="ENOENT")throw f;return p}},setItem:async(n,o)=>{const{promises:s}=await import('node:fs'),i=await import('node:path'),a=t(n.data),c=await e(n,a),p=i.join("/Users/shrutikapoor/Development/react/crash-course/netflix/.output/public",c);await s.mkdir(i.dirname(p),{recursive:true}),await s.writeFile(p,S.stringify(o));},fetchItem:async n=>{const o=t(n.data),s=await e(n,o);let i=r==null?void 0:r.get(s);return i||(i=await fetch(s,{method:"GET"}).then(a=>a.text()).then(a=>S.parse(a)),r==null||r.set(s,i)),i}}});function We(e){const t=e.get("__TSR_CONTEXT");if(e.delete("__TSR_CONTEXT"),typeof t!="string")return {context:{},data:e};try{return {context:S.parse(t),data:e}}catch{return {data:e}}}function k(e){const t=new Set,r=[],n=o=>{o.forEach(s=>{s.options.middleware&&n(s.options.middleware),t.has(s)||(t.add(s),r.push(s));});};return n(e),r}const Ye=async(e,t,r)=>e({...t,next:async(n={})=>r({...t,...n,context:{...t.context,...n.context},sendContext:{...t.sendContext,...n.sendContext??{}},headers:mergeHeaders(t.headers,n.headers),result:n.result!==void 0?n.result:t.response==="raw"?n:t.result,error:n.error??t.error})});function Ge(e,t){if(e==null)return {};if("~standard"in e){const r=e["~standard"].validate(t);if(r instanceof Promise)throw new Error("Async validation not supported");if(r.issues)throw new Error(JSON.stringify(r.issues,void 0,2));return r.value}if("parse"in e)return e.parse(t);if(typeof e=="function")return e(t);throw new Error("Invalid validator type!")}function Ve(e){return {_types:void 0,options:{validator:e.validator,validateClient:e.validateClient,client:async({next:t,sendContext:r,...n})=>{var o;const s={...n,context:r,type:typeof n.type=="function"?n.type(n):n.type};n.type;const i=await((o=e.extractedFn)==null?void 0:o.call(e,s));return t(i)},server:async({next:t,...r})=>{var n;const o=await((n=e.serverFn)==null?void 0:n.call(e,r));return t({...r,result:o})}}}}const ee=new AsyncLocalStorage;function Ze(e){return defineEventHandler(t=>qe(t,()=>e(t)))}async function qe(e,t){return ee.run(e,t)}function te(){const e=ee.getStore();if(!e)throw new Error("No HTTPEvent found in AsyncLocalStorage. Make sure you are using the function within the server runtime.");return e}const re=Symbol("$HTTPEvent");function Xe(e){return typeof e=="object"&&(e instanceof H3Event||(e==null?void 0:e[re])instanceof H3Event||(e==null?void 0:e.__is_event__)===true)}function ne(e){return function(...t){const r=t[0];return Xe(r)?t[0]=r instanceof H3Event||r.__is_event__?r:r[re]:t.unshift(te()),e(...t)}}const Ke=ne(getResponseStatus),Qe=ne(getResponseHeaders);const C={routeTree:"tanstack-start-route-tree:v",startManifest:"tanstack-start-manifest:v",serverFnManifest:"tanstack-start-server-fn-manifest:v"};async function L(e){switch(e){case C.routeTree:return await Promise.resolve().then(()=>xt);case C.startManifest:return await import('./_tanstack-start-manifest_v-6gPS0yY0.mjs');case C.serverFnManifest:return await import('./_tanstack-start-server-fn-manifest_v-DIQn6TBS.mjs');default:throw new Error(`Unknown virtual module: ${e}`)}}async function et(e){const{tsrStartManifest:t}=await L(C.startManifest),r=t(),n=r.routes[rootRouteId]=r.routes[rootRouteId]||{};n.assets=n.assets||[];let o=`import('${r.clientEntry}')`;return globalThis.TSS_INJECTED_HEAD_SCRIPTS&&(o=`${globalThis.TSS_INJECTED_HEAD_SCRIPTS+";"}${o}`),n.assets.push({tag:"script",attrs:{type:"module",suppressHydrationWarning:true,async:true},children:o}),{...r,routes:Object.fromEntries(Object.entries(r.routes).map(([i,a])=>{const{preloads:c,assets:u}=a;return [i,{preloads:c,assets:u}]}))}}function tt(e){return e.replace(/^\/|\/$/g,"")}async function rt(e,t){async function r(o,s){const i=o[s];i&&typeof i=="object"&&await Promise.all(Object.keys(i).map(a=>r(i,a))),t&&(o[s]=await t(s,o[s]));}const n={"":e};return await r(n,""),n[""]}async function nt(e,t){if(t&&t.__serverFn===true&&t.functionId){const r=await oe(t.functionId);return async(n,o)=>(await r(n??{},o)).result}return t}async function oe(e){const{default:t}=await L(C.serverFnManifest),r=t[e];if(!r)throw console.info("serverFnManifest",t),new Error("Server function info not found for "+e);const n=await r.importer();if(!n)throw console.info("serverFnInfo",r),new Error("Server function module not resolved for "+e);const o=n[r.functionName];if(!o)throw console.info("serverFnInfo",r),console.info("fnModule",n),new Error(`Server function module export not resolved for serverFn ID: ${e}`);return o}async function G(e){const t=S.parse(e);return await rt(t,nt),t}const ot=async({request:e})=>{const t=new AbortController,r=t.signal,n=()=>t.abort();e.signal.addEventListener("abort",n);const o=e.method,s=new URL(e.url,"http://localhost:3000"),i=new RegExp(`${tt("/_serverFn")}/([^/?#]+)`),a=s.pathname.match(i),c=a?a[1]:null,u=Object.fromEntries(s.searchParams.entries()),p="createServerFn"in u;if(typeof c!="string")throw new Error("Invalid server action param for serverFnId: "+c);const l=await oe(c),R=["multipart/form-data","application/x-www-form-urlencoded"],T=await(async()=>{try{let d=await(async()=>{if(e.headers.get("Content-Type")&&R.some(v=>{var g;return (g=e.headers.get("Content-Type"))==null?void 0:g.includes(v)}))return D(o.toLowerCase()!=="get","GET requests with FormData payloads are not supported"),await l(await e.formData(),r);if(o.toLowerCase()==="get"){let v=u;return p&&(v=u.payload),v=v&&await G(v),await l(v,r)}const h=await e.text(),m=await G(h);return p?await l(m,r):await l(...m,r)})();return d.result instanceof Response?d.result:!p&&(d=d.result,d instanceof Response)?d:isNotFound(d)?V(d):new Response(d!==void 0?S.stringify(d):void 0,{status:Ke(te()),headers:{"Content-Type":"application/json"}})}catch(d){return d instanceof Response?d:isNotFound(d)?V(d):(console.info(),console.info("Server Fn Error!"),console.info(),console.error(d),console.info(),new Response(S.stringify(d),{status:500,headers:{"Content-Type":"application/json"}}))}})();return e.signal.removeEventListener("abort",n),T};function V(e){const{headers:t,...r}=e;return new Response(JSON.stringify(r),{status:200,headers:{"Content-Type":"application/json",...t||{}}})}const st={TSS_SHELL:"X-TSS_SHELL"};function at(e){return mergeHeaders(Qe(),{"Content-Type":"text/html; charset=UTF-8"},...e.router.state.matches.map(r=>r.headers))}function it({createRouter:e}){let t=null,r=null,n;return o=>{const s=globalThis.fetch,i=async({request:a})=>{globalThis.fetch=async function(h,m){function v(y,B){const J=new Request(y,B);return i({request:J})}function g(){return a.headers.get("Origin")||a.headers.get("Referer")||"http://localhost"}if(typeof h=="string"&&h.startsWith("/")){const y=new URL(h,g());return v(y,m)}else if(typeof h=="object"&&"url"in h&&typeof h.url=="string"&&h.url.startsWith("/")){const y=new URL(h.url,g());return v(y,m)}return s(h,m)};const c=new URL(a.url),u=c.href.replace(c.origin,""),p="/",f=await e(),l=createMemoryHistory({initialEntries:[u]}),R=process.env.TSS_PRERENDERING==="true";let T=process.env.TSS_SHELL==="true";R&&!T&&(T=a.headers.get(st.TSS_SHELL)==="true"),f.update({history:l,isShell:T,isPrerendering:R});const d=await(async()=>{try{const h=joinPaths([p,trimPath("/_serverFn"),"/"]);if(u.startsWith(h))return await ot({request:a});if(t===null)try{t=await L(C.routeTree),t.serverRouteTree&&(n=processRouteTree({routeTree:t.serverRouteTree,initRoute:(g,y)=>{g.init({originalIndex:y});}}));}catch(g){console.log(g);}const m=()=>Pe({router:f},async()=>{const y=(a.headers.get("Accept")||"*/*").split(",");if(!["*/*","text/html"].some(fe=>y.some(pe=>pe.trim().startsWith(fe))))return json({error:"Only HTML requests are supported here"},{status:500});if(r===null&&(r=await et({basePath:p})),attachRouterServerSsrUtils(f,r),await f.load(),f.state.redirect)return f.state.redirect;await f.serverSsr.dehydrate();const de=at({router:f});return await o({request:a,router:f,responseHeaders:de})});if(n){const[g,y]=await ct({processedServerRouteTree:n,router:f,request:a,basePath:p,executeRouter:m});if(y)return y}return await m()}catch(h){if(h instanceof Response)return h;throw h}})();if(isRedirect(d)){if(isResolvedRedirect(d))return a.headers.get("x-tsr-redirect")==="manual"?json({...d.options,isSerializedRedirect:true},{headers:d.headers}):d;if(d.options.to&&typeof d.options.to=="string"&&!d.options.to.startsWith("/"))throw new Error(`Server side redirects must use absolute paths via the 'href' or 'to' options. The redirect() method's "to" property accepts an internal path only. Use the "href" property to provide an external URL. Received: ${JSON.stringify(d.options)}`);if(["params","search","hash"].some(m=>typeof d.options[m]=="function"))throw new Error(`Server side redirects must use static search, params, and hash values and do not support functional values. Received functional values for: ${Object.keys(d.options).filter(m=>typeof d.options[m]=="function").map(m=>`"${m}"`).join(", ")}`);const h=f.resolveRedirect(d);return a.headers.get("x-tsr-redirect")==="manual"?json({...d.options,isSerializedRedirect:true},{headers:d.headers}):h}return d};return i}}async function ct(e){var t,r;const o=new URL(e.request.url).pathname,s=getMatchedRoutes({pathname:o,basepath:e.basePath,caseSensitive:true,routesByPath:e.processedServerRouteTree.routesByPath,routesById:e.processedServerRouteTree.routesById,flatRoutes:e.processedServerRouteTree.flatRoutes}),i=e.router.getMatchedRoutes(o,void 0);let a,c=[];if(c=s.matchedRoutes,i.foundRoute&&s.matchedRoutes.length<i.matchedRoutes.length){const u=[...i.matchedRoutes].reverse().find(p=>e.processedServerRouteTree.routesById[p.id]!==void 0);if(u){let p=u.id;c=[];do{const f=e.processedServerRouteTree.routesById[p];if(!f)break;c.push(f),p=(t=f.parentRoute)==null?void 0:t.id;}while(p);c.reverse();}}if(c.length){const u=k(c.flatMap(f=>f.options.middleware).filter(Boolean)).map(f=>f.options.server);if((r=s.foundRoute)!=null&&r.options.methods){const f=Object.keys(s.foundRoute.options.methods).find(l=>l.toLowerCase()===e.request.method.toLowerCase());if(f){const l=s.foundRoute.options.methods[f];l&&(typeof l=="function"?u.push(j(l)):(l._options.middlewares&&l._options.middlewares.length&&u.push(...k(l._options.middlewares).map(R=>R.options.server)),l._options.handler&&u.push(j(l._options.handler))));}}u.push(j(e.executeRouter)),a=(await ut(u,{request:e.request,context:{},params:s.routeParams,pathname:o})).response;}return [c,a]}function j(e){return async({next:t,...r})=>{const n=await e(r);return n?{response:n}:t(r)}}function ut(e,t){let r=-1;const n=async o=>{r++;const s=e[r];if(!s)return o;const i=await s({...o,next:async a=>{const c=await n({...o,...a,context:{...o.context,...(a==null?void 0:a.context)||{}}});return Object.assign(o,O(c))}}).catch(a=>{if(se(a))return {response:a};throw a});return Object.assign(o,O(i))};return O(n(t))}function O(e){return se(e)?{response:e}:e}function se(e){return lt(e)||isRedirect(e)}function lt(e){return e instanceof Response}const dt=create(persist((e,t)=>({isDarkMode:true,toggleTheme:()=>{const r=!t().isDarkMode;e({isDarkMode:r}),document.documentElement.classList.toggle("dark",r);},initializeTheme:()=>{const{isDarkMode:r}=t();document.documentElement.classList.toggle("dark",r);}}),{name:"netflix-theme-storage",onRehydrateStorage:()=>e=>{e&&e.initializeTheme();}})),ft=()=>{const e=c(6),{isDarkMode:t,toggleTheme:r}=dt(),n=`Switch to ${t?"light":"dark"} mode`;let o;e[0]!==t?(o=t?jsx(Sun,{size:20,className:"text-white transition-colors duration-200"}):jsx(Moon,{size:20,className:"text-gray-800 dark:text-white transition-colors duration-200"}),e[0]=t,e[1]=o):o=e[1];let s;return e[2]!==n||e[3]!==o||e[4]!==r?(s=jsx("button",{onClick:r,className:"bg-white/10 dark:bg-white/10 border border-white/20 dark:border-white/20 rounded-lg p-2 cursor-pointer transition-all duration-200 flex items-center justify-center backdrop-blur-sm hover:bg-white/20 dark:hover:bg-white/20 hover:-translate-y-0.5 focus:outline-2 focus:outline-red-600 focus:outline-offset-2","aria-label":n,children:o}),e[2]=n,e[3]=o,e[4]=r,e[5]=s):s=e[5],s},pt=()=>{const e=c(2);let t;e[0]===Symbol.for("react.memo_cache_sentinel")?(t=jsx("div",{className:"flex-shrink-0",children:jsx("h1",{className:"text-xl lg:text-4xl font-bold text-red-600",children:"REACTFLIX"})}),e[0]=t):t=e[0];let r;return e[1]===Symbol.for("react.memo_cache_sentinel")?(r=jsx("header",{className:"relative top-0 left-0 right-0 z-[100] py-5 bg-gradient-to-b from-black/70 via-black/30 to-transparent",children:jsxs("div",{className:"max-w-6xl mx-auto px-6 md:px-6 flex justify-between items-center",children:[t,jsx("div",{className:"flex items-center gap-4",children:jsx(ft,{})})]})}),e[1]=r):r=e[1],r},ht="/assets/App-DYYWidPm.css",z=createRootRoute({head:()=>({meta:[{charSet:"utf-8"},{name:"viewport",content:"width=device-width, initial-scale=1"},{title:"Netflix Clone"},{name:"description",content:"React Netflix Clone Application built by Shruti Kapoor"}],links:[{rel:"stylesheet",href:ht},{rel:"icon",href:"/favicon.ico"},{rel:"apple-touch-icon",href:"/logo192.png"},{rel:"manifest",href:"/manifest.json"}]}),component:mt});function mt(){const e=c(2);let t;e[0]===Symbol.for("react.memo_cache_sentinel")?(t=jsx("head",{children:jsx(HeadContent,{})}),e[0]=t):t=e[0];let r;return e[1]===Symbol.for("react.memo_cache_sentinel")?(r=jsxs("html",{lang:"en",className:"dark",children:[t,jsxs("body",{children:[jsxs("div",{id:"root",children:[jsx(pt,{}),jsx(Outlet,{})]}),jsx(Scripts,{})]})]}),e[1]=r):r=e[1],r}function Z(e){return e.replace(/^\/|\/$/g,"")}const U=(e,t,r)=>{D(r,"🚨splitImportFn required for the server functions server runtime, but was not provided.");const n=Z("/"),o=Z(t),s=`${n?`/${n}`:""}/${o}/${e}`;return Object.assign(r,{url:s,functionId:e})},ae="https://api.themoviedb.org/3/movie",ie="eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJlOTdmNTI3N2RjYzExZmU3ZTJjNjM2NmVmOTM1NTM5YiIsIm5iZiI6MTc1MzE2MDI5NC4yODgsInN1YiI6IjY4N2YxYTY2ZjlmY2M5NWI5YWQ5OTVmYiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.yYE6qWd02l2Nf5SqVStFZwAoyImCY2tw9d3MU_3smrw",wt=U("src_lib_movieServerFn_ts--getMovies_createServerFn_handler","/_serverFn",(e,t)=>ce.__executeServer(e,t)),ce=E({method:"GET"}).handler(wt,async()=>{try{const e=await fetch(`${ae}/popular`,{headers:{accept:"application/json",Authorization:`Bearer ${ie}`}});if(!e.ok)throw new Error(`Failed to fetch movies: ${e.statusText}`);return {movies:await e.json()}}catch(e){const t=e instanceof Error?e.message:"Unknown error occurred";throw new Error(`Movies fetch failed: ${t}`)}}),vt=U("src_lib_movieServerFn_ts--getMovieById_createServerFn_handler","/_serverFn",(e,t)=>ue.__executeServer(e,t)),ue=E({method:"GET"}).handler(vt,async({data:e})=>{console.log({data:e});const t=e;try{const r=await fetch(`${ae}/${t}?language=en-US`,{headers:{accept:"application/json",Authorization:`Bearer ${ie}`}});if(console.log({response:r}),!r.ok)throw new Error(`Failed to fetch movie: ${r.statusText}`);const n=await r.json();return console.log({video:n}),{video:n}}catch(r){const n=r instanceof Error?r.message:"Unknown error occurred";throw new Error(`Movie fetch failed: ${n}`)}}),yt=U("src_lib_movieServerFn_ts--streamComments_createServerFn_handler","/_serverFn",(e,t)=>gt.__executeServer(e,t)),gt=E({method:"GET",response:"raw"}).handler(yt,async({signal:e,data:t})=>{const r=t,n=new ReadableStream({async start(o){const s=new TextEncoder,i=[{id:"1",author:"Sarah Johnson",content:"Amazing cinematography! The visuals were absolutely stunning.",timestamp:new Date(Date.now()-1e3*60*30),likes:15,replies:[{id:"1-1",author:"Mike Chen",content:"Totally agree! The color grading was perfect.",timestamp:new Date(Date.now()-1e3*60*15),likes:3}]},{id:"2",author:"Alex Rodriguez",content:"The soundtrack really elevated the emotional moments. Brilliant film!",timestamp:new Date(Date.now()-1e3*60*60*2),likes:8},{id:"3",author:"Emma Wilson",content:"Character development was top-notch. Every actor delivered outstanding performances.",timestamp:new Date(Date.now()-1e3*60*60*24),likes:22}];o.enqueue(s.encode(`data: ${JSON.stringify({type:"initial",comments:i})}

`));let a=4;const c=setInterval(()=>{if(e.aborted){clearInterval(c),o.close();return}const u={id:a.toString(),author:`User ${a}`,content:`This is a new comment #${a} about movie ${r}`,timestamp:new Date,likes:Math.floor(Math.random()*10)};o.enqueue(s.encode(`data: ${JSON.stringify({type:"new",comment:u})}

`)),a++;},1e4);e.addEventListener("abort",()=>{clearInterval(c),o.close();});}});return new Response(n,{headers:{"Content-Type":"text/event-stream","Cache-Control":"no-cache",Connection:"keep-alive","Access-Control-Allow-Origin":"*","Access-Control-Allow-Headers":"Cache-Control"}})}),St=()=>import('./index-DP-tBrOQ.mjs'),Rt=()=>import('./index-Dzu_x_uv.mjs'),_t=createFileRoute("/")({loader:async()=>{try{return await ce()}catch(e){return console.error("Failed to load movies:",e),{movies:{results:[]}}}},component:lazyRouteComponent(Rt,"component"),errorComponent:lazyRouteComponent(St,"errorComponent")}),Tt=()=>import('./movie._id-pVn5xXe4.mjs'),bt=()=>import('./movie._id-BVFTgVta.mjs'),Et=createFileRoute("/movie/$id")({loader:async({params:e})=>{if(!(e!=null&&e.id))throw new Error("Movie ID is required");return console.log({params:e}),await ue({data:e.id})},component:lazyRouteComponent(bt,"component"),errorComponent:lazyRouteComponent(Tt,"errorComponent")}),Ct=_t.update({id:"/",path:"/",getParentRoute:()=>z}),Mt=Et.update({id:"/movie/$id",path:"/movie/$id",getParentRoute:()=>z}),It={IndexRoute:Ct,MovieIdRoute:Mt},le=z._addFileChildren(It)._addFileTypes(),xt=Object.freeze(Object.defineProperty({__proto__:null,routeTree:le},Symbol.toStringTag,{value:"Module"}));function Ft(){return createRouter({routeTree:le,scrollRestoration:true})}const $t=it({createRouter:Ft})(De),Vt=Ze(function(e){const t=toWebRequest(e);return $t({request:t})});

export { _t as R, Et as a, E as b, U as c, Vt as default, gt as s, dt as u };
//# sourceMappingURL=ssr.mjs.map
