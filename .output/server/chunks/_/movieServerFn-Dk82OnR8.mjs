import { c as U, b as E } from './ssr.mjs';
import '@tanstack/react-router';
import 'react/jsx-runtime';
import 'react/compiler-runtime';
import 'lucide-react';
import 'zustand';
import 'zustand/middleware';
import 'tiny-invariant';
import '@tanstack/router-core';
import '@tanstack/router-core/ssr/client';
import 'node:async_hooks';
import '@tanstack/history';
import '@tanstack/router-core/ssr/server';
import '@tanstack/react-router/ssr/server';

const l = "https://api.themoviedb.org/3/movie", d = "eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJlOTdmNTI3N2RjYzExZmU3ZTJjNjM2NmVmOTM1NTM5YiIsIm5iZiI6MTc1MzE2MDI5NC4yODgsInN1YiI6IjY4N2YxYTY2ZjlmY2M5NWI5YWQ5OTVmYiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.yYE6qWd02l2Nf5SqVStFZwAoyImCY2tw9d3MU_3smrw", p = U("src_lib_movieServerFn_ts--getMovies_createServerFn_handler", "/_serverFn", (e, t) => _.__executeServer(e, t)), w = U("src_lib_movieServerFn_ts--getMovieById_createServerFn_handler", "/_serverFn", (e, t) => g.__executeServer(e, t)), u = U("src_lib_movieServerFn_ts--streamComments_createServerFn_handler", "/_serverFn", (e, t) => y.__executeServer(e, t)), _ = E({ method: "GET" }).handler(p, async () => {
  try {
    const e = await fetch(`${l}/popular`, { headers: { accept: "application/json", Authorization: `Bearer ${d}` } });
    if (!e.ok) throw new Error(`Failed to fetch movies: ${e.statusText}`);
    return { movies: await e.json() };
  } catch (e) {
    const t = e instanceof Error ? e.message : "Unknown error occurred";
    throw new Error(`Movies fetch failed: ${t}`);
  }
}), g = E({ method: "GET" }).handler(w, async ({ data: e }) => {
  console.log({ data: e });
  const t = e;
  try {
    const r = await fetch(`${l}/${t}?language=en-US`, { headers: { accept: "application/json", Authorization: `Bearer ${d}` } });
    if (console.log({ response: r }), !r.ok) throw new Error(`Failed to fetch movie: ${r.statusText}`);
    const o = await r.json();
    return console.log({ video: o }), { video: o };
  } catch (r) {
    const o = r instanceof Error ? r.message : "Unknown error occurred";
    throw new Error(`Movie fetch failed: ${o}`);
  }
}), y = E({ method: "GET", response: "raw" }).handler(u, async ({ signal: e, data: t }) => {
  const r = t, o = new ReadableStream({ async start(n) {
    const c = new TextEncoder(), h = [{ id: "1", author: "Sarah Johnson", content: "Amazing cinematography! The visuals were absolutely stunning.", timestamp: new Date(Date.now() - 1e3 * 60 * 30), likes: 15, replies: [{ id: "1-1", author: "Mike Chen", content: "Totally agree! The color grading was perfect.", timestamp: new Date(Date.now() - 1e3 * 60 * 15), likes: 3 }] }, { id: "2", author: "Alex Rodriguez", content: "The soundtrack really elevated the emotional moments. Brilliant film!", timestamp: new Date(Date.now() - 1e3 * 60 * 60 * 2), likes: 8 }, { id: "3", author: "Emma Wilson", content: "Character development was top-notch. Every actor delivered outstanding performances.", timestamp: new Date(Date.now() - 1e3 * 60 * 60 * 24), likes: 22 }];
    n.enqueue(c.encode(`data: ${JSON.stringify({ type: "initial", comments: h })}

`));
    let a = 4;
    const m = setInterval(() => {
      if (e.aborted) {
        clearInterval(m), n.close();
        return;
      }
      const v = { id: a.toString(), author: `User ${a}`, content: `This is a new comment #${a} about movie ${r}`, timestamp: /* @__PURE__ */ new Date(), likes: Math.floor(Math.random() * 10) };
      n.enqueue(c.encode(`data: ${JSON.stringify({ type: "new", comment: v })}

`)), a++;
    }, 1e4);
    e.addEventListener("abort", () => {
      clearInterval(m), n.close();
    });
  } });
  return new Response(o, { headers: { "Content-Type": "text/event-stream", "Cache-Control": "no-cache", Connection: "keep-alive", "Access-Control-Allow-Origin": "*", "Access-Control-Allow-Headers": "Cache-Control" } });
});

export { w as getMovieById_createServerFn_handler, p as getMovies_createServerFn_handler, u as streamComments_createServerFn_handler };
//# sourceMappingURL=movieServerFn-Dk82OnR8.mjs.map
