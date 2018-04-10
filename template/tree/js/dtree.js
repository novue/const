
// Node object

function Node(id, pid, name, url, title, target, icon, iconOpen, open) {

	this.id = id;  //int 每个节点都有唯一id，增加节点时需要手工定义一个id。 

	this.pid = pid;  //int 父节点ID，根节点的父节点是-1。 

	this.name = name;  //String 节点名称（显示名字） 

	this.url = url;  //String 节点URL（鼠标点击跳转地址） 

	this.title = title;  //String 鼠标移动到节点上显示的文字 

	this.target = target;  //String 页面跳转所在的frame 

	this.icon = icon;  //String 节点关闭时显示的图标地址 

	this.iconOpen = iconOpen;  //String 节点打开时显示的图标地址 

	this._io = open || false; //boolean 节点是否已打开，默认值false。

	this._is = false;  //boolean 节点是否被选中，默认值false。

	this._ls = false;  //boolean 是否是最后一个节点，默认值false。 

	this._hc = false;  //boolean 是否有子节点，默认值false。 

	this._ai = 0;  //int 在树的节点数组中的下标(位置)，默认值0。 

	this._p;  //Node 父节点对象，默认值null。

};



// Tree object

function dTree(objName) {  //void 构造方法，创建树对象。objName: 树名称。

	this.config = {

		target					: null,  //设置所有节点的target，默认null 

		folderLinks			: true,  //目录节点是否可以有链接,默认true 

		useSelection		: true,  //节点是否可以被选择(高亮),默认true 

		useCookies			: true,  //设置使用cookies保存树的状态,默认true 

		useLines				: true,  //是否显示路径点线,默认true 

		useIcons				: true,  //是否显示图标,默认true 

		useStatusText		: false,  //是否在状态栏输出节点文字（替换原来的url显示）,默认false 

		closeSameLevel	: false,  //是否自动关闭兄弟节点（当打开本节点时）,注意设置true时，openAll()和closeAll()不能工作，默认false 

		inOrder					: false  //如果父节点总是在子节点之前加入树，设置true有更好的效率，默认false 

	}

	this.icon = {

		root				: 'img/base.gif',  //根,默认'img/base.gif' 

		folder			: 'img/folder.gif',  //关闭的文件夹,默认'img/folder.gif' 

		folderOpen	: 'img/folderopen.gif',  //打开的文件夹,默认'img/folderOpen.gif' 

		node				: 'img/page.gif',  //文件,默认'img/page.gif' 

		empty				: 'img/empty.gif',  //空,默认'img/empty.gif' 

		line				: 'img/line.gif',  //竖线,默认'img/line.gif' 

		join				: 'img/join.gif',  //丁线,默认'img/join.gif' 

		joinBottom	: 'img/joinbottom.gif',  //直角线,默认'img/joinbottom.gif' 

		plus				: 'img/plus.gif',  //加号丁线,默认'img/plus.gif' 

		plusBottom	: 'img/plusbottom.gif',  //加号直角线,默认'img/plusbottom.gif' 

		minus				: 'img/minus.gif',  //减号丁线,默认'img/minus.gif' 

		minusBottom	: 'img/minusbottom.gif',  //减号直角线,默认'img/minusbottom.gif' 

		nlPlus			: 'img/nolines_plus.gif',  //无线加号,默认'img/nolines_plus.gif' 

		nlMinus			: 'img/nolines_minus.gif'  //无线减号,默认'img/nolines_minus.gif' 

	};

	this.obj = objName;  

	this.aNodes = [];  //树中的节点数组。 

	this.aIndent = []; // 数组。 

	this.root = new Node(-1);  //根节点。 

	this.selectedNode = null;  //Node 当前选择的节点。 

	this.selectedFound = false;  //boolean 是否有选中节点，默认false。 

	this.completed = false;  //boolean 树构建html是否已完成完成，默认false。 

};



// Adds a new node to the node array

dTree.prototype.add = function(id, pid, name, url, title, target, icon, iconOpen, open) {  //dTree(objName) : void 构造方法，创建树对象。objName: 树名称。 

	this.aNodes[this.aNodes.length] = new Node(id, pid, name, url, title, target, icon, iconOpen, open);

};  //add(id, pid, name, url, title, target, icon, iconOpen, open) : void 在树中增加一个节点，节点对象添置到aNodes数组末尾。参数open表示节点是否已经打开。


// Open/close all nodes

dTree.prototype.openAll = function() {

	this.oAll(true);   //openAll() : void 打开树中所有节点。此方法由oAll方法实现。 

};

dTree.prototype.closeAll = function() {

	this.oAll(false);  //closeAll() : void 关闭树中所有节点。此方法由oAll()方法实现。 

};



// Outputs the tree to the page

dTree.prototype.toString = function() {

	var str = '<div class="dtree">\n';

	if (document.getElementById) {

		if (this.config.useCookies) this.selectedNode = this.getSelected();

		str += this.addNode(this.root);

	} else str += 'Browser not supported.';

	str += '</div>';

	if (!this.selectedFound) this.selectedNode = null;

	this.completed = true;

	return str;

};  //toString() : String 构建树的html。此方法主要由addNode()方法实现。返回：html。 



// Creates the tree structure

dTree.prototype.addNode = function(pNode) {

	var str = '';

	var n=0;

	if (this.config.inOrder) n = pNode._ai;

	for (n; n<this.aNodes.length; n++) {

		if (this.aNodes[n].pid == pNode.id) {

			var cn = this.aNodes[n];

			cn._p = pNode;

			cn._ai = n;

			this.setCS(cn);

			if (!cn.target && this.config.target) cn.target = this.config.target="#Conframe";

			if (cn._hc && !cn._io && this.config.useCookies) cn._io = this.isOpen(cn.id);

			if (!this.config.folderLinks && cn._hc) cn.url = null;

			if (this.config.useSelection && cn.id == this.selectedNode && !this.selectedFound) {

					cn._is = true;

					this.selectedNode = n;

					this.selectedFound = true;

			}

			str += this.node(cn, n);

			if (cn._ls) break;

		}

	}

	return str;

};  //addNode(pNode) : String 构建pNode的所有子节点的html。参数pNode: 父节点对象。返回：html。 



// Creates the node icon, url and text

dTree.prototype.node = function(node, nodeId) {

	var str = '<div class="dTreeNode">' + this.indent(node, nodeId);

	if (this.config.useIcons) {

		if (!node.icon) node.icon = (this.root.id == node.pid) ? this.icon.root : ((node._hc) ? this.icon.folder : this.icon.node);

		if (!node.iconOpen) node.iconOpen = (node._hc) ? this.icon.folderOpen : this.icon.node;

		if (this.root.id == node.pid) {

			node.icon = this.icon.root;

			node.iconOpen = this.icon.root;

		}

		str += '<img id="i' + this.obj + nodeId + '" src="' + ((node._io) ? node.iconOpen : node.icon) + '" alt="" />';

	}

	if (node.url) {

		str += '<a id="s' + this.obj + nodeId + '" class="' + ((this.config.useSelection) ? ((node._is ? 'nodeSel' : 'node')) : 'node') + '" href="' + node.url +'"';

		if (node.title) str += ' title="' + node.title + '"';

		if (node.target) str += ' target="' + node.target + '"';

		if (this.config.useStatusText) str += ' onmouseover="window.status=\'' + node.name + '\';return true;" onmouseout="window.status=\'\';return true;" ';

		if (this.config.useSelection && ((node._hc && this.config.folderLinks) || !node._hc))

			str += ' onclick="javascript: ' + this.obj + '.s(' + nodeId + ');"';

		str += '>';

	}

	else if ((!this.config.folderLinks || !node.url) && node._hc && node.pid != this.root.id)

		str += '<a href="javascript: ' + this.obj + '.o(' + nodeId + ');" class="node">';

	str += node.name;

	if (node.url || ((!this.config.folderLinks || !node.url) && node._hc)) str += '</a>';

	str += '</div>';

	if (node._hc) {

		str += '<div id="d' + this.obj + nodeId + '" class="clip" style="display:' + ((this.root.id == node.pid || node._io) ? 'block' : 'none') + ';">';

		str += this.addNode(node);

		str += '</div>';

	}

	this.aIndent.pop();

	return str;

};  //node(node, nodeId) : String 构建node的html。参数node: 节点对象；nodeId: 节点在节点数组aNodes中的位置。返回：html。 



// Adds the empty and line icons

dTree.prototype.indent = function(node, nodeId) {

	var str = '';

	if (this.root.id != node.pid) {

		for (var n=0; n<this.aIndent.length; n++)

			str += '<img src="' + ( (this.aIndent[n] == 1 && this.config.useLines) ? this.icon.line : this.icon.empty ) + '" alt="" />';

		(node._ls) ? this.aIndent.push(0) : this.aIndent.push(1);

		if (node._hc) {

			str += '<a href="javascript: ' + this.obj + '.o(' + nodeId + ');"><img id="j' + this.obj + nodeId + '" src="';

			if (!this.config.useLines) str += (node._io) ? this.icon.nlMinus : this.icon.nlPlus;

			else str += ( (node._io) ? ((node._ls && this.config.useLines) ? this.icon.minusBottom : this.icon.minus) : ((node._ls && this.config.useLines) ? this.icon.plusBottom : this.icon.plus ) );

			str += '" alt="" /></a>';

		} else str += '<img src="' + ( (this.config.useLines) ? ((node._ls) ? this.icon.joinBottom : this.icon.join ) : this.icon.empty) + '" alt="" />';

	}

	return str;

};  //indent(node, nodeId) : String 构建node前面的空格、点线、加减号的html。参数node: 节点对象；nodeId: 节点在节点数组aNodes中的位置。返回：html。



// Checks if a node has any children and if it is the last sibling

dTree.prototype.setCS = function(node) {

	var lastId;

	for (var n=0; n<this.aNodes.length; n++) {

		if (this.aNodes[n].pid == node.id) node._hc = true;

		if (this.aNodes[n].pid == node.pid) lastId = this.aNodes[n].id;

	}

	if (lastId==node.id) node._ls = true;  //setCS(node) : void 检查并设置:1. node节点是否有子节点; 2. node节点是否是节点数组aNodes中的最后一个。参数node: 节点对象。 

};



// Returns the selected node

dTree.prototype.getSelected = function() {

	var sn = this.getCookie('cs' + this.obj);

	return (sn) ? sn : null;  //getSelected() : int 从cookies中获取已选中的节点，返回：节点id或null(没有选中任何节点)。 

};



// Highlights the selected node

dTree.prototype.s = function(id) {

	if (!this.config.useSelection) return;

	var cn = this.aNodes[id];

	if (cn._hc && !this.config.folderLinks) return;

	if (this.selectedNode != id) {

		if (this.selectedNode || this.selectedNode==0) {

			eOld = document.getElementById("s" + this.obj + this.selectedNode);

			eOld.className = "node";

		}

		eNew = document.getElementById("s" + this.obj + id);

		eNew.className = "nodeSel";

		this.selectedNode = id;

		if (this.config.useCookies) this.setCookie('cs' + this.obj, cn.id);

	}  //s(id) : void 鼠标点击节点发生的动作，高亮选择的节点，并记录在cookies中。参数id： 节点在节点数组aNodes中的位置 

};



// Toggle Open or close

dTree.prototype.o = function(id) {

	var cn = this.aNodes[id];

	this.nodeStatus(!cn._io, id, cn._ls);

	cn._io = !cn._io;

	if (this.config.closeSameLevel) this.closeLevel(cn);

	if (this.config.useCookies) this.updateCookie();  //o(id) : void 鼠标点击+-图标发生的动作，打开或关闭指定节点，并记录在cookies中。参数id： 节点在节点数组aNodes中的位置 

};



// Open or close all nodes

dTree.prototype.oAll = function(status) {

	for (var n=0; n<this.aNodes.length; n++) {

		if (this.aNodes[n]._hc && this.aNodes[n].pid != this.root.id) {

			this.nodeStatus(status, n, this.aNodes[n]._ls)

			this.aNodes[n]._io = status;

		}

	}

	if (this.config.useCookies) this.updateCookie();  //oAll(status) : void 打开或关闭所有节点，并将状态记录在cookies中。参数status：true打开 fasle关闭 

};



// Opens the tree to a specific node

dTree.prototype.openTo = function(nId, bSelect, bFirst) {

	if (!bFirst) {

		for (var n=0; n<this.aNodes.length; n++) {

			if (this.aNodes[n].id == nId) {

				nId=n;

				break;

			}

		}

	}

	var cn=this.aNodes[nId];

	if (cn.pid==this.root.id || !cn._p) return;

	cn._io = true;

	cn._is = bSelect;

	if (this.completed && cn._hc) this.nodeStatus(true, cn._ai, cn._ls);

	if (this.completed && bSelect) this.s(cn._ai);

	else if (bSelect) this._sn=cn._ai;

	this.openTo(cn._p._ai, false, true);  //openTo(nId, bSelect, bFirst) : void 打开指定节点，并将状态记录在cookies中。参数nId：节点ID或节点在节点数组aNodes中的位置；bSelect：true-打开同时被选中，false-打开不被选中；bFirst：true-nId是在节点数组aNodes中的位置，false-nId是节点ID。 

};



// Closes all nodes on the same level as certain node

dTree.prototype.closeLevel = function(node) {

	for (var n=0; n<this.aNodes.length; n++) {

		if (this.aNodes[n].pid == node.pid && this.aNodes[n].id != node.id && this.aNodes[n]._hc) {

			this.nodeStatus(false, n, this.aNodes[n]._ls);

			this.aNodes[n]._io = false;

			this.closeAllChildren(this.aNodes[n]);

		}

	}  //closeLevel(node) : void 关闭和node同级别以及他们的下级的所有节点。参数node：节点对象。 

}



// Closes all children of a node

dTree.prototype.closeAllChildren = function(node) {

	for (var n=0; n<this.aNodes.length; n++) {

		if (this.aNodes[n].pid == node.id && this.aNodes[n]._hc) {

			if (this.aNodes[n]._io) this.nodeStatus(false, n, this.aNodes[n]._ls);

			this.aNodes[n]._io = false;

			this.closeAllChildren(this.aNodes[n]);		

		}

	}  //closeAllChildren(node) : void 关闭node的所有子节点。参数node：节点对象。 

}



// Change the status of a node(open or closed)

dTree.prototype.nodeStatus = function(status, id, bottom) {

	eDiv	= document.getElementById('d' + this.obj + id);

	eJoin	= document.getElementById('j' + this.obj + id);

	if (this.config.useIcons) {

		eIcon	= document.getElementById('i' + this.obj + id);

		eIcon.src = (status) ? this.aNodes[id].iconOpen : this.aNodes[id].icon;

	}

	eJoin.src = (this.config.useLines)?

	((status)?((bottom)?this.icon.minusBottom:this.icon.minus):((bottom)?this.icon.plusBottom:this.icon.plus)):

	((status)?this.icon.nlMinus:this.icon.nlPlus);

	eDiv.style.display = (status) ? 'block': 'none';  //nodeStatus(status, id, bottom) : void 改变节点的状态（关闭 或 打开）。参数status： 要设置的状态(true:打开 false:关闭)；id: 节点ID；bottom: true-是最后一个节点。

};





// [Cookie] Clears a cookie

dTree.prototype.clearCookie = function() {

	var now = new Date();

	var yesterday = new Date(now.getTime() - 1000 * 60 * 60 * 24);

	this.setCookie('co'+this.obj, 'cookieValue', yesterday);

	this.setCookie('cs'+this.obj, 'cookieValue', yesterday);  //clearCookie() : void 清除cookies。 

};



// [Cookie] Sets value in a cookie

dTree.prototype.setCookie = function(cookieName, cookieValue, expires, path, domain, secure) {

	document.cookie =

		escape(cookieName) + '=' + escape(cookieValue)

		+ (expires ? '; expires=' + expires.toGMTString() : '')

		+ (path ? '; path=' + path : '')

		+ (domain ? '; domain=' + domain : '')

		+ (secure ? '; secure' : '');  //setCookie(cookieName, cookieValue, expires, path, domain, secure) : void 记录入cookies。 

};



// [Cookie] Gets a value from a cookie

dTree.prototype.getCookie = function(cookieName) {

	var cookieValue = '';

	var posName = document.cookie.indexOf(escape(cookieName) + '=');

	if (posName != -1) {

		var posValue = posName + (escape(cookieName) + '=').length;

		var endPos = document.cookie.indexOf(';', posValue);

		if (endPos != -1) cookieValue = unescape(document.cookie.substring(posValue, endPos));

		else cookieValue = unescape(document.cookie.substring(posValue));

	}

	return (cookieValue);  //getCookie(cookieName) : String 从cookies中读取。 

};



// [Cookie] Returns ids of open nodes as a string

dTree.prototype.updateCookie = function() {

	var str = '';

	for (var n=0; n<this.aNodes.length; n++) {

		if (this.aNodes[n]._io && this.aNodes[n].pid != this.root.id) {

			if (str) str += '.';

			str += this.aNodes[n].id;

		}

	}

	this.setCookie('co' + this.obj, str);  //updateCookie() : void 将所有打开的节点ID记录在cookies中。

};



// [Cookie] Checks if a node id is in a cookie

dTree.prototype.isOpen = function(id) {

	var aOpen = this.getCookie('co' + this.obj).split('.');

	for (var n=0; n<aOpen.length; n++)

		if (aOpen[n] == id) return true;

	return false;  //isOpen(id) : boolean 根据cookies的记录，判断一个节点是已经打开。参数id：节点id 

};



// If Push and pop is not implemented by the browser

if (!Array.prototype.push) {

	Array.prototype.push = function array_push() {

		for(var i=0;i<arguments.length;i++)

			this[this.length]=arguments[i];

		return this.length;

	}

};

if (!Array.prototype.pop) {

	Array.prototype.pop = function array_pop() {

		lastElement = this[this.length-1];

		this.length = Math.max(this.length-1,0);

		return lastElement;

	}

};