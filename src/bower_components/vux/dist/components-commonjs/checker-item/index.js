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
            value: {
                type: [ String, Number ],
                required: true
            },
            disabled: {
                type: Boolean,
                "default": false
            }
        },
        computed: {
            classNames: function classNames() {
                var names = {
                    "vux-tap-active": !this.disabled
                };
                if (this.$parent.defaultItemClass) {
                    names[this.$parent.defaultItemClass] = true;
                }
                if (this.$parent.selectedItemClass) {
                    names[this.$parent.selectedItemClass] = this.$parent.value === this.value;
                }
                if (this.$parent.disabledItemClass) {
                    names[this.$parent.disabledItemClass] = this.disabled;
                }
                return names;
            }
        },
        methods: {
            select: function select() {
                if (!this.disabled) {
                    this.$parent.$set("value", this.value);
                    this.$emit("on-item-click", this.value, this.disabled);
                }
            }
        }
    };
}, function(module, exports) {
    module.exports = "<div class=vux-checker-item :class=classNames @click=select> <slot></slot> </div>";
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