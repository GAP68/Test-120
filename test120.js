
////////////////////////////
// Simple Web socket Test //
////////////////////////////

/**
 * Global anonim function
 * @param  {Object} W   window
 * @param  {Object} D   document
 * @param  {Value} u7d  undefined
 * @return {undefined}     undefined
 */
; + function(W, D, u7d) { 
	"use strict";
    var
        _WSURL = "wss://echo.websocket.org/",	// socket URL	
        _WSID = 0,								// socket iD
        _WSPool = [],							// pool sockets
        _hub = {								// functions HUB for direct call
            'string': function(ns) {
                return D.createElement(ns);		// @param {Any} value for parsing
            },
            'boolean': function(ns) {
                return ns;
            },
            'object': function(ns) {
                var el = D.createElement(ns.element);	// @var el {HTML} HTML element
                if (ns.inner)
                    el.innerHTML = ns.inner;
                ns.sclass && el.setAttribute("class", ns.sclass);
                ns.trgt && ns.trgt.appendChild(el);
                return el;
            },
            'number': function(ns) {
                return ns;
            }
        },

/**
 * WSCtor constructor of WebSockets 
 * @param {String} name original name for instance
 */
        WSCtor = function(name) {
            this._name = name;			
            this._wsurl = _WSURL;		
            this._wsid = ++_WSID;
            this._wsocket = new WebSocket(this._wsurl);		// real socket instance
            this._docTarg = D.getElementById('cont');		// DOM target element for All Content
            // this.model = [
            // {trgt:this.docTarg, element:'form', inner:'<input type="textarea"></input><input type="textarea"></input><input type="button"></input>'}
            // ];
            //this.docTarg = 2;
        },
/**
 * Lazy load foo for first initialization Event listener
 * @param  {Event} type		event
 * @param  {Node} target	DOM element
 * @param  {Boolean} flag   implementation
 * @param  {Foo} listener	to do
 * @return {Object}         undefined
 */
        addEvnt = window.addEventListener ? function(type, target, flag, listener) {	// new way
            target.addEventListener(type, listener, flag);
        } : function(type, target, listener) {											// old way
            target.attachEvent('on' + type, listener);
        },
/**
 * Init function they'll lets go past window onload
 * @return {[type]} [description]
 */
        init = function() {
            _WSPool.push(W.WS = new WSCtor('firstWS'));	// socket instance
            WSCtor.prototype = {						// add methods and params
                namef: function() {						// getter||setter name
                    if (arguments.length) {
                        //console.log(arguments['0']);
                        var z = this._name ? this._name : u7d;
                        this._name = arguments['0'];
                        return z;
                    } else
                        return this._name;
                },
                template: function(a) {					// create DOM from tamplste
                    return createHTML(a);
                },
                view: function() {						// attach DOM element
                    this._docTarg.appendChild(this.template(this.model[0]));
                },
                model: {								// model for dynamic DOM
                    trgt: this._docTarg,				// target
                    element: 'form',					// node
                    inner: '<input type="textarea"></input><input type="textarea"></input><input type="button"></input>'	// inner Elements or Text
                }
            };
        };


    createHTML({
        trgt: D.getElementById('cont'),
        element: 'h4',
        inner: 'MOCRDF',
        sclass: 'briory'
    });

    addEvnt('load', window, false, init);	// Start dot.

    // window.addEventListener("load", function() {
    //     console.log('sttrt');
    //     _WSPool.push(window.WS = new WSCtor('firstWS'))
    // }, false);

    //debugger;
    window.WSPool = _WSPool;
    //createHTML(['p', 'a', 'span', 'div', 1]);
    //template(['p', 'a', 'span', 'div']);

/**
 * createHTML - micro template 
 * @param  {Any} s input param any format
 * @return {[type]}   Node element or target.
 */
    function createHTML(s) {

        if (s instanceof Array) {

            var docFrag = D.createDocumentFragment();

            s.forEach(function(ss) {
                if (ss instanceof Array) return;
                docFrag.appendChild(createHTML(ss));
            });

            return docFrag;
        }
        return _hub[typeof s](s);

    }

}(window, document);