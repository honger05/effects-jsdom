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
    module.exports = __webpack_require__(3);
}, function(module, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", {
        value: true
    });
    exports.default = {
        props: {
            type: {
                "default": "default"
            },
            disabled: {
                type: Boolean,
                "default": false
            },
            mini: {
                type: Boolean,
                "default": false
            },
            plain: {
                type: Boolean,
                "default": false
            },
            text: String
        },
        computed: {
            classes: function classes() {
                return [ {
                    weui_btn_disabled: this.disabled,
                    weui_btn_mini: this.mini
                }, "weui_btn_" + this.type, this.plain ? "weui_btn_plain_" + this.type : "" ];
            }
        }
    };
}, function(module, exports) {
    module.exports = "<button class=weui_btn :class=classes :disabled=disabled> {{text}}<slot></slot> </button>";
}, function(module, exports, __webpack_require__) {
    var __vue_script__, __vue_template__;
    __vue_script__ = __webpack_require__(1);
    __vue_template__ = __webpack_require__(2);
    module.exports = __vue_script__ || {};
    if (module.exports.__esModule) module.exports = module.exports.default;
    if (__vue_template__) {
        (typeof module.exports === "function" ? module.exports.options || (module.exports.options = {}) : module.exports).template = __vue_template__;
    }
} ]);