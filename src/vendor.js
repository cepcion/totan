function e(e, t) {
  const n = Object.create(null),
    r = e.split(",");
  for (let o = 0; o < r.length; o++) n[r[o]] = !0;
  return t ? (e) => !!n[e.toLowerCase()] : (e) => !!n[e];
}
const t = e(
    "Infinity,undefined,NaN,isFinite,isNaN,parseFloat,parseInt,decodeURI,decodeURIComponent,encodeURI,encodeURIComponent,Math,Number,Date,Array,Object,Boolean,String,RegExp,Map,Set,JSON,Intl,BigInt"
  ),
  n = e(
    "itemscope,allowfullscreen,formnovalidate,ismap,nomodule,novalidate,readonly"
  );
function r(e) {
  if (S(e)) {
    const t = {};
    for (let n = 0; n < e.length; n++) {
      const o = e[n],
        i = r(k(o) ? l(o) : o);
      if (i) for (const e in i) t[e] = i[e];
    }
    return t;
  }
  if (R(e)) return e;
}
const o = /;(?![^(]*\))/g,
  i = /:(.+)/;
function l(e) {
  const t = {};
  return (
    e.split(o).forEach((e) => {
      if (e) {
        const n = e.split(i);
        n.length > 1 && (t[n[0].trim()] = n[1].trim());
      }
    }),
    t
  );
}
function s(e) {
  let t = "";
  if (k(e)) t = e;
  else if (S(e))
    for (let n = 0; n < e.length; n++) {
      const r = s(e[n]);
      r && (t += r + " ");
    }
  else if (R(e)) for (const n in e) e[n] && (t += n + " ");
  return t.trim();
}
function a(e, t) {
  if (e === t) return !0;
  let n = A(e),
    r = A(t);
  if (n || r) return !(!n || !r) && e.getTime() === t.getTime();
  if (((n = S(e)), (r = S(t)), n || r))
    return (
      !(!n || !r) &&
      (function (e, t) {
        if (e.length !== t.length) return !1;
        let n = !0;
        for (let r = 0; n && r < e.length; r++) n = a(e[r], t[r]);
        return n;
      })(e, t)
    );
  if (((n = R(e)), (r = R(t)), n || r)) {
    if (!n || !r) return !1;
    if (Object.keys(e).length !== Object.keys(t).length) return !1;
    for (const n in e) {
      const r = e.hasOwnProperty(n),
        o = t.hasOwnProperty(n);
      if ((r && !o) || (!r && o) || !a(e[n], t[n])) return !1;
    }
  }
  return String(e) === String(t);
}
function u(e, t) {
  return e.findIndex((e) => a(e, t));
}
const c = (e) => (null == e ? "" : R(e) ? JSON.stringify(e, f, 2) : String(e)),
  f = (e, t) =>
    E(t)
      ? {
          [`Map(${t.size})`]: [...t.entries()].reduce(
            (e, [t, n]) => ((e[`${t} =>`] = n), e),
            {}
          ),
        }
      : C(t)
      ? { [`Set(${t.size})`]: [...t.values()] }
      : !R(t) || S(t) || $(t)
      ? t
      : String(t),
  d = {},
  p = [],
  h = () => {},
  v = () => !1,
  m = /^on[^a-z]/,
  g = (e) => m.test(e),
  y = (e) => e.startsWith("onUpdate:"),
  b = Object.assign,
  w = (e, t) => {
    const n = e.indexOf(t);
    n > -1 && e.splice(n, 1);
  },
  x = Object.prototype.hasOwnProperty,
  _ = (e, t) => x.call(e, t),
  S = Array.isArray,
  E = (e) => "[object Map]" === T(e),
  C = (e) => "[object Set]" === T(e),
  A = (e) => e instanceof Date,
  O = (e) => "function" == typeof e,
  k = (e) => "string" == typeof e,
  P = (e) => "symbol" == typeof e,
  R = (e) => null !== e && "object" == typeof e,
  F = (e) => R(e) && O(e.then) && O(e.catch),
  j = Object.prototype.toString,
  T = (e) => j.call(e),
  $ = (e) => "[object Object]" === T(e),
  M = (e) => k(e) && "NaN" !== e && "-" !== e[0] && "" + parseInt(e, 10) === e,
  L = e(
    ",key,ref,onVnodeBeforeMount,onVnodeMounted,onVnodeBeforeUpdate,onVnodeUpdated,onVnodeBeforeUnmount,onVnodeUnmounted"
  ),
  V = (e) => {
    const t = Object.create(null);
    return (n) => t[n] || (t[n] = e(n));
  },
  D = /-(\w)/g,
  I = V((e) => e.replace(D, (e, t) => (t ? t.toUpperCase() : ""))),
  N = /\B([A-Z])/g,
  U = V((e) => e.replace(N, "-$1").toLowerCase()),
  B = V((e) => e.charAt(0).toUpperCase() + e.slice(1)),
  z = V((e) => (e ? `on${B(e)}` : "")),
  H = (e, t) => e !== t && (e == e || t == t),
  q = (e, t) => {
    for (let n = 0; n < e.length; n++) e[n](t);
  },
  W = (e, t, n) => {
    Object.defineProperty(e, t, { configurable: !0, enumerable: !1, value: n });
  },
  G = (e) => {
    const t = parseFloat(e);
    return isNaN(t) ? e : t;
  },
  K = new WeakMap(),
  X = [];
let Y;
const J = Symbol(""),
  Q = Symbol("");
function Z(e, t = d) {
  (function (e) {
    return e && !0 === e._isEffect;
  })(e) && (e = e.raw);
  const n = (function (e, t) {
    const n = function () {
      if (!n.active) return e();
      if (!X.includes(n)) {
        ne(n);
        try {
          return oe.push(re), (re = !0), X.push(n), (Y = n), e();
        } finally {
          X.pop(), le(), (Y = X[X.length - 1]);
        }
      }
    };
    return (
      (n.id = te++),
      (n.allowRecurse = !!t.allowRecurse),
      (n._isEffect = !0),
      (n.active = !0),
      (n.raw = e),
      (n.deps = []),
      (n.options = t),
      n
    );
  })(e, t);
  return t.lazy || n(), n;
}
function ee(e) {
  e.active && (ne(e), e.options.onStop && e.options.onStop(), (e.active = !1));
}
let te = 0;
function ne(e) {
  const { deps: t } = e;
  if (t.length) {
    for (let n = 0; n < t.length; n++) t[n].delete(e);
    t.length = 0;
  }
}
let re = !0;
const oe = [];
function ie() {
  oe.push(re), (re = !1);
}
function le() {
  const e = oe.pop();
  re = void 0 === e || e;
}
function se(e, t, n) {
  if (!re || void 0 === Y) return;
  let r = K.get(e);
  r || K.set(e, (r = new Map()));
  let o = r.get(n);
  o || r.set(n, (o = new Set())), o.has(Y) || (o.add(Y), Y.deps.push(o));
}
function ae(e, t, n, r, o, i) {
  const l = K.get(e);
  if (!l) return;
  const s = new Set(),
    a = (e) => {
      e &&
        e.forEach((e) => {
          (e !== Y || e.allowRecurse) && s.add(e);
        });
    };
  if ("clear" === t) l.forEach(a);
  else if ("length" === n && S(e))
    l.forEach((e, t) => {
      ("length" === t || t >= r) && a(e);
    });
  else
    switch ((void 0 !== n && a(l.get(n)), t)) {
      case "add":
        S(e) ? M(n) && a(l.get("length")) : (a(l.get(J)), E(e) && a(l.get(Q)));
        break;
      case "delete":
        S(e) || (a(l.get(J)), E(e) && a(l.get(Q)));
        break;
      case "set":
        E(e) && a(l.get(J));
    }
  s.forEach((e) => {
    e.options.scheduler ? e.options.scheduler(e) : e();
  });
}
const ue = e("__proto__,__v_isRef,__isVue"),
  ce = new Set(
    Object.getOwnPropertyNames(Symbol)
      .map((e) => Symbol[e])
      .filter(P)
  ),
  fe = me(),
  de = me(!1, !0),
  pe = me(!0),
  he = ve();
function ve() {
  const e = {};
  return (
    ["includes", "indexOf", "lastIndexOf"].forEach((t) => {
      e[t] = function (...e) {
        const n = tt(this);
        for (let t = 0, o = this.length; t < o; t++) se(n, 0, t + "");
        const r = n[t](...e);
        return -1 === r || !1 === r ? n[t](...e.map(tt)) : r;
      };
    }),
    ["push", "pop", "shift", "unshift", "splice"].forEach((t) => {
      e[t] = function (...e) {
        ie();
        const n = tt(this)[t].apply(this, e);
        return le(), n;
      };
    }),
    e
  );
}
function me(e = !1, t = !1) {
  return function (n, r, o) {
    if ("__v_isReactive" === r) return !e;
    if ("__v_isReadonly" === r) return e;
    if ("__v_raw" === r && o === (e ? (t ? Ge : We) : t ? qe : He).get(n))
      return n;
    const i = S(n);
    if (!e && i && _(he, r)) return Reflect.get(he, r, o);
    const l = Reflect.get(n, r, o);
    if (P(r) ? ce.has(r) : ue(r)) return l;
    if ((e || se(n, 0, r), t)) return l;
    if (ot(l)) {
      return !i || !M(r) ? l.value : l;
    }
    return R(l) ? (e ? Ye(l) : Xe(l)) : l;
  };
}
function ge(e = !1) {
  return function (t, n, r, o) {
    let i = t[n];
    if (!e && ((r = tt(r)), (i = tt(i)), !S(t) && ot(i) && !ot(r)))
      return (i.value = r), !0;
    const l = S(t) && M(n) ? Number(n) < t.length : _(t, n),
      s = Reflect.set(t, n, r, o);
    return (
      t === tt(o) && (l ? H(r, i) && ae(t, "set", n, r) : ae(t, "add", n, r)), s
    );
  };
}
const ye = {
    get: fe,
    set: ge(),
    deleteProperty: function (e, t) {
      const n = _(e, t);
      e[t];
      const r = Reflect.deleteProperty(e, t);
      return r && n && ae(e, "delete", t, void 0), r;
    },
    has: function (e, t) {
      const n = Reflect.has(e, t);
      return (P(t) && ce.has(t)) || se(e, 0, t), n;
    },
    ownKeys: function (e) {
      return se(e, 0, S(e) ? "length" : J), Reflect.ownKeys(e);
    },
  },
  be = { get: pe, set: (e, t) => !0, deleteProperty: (e, t) => !0 },
  we = b({}, ye, { get: de, set: ge(!0) }),
  xe = (e) => (R(e) ? Xe(e) : e),
  _e = (e) => (R(e) ? Ye(e) : e),
  Se = (e) => e,
  Ee = (e) => Reflect.getPrototypeOf(e);
function Ce(e, t, n = !1, r = !1) {
  const o = tt((e = e.__v_raw)),
    i = tt(t);
  t !== i && !n && se(o, 0, t), !n && se(o, 0, i);
  const { has: l } = Ee(o),
    s = r ? Se : n ? _e : xe;
  return l.call(o, t)
    ? s(e.get(t))
    : l.call(o, i)
    ? s(e.get(i))
    : void (e !== o && e.get(t));
}
function Ae(e, t = !1) {
  const n = this.__v_raw,
    r = tt(n),
    o = tt(e);
  return (
    e !== o && !t && se(r, 0, e),
    !t && se(r, 0, o),
    e === o ? n.has(e) : n.has(e) || n.has(o)
  );
}
function Oe(e, t = !1) {
  return (e = e.__v_raw), !t && se(tt(e), 0, J), Reflect.get(e, "size", e);
}
function ke(e) {
  e = tt(e);
  const t = tt(this);
  return Ee(t).has.call(t, e) || (t.add(e), ae(t, "add", e, e)), this;
}
function Pe(e, t) {
  t = tt(t);
  const n = tt(this),
    { has: r, get: o } = Ee(n);
  let i = r.call(n, e);
  i || ((e = tt(e)), (i = r.call(n, e)));
  const l = o.call(n, e);
  return (
    n.set(e, t), i ? H(t, l) && ae(n, "set", e, t) : ae(n, "add", e, t), this
  );
}
function Re(e) {
  const t = tt(this),
    { has: n, get: r } = Ee(t);
  let o = n.call(t, e);
  o || ((e = tt(e)), (o = n.call(t, e))), r && r.call(t, e);
  const i = t.delete(e);
  return o && ae(t, "delete", e, void 0), i;
}
function Fe() {
  const e = tt(this),
    t = 0 !== e.size,
    n = e.clear();
  return t && ae(e, "clear", void 0, void 0), n;
}
function je(e, t) {
  return function (n, r) {
    const o = this,
      i = o.__v_raw,
      l = tt(i),
      s = t ? Se : e ? _e : xe;
    return !e && se(l, 0, J), i.forEach((e, t) => n.call(r, s(e), s(t), o));
  };
}
function Te(e, t, n) {
  return function (...r) {
    const o = this.__v_raw,
      i = tt(o),
      l = E(i),
      s = "entries" === e || (e === Symbol.iterator && l),
      a = "keys" === e && l,
      u = o[e](...r),
      c = n ? Se : t ? _e : xe;
    return (
      !t && se(i, 0, a ? Q : J),
      {
        next() {
          const { value: e, done: t } = u.next();
          return t
            ? { value: e, done: t }
            : { value: s ? [c(e[0]), c(e[1])] : c(e), done: t };
        },
        [Symbol.iterator]() {
          return this;
        },
      }
    );
  };
}
function $e(e) {
  return function (...t) {
    return "delete" !== e && this;
  };
}
function Me() {
  const e = {
      get(e) {
        return Ce(this, e);
      },
      get size() {
        return Oe(this);
      },
      has: Ae,
      add: ke,
      set: Pe,
      delete: Re,
      clear: Fe,
      forEach: je(!1, !1),
    },
    t = {
      get(e) {
        return Ce(this, e, !1, !0);
      },
      get size() {
        return Oe(this);
      },
      has: Ae,
      add: ke,
      set: Pe,
      delete: Re,
      clear: Fe,
      forEach: je(!1, !0),
    },
    n = {
      get(e) {
        return Ce(this, e, !0);
      },
      get size() {
        return Oe(this, !0);
      },
      has(e) {
        return Ae.call(this, e, !0);
      },
      add: $e("add"),
      set: $e("set"),
      delete: $e("delete"),
      clear: $e("clear"),
      forEach: je(!0, !1),
    },
    r = {
      get(e) {
        return Ce(this, e, !0, !0);
      },
      get size() {
        return Oe(this, !0);
      },
      has(e) {
        return Ae.call(this, e, !0);
      },
      add: $e("add"),
      set: $e("set"),
      delete: $e("delete"),
      clear: $e("clear"),
      forEach: je(!0, !0),
    };
  return (
    ["keys", "values", "entries", Symbol.iterator].forEach((o) => {
      (e[o] = Te(o, !1, !1)),
        (n[o] = Te(o, !0, !1)),
        (t[o] = Te(o, !1, !0)),
        (r[o] = Te(o, !0, !0));
    }),
    [e, n, t, r]
  );
}
const [Le, Ve, De, Ie] = Me();
function Ne(e, t) {
  const n = t ? (e ? Ie : De) : e ? Ve : Le;
  return (t, r, o) =>
    "__v_isReactive" === r
      ? !e
      : "__v_isReadonly" === r
      ? e
      : "__v_raw" === r
      ? t
      : Reflect.get(_(n, r) && r in t ? n : t, r, o);
}
const Ue = { get: Ne(!1, !1) },
  Be = { get: Ne(!1, !0) },
  ze = { get: Ne(!0, !1) },
  He = new WeakMap(),
  qe = new WeakMap(),
  We = new WeakMap(),
  Ge = new WeakMap();
function Ke(e) {
  return e.__v_skip || !Object.isExtensible(e)
    ? 0
    : (function (e) {
        switch (e) {
          case "Object":
          case "Array":
            return 1;
          case "Map":
          case "Set":
          case "WeakMap":
          case "WeakSet":
            return 2;
          default:
            return 0;
        }
      })(((e) => T(e).slice(8, -1))(e));
}
function Xe(e) {
  return e && e.__v_isReadonly ? e : Je(e, !1, ye, Ue, He);
}
function Ye(e) {
  return Je(e, !0, be, ze, We);
}
function Je(e, t, n, r, o) {
  if (!R(e)) return e;
  if (e.__v_raw && (!t || !e.__v_isReactive)) return e;
  const i = o.get(e);
  if (i) return i;
  const l = Ke(e);
  if (0 === l) return e;
  const s = new Proxy(e, 2 === l ? r : n);
  return o.set(e, s), s;
}
function Qe(e) {
  return Ze(e) ? Qe(e.__v_raw) : !(!e || !e.__v_isReactive);
}
function Ze(e) {
  return !(!e || !e.__v_isReadonly);
}
function et(e) {
  return Qe(e) || Ze(e);
}
function tt(e) {
  return (e && tt(e.__v_raw)) || e;
}
function nt(e) {
  return W(e, "__v_skip", !0), e;
}
const rt = (e) => (R(e) ? Xe(e) : e);
function ot(e) {
  return Boolean(e && !0 === e.__v_isRef);
}
function it(e) {
  return st(e);
}
class lt {
  constructor(e, t = !1) {
    (this._shallow = t),
      (this.__v_isRef = !0),
      (this._rawValue = t ? e : tt(e)),
      (this._value = t ? e : rt(e));
  }
  get value() {
    return se(tt(this), 0, "value"), this._value;
  }
  set value(e) {
    (e = this._shallow ? e : tt(e)),
      H(e, this._rawValue) &&
        ((this._rawValue = e),
        (this._value = this._shallow ? e : rt(e)),
        ae(tt(this), "set", "value", e));
  }
}
function st(e, t = !1) {
  return ot(e) ? e : new lt(e, t);
}
function at(e) {
  return ot(e) ? e.value : e;
}
const ut = {
  get: (e, t, n) => at(Reflect.get(e, t, n)),
  set: (e, t, n, r) => {
    const o = e[t];
    return ot(o) && !ot(n) ? ((o.value = n), !0) : Reflect.set(e, t, n, r);
  },
};
function ct(e) {
  return Qe(e) ? e : new Proxy(e, ut);
}
class ft {
  constructor(e, t, n) {
    (this._setter = t),
      (this._dirty = !0),
      (this.__v_isRef = !0),
      (this.effect = Z(e, {
        lazy: !0,
        scheduler: () => {
          this._dirty || ((this._dirty = !0), ae(tt(this), "set", "value"));
        },
      })),
      (this.__v_isReadonly = n);
  }
  get value() {
    const e = tt(this);
    return (
      e._dirty && ((e._value = this.effect()), (e._dirty = !1)),
      se(e, 0, "value"),
      e._value
    );
  }
  set value(e) {
    this._setter(e);
  }
}
function dt(e, t, n, r) {
  let o;
  try {
    o = r ? e(...r) : e();
  } catch (i) {
    ht(i, t, n);
  }
  return o;
}
function pt(e, t, n, r) {
  if (O(e)) {
    const o = dt(e, t, n, r);
    return (
      o &&
        F(o) &&
        o.catch((e) => {
          ht(e, t, n);
        }),
      o
    );
  }
  const o = [];
  for (let i = 0; i < e.length; i++) o.push(pt(e[i], t, n, r));
  return o;
}
function ht(e, t, n, r = !0) {
  t && t.vnode;
  if (t) {
    let r = t.parent;
    const o = t.proxy,
      i = n;
    for (; r; ) {
      const t = r.ec;
      if (t)
        for (let n = 0; n < t.length; n++) if (!1 === t[n](e, o, i)) return;
      r = r.parent;
    }
    const l = t.appContext.config.errorHandler;
    if (l) return void dt(l, null, 10, [e, o, i]);
  }
  !(function (e, t, n, r = !0) {
    console.error(e);
  })(e, 0, 0, r);
}
let vt = !1,
  mt = !1;
const gt = [];
let yt = 0;
const bt = [];
let wt = null,
  xt = 0;
const _t = [];
let St = null,
  Et = 0;
const Ct = Promise.resolve();
let At = null,
  Ot = null;
function kt(e) {
  const t = At || Ct;
  return e ? t.then(this ? e.bind(this) : e) : t;
}
function Pt(e) {
  if (
    !(
      (gt.length && gt.includes(e, vt && e.allowRecurse ? yt + 1 : yt)) ||
      e === Ot
    )
  ) {
    const t = (function (e) {
      let t = yt + 1,
        n = gt.length;
      const r = $t(e);
      for (; t < n; ) {
        const e = (t + n) >>> 1;
        $t(gt[e]) < r ? (t = e + 1) : (n = e);
      }
      return t;
    })(e);
    t > -1 ? gt.splice(t, 0, e) : gt.push(e), Rt();
  }
}
function Rt() {
  vt || mt || ((mt = !0), (At = Ct.then(Mt)));
}
function Ft(e, t, n, r) {
  S(e)
    ? n.push(...e)
    : (t && t.includes(e, e.allowRecurse ? r + 1 : r)) || n.push(e),
    Rt();
}
function jt(e, t = null) {
  if (bt.length) {
    for (
      Ot = t, wt = [...new Set(bt)], bt.length = 0, xt = 0;
      xt < wt.length;
      xt++
    )
      wt[xt]();
    (wt = null), (xt = 0), (Ot = null), jt(e, t);
  }
}
function Tt(e) {
  if (_t.length) {
    const e = [...new Set(_t)];
    if (((_t.length = 0), St)) return void St.push(...e);
    for (St = e, St.sort((e, t) => $t(e) - $t(t)), Et = 0; Et < St.length; Et++)
      St[Et]();
    (St = null), (Et = 0);
  }
}
const $t = (e) => (null == e.id ? 1 / 0 : e.id);
function Mt(e) {
  (mt = !1), (vt = !0), jt(e), gt.sort((e, t) => $t(e) - $t(t));
  try {
    for (yt = 0; yt < gt.length; yt++) {
      const e = gt[yt];
      e && !1 !== e.active && dt(e, null, 14);
    }
  } finally {
    (yt = 0),
      (gt.length = 0),
      Tt(),
      (vt = !1),
      (At = null),
      (gt.length || bt.length || _t.length) && Mt(e);
  }
}
function Lt(e, t, ...n) {
  const r = e.vnode.props || d;
  let o = n;
  const i = t.startsWith("update:"),
    l = i && t.slice(7);
  if (l && l in r) {
    const e = `${"modelValue" === l ? "model" : l}Modifiers`,
      { number: t, trim: i } = r[e] || d;
    i ? (o = n.map((e) => e.trim())) : t && (o = n.map(G));
  }
  let s,
    a = r[(s = z(t))] || r[(s = z(I(t)))];
  !a && i && (a = r[(s = z(U(t)))]), a && pt(a, e, 6, o);
  const u = r[s + "Once"];
  if (u) {
    if (e.emitted) {
      if (e.emitted[s]) return;
    } else e.emitted = {};
    (e.emitted[s] = !0), pt(u, e, 6, o);
  }
}
function Vt(e, t, n = !1) {
  const r = t.emitsCache,
    o = r.get(e);
  if (void 0 !== o) return o;
  const i = e.emits;
  let l = {},
    s = !1;
  if (!O(e)) {
    const r = (e) => {
      const n = Vt(e, t, !0);
      n && ((s = !0), b(l, n));
    };
    !n && t.mixins.length && t.mixins.forEach(r),
      e.extends && r(e.extends),
      e.mixins && e.mixins.forEach(r);
  }
  return i || s
    ? (S(i) ? i.forEach((e) => (l[e] = null)) : b(l, i), r.set(e, l), l)
    : (r.set(e, null), null);
}
function Dt(e, t) {
  return (
    !(!e || !g(t)) &&
    ((t = t.slice(2).replace(/Once$/, "")),
    _(e, t[0].toLowerCase() + t.slice(1)) || _(e, U(t)) || _(e, t))
  );
}
let It = null,
  Nt = null;
function Ut(e) {
  const t = It;
  return (It = e), (Nt = (e && e.type.__scopeId) || null), t;
}
function Bt(e) {
  Nt = e;
}
function zt() {
  Nt = null;
}
const Ht = (e) => qt;
function qt(e, t = It, n) {
  if (!t) return e;
  if (e._n) return e;
  const r = (...n) => {
    r._d && _r(-1);
    const o = Ut(t),
      i = e(...n);
    return Ut(o), r._d && _r(1), i;
  };
  return (r._n = !0), (r._c = !0), (r._d = !0), r;
}
function Wt(e) {
  const {
    type: t,
    vnode: n,
    proxy: r,
    withProxy: o,
    props: i,
    propsOptions: [l],
    slots: s,
    attrs: a,
    emit: u,
    render: c,
    renderCache: f,
    data: d,
    setupState: p,
    ctx: h,
    inheritAttrs: v,
  } = e;
  let m;
  const g = Ut(e);
  try {
    let e;
    if (4 & n.shapeFlag) {
      const t = o || r;
      (m = $r(c.call(t, t, f, i, p, d, h))), (e = a);
    } else {
      const n = t;
      0,
        (m = $r(
          n.length > 1 ? n(i, { attrs: a, slots: s, emit: u }) : n(i, null)
        )),
        (e = t.props ? a : Gt(a));
    }
    let g = m;
    if (e && !1 !== v) {
      const t = Object.keys(e),
        { shapeFlag: n } = g;
      t.length &&
        (1 & n || 6 & n) &&
        (l && t.some(y) && (e = Kt(e, l)), (g = Rr(g, e)));
    }
    0,
      n.dirs && (g.dirs = g.dirs ? g.dirs.concat(n.dirs) : n.dirs),
      n.transition && (g.transition = n.transition),
      (m = g);
  } catch (b) {
    (yr.length = 0), ht(b, e, 1), (m = Pr(mr));
  }
  return Ut(g), m;
}
const Gt = (e) => {
    let t;
    for (const n in e)
      ("class" === n || "style" === n || g(n)) && ((t || (t = {}))[n] = e[n]);
    return t;
  },
  Kt = (e, t) => {
    const n = {};
    for (const r in e) (y(r) && r.slice(9) in t) || (n[r] = e[r]);
    return n;
  };
function Xt(e, t, n) {
  const r = Object.keys(t);
  if (r.length !== Object.keys(e).length) return !0;
  for (let o = 0; o < r.length; o++) {
    const i = r[o];
    if (t[i] !== e[i] && !Dt(n, i)) return !0;
  }
  return !1;
}
function Yt(e, t) {
  if (Hr) {
    let n = Hr.provides;
    const r = Hr.parent && Hr.parent.provides;
    r === n && (n = Hr.provides = Object.create(r)), (n[e] = t);
  } else;
}
function Jt(e, t, n = !1) {
  const r = Hr || It;
  if (r) {
    const o =
      null == r.parent
        ? r.vnode.appContext && r.vnode.appContext.provides
        : r.parent.provides;
    if (o && e in o) return o[e];
    if (arguments.length > 1) return n && O(t) ? t.call(r.proxy) : t;
  }
}
function Qt(e, t) {
  return tn(e, null, t);
}
const Zt = {};
function en(e, t, n) {
  return tn(e, t, n);
}
function tn(
  e,
  t,
  { immediate: n, deep: r, flush: o, onTrack: i, onTrigger: l } = d,
  s = Hr
) {
  let a,
    u,
    c = !1,
    f = !1;
  if (
    (ot(e)
      ? ((a = () => e.value), (c = !!e._shallow))
      : Qe(e)
      ? ((a = () => e), (r = !0))
      : S(e)
      ? ((f = !0),
        (c = e.some(Qe)),
        (a = () =>
          e.map((e) =>
            ot(e) ? e.value : Qe(e) ? on(e) : O(e) ? dt(e, s, 2) : void 0
          )))
      : (a = O(e)
          ? t
            ? () => dt(e, s, 2)
            : () => {
                if (!s || !s.isUnmounted) return u && u(), pt(e, s, 3, [p]);
              }
          : h),
    t && r)
  ) {
    const e = a;
    a = () => on(e());
  }
  let p = (e) => {
      u = y.options.onStop = () => {
        dt(e, s, 4);
      };
    },
    v = f ? [] : Zt;
  const m = () => {
    if (y.active)
      if (t) {
        const e = y();
        (r || c || (f ? e.some((e, t) => H(e, v[t])) : H(e, v))) &&
          (u && u(), pt(t, s, 3, [e, v === Zt ? void 0 : v, p]), (v = e));
      } else y();
  };
  let g;
  (m.allowRecurse = !!t),
    (g =
      "sync" === o
        ? m
        : "post" === o
        ? () => tr(m, s && s.suspense)
        : () => {
            !s || s.isMounted
              ? (function (e) {
                  Ft(e, wt, bt, xt);
                })(m)
              : m();
          });
  const y = Z(a, { lazy: !0, onTrack: i, onTrigger: l, scheduler: g });
  return (
    Jr(y, s),
    t ? (n ? m() : (v = y())) : "post" === o ? tr(y, s && s.suspense) : y(),
    () => {
      ee(y), s && w(s.effects, y);
    }
  );
}
function nn(e, t, n) {
  const r = this.proxy,
    o = k(e) ? (e.includes(".") ? rn(r, e) : () => r[e]) : e.bind(r, r);
  let i;
  return O(t) ? (i = t) : ((i = t.handler), (n = t)), tn(o, i.bind(r), n, this);
}
function rn(e, t) {
  const n = t.split(".");
  return () => {
    let t = e;
    for (let e = 0; e < n.length && t; e++) t = t[n[e]];
    return t;
  };
}
function on(e, t = new Set()) {
  if (!R(e) || e.__v_skip) return e;
  if ((t = t || new Set()).has(e)) return e;
  if ((t.add(e), ot(e))) on(e.value, t);
  else if (S(e)) for (let n = 0; n < e.length; n++) on(e[n], t);
  else if (C(e) || E(e))
    e.forEach((e) => {
      on(e, t);
    });
  else if ($(e)) for (const n in e) on(e[n], t);
  return e;
}
function ln(e) {
  return O(e) ? { setup: e, name: e.name } : e;
}
const sn = (e) => !!e.type.__asyncLoader,
  an = (e) => e.type.__isKeepAlive;
function un(e, t) {
  fn(e, "a", t);
}
function cn(e, t) {
  fn(e, "da", t);
}
function fn(e, t, n = Hr) {
  const r =
    e.__wdc ||
    (e.__wdc = () => {
      let t = n;
      for (; t; ) {
        if (t.isDeactivated) return;
        t = t.parent;
      }
      e();
    });
  if ((pn(t, r, n), n)) {
    let e = n.parent;
    for (; e && e.parent; )
      an(e.parent.vnode) && dn(r, t, n, e), (e = e.parent);
  }
}
function dn(e, t, n, r) {
  const o = pn(t, e, r, !0);
  wn(() => {
    w(r[t], o);
  }, n);
}
function pn(e, t, n = Hr, r = !1) {
  if (n) {
    const o = n[e] || (n[e] = []),
      i =
        t.__weh ||
        (t.__weh = (...r) => {
          if (n.isUnmounted) return;
          ie(), qr(n);
          const o = pt(t, n, e, r);
          return qr(null), le(), o;
        });
    return r ? o.unshift(i) : o.push(i), i;
  }
}
const hn =
    (e) =>
    (t, n = Hr) =>
      (!Gr || "sp" === e) && pn(e, t, n),
  vn = hn("bm"),
  mn = hn("m"),
  gn = hn("bu"),
  yn = hn("u"),
  bn = hn("bum"),
  wn = hn("um"),
  xn = hn("sp"),
  _n = hn("rtg"),
  Sn = hn("rtc");
function En(e, t = Hr) {
  pn("ec", e, t);
}
let Cn = !0;
function An(e) {
  const t = Pn(e),
    n = e.proxy,
    r = e.ctx;
  (Cn = !1), t.beforeCreate && On(t.beforeCreate, e, "bc");
  const {
    data: o,
    computed: i,
    methods: l,
    watch: s,
    provide: a,
    inject: u,
    created: c,
    beforeMount: f,
    mounted: d,
    beforeUpdate: p,
    updated: v,
    activated: m,
    deactivated: g,
    beforeDestroy: y,
    beforeUnmount: b,
    destroyed: w,
    unmounted: x,
    render: _,
    renderTracked: E,
    renderTriggered: C,
    errorCaptured: A,
    serverPrefetch: k,
    expose: P,
    inheritAttrs: F,
    components: j,
    directives: T,
    filters: $,
  } = t;
  if (
    (u &&
      (function (e, t, n = h) {
        S(e) && (e = Tn(e));
        for (const r in e) {
          const n = e[r];
          R(n)
            ? (t[r] =
                "default" in n
                  ? Jt(n.from || r, n.default, !0)
                  : Jt(n.from || r))
            : (t[r] = Jt(n));
        }
      })(u, r, null),
    l)
  )
    for (const h in l) {
      const e = l[h];
      O(e) && (r[h] = e.bind(n));
    }
  if (o) {
    const t = o.call(n, n);
    R(t) && (e.data = Xe(t));
  }
  if (((Cn = !0), i))
    for (const S in i) {
      const e = i[S],
        t = Zr({
          get: O(e) ? e.bind(n, n) : O(e.get) ? e.get.bind(n, n) : h,
          set: !O(e) && O(e.set) ? e.set.bind(n) : h,
        });
      Object.defineProperty(r, S, {
        enumerable: !0,
        configurable: !0,
        get: () => t.value,
        set: (e) => (t.value = e),
      });
    }
  if (s) for (const h in s) kn(s[h], r, n, h);
  if (a) {
    const e = O(a) ? a.call(n) : a;
    Reflect.ownKeys(e).forEach((t) => {
      Yt(t, e[t]);
    });
  }
  function M(e, t) {
    S(t) ? t.forEach((t) => e(t.bind(n))) : t && e(t.bind(n));
  }
  if (
    (c && On(c, e, "c"),
    M(vn, f),
    M(mn, d),
    M(gn, p),
    M(yn, v),
    M(un, m),
    M(cn, g),
    M(En, A),
    M(Sn, E),
    M(_n, C),
    M(bn, b),
    M(wn, x),
    M(xn, k),
    S(P))
  )
    if (P.length) {
      const t = e.exposed || (e.exposed = {});
      P.forEach((e) => {
        Object.defineProperty(t, e, {
          get: () => n[e],
          set: (t) => (n[e] = t),
        });
      });
    } else e.exposed || (e.exposed = {});
  _ && e.render === h && (e.render = _),
    null != F && (e.inheritAttrs = F),
    j && (e.components = j),
    T && (e.directives = T);
}
function On(e, t, n) {
  pt(S(e) ? e.map((e) => e.bind(t.proxy)) : e.bind(t.proxy), t, n);
}
function kn(e, t, n, r) {
  const o = r.includes(".") ? rn(n, r) : () => n[r];
  if (k(e)) {
    const n = t[e];
    O(n) && en(o, n);
  } else if (O(e)) en(o, e.bind(n));
  else if (R(e))
    if (S(e)) e.forEach((e) => kn(e, t, n, r));
    else {
      const r = O(e.handler) ? e.handler.bind(n) : t[e.handler];
      O(r) && en(o, r, e);
    }
}
function Pn(e) {
  const t = e.type,
    { mixins: n, extends: r } = t,
    {
      mixins: o,
      optionsCache: i,
      config: { optionMergeStrategies: l },
    } = e.appContext,
    s = i.get(t);
  let a;
  return (
    s
      ? (a = s)
      : o.length || n || r
      ? ((a = {}), o.length && o.forEach((e) => Rn(a, e, l, !0)), Rn(a, t, l))
      : (a = t),
    i.set(t, a),
    a
  );
}
function Rn(e, t, n, r = !1) {
  const { mixins: o, extends: i } = t;
  i && Rn(e, i, n, !0), o && o.forEach((t) => Rn(e, t, n, !0));
  for (const l in t)
    if (r && "expose" === l);
    else {
      const r = Fn[l] || (n && n[l]);
      e[l] = r ? r(e[l], t[l]) : t[l];
    }
  return e;
}
const Fn = {
  data: jn,
  props: Mn,
  emits: Mn,
  methods: Mn,
  computed: Mn,
  beforeCreate: $n,
  created: $n,
  beforeMount: $n,
  mounted: $n,
  beforeUpdate: $n,
  updated: $n,
  beforeDestroy: $n,
  destroyed: $n,
  activated: $n,
  deactivated: $n,
  errorCaptured: $n,
  serverPrefetch: $n,
  components: Mn,
  directives: Mn,
  watch: function (e, t) {
    if (!e) return t;
    if (!t) return e;
    const n = b(Object.create(null), e);
    for (const r in t) n[r] = $n(e[r], t[r]);
    return n;
  },
  provide: jn,
  inject: function (e, t) {
    return Mn(Tn(e), Tn(t));
  },
};
function jn(e, t) {
  return t
    ? e
      ? function () {
          return b(
            O(e) ? e.call(this, this) : e,
            O(t) ? t.call(this, this) : t
          );
        }
      : t
    : e;
}
function Tn(e) {
  if (S(e)) {
    const t = {};
    for (let n = 0; n < e.length; n++) t[e[n]] = e[n];
    return t;
  }
  return e;
}
function $n(e, t) {
  return e ? [...new Set([].concat(e, t))] : t;
}
function Mn(e, t) {
  return e ? b(b(Object.create(null), e), t) : t;
}
function Ln(e, t, n, r = !1) {
  const o = {},
    i = {};
  W(i, Ar, 1), (e.propsDefaults = Object.create(null)), Vn(e, t, o, i);
  for (const l in e.propsOptions[0]) l in o || (o[l] = void 0);
  n
    ? (e.props = r ? o : Je(o, !1, we, Be, qe))
    : e.type.props
    ? (e.props = o)
    : (e.props = i),
    (e.attrs = i);
}
function Vn(e, t, n, r) {
  const [o, i] = e.propsOptions;
  let l,
    s = !1;
  if (t)
    for (let a in t) {
      if (L(a)) continue;
      const u = t[a];
      let c;
      o && _(o, (c = I(a)))
        ? i && i.includes(c)
          ? ((l || (l = {}))[c] = u)
          : (n[c] = u)
        : Dt(e.emitsOptions, a) || (u !== r[a] && ((r[a] = u), (s = !0)));
    }
  if (i) {
    const t = tt(n),
      r = l || d;
    for (let l = 0; l < i.length; l++) {
      const s = i[l];
      n[s] = Dn(o, t, s, r[s], e, !_(r, s));
    }
  }
  return s;
}
function Dn(e, t, n, r, o, i) {
  const l = e[n];
  if (null != l) {
    const e = _(l, "default");
    if (e && void 0 === r) {
      const e = l.default;
      if (l.type !== Function && O(e)) {
        const { propsDefaults: i } = o;
        n in i ? (r = i[n]) : (qr(o), (r = i[n] = e.call(null, t)), qr(null));
      } else r = e;
    }
    l[0] &&
      (i && !e ? (r = !1) : !l[1] || ("" !== r && r !== U(n)) || (r = !0));
  }
  return r;
}
function In(e, t, n = !1) {
  const r = t.propsCache,
    o = r.get(e);
  if (o) return o;
  const i = e.props,
    l = {},
    s = [];
  let a = !1;
  if (!O(e)) {
    const r = (e) => {
      a = !0;
      const [n, r] = In(e, t, !0);
      b(l, n), r && s.push(...r);
    };
    !n && t.mixins.length && t.mixins.forEach(r),
      e.extends && r(e.extends),
      e.mixins && e.mixins.forEach(r);
  }
  if (!i && !a) return r.set(e, p), p;
  if (S(i))
    for (let c = 0; c < i.length; c++) {
      const e = I(i[c]);
      Nn(e) && (l[e] = d);
    }
  else if (i)
    for (const c in i) {
      const e = I(c);
      if (Nn(e)) {
        const t = i[c],
          n = (l[e] = S(t) || O(t) ? { type: t } : t);
        if (n) {
          const t = zn(Boolean, n.type),
            r = zn(String, n.type);
          (n[0] = t > -1),
            (n[1] = r < 0 || t < r),
            (t > -1 || _(n, "default")) && s.push(e);
        }
      }
    }
  const u = [l, s];
  return r.set(e, u), u;
}
function Nn(e) {
  return "$" !== e[0];
}
function Un(e) {
  const t = e && e.toString().match(/^\s*function (\w+)/);
  return t ? t[1] : "";
}
function Bn(e, t) {
  return Un(e) === Un(t);
}
function zn(e, t) {
  return S(t) ? t.findIndex((t) => Bn(t, e)) : O(t) && Bn(t, e) ? 0 : -1;
}
const Hn = (e) => "_" === e[0] || "$stable" === e,
  qn = (e) => (S(e) ? e.map($r) : [$r(e)]),
  Wn = (e, t, n) => {
    const r = qt((e) => qn(t(e)), n);
    return (r._c = !1), r;
  },
  Gn = (e, t, n) => {
    const r = e._ctx;
    for (const o in e) {
      if (Hn(o)) continue;
      const n = e[o];
      if (O(n)) t[o] = Wn(0, n, r);
      else if (null != n) {
        const e = qn(n);
        t[o] = () => e;
      }
    }
  },
  Kn = (e, t) => {
    const n = qn(t);
    e.slots.default = () => n;
  };
function Xn(e, t) {
  if (null === It) return e;
  const n = It.proxy,
    r = e.dirs || (e.dirs = []);
  for (let o = 0; o < t.length; o++) {
    let [e, i, l, s = d] = t[o];
    O(e) && (e = { mounted: e, updated: e }),
      e.deep && on(i),
      r.push({
        dir: e,
        instance: n,
        value: i,
        oldValue: void 0,
        arg: l,
        modifiers: s,
      });
  }
  return e;
}
function Yn(e, t, n, r) {
  const o = e.dirs,
    i = t && t.dirs;
  for (let l = 0; l < o.length; l++) {
    const s = o[l];
    i && (s.oldValue = i[l].value);
    let a = s.dir[r];
    a && (ie(), pt(a, n, 8, [e.el, s, e, t]), le());
  }
}
function Jn() {
  return {
    app: null,
    config: {
      isNativeTag: v,
      performance: !1,
      globalProperties: {},
      optionMergeStrategies: {},
      errorHandler: void 0,
      warnHandler: void 0,
      compilerOptions: {},
    },
    mixins: [],
    components: {},
    directives: {},
    provides: Object.create(null),
    optionsCache: new WeakMap(),
    propsCache: new WeakMap(),
    emitsCache: new WeakMap(),
  };
}
let Qn = 0;
function Zn(e, t) {
  return function (n, r = null) {
    null == r || R(r) || (r = null);
    const o = Jn(),
      i = new Set();
    let l = !1;
    const s = (o.app = {
      _uid: Qn++,
      _component: n,
      _props: r,
      _container: null,
      _context: o,
      _instance: null,
      version: to,
      get config() {
        return o.config;
      },
      set config(e) {},
      use: (e, ...t) => (
        i.has(e) ||
          (e && O(e.install)
            ? (i.add(e), e.install(s, ...t))
            : O(e) && (i.add(e), e(s, ...t))),
        s
      ),
      mixin: (e) => (o.mixins.includes(e) || o.mixins.push(e), s),
      component: (e, t) => (t ? ((o.components[e] = t), s) : o.components[e]),
      directive: (e, t) => (t ? ((o.directives[e] = t), s) : o.directives[e]),
      mount(i, a, u) {
        if (!l) {
          const c = Pr(n, r);
          return (
            (c.appContext = o),
            a && t ? t(c, i) : e(c, i, u),
            (l = !0),
            (s._container = i),
            (i.__vue_app__ = s),
            c.component.proxy
          );
        }
      },
      unmount() {
        l && (e(null, s._container), delete s._container.__vue_app__);
      },
      provide: (e, t) => ((o.provides[e] = t), s),
    });
    return s;
  };
}
const er = { scheduler: Pt, allowRecurse: !0 },
  tr = function (e, t) {
    t && t.pendingBranch
      ? S(e)
        ? t.effects.push(...e)
        : t.effects.push(e)
      : Ft(e, St, _t, Et);
  },
  nr = (e, t, n, r, o = !1) => {
    if (S(e))
      return void e.forEach((e, i) => nr(e, t && (S(t) ? t[i] : t), n, r, o));
    if (sn(r) && !o) return;
    const i = 4 & r.shapeFlag ? Yr(r.component) || r.component.proxy : r.el,
      l = o ? null : i,
      { i: s, r: a } = e,
      u = t && t.r,
      c = s.refs === d ? (s.refs = {}) : s.refs,
      f = s.setupState;
    if (
      (null != u &&
        u !== a &&
        (k(u)
          ? ((c[u] = null), _(f, u) && (f[u] = null))
          : ot(u) && (u.value = null)),
      k(a))
    ) {
      const e = () => {
        (c[a] = l), _(f, a) && (f[a] = l);
      };
      l ? ((e.id = -1), tr(e, n)) : e();
    } else if (ot(a)) {
      const e = () => {
        a.value = l;
      };
      l ? ((e.id = -1), tr(e, n)) : e();
    } else O(a) && dt(a, s, 12, [l, c]);
  };
function rr(e) {
  return (function (e, t) {
    const {
        insert: n,
        remove: r,
        patchProp: o,
        forcePatchProp: i,
        createElement: l,
        createText: s,
        createComment: a,
        setText: u,
        setElementText: c,
        parentNode: f,
        nextSibling: v,
        setScopeId: m = h,
        cloneNode: g,
        insertStaticContent: y,
      } = e,
      w = (
        e,
        t,
        n,
        r = null,
        o = null,
        i = null,
        l = !1,
        s = null,
        a = !!t.dynamicChildren
      ) => {
        e && !Cr(e, t) && ((r = re(e)), Y(e, o, i, !0), (e = null)),
          -2 === t.patchFlag && ((a = !1), (t.dynamicChildren = null));
        const { type: u, ref: c, shapeFlag: f } = t;
        switch (u) {
          case vr:
            x(e, t, n, r);
            break;
          case mr:
            S(e, t, n, r);
            break;
          case gr:
            null == e && E(t, n, r, l);
            break;
          case hr:
            M(e, t, n, r, o, i, l, s, a);
            break;
          default:
            1 & f
              ? O(e, t, n, r, o, i, l, s, a)
              : 6 & f
              ? V(e, t, n, r, o, i, l, s, a)
              : (64 & f || 128 & f) && u.process(e, t, n, r, o, i, l, s, a, se);
        }
        null != c && o && nr(c, e && e.ref, i, t || e, !t);
      },
      x = (e, t, r, o) => {
        if (null == e) n((t.el = s(t.children)), r, o);
        else {
          const n = (t.el = e.el);
          t.children !== e.children && u(n, t.children);
        }
      },
      S = (e, t, r, o) => {
        null == e ? n((t.el = a(t.children || "")), r, o) : (t.el = e.el);
      },
      E = (e, t, n, r) => {
        [e.el, e.anchor] = y(e.children, t, n, r);
      },
      C = ({ el: e, anchor: t }, r, o) => {
        let i;
        for (; e && e !== t; ) (i = v(e)), n(e, r, o), (e = i);
        n(t, r, o);
      },
      A = ({ el: e, anchor: t }) => {
        let n;
        for (; e && e !== t; ) (n = v(e)), r(e), (e = n);
        r(t);
      },
      O = (e, t, n, r, o, i, l, s, a) => {
        (l = l || "svg" === t.type),
          null == e ? k(t, n, r, o, i, l, s, a) : j(e, t, o, i, l, s, a);
      },
      k = (e, t, r, i, s, a, u, f) => {
        let d, p;
        const {
          type: h,
          props: v,
          shapeFlag: m,
          transition: y,
          patchFlag: b,
          dirs: w,
        } = e;
        if (e.el && void 0 !== g && -1 === b) d = e.el = g(e.el);
        else {
          if (
            ((d = e.el = l(e.type, a, v && v.is, v)),
            8 & m
              ? c(d, e.children)
              : 16 & m &&
                R(e.children, d, null, i, s, a && "foreignObject" !== h, u, f),
            w && Yn(e, null, i, "created"),
            v)
          ) {
            for (const t in v)
              L(t) || o(d, t, null, v[t], a, e.children, i, s, ne);
            (p = v.onVnodeBeforeMount) && or(p, i, e);
          }
          P(d, e, e.scopeId, u, i);
        }
        w && Yn(e, null, i, "beforeMount");
        const x = (!s || (s && !s.pendingBranch)) && y && !y.persisted;
        x && y.beforeEnter(d),
          n(d, t, r),
          ((p = v && v.onVnodeMounted) || x || w) &&
            tr(() => {
              p && or(p, i, e), x && y.enter(d), w && Yn(e, null, i, "mounted");
            }, s);
      },
      P = (e, t, n, r, o) => {
        if ((n && m(e, n), r)) for (let i = 0; i < r.length; i++) m(e, r[i]);
        if (o) {
          if (t === o.subTree) {
            const t = o.vnode;
            P(e, t, t.scopeId, t.slotScopeIds, o.parent);
          }
        }
      },
      R = (e, t, n, r, o, i, l, s, a = 0) => {
        for (let u = a; u < e.length; u++) {
          const a = (e[u] = s ? Mr(e[u]) : $r(e[u]));
          w(null, a, t, n, r, o, i, l, s);
        }
      },
      j = (e, t, n, r, l, s, a) => {
        const u = (t.el = e.el);
        let { patchFlag: f, dynamicChildren: p, dirs: h } = t;
        f |= 16 & e.patchFlag;
        const v = e.props || d,
          m = t.props || d;
        let g;
        if (
          ((g = m.onVnodeBeforeUpdate) && or(g, n, t, e),
          h && Yn(t, e, n, "beforeUpdate"),
          f > 0)
        ) {
          if (16 & f) $(u, t, v, m, n, r, l);
          else if (
            (2 & f && v.class !== m.class && o(u, "class", null, m.class, l),
            4 & f && o(u, "style", v.style, m.style, l),
            8 & f)
          ) {
            const s = t.dynamicProps;
            for (let t = 0; t < s.length; t++) {
              const a = s[t],
                c = v[a],
                f = m[a];
              (f !== c || (i && i(u, a))) &&
                o(u, a, c, f, l, e.children, n, r, ne);
            }
          }
          1 & f && e.children !== t.children && c(u, t.children);
        } else a || null != p || $(u, t, v, m, n, r, l);
        const y = l && "foreignObject" !== t.type;
        p
          ? T(e.dynamicChildren, p, u, n, r, y, s)
          : a || H(e, t, u, null, n, r, y, s, !1),
          ((g = m.onVnodeUpdated) || h) &&
            tr(() => {
              g && or(g, n, t, e), h && Yn(t, e, n, "updated");
            }, r);
      },
      T = (e, t, n, r, o, i, l) => {
        for (let s = 0; s < t.length; s++) {
          const a = e[s],
            u = t[s],
            c =
              a.el &&
              (a.type === hr ||
                !Cr(a, u) ||
                6 & a.shapeFlag ||
                64 & a.shapeFlag)
                ? f(a.el)
                : n;
          w(a, u, c, null, r, o, i, l, !0);
        }
      },
      $ = (e, t, n, r, l, s, a) => {
        if (n !== r) {
          for (const u in r) {
            if (L(u)) continue;
            const c = r[u],
              f = n[u];
            (c !== f || (i && i(e, u))) &&
              o(e, u, f, c, a, t.children, l, s, ne);
          }
          if (n !== d)
            for (const i in n)
              L(i) || i in r || o(e, i, n[i], null, a, t.children, l, s, ne);
        }
      },
      M = (e, t, r, o, i, l, a, u, c) => {
        const f = (t.el = e ? e.el : s("")),
          d = (t.anchor = e ? e.anchor : s(""));
        let { patchFlag: p, dynamicChildren: h, slotScopeIds: v } = t;
        h && (c = !0),
          v && (u = u ? u.concat(v) : v),
          null == e
            ? (n(f, r, o), n(d, r, o), R(t.children, r, d, i, l, a, u, c))
            : p > 0 && 64 & p && h && e.dynamicChildren
            ? (T(e.dynamicChildren, h, r, i, l, a, u),
              (null != t.key || (i && t === i.subTree)) && ir(e, t, !0))
            : H(e, t, r, d, i, l, a, u, c);
      },
      V = (e, t, n, r, o, i, l, s, a) => {
        (t.slotScopeIds = s),
          null == e
            ? 512 & t.shapeFlag
              ? o.ctx.activate(t, n, r, l, a)
              : D(t, n, r, o, i, l, a)
            : N(e, t, a);
      },
      D = (e, t, n, r, o, i, l) => {
        const s = (e.component = (function (e, t, n) {
          const r = e.type,
            o = (t ? t.appContext : e.appContext) || Br,
            i = {
              uid: zr++,
              vnode: e,
              type: r,
              parent: t,
              appContext: o,
              root: null,
              next: null,
              subTree: null,
              update: null,
              render: null,
              proxy: null,
              exposed: null,
              exposeProxy: null,
              withProxy: null,
              effects: null,
              provides: t ? t.provides : Object.create(o.provides),
              accessCache: null,
              renderCache: [],
              components: null,
              directives: null,
              propsOptions: In(r, o),
              emitsOptions: Vt(r, o),
              emit: null,
              emitted: null,
              propsDefaults: d,
              inheritAttrs: r.inheritAttrs,
              ctx: d,
              data: d,
              props: d,
              attrs: d,
              slots: d,
              refs: d,
              setupState: d,
              setupContext: null,
              suspense: n,
              suspenseId: n ? n.pendingId : 0,
              asyncDep: null,
              asyncResolved: !1,
              isMounted: !1,
              isUnmounted: !1,
              isDeactivated: !1,
              bc: null,
              c: null,
              bm: null,
              m: null,
              bu: null,
              u: null,
              um: null,
              bum: null,
              da: null,
              a: null,
              rtg: null,
              rtc: null,
              ec: null,
              sp: null,
            };
          return (
            (i.ctx = { _: i }),
            (i.root = t ? t.root : i),
            (i.emit = Lt.bind(null, i)),
            i
          );
        })(e, r, o));
        if (
          (an(e) && (s.ctx.renderer = se),
          (function (e, t = !1) {
            Gr = t;
            const { props: n, children: r } = e.vnode,
              o = Wr(e);
            Ln(e, n, o, t),
              ((e, t) => {
                if (32 & e.vnode.shapeFlag) {
                  const n = t._;
                  n ? ((e.slots = tt(t)), W(t, "_", n)) : Gn(t, (e.slots = {}));
                } else (e.slots = {}), t && Kn(e, t);
                W(e.slots, Ar, 1);
              })(e, r);
            const i = o
              ? (function (e, t) {
                  const n = e.type;
                  (e.accessCache = Object.create(null)),
                    (e.proxy = nt(new Proxy(e.ctx, Nr)));
                  const { setup: r } = n;
                  if (r) {
                    const n = (e.setupContext =
                      r.length > 1
                        ? (function (e) {
                            const t = (t) => {
                              e.exposed = t || {};
                            };
                            return {
                              attrs: e.attrs,
                              slots: e.slots,
                              emit: e.emit,
                              expose: t,
                            };
                          })(e)
                        : null);
                    (Hr = e), ie();
                    const o = dt(r, e, 0, [e.props, n]);
                    if ((le(), (Hr = null), F(o))) {
                      const n = () => {
                        Hr = null;
                      };
                      if ((o.then(n, n), t))
                        return o
                          .then((t) => {
                            Kr(e, t);
                          })
                          .catch((t) => {
                            ht(t, e, 0);
                          });
                      e.asyncDep = o;
                    } else Kr(e, o);
                  } else Xr(e);
                })(e, t)
              : void 0;
            Gr = !1;
          })(s),
          s.asyncDep)
        ) {
          if ((o && o.registerDep(s, B), !e.el)) {
            const e = (s.subTree = Pr(mr));
            S(null, e, t, n);
          }
        } else B(s, e, t, n, o, i, l);
      },
      N = (e, t, n) => {
        const r = (t.component = e.component);
        if (
          (function (e, t, n) {
            const { props: r, children: o, component: i } = e,
              { props: l, children: s, patchFlag: a } = t,
              u = i.emitsOptions;
            if (t.dirs || t.transition) return !0;
            if (!(n && a >= 0))
              return (
                !((!o && !s) || (s && s.$stable)) ||
                (r !== l && (r ? !l || Xt(r, l, u) : !!l))
              );
            if (1024 & a) return !0;
            if (16 & a) return r ? Xt(r, l, u) : !!l;
            if (8 & a) {
              const e = t.dynamicProps;
              for (let t = 0; t < e.length; t++) {
                const n = e[t];
                if (l[n] !== r[n] && !Dt(u, n)) return !0;
              }
            }
            return !1;
          })(e, t, n)
        ) {
          if (r.asyncDep && !r.asyncResolved) return void z(r, t, n);
          (r.next = t),
            (function (e) {
              const t = gt.indexOf(e);
              t > yt && gt.splice(t, 1);
            })(r.update),
            r.update();
        } else (t.component = e.component), (t.el = e.el), (r.vnode = t);
      },
      B = (e, t, n, r, o, i, l) => {
        e.update = Z(function () {
          if (e.isMounted) {
            let t,
              { next: n, bu: r, u: s, parent: a, vnode: u } = e,
              c = n;
            n ? ((n.el = u.el), z(e, n, l)) : (n = u),
              r && q(r),
              (t = n.props && n.props.onVnodeBeforeUpdate) && or(t, a, n, u);
            const d = Wt(e),
              p = e.subTree;
            (e.subTree = d),
              w(p, d, f(p.el), re(p), e, o, i),
              (n.el = d.el),
              null === c &&
                (function ({ vnode: e, parent: t }, n) {
                  for (; t && t.subTree === e; )
                    ((e = t.vnode).el = n), (t = t.parent);
                })(e, d.el),
              s && tr(s, o),
              (t = n.props && n.props.onVnodeUpdated) &&
                tr(() => or(t, a, n, u), o);
          } else {
            let l;
            const { el: s, props: a } = t,
              { bm: u, m: c, parent: f } = e;
            if (
              (u && q(u),
              (l = a && a.onVnodeBeforeMount) && or(l, f, t),
              s && ce)
            ) {
              const n = () => {
                (e.subTree = Wt(e)), ce(s, e.subTree, e, o, null);
              };
              sn(t)
                ? t.type.__asyncLoader().then(() => !e.isUnmounted && n())
                : n();
            } else {
              const l = (e.subTree = Wt(e));
              w(null, l, n, r, e, o, i), (t.el = l.el);
            }
            if ((c && tr(c, o), (l = a && a.onVnodeMounted))) {
              const e = t;
              tr(() => or(l, f, e), o);
            }
            256 & t.shapeFlag && e.a && tr(e.a, o),
              (e.isMounted = !0),
              (t = n = r = null);
          }
        }, er);
      },
      z = (e, t, n) => {
        t.component = e;
        const r = e.vnode.props;
        (e.vnode = t),
          (e.next = null),
          (function (e, t, n, r) {
            const {
                props: o,
                attrs: i,
                vnode: { patchFlag: l },
              } = e,
              s = tt(o),
              [a] = e.propsOptions;
            let u = !1;
            if (!(r || l > 0) || 16 & l) {
              let r;
              Vn(e, t, o, i) && (u = !0);
              for (const i in s)
                (t && (_(t, i) || ((r = U(i)) !== i && _(t, r)))) ||
                  (a
                    ? !n ||
                      (void 0 === n[i] && void 0 === n[r]) ||
                      (o[i] = Dn(a, s, i, void 0, e, !0))
                    : delete o[i]);
              if (i !== s)
                for (const e in i) (t && _(t, e)) || (delete i[e], (u = !0));
            } else if (8 & l) {
              const n = e.vnode.dynamicProps;
              for (let r = 0; r < n.length; r++) {
                let l = n[r];
                const c = t[l];
                if (a)
                  if (_(i, l)) c !== i[l] && ((i[l] = c), (u = !0));
                  else {
                    const t = I(l);
                    o[t] = Dn(a, s, t, c, e, !1);
                  }
                else c !== i[l] && ((i[l] = c), (u = !0));
              }
            }
            u && ae(e, "set", "$attrs");
          })(e, t.props, r, n),
          ((e, t, n) => {
            const { vnode: r, slots: o } = e;
            let i = !0,
              l = d;
            if (32 & r.shapeFlag) {
              const e = t._;
              e
                ? n && 1 === e
                  ? (i = !1)
                  : (b(o, t), n || 1 !== e || delete o._)
                : ((i = !t.$stable), Gn(t, o)),
                (l = t);
            } else t && (Kn(e, t), (l = { default: 1 }));
            if (i) for (const s in o) Hn(s) || s in l || delete o[s];
          })(e, t.children, n),
          ie(),
          jt(void 0, e.update),
          le();
      },
      H = (e, t, n, r, o, i, l, s, a = !1) => {
        const u = e && e.children,
          f = e ? e.shapeFlag : 0,
          d = t.children,
          { patchFlag: p, shapeFlag: h } = t;
        if (p > 0) {
          if (128 & p) return void K(u, d, n, r, o, i, l, s, a);
          if (256 & p) return void G(u, d, n, r, o, i, l, s, a);
        }
        8 & h
          ? (16 & f && ne(u, o, i), d !== u && c(n, d))
          : 16 & f
          ? 16 & h
            ? K(u, d, n, r, o, i, l, s, a)
            : ne(u, o, i, !0)
          : (8 & f && c(n, ""), 16 & h && R(d, n, r, o, i, l, s, a));
      },
      G = (e, t, n, r, o, i, l, s, a) => {
        t = t || p;
        const u = (e = e || p).length,
          c = t.length,
          f = Math.min(u, c);
        let d;
        for (d = 0; d < f; d++) {
          const r = (t[d] = a ? Mr(t[d]) : $r(t[d]));
          w(e[d], r, n, null, o, i, l, s, a);
        }
        u > c ? ne(e, o, i, !0, !1, f) : R(t, n, r, o, i, l, s, a, f);
      },
      K = (e, t, n, r, o, i, l, s, a) => {
        let u = 0;
        const c = t.length;
        let f = e.length - 1,
          d = c - 1;
        for (; u <= f && u <= d; ) {
          const r = e[u],
            c = (t[u] = a ? Mr(t[u]) : $r(t[u]));
          if (!Cr(r, c)) break;
          w(r, c, n, null, o, i, l, s, a), u++;
        }
        for (; u <= f && u <= d; ) {
          const r = e[f],
            u = (t[d] = a ? Mr(t[d]) : $r(t[d]));
          if (!Cr(r, u)) break;
          w(r, u, n, null, o, i, l, s, a), f--, d--;
        }
        if (u > f) {
          if (u <= d) {
            const e = d + 1,
              f = e < c ? t[e].el : r;
            for (; u <= d; )
              w(null, (t[u] = a ? Mr(t[u]) : $r(t[u])), n, f, o, i, l, s, a),
                u++;
          }
        } else if (u > d) for (; u <= f; ) Y(e[u], o, i, !0), u++;
        else {
          const h = u,
            v = u,
            m = new Map();
          for (u = v; u <= d; u++) {
            const e = (t[u] = a ? Mr(t[u]) : $r(t[u]));
            null != e.key && m.set(e.key, u);
          }
          let g,
            y = 0;
          const b = d - v + 1;
          let x = !1,
            _ = 0;
          const S = new Array(b);
          for (u = 0; u < b; u++) S[u] = 0;
          for (u = h; u <= f; u++) {
            const r = e[u];
            if (y >= b) {
              Y(r, o, i, !0);
              continue;
            }
            let c;
            if (null != r.key) c = m.get(r.key);
            else
              for (g = v; g <= d; g++)
                if (0 === S[g - v] && Cr(r, t[g])) {
                  c = g;
                  break;
                }
            void 0 === c
              ? Y(r, o, i, !0)
              : ((S[c - v] = u + 1),
                c >= _ ? (_ = c) : (x = !0),
                w(r, t[c], n, null, o, i, l, s, a),
                y++);
          }
          const E = x
            ? (function (e) {
                const t = e.slice(),
                  n = [0];
                let r, o, i, l, s;
                const a = e.length;
                for (r = 0; r < a; r++) {
                  const a = e[r];
                  if (0 !== a) {
                    if (((o = n[n.length - 1]), e[o] < a)) {
                      (t[r] = o), n.push(r);
                      continue;
                    }
                    for (i = 0, l = n.length - 1; i < l; )
                      (s = ((i + l) / 2) | 0),
                        e[n[s]] < a ? (i = s + 1) : (l = s);
                    a < e[n[i]] && (i > 0 && (t[r] = n[i - 1]), (n[i] = r));
                  }
                }
                (i = n.length), (l = n[i - 1]);
                for (; i-- > 0; ) (n[i] = l), (l = t[l]);
                return n;
              })(S)
            : p;
          for (g = E.length - 1, u = b - 1; u >= 0; u--) {
            const e = v + u,
              f = t[e],
              d = e + 1 < c ? t[e + 1].el : r;
            0 === S[u]
              ? w(null, f, n, d, o, i, l, s, a)
              : x && (g < 0 || u !== E[g] ? X(f, n, d, 2) : g--);
          }
        }
      },
      X = (e, t, r, o, i = null) => {
        const { el: l, type: s, transition: a, children: u, shapeFlag: c } = e;
        if (6 & c) return void X(e.component.subTree, t, r, o);
        if (128 & c) return void e.suspense.move(t, r, o);
        if (64 & c) return void s.move(e, t, r, se);
        if (s === hr) {
          n(l, t, r);
          for (let e = 0; e < u.length; e++) X(u[e], t, r, o);
          return void n(e.anchor, t, r);
        }
        if (s === gr) return void C(e, t, r);
        if (2 !== o && 1 & c && a)
          if (0 === o) a.beforeEnter(l), n(l, t, r), tr(() => a.enter(l), i);
          else {
            const { leave: e, delayLeave: o, afterLeave: i } = a,
              s = () => n(l, t, r),
              u = () => {
                e(l, () => {
                  s(), i && i();
                });
              };
            o ? o(l, s, u) : u();
          }
        else n(l, t, r);
      },
      Y = (e, t, n, r = !1, o = !1) => {
        const {
          type: i,
          props: l,
          ref: s,
          children: a,
          dynamicChildren: u,
          shapeFlag: c,
          patchFlag: f,
          dirs: d,
        } = e;
        if ((null != s && nr(s, null, n, e, !0), 256 & c))
          return void t.ctx.deactivate(e);
        const p = 1 & c && d;
        let h;
        if (((h = l && l.onVnodeBeforeUnmount) && or(h, t, e), 6 & c))
          te(e.component, n, r);
        else {
          if (128 & c) return void e.suspense.unmount(n, r);
          p && Yn(e, null, t, "beforeUnmount"),
            64 & c
              ? e.type.remove(e, t, n, o, se, r)
              : u && (i !== hr || (f > 0 && 64 & f))
              ? ne(u, t, n, !1, !0)
              : ((i === hr && (128 & f || 256 & f)) || (!o && 16 & c)) &&
                ne(a, t, n),
            r && J(e);
        }
        ((h = l && l.onVnodeUnmounted) || p) &&
          tr(() => {
            h && or(h, t, e), p && Yn(e, null, t, "unmounted");
          }, n);
      },
      J = (e) => {
        const { type: t, el: n, anchor: o, transition: i } = e;
        if (t === hr) return void Q(n, o);
        if (t === gr) return void A(e);
        const l = () => {
          r(n), i && !i.persisted && i.afterLeave && i.afterLeave();
        };
        if (1 & e.shapeFlag && i && !i.persisted) {
          const { leave: t, delayLeave: r } = i,
            o = () => t(n, l);
          r ? r(e.el, l, o) : o();
        } else l();
      },
      Q = (e, t) => {
        let n;
        for (; e !== t; ) (n = v(e)), r(e), (e = n);
        r(t);
      },
      te = (e, t, n) => {
        const { bum: r, effects: o, update: i, subTree: l, um: s } = e;
        if ((r && q(r), o)) for (let a = 0; a < o.length; a++) ee(o[a]);
        i && (ee(i), Y(l, e, t, n)),
          s && tr(s, t),
          tr(() => {
            e.isUnmounted = !0;
          }, t),
          t &&
            t.pendingBranch &&
            !t.isUnmounted &&
            e.asyncDep &&
            !e.asyncResolved &&
            e.suspenseId === t.pendingId &&
            (t.deps--, 0 === t.deps && t.resolve());
      },
      ne = (e, t, n, r = !1, o = !1, i = 0) => {
        for (let l = i; l < e.length; l++) Y(e[l], t, n, r, o);
      },
      re = (e) =>
        6 & e.shapeFlag
          ? re(e.component.subTree)
          : 128 & e.shapeFlag
          ? e.suspense.next()
          : v(e.anchor || e.el),
      oe = (e, t, n) => {
        null == e
          ? t._vnode && Y(t._vnode, null, null, !0)
          : w(t._vnode || null, e, t, null, null, null, n),
          Tt(),
          (t._vnode = e);
      },
      se = {
        p: w,
        um: Y,
        m: X,
        r: J,
        mt: D,
        mc: R,
        pc: H,
        pbc: T,
        n: re,
        o: e,
      };
    let ue, ce;
    t && ([ue, ce] = t(se));
    return { render: oe, hydrate: ue, createApp: Zn(oe, ue) };
  })(e);
}
function or(e, t, n, r = null) {
  pt(e, t, 7, [n, r]);
}
function ir(e, t, n = !1) {
  const r = e.children,
    o = t.children;
  if (S(r) && S(o))
    for (let i = 0; i < r.length; i++) {
      const e = r[i];
      let t = o[i];
      1 & t.shapeFlag &&
        !t.dynamicChildren &&
        ((t.patchFlag <= 0 || 32 === t.patchFlag) &&
          ((t = o[i] = Mr(o[i])), (t.el = e.el)),
        n || ir(e, t));
    }
}
const lr = (e) => e && (e.disabled || "" === e.disabled),
  sr = (e) => "undefined" != typeof SVGElement && e instanceof SVGElement,
  ar = (e, t) => {
    const n = e && e.to;
    if (k(n)) {
      if (t) {
        return t(n);
      }
      return null;
    }
    return n;
  };
function ur(e, t, n, { o: { insert: r }, m: o }, i = 2) {
  0 === i && r(e.targetAnchor, t, n);
  const { el: l, anchor: s, shapeFlag: a, children: u, props: c } = e,
    f = 2 === i;
  if ((f && r(l, t, n), (!f || lr(c)) && 16 & a))
    for (let d = 0; d < u.length; d++) o(u[d], t, n, 2);
  f && r(s, t, n);
}
const cr = {
  __isTeleport: !0,
  process(e, t, n, r, o, i, l, s, a, u) {
    const {
        mc: c,
        pc: f,
        pbc: d,
        o: { insert: p, querySelector: h, createText: v, createComment: m },
      } = u,
      g = lr(t.props);
    let { shapeFlag: y, children: b, dynamicChildren: w } = t;
    if (null == e) {
      const e = (t.el = v("")),
        u = (t.anchor = v(""));
      p(e, n, r), p(u, n, r);
      const f = (t.target = ar(t.props, h)),
        d = (t.targetAnchor = v(""));
      f && (p(d, f), (l = l || sr(f)));
      const m = (e, t) => {
        16 & y && c(b, e, t, o, i, l, s, a);
      };
      g ? m(n, u) : f && m(f, d);
    } else {
      t.el = e.el;
      const r = (t.anchor = e.anchor),
        c = (t.target = e.target),
        p = (t.targetAnchor = e.targetAnchor),
        v = lr(e.props),
        m = v ? n : c,
        y = v ? r : p;
      if (
        ((l = l || sr(c)),
        w
          ? (d(e.dynamicChildren, w, m, o, i, l, s), ir(e, t, !0))
          : a || f(e, t, m, y, o, i, l, s, !1),
        g)
      )
        v || ur(t, n, r, u, 1);
      else if ((t.props && t.props.to) !== (e.props && e.props.to)) {
        const e = (t.target = ar(t.props, h));
        e && ur(t, e, null, u, 0);
      } else v && ur(t, c, p, u, 1);
    }
  },
  remove(e, t, n, r, { um: o, o: { remove: i } }, l) {
    const {
      shapeFlag: s,
      children: a,
      anchor: u,
      targetAnchor: c,
      target: f,
      props: d,
    } = e;
    if ((f && i(c), (l || !lr(d)) && (i(u), 16 & s)))
      for (let p = 0; p < a.length; p++) {
        const e = a[p];
        o(e, t, n, !0, !!e.dynamicChildren);
      }
  },
  move: ur,
  hydrate: function (
    e,
    t,
    n,
    r,
    o,
    i,
    { o: { nextSibling: l, parentNode: s, querySelector: a } },
    u
  ) {
    const c = (t.target = ar(t.props, a));
    if (c) {
      const a = c._lpa || c.firstChild;
      16 & t.shapeFlag &&
        (lr(t.props)
          ? ((t.anchor = u(l(e), t, s(e), n, r, o, i)), (t.targetAnchor = a))
          : ((t.anchor = l(e)), (t.targetAnchor = u(a, t, c, n, r, o, i))),
        (c._lpa = t.targetAnchor && l(t.targetAnchor)));
    }
    return t.anchor && l(t.anchor);
  },
};
function fr(e, t) {
  return (
    (function (e, t, n = !0, r = !1) {
      const o = It || Hr;
      if (o) {
        const n = o.type;
        if ("components" === e) {
          const e = Qr(n);
          if (e && (e === t || e === I(t) || e === B(I(t)))) return n;
        }
        const i = pr(o[e] || n[e], t) || pr(o.appContext[e], t);
        return !i && r ? n : i;
      }
    })("components", e, !0, t) || e
  );
}
const dr = Symbol();
function pr(e, t) {
  return e && (e[t] || e[I(t)] || e[B(I(t))]);
}
const hr = Symbol(void 0),
  vr = Symbol(void 0),
  mr = Symbol(void 0),
  gr = Symbol(void 0),
  yr = [];
let br = null;
function wr(e = !1) {
  yr.push((br = e ? null : []));
}
let xr = 1;
function _r(e) {
  xr += e;
}
function Sr(e, t, n, r, o) {
  const i = Pr(e, t, n, r, o, !0);
  return (
    (i.dynamicChildren = xr > 0 ? br || p : null),
    yr.pop(),
    (br = yr[yr.length - 1] || null),
    xr > 0 && br && br.push(i),
    i
  );
}
function Er(e) {
  return !!e && !0 === e.__v_isVNode;
}
function Cr(e, t) {
  return e.type === t.type && e.key === t.key;
}
const Ar = "__vInternal",
  Or = ({ key: e }) => (null != e ? e : null),
  kr = ({ ref: e }) =>
    null != e ? (k(e) || ot(e) || O(e) ? { i: It, r: e } : e) : null,
  Pr = function (e, t = null, n = null, o = 0, i = null, l = !1) {
    (e && e !== dr) || (e = mr);
    if (Er(e)) {
      const r = Rr(e, t, !0);
      return n && Lr(r, n), r;
    }
    (a = e), O(a) && "__vccOpts" in a && (e = e.__vccOpts);
    var a;
    if (t) {
      (et(t) || Ar in t) && (t = b({}, t));
      let { class: e, style: n } = t;
      e && !k(e) && (t.class = s(e)),
        R(n) && (et(n) && !S(n) && (n = b({}, n)), (t.style = r(n)));
    }
    const u = k(e)
        ? 1
        : ((e) => e.__isSuspense)(e)
        ? 128
        : ((e) => e.__isTeleport)(e)
        ? 64
        : R(e)
        ? 4
        : O(e)
        ? 2
        : 0,
      c = {
        __v_isVNode: !0,
        __v_skip: !0,
        type: e,
        props: t,
        key: t && Or(t),
        ref: t && kr(t),
        scopeId: Nt,
        slotScopeIds: null,
        children: null,
        component: null,
        suspense: null,
        ssContent: null,
        ssFallback: null,
        dirs: null,
        transition: null,
        el: null,
        anchor: null,
        target: null,
        targetAnchor: null,
        shapeFlag: u,
        patchFlag: o,
        dynamicProps: i,
        dynamicChildren: null,
        appContext: null,
      };
    Lr(c, n), 128 & u && e.normalize(c);
    xr > 0 && !l && br && (o > 0 || 6 & u) && 32 !== o && br.push(c);
    return c;
  };
function Rr(e, t, n = !1) {
  const { props: o, ref: i, patchFlag: l, children: a } = e,
    u = t
      ? (function (...e) {
          const t = b({}, e[0]);
          for (let n = 1; n < e.length; n++) {
            const o = e[n];
            for (const e in o)
              if ("class" === e)
                t.class !== o.class && (t.class = s([t.class, o.class]));
              else if ("style" === e) t.style = r([t.style, o.style]);
              else if (g(e)) {
                const n = t[e],
                  r = o[e];
                n !== r && (t[e] = n ? [].concat(n, r) : r);
              } else "" !== e && (t[e] = o[e]);
          }
          return t;
        })(o || {}, t)
      : o;
  return {
    __v_isVNode: !0,
    __v_skip: !0,
    type: e.type,
    props: u,
    key: u && Or(u),
    ref:
      t && t.ref ? (n && i ? (S(i) ? i.concat(kr(t)) : [i, kr(t)]) : kr(t)) : i,
    scopeId: e.scopeId,
    slotScopeIds: e.slotScopeIds,
    children: a,
    target: e.target,
    targetAnchor: e.targetAnchor,
    staticCount: e.staticCount,
    shapeFlag: e.shapeFlag,
    patchFlag: t && e.type !== hr ? (-1 === l ? 16 : 16 | l) : l,
    dynamicProps: e.dynamicProps,
    dynamicChildren: e.dynamicChildren,
    appContext: e.appContext,
    dirs: e.dirs,
    transition: e.transition,
    component: e.component,
    suspense: e.suspense,
    ssContent: e.ssContent && Rr(e.ssContent),
    ssFallback: e.ssFallback && Rr(e.ssFallback),
    el: e.el,
    anchor: e.anchor,
  };
}
function Fr(e = " ", t = 0) {
  return Pr(vr, null, e, t);
}
function jr(e, t) {
  const n = Pr(gr, null, e);
  return (n.staticCount = t), n;
}
function Tr(e = "", t = !1) {
  return t ? (wr(), Sr(mr, null, e)) : Pr(mr, null, e);
}
function $r(e) {
  return null == e || "boolean" == typeof e
    ? Pr(mr)
    : S(e)
    ? Pr(hr, null, e.slice())
    : "object" == typeof e
    ? Mr(e)
    : Pr(vr, null, String(e));
}
function Mr(e) {
  return null === e.el ? e : Rr(e);
}
function Lr(e, t) {
  let n = 0;
  const { shapeFlag: r } = e;
  if (null == t) t = null;
  else if (S(t)) n = 16;
  else if ("object" == typeof t) {
    if (1 & r || 64 & r) {
      const n = t.default;
      return void (n && (n._c && (n._d = !1), Lr(e, n()), n._c && (n._d = !0)));
    }
    {
      n = 32;
      const r = t._;
      r || Ar in t
        ? 3 === r &&
          It &&
          (1 === It.slots._ ? (t._ = 1) : ((t._ = 2), (e.patchFlag |= 1024)))
        : (t._ctx = It);
    }
  } else
    O(t)
      ? ((t = { default: t, _ctx: It }), (n = 32))
      : ((t = String(t)), 64 & r ? ((n = 16), (t = [Fr(t)])) : (n = 8));
  (e.children = t), (e.shapeFlag |= n);
}
function Vr(e, t) {
  let n;
  if (S(e) || k(e)) {
    n = new Array(e.length);
    for (let r = 0, o = e.length; r < o; r++) n[r] = t(e[r], r);
  } else if ("number" == typeof e) {
    n = new Array(e);
    for (let r = 0; r < e; r++) n[r] = t(r + 1, r);
  } else if (R(e))
    if (e[Symbol.iterator]) n = Array.from(e, t);
    else {
      const r = Object.keys(e);
      n = new Array(r.length);
      for (let o = 0, i = r.length; o < i; o++) {
        const i = r[o];
        n[o] = t(e[i], i, o);
      }
    }
  else n = [];
  return n;
}
const Dr = (e) => (e ? (Wr(e) ? Yr(e) || e.proxy : Dr(e.parent)) : null),
  Ir = b(Object.create(null), {
    $: (e) => e,
    $el: (e) => e.vnode.el,
    $data: (e) => e.data,
    $props: (e) => e.props,
    $attrs: (e) => e.attrs,
    $slots: (e) => e.slots,
    $refs: (e) => e.refs,
    $parent: (e) => Dr(e.parent),
    $root: (e) => Dr(e.root),
    $emit: (e) => e.emit,
    $options: (e) => Pn(e),
    $forceUpdate: (e) => () => Pt(e.update),
    $nextTick: (e) => kt.bind(e.proxy),
    $watch: (e) => nn.bind(e),
  }),
  Nr = {
    get({ _: e }, t) {
      const {
        ctx: n,
        setupState: r,
        data: o,
        props: i,
        accessCache: l,
        type: s,
        appContext: a,
      } = e;
      let u;
      if ("$" !== t[0]) {
        const s = l[t];
        if (void 0 !== s)
          switch (s) {
            case 0:
              return r[t];
            case 1:
              return o[t];
            case 3:
              return n[t];
            case 2:
              return i[t];
          }
        else {
          if (r !== d && _(r, t)) return (l[t] = 0), r[t];
          if (o !== d && _(o, t)) return (l[t] = 1), o[t];
          if ((u = e.propsOptions[0]) && _(u, t)) return (l[t] = 2), i[t];
          if (n !== d && _(n, t)) return (l[t] = 3), n[t];
          Cn && (l[t] = 4);
        }
      }
      const c = Ir[t];
      let f, p;
      return c
        ? ("$attrs" === t && se(e, 0, t), c(e))
        : (f = s.__cssModules) && (f = f[t])
        ? f
        : n !== d && _(n, t)
        ? ((l[t] = 3), n[t])
        : ((p = a.config.globalProperties), _(p, t) ? p[t] : void 0);
    },
    set({ _: e }, t, n) {
      const { data: r, setupState: o, ctx: i } = e;
      if (o !== d && _(o, t)) o[t] = n;
      else if (r !== d && _(r, t)) r[t] = n;
      else if (_(e.props, t)) return !1;
      return ("$" !== t[0] || !(t.slice(1) in e)) && ((i[t] = n), !0);
    },
    has(
      {
        _: {
          data: e,
          setupState: t,
          accessCache: n,
          ctx: r,
          appContext: o,
          propsOptions: i,
        },
      },
      l
    ) {
      let s;
      return (
        void 0 !== n[l] ||
        (e !== d && _(e, l)) ||
        (t !== d && _(t, l)) ||
        ((s = i[0]) && _(s, l)) ||
        _(r, l) ||
        _(Ir, l) ||
        _(o.config.globalProperties, l)
      );
    },
  },
  Ur = b({}, Nr, {
    get(e, t) {
      if (t !== Symbol.unscopables) return Nr.get(e, t, e);
    },
    has: (e, n) => "_" !== n[0] && !t(n),
  }),
  Br = Jn();
let zr = 0;
let Hr = null;
const qr = (e) => {
  Hr = e;
};
function Wr(e) {
  return 4 & e.vnode.shapeFlag;
}
let Gr = !1;
function Kr(e, t, n) {
  O(t) ? (e.render = t) : R(t) && (e.setupState = ct(t)), Xr(e);
}
function Xr(e, t, n) {
  const r = e.type;
  e.render ||
    ((e.render = r.render || h),
    e.render._rc && (e.withProxy = new Proxy(e.ctx, Ur))),
    (Hr = e),
    ie(),
    An(e),
    le(),
    (Hr = null);
}
function Yr(e) {
  if (e.exposed)
    return (
      e.exposeProxy ||
      (e.exposeProxy = new Proxy(ct(nt(e.exposed)), {
        get: (t, n) => (n in t ? t[n] : n in Ir ? Ir[n](e) : void 0),
      }))
    );
}
function Jr(e, t = Hr) {
  t && (t.effects || (t.effects = [])).push(e);
}
function Qr(e) {
  return (O(e) && e.displayName) || e.name;
}
function Zr(e) {
  const t = (function (e) {
    let t, n;
    return (
      O(e) ? ((t = e), (n = h)) : ((t = e.get), (n = e.set)),
      new ft(t, n, O(e) || !e.set)
    );
  })(e);
  return Jr(t.effect), t;
}
function eo(e, t, n) {
  const r = arguments.length;
  return 2 === r
    ? R(t) && !S(t)
      ? Er(t)
        ? Pr(e, null, [t])
        : Pr(e, t)
      : Pr(e, null, t)
    : (r > 3
        ? (n = Array.prototype.slice.call(arguments, 2))
        : 3 === r && Er(n) && (n = [n]),
      Pr(e, t, n));
}
const to = "3.1.5",
  no = "undefined" != typeof document ? document : null,
  ro = new Map(),
  oo = {
    insert: (e, t, n) => {
      t.insertBefore(e, n || null);
    },
    remove: (e) => {
      const t = e.parentNode;
      t && t.removeChild(e);
    },
    createElement: (e, t, n, r) => {
      const o = t
        ? no.createElementNS("http://www.w3.org/2000/svg", e)
        : no.createElement(e, n ? { is: n } : void 0);
      return (
        "select" === e &&
          r &&
          null != r.multiple &&
          o.setAttribute("multiple", r.multiple),
        o
      );
    },
    createText: (e) => no.createTextNode(e),
    createComment: (e) => no.createComment(e),
    setText: (e, t) => {
      e.nodeValue = t;
    },
    setElementText: (e, t) => {
      e.textContent = t;
    },
    parentNode: (e) => e.parentNode,
    nextSibling: (e) => e.nextSibling,
    querySelector: (e) => no.querySelector(e),
    setScopeId(e, t) {
      e.setAttribute(t, "");
    },
    cloneNode(e) {
      const t = e.cloneNode(!0);
      return "_value" in e && (t._value = e._value), t;
    },
    insertStaticContent(e, t, n, r) {
      const o = n ? n.previousSibling : t.lastChild;
      let i = ro.get(e);
      if (!i) {
        const t = no.createElement("template");
        if (((t.innerHTML = r ? `<svg>${e}</svg>` : e), (i = t.content), r)) {
          const e = i.firstChild;
          for (; e.firstChild; ) i.appendChild(e.firstChild);
          i.removeChild(e);
        }
        ro.set(e, i);
      }
      return (
        t.insertBefore(i.cloneNode(!0), n),
        [o ? o.nextSibling : t.firstChild, n ? n.previousSibling : t.lastChild]
      );
    },
  };
const io = /\s*!important$/;
function lo(e, t, n) {
  if (S(n)) n.forEach((n) => lo(e, t, n));
  else if (t.startsWith("--")) e.setProperty(t, n);
  else {
    const r = (function (e, t) {
      const n = ao[t];
      if (n) return n;
      let r = I(t);
      if ("filter" !== r && r in e) return (ao[t] = r);
      r = B(r);
      for (let o = 0; o < so.length; o++) {
        const n = so[o] + r;
        if (n in e) return (ao[t] = n);
      }
      return t;
    })(e, t);
    io.test(n)
      ? e.setProperty(U(r), n.replace(io, ""), "important")
      : (e[r] = n);
  }
}
const so = ["Webkit", "Moz", "ms"],
  ao = {};
const uo = "http://www.w3.org/1999/xlink";
let co = Date.now,
  fo = !1;
if ("undefined" != typeof window) {
  co() > document.createEvent("Event").timeStamp &&
    (co = () => performance.now());
  const e = navigator.userAgent.match(/firefox\/(\d+)/i);
  fo = !!(e && Number(e[1]) <= 53);
}
let po = 0;
const ho = Promise.resolve(),
  vo = () => {
    po = 0;
  };
function mo(e, t, n, r) {
  e.addEventListener(t, n, r);
}
function go(e, t, n, r, o = null) {
  const i = e._vei || (e._vei = {}),
    l = i[t];
  if (r && l) l.value = r;
  else {
    const [n, s] = (function (e) {
      let t;
      if (yo.test(e)) {
        let n;
        for (t = {}; (n = e.match(yo)); )
          (e = e.slice(0, e.length - n[0].length)),
            (t[n[0].toLowerCase()] = !0);
      }
      return [U(e.slice(2)), t];
    })(t);
    if (r) {
      mo(
        e,
        n,
        (i[t] = (function (e, t) {
          const n = (e) => {
            const r = e.timeStamp || co();
            (fo || r >= n.attached - 1) &&
              pt(
                (function (e, t) {
                  if (S(t)) {
                    const n = e.stopImmediatePropagation;
                    return (
                      (e.stopImmediatePropagation = () => {
                        n.call(e), (e._stopped = !0);
                      }),
                      t.map((e) => (t) => !t._stopped && e(t))
                    );
                  }
                  return t;
                })(e, n.value),
                t,
                5,
                [e]
              );
          };
          return (
            (n.value = e),
            (n.attached = (() => po || (ho.then(vo), (po = co())))()),
            n
          );
        })(r, o)),
        s
      );
    } else
      l &&
        (!(function (e, t, n, r) {
          e.removeEventListener(t, n, r);
        })(e, n, l, s),
        (i[t] = void 0));
  }
}
const yo = /(?:Once|Passive|Capture)$/;
const bo = /^on[a-z]/;
const wo = (e) => {
  const t = e.props["onUpdate:modelValue"];
  return S(t) ? (e) => q(t, e) : t;
};
function xo(e) {
  e.target.composing = !0;
}
function _o(e) {
  const t = e.target;
  t.composing &&
    ((t.composing = !1),
    (function (e, t) {
      const n = document.createEvent("HTMLEvents");
      n.initEvent(t, !0, !0), e.dispatchEvent(n);
    })(t, "input"));
}
const So = {
    created(e, { modifiers: { lazy: t, trim: n, number: r } }, o) {
      e._assign = wo(o);
      const i = r || "number" === e.type;
      mo(e, t ? "change" : "input", (t) => {
        if (t.target.composing) return;
        let r = e.value;
        n ? (r = r.trim()) : i && (r = G(r)), e._assign(r);
      }),
        n &&
          mo(e, "change", () => {
            e.value = e.value.trim();
          }),
        t ||
          (mo(e, "compositionstart", xo),
          mo(e, "compositionend", _o),
          mo(e, "change", _o));
    },
    mounted(e, { value: t }) {
      e.value = null == t ? "" : t;
    },
    beforeUpdate(e, { value: t, modifiers: { trim: n, number: r } }, o) {
      if (((e._assign = wo(o)), e.composing)) return;
      if (document.activeElement === e) {
        if (n && e.value.trim() === t) return;
        if ((r || "number" === e.type) && G(e.value) === t) return;
      }
      const i = null == t ? "" : t;
      e.value !== i && (e.value = i);
    },
  },
  Eo = {
    deep: !0,
    created(e, t, n) {
      (e._assign = wo(n)),
        mo(e, "change", () => {
          const t = e._modelValue,
            n = Po(e),
            r = e.checked,
            o = e._assign;
          if (S(t)) {
            const e = u(t, n),
              i = -1 !== e;
            if (r && !i) o(t.concat(n));
            else if (!r && i) {
              const n = [...t];
              n.splice(e, 1), o(n);
            }
          } else if (C(t)) {
            const e = new Set(t);
            r ? e.add(n) : e.delete(n), o(e);
          } else o(Ro(e, r));
        });
    },
    mounted: Co,
    beforeUpdate(e, t, n) {
      (e._assign = wo(n)), Co(e, t, n);
    },
  };
function Co(e, { value: t, oldValue: n }, r) {
  (e._modelValue = t),
    S(t)
      ? (e.checked = u(t, r.props.value) > -1)
      : C(t)
      ? (e.checked = t.has(r.props.value))
      : t !== n && (e.checked = a(t, Ro(e, !0)));
}
const Ao = {
    created(e, { value: t }, n) {
      (e.checked = a(t, n.props.value)),
        (e._assign = wo(n)),
        mo(e, "change", () => {
          e._assign(Po(e));
        });
    },
    beforeUpdate(e, { value: t, oldValue: n }, r) {
      (e._assign = wo(r)), t !== n && (e.checked = a(t, r.props.value));
    },
  },
  Oo = {
    deep: !0,
    created(e, { value: t, modifiers: { number: n } }, r) {
      const o = C(t);
      mo(e, "change", () => {
        const t = Array.prototype.filter
          .call(e.options, (e) => e.selected)
          .map((e) => (n ? G(Po(e)) : Po(e)));
        e._assign(e.multiple ? (o ? new Set(t) : t) : t[0]);
      }),
        (e._assign = wo(r));
    },
    mounted(e, { value: t }) {
      ko(e, t);
    },
    beforeUpdate(e, t, n) {
      e._assign = wo(n);
    },
    updated(e, { value: t }) {
      ko(e, t);
    },
  };
function ko(e, t) {
  const n = e.multiple;
  if (!n || S(t) || C(t)) {
    for (let r = 0, o = e.options.length; r < o; r++) {
      const o = e.options[r],
        i = Po(o);
      if (n) S(t) ? (o.selected = u(t, i) > -1) : (o.selected = t.has(i));
      else if (a(Po(o), t))
        return void (e.selectedIndex !== r && (e.selectedIndex = r));
    }
    n || -1 === e.selectedIndex || (e.selectedIndex = -1);
  }
}
function Po(e) {
  return "_value" in e ? e._value : e.value;
}
function Ro(e, t) {
  const n = t ? "_trueValue" : "_falseValue";
  return n in e ? e[n] : t;
}
const Fo = ["ctrl", "shift", "alt", "meta"],
  jo = {
    stop: (e) => e.stopPropagation(),
    prevent: (e) => e.preventDefault(),
    self: (e) => e.target !== e.currentTarget,
    ctrl: (e) => !e.ctrlKey,
    shift: (e) => !e.shiftKey,
    alt: (e) => !e.altKey,
    meta: (e) => !e.metaKey,
    left: (e) => "button" in e && 0 !== e.button,
    middle: (e) => "button" in e && 1 !== e.button,
    right: (e) => "button" in e && 2 !== e.button,
    exact: (e, t) => Fo.some((n) => e[`${n}Key`] && !t.includes(n)),
  },
  To =
    (e, t) =>
    (n, ...r) => {
      for (let e = 0; e < t.length; e++) {
        const r = jo[t[e]];
        if (r && r(n, t)) return;
      }
      return e(n, ...r);
    },
  $o = {
    beforeMount(e, { value: t }, { transition: n }) {
      (e._vod = "none" === e.style.display ? "" : e.style.display),
        n && t ? n.beforeEnter(e) : Mo(e, t);
    },
    mounted(e, { value: t }, { transition: n }) {
      n && t && n.enter(e);
    },
    updated(e, { value: t, oldValue: n }, { transition: r }) {
      !t != !n &&
        (r
          ? t
            ? (r.beforeEnter(e), Mo(e, !0), r.enter(e))
            : r.leave(e, () => {
                Mo(e, !1);
              })
          : Mo(e, t));
    },
    beforeUnmount(e, { value: t }) {
      Mo(e, t);
    },
  };
function Mo(e, t) {
  e.style.display = t ? e._vod : "none";
}
const Lo = b(
  {
    patchProp: (e, t, r, o, i = !1, l, s, a, u) => {
      switch (t) {
        case "class":
          !(function (e, t, n) {
            const r = e._vtc;
            r && (t = (t ? [t, ...r] : [...r]).join(" ")),
              null == t
                ? e.removeAttribute("class")
                : n
                ? e.setAttribute("class", t)
                : (e.className = t);
          })(e, o, i);
          break;
        case "style":
          !(function (e, t, n) {
            const r = e.style;
            if (n)
              if (k(n)) {
                if (t !== n) {
                  const t = r.display;
                  (r.cssText = n), "_vod" in e && (r.display = t);
                }
              } else {
                for (const e in n) lo(r, e, n[e]);
                if (t && !k(t)) for (const e in t) null == n[e] && lo(r, e, "");
              }
            else e.removeAttribute("style");
          })(e, r, o);
          break;
        default:
          g(t)
            ? y(t) || go(e, t, 0, o, s)
            : (function (e, t, n, r) {
                if (r)
                  return "innerHTML" === t || !!(t in e && bo.test(t) && O(n));
                if ("spellcheck" === t || "draggable" === t) return !1;
                if ("form" === t) return !1;
                if ("list" === t && "INPUT" === e.tagName) return !1;
                if ("type" === t && "TEXTAREA" === e.tagName) return !1;
                if (bo.test(t) && k(n)) return !1;
                return t in e;
              })(e, t, o, i)
            ? (function (e, t, n, r, o, i, l) {
                if ("innerHTML" === t || "textContent" === t)
                  return r && l(r, o, i), void (e[t] = null == n ? "" : n);
                if ("value" === t && "PROGRESS" !== e.tagName) {
                  e._value = n;
                  const r = null == n ? "" : n;
                  return (
                    e.value !== r && (e.value = r),
                    void (null == n && e.removeAttribute(t))
                  );
                }
                if ("" === n || null == n) {
                  const r = typeof e[t];
                  if ("" === n && "boolean" === r) return void (e[t] = !0);
                  if (null == n && "string" === r)
                    return (e[t] = ""), void e.removeAttribute(t);
                  if ("number" === r) {
                    try {
                      e[t] = 0;
                    } catch (s) {}
                    return void e.removeAttribute(t);
                  }
                }
                try {
                  e[t] = n;
                } catch (a) {}
              })(e, t, o, l, s, a, u)
            : ("true-value" === t
                ? (e._trueValue = o)
                : "false-value" === t && (e._falseValue = o),
              (function (e, t, r, o, i) {
                if (o && t.startsWith("xlink:"))
                  null == r
                    ? e.removeAttributeNS(uo, t.slice(6, t.length))
                    : e.setAttributeNS(uo, t, r);
                else {
                  const o = n(t);
                  null == r || (o && !1 === r)
                    ? e.removeAttribute(t)
                    : e.setAttribute(t, o ? "" : r);
                }
              })(e, t, o, i));
      }
    },
    forcePatchProp: (e, t) => "value" === t,
  },
  oo
);
let Vo;
const Do = (...e) => {
  const t = (Vo || (Vo = rr(Lo))).createApp(...e),
    { mount: n } = t;
  return (
    (t.mount = (e) => {
      const r = (function (e) {
        if (k(e)) {
          return document.querySelector(e);
        }
        return e;
      })(
        /*!
         * vue-router v4.0.10
         * (c) 2021 Eduardo San Martin Morote
         * @license MIT
         */ e
      );
      if (!r) return;
      const o = t._component;
      O(o) || o.render || o.template || (o.template = r.innerHTML),
        (r.innerHTML = "");
      const i = n(r, !1, r instanceof SVGElement);
      return (
        r instanceof Element &&
          (r.removeAttribute("v-cloak"), r.setAttribute("data-v-app", "")),
        i
      );
    }),
    t
  );
};
const Io = "function" == typeof Symbol && "symbol" == typeof Symbol.toStringTag,
  No = (e) => (Io ? Symbol(e) : "_vr_" + e),
  Uo = No("rvlm"),
  Bo = No("rvd"),
  zo = No("r"),
  Ho = No("rl"),
  qo = No("rvl"),
  Wo = "undefined" != typeof window;
const Go = Object.assign;
function Ko(e, t) {
  const n = {};
  for (const r in t) {
    const o = t[r];
    n[r] = Array.isArray(o) ? o.map(e) : e(o);
  }
  return n;
}
let Xo = () => {};
const Yo = /\/$/;
function Jo(e, t, n = "/") {
  let r,
    o = {},
    i = "",
    l = "";
  const s = t.indexOf("?"),
    a = t.indexOf("#", s > -1 ? s : 0);
  return (
    s > -1 &&
      ((r = t.slice(0, s)),
      (i = t.slice(s + 1, a > -1 ? a : t.length)),
      (o = e(i))),
    a > -1 && ((r = r || t.slice(0, a)), (l = t.slice(a, t.length))),
    (r = (function (e, t) {
      if (e.startsWith("/")) return e;
      if (!e) return t;
      const n = t.split("/"),
        r = e.split("/");
      let o,
        i,
        l = n.length - 1;
      for (o = 0; o < r.length; o++)
        if (((i = r[o]), 1 !== l && "." !== i)) {
          if (".." !== i) break;
          l--;
        }
      return (
        n.slice(0, l).join("/") +
        "/" +
        r.slice(o - (o === r.length ? 1 : 0)).join("/")
      );
    })(null != r ? r : t, n)),
    { fullPath: r + (i && "?") + i + l, path: r, query: o, hash: l }
  );
}
function Qo(e, t) {
  return t && e.toLowerCase().startsWith(t.toLowerCase())
    ? e.slice(t.length) || "/"
    : e;
}
function Zo(e, t) {
  return (e.aliasOf || e) === (t.aliasOf || t);
}
function ei(e, t) {
  if (Object.keys(e).length !== Object.keys(t).length) return !1;
  for (let n in e) if (!ti(e[n], t[n])) return !1;
  return !0;
}
function ti(e, t) {
  return Array.isArray(e) ? ni(e, t) : Array.isArray(t) ? ni(t, e) : e === t;
}
function ni(e, t) {
  return Array.isArray(t)
    ? e.length === t.length && e.every((e, n) => e === t[n])
    : 1 === e.length && e[0] === t;
}
var ri, oi, ii, li;
function si(e) {
  if (!e)
    if (Wo) {
      const t = document.querySelector("base");
      e = (e = (t && t.getAttribute("href")) || "/").replace(
        /^\w+:\/\/[^\/]+/,
        ""
      );
    } else e = "/";
  return "/" !== e[0] && "#" !== e[0] && (e = "/" + e), e.replace(Yo, "");
}
((oi = ri || (ri = {})).pop = "pop"),
  (oi.push = "push"),
  ((li = ii || (ii = {})).back = "back"),
  (li.forward = "forward"),
  (li.unknown = "");
const ai = /^[^#]+#/;
function ui(e, t) {
  return e.replace(ai, "#") + t;
}
const ci = () => ({ left: window.pageXOffset, top: window.pageYOffset });
function fi(e) {
  let t;
  if ("el" in e) {
    let n = e.el;
    const r = "string" == typeof n && n.startsWith("#"),
      o =
        "string" == typeof n
          ? r
            ? document.getElementById(n.slice(1))
            : document.querySelector(n)
          : n;
    if (!o) return;
    t = (function (e, t) {
      const n = document.documentElement.getBoundingClientRect(),
        r = e.getBoundingClientRect();
      return {
        behavior: t.behavior,
        left: r.left - n.left - (t.left || 0),
        top: r.top - n.top - (t.top || 0),
      };
    })(o, e);
  } else t = e;
  "scrollBehavior" in document.documentElement.style
    ? window.scrollTo(t)
    : window.scrollTo(
        null != t.left ? t.left : window.pageXOffset,
        null != t.top ? t.top : window.pageYOffset
      );
}
function di(e, t) {
  return (history.state ? history.state.position - t : -1) + e;
}
const pi = new Map();
function hi(e, t) {
  const { pathname: n, search: r, hash: o } = t,
    i = e.indexOf("#");
  if (i > -1) {
    let t = o.includes(e.slice(i)) ? e.slice(i).length : 1,
      n = o.slice(t);
    return "/" !== n[0] && (n = "/" + n), Qo(n, "");
  }
  return Qo(n, e) + r + o;
}
function vi(e, t, n, r = !1, o = !1) {
  return {
    back: e,
    current: t,
    forward: n,
    replaced: r,
    position: window.history.length,
    scroll: o ? ci() : null,
  };
}
function mi(e) {
  const { history: t, location: n } = window;
  let r = { value: hi(e, n) },
    o = { value: t.state };
  function i(r, i, l) {
    const s = e.indexOf("#"),
      a =
        s > -1
          ? (n.host && document.querySelector("base") ? e : e.slice(s)) + r
          : location.protocol + "//" + location.host + e + r;
    try {
      t[l ? "replaceState" : "pushState"](i, "", a), (o.value = i);
    } catch (u) {
      console.error(u), n[l ? "replace" : "assign"](a);
    }
  }
  return (
    o.value ||
      i(
        r.value,
        {
          back: null,
          current: r.value,
          forward: null,
          position: t.length - 1,
          replaced: !0,
          scroll: null,
        },
        !0
      ),
    {
      location: r,
      state: o,
      push: function (e, n) {
        const l = Go({}, o.value, t.state, { forward: e, scroll: ci() });
        i(l.current, l, !0),
          i(
            e,
            Go({}, vi(r.value, e, null), { position: l.position + 1 }, n),
            !1
          ),
          (r.value = e);
      },
      replace: function (e, n) {
        i(
          e,
          Go({}, t.state, vi(o.value.back, e, o.value.forward, !0), n, {
            position: o.value.position,
          }),
          !0
        ),
          (r.value = e);
      },
    }
  );
}
function gi(e) {
  const t = mi((e = si(e))),
    n = (function (e, t, n, r) {
      let o = [],
        i = [],
        l = null;
      const s = ({ state: i }) => {
        const s = hi(e, location),
          a = n.value,
          u = t.value;
        let c = 0;
        if (i) {
          if (((n.value = s), (t.value = i), l && l === a))
            return void (l = null);
          c = u ? i.position - u.position : 0;
        } else r(s);
        o.forEach((e) => {
          e(n.value, a, {
            delta: c,
            type: ri.pop,
            direction: c ? (c > 0 ? ii.forward : ii.back) : ii.unknown,
          });
        });
      };
      function a() {
        const { history: e } = window;
        e.state && e.replaceState(Go({}, e.state, { scroll: ci() }), "");
      }
      return (
        window.addEventListener("popstate", s),
        window.addEventListener("beforeunload", a),
        {
          pauseListeners: function () {
            l = n.value;
          },
          listen: function (e) {
            o.push(e);
            const t = () => {
              const t = o.indexOf(e);
              t > -1 && o.splice(t, 1);
            };
            return i.push(t), t;
          },
          destroy: function () {
            for (const e of i) e();
            (i = []),
              window.removeEventListener("popstate", s),
              window.removeEventListener("beforeunload", a);
          },
        }
      );
    })(e, t.state, t.location, t.replace);
  const r = Go(
    {
      location: "",
      base: e,
      go: function (e, t = !0) {
        t || n.pauseListeners(), history.go(e);
      },
      createHref: ui.bind(null, e),
    },
    t,
    n
  );
  return (
    Object.defineProperty(r, "location", {
      enumerable: !0,
      get: () => t.location.value,
    }),
    Object.defineProperty(r, "state", {
      enumerable: !0,
      get: () => t.state.value,
    }),
    r
  );
}
function yi(e) {
  return "string" == typeof e || "symbol" == typeof e;
}
const bi = {
    path: "/",
    name: void 0,
    params: {},
    query: {},
    hash: "",
    fullPath: "/",
    matched: [],
    meta: {},
    redirectedFrom: void 0,
  },
  wi = No("nf");
var xi, _i;
function Si(e, t) {
  return Go(new Error(), { type: e, [wi]: !0 }, t);
}
function Ei(e, t) {
  return e instanceof Error && wi in e && (null == t || !!(e.type & t));
}
((_i = xi || (xi = {}))[(_i.aborted = 4)] = "aborted"),
  (_i[(_i.cancelled = 8)] = "cancelled"),
  (_i[(_i.duplicated = 16)] = "duplicated");
const Ci = { sensitive: !1, strict: !1, start: !0, end: !0 },
  Ai = /[.+*?^${}()[\]/\\]/g;
function Oi(e, t) {
  let n = 0;
  for (; n < e.length && n < t.length; ) {
    const r = t[n] - e[n];
    if (r) return r;
    n++;
  }
  return e.length < t.length
    ? 1 === e.length && 80 === e[0]
      ? -1
      : 1
    : e.length > t.length
    ? 1 === t.length && 80 === t[0]
      ? 1
      : -1
    : 0;
}
function ki(e, t) {
  let n = 0;
  const r = e.score,
    o = t.score;
  for (; n < r.length && n < o.length; ) {
    const e = Oi(r[n], o[n]);
    if (e) return e;
    n++;
  }
  return o.length - r.length;
}
const Pi = { type: 0, value: "" },
  Ri = /[a-zA-Z0-9_]/;
function Fi(e, t, n) {
  const r = (function (e, t) {
      const n = Go({}, Ci, t);
      let r = [],
        o = n.start ? "^" : "";
      const i = [];
      for (const a of e) {
        const e = a.length ? [] : [90];
        n.strict && !a.length && (o += "/");
        for (let t = 0; t < a.length; t++) {
          const r = a[t];
          let l = 40 + (n.sensitive ? 0.25 : 0);
          if (0 === r.type)
            t || (o += "/"), (o += r.value.replace(Ai, "\\$&")), (l += 40);
          else if (1 === r.type) {
            const { value: e, repeatable: n, optional: u, regexp: c } = r;
            i.push({ name: e, repeatable: n, optional: u });
            const f = c || "[^/]+?";
            if ("[^/]+?" !== f) {
              l += 10;
              try {
                new RegExp(`(${f})`);
              } catch (s) {
                throw new Error(
                  `Invalid custom RegExp for param "${e}" (${f}): ` + s.message
                );
              }
            }
            let d = n ? `((?:${f})(?:/(?:${f}))*)` : `(${f})`;
            t || (d = u && a.length < 2 ? `(?:/${d})` : "/" + d),
              u && (d += "?"),
              (o += d),
              (l += 20),
              u && (l += -8),
              n && (l += -20),
              ".*" === f && (l += -50);
          }
          e.push(l);
        }
        r.push(e);
      }
      if (n.strict && n.end) {
        const e = r.length - 1;
        r[e][r[e].length - 1] += 0.7000000000000001;
      }
      n.strict || (o += "/?"),
        n.end ? (o += "$") : n.strict && (o += "(?:/|$)");
      const l = new RegExp(o, n.sensitive ? "" : "i");
      return {
        re: l,
        score: r,
        keys: i,
        parse: function (e) {
          const t = e.match(l),
            n = {};
          if (!t) return null;
          for (let r = 1; r < t.length; r++) {
            const e = t[r] || "",
              o = i[r - 1];
            n[o.name] = e && o.repeatable ? e.split("/") : e;
          }
          return n;
        },
        stringify: function (t) {
          let n = "",
            r = !1;
          for (const o of e) {
            (r && n.endsWith("/")) || (n += "/"), (r = !1);
            for (const e of o)
              if (0 === e.type) n += e.value;
              else if (1 === e.type) {
                const { value: i, repeatable: l, optional: s } = e,
                  a = i in t ? t[i] : "";
                if (Array.isArray(a) && !l)
                  throw new Error(
                    `Provided param "${i}" is an array but it is not repeatable (* or + modifiers)`
                  );
                const u = Array.isArray(a) ? a.join("/") : a;
                if (!u) {
                  if (!s) throw new Error(`Missing required param "${i}"`);
                  o.length < 2 &&
                    (n.endsWith("/") ? (n = n.slice(0, -1)) : (r = !0));
                }
                n += u;
              }
          }
          return n;
        },
      };
    })(
      (function (e) {
        if (!e) return [[]];
        if ("/" === e) return [[Pi]];
        if (!e.startsWith("/")) throw new Error(`Invalid path "${e}"`);
        function t(e) {
          throw new Error(`ERR (${n})/"${u}": ${e}`);
        }
        let n = 0,
          r = n;
        const o = [];
        let i;
        function l() {
          i && o.push(i), (i = []);
        }
        let s,
          a = 0,
          u = "",
          c = "";
        function f() {
          u &&
            (0 === n
              ? i.push({ type: 0, value: u })
              : 1 === n || 2 === n || 3 === n
              ? (i.length > 1 &&
                  ("*" === s || "+" === s) &&
                  t(
                    `A repeatable param (${u}) must be alone in its segment. eg: '/:ids+.`
                  ),
                i.push({
                  type: 1,
                  value: u,
                  regexp: c,
                  repeatable: "*" === s || "+" === s,
                  optional: "*" === s || "?" === s,
                }))
              : t("Invalid state to consume buffer"),
            (u = ""));
        }
        function d() {
          u += s;
        }
        for (; a < e.length; )
          if (((s = e[a++]), "\\" !== s || 2 === n))
            switch (n) {
              case 0:
                "/" === s ? (u && f(), l()) : ":" === s ? (f(), (n = 1)) : d();
                break;
              case 4:
                d(), (n = r);
                break;
              case 1:
                "(" === s
                  ? (n = 2)
                  : Ri.test(s)
                  ? d()
                  : (f(), (n = 0), "*" !== s && "?" !== s && "+" !== s && a--);
                break;
              case 2:
                ")" === s
                  ? "\\" == c[c.length - 1]
                    ? (c = c.slice(0, -1) + s)
                    : (n = 3)
                  : (c += s);
                break;
              case 3:
                f(),
                  (n = 0),
                  "*" !== s && "?" !== s && "+" !== s && a--,
                  (c = "");
                break;
              default:
                t("Unknown state");
            }
          else (r = n), (n = 4);
        return (
          2 === n && t(`Unfinished custom RegExp for param "${u}"`), f(), l(), o
        );
      })(e.path),
      n
    ),
    o = Go(r, { record: e, parent: t, children: [], alias: [] });
  return t && !o.record.aliasOf == !t.record.aliasOf && t.children.push(o), o;
}
function ji(e, t) {
  const n = [],
    r = new Map();
  function o(e, n, r) {
    let s = !r,
      a = (function (e) {
        return {
          path: e.path,
          redirect: e.redirect,
          name: e.name,
          meta: e.meta || {},
          aliasOf: void 0,
          beforeEnter: e.beforeEnter,
          props: Ti(e),
          children: e.children || [],
          instances: {},
          leaveGuards: new Set(),
          updateGuards: new Set(),
          enterCallbacks: {},
          components:
            "components" in e ? e.components || {} : { default: e.component },
        };
      })(e);
    a.aliasOf = r && r.record;
    const u = Li(t, e),
      c = [a];
    if ("alias" in e) {
      const t = "string" == typeof e.alias ? [e.alias] : e.alias;
      for (const e of t)
        c.push(
          Go({}, a, {
            components: r ? r.record.components : a.components,
            path: e,
            aliasOf: r ? r.record : a,
          })
        );
    }
    let f, d;
    for (const t of c) {
      let { path: c } = t;
      if (n && "/" !== c[0]) {
        let e = n.record.path,
          r = "/" === e[e.length - 1] ? "" : "/";
        t.path = n.record.path + (c && r + c);
      }
      if (
        ((f = Fi(t, n, u)),
        r
          ? r.alias.push(f)
          : ((d = d || f),
            d !== f && d.alias.push(f),
            s && e.name && !$i(f) && i(e.name)),
        "children" in a)
      ) {
        let e = a.children;
        for (let t = 0; t < e.length; t++) o(e[t], f, r && r.children[t]);
      }
      (r = r || f), l(f);
    }
    return d
      ? () => {
          i(d);
        }
      : Xo;
  }
  function i(e) {
    if (yi(e)) {
      const t = r.get(e);
      t &&
        (r.delete(e),
        n.splice(n.indexOf(t), 1),
        t.children.forEach(i),
        t.alias.forEach(i));
    } else {
      let t = n.indexOf(e);
      t > -1 &&
        (n.splice(t, 1),
        e.record.name && r.delete(e.record.name),
        e.children.forEach(i),
        e.alias.forEach(i));
    }
  }
  function l(e) {
    let t = 0;
    for (; t < n.length && ki(e, n[t]) >= 0; ) t++;
    n.splice(t, 0, e), e.record.name && !$i(e) && r.set(e.record.name, e);
  }
  return (
    (t = Li({ strict: !1, end: !0, sensitive: !1 }, t)),
    e.forEach((e) => o(e)),
    {
      addRoute: o,
      resolve: function (e, t) {
        let o,
          i,
          l,
          s = {};
        if ("name" in e && e.name) {
          if (((o = r.get(e.name)), !o)) throw Si(1, { location: e });
          (l = o.record.name),
            (s = Go(
              (function (e, t) {
                let n = {};
                for (let r of t) r in e && (n[r] = e[r]);
                return n;
              })(
                t.params,
                o.keys.filter((e) => !e.optional).map((e) => e.name)
              ),
              e.params
            )),
            (i = o.stringify(s));
        } else if ("path" in e)
          (i = e.path),
            (o = n.find((e) => e.re.test(i))),
            o && ((s = o.parse(i)), (l = o.record.name));
        else {
          if (
            ((o = t.name ? r.get(t.name) : n.find((e) => e.re.test(t.path))),
            !o)
          )
            throw Si(1, { location: e, currentLocation: t });
          (l = o.record.name),
            (s = Go({}, t.params, e.params)),
            (i = o.stringify(s));
        }
        const a = [];
        let u = o;
        for (; u; ) a.unshift(u.record), (u = u.parent);
        return { name: l, path: i, params: s, matched: a, meta: Mi(a) };
      },
      removeRoute: i,
      getRoutes: function () {
        return n;
      },
      getRecordMatcher: function (e) {
        return r.get(e);
      },
    }
  );
}
function Ti(e) {
  const t = {},
    n = e.props || !1;
  if ("component" in e) t.default = n;
  else for (let r in e.components) t[r] = "boolean" == typeof n ? n : n[r];
  return t;
}
function $i(e) {
  for (; e; ) {
    if (e.record.aliasOf) return !0;
    e = e.parent;
  }
  return !1;
}
function Mi(e) {
  return e.reduce((e, t) => Go(e, t.meta), {});
}
function Li(e, t) {
  let n = {};
  for (let r in e) n[r] = r in t ? t[r] : e[r];
  return n;
}
const Vi = /#/g,
  Di = /&/g,
  Ii = /\//g,
  Ni = /=/g,
  Ui = /\?/g,
  Bi = /\+/g,
  zi = /%5B/g,
  Hi = /%5D/g,
  qi = /%5E/g,
  Wi = /%60/g,
  Gi = /%7B/g,
  Ki = /%7C/g,
  Xi = /%7D/g,
  Yi = /%20/g;
function Ji(e) {
  return encodeURI("" + e)
    .replace(Ki, "|")
    .replace(zi, "[")
    .replace(Hi, "]");
}
function Qi(e) {
  return Ji(e)
    .replace(Bi, "%2B")
    .replace(Yi, "+")
    .replace(Vi, "%23")
    .replace(Di, "%26")
    .replace(Wi, "`")
    .replace(Gi, "{")
    .replace(Xi, "}")
    .replace(qi, "^");
}
function Zi(e) {
  return (function (e) {
    return Ji(e).replace(Vi, "%23").replace(Ui, "%3F");
  })(e).replace(Ii, "%2F");
}
function el(e) {
  try {
    return decodeURIComponent("" + e);
  } catch (t) {}
  return "" + e;
}
function tl(e) {
  const t = {};
  if ("" === e || "?" === e) return t;
  const n = ("?" === e[0] ? e.slice(1) : e).split("&");
  for (let r = 0; r < n.length; ++r) {
    const e = n[r].replace(Bi, " ");
    let o = e.indexOf("="),
      i = el(o < 0 ? e : e.slice(0, o)),
      l = o < 0 ? null : el(e.slice(o + 1));
    if (i in t) {
      let e = t[i];
      Array.isArray(e) || (e = t[i] = [e]), e.push(l);
    } else t[i] = l;
  }
  return t;
}
function nl(e) {
  let t = "";
  for (let n in e) {
    const r = e[n];
    if (((n = Qi(n).replace(Ni, "%3D")), null == r)) {
      void 0 !== r && (t += (t.length ? "&" : "") + n);
      continue;
    }
    (Array.isArray(r) ? r.map((e) => e && Qi(e)) : [r && Qi(r)]).forEach(
      (e) => {
        void 0 !== e &&
          ((t += (t.length ? "&" : "") + n), null != e && (t += "=" + e));
      }
    );
  }
  return t;
}
function rl(e) {
  const t = {};
  for (let n in e) {
    let r = e[n];
    void 0 !== r &&
      (t[n] = Array.isArray(r)
        ? r.map((e) => (null == e ? null : "" + e))
        : null == r
        ? r
        : "" + r);
  }
  return t;
}
function ol() {
  let e = [];
  return {
    add: function (t) {
      return (
        e.push(t),
        () => {
          const n = e.indexOf(t);
          n > -1 && e.splice(n, 1);
        }
      );
    },
    list: () => e,
    reset: function () {
      e = [];
    },
  };
}
function il(e, t, n, r, o) {
  const i = r && (r.enterCallbacks[o] = r.enterCallbacks[o] || []);
  return () =>
    new Promise((l, s) => {
      const a = (e) => {
          var a;
          !1 === e
            ? s(Si(4, { from: n, to: t }))
            : e instanceof Error
            ? s(e)
            : "string" == typeof (a = e) || (a && "object" == typeof a)
            ? s(Si(2, { from: t, to: e }))
            : (i &&
                r.enterCallbacks[o] === i &&
                "function" == typeof e &&
                i.push(e),
              l());
        },
        u = e.call(r && r.instances[o], t, n, a);
      let c = Promise.resolve(u);
      e.length < 3 && (c = c.then(a)), c.catch((e) => s(e));
    });
}
function ll(e, t, n, r) {
  const o = [];
  for (const l of e)
    for (const e in l.components) {
      let s = l.components[e];
      if ("beforeRouteEnter" === t || l.instances[e])
        if (
          "object" == typeof (i = s) ||
          "displayName" in i ||
          "props" in i ||
          "__vccOpts" in i
        ) {
          const i = (s.__vccOpts || s)[t];
          i && o.push(il(i, n, r, l, e));
        } else {
          let i = s();
          o.push(() =>
            i.then((o) => {
              if (!o)
                return Promise.reject(
                  new Error(`Couldn't resolve component "${e}" at "${l.path}"`)
                );
              const i =
                (s = o).__esModule || (Io && "Module" === s[Symbol.toStringTag])
                  ? o.default
                  : o;
              var s;
              l.components[e] = i;
              const a = (i.__vccOpts || i)[t];
              return a && il(a, n, r, l, e)();
            })
          );
        }
    }
  var i;
  return o;
}
function sl(e) {
  const t = Jt(zo),
    n = Jt(Ho),
    r = Zr(() => t.resolve(at(e.to))),
    o = Zr(() => {
      let { matched: e } = r.value,
        { length: t } = e;
      const o = e[t - 1];
      let i = n.matched;
      if (!o || !i.length) return -1;
      let l = i.findIndex(Zo.bind(null, o));
      if (l > -1) return l;
      let s = ul(e[t - 2]);
      return t > 1 && ul(o) === s && i[i.length - 1].path !== s
        ? i.findIndex(Zo.bind(null, e[t - 2]))
        : l;
    }),
    i = Zr(
      () =>
        o.value > -1 &&
        (function (e, t) {
          for (let n in t) {
            let r = t[n],
              o = e[n];
            if ("string" == typeof r) {
              if (r !== o) return !1;
            } else if (
              !Array.isArray(o) ||
              o.length !== r.length ||
              r.some((e, t) => e !== o[t])
            )
              return !1;
          }
          return !0;
        })(n.params, r.value.params)
    ),
    l = Zr(
      () =>
        o.value > -1 &&
        o.value === n.matched.length - 1 &&
        ei(n.params, r.value.params)
    );
  return {
    route: r,
    href: Zr(() => r.value.href),
    isActive: i,
    isExactActive: l,
    navigate: function (n = {}) {
      return (function (e) {
        if (e.metaKey || e.altKey || e.ctrlKey || e.shiftKey) return;
        if (e.defaultPrevented) return;
        if (void 0 !== e.button && 0 !== e.button) return;
        if (e.currentTarget && e.currentTarget.getAttribute) {
          const t = e.currentTarget.getAttribute("target");
          if (/\b_blank\b/i.test(t)) return;
        }
        e.preventDefault && e.preventDefault();
        return !0;
      })(n)
        ? t[at(e.replace) ? "replace" : "push"](at(e.to)).catch(Xo)
        : Promise.resolve();
    },
  };
}
const al = ln({
  name: "RouterLink",
  props: {
    to: { type: [String, Object], required: !0 },
    replace: Boolean,
    activeClass: String,
    exactActiveClass: String,
    custom: Boolean,
    ariaCurrentValue: { type: String, default: "page" },
  },
  useLink: sl,
  setup(e, { slots: t }) {
    const n = Xe(sl(e)),
      { options: r } = Jt(zo),
      o = Zr(() => ({
        [cl(e.activeClass, r.linkActiveClass, "router-link-active")]:
          n.isActive,
        [cl(
          e.exactActiveClass,
          r.linkExactActiveClass,
          "router-link-exact-active"
        )]: n.isExactActive,
      }));
    return () => {
      const r = t.default && t.default(n);
      return e.custom
        ? r
        : eo(
            "a",
            {
              "aria-current": n.isExactActive ? e.ariaCurrentValue : null,
              href: n.href,
              onClick: n.navigate,
              class: o.value,
            },
            r
          );
    };
  },
});
function ul(e) {
  return e ? (e.aliasOf ? e.aliasOf.path : e.path) : "";
}
const cl = (e, t, n) => (null != e ? e : null != t ? t : n);
function fl(e, t) {
  if (!e) return null;
  const n = e(t);
  return 1 === n.length ? n[0] : n;
}
const dl = ln({
  name: "RouterView",
  inheritAttrs: !1,
  props: { name: { type: String, default: "default" }, route: Object },
  setup(e, { attrs: t, slots: n }) {
    const r = Jt(qo),
      o = Zr(() => e.route || r.value),
      i = Jt(Bo, 0),
      l = Zr(() => o.value.matched[i]);
    Yt(Bo, i + 1), Yt(Uo, l), Yt(qo, o);
    const s = it();
    return (
      en(
        () => [s.value, l.value, e.name],
        ([e, t, n], [r, o, i]) => {
          t &&
            ((t.instances[n] = e),
            o &&
              o !== t &&
              e &&
              e === r &&
              (t.leaveGuards.size || (t.leaveGuards = o.leaveGuards),
              t.updateGuards.size || (t.updateGuards = o.updateGuards))),
            !e ||
              !t ||
              (o && Zo(t, o) && r) ||
              (t.enterCallbacks[n] || []).forEach((t) => t(e));
        },
        { flush: "post" }
      ),
      () => {
        const r = o.value,
          i = l.value,
          a = i && i.components[e.name],
          u = e.name;
        if (!a) return fl(n.default, { Component: a, route: r });
        const c = i.props[e.name],
          f = c
            ? !0 === c
              ? r.params
              : "function" == typeof c
              ? c(r)
              : c
            : null,
          d = eo(
            a,
            Go({}, f, t, {
              onVnodeUnmounted: (e) => {
                e.component.isUnmounted && (i.instances[u] = null);
              },
              ref: s,
            })
          );
        return fl(n.default, { Component: d, route: r }) || d;
      }
    );
  },
});
function pl(e) {
  const t = ji(e.routes, e);
  let n = e.parseQuery || tl,
    r = e.stringifyQuery || nl,
    o = e.history;
  const i = ol(),
    l = ol(),
    s = ol(),
    a = st(bi, !0);
  let u = bi;
  Wo &&
    e.scrollBehavior &&
    "scrollRestoration" in history &&
    (history.scrollRestoration = "manual");
  const c = Ko.bind(null, (e) => "" + e),
    f = Ko.bind(null, Zi),
    d = Ko.bind(null, el);
  function p(e, i) {
    if (((i = Go({}, i || a.value)), "string" == typeof e)) {
      let r = Jo(n, e, i.path),
        l = t.resolve({ path: r.path }, i),
        s = o.createHref(r.fullPath);
      return Go(r, l, {
        params: d(l.params),
        hash: el(r.hash),
        redirectedFrom: void 0,
        href: s,
      });
    }
    let l;
    "path" in e
      ? (l = Go({}, e, { path: Jo(n, e.path, i.path).path }))
      : ((l = Go({}, e, { params: f(e.params) })), (i.params = f(i.params)));
    let s = t.resolve(l, i);
    const u = e.hash || "";
    s.params = c(d(s.params));
    const p = (function (e, t) {
      let n = t.query ? e(t.query) : "";
      return t.path + (n && "?") + n + (t.hash || "");
    })(
      r,
      Go({}, e, {
        hash:
          ((h = u), Ji(h).replace(Gi, "{").replace(Xi, "}").replace(qi, "^")),
        path: s.path,
      })
    );
    var h;
    let v = o.createHref(p);
    return Go(
      { fullPath: p, hash: u, query: r === nl ? rl(e.query) : e.query },
      s,
      { redirectedFrom: void 0, href: v }
    );
  }
  function h(e) {
    return "string" == typeof e ? Jo(n, e, a.value.path) : Go({}, e);
  }
  function v(e, t) {
    if (u !== e) return Si(8, { from: t, to: e });
  }
  function m(e) {
    return y(e);
  }
  function g(e) {
    const t = e.matched[e.matched.length - 1];
    if (t && t.redirect) {
      const { redirect: n } = t;
      let r = "function" == typeof n ? n(e) : n;
      return (
        "string" == typeof r &&
          ((r = r.includes("?") || r.includes("#") ? (r = h(r)) : { path: r }),
          (r.params = {})),
        Go({ query: e.query, hash: e.hash, params: e.params }, r)
      );
    }
  }
  function y(e, t) {
    const n = (u = p(e)),
      o = a.value,
      i = e.state,
      l = e.force,
      s = !0 === e.replace,
      c = g(n);
    if (c) return y(Go(h(c), { state: i, force: l, replace: s }), t || n);
    const f = n;
    let d;
    return (
      (f.redirectedFrom = t),
      !l &&
        (function (e, t, n) {
          let r = t.matched.length - 1,
            o = n.matched.length - 1;
          return (
            r > -1 &&
            r === o &&
            Zo(t.matched[r], n.matched[o]) &&
            ei(t.params, n.params) &&
            e(t.query) === e(n.query) &&
            t.hash === n.hash
          );
        })(r, o, n) &&
        ((d = Si(16, { to: f, from: o })), R(o, o, !0, !1)),
      (d ? Promise.resolve(d) : w(f, o))
        .catch((e) => (Ei(e) ? e : k(e, f, o)))
        .then((e) => {
          if (e) {
            if (Ei(e, 2))
              return y(Go(h(e.to), { state: i, force: l, replace: s }), t || f);
          } else e = _(f, o, !0, s, i);
          return x(f, o, e), e;
        })
    );
  }
  function b(e, t) {
    const n = v(e, t);
    return n ? Promise.reject(n) : Promise.resolve();
  }
  function w(e, t) {
    let n;
    const [r, o, s] = (function (e, t) {
      const n = [],
        r = [],
        o = [],
        i = Math.max(t.matched.length, e.matched.length);
      for (let l = 0; l < i; l++) {
        const i = t.matched[l];
        i && (e.matched.find((e) => Zo(e, i)) ? r.push(i) : n.push(i));
        const s = e.matched[l];
        s && (t.matched.find((e) => Zo(e, s)) || o.push(s));
      }
      return [n, r, o];
    })(e, t);
    n = ll(r.reverse(), "beforeRouteLeave", e, t);
    for (const i of r)
      i.leaveGuards.forEach((r) => {
        n.push(il(r, e, t));
      });
    const a = b.bind(null, e, t);
    return (
      n.push(a),
      hl(n)
        .then(() => {
          n = [];
          for (const r of i.list()) n.push(il(r, e, t));
          return n.push(a), hl(n);
        })
        .then(() => {
          n = ll(o, "beforeRouteUpdate", e, t);
          for (const r of o)
            r.updateGuards.forEach((r) => {
              n.push(il(r, e, t));
            });
          return n.push(a), hl(n);
        })
        .then(() => {
          n = [];
          for (const r of e.matched)
            if (r.beforeEnter && !t.matched.includes(r))
              if (Array.isArray(r.beforeEnter))
                for (const o of r.beforeEnter) n.push(il(o, e, t));
              else n.push(il(r.beforeEnter, e, t));
          return n.push(a), hl(n);
        })
        .then(
          () => (
            e.matched.forEach((e) => (e.enterCallbacks = {})),
            (n = ll(s, "beforeRouteEnter", e, t)),
            n.push(a),
            hl(n)
          )
        )
        .then(() => {
          n = [];
          for (const r of l.list()) n.push(il(r, e, t));
          return n.push(a), hl(n);
        })
        .catch((e) => (Ei(e, 8) ? e : Promise.reject(e)))
    );
  }
  function x(e, t, n) {
    for (const r of s.list()) r(e, t, n);
  }
  function _(e, t, n, r, i) {
    const l = v(e, t);
    if (l) return l;
    const s = t === bi,
      u = Wo ? history.state : {};
    n &&
      (r || s
        ? o.replace(e.fullPath, Go({ scroll: s && u && u.scroll }, i))
        : o.push(e.fullPath, i)),
      (a.value = e),
      R(e, t, n, s),
      P();
  }
  let S;
  function E() {
    S = o.listen((e, t, n) => {
      let r = p(e);
      const i = g(r);
      if (i) return void y(Go(i, { replace: !0 }), r).catch(Xo);
      u = r;
      const l = a.value;
      var s, c;
      Wo && ((s = di(l.fullPath, n.delta)), (c = ci()), pi.set(s, c)),
        w(r, l)
          .catch((e) =>
            Ei(e, 12)
              ? e
              : Ei(e, 2)
              ? (y(e.to, r)
                  .then((e) => {
                    Ei(e, 20) && !n.delta && n.type === ri.pop && o.go(-1, !1);
                  })
                  .catch(Xo),
                Promise.reject())
              : (n.delta && o.go(-n.delta, !1), k(e, r, l))
          )
          .then((e) => {
            (e = e || _(r, l, !1)) &&
              (n.delta
                ? o.go(-n.delta, !1)
                : n.type === ri.pop && Ei(e, 20) && o.go(-1, !1)),
              x(r, l, e);
          })
          .catch(Xo);
    });
  }
  let C,
    A = ol(),
    O = ol();
  function k(e, t, n) {
    P(e);
    const r = O.list();
    return (
      r.length ? r.forEach((r) => r(e, t, n)) : console.error(e),
      Promise.reject(e)
    );
  }
  function P(e) {
    C ||
      ((C = !0),
      E(),
      A.list().forEach(([t, n]) => (e ? n(e) : t())),
      A.reset());
  }
  function R(t, n, r, o) {
    const { scrollBehavior: i } = e;
    if (!Wo || !i) return Promise.resolve();
    let l =
      (!r &&
        (function (e) {
          const t = pi.get(e);
          return pi.delete(e), t;
        })(di(t.fullPath, 0))) ||
      ((o || !r) && history.state && history.state.scroll) ||
      null;
    return kt()
      .then(() => i(t, n, l))
      .then((e) => e && fi(e))
      .catch((e) => k(e, t, n));
  }
  const F = (e) => o.go(e);
  let j;
  const T = new Set();
  return {
    currentRoute: a,
    addRoute: function (e, n) {
      let r, o;
      return (
        yi(e) ? ((r = t.getRecordMatcher(e)), (o = n)) : (o = e),
        t.addRoute(o, r)
      );
    },
    removeRoute: function (e) {
      let n = t.getRecordMatcher(e);
      n && t.removeRoute(n);
    },
    hasRoute: function (e) {
      return !!t.getRecordMatcher(e);
    },
    getRoutes: function () {
      return t.getRoutes().map((e) => e.record);
    },
    resolve: p,
    options: e,
    push: m,
    replace: function (e) {
      return m(Go(h(e), { replace: !0 }));
    },
    go: F,
    back: () => F(-1),
    forward: () => F(1),
    beforeEach: i.add,
    beforeResolve: l.add,
    afterEach: s.add,
    onError: O.add,
    isReady: function () {
      return C && a.value !== bi
        ? Promise.resolve()
        : new Promise((e, t) => {
            A.add([e, t]);
          });
    },
    install(e) {
      e.component("RouterLink", al),
        e.component("RouterView", dl),
        (e.config.globalProperties.$router = this),
        Object.defineProperty(e.config.globalProperties, "$route", {
          enumerable: !0,
          get: () => at(a),
        }),
        Wo &&
          !j &&
          a.value === bi &&
          ((j = !0), m(o.location).catch((e) => {}));
      const t = {};
      for (let r in bi) t[r] = Zr(() => a.value[r]);
      e.provide(zo, this), e.provide(Ho, Xe(t)), e.provide(qo, a);
      let n = e.unmount;
      T.add(e),
        (e.unmount = function () {
          T.delete(e),
            T.size < 1 && (S(), (a.value = bi), (j = !1), (C = !1)),
            n();
        });
    },
  };
}
function hl(e) {
  return e.reduce((e, t) => e.then(() => t()), Promise.resolve());
}
var vl =
  "undefined" != typeof globalThis
    ? globalThis
    : "undefined" != typeof window
    ? window
    : "undefined" != typeof global
    ? global
    : "undefined" != typeof self
    ? self
    : {};
function ml(e) {
  if (e.__esModule) return e;
  var t = Object.defineProperty({}, "__esModule", { value: !0 });
  return (
    Object.keys(e).forEach(function (n) {
      var r = Object.getOwnPropertyDescriptor(e, n);
      Object.defineProperty(
        t,
        n,
        r.get
          ? r
          : {
              enumerable: !0,
              get: function () {
                return e[n];
              },
            }
      );
    }),
    t
  );
}
var gl = { exports: {} };
!(function (e, t, n) {
  function r(e) {
    var t,
      n = this,
      r =
        ((t = 4022871197),
        function (e) {
          e = String(e);
          for (var n = 0; n < e.length; n++) {
            var r = 0.02519603282416938 * (t += e.charCodeAt(n));
            (r -= t = r >>> 0),
              (t = (r *= t) >>> 0),
              (t += 4294967296 * (r -= t));
          }
          return 2.3283064365386963e-10 * (t >>> 0);
        });
    (n.next = function () {
      var e = 2091639 * n.s0 + 2.3283064365386963e-10 * n.c;
      return (n.s0 = n.s1), (n.s1 = n.s2), (n.s2 = e - (n.c = 0 | e));
    }),
      (n.c = 1),
      (n.s0 = r(" ")),
      (n.s1 = r(" ")),
      (n.s2 = r(" ")),
      (n.s0 -= r(e)),
      n.s0 < 0 && (n.s0 += 1),
      (n.s1 -= r(e)),
      n.s1 < 0 && (n.s1 += 1),
      (n.s2 -= r(e)),
      n.s2 < 0 && (n.s2 += 1),
      (r = null);
  }
  function o(e, t) {
    return (t.c = e.c), (t.s0 = e.s0), (t.s1 = e.s1), (t.s2 = e.s2), t;
  }
  function i(e, t) {
    var n = new r(e),
      i = t && t.state,
      l = n.next;
    return (
      (l.int32 = function () {
        return (4294967296 * n.next()) | 0;
      }),
      (l.double = function () {
        return l() + 11102230246251565e-32 * ((2097152 * l()) | 0);
      }),
      (l.quick = l),
      i &&
        ("object" == typeof i && o(i, n),
        (l.state = function () {
          return o(n, {});
        })),
      l
    );
  }
  t && t.exports ? (t.exports = i) : (this.alea = i);
})(0, gl);
var yl = { exports: {} };
!(function (e, t, n) {
  function r(e) {
    var t = this,
      n = "";
    (t.x = 0),
      (t.y = 0),
      (t.z = 0),
      (t.w = 0),
      (t.next = function () {
        var e = t.x ^ (t.x << 11);
        return (
          (t.x = t.y),
          (t.y = t.z),
          (t.z = t.w),
          (t.w ^= (t.w >>> 19) ^ e ^ (e >>> 8))
        );
      }),
      e === (0 | e) ? (t.x = e) : (n += e);
    for (var r = 0; r < n.length + 64; r++)
      (t.x ^= 0 | n.charCodeAt(r)), t.next();
  }
  function o(e, t) {
    return (t.x = e.x), (t.y = e.y), (t.z = e.z), (t.w = e.w), t;
  }
  function i(e, t) {
    var n = new r(e),
      i = t && t.state,
      l = function () {
        return (n.next() >>> 0) / 4294967296;
      };
    return (
      (l.double = function () {
        do {
          var e =
            ((n.next() >>> 11) + (n.next() >>> 0) / 4294967296) / (1 << 21);
        } while (0 === e);
        return e;
      }),
      (l.int32 = n.next),
      (l.quick = l),
      i &&
        ("object" == typeof i && o(i, n),
        (l.state = function () {
          return o(n, {});
        })),
      l
    );
  }
  t && t.exports ? (t.exports = i) : (this.xor128 = i);
})(0, yl);
var bl = { exports: {} };
!(function (e, t, n) {
  function r(e) {
    var t = this,
      n = "";
    (t.next = function () {
      var e = t.x ^ (t.x >>> 2);
      return (
        (t.x = t.y),
        (t.y = t.z),
        (t.z = t.w),
        (t.w = t.v),
        ((t.d = (t.d + 362437) | 0) + (t.v = t.v ^ (t.v << 4) ^ e ^ (e << 1))) |
          0
      );
    }),
      (t.x = 0),
      (t.y = 0),
      (t.z = 0),
      (t.w = 0),
      (t.v = 0),
      e === (0 | e) ? (t.x = e) : (n += e);
    for (var r = 0; r < n.length + 64; r++)
      (t.x ^= 0 | n.charCodeAt(r)),
        r == n.length && (t.d = (t.x << 10) ^ (t.x >>> 4)),
        t.next();
  }
  function o(e, t) {
    return (
      (t.x = e.x),
      (t.y = e.y),
      (t.z = e.z),
      (t.w = e.w),
      (t.v = e.v),
      (t.d = e.d),
      t
    );
  }
  function i(e, t) {
    var n = new r(e),
      i = t && t.state,
      l = function () {
        return (n.next() >>> 0) / 4294967296;
      };
    return (
      (l.double = function () {
        do {
          var e =
            ((n.next() >>> 11) + (n.next() >>> 0) / 4294967296) / (1 << 21);
        } while (0 === e);
        return e;
      }),
      (l.int32 = n.next),
      (l.quick = l),
      i &&
        ("object" == typeof i && o(i, n),
        (l.state = function () {
          return o(n, {});
        })),
      l
    );
  }
  t && t.exports ? (t.exports = i) : (this.xorwow = i);
})(0, bl);
var wl = { exports: {} };
!(function (e, t, n) {
  function r(e) {
    var t = this;
    (t.next = function () {
      var e,
        n,
        r = t.x,
        o = t.i;
      return (
        (e = r[o]),
        (n = (e ^= e >>> 7) ^ (e << 24)),
        (n ^= (e = r[(o + 1) & 7]) ^ (e >>> 10)),
        (n ^= (e = r[(o + 3) & 7]) ^ (e >>> 3)),
        (n ^= (e = r[(o + 4) & 7]) ^ (e << 7)),
        (e = r[(o + 7) & 7]),
        (n ^= (e ^= e << 13) ^ (e << 9)),
        (r[o] = n),
        (t.i = (o + 1) & 7),
        n
      );
    }),
      (function (e, t) {
        var n,
          r = [];
        if (t === (0 | t)) r[0] = t;
        else
          for (t = "" + t, n = 0; n < t.length; ++n)
            r[7 & n] =
              (r[7 & n] << 15) ^ ((t.charCodeAt(n) + r[(n + 1) & 7]) << 13);
        for (; r.length < 8; ) r.push(0);
        for (n = 0; n < 8 && 0 === r[n]; ++n);
        for (8 == n && (r[7] = -1), e.x = r, e.i = 0, n = 256; n > 0; --n)
          e.next();
      })(t, e);
  }
  function o(e, t) {
    return (t.x = e.x.slice()), (t.i = e.i), t;
  }
  function i(e, t) {
    null == e && (e = +new Date());
    var n = new r(e),
      i = t && t.state,
      l = function () {
        return (n.next() >>> 0) / 4294967296;
      };
    return (
      (l.double = function () {
        do {
          var e =
            ((n.next() >>> 11) + (n.next() >>> 0) / 4294967296) / (1 << 21);
        } while (0 === e);
        return e;
      }),
      (l.int32 = n.next),
      (l.quick = l),
      i &&
        (i.x && o(i, n),
        (l.state = function () {
          return o(n, {});
        })),
      l
    );
  }
  t && t.exports ? (t.exports = i) : (this.xorshift7 = i);
})(0, wl);
var xl = { exports: {} };
!(function (e, t, n) {
  function r(e) {
    var t = this;
    (t.next = function () {
      var e,
        n,
        r = t.w,
        o = t.X,
        i = t.i;
      return (
        (t.w = r = (r + 1640531527) | 0),
        (n = o[(i + 34) & 127]),
        (e = o[(i = (i + 1) & 127)]),
        (n ^= n << 13),
        (e ^= e << 17),
        (n ^= n >>> 15),
        (e ^= e >>> 12),
        (n = o[i] = n ^ e),
        (t.i = i),
        (n + (r ^ (r >>> 16))) | 0
      );
    }),
      (function (e, t) {
        var n,
          r,
          o,
          i,
          l,
          s = [],
          a = 128;
        for (
          t === (0 | t)
            ? ((r = t), (t = null))
            : ((t += "\0"), (r = 0), (a = Math.max(a, t.length))),
            o = 0,
            i = -32;
          i < a;
          ++i
        )
          t && (r ^= t.charCodeAt((i + 32) % t.length)),
            0 === i && (l = r),
            (r ^= r << 10),
            (r ^= r >>> 15),
            (r ^= r << 4),
            (r ^= r >>> 13),
            i >= 0 &&
              ((l = (l + 1640531527) | 0),
              (o = 0 == (n = s[127 & i] ^= r + l) ? o + 1 : 0));
        for (
          o >= 128 && (s[127 & ((t && t.length) || 0)] = -1), o = 127, i = 512;
          i > 0;
          --i
        )
          (r = s[(o + 34) & 127]),
            (n = s[(o = (o + 1) & 127)]),
            (r ^= r << 13),
            (n ^= n << 17),
            (r ^= r >>> 15),
            (n ^= n >>> 12),
            (s[o] = r ^ n);
        (e.w = l), (e.X = s), (e.i = o);
      })(t, e);
  }
  function o(e, t) {
    return (t.i = e.i), (t.w = e.w), (t.X = e.X.slice()), t;
  }
  function i(e, t) {
    null == e && (e = +new Date());
    var n = new r(e),
      i = t && t.state,
      l = function () {
        return (n.next() >>> 0) / 4294967296;
      };
    return (
      (l.double = function () {
        do {
          var e =
            ((n.next() >>> 11) + (n.next() >>> 0) / 4294967296) / (1 << 21);
        } while (0 === e);
        return e;
      }),
      (l.int32 = n.next),
      (l.quick = l),
      i &&
        (i.X && o(i, n),
        (l.state = function () {
          return o(n, {});
        })),
      l
    );
  }
  t && t.exports ? (t.exports = i) : (this.xor4096 = i);
})(0, xl);
var _l = { exports: {} };
!(function (e, t, n) {
  function r(e) {
    var t = this,
      n = "";
    (t.next = function () {
      var e = t.b,
        n = t.c,
        r = t.d,
        o = t.a;
      return (
        (e = (e << 25) ^ (e >>> 7) ^ n),
        (n = (n - r) | 0),
        (r = (r << 24) ^ (r >>> 8) ^ o),
        (o = (o - e) | 0),
        (t.b = e = (e << 20) ^ (e >>> 12) ^ n),
        (t.c = n = (n - r) | 0),
        (t.d = (r << 16) ^ (n >>> 16) ^ o),
        (t.a = (o - e) | 0)
      );
    }),
      (t.a = 0),
      (t.b = 0),
      (t.c = -1640531527),
      (t.d = 1367130551),
      e === Math.floor(e)
        ? ((t.a = (e / 4294967296) | 0), (t.b = 0 | e))
        : (n += e);
    for (var r = 0; r < n.length + 20; r++)
      (t.b ^= 0 | n.charCodeAt(r)), t.next();
  }
  function o(e, t) {
    return (t.a = e.a), (t.b = e.b), (t.c = e.c), (t.d = e.d), t;
  }
  function i(e, t) {
    var n = new r(e),
      i = t && t.state,
      l = function () {
        return (n.next() >>> 0) / 4294967296;
      };
    return (
      (l.double = function () {
        do {
          var e =
            ((n.next() >>> 11) + (n.next() >>> 0) / 4294967296) / (1 << 21);
        } while (0 === e);
        return e;
      }),
      (l.int32 = n.next),
      (l.quick = l),
      i &&
        ("object" == typeof i && o(i, n),
        (l.state = function () {
          return o(n, {});
        })),
      l
    );
  }
  t && t.exports ? (t.exports = i) : (this.tychei = i);
})(0, _l);
var Sl,
  El = { exports: {} },
  Cl = ml(
    Object.freeze({
      __proto__: null,
      [Symbol.toStringTag]: "Module",
      default: {},
    })
  );
(Sl = El),
  (function (e, t, n) {
    var r,
      o = 256,
      i = n.pow(o, 6),
      l = n.pow(2, 52),
      s = 2 * l,
      a = 255;
    function u(a, u, v) {
      var m = [],
        g = p(
          d(
            (u = 1 == u ? { entropy: !0 } : u || {}).entropy
              ? [a, h(t)]
              : null == a
              ? (function () {
                  try {
                    var n;
                    return (
                      r && (n = r.randomBytes)
                        ? (n = n(o))
                        : ((n = new Uint8Array(o)),
                          (e.crypto || e.msCrypto).getRandomValues(n)),
                      h(n)
                    );
                  } catch (s) {
                    var i = e.navigator,
                      l = i && i.plugins;
                    return [+new Date(), e, l, e.screen, h(t)];
                  }
                })()
              : a,
            3
          ),
          m
        ),
        y = new c(m),
        b = function () {
          for (var e = y.g(6), t = i, n = 0; e < l; )
            (e = (e + n) * o), (t *= o), (n = y.g(1));
          for (; e >= s; ) (e /= 2), (t /= 2), (n >>>= 1);
          return (e + n) / t;
        };
      return (
        (b.int32 = function () {
          return 0 | y.g(4);
        }),
        (b.quick = function () {
          return y.g(4) / 4294967296;
        }),
        (b.double = b),
        p(h(y.S), t),
        (
          u.pass ||
          v ||
          function (e, t, r, o) {
            return (
              o &&
                (o.S && f(o, y),
                (e.state = function () {
                  return f(y, {});
                })),
              r ? ((n.random = e), t) : e
            );
          }
        )(b, g, "global" in u ? u.global : this == n, u.state)
      );
    }
    function c(e) {
      var t,
        n = e.length,
        r = this,
        i = 0,
        l = (r.i = r.j = 0),
        s = (r.S = []);
      for (n || (e = [n++]); i < o; ) s[i] = i++;
      for (i = 0; i < o; i++)
        (s[i] = s[(l = a & (l + e[i % n] + (t = s[i])))]), (s[l] = t);
      (r.g = function (e) {
        for (var t, n = 0, i = r.i, l = r.j, s = r.S; e--; )
          (t = s[(i = a & (i + 1))]),
            (n = n * o + s[a & ((s[i] = s[(l = a & (l + t))]) + (s[l] = t))]);
        return (r.i = i), (r.j = l), n;
      })(o);
    }
    function f(e, t) {
      return (t.i = e.i), (t.j = e.j), (t.S = e.S.slice()), t;
    }
    function d(e, t) {
      var n,
        r = [],
        o = typeof e;
      if (t && "object" == o)
        for (n in e)
          try {
            r.push(d(e[n], t - 1));
          } catch (i) {}
      return r.length ? r : "string" == o ? e : e + "\0";
    }
    function p(e, t) {
      for (var n, r = e + "", o = 0; o < r.length; )
        t[a & o] = a & ((n ^= 19 * t[a & o]) + r.charCodeAt(o++));
      return h(t);
    }
    function h(e) {
      return String.fromCharCode.apply(0, e);
    }
    if ((p(n.random(), t), Sl.exports)) {
      Sl.exports = u;
      try {
        r = Cl;
      } catch (v) {}
    } else n.seedrandom = u;
  })("undefined" != typeof self ? self : vl, [], Math);
var Al = gl.exports,
  Ol = yl.exports,
  kl = bl.exports,
  Pl = wl.exports,
  Rl = xl.exports,
  Fl = _l.exports,
  jl = El.exports;
(jl.alea = Al),
  (jl.xor128 = Ol),
  (jl.xorwow = kl),
  (jl.xorshift7 = Pl),
  (jl.xor4096 = Rl),
  (jl.tychei = Fl);
var Tl,
  $l,
  Ml,
  Ll,
  Vl,
  Dl,
  Il = jl;
function Nl(e, t) {
  return (
    wr(),
    Sr(
      "svg",
      {
        xmlns: "http://www.w3.org/2000/svg",
        viewBox: "0 0 20 20",
        fill: "currentColor",
      },
      [
        Pr("path", {
          "fill-rule": "evenodd",
          d: "M11.49 3.17c-.38-1.56-2.6-1.56-2.98 0a1.532 1.532 0 01-2.286.948c-1.372-.836-2.942.734-2.106 2.106.54.886.061 2.042-.947 2.287-1.561.379-1.561 2.6 0 2.978a1.532 1.532 0 01.947 2.287c-.836 1.372.734 2.942 2.106 2.106a1.532 1.532 0 012.287.947c.379 1.561 2.6 1.561 2.978 0a1.533 1.533 0 012.287-.947c1.372.836 2.942-.734 2.106-2.106a1.533 1.533 0 01.947-2.287c1.561-.379 1.561-2.6 0-2.978a1.532 1.532 0 01-.947-2.287c.836-1.372-.734-2.942-2.106-2.106a1.532 1.532 0 01-2.287-.947zM10 13a3 3 0 100-6 3 3 0 000 6z",
          "clip-rule": "evenodd",
        }),
      ]
    )
  );
}
function Ul(e, t) {
  return (
    wr(),
    Sr(
      "svg",
      {
        xmlns: "http://www.w3.org/2000/svg",
        viewBox: "0 0 20 20",
        fill: "currentColor",
      },
      [
        Pr("path", {
          "fill-rule": "evenodd",
          d: "M12.586 4.586a2 2 0 112.828 2.828l-3 3a2 2 0 01-2.828 0 1 1 0 00-1.414 1.414 4 4 0 005.656 0l3-3a4 4 0 00-5.656-5.656l-1.5 1.5a1 1 0 101.414 1.414l1.5-1.5zm-5 5a2 2 0 012.828 0 1 1 0 101.414-1.414 4 4 0 00-5.656 0l-3 3a4 4 0 105.656 5.656l1.5-1.5a1 1 0 10-1.414-1.414l-1.5 1.5a2 2 0 11-2.828-2.828l3-3z",
          "clip-rule": "evenodd",
        }),
      ]
    )
  );
}
function Bl(e, t) {
  return (
    wr(),
    Sr(
      "svg",
      {
        xmlns: "http://www.w3.org/2000/svg",
        viewBox: "0 0 20 20",
        fill: "currentColor",
      },
      [
        Pr("path", {
          "fill-rule": "evenodd",
          d: "M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z",
          "clip-rule": "evenodd",
        }),
      ]
    )
  );
}
function zl(e, t) {
  return (
    wr(),
    Sr(
      "svg",
      {
        xmlns: "http://www.w3.org/2000/svg",
        viewBox: "0 0 20 20",
        fill: "currentColor",
      },
      [
        Pr("path", {
          "fill-rule": "evenodd",
          d: "M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-8-3a1 1 0 00-.867.5 1 1 0 11-1.731-1A3 3 0 0113 8a3.001 3.001 0 01-2 2.83V11a1 1 0 11-2 0v-1a1 1 0 011-1 1 1 0 100-2zm0 8a1 1 0 100-2 1 1 0 000 2z",
          "clip-rule": "evenodd",
        }),
      ]
    )
  );
}
function Hl() {
  return (Hl =
    Object.assign ||
    function (e) {
      for (var t = 1; t < arguments.length; t++) {
        var n = arguments[t];
        for (var r in n)
          Object.prototype.hasOwnProperty.call(n, r) && (e[r] = n[r]);
      }
      return e;
    }).apply(this, arguments);
}
function ql(e, t) {
  if (null == e) return {};
  var n,
    r,
    o = {},
    i = Object.keys(e);
  for (r = 0; r < i.length; r++) (n = i[r]), t.indexOf(n) >= 0 || (o[n] = e[n]);
  return o;
}
function Wl(e, t) {
  (null == t || t > e.length) && (t = e.length);
  for (var n = 0, r = new Array(t); n < t; n++) r[n] = e[n];
  return r;
}
function Gl(e, t) {
  var n;
  if ("undefined" == typeof Symbol || null == e[Symbol.iterator]) {
    if (
      Array.isArray(e) ||
      (n = (function (e, t) {
        if (e) {
          if ("string" == typeof e) return Wl(e, t);
          var n = Object.prototype.toString.call(e).slice(8, -1);
          return (
            "Object" === n && e.constructor && (n = e.constructor.name),
            "Map" === n || "Set" === n
              ? Array.from(e)
              : "Arguments" === n ||
                /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)
              ? Wl(e, t)
              : void 0
          );
        }
      })(e)) ||
      (t && e && "number" == typeof e.length)
    ) {
      n && (e = n);
      var r = 0;
      return function () {
        return r >= e.length ? { done: !0 } : { done: !1, value: e[r++] };
      };
    }
    throw new TypeError(
      "Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."
    );
  }
  return (n = e[Symbol.iterator]()).next.bind(n);
}
function Kl(e, t) {
  if (e in t) {
    for (
      var n = t[e],
        r = arguments.length,
        o = new Array(r > 2 ? r - 2 : 0),
        i = 2;
      i < r;
      i++
    )
      o[i - 2] = arguments[i];
    return "function" == typeof n ? n.apply(void 0, o) : n;
  }
  var l = new Error(
    'Tried to handle "' +
      e +
      '" but there is no handler defined. Only defined handlers are: ' +
      Object.keys(t)
        .map(function (e) {
          return '"' + e + '"';
        })
        .join(", ") +
      "."
  );
  throw (Error.captureStackTrace && Error.captureStackTrace(l, Kl), l);
}
function Xl(e) {
  var t,
    n,
    r = e.visible,
    o = void 0 === r || r,
    i = e.features,
    l = void 0 === i ? Tl.None : i,
    s = ql(e, ["visible", "features"]);
  return o || (l & Tl.Static && s.props.static)
    ? Yl(s)
    : l & Tl.RenderStrategy
    ? Kl(
        null == (t = s.props.unmount) || t ? Ml.Unmount : Ml.Hidden,
        (((n = {})[Ml.Unmount] = function () {
          return null;
        }),
        (n[Ml.Hidden] = function () {
          return Yl(
            Hl({}, s, {
              props: Hl({}, s.props, {
                hidden: !0,
                style: { display: "none" },
              }),
            })
          );
        }),
        n)
      )
    : Yl(s);
}
function Yl(e) {
  var t,
    n = e.props,
    r = e.attrs,
    o = e.slots,
    i = e.slot,
    l = e.name,
    s = (function (e, t) {
      void 0 === t && (t = []);
      for (var n, r = Object.assign({}, e), o = Gl(t); !(n = o()).done; ) {
        var i = n.value;
        i in r && delete r[i];
      }
      return r;
    })(n, ["unmount", "static"]),
    a = s.as,
    u = ql(s, ["as"]),
    c = null == o.default ? void 0 : o.default(i);
  if ("template" === a) {
    if (Object.keys(u).length > 0 || Object.keys(r).length > 0) {
      var f = null != c ? c : [],
        d = f[0],
        p = f.slice(1);
      if (
        null == (t = d) ||
        ("string" != typeof t.type &&
          "object" != typeof t.type &&
          "function" != typeof t.type) ||
        p.length > 0
      )
        throw new Error(
          [
            'Passing props on "template"!',
            "",
            "The current component <" + l + ' /> is rendering a "template".',
            "However we need to passthrough the following props:",
            Object.keys(u)
              .concat(Object.keys(r))
              .map(function (e) {
                return "  - " + e;
              })
              .join("\n"),
            "",
            "You can apply a few solutions:",
            [
              'Add an `as="..."` prop, to ensure that we render an actual element instead of a "template".',
              "Render a single element as the child so that we can forward the props onto that element.",
            ]
              .map(function (e) {
                return "  - " + e;
              })
              .join("\n"),
          ].join("\n")
        );
      return Rr(d, u);
    }
    return Array.isArray(c) && 1 === c.length ? c[0] : c;
  }
  return eo(a, u, c);
}
(($l = Tl || (Tl = {}))[($l.None = 0)] = "None"),
  ($l[($l.RenderStrategy = 1)] = "RenderStrategy"),
  ($l[($l.Static = 2)] = "Static"),
  ((Ll = Ml || (Ml = {}))[(Ll.Unmount = 0)] = "Unmount"),
  (Ll[(Ll.Hidden = 1)] = "Hidden"),
  ((Dl = Vl || (Vl = {})).Space = " "),
  (Dl.Enter = "Enter"),
  (Dl.Escape = "Escape"),
  (Dl.Backspace = "Backspace"),
  (Dl.ArrowLeft = "ArrowLeft"),
  (Dl.ArrowUp = "ArrowUp"),
  (Dl.ArrowRight = "ArrowRight"),
  (Dl.ArrowDown = "ArrowDown"),
  (Dl.Home = "Home"),
  (Dl.End = "End"),
  (Dl.PageUp = "PageUp"),
  (Dl.PageDown = "PageDown"),
  (Dl.Tab = "Tab");
var Jl = 0;
function Ql() {
  return ++Jl;
}
var Zl,
  es,
  ts,
  ns,
  rs,
  os,
  is,
  ls,
  ss = [
    "[contentEditable=true]",
    "[tabindex]",
    "a[href]",
    "area[href]",
    "button:not([disabled])",
    "iframe",
    "input:not([disabled])",
    "select:not([disabled])",
    "textarea:not([disabled])",
  ]
    .map(function (e) {
      return e + ":not([tabindex='-1'])";
    })
    .join(",");
function as(e) {
  null == e || e.focus({ preventScroll: !0 });
}
function us(e, t) {
  var n = Array.isArray(e)
      ? e
      : (function (e) {
          return (
            void 0 === e && (e = document.body),
            null == e ? [] : Array.from(e.querySelectorAll(ss))
          );
        })(e),
    r = document.activeElement,
    o = (function () {
      if (t & (Zl.First | Zl.Next)) return rs.Next;
      if (t & (Zl.Previous | Zl.Last)) return rs.Previous;
      throw new Error(
        "Missing Focus.First, Focus.Previous, Focus.Next or Focus.Last"
      );
    })(),
    i = (function () {
      if (t & Zl.First) return 0;
      if (t & Zl.Previous) return Math.max(0, n.indexOf(r)) - 1;
      if (t & Zl.Next) return Math.max(0, n.indexOf(r)) + 1;
      if (t & Zl.Last) return n.length - 1;
      throw new Error(
        "Missing Focus.First, Focus.Previous, Focus.Next or Focus.Last"
      );
    })(),
    l = t & Zl.NoScroll ? { preventScroll: !0 } : {},
    s = 0,
    a = n.length,
    u = void 0;
  do {
    var c;
    if (s >= a || s + a <= 0) return ts.Error;
    var f = i + s;
    if (t & Zl.WrapAround) f = (f + a) % a;
    else {
      if (f < 0) return ts.Underflow;
      if (f >= a) return ts.Overflow;
    }
    null == (c = u = n[f]) || c.focus(l), (s += o);
  } while (u !== document.activeElement);
  return (
    u.hasAttribute("tabindex") || u.setAttribute("tabindex", "0"), ts.Success
  );
}
function cs(e, t, n) {
  window.addEventListener(e, t, n),
    wn(function () {
      return window.removeEventListener(e, t, n);
    });
}
function fs(e, t) {
  for (var n, r = Gl(e); !(n = r()).done; ) {
    if (n.value.contains(t)) return !0;
  }
  return !1;
}
((es = Zl || (Zl = {}))[(es.First = 1)] = "First"),
  (es[(es.Previous = 2)] = "Previous"),
  (es[(es.Next = 4)] = "Next"),
  (es[(es.Last = 8)] = "Last"),
  (es[(es.WrapAround = 16)] = "WrapAround"),
  (es[(es.NoScroll = 32)] = "NoScroll"),
  ((ns = ts || (ts = {}))[(ns.Error = 0)] = "Error"),
  (ns[(ns.Overflow = 1)] = "Overflow"),
  (ns[(ns.Success = 2)] = "Success"),
  (ns[(ns.Underflow = 3)] = "Underflow"),
  ((os = rs || (rs = {}))[(os.Previous = -1)] = "Previous"),
  (os[(os.Next = 1)] = "Next"),
  ((ls = is || (is = {}))[(ls.Strict = 0)] = "Strict"),
  (ls[(ls.Loose = 1)] = "Loose");
var ds = new Set(),
  ps = new Map();
function hs(e) {
  e.setAttribute("aria-hidden", "true"), (e.inert = !0);
}
function vs(e) {
  var t = ps.get(e);
  t &&
    (null === t["aria-hidden"]
      ? e.removeAttribute("aria-hidden")
      : e.setAttribute("aria-hidden", t["aria-hidden"]),
    (e.inert = t.inert));
}
var ms,
  gs,
  ys = Symbol("StackContext");
function bs() {
  return Jt(ys, function () {});
}
function ws(e) {
  var t = bs();
  Yt(ys, function () {
    for (var n = arguments.length, r = new Array(n), o = 0; o < n; o++)
      r[o] = arguments[o];
    null == e || e.apply(void 0, r), t.apply(void 0, r);
  });
}
((gs = ms || (ms = {}))[(gs.AddElement = 0)] = "AddElement"),
  (gs[(gs.RemoveElement = 1)] = "RemoveElement");
var xs = Symbol("ForcePortalRootContext");
var _s = ln({
  name: "ForcePortalRoot",
  props: {
    as: { type: [Object, String], default: "template" },
    force: { type: Boolean, default: !1 },
  },
  setup: function (e, t) {
    var n = t.slots,
      r = t.attrs;
    return (
      Yt(xs, e.force),
      function () {
        return Xl({
          props: ql(e, ["force"]),
          slot: {},
          slots: n,
          attrs: r,
          name: "ForcePortalRoot",
        });
      }
    );
  },
});
function Ss() {
  var e = document.getElementById("headlessui-portal-root");
  if (e) return e;
  var t = document.createElement("div");
  return (
    t.setAttribute("id", "headlessui-portal-root"), document.body.appendChild(t)
  );
}
var Es = ln({
    name: "Portal",
    props: { as: { type: [Object, String], default: "div" } },
    setup: function (e, t) {
      var n = t.slots,
        r = t.attrs,
        o = Jt(xs, !1),
        i = Jt(Cs, null),
        l = it(!0 === o || null === i ? Ss() : i.resolveTarget());
      Qt(function () {
        o || (null !== i && (l.value = i.resolveTarget()));
      });
      var s = it(null);
      return (
        (function (e) {
          var t = bs();
          Qt(function (n) {
            var r = null == e ? void 0 : e.value;
            r &&
              (t(ms.AddElement, r),
              n(function () {
                return t(ms.RemoveElement, r);
              }));
          });
        })(s),
        wn(function () {
          var e,
            t = document.getElementById("headlessui-portal-root");
          t &&
            l.value === t &&
            l.value.children.length <= 0 &&
            (null == (e = l.value.parentElement) || e.removeChild(l.value));
        }),
        ws(),
        function () {
          if (null === l.value) return null;
          var t = { ref: s };
          return eo(
            cr,
            { to: l.value },
            Xl({
              props: Hl({}, e, t),
              slot: {},
              attrs: r,
              slots: n,
              name: "Portal",
            })
          );
        }
      );
    },
  }),
  Cs = Symbol("PortalGroupContext"),
  As = ln({
    name: "PortalGroup",
    props: {
      as: { type: [Object, String], default: "template" },
      target: { type: Object, default: null },
    },
    setup: function (e, t) {
      var n = t.attrs,
        r = t.slots,
        o = Xe({
          resolveTarget: function () {
            return e.target;
          },
        });
      return (
        Yt(Cs, o),
        function () {
          return Xl({
            props: ql(e, ["target"]),
            slot: {},
            attrs: n,
            slots: r,
            name: "PortalGroup",
          });
        }
      );
    },
  }),
  Os = Symbol("DescriptionContext");
function ks(e) {
  var t;
  return null == e || null == e.value
    ? null
    : null != (t = e.value.$el)
    ? t
    : e.value;
}
var Ps,
  Rs,
  Fs,
  js,
  Ts = Symbol("Context");
function $s() {
  return Jt(Ts, null);
}
((Rs = Ps || (Ps = {}))[(Rs.Open = 0)] = "Open"),
  (Rs[(Rs.Closed = 1)] = "Closed"),
  ((js = Fs || (Fs = {}))[(js.Open = 0)] = "Open"),
  (js[(js.Closed = 1)] = "Closed");
var Ms = Symbol("DialogContext");
function Ls(e) {
  var t = Jt(Ms, null);
  if (null === t) {
    var n = new Error(
      "<" + e + " /> is missing a parent <Dialog /> component."
    );
    throw (Error.captureStackTrace && Error.captureStackTrace(n, Ls), n);
  }
  return t;
}
var Vs,
  Ds,
  Is,
  Ns,
  Us,
  Bs,
  zs,
  Hs,
  qs,
  Ws,
  Gs,
  Ks,
  Xs,
  Ys = "DC8F892D-2EBD-447C-A4C8-A03058436FF4",
  Js = ln({
    name: "Dialog",
    inheritAttrs: !1,
    props: {
      as: { type: [Object, String], default: "div" },
      static: { type: Boolean, default: !1 },
      unmount: { type: Boolean, default: !0 },
      open: { type: [Boolean, String], default: Ys },
      initialFocus: { type: Object, default: null },
    },
    emits: ["close"],
    render: function () {
      var e = this,
        t = Hl({}, this.$attrs, {
          ref: "el",
          id: this.id,
          role: "dialog",
          "aria-modal": this.dialogState === Fs.Open || void 0,
          "aria-labelledby": this.titleId,
          "aria-describedby": this.describedby,
          onClick: this.handleClick,
          onKeydown: this.handleKeyDown,
        }),
        n = ql(this.$props, ["open", "initialFocus"]),
        r = { open: this.dialogState === Fs.Open };
      return eo(_s, { force: !0 }, function () {
        return eo(Es, function () {
          return eo(As, { target: e.dialogRef }, function () {
            return eo(_s, { force: !1 }, function () {
              return Xl({
                props: Hl({}, n, t),
                slot: r,
                attrs: e.$attrs,
                slots: e.$slots,
                visible: e.visible,
                features: Tl.RenderStrategy | Tl.Static,
                name: "Dialog",
              });
            });
          });
        });
      });
    },
    setup: function (e, t) {
      var n = t.emit,
        r = it(new Set()),
        o = $s(),
        i = Zr(function () {
          var t;
          return e.open === Ys && null !== o
            ? Kl(o.value, (((t = {})[Ps.Open] = !0), (t[Ps.Closed] = !1), t))
            : e.open;
        });
      if (!(e.open !== Ys || null !== o))
        throw new Error(
          "You forgot to provide an `open` prop to the `Dialog`."
        );
      if ("boolean" != typeof i.value)
        throw new Error(
          "You provided an `open` prop to the `Dialog`, but the value is not a boolean. Received: " +
            (i.value === Ys ? void 0 : e.open)
        );
      var l = Zr(function () {
          return e.open ? Fs.Open : Fs.Closed;
        }),
        s = Zr(function () {
          return null !== o ? o.value === Ps.Open : l.value === Fs.Open;
        }),
        a = it(null),
        u = it(l.value === Fs.Open);
      yn(function () {
        u.value = l.value === Fs.Open;
      });
      var c = "headlessui-dialog-" + Ql(),
        f = Zr(function () {
          return { initialFocus: e.initialFocus };
        });
      !(function (e, t, n) {
        void 0 === t && (t = it(!0)), void 0 === n && (n = it({}));
        var r = it(
            "undefined" != typeof window ? document.activeElement : null
          ),
          o = it(null);
        function i() {
          if (t.value && 1 === e.value.size) {
            var i = n.value.initialFocus,
              l = document.activeElement;
            if (i) {
              if (i === l) return;
            } else if (fs(e.value, l)) return;
            if (((r.value = l), i)) as(i);
            else {
              for (var s, a = !1, u = Gl(e.value); !(s = u()).done; )
                if (us(s.value, Zl.First) === ts.Success) {
                  a = !0;
                  break;
                }
              if (!a)
                throw new Error(
                  "There are no focusable elements inside the <FocusTrap />"
                );
            }
            o.value = document.activeElement;
          }
        }
        function l() {
          as(r.value), (r.value = null), (o.value = null);
        }
        Qt(i),
          yn(function () {
            t.value ? i() : l();
          }),
          wn(l),
          cs("keydown", function (n) {
            if (
              t.value &&
              n.key === Vl.Tab &&
              document.activeElement &&
              1 === e.value.size
            ) {
              n.preventDefault();
              for (var r, i = Gl(e.value); !(r = i()).done; )
                if (
                  us(
                    r.value,
                    (n.shiftKey ? Zl.Previous : Zl.Next) | Zl.WrapAround
                  ) === ts.Success
                ) {
                  o.value = document.activeElement;
                  break;
                }
            }
          }),
          cs(
            "focus",
            function (n) {
              if (t.value && 1 === e.value.size) {
                var r = o.value;
                if (r) {
                  var i = n.target;
                  i && i instanceof HTMLElement
                    ? fs(e.value, i)
                      ? ((o.value = i), as(i))
                      : (n.preventDefault(), n.stopPropagation(), as(r))
                    : as(o.value);
                }
              }
            },
            !0
          );
      })(r, u, f),
        (function (e, t) {
          void 0 === t && (t = it(!0)),
            Qt(function (n) {
              if (t.value && e.value) {
                var r = e.value;
                ds.add(r);
                for (var o, i = Gl(ps.keys()); !(o = i()).done; ) {
                  var l = o.value;
                  l.contains(r) && (vs(l), ps.delete(l));
                }
                document.querySelectorAll("body > *").forEach(function (e) {
                  if (e instanceof HTMLElement) {
                    for (var t, n = Gl(ds); !(t = n()).done; ) {
                      var r = t.value;
                      if (e.contains(r)) return;
                    }
                    1 === ds.size &&
                      (ps.set(e, {
                        "aria-hidden": e.getAttribute("aria-hidden"),
                        inert: e.inert,
                      }),
                      hs(e));
                  }
                }),
                  n(function () {
                    if ((ds.delete(r), ds.size > 0))
                      document
                        .querySelectorAll("body > *")
                        .forEach(function (e) {
                          if (e instanceof HTMLElement && !ps.has(e)) {
                            for (var t, n = Gl(ds); !(t = n()).done; ) {
                              var r = t.value;
                              if (e.contains(r)) return;
                            }
                            ps.set(e, {
                              "aria-hidden": e.getAttribute("aria-hidden"),
                              inert: e.inert,
                            }),
                              hs(e);
                          }
                        });
                    else
                      for (var e, t = Gl(ps.keys()); !(e = t()).done; ) {
                        var n = e.value;
                        vs(n), ps.delete(n);
                      }
                  });
              }
            });
        })(a, u),
        ws(function (e, t) {
          var n;
          return Kl(
            e,
            (((n = {})[ms.AddElement] = function () {
              r.value.add(t);
            }),
            (n[ms.RemoveElement] = function () {
              r.value.delete(t);
            }),
            n)
          );
        });
      var d = (function (e) {
          var t = void 0 === e ? {} : e,
            n = t.slot,
            r = void 0 === n ? it({}) : n,
            o = t.name,
            i = void 0 === o ? "Description" : o,
            l = t.props,
            s = void 0 === l ? {} : l,
            a = it([]);
          return (
            Yt(Os, {
              register: function (e) {
                return (
                  a.value.push(e),
                  function () {
                    var t = a.value.indexOf(e);
                    -1 !== t && a.value.splice(t, 1);
                  }
                );
              },
              slot: r,
              name: i,
              props: s,
            }),
            Zr(function () {
              return a.value.length > 0 ? a.value.join(" ") : void 0;
            })
          );
        })({
          name: "DialogDescription",
          slot: Zr(function () {
            return { open: i.value };
          }),
        }),
        p = it(null),
        h = {
          titleId: p,
          dialogState: l,
          setTitleId: function (e) {
            p.value !== e && (p.value = e);
          },
          close: function () {
            n("close", !1);
          },
        };
      return (
        Yt(Ms, h),
        cs("mousedown", function (e) {
          var t = e.target;
          l.value === Fs.Open &&
            1 === r.value.size &&
            (fs(r.value, t) ||
              (h.close(),
              kt(function () {
                return null == t ? void 0 : t.focus();
              })));
        }),
        Qt(function (e) {
          if (l.value === Fs.Open) {
            var t = document.documentElement.style.overflow,
              n = document.documentElement.style.paddingRight,
              r = window.innerWidth - document.documentElement.clientWidth;
            (document.documentElement.style.overflow = "hidden"),
              (document.documentElement.style.paddingRight = r + "px"),
              e(function () {
                (document.documentElement.style.overflow = t),
                  (document.documentElement.style.paddingRight = n);
              });
          }
        }),
        Qt(function (e) {
          if (l.value === Fs.Open) {
            var t = ks(a);
            if (t) {
              var n = new IntersectionObserver(function (e) {
                for (var t, n = Gl(e); !(t = n()).done; ) {
                  var r = t.value;
                  0 === r.boundingClientRect.x &&
                    0 === r.boundingClientRect.y &&
                    0 === r.boundingClientRect.width &&
                    0 === r.boundingClientRect.height &&
                    h.close();
                }
              });
              n.observe(t),
                e(function () {
                  return n.disconnect();
                });
            }
          }
        }),
        {
          id: c,
          el: a,
          dialogRef: a,
          containers: r,
          dialogState: l,
          titleId: p,
          describedby: d,
          visible: s,
          open: i,
          handleClick: function (e) {
            e.stopPropagation();
          },
          handleKeyDown: function (e) {
            e.key === Vl.Escape &&
              l.value === Fs.Open &&
              (r.value.size > 1 ||
                (e.preventDefault(), e.stopPropagation(), h.close()));
          },
        }
      );
    },
  }),
  Qs = ln({
    name: "DialogOverlay",
    props: { as: { type: [Object, String], default: "div" } },
    render: function () {
      var e = Ls("DialogOverlay"),
        t = {
          ref: "el",
          id: this.id,
          "aria-hidden": !0,
          onClick: this.handleClick,
        };
      return Xl({
        props: Hl({}, this.$props, t),
        slot: { open: e.dialogState.value === Fs.Open },
        attrs: this.$attrs,
        slots: this.$slots,
        name: "DialogOverlay",
      });
    },
    setup: function () {
      var e = Ls("DialogOverlay");
      return {
        id: "headlessui-dialog-overlay-" + Ql(),
        handleClick: function (t) {
          t.preventDefault(), t.stopPropagation(), e.close();
        },
      };
    },
  }),
  Zs = ln({
    name: "DialogTitle",
    props: { as: { type: [Object, String], default: "h2" } },
    render: function () {
      var e = Ls("DialogTitle"),
        t = { id: this.id };
      return Xl({
        props: Hl({}, this.$props, t),
        slot: { open: e.dialogState.value === Fs.Open },
        attrs: this.$attrs,
        slots: this.$slots,
        name: "DialogTitle",
      });
    },
    setup: function () {
      var e = Ls("DialogTitle"),
        t = "headlessui-dialog-title-" + Ql();
      return (
        mn(function () {
          e.setTitleId(t),
            wn(function () {
              return e.setTitleId(null);
            });
        }),
        { id: t }
      );
    },
  });
function ea() {
  var e = [],
    t = {
      requestAnimationFrame: (function (e) {
        function t() {
          return e.apply(this, arguments);
        }
        return (
          (t.toString = function () {
            return e.toString();
          }),
          t
        );
      })(function () {
        var e = requestAnimationFrame.apply(void 0, arguments);
        t.add(function () {
          return cancelAnimationFrame(e);
        });
      }),
      nextFrame: function () {
        for (var e = arguments.length, n = new Array(e), r = 0; r < e; r++)
          n[r] = arguments[r];
        t.requestAnimationFrame(function () {
          t.requestAnimationFrame.apply(t, n);
        });
      },
      setTimeout: (function (e) {
        function t() {
          return e.apply(this, arguments);
        }
        return (
          (t.toString = function () {
            return e.toString();
          }),
          t
        );
      })(function () {
        var e = setTimeout.apply(void 0, arguments);
        t.add(function () {
          return clearTimeout(e);
        });
      }),
      add: function (t) {
        e.push(t);
      },
      dispose: function () {
        for (var t, n = Gl(e.splice(0)); !(t = n()).done; ) {
          (0, t.value)();
        }
      },
    };
  return t;
}
function ta(e) {
  for (
    var t, n = arguments.length, r = new Array(n > 1 ? n - 1 : 0), o = 1;
    o < n;
    o++
  )
    r[o - 1] = arguments[o];
  e && r.length > 0 && (t = e.classList).add.apply(t, r);
}
function na(e) {
  for (
    var t, n = arguments.length, r = new Array(n > 1 ? n - 1 : 0), o = 1;
    o < n;
    o++
  )
    r[o - 1] = arguments[o];
  e && r.length > 0 && (t = e.classList).remove.apply(t, r);
}
function ra(e, t, n, r, o, i) {
  var l,
    s,
    a = ea(),
    u =
      void 0 !== i
        ? ((l = i),
          (s = { called: !1 }),
          function () {
            if (!s.called) return (s.called = !0), l.apply(void 0, arguments);
          })
        : function () {};
  return (
    na.apply(void 0, [e].concat(o)),
    ta.apply(void 0, [e].concat(t, n)),
    a.nextFrame(function () {
      na.apply(void 0, [e].concat(n)),
        ta.apply(void 0, [e].concat(r)),
        a.add(
          (function (e, t) {
            var n = ea();
            if (!e) return n.dispose;
            var r = getComputedStyle(e),
              o = [r.transitionDuration, r.transitionDelay].map(function (e) {
                var t = e
                  .split(",")
                  .filter(Boolean)
                  .map(function (e) {
                    return e.includes("ms")
                      ? parseFloat(e)
                      : 1e3 * parseFloat(e);
                  })
                  .sort(function (e, t) {
                    return t - e;
                  })[0];
                return void 0 === t ? 0 : t;
              }),
              i = o[0],
              l = o[1];
            return (
              0 !== i
                ? n.setTimeout(function () {
                    return t(Ks.Finished);
                  }, i + l)
                : t(Ks.Finished),
              n.add(function () {
                return t(Ks.Cancelled);
              }),
              n.dispose
            );
          })(e, function (n) {
            return (
              na.apply(void 0, [e].concat(r, t)),
              ta.apply(void 0, [e].concat(o)),
              u(n)
            );
          })
        );
    }),
    a.add(function () {
      return na.apply(void 0, [e].concat(t, n, r, o));
    }),
    a.add(function () {
      return u(Ks.Cancelled);
    }),
    a.dispose
  );
}
function oa(e) {
  return (
    void 0 === e && (e = ""),
    e.split(" ").filter(function (e) {
      return e.trim().length > 1;
    })
  );
}
((Ds = Vs || (Vs = {}))[(Ds.Open = 0)] = "Open"),
  (Ds[(Ds.Closed = 1)] = "Closed"),
  (function (e) {
    (e[(e.First = 0)] = "First"),
      (e[(e.Previous = 1)] = "Previous"),
      (e[(e.Next = 2)] = "Next"),
      (e[(e.Last = 3)] = "Last"),
      (e[(e.Specific = 4)] = "Specific"),
      (e[(e.Nothing = 5)] = "Nothing");
  })(Is || (Is = {})),
  ((Us = Ns || (Ns = {}))[(Us.Open = 0)] = "Open"),
  (Us[(Us.Closed = 1)] = "Closed"),
  ((zs = Bs || (Bs = {}))[(zs.Open = 0)] = "Open"),
  (zs[(zs.Closed = 1)] = "Closed"),
  ((qs = Hs || (Hs = {}))[(qs.Open = 0)] = "Open"),
  (qs[(qs.Closed = 1)] = "Closed"),
  ((Gs = Ws || (Ws = {}))[(Gs.Empty = 1)] = "Empty"),
  (Gs[(Gs.Active = 2)] = "Active"),
  ((Xs = Ks || (Ks = {})).Finished = "finished"),
  (Xs.Cancelled = "cancelled");
var ia,
  la,
  sa = Symbol("TransitionContext");
((la = ia || (ia = {})).Visible = "visible"), (la.Hidden = "hidden");
var aa = Symbol("NestingContext");
function ua(e) {
  return "children" in e
    ? ua(e.children)
    : e.value.filter(function (e) {
        return e.state === ia.Visible;
      }).length > 0;
}
function ca(e) {
  var t = it([]),
    n = it(!1);
  function r(r, o) {
    var i;
    void 0 === o && (o = Ml.Hidden);
    var l = t.value.findIndex(function (e) {
      return e.id === r;
    });
    -1 !== l &&
      (Kl(
        o,
        (((i = {})[Ml.Unmount] = function () {
          t.value.splice(l, 1);
        }),
        (i[Ml.Hidden] = function () {
          t.value[l].state = ia.Hidden;
        }),
        i)
      ),
      !ua(t) && n.value && (null == e || e()));
  }
  return (
    mn(function () {
      return (n.value = !0);
    }),
    wn(function () {
      return (n.value = !1);
    }),
    {
      children: t,
      register: function (e) {
        var n = t.value.find(function (t) {
          return t.id === e;
        });
        return (
          n
            ? n.state !== ia.Visible && (n.state = ia.Visible)
            : t.value.push({ id: e, state: ia.Visible }),
          function () {
            return r(e, Ml.Unmount);
          }
        );
      },
      unregister: r,
    }
  );
}
var fa = Tl.RenderStrategy,
  da = ln({
    props: {
      as: { type: [Object, String], default: "div" },
      show: { type: [Boolean], default: null },
      unmount: { type: [Boolean], default: !0 },
      appear: { type: [Boolean], default: !1 },
      enter: { type: [String], default: "" },
      enterFrom: { type: [String], default: "" },
      enterTo: { type: [String], default: "" },
      entered: { type: [String], default: "" },
      leave: { type: [String], default: "" },
      leaveFrom: { type: [String], default: "" },
      leaveTo: { type: [String], default: "" },
    },
    emits: ["beforeEnter", "afterEnter", "beforeLeave", "afterLeave"],
    render: function () {
      var e = this;
      if (this.renderAsRoot)
        return eo(
          pa,
          Hl({}, this.$props, {
            onBeforeEnter: function () {
              return e.$emit("beforeEnter");
            },
            onAfterEnter: function () {
              return e.$emit("afterEnter");
            },
            onBeforeLeave: function () {
              return e.$emit("beforeLeave");
            },
            onAfterLeave: function () {
              return e.$emit("afterLeave");
            },
          }),
          this.$slots
        );
      return Xl({
        props: Hl(
          {},
          ql(this.$props, [
            "appear",
            "show",
            "enter",
            "enterFrom",
            "enterTo",
            "entered",
            "leave",
            "leaveFrom",
            "leaveTo",
          ]),
          { ref: "el" }
        ),
        slot: {},
        slots: this.$slots,
        attrs: this.$attrs,
        features: fa,
        visible: this.state === ia.Visible,
        name: "TransitionChild",
      });
    },
    setup: function (e, t) {
      var n = t.emit;
      if (null === Jt(sa, null) && null !== $s()) return { renderAsRoot: !0 };
      var r = it(null),
        o = it(ia.Visible),
        i = Zr(function () {
          return e.unmount ? Ml.Unmount : Ml.Hidden;
        }),
        l = (function () {
          var e = Jt(sa, null);
          if (null === e)
            throw new Error(
              "A <TransitionChild /> is used but it is missing a parent <TransitionRoot />."
            );
          return e;
        })(),
        s = l.show,
        a = l.appear,
        u = (function () {
          var e = Jt(aa, null);
          if (null === e)
            throw new Error(
              "A <TransitionChild /> is used but it is missing a parent <TransitionRoot />."
            );
          return e;
        })(),
        c = u.register,
        f = u.unregister,
        d = { value: !0 },
        p = Ql(),
        h = { value: !1 },
        v = ca(function () {
          h.value || ((o.value = ia.Hidden), f(p), n("afterLeave"));
        });
      mn(function () {
        var e = c(p);
        wn(e);
      }),
        Qt(function () {
          var e;
          i.value === Ml.Hidden &&
            p &&
            (s && o.value !== ia.Visible
              ? (o.value = ia.Visible)
              : Kl(
                  o.value,
                  (((e = {})[ia.Hidden] = function () {
                    return f(p);
                  }),
                  (e[ia.Visible] = function () {
                    return c(p);
                  }),
                  e)
                ));
        });
      var m,
        g = oa(e.enter),
        y = oa(e.enterFrom),
        b = oa(e.enterTo),
        w = oa(e.entered),
        x = oa(e.leave),
        _ = oa(e.leaveFrom),
        S = oa(e.leaveTo);
      return (
        mn(function () {
          Qt(function () {
            if (o.value === ia.Visible) {
              var e = ks(r);
              if (e instanceof Comment && "" === e.data)
                throw new Error(
                  "Did you forget to passthrough the `ref` to the actual DOM node?"
                );
            }
          });
        }),
        mn(function () {
          en(
            [s, a],
            function (e, t, i) {
              !(function (e) {
                var t = d.value && !a.value,
                  i = ks(r);
                i &&
                  i instanceof HTMLElement &&
                  (t ||
                    ((h.value = !0),
                    s.value && n("beforeEnter"),
                    s.value || n("beforeLeave"),
                    e(
                      s.value
                        ? ra(i, g, y, b, w, function (e) {
                            (h.value = !1),
                              e === Ks.Finished && n("afterEnter");
                          })
                        : ra(i, x, _, S, w, function (e) {
                            (h.value = !1),
                              e === Ks.Finished &&
                                (ua(v) ||
                                  ((o.value = ia.Hidden),
                                  f(p),
                                  n("afterLeave")));
                          })
                    )));
              })(i),
                (d.value = !1);
            },
            { immediate: !0 }
          );
        }),
        Yt(aa, v),
        (m = Zr(function () {
          var e;
          return Kl(
            o.value,
            (((e = {})[ia.Visible] = Ps.Open), (e[ia.Hidden] = Ps.Closed), e)
          );
        })),
        Yt(Ts, m),
        { el: r, renderAsRoot: !1, state: o }
      );
    },
  }),
  pa = ln({
    inheritAttrs: !1,
    props: {
      as: { type: [Object, String], default: "div" },
      show: { type: [Boolean], default: null },
      unmount: { type: [Boolean], default: !0 },
      appear: { type: [Boolean], default: !1 },
      enter: { type: [String], default: "" },
      enterFrom: { type: [String], default: "" },
      enterTo: { type: [String], default: "" },
      entered: { type: [String], default: "" },
      leave: { type: [String], default: "" },
      leaveFrom: { type: [String], default: "" },
      leaveTo: { type: [String], default: "" },
    },
    emits: ["beforeEnter", "afterEnter", "beforeLeave", "afterLeave"],
    render: function () {
      var e = this,
        t = this.$props,
        n = t.unmount,
        r = ql(t, ["show", "appear", "unmount"]),
        o = { unmount: n };
      return Xl({
        props: Hl({}, o, { as: "template" }),
        slot: {},
        slots: Hl({}, this.$slots, {
          default: function () {
            return [
              eo(
                da,
                Hl(
                  {
                    onBeforeEnter: function () {
                      return e.$emit("beforeEnter");
                    },
                    onAfterEnter: function () {
                      return e.$emit("afterEnter");
                    },
                    onBeforeLeave: function () {
                      return e.$emit("beforeLeave");
                    },
                    onAfterLeave: function () {
                      return e.$emit("afterLeave");
                    },
                  },
                  e.$attrs,
                  o,
                  r
                ),
                e.$slots.default
              ),
            ];
          },
        }),
        attrs: {},
        features: fa,
        visible: this.state === ia.Visible,
        name: "Transition",
      });
    },
    setup: function (e) {
      var t = $s(),
        n = Zr(function () {
          var n;
          return null === e.show && null !== t
            ? Kl(t.value, (((n = {})[Ps.Open] = !0), (n[Ps.Closed] = !1), n))
            : e.show;
        });
      Qt(function () {
        if (![!0, !1].includes(n.value))
          throw new Error(
            'A <Transition /> is used but it is missing a `:show="true | false"` prop.'
          );
      });
      var r = it(n.value ? ia.Visible : ia.Hidden),
        o = ca(function () {
          r.value = ia.Hidden;
        }),
        i = { value: !0 },
        l = {
          show: n,
          appear: Zr(function () {
            return e.appear || !i.value;
          }),
        };
      return (
        mn(function () {
          Qt(function () {
            (i.value = !1),
              n.value ? (r.value = ia.Visible) : ua(o) || (r.value = ia.Hidden);
          });
        }),
        Yt(aa, o),
        Yt(sa, l),
        { state: r, show: n }
      );
    },
  });
function ha(e, t) {
  return (
    wr(),
    Sr(
      "svg",
      {
        xmlns: "http://www.w3.org/2000/svg",
        fill: "none",
        viewBox: "0 0 24 24",
        stroke: "currentColor",
      },
      [
        Pr("path", {
          "stroke-linecap": "round",
          "stroke-linejoin": "round",
          "stroke-width": "2",
          d: "M6 18L18 6M6 6l12 12",
        }),
      ]
    )
  );
}
export {
  jr as A,
  Bt as B,
  zt as C,
  Js as D,
  Ht as E,
  hr as F,
  pl as G,
  gi as H,
  Do as I,
  da as T,
  Pr as a,
  Tr as b,
  Sr as c,
  Fr as d,
  it as e,
  Vr as f,
  zl as g,
  Qs as h,
  Zs as i,
  pa as j,
  Ul as k,
  Bl as l,
  ha as m,
  To as n,
  wr as o,
  Nl as p,
  Xn as q,
  fr as r,
  Il as s,
  c as t,
  Ao as u,
  Oo as v,
  qt as w,
  Eo as x,
  So as y,
  $o as z,
};
