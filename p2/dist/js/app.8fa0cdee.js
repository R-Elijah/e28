(function(t){function e(e){for(var n,a,i=e[0],u=e[1],m=e[2],c=0,p=[];c<i.length;c++)a=i[c],Object.prototype.hasOwnProperty.call(s,a)&&s[a]&&p.push(s[a][0]),s[a]=0;for(n in u)Object.prototype.hasOwnProperty.call(u,n)&&(t[n]=u[n]);l&&l(e);while(p.length)p.shift()();return r.push.apply(r,m||[]),o()}function o(){for(var t,e=0;e<r.length;e++){for(var o=r[e],n=!0,i=1;i<o.length;i++){var u=o[i];0!==s[u]&&(n=!1)}n&&(r.splice(e--,1),t=a(a.s=o[0]))}return t}var n={},s={app:0},r=[];function a(e){if(n[e])return n[e].exports;var o=n[e]={i:e,l:!1,exports:{}};return t[e].call(o.exports,o,o.exports,a),o.l=!0,o.exports}a.m=t,a.c=n,a.d=function(t,e,o){a.o(t,e)||Object.defineProperty(t,e,{enumerable:!0,get:o})},a.r=function(t){"undefined"!==typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})},a.t=function(t,e){if(1&e&&(t=a(t)),8&e)return t;if(4&e&&"object"===typeof t&&t&&t.__esModule)return t;var o=Object.create(null);if(a.r(o),Object.defineProperty(o,"default",{enumerable:!0,value:t}),2&e&&"string"!=typeof t)for(var n in t)a.d(o,n,function(e){return t[e]}.bind(null,n));return o},a.n=function(t){var e=t&&t.__esModule?function(){return t["default"]}:function(){return t};return a.d(e,"a",e),e},a.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)},a.p="/";var i=window["webpackJsonp"]=window["webpackJsonp"]||[],u=i.push.bind(i);i.push=e,i=i.slice();for(var m=0;m<i.length;m++)e(i[m]);var l=u;r.push([0,"chunk-vendors"]),o()})({0:function(t,e,o){t.exports=o("56d7")},"56d7":function(t,e,o){"use strict";o.r(e);o("e260"),o("e6cf"),o("cca6"),o("a79d");var n,s=o("2b0e"),r=function(){var t=this,e=t.$createElement,o=t._self._c||e;return o("div",{attrs:{id:"app"}},[o("h1",[t._v("Micro Blog")]),o("nav",[o("ul",[o("li",t._l(t.links,(function(e){return o("router-link",{key:e,attrs:{to:t.paths[e],exact:""}},[t._v(t._s(e))])})),1)])]),o("router-view",{attrs:{posts:t.posts,comments:t.comments},on:{"update-posts":function(e){return t.updatePosts()},"update-comments":function(e){return t.updateComments()}}})],1)},a=[],i=o("bc3a").create({baseURL:null!==(n="'http://e28-api.mystphy.sx")&&void 0!==n?n:"http://e28-api.loc/",responseType:"json"}),u={name:"App",data:function(){return{posts:[],comments:[],links:["home","all","submit"],paths:{home:"/",all:"/all",submit:"/submit"}}},methods:{updatePosts:function(){var t=this;i.get("post").then((function(e){t.posts=e.data.post}))},updateComments:function(){var t=this;i.get("comment").then((function(e){t.comments=e.data.comment}))}},mounted:function(){this.updatePosts(),this.updateComments()}},m=u,l=(o("efc4"),o("2877")),c=Object(l["a"])(m,r,a,!1,null,null,null),p=c.exports,d=o("8c4f"),f=function(){var t=this,e=t.$createElement,o=t._self._c||e;return o("div",{attrs:{id:"posts"}},[o("p",[t._v('A work in progress micro blog site. You can find the last three written posts on this homepage or you can visit the "all" page to see a list of all posts ever. Clicking on any post will take you to the page for that post where you can comment and read comments from other users. You can also submit your own post in an anonymous fashion by clicking submit above.')]),o("h2",[t._v("Most Recent Micro Blog Posts")]),t._l(t.recentPosts,(function(t){return o("router-link",{key:t.id,attrs:{to:"/all/"+t.id,exact:""}},[o("BlogPost",{attrs:{post:t}})],1)}))],2)},v=[],h=(o("fb6a"),function(){var t=this,e=t.$createElement,o=t._self._c||e;return o("div",{attrs:{id:"post"}},[o("div",{attrs:{id:"post-title"}},[t._v(t._s(t.post.title))]),o("p",{attrs:{id:"post-body"}},[t._v(t._s(t.post.body))])])}),b=[],_={name:"",props:["post"],data:function(){return{}}},y=_,g=Object(l["a"])(y,h,b,!1,null,null,null),w=g.exports,x={name:"",props:["posts"],components:{BlogPost:w},data:function(){return{}},computed:{recentPosts:function(){return this.posts.slice(-3).reverse()}}},P=x,C=Object(l["a"])(P,f,v,!1,null,null,null),k=C.exports,O=function(){var t=this,e=t.$createElement,o=t._self._c||e;return o("div",{attrs:{id:"posts"}},[o("h2",[t._v("All Micro Blog Posts")]),t._l(t.reversedPosts,(function(t){return o("router-link",{key:t.id,attrs:{to:"/all/"+t.id,exact:""}},[o("BlogPost",{attrs:{post:t}})],1)}))],2)},j=[],M={name:"",props:["posts"],components:{BlogPost:w},data:function(){return{}},computed:{reversedPosts:function(){return this.posts.slice().reverse()}}},$=M,N=Object(l["a"])($,O,j,!1,null,null,null),S=N.exports,E=function(){var t=this,e=t.$createElement,o=t._self._c||e;return o("div",{attrs:{id:"submit-post"}},[o("h4",[t._v("Submit a post")]),o("div",{attrs:{id:"inputs"}},[o("label",{attrs:{for:"title"}},[t._v("Title (Max 50 Characters)")]),o("input",{directives:[{name:"model",rawName:"v-model",value:t.post.title,expression:"post.title"}],attrs:{type:"text",id:"userName"},domProps:{value:t.post.title},on:{input:function(e){e.target.composing||t.$set(t.post,"title",e.target.value)}}}),o("label",{attrs:{for:"body"}},[t._v("Post (Max 5000 Characters)")]),o("textarea",{directives:[{name:"model",rawName:"v-model",value:t.post.body,expression:"post.body"}],attrs:{id:"body"},domProps:{value:t.post.body},on:{input:function(e){e.target.composing||t.$set(t.post,"body",e.target.value)}}})]),o("button",{on:{click:t.submitPost}},[t._v("Submit Post")]),t.errors?o("div",{attrs:{id:"error"}},[t._v(t._s(t.errors))]):t._e(),t.showConfirmationMessage?o("div",{attrs:{id:"success"}},[o("h3",[t._v("Success!")]),o("router-link",{attrs:{to:"/all/",exact:""}},[t._v("See your post on the main page...")])],1):t._e()])},B=[],D={name:"",data:function(){return{errors:null,showConfirmationMessage:!1,post:{title:"Enter a title...",body:"Your post content..."}}},methods:{submitPost:function(){var t=this;i.post("/post",this.post).then((function(e){e.data.errors?t.errors=e.data.errors:(t.$emit("update-posts"),t.showConfirmationMessage=!0)}))}}},I=D,T=Object(l["a"])(I,E,B,!1,null,null,null),Y=T.exports,A=function(){var t=this,e=t.$createElement,o=t._self._c||e;return o("div",{attrs:{id:"post-page"}},[t.post?o("div",[o("BlogPost",{attrs:{post:t.post}}),o("CommentSubmit",t._g({attrs:{id:t.id}},t.$listeners)),o("h2",[t._v("Comments")]),t._l(t.postComments,(function(t){return o("ShowComment",{key:t.id,attrs:{comment:t}})}))],2):t._e(),t.postNotFound?o("div",[o("p",[t._v("Post with id "+t._s(t.id)+" not found.")]),o("router-link",{attrs:{to:"/all"}},[t._v("Go back to all posts.")])],1):t._e()])},F=[],J=(o("4de4"),function(){var t=this,e=t.$createElement,o=t._self._c||e;return o("div",[o("h4",[t._v("Submit a comment")]),o("div",{attrs:{id:"inputs"}},[o("label",{attrs:{for:"userName"}},[t._v("Username (Max 20 Characters)")]),o("input",{directives:[{name:"model",rawName:"v-model",value:t.comment.userName,expression:"comment.userName"}],attrs:{type:"text",id:"userName"},domProps:{value:t.comment.userName},on:{input:function(e){e.target.composing||t.$set(t.comment,"userName",e.target.value)}}}),o("label",{attrs:{for:"body"}},[t._v("Comment (Max 200 Characters)")]),o("textarea",{directives:[{name:"model",rawName:"v-model",value:t.comment.body,expression:"comment.body"}],attrs:{id:"body"},domProps:{value:t.comment.body},on:{input:function(e){e.target.composing||t.$set(t.comment,"body",e.target.value)}}}),o("input",{directives:[{name:"model",rawName:"v-model",value:t.comment.postID,expression:"comment.postID"}],attrs:{type:"number",id:"postID",readonly:""},domProps:{value:t.comment.postID},on:{input:function(e){e.target.composing||t.$set(t.comment,"postID",e.target.value)}}})]),o("button",{on:{click:t.submitComment}},[t._v("Submit Comment")]),t.errors?o("div",{attrs:{id:"error"}},[t._v(t._s(t.errors))]):t._e(),t.showConfirmationMessage?o("div",{attrs:{id:"success"}},[o("h3",[t._v("Success!")])]):t._e()])}),R=[],U={name:"",props:["id"],data:function(){return{errors:null,showConfirmationMessage:!1,comment:{userName:"Enter a username...",body:"Your comment...",postID:this.id}}},methods:{submitComment:function(){var t=this;i.post("/comment",this.comment).then((function(e){e.data.errors?t.errors=e.data.errors:(t.$emit("update-comments"),t.showConfirmationMessage=!0)}))}}},G=U,L=Object(l["a"])(G,J,R,!1,null,null,null),q=L.exports,z=function(){var t=this,e=t.$createElement,o=t._self._c||e;return o("div",{attrs:{id:"comment"}},[o("div",{attrs:{id:"comment-username"}},[t._v(t._s(t.comment.userName)+" at "),o("div",{attrs:{id:"ts"}},[t._v(t._s(t.timestamp))])]),o("p",{attrs:{id:"comment-body"}},[t._v(t._s(t.comment.body))])])},H=[],K={name:"",props:["comment"],data:function(){return{}},computed:{timestamp:function(){return Date(this.comment.updated_at)}}},Q=K,V=Object(l["a"])(Q,z,H,!1,null,null,null),W=V.exports,X={name:"",props:["id","posts","comments"],components:{BlogPost:w,CommentSubmit:q,ShowComment:W},data:function(){return{}},computed:{post:function(){var t=this;return this.posts.filter((function(e){return e.id==t.id}),this.id)[0]},postNotFound:function(){return null==this.post},postComments:function(){var t=this;return this.comments.filter((function(e){return e.postID==t.id}),this.id)}}},Z=X,tt=Object(l["a"])(Z,A,F,!1,null,null,null),et=tt.exports;s["a"].config.productionTip=!1,s["a"].use(d["a"]);var ot=new d["a"]({mode:"history",routes:[{path:"/",component:k},{path:"/all",component:S},{path:"/submit",component:Y},{path:"/all/:id",component:et,props:!0}]});new s["a"]({router:ot,render:function(t){return t(p)}}).$mount("#app")},c107:function(t,e,o){},efc4:function(t,e,o){"use strict";o("c107")}});
//# sourceMappingURL=app.8fa0cdee.js.map