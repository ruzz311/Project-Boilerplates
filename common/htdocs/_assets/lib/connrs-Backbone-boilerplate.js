(function(s,w,m,u,f){var j={};j.cache=function(){var c={};return{store:function(d,e){c[d]=e;return this},load:function(d){return d in c?c[d]:false},list:function(d){if(d!==f){var e=RegExp("^"+d),g={};d=_(_(c).keys()).chain().select(function(h){return!!h.match(e)}).value();_(d).each(function(h,k){g[k]=h});return g}else return c}}}();_.extend(j.cache,m.Events);j.templates=function(){var c=j.cache;return{compile:function(d){var e;if(!d)return false;e=this.getCached(d);if(e===false)if($("#"+d).length){e=
$("#"+d).text();e=u.compile(e);c.store("cbb_template_"+d,e)}else return false;return e},addPartial:function(d,e){u.registerPartial(d,e);return this},add:function(d,e){var g=u.compile(e);c.store("cbb_template_"+d,g);return this},getCached:function(d){return c.load("cbb_template_"+d)},list:function(){return c.list("cbb_template_")}}}(this,w);j.Model=m.Model.extend({fetch:function(c){c||(c={});var d=this,e=c.success;d.trigger("fetching");c.success=function(g){e&&e(d,g);d.trigger("fetched")};m.Model.prototype.fetch.call(d,
c)},initialize:function(c,d){if(d.childOptions)this.childOptions=d.childOptions;m.Model.prototype.initialize.call(this,c,d)}});j.Router=m.Router.extend({parseData:function(){if(s.location&&s.location.search){var c=s.location.search.substr(1).split("&");return _(c).chain().select(function(d){return d.match(/^data/)}).map(function(d){d=d.substr(4).split("=");var e=d[1];return{key:d[0].replace(/\]\[/g," ").replace(/\[|\]/g,"").split(" "),val:e}}).reduce(function(d,e){for(var g=e.key.length,h=false,k=
0;k<g;k++)if(!h&&!d[e.key[k]]){d[e.key[k]]=k<g-1?{}:e.val;h=d[e.key[k]]}else{if(h[e.key[k]]){if(k==g-1)h[e.key[k]]=e.val}else h[e.key[k]]=k<g-1?{}:e.val;h=h[e.key[k]]}return d},{}).value()}else return false},templates:j.templates});j.Collection=m.Collection.extend({initialize:function(c){if(c){if(c.page!==f&&c.page!=0)this.page=c.page;if(c.baseUrl!==f){this.baseUrl=c.baseUrl;delete c.baseUrl}if(c.params&&typeof c.params=="object")this.params=_.clone(c.params);if(c.modelName!==f)this.modelName=c.modelName;
if(c.watcher!==f)if(_.isArray(c.watcher))_(c.watcher).each(function(d,e){d[e].parent.bind(d[e].event,this.fetch,this);this.viewWatcherIsReady(d)&&this.fetch()},this);else{c.watcher.parent.bind(c.watcher.event,this.fetch,this);this.viewWatcherIsReady(c.watcher)&&this.fetch()}}},viewWatcherIsReady:function(c){return c.parent[c.event+"Ready"]===true},comparator:function(c){return(c=c.get("created"))?c.replace(/\D/g,"")*-1:0},fetch:function(c){c||(c={});var d=this,e=c.success;d.trigger("fetching");c.success=
function(g){e&&e(d,g);d.trigger("fetched")};m.Collection.prototype.fetch.call(d,c)},parse:function(c){if(c.page!=f&&c.per_page!=f&&c.total!=f){this.page=c.page;this.perPage=c.per_page;this.total=c.total;return c.models}else return c},fresh:function(){delete this.perPage;delete this.total;this._reset();this.page=1;return this},url:function(){var c="",d=this.page?"?"+$.param(_.extend(this.params||{},{page:this.page})):"";if(this.baseUrl)c=typeof this.baseUrl=="function"?this.baseUrl():this.baseUrl;
else if(this.name)c="/"+this.name;return c+d},pageInfo:function(){if(this.page&&this.perPage&&this.total){var c={total:this.total,page:this.page,perPage:this.perPage,pages:Math.ceil(this.total/this.perPage),prev:false,next:false},d=Math.min(this.total,this.page*this.perPage);if(this.total==this.pages*this.perPage)d=this.total;c.range=[(this.page-1)*this.perPage+1,d];if(this.page>1)c.prev=this.page-1;if(this.page<c.pages)c.next=this.page+1;return c}else return f},nextPage:function(){if(this.page&&
this.pageInfo().next){this.page+=1;this.fetch();return this}else return false},previousPage:function(){if(this.page&&this.pageInfo().prev){this.page-=1;this.fetch();return this}else return false}});j.View=m.View.extend({initialize:function(c){if(c){if(c.router)this.router=c.router;if(c.model)this.model=c.model;if(c.widgets)this.widgets=c.widgets;if(c.itemWidgets)this.itemWidgets=c.itemWidgets;if(c.modelName)this.modelName=c.modelName;if(c.itemTagName)this.itemTagName=c.itemTagName;if(c.extras)this.extras=
c.extras;if(c.parentModel)this.parentModel=c.parentModel;if(c.gotoViewOnAdd!==f)this.gotoViewOnAdd=c.gotoViewOnAdd;if(c.hideFormOnSubmit!==f)this.hideFormOnSubmit=c.hideFormOnSubmit;if(c.showButtons!==f)this.showButtons=c.showButtons;if(c.parentView){this.parentView=c.parentView;typeof this.redrawItems==="function"&&this.parentView.bind("renderChildren",this.redrawItems,this)}}this.bind("rendered",this.rendered,this);this.bind("rendering",this.rendering,this)},widgets:{},templates:j.templates,commonWidgets:function(c){for(widget in this.widgets){var d=
widget.match(/^(\w+)\s*(.*)$/),e=$(d[2],c.get());d=d[1];var g=this.widgets[widget],h=[],k=$(this.el),l,n;if(this.tagName!==f&&this.model&&this.model.get){l=this.model.get("id")||Math.random();n=this.model.get("title")||this.model.get("name")||"unknown"}else{l=Math.random();n="unknown"}for(p in g)h[p]=_.clone(g[p]);for(a in h){for(b in h[a])if(typeof h[a][b]==="string"&&h[a][b].match(/^cb_/)){g=h[a][b].substr(3);h[a][b]=_.bind(this[g],this)}h[a].$backboneEl=k;h[a].id=l;h[a].title=n}if(h!==f)e[d].apply(e,
h);else e[d]()}},render:function(c,d){var e=typeof this.el=="function"?$(this.el()):$(this.el);if(e.length>0){e.html(c(d));this.commonWidgets(e)}return this},redirect:function(c){this.router.navigate(c,true)},add:function(c){c.preventDefault();var d=$(c.target),e=c.target,g=this.collection,h=/^((\w+)\.)?(\w+)$/,k=this.gotoViewOnAdd,l=this.hideFormOnSubmit,n=this,o={};$("input,textarea,select",c.target).not("input[type=submit]").each(function(){var q=$(this).val(),r=$(this).attr("name").match(h),t=
r[2];r=r[3];if(t!==f){o[t]||(o[t]={});o[t][r]=q}else o[r]=q});var v=this;(new this.collection.model(o)).save(null,{success:function(q){g.add([q]);d.removeClass("ajax-error");e.reset();k&&n.redirect(g.name+"/view/"+q.get("id"));l&&d.fadeOut("fast");v.parentModel&&v.parentModel.trigger&&v.parentModel.trigger("childAdd")},error:function(){d.addClass("ajax-error")}})},update:function(c,d){var e=this.model,g=$(c),h=c.nodeName=="DIV",k=g.attr("data-field-data")!==f,l=g.data("field");g=h?g.html():k?g.attr("data-field-data"):
g.text();e.attributes[l]=g;e._changed=true;e.save({},{silent:true,success:function(n){d.success();n.trigger("change")},error:d.error});return{success:false,ret:false}.success},next:function(c){c.preventDefault();this.collection.nextPage()},prev:function(c){c.preventDefault();this.collection.previousPage()},rendering:function(){$(this.el).addClass("fading");this.renderChildrenReady=f;return this},rendered:function(){$(this.el).removeClass("fading");this.trigger("renderChildren");this.renderChildrenReady=
true;return this}});j.PageView=j.View.extend({initialize:function(c){j.View.prototype.initialize.call(this,c);if(c){if(c.context)this.context=c.context;if(c.viewTemplate!==f)this.viewTemplate=typeof c.viewTemplate==="string"?this.templates.compile(c.viewTemplate):c.viewTemplate;if(c.events){this.events||(this.events={});_(this.events).extend(c.events);this.delegateEvents()}}this.bind("reset",this.resetData,this);this.bind("reset",this.resetSubViews,this)},render:function(){var c=$(this.el),d={};if(this.context===
"model"&&this.model!==f)d=this.model.toJSON();else if(this.context==="collection"&&this.collection!==f)d[this.collection.modelName]=this.collection.toJSON();else d=this.context&&this[this.context]?this[this.context].toJSON():{};c.html(this.viewTemplate(d));this.commonWidgets(c);this.trigger("rendered");c.trigger("rendered");return this},filterBy:function(c){this.collection.params.filter=$(c.target).text();this.collection.fetch()},resetData:function(){this.model&&delete this.model;this.collection&&
delete this.collection},resetSubViews:function(){this.views={};return this}});j.ListView=j.View.extend({modelName:f,itemTagName:"li",gotoViewOnAdd:false,showButtons:true,hideFormOnSubmit:true,initialize:function(c){j.View.prototype.initialize.call(this,c);$(this.el).addClass("paginated");this.collection.bind("add",this.redrawItems,this).bind("reset",this.redrawItems,this).bind("fetched",this.redrawItems,this).bind("fetching",this.fetchingItems,this);if(c){if(c.events!==f){this.events||(this.events=
{});_(this.events).extend(c.events);delete c.events}if(c.itemListTemplateStem!==f){this.itemListTemplateStem=c.itemListTemplateStem;delete c.itemListTemplateStem}else this.itemListTemplateStem="ItemView"}this.commonWidgets($(this.el))},events:{"click .next":"next","click .prev":"prev",'click .p_form a[data-type="add"]':"renderAddForm",'submit form[action*="add"]':"add"},fetchingItems:function(){$(this.el).addClass("fading")},renderAddForm:function(c){c.preventDefault();c=$(this.el);var d=this.templates.compile(this.modelName.toLowerCase()+
"ItemAdd"),e={customer_id:this.collection.params.customer_id},g=c.find(".p_form");this.commonWidgets($(d(e)).insertBefore(g.get(0)));for(i in this.extras){d=this.extras[i];(new j.MiniListView({collection:d.collection,findEl:d.config.findEl,keyName:d.config.keyName,modelFieldName:d.config.modelFieldName,parentModel:this.parentModel,parentView:this,$parentViewEl:c,valueName:d.config.valueName})).render()}g.fadeOut("fast")},_extendDataWithExtras:function(c){if(this.extras!==f){if(this.extras.users!==
f)c.users=this.extras.users.toJSON();if(this.extras.websites!==f)c.websites=this.extras.websites.toJSON();if(this.extras.services!==f)c.services=this.extras.services.toJSON()}return c},redrawItems:function(){var c=this.templates.compile("pagination"),d=this.templates.compile(this.modelName.toLowerCase()+"Buttons"),e=$(this.el);this.$("article, .pagelinks, .emptycollection, ul[data-icontainer], .p_form").remove();this.$(".loading").fadeOut("fast").remove();if(this.collection.models.length>0){e.removeClass("empty");
if(this.itemTagName==="li"){$itemContainer=e.find("ul[data-icontainer]");if($itemContainer.length===0)$itemContainer=$('<ul data-icontainer="1" class="mini list"></ul>').appendTo(this.el)}for(i in this.collection.models){var g=this.collection.models[i],h=new j.ItemView({tagName:this.itemTagName,viewTemplate:this.modelName.toLowerCase()+this.itemListTemplateStem,widgets:this.itemWidgets,model:g});this.itemTagName==="li"?$itemContainer.append(h.render().el):e.append(h.render().el);if(this.extras!==
f&&typeof this.extras==="object")for(i in this.extras){var k=this.extras[i],l=k.config;new j.MiniListView({collection:k.collection,findEl:l.findEl,keyName:l.keyName,modelFieldName:l.modelFieldName,parentModel:g,parentView:h,$parentViewEl:h.el,valueName:l.valueName})}$(h.el).trigger("rendered");this.bind("rendered",function(){this.trigger("rendered")},h)}e.append(c({model:this.modelName,pageInfo:this.collection.pageInfo()}))}else{e.addClass("empty");e.append(this.templates.compile("emptyCollection")({modelName:this.modelName}))}this.showButtons&&
e.append(d());this.trigger("rendered");e.removeClass("fading")}});j.MiniListView=j.View.extend({initialize:function(c){j.View.prototype.initialize.call(this,c);if(c!==f){if(c.allowEmpty!==f){this.allowEmpty=c.allowEmpty;delete c.allowEmpty}if(c.findEl!==f){this.findEl=c.findEl;delete c.findEl}if(c.$parentViewEl!==f){this.$parentViewEl=c.$parentViewEl;delete c.$parentViewEl}if(c.parentView){this.parentView=c.parentView;delete c.parentView}if(c.keyName!==f){this.keyName=c.keyName;delete c.keyName}if(c.valueName!==
f){this.valueName=c.valueName;delete c.valueName}if(c.modelFieldName!==f){this.modelFieldName=c.modelFieldName;delete c.modelFieldName}}this.collection.bind("fetched",this.render,this);this.parentView.bind("rendered",this.render,this)},tagName:"option",render:function(){var c=this,d=$(this.findEl,this.$parentViewEl),e=this.allowEmpty===true?'<option value=""></option>':"";this.collection.forEach(function(g){e+="<"+c.tagName+' value="'+g.get(c.keyName)+'">'+g.get(c.valueName)+"</"+c.tagName+">"});
d.html(e);this.parentModel!==f&&d.val(this.parentModel.get(this.modelFieldName))}});j.ItemView=j.View.extend({modelName:f,tagName:"li",initialize:function(c){j.View.prototype.initialize.call(this,c);if(c!==f)if(c.viewTemplate&&typeof c.viewTemplate=="string")this.viewTemplate=this.templates.compile(c.viewTemplate)},render:function(){var c=$(this.el);c.html(this.viewTemplate(this.model.toJSON()));this.commonWidgets(c);return this}});s[ config.namespace ]=j})(this,document,this.Backbone,this.Handlebars);
