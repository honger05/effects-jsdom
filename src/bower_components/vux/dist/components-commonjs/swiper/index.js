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
    module.exports = __webpack_require__(27);
}, function(module, exports, __webpack_require__) {
    module.exports = !__webpack_require__(4)(function() {
        return Object.defineProperty({}, "a", {
            get: function() {
                return 7;
            }
        }).a != 7;
    });
}, function(module, exports) {
    var core = module.exports = {
        version: "2.4.0"
    };
    if (typeof __e == "number") __e = core;
}, function(module, exports) {
    module.exports = function(it) {
        return typeof it === "object" ? it !== null : typeof it === "function";
    };
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
}, function(module, exports, __webpack_require__) {
    var anObject = __webpack_require__(16), IE8_DOM_DEFINE = __webpack_require__(21), toPrimitive = __webpack_require__(23), dP = Object.defineProperty;
    exports.f = __webpack_require__(1) ? Object.defineProperty : function defineProperty(O, P, Attributes) {
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
    "use strict";
    Object.defineProperty(exports, "__esModule", {
        value: true
    });
    var _stringify = __webpack_require__(9);
    var _stringify2 = _interopRequireDefault(_stringify);
    var _swiper = __webpack_require__(8);
    var _swiper2 = _interopRequireDefault(_swiper);
    function _interopRequireDefault(obj) {
        return obj && obj.__esModule ? obj : {
            "default": obj
        };
    }
    exports.default = {
        ready: function ready() {
            if (!(this.list && this.list.length === 0)) {
                this.render();
            }
            this.xheight = this.getHeight();
        },
        methods: {
            clickListItem: function clickListItem(item) {
                this.$emit("on-click-list-item", JSON.parse((0, _stringify2.default)(item)));
            },
            buildBackgroundUrl: function buildBackgroundUrl(url) {
                return "url(" + url + ")";
            },
            render: function render() {
                var _this = this;
                this.swiper = new _swiper2.default({
                    container: this.$el,
                    direction: this.direction,
                    auto: this.auto,
                    interval: this.interval,
                    threshold: this.threshold,
                    duration: this.duration,
                    height: this.height || this._height,
                    minMovingDistance: this.minMovingDistance
                }).on("swiped", function(prev, current) {
                    _this.current = current;
                });
            },
            rerender: function rerender() {
                var _this2 = this;
                if (!this.$el) {
                    return;
                }
                this.$nextTick(function() {
                    _this2.current = 0;
                    _this2.destroy();
                    _this2.render();
                });
            },
            destroy: function destroy() {
                this.swiper && this.swiper.destroy();
            },
            getHeight: function getHeight() {
                var hasHeight = parseInt(this.height, 10);
                if (hasHeight) return this.height;
                if (!hasHeight) {
                    if (this.list.length) {
                        if (this.aspectRatio) {
                            return this.$el.offsetWidth * this.aspectRatio + "px";
                        } else {
                            return "180px";
                        }
                    } else {
                        return "auto";
                    }
                }
            }
        },
        props: {
            list: {
                type: Array,
                "default": function _default() {
                    return [];
                }
            },
            direction: {
                type: String,
                "default": "horizontal"
            },
            showDots: {
                type: Boolean,
                "default": true
            },
            dotsPosition: {
                type: String,
                "default": "right"
            },
            auto: {
                type: Boolean,
                "default": false
            },
            interval: {
                type: Number,
                "default": 3e3
            },
            threshold: {
                type: Number,
                "default": 50
            },
            duration: {
                type: Number,
                "default": 300
            },
            height: {
                type: String,
                "default": "auto"
            },
            aspectRatio: Number,
            minMovingDistance: {
                type: Number,
                "default": 0
            }
        },
        data: function data() {
            return {
                current: 0,
                xheight: "auto"
            };
        },
        watch: {
            list: function list(val) {
                this.rerender();
            },
            current: function current(index) {
                this.$emit("on-index-change", index);
            }
        },
        beforeDestroy: function beforeDestroy() {
            this.destroy();
        }
    };
}, function(module, exports, __webpack_require__) {
    "use strict";
    Object.defineProperty(exports, "__esModule", {
        value: true
    });
    var _classCallCheck2 = __webpack_require__(11);
    var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);
    var _createClass2 = __webpack_require__(12);
    var _createClass3 = _interopRequireDefault(_createClass2);
    function _interopRequireDefault(obj) {
        return obj && obj.__esModule ? obj : {
            "default": obj
        };
    }
    var Swiper = function() {
        function Swiper(options) {
            (0, _classCallCheck3.default)(this, Swiper);
            this._default = {
                container: ".vux-swiper",
                item: ".vux-swiper-item",
                direction: "vertical",
                activeClass: "active",
                threshold: 50,
                duration: 300,
                auto: false,
                interval: 3e3,
                height: "auto",
                minMovingDistance: 0
            };
            this._options = extend(this._default, options);
            this._options.height = this._options.height.replace("px", "");
            this._start = {};
            this._move = {};
            this._end = {};
            this._eventHandlers = {};
            this._prev = this._current = this._offset = this._goto = 0;
            this.$box = this._options.container;
            this.$container = this._options.container.querySelector(".vux-swiper");
            this.$items = this.$container.querySelectorAll(this._options.item);
            this.count = this.$items.length;
            if (!this.count) {
                return;
            }
            this.timer = null;
            this.updateItemWidth();
            this._init();
            this._auto();
            this._bind();
            this._onResize();
            return this;
        }
        (0, _createClass3.default)(Swiper, [ {
            key: "_auto",
            value: function _auto() {
                var me = this;
                me.stop();
                if (this._options.auto) {
                    me.timer = setTimeout(function() {
                        me.next();
                    }, me._options.interval);
                }
            }
        }, {
            key: "updateItemWidth",
            value: function updateItemWidth() {
                this._width = this.$box.offsetWidth;
            }
        }, {
            key: "setStyle",
            value: function setStyle() {
                this._height = this._options.height === "auto" ? "auto" : this._options.height;
                var width = this._width;
                var height = this._height;
                var w = width;
                var h = height * this.count;
                if (this._options.direction === "horizontal") {
                    w = width * this.count;
                    h = height;
                }
                if (this._options.direction === "vertical") {
                    h = height * this.count;
                    this.$box.style.height = height + "px";
                }
                this.$container.style.width = w + "px";
                if (h > 0) {
                    this.$container.style.height = h + "px";
                }
                Array.prototype.forEach.call(this.$items, function($item, key) {
                    $item.style.width = width + "px";
                    if (height > 0) {
                        $item.style.height = height + "px";
                    }
                });
            }
        }, {
            key: "_onResize",
            value: function _onResize() {
                var _this = this;
                this.resizeHandler = function() {
                    setTimeout(function() {
                        _this.updateItemWidth();
                        _this.setStyle();
                        _this.next();
                    }, 100);
                };
                window.addEventListener("orientationchange", this.resizeHandler, false);
            }
        }, {
            key: "stop",
            value: function stop() {
                this.timer && clearTimeout(this.timer);
            }
        }, {
            key: "_init",
            value: function _init() {
                this.setStyle();
                this._activate(this._current);
            }
        }, {
            key: "_bind",
            value: function _bind() {
                var me = this;
                this.touchstartHandler = function(e) {
                    me.stop();
                    me._start.x = e.changedTouches[0].pageX;
                    me._start.y = e.changedTouches[0].pageY;
                    me.$container.style["-webkit-transition"] = "none";
                    me.$container.style.transition = "none";
                };
                this.touchmoveHandler = function(e) {
                    me._move.x = e.changedTouches[0].pageX;
                    me._move.y = e.changedTouches[0].pageY;
                    var distance = me._move.y - me._start.y;
                    var transform = "translate3d(0, " + (distance - me._offset) + "px, 0)";
                    if (me._options.direction === "horizontal") {
                        distance = me._move.x - me._start.x;
                        transform = "translate3d(" + (distance - me._offset) + "px, 0, 0)";
                    }
                    if (me._options.minMovingDistance && distance >= me._options.minMovingDistance || !me._options.minMovingDistance) {
                        me.$container.style["-webkit-transform"] = transform;
                        me.$container.style.transform = transform;
                    }
                    e.preventDefault();
                };
                this.touchendHandler = function(e) {
                    me._end.x = e.changedTouches[0].pageX;
                    me._end.y = e.changedTouches[0].pageY;
                    var distance = me._end.y - me._start.y;
                    if (me._options.direction === "horizontal") {
                        distance = me._end.x - me._start.x;
                    }
                    me._prev = me._current;
                    if (distance > me._options.threshold) {
                        me._current = me._current === 0 ? 0 : --me._current;
                    } else if (distance < -me._options.threshold) {
                        me._current = me._current < me.count - 1 ? ++me._current : me._current;
                    }
                    me._show(me._current);
                };
                this.transitionEndHandler = function(e) {
                    if (e.target !== me.$container) {
                        return false;
                    }
                    if (me._current !== me._prev || me._goto > -1) {
                        me._activate(me._current);
                        var cb = me._eventHandlers.swiped;
                        cb && cb.apply(me, [ me._prev, me._current ]);
                        me._goto = -1;
                    }
                    if (me._options.auto) {
                        me._auto();
                    }
                    e.preventDefault();
                };
                this.$container.addEventListener("touchstart", this.touchstartHandler, false);
                this.$container.addEventListener("touchmove", this.touchmoveHandler, false);
                this.$container.addEventListener("touchend", this.touchendHandler, false);
                this.$container.addEventListener("transitionEnd", function(e) {}, false);
                this.$container.addEventListener("webkitTransitionEnd", this.transitionEndHandler, false);
            }
        }, {
            key: "_show",
            value: function _show(index) {
                this._offset = index * this._height;
                var transform = "translate3d(0, -" + this._offset + "px, 0)";
                if (this._options.direction === "horizontal") {
                    this._offset = index * this._width;
                    transform = "translate3d(-" + this._offset + "px, 0, 0)";
                }
                var duration = this._options.duration + "ms";
                this.$container.style["-webkit-transition"] = duration;
                this.$container.style.transition = duration;
                this.$container.style["-webkit-transform"] = transform;
                this.$container.style.transform = transform;
            }
        }, {
            key: "_activate",
            value: function _activate(index) {
                var clazz = this._options.activeClass;
                Array.prototype.forEach.call(this.$items, function($item, key) {
                    $item.classList.remove(clazz);
                    if (index === key) {
                        $item.classList.add(clazz);
                    }
                });
            }
        }, {
            key: "go",
            value: function go(index) {
                if (index < 0 || index > this.count - 1 || index === this._current) {
                    return;
                }
                if (index === 0) {
                    this._current = 0;
                    this._prev = 0;
                } else {
                    this._current = index;
                    this._prev = index - 1;
                }
                this._goto = index;
                this._show(this._current);
                return this;
            }
        }, {
            key: "next",
            value: function next() {
                if (this._current >= this.count - 1) {
                    this._current = 0;
                    this._show(0);
                    return this;
                }
                this._prev = this._current;
                this._show(++this._current);
                return this;
            }
        }, {
            key: "on",
            value: function on(event, callback) {
                if (this._eventHandlers[event]) {
                    console.error("event " + event + " is already register");
                }
                if (typeof callback !== "function") {
                    console.error("parameter callback must be a function");
                }
                this._eventHandlers[event] = callback;
                return this;
            }
        }, {
            key: "_setTransfrom",
            value: function _setTransfrom() {
                var x = arguments.length <= 0 || arguments[0] === undefined ? 0 : arguments[0];
                this.$container.style["-webkit-transform"] = this.$container.style.transform = "translate3d(" + x + "px, 0, 0)";
            }
        }, {
            key: "destroy",
            value: function destroy() {
                this.stop();
                this._current = 0;
                this._setTransfrom(0);
                window.removeEventListener("orientationchange", this.resizeHandler, false);
                this.$container.removeEventListener("touchstart", this.touchstartHandler, false);
                this.$container.removeEventListener("touchmove", this.touchmoveHandler, false);
                this.$container.removeEventListener("touchend", this.touchendHandler, false);
                this.$container.removeEventListener("webkitTransitionEnd", this.transitionEndHandler, false);
            }
        } ]);
        return Swiper;
    }();
    function extend(target, source) {
        for (var key in source) {
            target[key] = source[key];
        }
        return target;
    }
    exports.default = Swiper;
}, function(module, exports, __webpack_require__) {
    module.exports = {
        "default": __webpack_require__(13),
        __esModule: true
    };
}, function(module, exports, __webpack_require__) {
    module.exports = {
        "default": __webpack_require__(14),
        __esModule: true
    };
}, function(module, exports) {
    "use strict";
    exports.__esModule = true;
    exports.default = function(instance, Constructor) {
        if (!(instance instanceof Constructor)) {
            throw new TypeError("Cannot call a class as a function");
        }
    };
}, function(module, exports, __webpack_require__) {
    "use strict";
    exports.__esModule = true;
    var _defineProperty = __webpack_require__(10);
    var _defineProperty2 = _interopRequireDefault(_defineProperty);
    function _interopRequireDefault(obj) {
        return obj && obj.__esModule ? obj : {
            "default": obj
        };
    }
    exports.default = function() {
        function defineProperties(target, props) {
            for (var i = 0; i < props.length; i++) {
                var descriptor = props[i];
                descriptor.enumerable = descriptor.enumerable || false;
                descriptor.configurable = true;
                if ("value" in descriptor) descriptor.writable = true;
                (0, _defineProperty2.default)(target, descriptor.key, descriptor);
            }
        }
        return function(Constructor, protoProps, staticProps) {
            if (protoProps) defineProperties(Constructor.prototype, protoProps);
            if (staticProps) defineProperties(Constructor, staticProps);
            return Constructor;
        };
    }();
}, function(module, exports, __webpack_require__) {
    var core = __webpack_require__(2), $JSON = core.JSON || (core.JSON = {
        stringify: JSON.stringify
    });
    module.exports = function stringify(it) {
        return $JSON.stringify.apply($JSON, arguments);
    };
}, function(module, exports, __webpack_require__) {
    __webpack_require__(24);
    var $Object = __webpack_require__(2).Object;
    module.exports = function defineProperty(it, key, desc) {
        return $Object.defineProperty(it, key, desc);
    };
}, function(module, exports) {
    module.exports = function(it) {
        if (typeof it != "function") throw TypeError(it + " is not a function!");
        return it;
    };
}, function(module, exports, __webpack_require__) {
    var isObject = __webpack_require__(3);
    module.exports = function(it) {
        if (!isObject(it)) throw TypeError(it + " is not an object!");
        return it;
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
    var isObject = __webpack_require__(3), document = __webpack_require__(5).document, is = isObject(document) && isObject(document.createElement);
    module.exports = function(it) {
        return is ? document.createElement(it) : {};
    };
}, function(module, exports, __webpack_require__) {
    var global = __webpack_require__(5), core = __webpack_require__(2), ctx = __webpack_require__(17), hide = __webpack_require__(20), PROTOTYPE = "prototype";
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
}, function(module, exports, __webpack_require__) {
    var dP = __webpack_require__(6), createDesc = __webpack_require__(22);
    module.exports = __webpack_require__(1) ? function(object, key, value) {
        return dP.f(object, key, createDesc(1, value));
    } : function(object, key, value) {
        object[key] = value;
        return object;
    };
}, function(module, exports, __webpack_require__) {
    module.exports = !__webpack_require__(1) && !__webpack_require__(4)(function() {
        return Object.defineProperty(__webpack_require__(18)("div"), "a", {
            get: function() {
                return 7;
            }
        }).a != 7;
    });
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
    var isObject = __webpack_require__(3);
    module.exports = function(it, S) {
        if (!isObject(it)) return it;
        var fn, val;
        if (S && typeof (fn = it.toString) == "function" && !isObject(val = fn.call(it))) return val;
        if (typeof (fn = it.valueOf) == "function" && !isObject(val = fn.call(it))) return val;
        if (!S && typeof (fn = it.toString) == "function" && !isObject(val = fn.call(it))) return val;
        throw TypeError("Can't convert object to primitive value");
    };
}, function(module, exports, __webpack_require__) {
    var $export = __webpack_require__(19);
    $export($export.S + $export.F * !__webpack_require__(1), "Object", {
        defineProperty: __webpack_require__(6).f
    });
}, function(module, exports) {}, function(module, exports) {
    module.exports = '<div class=vux-slider> <div class=vux-swiper :style="{height: xheight}"> <slot></slot> <div class=vux-swiper-item v-for="item in list" @click=clickListItem(item)> <a :href=item.url> <div class=vux-img :style="{backgroundImage: buildBackgroundUrl(item.img)}"></div> <p class=vux-swiper-desc>{{item.title}}</p> </a> </div> </div> <div :class="[\'vux-indicator\', \'vux-indicator-\' + dotsPosition]" v-show="showDots && list.length > 1"> <a href=javascript: v-for="(index, item) in list"> <i class=vux-icon-dot :class="{\'active\':index === current}"></i> </a> </div> </div>';
}, function(module, exports, __webpack_require__) {
    var __vue_script__, __vue_template__;
    __webpack_require__(25);
    __vue_script__ = __webpack_require__(7);
    __vue_template__ = __webpack_require__(26);
    module.exports = __vue_script__ || {};
    if (module.exports.__esModule) module.exports = module.exports.default;
    if (__vue_template__) {
        (typeof module.exports === "function" ? module.exports.options || (module.exports.options = {}) : module.exports).template = __vue_template__;
    }
} ]);