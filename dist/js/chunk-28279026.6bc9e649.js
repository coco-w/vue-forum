(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-28279026"],{"0d9e":function(t,n,e){},a647:function(t,n,e){"use strict";var c=e("0d9e"),i=e.n(c);i.a},bb51:function(t,n,e){"use strict";e.r(n);var c=function(){var t=this,n=t.$createElement,e=t._self._c||n;return e("div",[e("header-nav"),e("discussion")],1)},i=[],a=e("c330"),o=function(){var t=this,n=t.$createElement,e=t._self._c||n;return e("Card",[e("div",{attrs:{slot:"title"},slot:"title"},[t._v("新手交流")]),e("div",t._l(t.topic,function(n){return e("Row",{key:n.id},[e("i-col",{attrs:{span:"1"}},[e("img",{attrs:{src:n.pic,alt:""}})]),e("i-col",{attrs:{span:"4"}},[e("a",{on:{click:function(e){return t.hanldeTopic(n._id)}}},[t._v(t._s(n.title))])]),e("i-col",{attrs:{span:"4",push:"14"}},[e("a",{on:{click:function(e){return t.hanldeUserSpace(n.author_id)}}},[t._v(t._s(n.author))]),e("span",[e("Time",{attrs:{time:n.create_time,type:"datetime"}})],1)])],1)}),1)])},s=[],r=e("cebc"),u=e("2f62"),l={name:"discussion",data:function(){return{topic:[]}},methods:Object(r["a"])({},Object(u["b"])(["getTopic"]),{hanldeTopic:function(t){this.$router.push("/topic/".concat(t,"/1"))},hanldeUserSpace:function(t){this.$router.push("/userSpace/".concat(t))}}),mounted:function(){var t=this;this.getTopic().then(function(n){t.topic=n})}},p=l,d=(e("a647"),e("2877")),h=Object(d["a"])(p,o,s,!1,null,null,null),f=h.exports,m={name:"home",components:{HeaderNav:a["a"],Discussion:f}},v=m,_=Object(d["a"])(v,c,i,!1,null,null,null);n["default"]=_.exports}}]);