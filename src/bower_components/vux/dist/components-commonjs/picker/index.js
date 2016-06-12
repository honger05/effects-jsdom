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
    module.exports = __webpack_require__(36);
}, function(module, exports, __webpack_require__) {
    module.exports = !__webpack_require__(4)(function() {
        return Object.defineProperty({}, "a", {
            get: function() {
                return 7;
            }
        }).a != 7;
    });
}, function(module, exports) {
    module.exports = function(it) {
        return typeof it === "object" ? it !== null : typeof it === "function";
    };
}, function(module, exports) {
    var core = module.exports = {
        version: "2.4.0"
    };
    if (typeof __e == "number") __e = core;
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
    var anObject = __webpack_require__(20), IE8_DOM_DEFINE = __webpack_require__(25), toPrimitive = __webpack_require__(27), dP = Object.defineProperty;
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
}, function(module, exports) {
    module.exports = function(arr, fn, self) {
        if (arr.filter) return arr.filter(fn, self);
        if (void 0 === arr || null === arr) throw new TypeError();
        if ("function" != typeof fn) throw new TypeError();
        var ret = [];
        for (var i = 0; i < arr.length; i++) {
            if (!hasOwn.call(arr, i)) continue;
            var val = arr[i];
            if (fn.call(self, val, i, arr)) ret.push(val);
        }
        return ret;
    };
    var hasOwn = Object.prototype.hasOwnProperty;
}, function(module, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", {
        value: true
    });
    var prefixList = [ "-moz-box-", "-webkit-box-", "" ];
    exports.default = {
        props: {
            span: {
                type: [ Number, String ]
            }
        },
        methods: {
            buildWidth: function buildWidth(width) {
                if (typeof width === "number") {
                    if (width < 1) {
                        return width;
                    } else {
                        return width / 12;
                    }
                } else if (typeof width === "string") {
                    return width.replace("px", "") / this.bodyWidth;
                }
            }
        },
        computed: {
            style: function style() {
                var styles = {};
                var marginName = this.$parent.orient === "horizontal" ? "marginLeft" : "marginTop";
                styles[marginName] = this.$parent.gutter + "px";
                if (this.span) {
                    for (var i = 0; i < prefixList.length; i++) {
                        styles[prefixList[i] + "flex"] = "0 0 " + this.buildWidth(this.span) * 100 + "%";
                    }
                }
                return styles;
            }
        },
        data: function data() {
            return {
                bodyWidth: document.documentElement.offsetWidth
            };
        }
    };
}, function(module, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", {
        value: true
    });
    exports.default = {
        props: {
            gutter: {
                type: Number,
                "default": 8
            },
            orient: {
                type: String,
                "default": "horizontal"
            }
        }
    };
}, function(module, exports, __webpack_require__) {
    "use strict";
    Object.defineProperty(exports, "__esModule", {
        value: true
    });
    var _scroller = __webpack_require__(13);
    var _scroller2 = _interopRequireDefault(_scroller);
    var _flexbox = __webpack_require__(35);
    var _flexbox2 = _interopRequireDefault(_flexbox);
    var _flexboxItem = __webpack_require__(34);
    var _flexboxItem2 = _interopRequireDefault(_flexboxItem);
    var _chain = __webpack_require__(12);
    var _chain2 = _interopRequireDefault(_chain);
    function _interopRequireDefault(obj) {
        return obj && obj.__esModule ? obj : {
            "default": obj
        };
    }
    exports.default = {
        components: {
            Flexbox: _flexbox2.default,
            FlexboxItem: _flexboxItem2.default
        },
        created: function created() {
            if (this.columns !== 0) {
                var length = this.columns;
                this.store = new _chain2.default(this.data, length);
                this.data = this.store.getColumns(this.value);
            }
        },
        ready: function ready() {
            var _this2 = this;
            this.$nextTick(function() {
                _this2.render(_this2.data, _this2.value);
            });
        },
        props: {
            data: {
                type: Array
            },
            columns: {
                type: Number,
                "default": 0
            },
            value: {
                type: Array,
                twoWay: true
            },
            itemClass: {
                type: String,
                "default": "scroller-item"
            }
        },
        methods: {
            getId: function getId(i) {
                return "#vux-picker-" + this.uuid + "-" + i;
            },
            render: function render(data, value) {
                this.count = this.data.length;
                var _this = this;
                if (!data || !data.length) {
                    return;
                }
                var count = this.data.length;
                if (value.length < count) {
                    for (var i = 0; i < count; i++) {
                        _this.value.$set(i, data[i][0].value || data[i][0]);
                    }
                }
                var _loop = function _loop(_i) {
                    _this.scroller[_i] && _this.scroller[_i].destroy();
                    _this.scroller[_i] = new _scroller2.default(_this.getId(_i), {
                        data: data[_i],
                        defaultValue: value[_i] || data[_i][0].value,
                        itemClass: _this.item_class,
                        onSelect: function onSelect(value) {
                            _this.value.$set(_i, value);
                            _this.$emit("on-change", _this.getValue());
                            if (_this.columns !== 0) {
                                _this.renderChain(_i + 1);
                            }
                        }
                    });
                    if (_this.value) {
                        _this.scroller[_i].select(value[_i]);
                    }
                };
                for (var _i = 0; _i < data.length; _i++) {
                    _loop(_i);
                }
            },
            renderChain: function renderChain(i) {
                if (this.columns === 0) {
                    return;
                }
                if (i > this.count - 1) {
                    return;
                }
                var _this = this;
                var ID = this.getId(i);
                this.scroller[i].destroy();
                var list = this.store.getChildren(_this.getValue()[i - 1]);
                this.scroller[i] = new _scroller2.default(ID, {
                    data: list,
                    itemClass: _this.item_class,
                    onSelect: function onSelect(value) {
                        _this.value.$set(i, value);
                        _this.$emit("on-change", _this.getValue());
                        _this.renderChain(i + 1);
                    }
                });
                this.value.$set(i, list[0].value);
                this.renderChain(i + 1);
            },
            getValue: function getValue() {
                var data = [];
                for (var i = 0; i < this.data.length; i++) {
                    data.push(this.scroller[i].value);
                }
                return data;
            }
        },
        data: function data() {
            return {
                scroller: [],
                count: 0,
                uuid: Math.random().toString(36).substring(3, 8)
            };
        },
        watch: {
            value: function value(val, oldVal) {
                if (this.columns !== 0) {
                    if (val !== oldVal) {
                        this.data = this.store.getColumns(val);
                        this.$nextTick(function() {
                            this.render(this.data, val);
                        });
                    }
                } else {
                    for (var i = 0; i < val.length; i++) {
                        if (this.scroller[i].value !== val[i]) {
                            this.scroller[i].select(val[i]);
                        }
                    }
                }
            },
            data: function data(newData) {
                var _this3 = this;
                if (Object.prototype.toString.call(newData[0]) === "[object Array]") {
                    this.$nextTick(function() {
                        _this3.render(newData, _this3.value);
                        _this3.$nextTick(function() {
                            _this3.$emit("on-change", _this3.getValue());
                        });
                    });
                } else {
                    if (this.columns !== 0) {
                        var length = this.columns;
                        this.store = new _chain2.default(newData, length);
                        this.data = this.store.getColumns(this.value);
                    }
                }
            }
        },
        beforeDestroy: function beforeDestroy() {
            for (var i = 0; i < this.count; i++) {
                this.scroller[i].destroy();
                this.scroller[i] = null;
            }
        }
    };
}, function(module, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", {
        value: true
    });
    var time = Date.now || function() {
        return +new Date();
    };
    var running = {};
    var counter = 1;
    var desiredFrames = 60;
    var millisecondsPerSecond = 1e3;
    exports.default = {
        requestAnimationFrame: function() {
            var requestFrame = window.requestAnimationFrame || window.webkitRequestAnimationFrame;
            return function(callback, root) {
                requestFrame(callback, root);
            };
        }(),
        stop: function stop(id) {
            var cleared = running[id] != null;
            if (cleared) {
                running[id] = null;
            }
            return cleared;
        },
        isRunning: function isRunning(id) {
            return running[id] != null;
        },
        start: function start(stepCallback, verifyCallback, completedCallback, duration, easingMethod, root) {
            var _this = this;
            var start = time();
            var lastFrame = start;
            var percent = 0;
            var dropCounter = 0;
            var id = counter++;
            if (!root) {
                root = document.body;
            }
            if (id % 20 === 0) {
                var newRunning = {};
                for (var usedId in running) {
                    newRunning[usedId] = true;
                }
                running = newRunning;
            }
            var step = function step(virtual) {
                var render = virtual !== true;
                var now = time();
                if (!running[id] || verifyCallback && !verifyCallback(id)) {
                    running[id] = null;
                    completedCallback && completedCallback(desiredFrames - dropCounter / ((now - start) / millisecondsPerSecond), id, false);
                    return;
                }
                if (render) {
                    var droppedFrames = Math.round((now - lastFrame) / (millisecondsPerSecond / desiredFrames)) - 1;
                    for (var j = 0; j < Math.min(droppedFrames, 4); j++) {
                        step(true);
                        dropCounter++;
                    }
                }
                if (duration) {
                    percent = (now - start) / duration;
                    if (percent > 1) {
                        percent = 1;
                    }
                }
                var value = easingMethod ? easingMethod(percent) : percent;
                if ((stepCallback(value, now, render) === false || percent === 1) && render) {
                    running[id] = null;
                    completedCallback && completedCallback(desiredFrames - dropCounter / ((now - start) / millisecondsPerSecond), id, percent === 1 || duration == null);
                } else if (render) {
                    lastFrame = now;
                    _this.requestAnimationFrame(step, root);
                }
            };
            running[id] = true;
            _this.requestAnimationFrame(step, root);
            return id;
        }
    };
}, function(module, exports, __webpack_require__) {
    "use strict";
    Object.defineProperty(exports, "__esModule", {
        value: true
    });
    var _classCallCheck2 = __webpack_require__(16);
    var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);
    var _createClass2 = __webpack_require__(17);
    var _createClass3 = _interopRequireDefault(_createClass2);
    var _arrayFilter = __webpack_require__(7);
    var _arrayFilter2 = _interopRequireDefault(_arrayFilter);
    function _interopRequireDefault(obj) {
        return obj && obj.__esModule ? obj : {
            "default": obj
        };
    }
    var Manager = function() {
        function Manager(data, count) {
            (0, _classCallCheck3.default)(this, Manager);
            this.data = data;
            this.count = count;
        }
        (0, _createClass3.default)(Manager, [ {
            key: "getChildren",
            value: function getChildren(value) {
                return (0, _arrayFilter2.default)(this.data, function(one) {
                    return one.parent === value;
                });
            }
        }, {
            key: "getFirstColumn",
            value: function getFirstColumn() {
                return (0, _arrayFilter2.default)(this.data, function(one) {
                    return !one.parent || one.parent === 0;
                });
            }
        }, {
            key: "getColumns",
            value: function getColumns(value) {
                var datas = [];
                for (var i = 0; i < this.count; i++) {
                    if (i === 0) {
                        datas.push(this.getFirstColumn());
                    } else {
                        if (!value[i]) {
                            var topValue = datas[i - 1][0].value;
                            datas.push(this.getChildren(topValue));
                        } else {
                            datas.push(this.getChildren(value[i - 1]));
                        }
                    }
                }
                return datas;
            }
        } ]);
        return Manager;
    }();
    exports.default = Manager;
}, function(module, exports, __webpack_require__) {
    "use strict";
    var _animate = __webpack_require__(11);
    var _animate2 = _interopRequireDefault(_animate);
    var _util = __webpack_require__(14);
    function _interopRequireDefault(obj) {
        return obj && obj.__esModule ? obj : {
            "default": obj
        };
    }
    var TEMPLATE = '\n<div class="scroller-component" data-role="component">\n  <div class="scroller-mask" data-role="mask"></div>\n  <div class="scroller-indicator" data-role="indicator"></div>\n  <div class="scroller-content" data-role="content"></div>\n</div>\n';
    var Scroller = function Scroller(container, options) {
        var self = this;
        options = options || {};
        self.options = {
            itemClass: "scroller-item",
            onSelect: function onSelect() {},
            defaultValue: 0,
            data: []
        };
        for (var key in options) {
            if (options[key] !== undefined) {
                self.options[key] = options[key];
            }
        }
        self.__container = (0, _util.getElement)(container);
        var tempContainer = document.createElement("div");
        tempContainer.innerHTML = options.template || TEMPLATE;
        var component = self.__component = tempContainer.querySelector("[data-role=component]");
        var content = self.__content = component.querySelector("[data-role=content]");
        var indicator = component.querySelector("[data-role=indicator]");
        var data = self.options.data;
        var html = "";
        if (data.length && data[0].constructor === Object) {
            data.forEach(function(row) {
                html += '<div class="' + self.options.itemClass + '" data-value="' + row.value + '">' + row.name + "</div>";
            });
        } else {
            data.forEach(function(val) {
                html += '<div class="' + self.options.itemClass + '" data-value="' + val + '">' + val + "</div>";
            });
        }
        content.innerHTML = html;
        self.__container.appendChild(component);
        self.__itemHeight = parseInt((0, _util.getComputedStyle)(indicator, "height"), 10);
        self.__callback = options.callback || function(top) {
            content.style.webkitTransform = "translate3d(0, " + -top + "px, 0)";
        };
        var rect = component.getBoundingClientRect();
        self.__clientTop = rect.top + component.clientTop || 0;
        self.__setDimensions(component.clientHeight, content.offsetHeight);
        if (component.clientHeight === 0) {
            self.__setDimensions(parseInt((0, _util.getComputedStyle)(component, "height"), 10), 204);
        }
        self.select(self.options.defaultValue, false);
        component.addEventListener("touchstart", function(e) {
            if (e.target.tagName.match(/input|textarea|select/i)) {
                return;
            }
            e.preventDefault();
            self.__doTouchStart(e.touches, e.timeStamp);
        }, false);
        component.addEventListener("touchmove", function(e) {
            self.__doTouchMove(e.touches, e.timeStamp);
        }, false);
        component.addEventListener("touchend", function(e) {
            self.__doTouchEnd(e.timeStamp);
        }, false);
    };
    var members = {
        value: null,
        __prevValue: null,
        __isSingleTouch: false,
        __isTracking: false,
        __didDecelerationComplete: false,
        __isGesturing: false,
        __isDragging: false,
        __isDecelerating: false,
        __isAnimating: false,
        __clientTop: 0,
        __clientHeight: 0,
        __contentHeight: 0,
        __itemHeight: 0,
        __scrollTop: 0,
        __minScrollTop: 0,
        __maxScrollTop: 0,
        __scheduledTop: 0,
        __lastTouchTop: null,
        __lastTouchMove: null,
        __positions: null,
        __minDecelerationScrollTop: null,
        __maxDecelerationScrollTop: null,
        __decelerationVelocityY: null,
        __setDimensions: function __setDimensions(clientHeight, contentHeight) {
            var self = this;
            self.__clientHeight = clientHeight;
            self.__contentHeight = contentHeight;
            var totalItemCount = self.options.data.length;
            var clientItemCount = Math.round(self.__clientHeight / self.__itemHeight);
            self.__minScrollTop = -self.__itemHeight * (clientItemCount / 2);
            self.__maxScrollTop = self.__minScrollTop + totalItemCount * self.__itemHeight - .1;
        },
        selectByIndex: function selectByIndex(index, animate) {
            var self = this;
            if (index < 0 || index > self.__content.childElementCount - 1) {
                return;
            }
            self.__scrollTop = self.__minScrollTop + index * self.__itemHeight;
            self.scrollTo(self.__scrollTop, animate);
            self.__selectItem(self.__content.children[index]);
        },
        select: function select(value, animate) {
            var self = this;
            var children = self.__content.children;
            for (var i = 0, len = children.length; i < len; i++) {
                if (children[i].dataset.value === value) {
                    self.selectByIndex(i, animate);
                    return;
                }
            }
            self.selectByIndex(0, animate);
        },
        getValue: function getValue() {
            return this.value;
        },
        scrollTo: function scrollTo(top, animate) {
            var self = this;
            animate = animate === undefined ? true : animate;
            if (self.__isDecelerating) {
                _animate2.default.stop(self.__isDecelerating);
                self.__isDecelerating = false;
            }
            top = Math.round(top / self.__itemHeight) * self.__itemHeight;
            top = Math.max(Math.min(self.__maxScrollTop, top), self.__minScrollTop);
            if (top === self.__scrollTop || !animate) {
                self.__publish(top);
                self.__scrollingComplete();
                return;
            }
            self.__publish(top, 250);
        },
        destroy: function destroy() {
            this.__component.parentNode && this.__component.parentNode.removeChild(this.__component);
        },
        __selectItem: function __selectItem(selectedItem) {
            var self = this;
            var selectedItemClass = self.options.itemClass + "-selected";
            var lastSelectedElem = self.__content.querySelector("." + selectedItemClass);
            if (lastSelectedElem) {
                lastSelectedElem.classList.remove(selectedItemClass);
            }
            selectedItem.classList.add(selectedItemClass);
            if (self.value !== null) {
                self.__prevValue = self.value;
            }
            self.value = selectedItem.dataset.value;
        },
        __scrollingComplete: function __scrollingComplete() {
            var self = this;
            var index = Math.round((self.__scrollTop - self.__minScrollTop - self.__itemHeight / 2) / self.__itemHeight);
            self.__selectItem(self.__content.children[index]);
            if (self.__prevValue !== null && self.__prevValue !== self.value) {
                self.options.onSelect(self.value);
            }
        },
        __doTouchStart: function __doTouchStart(touches, timeStamp) {
            var self = this;
            if (touches.length == null) {
                throw new Error("Invalid touch list: " + touches);
            }
            if (timeStamp instanceof Date) {
                timeStamp = timeStamp.valueOf();
            }
            if (typeof timeStamp !== "number") {
                throw new Error("Invalid timestamp value: " + timeStamp);
            }
            self.__interruptedAnimation = true;
            if (self.__isDecelerating) {
                _animate2.default.stop(self.__isDecelerating);
                self.__isDecelerating = false;
                self.__interruptedAnimation = true;
            }
            if (self.__isAnimating) {
                _animate2.default.stop(self.__isAnimating);
                self.__isAnimating = false;
                self.__interruptedAnimation = true;
            }
            var currentTouchTop;
            var isSingleTouch = touches.length === 1;
            if (isSingleTouch) {
                currentTouchTop = touches[0].pageY;
            } else {
                currentTouchTop = Math.abs(touches[0].pageY + touches[1].pageY) / 2;
            }
            self.__initialTouchTop = currentTouchTop;
            self.__lastTouchTop = currentTouchTop;
            self.__lastTouchMove = timeStamp;
            self.__lastScale = 1;
            self.__enableScrollY = !isSingleTouch;
            self.__isTracking = true;
            self.__didDecelerationComplete = false;
            self.__isDragging = !isSingleTouch;
            self.__isSingleTouch = isSingleTouch;
            self.__positions = [];
        },
        __doTouchMove: function __doTouchMove(touches, timeStamp, scale) {
            var self = this;
            if (touches.length == null) {
                throw new Error("Invalid touch list: " + touches);
            }
            if (timeStamp instanceof Date) {
                timeStamp = timeStamp.valueOf();
            }
            if (typeof timeStamp !== "number") {
                throw new Error("Invalid timestamp value: " + timeStamp);
            }
            if (!self.__isTracking) {
                return;
            }
            var currentTouchTop;
            if (touches.length === 2) {
                currentTouchTop = Math.abs(touches[0].pageY + touches[1].pageY) / 2;
            } else {
                currentTouchTop = touches[0].pageY;
            }
            var positions = self.__positions;
            if (self.__isDragging) {
                var moveY = currentTouchTop - self.__lastTouchTop;
                var scrollTop = self.__scrollTop;
                if (self.__enableScrollY) {
                    scrollTop -= moveY;
                    var minScrollTop = self.__minScrollTop;
                    var maxScrollTop = self.__maxScrollTop;
                    if (scrollTop > maxScrollTop || scrollTop < minScrollTop) {
                        if (scrollTop > maxScrollTop) {
                            scrollTop = maxScrollTop;
                        } else {
                            scrollTop = minScrollTop;
                        }
                    }
                }
                if (positions.length > 40) {
                    positions.splice(0, 20);
                }
                positions.push(scrollTop, timeStamp);
                self.__publish(scrollTop);
            } else {
                var minimumTrackingForScroll = 0;
                var minimumTrackingForDrag = 5;
                var distanceY = Math.abs(currentTouchTop - self.__initialTouchTop);
                self.__enableScrollY = distanceY >= minimumTrackingForScroll;
                positions.push(self.__scrollTop, timeStamp);
                self.__isDragging = self.__enableScrollY && distanceY >= minimumTrackingForDrag;
                if (self.__isDragging) {
                    self.__interruptedAnimation = false;
                }
            }
            self.__lastTouchTop = currentTouchTop;
            self.__lastTouchMove = timeStamp;
            self.__lastScale = scale;
        },
        __doTouchEnd: function __doTouchEnd(timeStamp) {
            var self = this;
            if (timeStamp instanceof Date) {
                timeStamp = timeStamp.valueOf();
            }
            if (typeof timeStamp !== "number") {
                throw new Error("Invalid timestamp value: " + timeStamp);
            }
            if (!self.__isTracking) {
                return;
            }
            self.__isTracking = false;
            if (self.__isDragging) {
                self.__isDragging = false;
                if (self.__isSingleTouch && timeStamp - self.__lastTouchMove <= 100) {
                    var positions = self.__positions;
                    var endPos = positions.length - 1;
                    var startPos = endPos;
                    for (var i = endPos; i > 0 && positions[i] > self.__lastTouchMove - 100; i -= 2) {
                        startPos = i;
                    }
                    if (startPos !== endPos) {
                        var timeOffset = positions[endPos] - positions[startPos];
                        var movedTop = self.__scrollTop - positions[startPos - 1];
                        self.__decelerationVelocityY = movedTop / timeOffset * (1e3 / 60);
                        var minVelocityToStartDeceleration = 4;
                        if (Math.abs(self.__decelerationVelocityY) > minVelocityToStartDeceleration) {
                            self.__startDeceleration(timeStamp);
                        }
                    }
                }
            }
            if (!self.__isDecelerating) {
                self.scrollTo(self.__scrollTop);
            }
            self.__positions.length = 0;
        },
        __publish: function __publish(top, animationDuration) {
            var self = this;
            var wasAnimating = self.__isAnimating;
            if (wasAnimating) {
                _animate2.default.stop(wasAnimating);
                self.__isAnimating = false;
            }
            if (animationDuration) {
                self.__scheduledTop = top;
                var oldTop = self.__scrollTop;
                var diffTop = top - oldTop;
                var step = function step(percent, now, render) {
                    self.__scrollTop = oldTop + diffTop * percent;
                    if (self.__callback) {
                        self.__callback(self.__scrollTop);
                    }
                };
                var verify = function verify(id) {
                    return self.__isAnimating === id;
                };
                var completed = function completed(renderedFramesPerSecond, animationId, wasFinished) {
                    if (animationId === self.__isAnimating) {
                        self.__isAnimating = false;
                    }
                    if (self.__didDecelerationComplete || wasFinished) {
                        self.__scrollingComplete();
                    }
                };
                self.__isAnimating = _animate2.default.start(step, verify, completed, animationDuration, wasAnimating ? _util.easeOutCubic : _util.easeInOutCubic);
            } else {
                self.__scheduledTop = self.__scrollTop = top;
                if (self.__callback) {
                    self.__callback(top);
                }
            }
        },
        __startDeceleration: function __startDeceleration(timeStamp) {
            var self = this;
            self.__minDecelerationScrollTop = self.__minScrollTop;
            self.__maxDecelerationScrollTop = self.__maxScrollTop;
            var step = function step(percent, now, render) {
                self.__stepThroughDeceleration(render);
            };
            var minVelocityToKeepDecelerating = .5;
            var verify = function verify() {
                var shouldContinue = Math.abs(self.__decelerationVelocityY) >= minVelocityToKeepDecelerating;
                if (!shouldContinue) {
                    self.__didDecelerationComplete = true;
                }
                return shouldContinue;
            };
            var completed = function completed(renderedFramesPerSecond, animationId, wasFinished) {
                self.__isDecelerating = false;
                if (self.__scrollTop <= self.__minScrollTop || self.__scrollTop >= self.__maxScrollTop) {
                    self.scrollTo(self.__scrollTop);
                    return;
                }
                if (self.__didDecelerationComplete) {
                    self.__scrollingComplete();
                }
            };
            self.__isDecelerating = _animate2.default.start(step, verify, completed);
        },
        __stepThroughDeceleration: function __stepThroughDeceleration(render) {
            var self = this;
            var scrollTop = self.__scrollTop + self.__decelerationVelocityY;
            var scrollTopFixed = Math.max(Math.min(self.__maxDecelerationScrollTop, scrollTop), self.__minDecelerationScrollTop);
            if (scrollTopFixed !== scrollTop) {
                scrollTop = scrollTopFixed;
                self.__decelerationVelocityY = 0;
            }
            if (Math.abs(self.__decelerationVelocityY) <= 1) {
                if (Math.abs(scrollTop % self.__itemHeight) < 1) {
                    self.__decelerationVelocityY = 0;
                }
            } else {
                self.__decelerationVelocityY *= .95;
            }
            self.__publish(scrollTop);
        }
    };
    for (var key in members) {
        Scroller.prototype[key] = members[key];
    }
    module.exports = Scroller;
}, function(module, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", {
        value: true
    });
    exports.getElement = getElement;
    exports.getComputedStyle = getComputedStyle;
    exports.easeOutCubic = easeOutCubic;
    exports.easeInOutCubic = easeInOutCubic;
    function getElement(expr) {
        return typeof expr === "string" ? document.querySelector(expr) : expr;
    }
    function getComputedStyle(el, key) {
        var computedStyle = window.getComputedStyle(el);
        return computedStyle[key] || "";
    }
    function easeOutCubic(pos) {
        return Math.pow(pos - 1, 3) + 1;
    }
    function easeInOutCubic(pos) {
        if ((pos /= .5) < 1) {
            return .5 * Math.pow(pos, 3);
        }
        return .5 * (Math.pow(pos - 2, 3) + 2);
    }
}, function(module, exports, __webpack_require__) {
    module.exports = {
        "default": __webpack_require__(18),
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
    var _defineProperty = __webpack_require__(15);
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
    __webpack_require__(28);
    var $Object = __webpack_require__(3).Object;
    module.exports = function defineProperty(it, key, desc) {
        return $Object.defineProperty(it, key, desc);
    };
}, function(module, exports) {
    module.exports = function(it) {
        if (typeof it != "function") throw TypeError(it + " is not a function!");
        return it;
    };
}, function(module, exports, __webpack_require__) {
    var isObject = __webpack_require__(2);
    module.exports = function(it) {
        if (!isObject(it)) throw TypeError(it + " is not an object!");
        return it;
    };
}, function(module, exports, __webpack_require__) {
    var aFunction = __webpack_require__(19);
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
    var isObject = __webpack_require__(2), document = __webpack_require__(5).document, is = isObject(document) && isObject(document.createElement);
    module.exports = function(it) {
        return is ? document.createElement(it) : {};
    };
}, function(module, exports, __webpack_require__) {
    var global = __webpack_require__(5), core = __webpack_require__(3), ctx = __webpack_require__(21), hide = __webpack_require__(24), PROTOTYPE = "prototype";
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
    var dP = __webpack_require__(6), createDesc = __webpack_require__(26);
    module.exports = __webpack_require__(1) ? function(object, key, value) {
        return dP.f(object, key, createDesc(1, value));
    } : function(object, key, value) {
        object[key] = value;
        return object;
    };
}, function(module, exports, __webpack_require__) {
    module.exports = !__webpack_require__(1) && !__webpack_require__(4)(function() {
        return Object.defineProperty(__webpack_require__(22)("div"), "a", {
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
    var isObject = __webpack_require__(2);
    module.exports = function(it, S) {
        if (!isObject(it)) return it;
        var fn, val;
        if (S && typeof (fn = it.toString) == "function" && !isObject(val = fn.call(it))) return val;
        if (typeof (fn = it.valueOf) == "function" && !isObject(val = fn.call(it))) return val;
        if (!S && typeof (fn = it.toString) == "function" && !isObject(val = fn.call(it))) return val;
        throw TypeError("Can't convert object to primitive value");
    };
}, function(module, exports, __webpack_require__) {
    var $export = __webpack_require__(23);
    $export($export.S + $export.F * !__webpack_require__(1), "Object", {
        defineProperty: __webpack_require__(6).f
    });
}, function(module, exports) {}, function(module, exports) {}, function(module, exports) {
    module.exports = "<div class=vux-flexbox-item :style=style> <slot></slot> </div>";
}, function(module, exports) {
    module.exports = "<div class=vux-flexbox :class=\"{'vux-flex-col': orient === 'vertical', 'vux-flex-row': orient === 'horizontal'}\"> <slot></slot> </div>";
}, function(module, exports) {
    module.exports = "<div class=vux-picker> <flexbox :gutter=0> <flexbox-item v-for=\"(index, one) in data\" style=margin-left:0> <div class=vux-picker-item :id=\"'vux-picker-' + uuid + '-' + index\"></div> </flexbox-item> </flexbox> </div>";
}, function(module, exports, __webpack_require__) {
    var __vue_script__, __vue_template__;
    __vue_script__ = __webpack_require__(8);
    __vue_template__ = __webpack_require__(31);
    module.exports = __vue_script__ || {};
    if (module.exports.__esModule) module.exports = module.exports.default;
    if (__vue_template__) {
        (typeof module.exports === "function" ? module.exports.options || (module.exports.options = {}) : module.exports).template = __vue_template__;
    }
}, function(module, exports, __webpack_require__) {
    var __vue_script__, __vue_template__;
    __webpack_require__(29);
    __vue_script__ = __webpack_require__(9);
    __vue_template__ = __webpack_require__(32);
    module.exports = __vue_script__ || {};
    if (module.exports.__esModule) module.exports = module.exports.default;
    if (__vue_template__) {
        (typeof module.exports === "function" ? module.exports.options || (module.exports.options = {}) : module.exports).template = __vue_template__;
    }
}, function(module, exports, __webpack_require__) {
    var __vue_script__, __vue_template__;
    __webpack_require__(30);
    __vue_script__ = __webpack_require__(10);
    __vue_template__ = __webpack_require__(33);
    module.exports = __vue_script__ || {};
    if (module.exports.__esModule) module.exports = module.exports.default;
    if (__vue_template__) {
        (typeof module.exports === "function" ? module.exports.options || (module.exports.options = {}) : module.exports).template = __vue_template__;
    }
} ]);