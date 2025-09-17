import { jsx, jsxs } from 'react/jsx-runtime';
import { c } from 'react/compiler-runtime';
import { useEffect, useRef, useState } from 'react';
import { R as _t, u as dt } from './ssr.mjs';
import { ChevronRight, ChevronLeft, Play, Star } from 'lucide-react';
import { B, p } from './badge-BSMVLglI.mjs';
import { useNavigate, useRouter } from '@tanstack/react-router';
import 'zustand';
import 'zustand/middleware';
import 'tiny-invariant';
import '@tanstack/router-core';
import '@tanstack/router-core/ssr/client';
import 'node:async_hooks';
import '@tanstack/history';
import '@tanstack/router-core/ssr/server';
import '@tanstack/react-router/ssr/server';
import '@radix-ui/react-slot';
import 'class-variance-authority';
import 'clsx';
import 'tailwind-merge';

const P = "_hero_kfws6_2", W = "_overlay_kfws6_13", U = "_content_kfws6_28", F = "_textContent_kfws6_40", G = "_title_kfws6_44", K = "_subtitle_kfws6_52", V = "_ctaButton_kfws6_60", Y = "_chevronIcon_kfws6_94", k = { hero: P, overlay: W, content: U, textContent: F, title: G, subtitle: K, ctaButton: V, chevronIcon: Y }, q = () => {
  const o = c(4);
  let e;
  o[0] === Symbol.for("react.memo_cache_sentinel") ? (e = jsx("div", { className: k.overlay }), o[0] = e) : e = o[0];
  let t, l;
  o[1] === Symbol.for("react.memo_cache_sentinel") ? (t = jsx("h1", { className: k.title, children: "Unlimited movies, TV shows, and more" }), l = jsx("p", { className: k.subtitle, children: "Starts at $7.99. Cancel anytime." }), o[1] = t, o[2] = l) : (t = o[1], l = o[2]);
  let r;
  return o[3] === Symbol.for("react.memo_cache_sentinel") ? (r = jsxs("section", { className: k.hero, children: [e, jsx("div", { className: k.content, children: jsxs("div", { className: k.textContent, children: [t, l, jsxs("button", { className: k.ctaButton, children: ["Restart Your Membership", jsx(ChevronRight, { size: 20, className: k.chevronIcon })] })] }) })] }), o[3] = r) : r = o[3], r;
};
function J(o) {
  const e = c(8);
  let t, l;
  e[0] !== o ? ({ className: t, ...l } = o, e[0] = o, e[1] = t, e[2] = l) : (t = e[1], l = e[2]);
  let r;
  e[3] !== t ? (r = p("bg-card text-card-foreground flex flex-col gap-6 rounded-xl border py-6 shadow-sm", t), e[3] = t, e[4] = r) : r = e[4];
  let n;
  return e[5] !== l || e[6] !== r ? (n = jsx("div", { "data-slot": "card", className: r, ...l }), e[5] = l, e[6] = r, e[7] = n) : n = e[7], n;
}
const O = "https://image.tmdb.org/t/p/w500/", Q = (o) => {
  const e = c(26), { movie: t, onMovieClick: l } = o, [r, n] = useState(false), c$1 = useRouter();
  let f;
  e[0] !== t.id || e[1] !== c$1 ? (f = () => {
    n(true), setTimeout(() => {
      c$1.preloadRoute({ to: "/movie/$id", params: { id: t.id.toString() } });
    }, 200);
  }, e[0] = t.id, e[1] = c$1, e[2] = f) : f = e[2];
  const m = f;
  let b;
  e[3] === Symbol.for("react.memo_cache_sentinel") ? (b = () => n(false), e[3] = b) : b = e[3];
  let u, h;
  e[4] !== t || e[5] !== l ? (u = () => l(t), h = (C) => {
    (C.key === "Enter" || C.key === " ") && l(t);
  }, e[4] = t, e[5] = l, e[6] = u, e[7] = h) : (u = e[6], h = e[7]);
  const y = t != null && t.poster_path ? O + (t == null ? void 0 : t.poster_path) : "/placeholder.svg", N = t == null ? void 0 : t.title;
  let d;
  e[8] !== y || e[9] !== N ? (d = jsx("img", { src: y, alt: N, className: "w-full h-full object-cover transition-transform duration-300 group-hover:scale-110 z-10" }), e[8] = y, e[9] = N, e[10] = d) : d = e[10];
  const v = `absolute inset-0 bg-black/60 flex items-center justify-center transition-opacity duration-300 ${r ? "opacity-100" : "opacity-0"}`;
  let _;
  e[11] === Symbol.for("react.memo_cache_sentinel") ? (_ = jsxs("div", { className: "text-center text-white p-4", children: [jsx(Play, { className: "w-12 h-12 mx-auto mb-2 text-primary" }), jsx("p", { className: "text-sm font-medium", children: "Watch Now" })] }), e[11] = _) : _ = e[11];
  let p;
  e[12] !== v ? (p = jsx("div", { className: v, children: _ }), e[12] = v, e[13] = p) : p = e[13];
  let x;
  e[14] === Symbol.for("react.memo_cache_sentinel") ? (x = jsx(Star, { className: "w-3 h-3 mr-1 fill-yellow-400 text-yellow-400" }), e[14] = x) : x = e[14];
  let i;
  e[15] !== t.vote_average ? (i = t.vote_average.toFixed(1), e[15] = t.vote_average, e[16] = i) : i = e[16];
  let a;
  e[17] !== i ? (a = jsx("div", { className: "absolute top-2 right-2", children: jsxs(B, { variant: "secondary", className: "bg-black/70 text-white border-none", children: [x, i] }) }), e[17] = i, e[18] = a) : a = e[18];
  let w;
  return e[19] !== m || e[20] !== p || e[21] !== a || e[22] !== u || e[23] !== h || e[24] !== d ? (w = jsxs(J, { className: "group relative overflow-hidden cursor-pointer transition-all duration-300 hover:scale-105 hover:shadow-xl outline-blue-200 bg-card p-0 border-0 md:min-w-[180px] w-[7rem]", role: "button", tabIndex: 0, onMouseEnter: m, onMouseLeave: b, onClick: u, onKeyDown: h, children: [d, p, a] }), e[19] = m, e[20] = p, e[21] = a, e[22] = u, e[23] = h, e[24] = d, e[25] = w) : w = e[25], w;
}, X = (o) => {
  const e = c(20), { movies: t } = o, l = useRef(null), r = useNavigate(), n = useRouter();
  let c$1;
  e[0] === Symbol.for("react.memo_cache_sentinel") ? (c$1 = (i) => {
    const a = l.current;
    if (a) {
      const w = i === "left" ? -a.clientWidth : a.clientWidth;
      a.scrollBy({ left: w, behavior: "smooth" });
    }
  }, e[0] = c$1) : c$1 = e[0];
  const f = c$1;
  let m;
  e[1] !== r ? (m = (i) => {
    r({ to: `/movie/${i.id}` });
  }, e[1] = r, e[2] = m) : m = e[2];
  const b = m;
  let u;
  e[3] !== n ? (u = (i) => {
    n.preloadRoute({ to: "/movie/$id", params: { id: i.id.toString() } });
  }, e[3] = n, e[4] = u) : u = e[4];
  const h = u;
  let y;
  e[5] === Symbol.for("react.memo_cache_sentinel") ? (y = () => f("left"), e[5] = y) : y = e[5];
  let N;
  e[6] === Symbol.for("react.memo_cache_sentinel") ? (N = jsx("button", { onClick: y, className: "left-0 top-0 bottom-0 bg-black/50 dark:bg-black/50 hover:bg-black/80 dark:hover:bg-black/80 text-white opacity-100 transition-all duration-300 flex items-center justify-center z-50 mr-2 p-0", children: jsx(ChevronLeft, { size: 24 }) }), e[6] = N) : N = e[6];
  let d;
  if (e[7] !== b || e[8] !== h || e[9] !== t) {
    let i;
    e[11] !== b || e[12] !== h ? (i = (a) => jsx("li", { onMouseEnter: () => h(a), children: jsx(Q, { movie: a, onMovieClick: b }) }, a.id), e[11] = b, e[12] = h, e[13] = i) : i = e[13], d = t.map(i), e[7] = b, e[8] = h, e[9] = t, e[10] = d;
  } else d = e[10];
  let v;
  e[14] !== d ? (v = jsx("ul", { ref: l, className: "flex overflow-x-auto overflow-y-visible space-x-4 px-4 md:px-6 py-4 scrollbar-hide relative", children: d }), e[14] = d, e[15] = v) : v = e[15];
  let _;
  e[16] === Symbol.for("react.memo_cache_sentinel") ? (_ = () => f("right"), e[16] = _) : _ = e[16];
  let p;
  e[17] === Symbol.for("react.memo_cache_sentinel") ? (p = jsx("button", { onClick: _, className: "right-0 top-0 bottom-0 bg-black/50 dark:bg-black/50 hover:bg-black/80 dark:hover:bg-black/80 text-white opacity-100 transition-all duration-300 flex items-center justify-center z-50 ml-2 p-0", children: jsx(ChevronRight, { size: 24 }) }), e[17] = p) : p = e[17];
  let x;
  return e[18] !== v ? (x = jsxs("div", { className: "relative group flex", children: [N, v, p] }), e[18] = v, e[19] = x) : x = e[19], x;
}, Z = (o) => {
  const e = c(7), { movies: t } = o, { initializeTheme: l } = dt();
  let r, n;
  e[0] !== l ? (r = () => {
    l();
  }, n = [l], e[0] = l, e[1] = r, e[2] = n) : (r = e[1], n = e[2]), useEffect(r, n);
  let c$1;
  e[3] === Symbol.for("react.memo_cache_sentinel") ? (c$1 = jsx(q, {}), e[3] = c$1) : c$1 = e[3];
  let f;
  e[4] === Symbol.for("react.memo_cache_sentinel") ? (f = jsx("h2", { className: "text-xl md:text-2xl font-semibold px-4 md:px-6 mb-4 pt-8", children: "Trending Now" }), e[4] = f) : f = e[4];
  let m;
  return e[5] !== t ? (m = jsxs("div", { className: "min-h-screen bg-background text-foreground transition-colors duration-300", children: [c$1, jsx("main", { children: jsxs("div", { className: "container mx-auto", children: [f, t.length > 0 ? jsx(X, { movies: t }) : jsx("div", { className: "px-4 md:px-6", children: jsx("p", { className: "text-gray-500", children: "No movies available at the moment." }) })] }) })] }), e[5] = t, e[6] = m) : m = e[6], m;
};
function ye() {
  const o = c(4), { movies: e } = _t.useLoaderData();
  let t;
  o[0] !== e.results ? (t = e.results || [], o[0] = e.results, o[1] = t) : t = o[1];
  let l;
  return o[2] !== t ? (l = jsx(Z, { movies: t }), o[2] = t, o[3] = l) : l = o[3], l;
}

export { ye as component };
//# sourceMappingURL=index-Dzu_x_uv.mjs.map
