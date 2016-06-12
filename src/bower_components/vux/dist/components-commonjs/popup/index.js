module.exports = function(modules) {
    var installedModules = {};
    function __webpack_require__(moduleId) {
        if (installedModules[moduleId]) return installedModules[moduleId].exports;
        var module = installedModules[moduleId] = {
            exports: {},
            id: moduleId,
            loaded: false
        };
        modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
        module.loaded = true;
        return module.exports;
    }
    __webpack_require__.m = modules;
    __webpack_require__.c = installedModules;
    __webpack_require__.p = "";
    return __webpack_require__(0);
}([ function(module, exports, __webpack_require__) {
    module.exports = __webpack_require__(42);
}, function(module, exports) {
    var core = module.exports = {
        version: "2.4.0"
    };
    if (typeof __e == "number") __e = core;
}, function(module, exports, __webpack_require__) {
    module.exports = !__webpack_require__(3)(function() {
        return Object.defineProperty({}, "a", {
            get: function() {
                return 7;
            }
        }).a != 7;
    });
}, function(module, exports) {
    module.exports = function(exec) {
        try {
            return !!exec();
        } catch (e) {
            return true;
        }
    };
}, function(module, exports) {
    var global = module.exports = typeof window != "undefined" && window.Math == Math ? window : typeof self != "undefined" && self.Math == Math ? self : Function("return this")();
    if (typeof __g == "number") __g = global;
}, function(module, exports) {
    module.exports = function(it) {
        return typeof it === "object" ? it !== null : typeof it === "function";
    };
}, function(module, exports) {
    module.exports = function(it) {
        if (it == undefined) throw TypeError("Can't call method on  " + it);
        return it;
    };
}, function(module, exports) {
    var ceil = Math.ceil, floor = Math.floor;
    module.exports = function(it) {
        return isNaN(it = +it) ? 0 : (it > 0 ? floor : ceil)(it);
    };
}, function(module, exports, __webpack_require__) {
    var IObject = __webpack_require__(26), defined = __webpack_require__(6);
    module.exports = function(it) {
        return IObject(defined(it));
    };
}, function(module, exports, __webpack_require__) {
    "use strict";
    Object.defineProperty(exports, "__esModule", {
        value: true
    });
    var _popup = __webpack_require__(10);
    var _popup2 = _interopRequireDefault(_popup);
    function _interopRequireDefault(obj) {
        return obj && obj.__esModule ? obj : {
            "default": obj
        };
    }
    exports.default = {
        props: {
            show: {
                type: Boolean,
                "default": false,
                twoWay: true
            },
            height: {
                type: String,
                "default": "auto"
            }
        },
        ready: function ready() {
            var _this = this;
            this.popup = new _popup2.default({
                container: _this.$el,
                innerHTML: "",
                onOpen: function onOpen(dialog) {
                    _this.show = true;
                },
                onClose: function onClose(dialog) {
                    _this.show = false;
                }
            });
        },
        data: function data() {
            return {
                hasFirstShow: false
            };
        },
        watch: {
            show: function show(val) {
                if (val) {
                    this.popup.show();
                    if (!this.hasFirstShow) {
                        this.$emit("on-first-show");
                        this.hasFirstShow = true;
                    }
                } else {
                    this.popup.hide();
                }
            }
        },
        beforeDestroy: function beforeDestroy() {
            this.popup.destroy();
        }
    };
}, function(module, exports, __webpack_require__) {
    "use strict";
    Object.defineProperty(exports, "__esModule", {
        value: true
    });
    var Eventor = __webpack_require__(12);
    var Tap = __webpack_require__(11);
    var PickerDialog = function PickerDialog(option) {
        this.params = {};
        if (Object.prototype.toString.call(option) === "[object Object]") {
            this.params = {
                input: option.input || "",
                container: document.querySelector(option.input) || "",
                innerHTML: option.innerHTML || "",
                onOpen: option.onOpen || function() {},
                onClose: option.onClose || function() {},
                _open: option._open || function() {},
                _close: option._close || function() {}
            };
        }
        if (!!document.querySelectorAll(".picker-mask").length <= 0) {
            this.divMask = document.createElement("a");
            this.divMask.className = "picker-mask";
            this.divMask.href = "javascript:void(0)";
            document.body.appendChild(this.divMask);
        }
        var div;
        if (!option.container) {
            div = document.createElement("div");
        } else {
            div = option.container;
        }
        div.className = "picker-dialog";
        if (!option.container) {
            document.body.appendChild(div);
        }
        this.mask = document.querySelector(".picker-mask");
        this.container = document.querySelectorAll(".picker-dialog");
        this.container = this.container[this.container.length - 1];
        this._bindEvents();
        option = null;
        return this;
    };
    Eventor.mixTo(PickerDialog);
    PickerDialog.prototype.updateInputPosition = function() {
        this._hackInputFocus();
    };
    PickerDialog.prototype._bindEvents = function() {
        var _this = this;
        function triggerClick(e) {
            _this.hide();
            _this.emit("close");
        }
        Tap.tap(this.mask, triggerClick);
        return this;
    };
    PickerDialog.prototype.show = function() {
        var _this = this;
        _this.mask.classList.add("show");
        _this.container.classList.add("show");
        _this.params._open && _this.params._open(this);
        _this.params.onOpen && _this.params.onOpen(this);
        return this;
    };
    PickerDialog.prototype.hide = function() {
        var _this = this;
        _this.container.classList.remove("show");
        if (!document.querySelector(".picker-dialog.show")) {
            _this.mask.classList.remove("show");
        }
        _this.params._close && _this.params._close(this);
        _this.params.onClose && _this.params.onClose(this);
        return this;
    };
    PickerDialog.prototype.html = function(html) {
        this.container.innerHTML = html;
        return this;
    };
    PickerDialog.prototype.destroy = function() {
        this.mask && this.mask.parentNode && this.mask.parentNode.removeChild(this.mask);
    };
    exports.default = PickerDialog;
}, function(module, exports) {
    "use strict";
    var Event = {
        tap: function tap(element, callback) {
            if (!element) return console.error("tap对象不能为空");
            element.__tap = {};
            element.__tap.event = {
                start: function start(e) {
                    e.stopPropagation();
                    element.__tap.clickabled = true;
                    element.__tap.starttime = e.timeStamp;
                    element.__tap.startPageX = e.changedTouches[0].pageX;
                    element.__tap.startPageY = e.changedTouches[0].pageY;
                },
                move: function move(e) {
                    if (Math.abs(e.changedTouches[0].pageX - element.__tap.startPageX) >= 5 || Math.abs(e.changedTouches[0].pageY - element.__tap.startPageY) >= 5) {
                        element.__tap.clickabled = false;
                    }
                },
                end: function end(e) {
                    e.stopPropagation();
                    e.preventDefault();
                    if (e.timeStamp - element.__tap.starttime > 30 && e.timeStamp - element.__tap.starttime < 300 && element.__tap.clickabled) {
                        callback && callback(e);
                    }
                },
                click: function click(e) {
                    e.stopPropagation();
                    callback && callback(e);
                }
            };
            if (/AppleWebKit.*Mobile.*/.test(navigator.userAgent.match())) {
                element.addEventListener("touchstart", element.__tap.event.start, false);
                element.addEventListener("touchmove", element.__tap.event.move, false);
                element.addEventListener("touchend", element.__tap.event.end, false);
            } else {
                element.addEventListener("click", element.__tap.event.click, false);
            }
            return element;
        },
        untap: function untap(element) {
            if (!element) return console.error("untap对象不能为空");
            element.__tap = element.__tap || {};
            if (/AppleWebKit.*Mobile.*/.test(navigator.userAgent.match()) && !!element.__tap.event) {
                element.__tap.event.start && element.removeEventListener("touchstart", element.__tap.event.start, false);
                element.__tap.event.move && element.removeEventListener("touchmove", element.__tap.event.move, false);
                element.__tap.event.end && element.removeEventListener("touchend", element.__tap.event.end, false);
            } else if (element.__tap.event) {
                element.__tap.event.click && element.removeEventListener("click", element.__tap.event.click, false);
            }
            return element;
        }
    };
    module.exports = Event;
}, function(module, exports, __webpack_require__) {
    "use strict";
    var _keys = __webpack_require__(13);
    var _keys2 = _interopRequireDefault(_keys);
    function _interopRequireDefault(obj) {
        return obj && obj.__esModule ? obj : {
            "default": obj
        };
    }
    var eventSplitter = /\s+/;
    function Events() {}
    Events.prototype.on = function(events, callback, context) {
        var cache, event, list;
        if (!callback) return this;
        cache = this.__events || (this.__events = {});
        events = events.split(eventSplitter);
        while (event = events.shift()) {
            list = cache[event] || (cache[event] = []);
            list.push(callback, context);
        }
        return this;
    };
    Events.prototype.once = function(events, callback, context) {
        var that = this;
        var cb = function cb() {
            that.off(events, cb);
            callback.apply(context || that, arguments);
        };
        return this.on(events, cb, context);
    };
    Events.prototype.off = function(events, callback, context) {
        var cache, event, list, i;
        if (!(cache = this.__events)) return this;
        if (!(events || callback || context)) {
            delete this.__events;
            return this;
        }
        events = events ? events.split(eventSplitter) : keys(cache);
        while (event = events.shift()) {
            list = cache[event];
            if (!list) continue;
            if (!(callback || context)) {
                delete cache[event];
                continue;
            }
            for (i = list.length - 2; i >= 0; i -= 2) {
                if (!(callback && list[i] !== callback || context && list[i + 1] !== context)) {
                    list.splice(i, 2);
                }
            }
        }
        return this;
    };
    Events.prototype.trigger = function(events) {
        var cache, event, all, list, i, len;
        var rest = [];
        var returned = true;
        if (!(cache = this.__events)) return this;
        events = events.split(eventSplitter);
        for (i = 1, len = arguments.length; i < len; i++) {
            rest[i - 1] = arguments[i];
        }
        while (event = events.shift()) {
            if (all = cache.all) all = all.slice();
            if (list = cache[event]) list = list.slice();
            if (event !== "all") {
                returned = triggerEvents(list, rest, this) && returned;
            }
            returned = triggerEvents(all, [ event ].concat(rest), this) && returned;
        }
        return returned;
    };
    Events.prototype.emit = Events.prototype.trigger;
    var keys = _keys2.default;
    if (!keys) {
        keys = function keys(o) {
            var result = [];
            for (var name in o) {
                if (o.hasOwnProperty(name)) {
                    result.push(name);
                }
            }
            return result;
        };
    }
    Events.mixTo = function(receiver) {
        var proto = Events.prototype;
        if (isFunction(receiver)) {
            for (var key in proto) {
                if (proto.hasOwnProperty(key)) {
                    receiver.prototype[key] = proto[key];
                }
            }
        } else {
            var event = new Events();
            for (var _key in proto) {
                if (proto.hasOwnProperty(_key)) {
                    copyProto(_key);
                }
            }
        }
        function copyProto(key) {
            receiver[key] = function() {
                proto[key].apply(event, Array.prototype.slice.call(arguments));
                return this;
            };
        }
    };
    function triggerEvents(list, args, context) {
        var pass = true;
        if (list) {
            var i = 0;
            var l = list.length;
            var a1 = args[0];
            var a2 = args[1];
            var a3 = args[2];
            switch (args.length) {
              case 0:
                for (;i < l; i += 2) {
                    pass = list[i].call(list[i + 1] || context) !== false && pass;
                }
                break;

              case 1:
                for (;i < l; i += 2) {
                    pass = list[i].call(list[i + 1] || context, a1) !== false && pass;
                }
                break;

              case 2:
                for (;i < l; i += 2) {
                    pass = list[i].call(list[i + 1] || context, a1, a2) !== false && pass;
                }
                break;

              case 3:
                for (;i < l; i += 2) {
                    pass = list[i].call(list[i + 1] || context, a1, a2, a3) !== false && pass;
                }
                break;

              default:
                for (;i < l; i += 2) {
                    pass = list[i].apply(list[i + 1] || context, args) !== false && pass;
                }
                break;
            }
        }
        return pass;
    }
    function isFunction(func) {
        return Object.prototype.toString.call(func) === "[object Function]";
    }
    module.exports = Events;
}, function(module, exports, __webpack_require__) {
    module.exports = {
        "default": __webpack_require__(14),
        __esModule: true
    };
}, function(module, exports, __webpack_require__) {
    __webpack_require__(39);
    module.exports = __webpack_require__(1).Object.keys;
}, function(module, exports) {
    module.exports = function(it) {
        if (typeof it != "function") throw TypeError(it + " is not a function!");
        return it;
    };
}, function(module, exports, __webpack_require__) {
    var isObject = __webpack_require__(5);
    module.exports = function(it) {
        if (!isObject(it)) throw TypeError(it + " is not an object!");
        return it;
    };
}, function(module, exports, __webpack_require__) {
    var toIObject = __webpack_require__(8), toLength = __webpack_require__(35), toIndex = __webpack_require__(34);
    module.exports = function(IS_INCLUDES) {
        return function($this, el, fromIndex) {
            var O = toIObject($this), length = toLength(O.length), index = toIndex(fromIndex, length), value;
            if (IS_INCLUDES && el != el) while (length > index) {
                value = O[index++];
                if (value != value) return true;
            } else for (;length > index; index++) if (IS_INCLUDES || index in O) {
                if (O[index] === el) return IS_INCLUDES || index || 0;
            }
            return !IS_INCLUDES && -1;
        };
    };
}, function(module, exports) {
    var toString = {}.toString;
    module.exports = function(it) {
        return toString.call(it).slice(8, -1);
    };
}, function(module, exports, __webpack_require__) {
    var aFunction = __webpack_require__(15);
    module.exports = function(fn, that, length) {
        aFunction(fn);
        if (that === undefined) return fn;
        switch (length) {
          case 1:
            return function(a) {
                return fn.call(that, a);
            };

          case 2:
            return function(a, b) {
                return fn.call(that, a, b);
            };

          case 3:
            return function(a, b, c) {
                return fn.call(that, a, b, c);
            };
        }
        return function() {
            return fn.apply(that, arguments);
        };
    };
}, function(module, exports, __webpack_require__) {
    var isObject = __webpack_require__(5), document = __webpack_require__(4).document, is = isObject(document) && isObject(document.createElement);
    module.exports = function(it) {
        return is ? document.createElement(it) : {};
    };
}, function(module, exports) {
    module.exports = "constructor,hasOwnProperty,isPrototypeOf,propertyIsEnumerable,toLocaleString,toString,valueOf".split(",");
}, function(module, exports, __webpack_require__) {
    var global = __webpack_require__(4), core = __webpack_require__(1), ctx = __webpack_require__(19), hide = __webpack_require__(24), PROTOTYPE = "prototype";
    var $export = function(type, name, source) {
        var IS_FORCED = type & $export.F, IS_GLOBAL = type & $export.G, IS_STATIC = type & $export.S, IS_PROTO = type & $export.P, IS_BIND = type & $export.B, IS_WRAP = type & $export.W, exports = IS_GLOBAL ? core : core[name] || (core[name] = {}), expProto = exports[PROTOTYPE], target = IS_GLOBAL ? global : IS_STATIC ? global[name] : (global[name] || {})[PROTOTYPE], key, own, out;
        if (IS_GLOBAL) source = name;
        for (key in source) {
            own = !IS_FORCED && target && target[key] !== undefined;
            if (own && key in exports) continue;
            out = own ? target[key] : source[key];
            exports[key] = IS_GLOBAL && typeof target[key] != "function" ? source[key] : IS_BIND && own ? ctx(out, global) : IS_WRAP && target[key] == out ? function(C) {
                var F = function(a, b, c) {
                    if (this instanceof C) {
                        switch (arguments.length) {
                          case 0:
                            return new C();

                          case 1:
                            return new C(a);

                          case 2:
                            return new C(a, b);
                        }
                        return new C(a, b, c);
                    }
                    return C.apply(this, arguments);
                };
                F[PROTOTYPE] = C[PROTOTYPE];
                return F;
            }(out) : IS_PROTO && typeof out == "function" ? ctx(Function.call, out) : out;
            if (IS_PROTO) {
                (exports.virtual || (exports.virtual = {}))[key] = out;
                if (type & $export.R && expProto && !expProto[key]) hide(expProto, key, out);
            }
        }
    };
    $export.F = 1;
    $export.G = 2;
    $export.S = 4;
    $export.P = 8;
    $export.B = 16;
    $export.W = 32;
    $export.U = 64;
    $export.R = 128;
    module.exports = $export;
}, function(module, exports) {
    var hasOwnProperty = {}.hasOwnProperty;
    module.exports = function(it, key) {
        return hasOwnProperty.call(it, key);
    };
}, function(module, exports, __webpack_require__) {
    var dP = __webpack_require__(27), createDesc = __webpack_require__(31);
    module.exports = __webpack_require__(2) ? function(object, key, value) {
        return dP.f(object, key, createDesc(1, value));
    } : function(object, key, value) {
        object[key] = value;
        return object;
    };
}, function(module, exports, __webpack_require__) {
    module.exports = !__webpack_require__(2) && !__webpack_require__(3)(function() {
        return Object.defineProperty(__webpack_require__(20)("div"), "a", {
            get: function() {
                return 7;
            }
        }).a != 7;
    });
}, function(module, exports, __webpack_require__) {
    var cof = __webpack_require__(18);
    module.exports = Object("z").propertyIsEnumerable(0) ? Object : function(it) {
        return cof(it) == "String" ? it.split("") : Object(it);
    };
}, function(module, exports, __webpack_require__) {
    var anObject = __webpack_require__(16), IE8_DOM_DEFINE = __webpack_require__(25), toPrimitive = __webpack_require__(37), dP = Object.defineProperty;
    exports.f = __webpack_require__(2) ? Object.defineProperty : function defineProperty(O, P, Attributes) {
        anObject(O);
        P = toPrimitive(P, true);
        anObject(Attributes);
        if (IE8_DOM_DEFINE) try {
            return dP(O, P, Attributes);
        } catch (e) {}
        if ("get" in Attributes || "set" in Attributes) throw TypeError("Accessors not supported!");
        if ("value" in Attributes) O[P] = Attributes.value;
        return O;
    };
}, function(module, exports, __webpack_require__) {
    var has = __webpack_require__(23), toIObject = __webpack_require__(8), arrayIndexOf = __webpack_require__(17)(false), IE_PROTO = __webpack_require__(32)("IE_PROTO");
    module.exports = function(object, names) {
        var O = toIObject(object), i = 0, result = [], key;
        for (key in O) if (key != IE_PROTO) has(O, key) && result.push(key);
        while (names.length > i) if (has(O, key = names[i++])) {
            ~arrayIndexOf(result, key) || result.push(key);
        }
        return result;
    };
}, function(module, exports, __webpack_require__) {
    var $keys = __webpack_require__(28), enumBugKeys = __webpack_require__(21);
    module.exports = Object.keys || function keys(O) {
        return $keys(O, enumBugKeys);
    };
}, function(module, exports, __webpack_require__) {
    var $export = __webpack_require__(22), core = __webpack_require__(1), fails = __webpack_require__(3);
    module.exports = function(KEY, exec) {
        var fn = (core.Object || {})[KEY] || Object[KEY], exp = {};
        exp[KEY] = exec(fn);
        $export($export.S + $export.F * fails(function() {
            fn(1);
        }), "Object", exp);
    };
}, function(module, exports) {
    module.exports = function(bitmap, value) {
        return {
            enumerable: !(bitmap & 1),
            configurable: !(bitmap & 2),
            writable: !(bitmap & 4),
            value: value
        };
    };
}, function(module, exports, __webpack_require__) {
    var shared = __webpack_require__(33)("keys"), uid = __webpack_require__(38);
    module.exports = function(key) {
        return shared[key] || (shared[key] = uid(key));
    };
}, function(module, exports, __webpack_require__) {
    var global = __webpack_require__(4), SHARED = "__core-js_shared__", store = global[SHARED] || (global[SHARED] = {});
    module.exports = function(key) {
        return store[key] || (store[key] = {});
    };
}, function(module, exports, __webpack_require__) {
    var toInteger = __webpack_require__(7), max = Math.max, min = Math.min;
    module.exports = function(index, length) {
        index = toInteger(index);
        return index < 0 ? max(index + length, 0) : min(index, length);
    };
}, function(module, exports, __webpack_require__) {
    var toInteger = __webpack_require__(7), min = Math.min;
    module.exports = function(it) {
        return it > 0 ? min(toInteger(it), 9007199254740991) : 0;
    };
}, function(module, exports, __webpack_require__) {
    var defined = __webpack_require__(6);
    module.exports = function(it) {
        return Object(defined(it));
    };
}, function(module, exports, __webpack_require__) {
    var isObject = __webpack_require__(5);
    module.exports = function(it, S) {
        if (!isObject(it)) return it;
        var fn, val;
        if (S && typeof (fn = it.toString) == "function" && !isObject(val = fn.call(it))) return val;
        if (typeof (fn = it.valueOf) == "function" && !isObject(val = fn.call(it))) return val;
        if (!S && typeof (fn = it.toString) == "function" && !isObject(val = fn.call(it))) return val;
        throw TypeError("Can't convert object to primitive value");
    };
}, function(module, exports) {
    var id = 0, px = Math.random();
    module.exports = function(key) {
        return "Symbol(".concat(key === undefined ? "" : key, ")_", (++id + px).toString(36));
    };
}, function(module, exports, __webpack_require__) {
    var toObject = __webpack_require__(36), $keys = __webpack_require__(29);
    __webpack_require__(30)("keys", function() {
        return function keys(it) {
            return $keys(toObject(it));
        };
    });
}, function(module, exports) {}, function(module, exports) {
    module.exports = "<div v-show=show transition=popup :style={height:height} class=vux-popup> <slot></slot> </div>";
}, function(module, exports, __webpack_require__) {
    var __vue_script__, __vue_template__;
    __webpack_require__(40);
    __vue_script__ = __webpack_require__(9);
    __vue_template__ = __webpack_require__(41);
    module.exports = __vue_script__ || {};
    if (module.exports.__esModule) module.exports = module.exports.default;
    if (__vue_template__) {
        (typeof module.exports === "function" ? module.exports.options || (module.exports.options = {}) : module.exports).template = __vue_template__;
    }
} ]);