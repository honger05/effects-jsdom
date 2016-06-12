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
    module.exports = __webpack_require__(12);
}, function(module, exports, __webpack_require__) {
    "use strict";
    Object.defineProperty(exports, "__esModule", {
        value: true
    });
    var _icon = __webpack_require__(15);
    var _icon2 = _interopRequireDefault(_icon);
    var _flexbox = __webpack_require__(14);
    var _flexbox2 = _interopRequireDefault(_flexbox);
    var _flexboxItem = __webpack_require__(13);
    var _flexboxItem2 = _interopRequireDefault(_flexboxItem);
    function _interopRequireDefault(obj) {
        return obj && obj.__esModule ? obj : {
            "default": obj
        };
    }
    var sizeMap = {
        large: 40,
        middle: 30,
        small: 20
    };
    exports.default = {
        components: {
            Icon: _icon2.default,
            Flexbox: _flexbox2.default,
            FlexboxItem: _flexboxItem2.default
        },
        props: {
            colors: {
                type: Array,
                required: true
            },
            size: {
                type: String,
                "default": "large"
            },
            value: {
                type: String,
                twoWay: true
            }
        },
        computed: {
            width: function width() {
                return sizeMap[this.size];
            }
        },
        methods: {
            change: function change(color) {
                this.value = color;
                this.$emit("on-change", color);
            }
        }
    };
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
}, function(module, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", {
        value: true
    });
    exports.default = {
        props: {
            type: String
        },
        computed: {
            className: function className() {
                return "weui_icon weui_icon_" + this.type;
            }
        }
    };
}, function(module, exports) {}, function(module, exports) {}, function(module, exports) {}, function(module, exports) {
    module.exports = "<div class=vux-color-picker> <flexbox> <flexbox-item v-for=\"color in colors\" class=vux-color-box> <span class=vux-color-item :style=\"{borderRadius: width/2 + 'px',backgroundColor: color, width: width + 'px', height: width + 'px'}\" @click=change(color) :class=\"{'vux-color-white': color === '#fff' || color === '#fff', 'vux-color-picker-small': size === 'small', 'vux-color-picker-middle': size === 'middle'}\"> <icon v-if=\"color === value\" class=vux-color-checked :style=\"{lineHeight: width + 'px'}\" type=success_no_circle></icon> </span> </flexbox-item> </flexbox> </div>";
}, function(module, exports) {
    module.exports = "<div class=vux-flexbox-item :style=style> <slot></slot> </div>";
}, function(module, exports) {
    module.exports = "<div class=vux-flexbox :class=\"{'vux-flex-col': orient === 'vertical', 'vux-flex-row': orient === 'horizontal'}\"> <slot></slot> </div>";
}, function(module, exports) {
    module.exports = "<i class={{className}}></i>";
}, function(module, exports, __webpack_require__) {
    var __vue_script__, __vue_template__;
    __webpack_require__(6);
    __vue_script__ = __webpack_require__(1);
    __vue_template__ = __webpack_require__(8);
    module.exports = __vue_script__ || {};
    if (module.exports.__esModule) module.exports = module.exports.default;
    if (__vue_template__) {
        (typeof module.exports === "function" ? module.exports.options || (module.exports.options = {}) : module.exports).template = __vue_template__;
    }
}, function(module, exports, __webpack_require__) {
    var __vue_script__, __vue_template__;
    __vue_script__ = __webpack_require__(2);
    __vue_template__ = __webpack_require__(9);
    module.exports = __vue_script__ || {};
    if (module.exports.__esModule) module.exports = module.exports.default;
    if (__vue_template__) {
        (typeof module.exports === "function" ? module.exports.options || (module.exports.options = {}) : module.exports).template = __vue_template__;
    }
}, function(module, exports, __webpack_require__) {
    var __vue_script__, __vue_template__;
    __webpack_require__(5);
    __vue_script__ = __webpack_require__(3);
    __vue_template__ = __webpack_require__(10);
    module.exports = __vue_script__ || {};
    if (module.exports.__esModule) module.exports = module.exports.default;
    if (__vue_template__) {
        (typeof module.exports === "function" ? module.exports.options || (module.exports.options = {}) : module.exports).template = __vue_template__;
    }
}, function(module, exports, __webpack_require__) {
    var __vue_script__, __vue_template__;
    __webpack_require__(7);
    __vue_script__ = __webpack_require__(4);
    __vue_template__ = __webpack_require__(11);
    module.exports = __vue_script__ || {};
    if (module.exports.__esModule) module.exports = module.exports.default;
    if (__vue_template__) {
        (typeof module.exports === "function" ? module.exports.options || (module.exports.options = {}) : module.exports).template = __vue_template__;
    }
} ]);