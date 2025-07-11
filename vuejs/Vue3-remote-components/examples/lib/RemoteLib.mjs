import { createElementBlock as s, openBlock as r, createElementVNode as _, resolveComponent as p, createVNode as d, withCtx as f, createTextVNode as $ } from "vue";
const a = (e, t) => {
  const o = e.__vccOpts || e;
  for (const [n, l] of t)
    o[n] = l;
  return o;
}, k = {
  name: "RemoteHello"
};
function v(e, t, o, n, l, c) {
  return r(), s("div", null, t[0] || (t[0] = [
    _("span", { class: "remote-hello" }, "hello world", -1)
  ]));
}
const m = /* @__PURE__ */ a(k, [["render", v]]), x = {
  name: "RemoteButton",
  methods: {
    onClick() {
      alert("点击了远程ElButton"), this.$emit("on-click", { date: /* @__PURE__ */ new Date() });
    }
  }
};
function B(e, t, o, n, l, c) {
  const u = p("el-button");
  return r(), s("div", null, [
    d(u, {
      class: "remote-button",
      onClick: c.onClick
    }, {
      default: f(() => t[0] || (t[0] = [
        $("我是远程ElButton组件")
      ])),
      _: 1,
      __: [0]
    }, 8, ["onClick"])
  ]);
}
const i = /* @__PURE__ */ a(x, [["render", B]]), C = "0.0.1", E = [
  m,
  i
], R = (e) => {
  E.map((t) => {
    e.component(t.name, t);
  });
}, h = {
  install: R,
  // 全量引入
  version: C,
  RemoteHello: m,
  RemoteButton: i
};
export {
  h as default
};
