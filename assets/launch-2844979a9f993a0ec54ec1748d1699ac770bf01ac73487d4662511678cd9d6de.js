/*!
 * jQuery JavaScript Library v2.1.1
 * http://jquery.com/
 *
 * Includes Sizzle.js
 * http://sizzlejs.com/
 *
 * Copyright 2005, 2014 jQuery Foundation, Inc. and other contributors
 * Released under the MIT license
 * http://jquery.org/license
 *
 * Date: 2014-05-01T17:11Z
 */
/*!
 * Bootstrap v3.2.0 (http://getbootstrap.com)
 * Copyright 2011-2014 Twitter, Inc.
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
 */
if (function(global, factory) {
    "object" == typeof module && "object" == typeof module.exports ? module.exports = global.document ? factory(global, !0) : function(w) {
        if (!w.document)
            throw new Error("jQuery requires a window with a document");
        return factory(w)
    }
    : factory(global)
}("undefined" != typeof window ? window : this, function(window, noGlobal) {
    function isArraylike(obj) {
        var length = obj.length
          , type = jQuery.type(obj);
        return "function" !== type && !jQuery.isWindow(obj) && (!(1 !== obj.nodeType || !length) || ("array" === type || 0 === length || "number" == typeof length && 0 < length && length - 1 in obj))
    }
    function winnow(elements, qualifier, not) {
        if (jQuery.isFunction(qualifier))
            return jQuery.grep(elements, function(elem, i) {
                return !!qualifier.call(elem, i, elem) !== not
            });
        if (qualifier.nodeType)
            return jQuery.grep(elements, function(elem) {
                return elem === qualifier !== not
            });
        if ("string" == typeof qualifier) {
            if (risSimple.test(qualifier))
                return jQuery.filter(qualifier, elements, not);
            qualifier = jQuery.filter(qualifier, elements)
        }
        return jQuery.grep(elements, function(elem) {
            return 0 <= indexOf.call(qualifier, elem) !== not
        })
    }
    function sibling(cur, dir) {
        for (; (cur = cur[dir]) && 1 !== cur.nodeType; )
            ;
        return cur
    }
    function createOptions(options) {
        var object = optionsCache[options] = {};
        return jQuery.each(options.match(rnotwhite) || [], function(_, flag) {
            object[flag] = !0
        }),
        object
    }
    function completed() {
        document.removeEventListener("DOMContentLoaded", completed, !1),
        window.removeEventListener("load", completed, !1),
        jQuery.ready()
    }
    function Data() {
        Object.defineProperty(this.cache = {}, 0, {
            get: function() {
                return {}
            }
        }),
        this.expando = jQuery.expando + Math.random()
    }
    function dataAttr(elem, key, data) {
        var name;
        if (data === undefined && 1 === elem.nodeType)
            if (name = "data-" + key.replace(rmultiDash, "-$1").toLowerCase(),
            "string" == typeof (data = elem.getAttribute(name))) {
                try {
                    data = "true" === data || "false" !== data && ("null" === data ? null : +data + "" === data ? +data : rbrace.test(data) ? jQuery.parseJSON(data) : data)
                } catch (e) {}
                data_user.set(elem, key, data)
            } else
                data = undefined;
        return data
    }
    function returnTrue() {
        return !0
    }
    function returnFalse() {
        return !1
    }
    function safeActiveElement() {
        try {
            return document.activeElement
        } catch (err) {}
    }
    function manipulationTarget(elem, content) {
        return jQuery.nodeName(elem, "table") && jQuery.nodeName(11 !== content.nodeType ? content : content.firstChild, "tr") ? elem.getElementsByTagName("tbody")[0] || elem.appendChild(elem.ownerDocument.createElement("tbody")) : elem
    }
    function disableScript(elem) {
        return elem.type = (null !== elem.getAttribute("type")) + "/" + elem.type,
        elem
    }
    function restoreScript(elem) {
        var match = rscriptTypeMasked.exec(elem.type);
        return match ? elem.type = match[1] : elem.removeAttribute("type"),
        elem
    }
    function setGlobalEval(elems, refElements) {
        for (var i = 0, l = elems.length; i < l; i++)
            data_priv.set(elems[i], "globalEval", !refElements || data_priv.get(refElements[i], "globalEval"))
    }
    function cloneCopyEvent(src, dest) {
        var i, l, type, pdataOld, pdataCur, udataOld, udataCur, events;
        if (1 === dest.nodeType) {
            if (data_priv.hasData(src) && (pdataOld = data_priv.access(src),
            pdataCur = data_priv.set(dest, pdataOld),
            events = pdataOld.events))
                for (type in delete pdataCur.handle,
                pdataCur.events = {},
                events)
                    for (i = 0,
                    l = events[type].length; i < l; i++)
                        jQuery.event.add(dest, type, events[type][i]);
            data_user.hasData(src) && (udataOld = data_user.access(src),
            udataCur = jQuery.extend({}, udataOld),
            data_user.set(dest, udataCur))
        }
    }
    function getAll(context, tag) {
        var ret = context.getElementsByTagName ? context.getElementsByTagName(tag || "*") : context.querySelectorAll ? context.querySelectorAll(tag || "*") : [];
        return tag === undefined || tag && jQuery.nodeName(context, tag) ? jQuery.merge([context], ret) : ret
    }
    function fixInput(src, dest) {
        var nodeName = dest.nodeName.toLowerCase();
        "input" === nodeName && rcheckableType.test(src.type) ? dest.checked = src.checked : "input" !== nodeName && "textarea" !== nodeName || (dest.defaultValue = src.defaultValue)
    }
    function actualDisplay(name, doc) {
        var style, elem = jQuery(doc.createElement(name)).appendTo(doc.body), display = window.getDefaultComputedStyle && (style = window.getDefaultComputedStyle(elem[0])) ? style.display : jQuery.css(elem[0], "display");
        return elem.detach(),
        display
    }
    function defaultDisplay(nodeName) {
        var doc = document
          , display = elemdisplay[nodeName];
        return display || ("none" !== (display = actualDisplay(nodeName, doc)) && display || ((doc = (iframe = (iframe || jQuery("<iframe frameborder='0' width='0' height='0'/>")).appendTo(doc.documentElement))[0].contentDocument).write(),
        doc.close(),
        display = actualDisplay(nodeName, doc),
        iframe.detach()),
        elemdisplay[nodeName] = display),
        display
    }
    function curCSS(elem, name, computed) {
        var width, minWidth, maxWidth, ret, style = elem.style;
        return (computed = computed || getStyles(elem)) && (ret = computed.getPropertyValue(name) || computed[name]),
        computed && ("" !== ret || jQuery.contains(elem.ownerDocument, elem) || (ret = jQuery.style(elem, name)),
        rnumnonpx.test(ret) && rmargin.test(name) && (width = style.width,
        minWidth = style.minWidth,
        maxWidth = style.maxWidth,
        style.minWidth = style.maxWidth = style.width = ret,
        ret = computed.width,
        style.width = width,
        style.minWidth = minWidth,
        style.maxWidth = maxWidth)),
        ret !== undefined ? ret + "" : ret
    }
    function addGetHookIf(conditionFn, hookFn) {
        return {
            get: function() {
                if (!conditionFn())
                    return (this.get = hookFn).apply(this, arguments);
                delete this.get
            }
        }
    }
    function vendorPropName(style, name) {
        if (name in style)
            return name;
        for (var capName = name[0].toUpperCase() + name.slice(1), origName = name, i = cssPrefixes.length; i--; )
            if ((name = cssPrefixes[i] + capName)in style)
                return name;
        return origName
    }
    function setPositiveNumber(elem, value, subtract) {
        var matches = rnumsplit.exec(value);
        return matches ? Math.max(0, matches[1] - (subtract || 0)) + (matches[2] || "px") : value
    }
    function augmentWidthOrHeight(elem, name, extra, isBorderBox, styles) {
        for (var i = extra === (isBorderBox ? "border" : "content") ? 4 : "width" === name ? 1 : 0, val = 0; i < 4; i += 2)
            "margin" === extra && (val += jQuery.css(elem, extra + cssExpand[i], !0, styles)),
            isBorderBox ? ("content" === extra && (val -= jQuery.css(elem, "padding" + cssExpand[i], !0, styles)),
            "margin" !== extra && (val -= jQuery.css(elem, "border" + cssExpand[i] + "Width", !0, styles))) : (val += jQuery.css(elem, "padding" + cssExpand[i], !0, styles),
            "padding" !== extra && (val += jQuery.css(elem, "border" + cssExpand[i] + "Width", !0, styles)));
        return val
    }
    function getWidthOrHeight(elem, name, extra) {
        var valueIsBorderBox = !0
          , val = "width" === name ? elem.offsetWidth : elem.offsetHeight
          , styles = getStyles(elem)
          , isBorderBox = "border-box" === jQuery.css(elem, "boxSizing", !1, styles);
        if (val <= 0 || null == val) {
            if (((val = curCSS(elem, name, styles)) < 0 || null == val) && (val = elem.style[name]),
            rnumnonpx.test(val))
                return val;
            valueIsBorderBox = isBorderBox && (support.boxSizingReliable() || val === elem.style[name]),
            val = parseFloat(val) || 0
        }
        return val + augmentWidthOrHeight(elem, name, extra || (isBorderBox ? "border" : "content"), valueIsBorderBox, styles) + "px"
    }
    function showHide(elements, show) {
        for (var display, elem, hidden, values = [], index = 0, length = elements.length; index < length; index++)
            (elem = elements[index]).style && (values[index] = data_priv.get(elem, "olddisplay"),
            display = elem.style.display,
            show ? (values[index] || "none" !== display || (elem.style.display = ""),
            "" === elem.style.display && isHidden(elem) && (values[index] = data_priv.access(elem, "olddisplay", defaultDisplay(elem.nodeName)))) : (hidden = isHidden(elem),
            "none" === display && hidden || data_priv.set(elem, "olddisplay", hidden ? display : jQuery.css(elem, "display"))));
        for (index = 0; index < length; index++)
            (elem = elements[index]).style && (show && "none" !== elem.style.display && "" !== elem.style.display || (elem.style.display = show ? values[index] || "" : "none"));
        return elements
    }
    function Tween(elem, options, prop, end, easing) {
        return new Tween.prototype.init(elem,options,prop,end,easing)
    }
    function createFxNow() {
        return setTimeout(function() {
            fxNow = undefined
        }),
        fxNow = jQuery.now()
    }
    function genFx(type, includeWidth) {
        var which, i = 0, attrs = {
            height: type
        };
        for (includeWidth = includeWidth ? 1 : 0; i < 4; i += 2 - includeWidth)
            attrs["margin" + (which = cssExpand[i])] = attrs["padding" + which] = type;
        return includeWidth && (attrs.opacity = attrs.width = type),
        attrs
    }
    function createTween(value, prop, animation) {
        for (var tween, collection = (tweeners[prop] || []).concat(tweeners["*"]), index = 0, length = collection.length; index < length; index++)
            if (tween = collection[index].call(animation, prop, value))
                return tween
    }
    function defaultPrefilter(elem, props, opts) {
        var prop, value, toggle, tween, hooks, oldfire, display, anim = this, orig = {}, style = elem.style, hidden = elem.nodeType && isHidden(elem), dataShow = data_priv.get(elem, "fxshow");
        for (prop in opts.queue || (null == (hooks = jQuery._queueHooks(elem, "fx")).unqueued && (hooks.unqueued = 0,
        oldfire = hooks.empty.fire,
        hooks.empty.fire = function() {
            hooks.unqueued || oldfire()
        }
        ),
        hooks.unqueued++,
        anim.always(function() {
            anim.always(function() {
                hooks.unqueued--,
                jQuery.queue(elem, "fx").length || hooks.empty.fire()
            })
        })),
        1 === elem.nodeType && ("height"in props || "width"in props) && (opts.overflow = [style.overflow, style.overflowX, style.overflowY],
        "inline" === ("none" === (display = jQuery.css(elem, "display")) ? data_priv.get(elem, "olddisplay") || defaultDisplay(elem.nodeName) : display) && "none" === jQuery.css(elem, "float") && (style.display = "inline-block")),
        opts.overflow && (style.overflow = "hidden",
        anim.always(function() {
            style.overflow = opts.overflow[0],
            style.overflowX = opts.overflow[1],
            style.overflowY = opts.overflow[2]
        })),
        props)
            if (value = props[prop],
            rfxtypes.exec(value)) {
                if (delete props[prop],
                toggle = toggle || "toggle" === value,
                value === (hidden ? "hide" : "show")) {
                    if ("show" !== value || !dataShow || dataShow[prop] === undefined)
                        continue;
                    hidden = !0
                }
                orig[prop] = dataShow && dataShow[prop] || jQuery.style(elem, prop)
            } else
                display = undefined;
        if (jQuery.isEmptyObject(orig))
            "inline" === ("none" === display ? defaultDisplay(elem.nodeName) : display) && (style.display = display);
        else
            for (prop in dataShow ? "hidden"in dataShow && (hidden = dataShow.hidden) : dataShow = data_priv.access(elem, "fxshow", {}),
            toggle && (dataShow.hidden = !hidden),
            hidden ? jQuery(elem).show() : anim.done(function() {
                jQuery(elem).hide()
            }),
            anim.done(function() {
                var prop;
                for (prop in data_priv.remove(elem, "fxshow"),
                orig)
                    jQuery.style(elem, prop, orig[prop])
            }),
            orig)
                tween = createTween(hidden ? dataShow[prop] : 0, prop, anim),
                prop in dataShow || (dataShow[prop] = tween.start,
                hidden && (tween.end = tween.start,
                tween.start = "width" === prop || "height" === prop ? 1 : 0))
    }
    function propFilter(props, specialEasing) {
        var index, name, easing, value, hooks;
        for (index in props)
            if (easing = specialEasing[name = jQuery.camelCase(index)],
            value = props[index],
            jQuery.isArray(value) && (easing = value[1],
            value = props[index] = value[0]),
            index !== name && (props[name] = value,
            delete props[index]),
            (hooks = jQuery.cssHooks[name]) && "expand"in hooks)
                for (index in value = hooks.expand(value),
                delete props[name],
                value)
                    index in props || (props[index] = value[index],
                    specialEasing[index] = easing);
            else
                specialEasing[name] = easing
    }
    function Animation(elem, properties, options) {
        var result, stopped, index = 0, length = animationPrefilters.length, deferred = jQuery.Deferred().always(function() {
            delete tick.elem
        }), tick = function() {
            if (stopped)
                return !1;
            for (var currentTime = fxNow || createFxNow(), remaining = Math.max(0, animation.startTime + animation.duration - currentTime), percent = 1 - (remaining / animation.duration || 0), index = 0, length = animation.tweens.length; index < length; index++)
                animation.tweens[index].run(percent);
            return deferred.notifyWith(elem, [animation, percent, remaining]),
            percent < 1 && length ? remaining : (deferred.resolveWith(elem, [animation]),
            !1)
        }, animation = deferred.promise({
            elem: elem,
            props: jQuery.extend({}, properties),
            opts: jQuery.extend(!0, {
                specialEasing: {}
            }, options),
            originalProperties: properties,
            originalOptions: options,
            startTime: fxNow || createFxNow(),
            duration: options.duration,
            tweens: [],
            createTween: function(prop, end) {
                var tween = jQuery.Tween(elem, animation.opts, prop, end, animation.opts.specialEasing[prop] || animation.opts.easing);
                return animation.tweens.push(tween),
                tween
            },
            stop: function(gotoEnd) {
                var index = 0
                  , length = gotoEnd ? animation.tweens.length : 0;
                if (stopped)
                    return this;
                for (stopped = !0; index < length; index++)
                    animation.tweens[index].run(1);
                return gotoEnd ? deferred.resolveWith(elem, [animation, gotoEnd]) : deferred.rejectWith(elem, [animation, gotoEnd]),
                this
            }
        }), props = animation.props;
        for (propFilter(props, animation.opts.specialEasing); index < length; index++)
            if (result = animationPrefilters[index].call(animation, elem, props, animation.opts))
                return result;
        return jQuery.map(props, createTween, animation),
        jQuery.isFunction(animation.opts.start) && animation.opts.start.call(elem, animation),
        jQuery.fx.timer(jQuery.extend(tick, {
            elem: elem,
            anim: animation,
            queue: animation.opts.queue
        })),
        animation.progress(animation.opts.progress).done(animation.opts.done, animation.opts.complete).fail(animation.opts.fail).always(animation.opts.always)
    }
    function addToPrefiltersOrTransports(structure) {
        return function(dataTypeExpression, func) {
            "string" != typeof dataTypeExpression && (func = dataTypeExpression,
            dataTypeExpression = "*");
            var dataType, i = 0, dataTypes = dataTypeExpression.toLowerCase().match(rnotwhite) || [];
            if (jQuery.isFunction(func))
                for (; dataType = dataTypes[i++]; )
                    "+" === dataType[0] ? (dataType = dataType.slice(1) || "*",
                    (structure[dataType] = structure[dataType] || []).unshift(func)) : (structure[dataType] = structure[dataType] || []).push(func)
        }
    }
    function inspectPrefiltersOrTransports(structure, options, originalOptions, jqXHR) {
        function inspect(dataType) {
            var selected;
            return inspected[dataType] = !0,
            jQuery.each(structure[dataType] || [], function(_, prefilterOrFactory) {
                var dataTypeOrTransport = prefilterOrFactory(options, originalOptions, jqXHR);
                return "string" != typeof dataTypeOrTransport || seekingTransport || inspected[dataTypeOrTransport] ? seekingTransport ? !(selected = dataTypeOrTransport) : void 0 : (options.dataTypes.unshift(dataTypeOrTransport),
                inspect(dataTypeOrTransport),
                !1)
            }),
            selected
        }
        var inspected = {}
          , seekingTransport = structure === transports;
        return inspect(options.dataTypes[0]) || !inspected["*"] && inspect("*")
    }
    function ajaxExtend(target, src) {
        var key, deep, flatOptions = jQuery.ajaxSettings.flatOptions || {};
        for (key in src)
            src[key] !== undefined && ((flatOptions[key] ? target : deep || (deep = {}))[key] = src[key]);
        return deep && jQuery.extend(!0, target, deep),
        target
    }
    function ajaxHandleResponses(s, jqXHR, responses) {
        for (var ct, type, finalDataType, firstDataType, contents = s.contents, dataTypes = s.dataTypes; "*" === dataTypes[0]; )
            dataTypes.shift(),
            ct === undefined && (ct = s.mimeType || jqXHR.getResponseHeader("Content-Type"));
        if (ct)
            for (type in contents)
                if (contents[type] && contents[type].test(ct)) {
                    dataTypes.unshift(type);
                    break
                }
        if (dataTypes[0]in responses)
            finalDataType = dataTypes[0];
        else {
            for (type in responses) {
                if (!dataTypes[0] || s.converters[type + " " + dataTypes[0]]) {
                    finalDataType = type;
                    break
                }
                firstDataType || (firstDataType = type)
            }
            finalDataType = finalDataType || firstDataType
        }
        if (finalDataType)
            return finalDataType !== dataTypes[0] && dataTypes.unshift(finalDataType),
            responses[finalDataType]
    }
    function ajaxConvert(s, response, jqXHR, isSuccess) {
        var conv2, current, conv, tmp, prev, converters = {}, dataTypes = s.dataTypes.slice();
        if (dataTypes[1])
            for (conv in s.converters)
                converters[conv.toLowerCase()] = s.converters[conv];
        for (current = dataTypes.shift(); current; )
            if (s.responseFields[current] && (jqXHR[s.responseFields[current]] = response),
            !prev && isSuccess && s.dataFilter && (response = s.dataFilter(response, s.dataType)),
            prev = current,
            current = dataTypes.shift())
                if ("*" === current)
                    current = prev;
                else if ("*" !== prev && prev !== current) {
                    if (!(conv = converters[prev + " " + current] || converters["* " + current]))
                        for (conv2 in converters)
                            if ((tmp = conv2.split(" "))[1] === current && (conv = converters[prev + " " + tmp[0]] || converters["* " + tmp[0]])) {
                                !0 === conv ? conv = converters[conv2] : !0 !== converters[conv2] && (current = tmp[0],
                                dataTypes.unshift(tmp[1]));
                                break
                            }
                    if (!0 !== conv)
                        if (conv && s["throws"])
                            response = conv(response);
                        else
                            try {
                                response = conv(response)
                            } catch (e) {
                                return {
                                    state: "parsererror",
                                    error: conv ? e : "No conversion from " + prev + " to " + current
                                }
                            }
                }
        return {
            state: "success",
            data: response
        }
    }
    function buildParams(prefix, obj, traditional, add) {
        var name;
        if (jQuery.isArray(obj))
            jQuery.each(obj, function(i, v) {
                traditional || rbracket.test(prefix) ? add(prefix, v) : buildParams(prefix + "[" + ("object" == typeof v ? i : "") + "]", v, traditional, add)
            });
        else if (traditional || "object" !== jQuery.type(obj))
            add(prefix, obj);
        else
            for (name in obj)
                buildParams(prefix + "[" + name + "]", obj[name], traditional, add)
    }
    function getWindow(elem) {
        return jQuery.isWindow(elem) ? elem : 9 === elem.nodeType && elem.defaultView
    }
    var arr = []
      , slice = arr.slice
      , concat = arr.concat
      , push = arr.push
      , indexOf = arr.indexOf
      , class2type = {}
      , toString = class2type.toString
      , hasOwn = class2type.hasOwnProperty
      , support = {}
      , document = window.document
      , version = "2.1.1"
      , jQuery = function(selector, context) {
        return new jQuery.fn.init(selector,context)
    }
      , rtrim = /^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g
      , rmsPrefix = /^-ms-/
      , rdashAlpha = /-([\da-z])/gi
      , fcamelCase = function(all, letter) {
        return letter.toUpperCase()
    };
    jQuery.fn = jQuery.prototype = {
        jquery: version,
        constructor: jQuery,
        selector: "",
        length: 0,
        toArray: function() {
            return slice.call(this)
        },
        get: function(num) {
            return null != num ? num < 0 ? this[num + this.length] : this[num] : slice.call(this)
        },
        pushStack: function(elems) {
            var ret = jQuery.merge(this.constructor(), elems);
            return ret.prevObject = this,
            ret.context = this.context,
            ret
        },
        each: function(callback, args) {
            return jQuery.each(this, callback, args)
        },
        map: function(callback) {
            return this.pushStack(jQuery.map(this, function(elem, i) {
                return callback.call(elem, i, elem)
            }))
        },
        slice: function() {
            return this.pushStack(slice.apply(this, arguments))
        },
        first: function() {
            return this.eq(0)
        },
        last: function() {
            return this.eq(-1)
        },
        eq: function(i) {
            var len = this.length
              , j = +i + (i < 0 ? len : 0);
            return this.pushStack(0 <= j && j < len ? [this[j]] : [])
        },
        end: function() {
            return this.prevObject || this.constructor(null)
        },
        push: push,
        sort: arr.sort,
        splice: arr.splice
    },
    jQuery.extend = jQuery.fn.extend = function(argument_0) {
        var options, name, src, copy, copyIsArray, clone, target = argument_0 || {}, i = 1, length = arguments.length, deep = !1;
        for ("boolean" == typeof target && (deep = target,
        target = arguments[i] || {},
        i++),
        "object" == typeof target || jQuery.isFunction(target) || (target = {}),
        i === length && (target = this,
        i--); i < length; i++)
            if (null != (options = arguments[i]))
                for (name in options)
                    src = target[name],
                    target !== (copy = options[name]) && (deep && copy && (jQuery.isPlainObject(copy) || (copyIsArray = jQuery.isArray(copy))) ? (copyIsArray ? (copyIsArray = !1,
                    clone = src && jQuery.isArray(src) ? src : []) : clone = src && jQuery.isPlainObject(src) ? src : {},
                    target[name] = jQuery.extend(deep, clone, copy)) : copy !== undefined && (target[name] = copy));
        return target
    }
    ,
    jQuery.extend({
        expando: "jQuery" + (version + Math.random()).replace(/\D/g, ""),
        isReady: !0,
        error: function(msg) {
            throw new Error(msg)
        },
        noop: function() {},
        isFunction: function(obj) {
            return "function" === jQuery.type(obj)
        },
        isArray: Array.isArray,
        isWindow: function(obj) {
            return null != obj && obj === obj.window
        },
        isNumeric: function(obj) {
            return !jQuery.isArray(obj) && 0 <= obj - parseFloat(obj)
        },
        isPlainObject: function(obj) {
            return "object" === jQuery.type(obj) && !obj.nodeType && !jQuery.isWindow(obj) && !(obj.constructor && !hasOwn.call(obj.constructor.prototype, "isPrototypeOf"))
        },
        isEmptyObject: function(obj) {
            var name;
            for (name in obj)
                return !1;
            return !0
        },
        type: function(obj) {
            return null == obj ? obj + "" : "object" == typeof obj || "function" == typeof obj ? class2type[toString.call(obj)] || "object" : typeof obj
        },
        globalEval: function(code) {
            var script, indirect = eval;
            (code = jQuery.trim(code)) && (1 === code.indexOf("use strict") ? ((script = document.createElement("script")).text = code,
            document.head.appendChild(script).parentNode.removeChild(script)) : indirect(code))
        },
        camelCase: function(string) {
            return string.replace(rmsPrefix, "ms-").replace(rdashAlpha, fcamelCase)
        },
        nodeName: function(elem, name) {
            return elem.nodeName && elem.nodeName.toLowerCase() === name.toLowerCase()
        },
        each: function(obj, callback, args) {
            var i = 0
              , length = obj.length
              , isArray = isArraylike(obj);
            if (args) {
                if (isArray)
                    for (; i < length && !1 !== callback.apply(obj[i], args); i++)
                        ;
                else
                    for (i in obj)
                        if (!1 === callback.apply(obj[i], args))
                            break
            } else if (isArray)
                for (; i < length && !1 !== callback.call(obj[i], i, obj[i]); i++)
                    ;
            else
                for (i in obj)
                    if (!1 === callback.call(obj[i], i, obj[i]))
                        break;
            return obj
        },
        trim: function(text) {
            return null == text ? "" : (text + "").replace(rtrim, "")
        },
        makeArray: function(arr, results) {
            var ret = results || [];
            return null != arr && (isArraylike(Object(arr)) ? jQuery.merge(ret, "string" == typeof arr ? [arr] : arr) : push.call(ret, arr)),
            ret
        },
        inArray: function(elem, arr, i) {
            return null == arr ? -1 : indexOf.call(arr, elem, i)
        },
        merge: function(first, second) {
            for (var len = +second.length, j = 0, i = first.length; j < len; j++)
                first[i++] = second[j];
            return first.length = i,
            first
        },
        grep: function(elems, callback, invert) {
            for (var matches = [], i = 0, length = elems.length, callbackExpect = !invert; i < length; i++)
                !callback(elems[i], i) !== callbackExpect && matches.push(elems[i]);
            return matches
        },
        map: function(elems, callback, arg) {
            var value, i = 0, length = elems.length, ret = [];
            if (isArraylike(elems))
                for (; i < length; i++)
                    null != (value = callback(elems[i], i, arg)) && ret.push(value);
            else
                for (i in elems)
                    null != (value = callback(elems[i], i, arg)) && ret.push(value);
            return concat.apply([], ret)
        },
        guid: 1,
        proxy: function(fn, context) {
            var tmp, args, proxy;
            return "string" == typeof context && (tmp = fn[context],
            context = fn,
            fn = tmp),
            jQuery.isFunction(fn) ? (args = slice.call(arguments, 2),
            (proxy = function() {
                return fn.apply(context || this, args.concat(slice.call(arguments)))
            }
            ).guid = fn.guid = fn.guid || jQuery.guid++,
            proxy) : undefined
        },
        now: Date.now,
        support: support
    }),
    jQuery.each("Boolean Number String Function Array Date RegExp Object Error".split(" "), function(i, name) {
        class2type["[object " + name + "]"] = name.toLowerCase()
    });
    var Sizzle = /*!
 * Sizzle CSS Selector Engine v1.10.19
 * http://sizzlejs.com/
 *
 * Copyright 2013 jQuery Foundation, Inc. and other contributors
 * Released under the MIT license
 * http://jquery.org/license
 *
 * Date: 2014-04-18
 */
    function(window) {
        function Sizzle(selector, context, results, seed) {
            var match, elem, m, nodeType, i, groups, old, nid, newContext, newSelector;
            if ((context ? context.ownerDocument || context : preferredDoc) !== document && setDocument(context),
            results = results || [],
            !selector || "string" != typeof selector)
                return results;
            if (1 !== (nodeType = (context = context || document).nodeType) && 9 !== nodeType)
                return [];
            if (documentIsHTML && !seed) {
                if (match = rquickExpr.exec(selector))
                    if (m = match[1]) {
                        if (9 === nodeType) {
                            if (!(elem = context.getElementById(m)) || !elem.parentNode)
                                return results;
                            if (elem.id === m)
                                return results.push(elem),
                                results
                        } else if (context.ownerDocument && (elem = context.ownerDocument.getElementById(m)) && contains(context, elem) && elem.id === m)
                            return results.push(elem),
                            results
                    } else {
                        if (match[2])
                            return push.apply(results, context.getElementsByTagName(selector)),
                            results;
                        if ((m = match[3]) && support.getElementsByClassName && context.getElementsByClassName)
                            return push.apply(results, context.getElementsByClassName(m)),
                            results
                    }
                if (support.qsa && (!rbuggyQSA || !rbuggyQSA.test(selector))) {
                    if (nid = old = expando,
                    newContext = context,
                    newSelector = 9 === nodeType && selector,
                    1 === nodeType && "object" !== context.nodeName.toLowerCase()) {
                        for (groups = tokenize(selector),
                        (old = context.getAttribute("id")) ? nid = old.replace(rescape, "\\$&") : context.setAttribute("id", nid),
                        nid = "[id='" + nid + "'] ",
                        i = groups.length; i--; )
                            groups[i] = nid + toSelector(groups[i]);
                        newContext = rsibling.test(selector) && testContext(context.parentNode) || context,
                        newSelector = groups.join(",")
                    }
                    if (newSelector)
                        try {
                            return push.apply(results, newContext.querySelectorAll(newSelector)),
                            results
                        } catch (qsaError) {} finally {
                            old || context.removeAttribute("id")
                        }
                }
            }
            return select(selector.replace(rtrim, "$1"), context, results, seed)
        }
        function createCache() {
            function cache(key, value) {
                return keys.push(key + " ") > Expr.cacheLength && delete cache[keys.shift()],
                cache[key + " "] = value
            }
            var keys = [];
            return cache
        }
        function markFunction(fn) {
            return fn[expando] = !0,
            fn
        }
        function assert(fn) {
            var div = document.createElement("div");
            try {
                return !!fn(div)
            } catch (e) {
                return !1
            } finally {
                div.parentNode && div.parentNode.removeChild(div),
                div = null
            }
        }
        function addHandle(attrs, handler) {
            for (var arr = attrs.split("|"), i = attrs.length; i--; )
                Expr.attrHandle[arr[i]] = handler
        }
        function siblingCheck(a, b) {
            var cur = b && a
              , diff = cur && 1 === a.nodeType && 1 === b.nodeType && (~b.sourceIndex || MAX_NEGATIVE) - (~a.sourceIndex || MAX_NEGATIVE);
            if (diff)
                return diff;
            if (cur)
                for (; cur = cur.nextSibling; )
                    if (cur === b)
                        return -1;
            return a ? 1 : -1
        }
        function createInputPseudo(type) {
            return function(elem) {
                return "input" === elem.nodeName.toLowerCase() && elem.type === type
            }
        }
        function createButtonPseudo(type) {
            return function(elem) {
                var name = elem.nodeName.toLowerCase();
                return ("input" === name || "button" === name) && elem.type === type
            }
        }
        function createPositionalPseudo(fn) {
            return markFunction(function(argument) {
                return argument = +argument,
                markFunction(function(seed, matches) {
                    for (var j, matchIndexes = fn([], seed.length, argument), i = matchIndexes.length; i--; )
                        seed[j = matchIndexes[i]] && (seed[j] = !(matches[j] = seed[j]))
                })
            })
        }
        function testContext(context) {
            return context && typeof context.getElementsByTagName !== strundefined && context
        }
        function setFilters() {}
        function toSelector(tokens) {
            for (var i = 0, len = tokens.length, selector = ""; i < len; i++)
                selector += tokens[i].value;
            return selector
        }
        function addCombinator(matcher, combinator, base) {
            var dir = combinator.dir
              , checkNonElements = base && "parentNode" === dir
              , doneName = done++;
            return combinator.first ? function(elem, context, xml) {
                for (; elem = elem[dir]; )
                    if (1 === elem.nodeType || checkNonElements)
                        return matcher(elem, context, xml)
            }
            : function(elem, context, xml) {
                var oldCache, outerCache, newCache = [dirruns, doneName];
                if (xml) {
                    for (; elem = elem[dir]; )
                        if ((1 === elem.nodeType || checkNonElements) && matcher(elem, context, xml))
                            return !0
                } else
                    for (; elem = elem[dir]; )
                        if (1 === elem.nodeType || checkNonElements) {
                            if ((oldCache = (outerCache = elem[expando] || (elem[expando] = {}))[dir]) && oldCache[0] === dirruns && oldCache[1] === doneName)
                                return newCache[2] = oldCache[2];
                            if ((outerCache[dir] = newCache)[2] = matcher(elem, context, xml))
                                return !0
                        }
            }
        }
        function elementMatcher(matchers) {
            return 1 < matchers.length ? function(elem, context, xml) {
                for (var i = matchers.length; i--; )
                    if (!matchers[i](elem, context, xml))
                        return !1;
                return !0
            }
            : matchers[0]
        }
        function multipleContexts(selector, contexts, results) {
            for (var i = 0, len = contexts.length; i < len; i++)
                Sizzle(selector, contexts[i], results);
            return results
        }
        function condense(unmatched, map, filter, context, xml) {
            for (var elem, newUnmatched = [], i = 0, len = unmatched.length, mapped = null != map; i < len; i++)
                (elem = unmatched[i]) && (filter && !filter(elem, context, xml) || (newUnmatched.push(elem),
                mapped && map.push(i)));
            return newUnmatched
        }
        function setMatcher(preFilter, selector, matcher, postFilter, postFinder, postSelector) {
            return postFilter && !postFilter[expando] && (postFilter = setMatcher(postFilter)),
            postFinder && !postFinder[expando] && (postFinder = setMatcher(postFinder, postSelector)),
            markFunction(function(seed, results, context, xml) {
                var temp, i, elem, preMap = [], postMap = [], preexisting = results.length, elems = seed || multipleContexts(selector || "*", context.nodeType ? [context] : context, []), matcherIn = !preFilter || !seed && selector ? elems : condense(elems, preMap, preFilter, context, xml), matcherOut = matcher ? postFinder || (seed ? preFilter : preexisting || postFilter) ? [] : results : matcherIn;
                if (matcher && matcher(matcherIn, matcherOut, context, xml),
                postFilter)
                    for (temp = condense(matcherOut, postMap),
                    postFilter(temp, [], context, xml),
                    i = temp.length; i--; )
                        (elem = temp[i]) && (matcherOut[postMap[i]] = !(matcherIn[postMap[i]] = elem));
                if (seed) {
                    if (postFinder || preFilter) {
                        if (postFinder) {
                            for (temp = [],
                            i = matcherOut.length; i--; )
                                (elem = matcherOut[i]) && temp.push(matcherIn[i] = elem);
                            postFinder(null, matcherOut = [], temp, xml)
                        }
                        for (i = matcherOut.length; i--; )
                            (elem = matcherOut[i]) && -1 < (temp = postFinder ? indexOf.call(seed, elem) : preMap[i]) && (seed[temp] = !(results[temp] = elem))
                    }
                } else
                    matcherOut = condense(matcherOut === results ? matcherOut.splice(preexisting, matcherOut.length) : matcherOut),
                    postFinder ? postFinder(null, results, matcherOut, xml) : push.apply(results, matcherOut)
            })
        }
        function matcherFromTokens(tokens) {
            for (var checkContext, matcher, j, len = tokens.length, leadingRelative = Expr.relative[tokens[0].type], implicitRelative = leadingRelative || Expr.relative[" "], i = leadingRelative ? 1 : 0, matchContext = addCombinator(function(elem) {
                return elem === checkContext
            }, implicitRelative, !0), matchAnyContext = addCombinator(function(elem) {
                return -1 < indexOf.call(checkContext, elem)
            }, implicitRelative, !0), matchers = [function(elem, context, xml) {
                return !leadingRelative && (xml || context !== outermostContext) || ((checkContext = context).nodeType ? matchContext(elem, context, xml) : matchAnyContext(elem, context, xml))
            }
            ]; i < len; i++)
                if (matcher = Expr.relative[tokens[i].type])
                    matchers = [addCombinator(elementMatcher(matchers), matcher)];
                else {
                    if ((matcher = Expr.filter[tokens[i].type].apply(null, tokens[i].matches))[expando]) {
                        for (j = ++i; j < len && !Expr.relative[tokens[j].type]; j++)
                            ;
                        return setMatcher(1 < i && elementMatcher(matchers), 1 < i && toSelector(tokens.slice(0, i - 1).concat({
                            value: " " === tokens[i - 2].type ? "*" : ""
                        })).replace(rtrim, "$1"), matcher, i < j && matcherFromTokens(tokens.slice(i, j)), j < len && matcherFromTokens(tokens = tokens.slice(j)), j < len && toSelector(tokens))
                    }
                    matchers.push(matcher)
                }
            return elementMatcher(matchers)
        }
        function matcherFromGroupMatchers(elementMatchers, setMatchers) {
            var bySet = 0 < setMatchers.length
              , byElement = 0 < elementMatchers.length
              , superMatcher = function(seed, context, xml, results, outermost) {
                var elem, j, matcher, matchedCount = 0, i = "0", unmatched = seed && [], setMatched = [], contextBackup = outermostContext, elems = seed || byElement && Expr.find.TAG("*", outermost), dirrunsUnique = dirruns += null == contextBackup ? 1 : Math.random() || .1, len = elems.length;
                for (outermost && (outermostContext = context !== document && context); i !== len && null != (elem = elems[i]); i++) {
                    if (byElement && elem) {
                        for (j = 0; matcher = elementMatchers[j++]; )
                            if (matcher(elem, context, xml)) {
                                results.push(elem);
                                break
                            }
                        outermost && (dirruns = dirrunsUnique)
                    }
                    bySet && ((elem = !matcher && elem) && matchedCount--,
                    seed && unmatched.push(elem))
                }
                if (matchedCount += i,
                bySet && i !== matchedCount) {
                    for (j = 0; matcher = setMatchers[j++]; )
                        matcher(unmatched, setMatched, context, xml);
                    if (seed) {
                        if (0 < matchedCount)
                            for (; i--; )
                                unmatched[i] || setMatched[i] || (setMatched[i] = pop.call(results));
                        setMatched = condense(setMatched)
                    }
                    push.apply(results, setMatched),
                    outermost && !seed && 0 < setMatched.length && 1 < matchedCount + setMatchers.length && Sizzle.uniqueSort(results)
                }
                return outermost && (dirruns = dirrunsUnique,
                outermostContext = contextBackup),
                unmatched
            };
            return bySet ? markFunction(superMatcher) : superMatcher
        }
        var i, support, Expr, getText, isXML, tokenize, compile, select, outermostContext, sortInput, hasDuplicate, setDocument, document, docElem, documentIsHTML, rbuggyQSA, rbuggyMatches, matches, contains, expando = "sizzle" + -new Date, preferredDoc = window.document, dirruns = 0, done = 0, classCache = createCache(), tokenCache = createCache(), compilerCache = createCache(), sortOrder = function(a, b) {
            return a === b && (hasDuplicate = !0),
            0
        }, strundefined = typeof undefined, MAX_NEGATIVE = 1 << 31, hasOwn = {}.hasOwnProperty, arr = [], pop = arr.pop, push_native = arr.push, push = arr.push, slice = arr.slice, indexOf = arr.indexOf || function(elem) {
            for (var i = 0, len = this.length; i < len; i++)
                if (this[i] === elem)
                    return i;
            return -1
        }
        , booleans = "checked|selected|async|autofocus|autoplay|controls|defer|disabled|hidden|ismap|loop|multiple|open|readonly|required|scoped", whitespace = "[\\x20\\t\\r\\n\\f]", characterEncoding = "(?:\\\\.|[\\w-]|[^\\x00-\\xa0])+", identifier = characterEncoding.replace("w", "w#"), attributes = "\\[" + whitespace + "*(" + characterEncoding + ")(?:" + whitespace + "*([*^$|!~]?=)" + whitespace + "*(?:'((?:\\\\.|[^\\\\'])*)'|\"((?:\\\\.|[^\\\\\"])*)\"|(" + identifier + "))|)" + whitespace + "*\\]", pseudos = ":(" + characterEncoding + ")(?:\\((('((?:\\\\.|[^\\\\'])*)'|\"((?:\\\\.|[^\\\\\"])*)\")|((?:\\\\.|[^\\\\()[\\]]|" + attributes + ")*)|.*)\\)|)", rtrim = new RegExp("^" + whitespace + "+|((?:^|[^\\\\])(?:\\\\.)*)" + whitespace + "+$","g"), rcomma = new RegExp("^" + whitespace + "*," + whitespace + "*"), rcombinators = new RegExp("^" + whitespace + "*([>+~]|" + whitespace + ")" + whitespace + "*"), rattributeQuotes = new RegExp("=" + whitespace + "*([^\\]'\"]*?)" + whitespace + "*\\]","g"), rpseudo = new RegExp(pseudos), ridentifier = new RegExp("^" + identifier + "$"), matchExpr = {
            ID: new RegExp("^#(" + characterEncoding + ")"),
            CLASS: new RegExp("^\\.(" + characterEncoding + ")"),
            TAG: new RegExp("^(" + characterEncoding.replace("w", "w*") + ")"),
            ATTR: new RegExp("^" + attributes),
            PSEUDO: new RegExp("^" + pseudos),
            CHILD: new RegExp("^:(only|first|last|nth|nth-last)-(child|of-type)(?:\\(" + whitespace + "*(even|odd|(([+-]|)(\\d*)n|)" + whitespace + "*(?:([+-]|)" + whitespace + "*(\\d+)|))" + whitespace + "*\\)|)","i"),
            bool: new RegExp("^(?:" + booleans + ")$","i"),
            needsContext: new RegExp("^" + whitespace + "*[>+~]|:(even|odd|eq|gt|lt|nth|first|last)(?:\\(" + whitespace + "*((?:-\\d)?\\d*)" + whitespace + "*\\)|)(?=[^-]|$)","i")
        }, rinputs = /^(?:input|select|textarea|button)$/i, rheader = /^h\d$/i, rnative = /^[^{]+\{\s*\[native \w/, rquickExpr = /^(?:#([\w-]+)|(\w+)|\.([\w-]+))$/, rsibling = /[+~]/, rescape = /'|\\/g, runescape = new RegExp("\\\\([\\da-f]{1,6}" + whitespace + "?|(" + whitespace + ")|.)","ig"), funescape = function(_, escaped, escapedWhitespace) {
            var high = "0x" + escaped - 65536;
            return high != high || escapedWhitespace ? escaped : high < 0 ? String.fromCharCode(high + 65536) : String.fromCharCode(high >> 10 | 55296, 1023 & high | 56320)
        };
        try {
            push.apply(arr = slice.call(preferredDoc.childNodes), preferredDoc.childNodes),
            arr[preferredDoc.childNodes.length].nodeType
        } catch (e) {
            push = {
                apply: arr.length ? function(target, els) {
                    push_native.apply(target, slice.call(els))
                }
                : function(target, els) {
                    for (var j = target.length, i = 0; target[j++] = els[i++]; )
                        ;
                    target.length = j - 1
                }
            }
        }
        for (i in support = Sizzle.support = {},
        isXML = Sizzle.isXML = function(elem) {
            var documentElement = elem && (elem.ownerDocument || elem).documentElement;
            return !!documentElement && "HTML" !== documentElement.nodeName
        }
        ,
        setDocument = Sizzle.setDocument = function(node) {
            var hasCompare, doc = node ? node.ownerDocument || node : preferredDoc, parent = doc.defaultView;
            return doc !== document && 9 === doc.nodeType && doc.documentElement ? (docElem = (document = doc).documentElement,
            documentIsHTML = !isXML(doc),
            parent && parent !== parent.top && (parent.addEventListener ? parent.addEventListener("unload", function() {
                setDocument()
            }, !1) : parent.attachEvent && parent.attachEvent("onunload", function() {
                setDocument()
            })),
            support.attributes = assert(function(div) {
                return div.className = "i",
                !div.getAttribute("className")
            }),
            support.getElementsByTagName = assert(function(div) {
                return div.appendChild(doc.createComment("")),
                !div.getElementsByTagName("*").length
            }),
            support.getElementsByClassName = rnative.test(doc.getElementsByClassName) && assert(function(div) {
                return div.innerHTML = "<div class='a'></div><div class='a i'></div>",
                div.firstChild.className = "i",
                2 === div.getElementsByClassName("i").length
            }),
            support.getById = assert(function(div) {
                return docElem.appendChild(div).id = expando,
                !doc.getElementsByName || !doc.getElementsByName(expando).length
            }),
            support.getById ? (Expr.find.ID = function(id, context) {
                if (typeof context.getElementById !== strundefined && documentIsHTML) {
                    var m = context.getElementById(id);
                    return m && m.parentNode ? [m] : []
                }
            }
            ,
            Expr.filter.ID = function(id) {
                var attrId = id.replace(runescape, funescape);
                return function(elem) {
                    return elem.getAttribute("id") === attrId
                }
            }
            ) : (delete Expr.find.ID,
            Expr.filter.ID = function(id) {
                var attrId = id.replace(runescape, funescape);
                return function(elem) {
                    var node = typeof elem.getAttributeNode !== strundefined && elem.getAttributeNode("id");
                    return node && node.value === attrId
                }
            }
            ),
            Expr.find.TAG = support.getElementsByTagName ? function(tag, context) {
                if (typeof context.getElementsByTagName !== strundefined)
                    return context.getElementsByTagName(tag)
            }
            : function(tag, context) {
                var elem, tmp = [], i = 0, results = context.getElementsByTagName(tag);
                if ("*" !== tag)
                    return results;
                for (; elem = results[i++]; )
                    1 === elem.nodeType && tmp.push(elem);
                return tmp
            }
            ,
            Expr.find.CLASS = support.getElementsByClassName && function(className, context) {
                if (typeof context.getElementsByClassName !== strundefined && documentIsHTML)
                    return context.getElementsByClassName(className)
            }
            ,
            rbuggyMatches = [],
            rbuggyQSA = [],
            (support.qsa = rnative.test(doc.querySelectorAll)) && (assert(function(div) {
                div.innerHTML = "<select msallowclip=''><option selected=''></option></select>",
                div.querySelectorAll("[msallowclip^='']").length && rbuggyQSA.push("[*^$]=" + whitespace + "*(?:''|\"\")"),
                div.querySelectorAll("[selected]").length || rbuggyQSA.push("\\[" + whitespace + "*(?:value|" + booleans + ")"),
                div.querySelectorAll(":checked").length || rbuggyQSA.push(":checked")
            }),
            assert(function(div) {
                var input = doc.createElement("input");
                input.setAttribute("type", "hidden"),
                div.appendChild(input).setAttribute("name", "D"),
                div.querySelectorAll("[name=d]").length && rbuggyQSA.push("name" + whitespace + "*[*^$|!~]?="),
                div.querySelectorAll(":enabled").length || rbuggyQSA.push(":enabled", ":disabled"),
                div.querySelectorAll("*,:x"),
                rbuggyQSA.push(",.*:")
            })),
            (support.matchesSelector = rnative.test(matches = docElem.matches || docElem.webkitMatchesSelector || docElem.mozMatchesSelector || docElem.oMatchesSelector || docElem.msMatchesSelector)) && assert(function(div) {
                support.disconnectedMatch = matches.call(div, "div"),
                matches.call(div, "[s!='']:x"),
                rbuggyMatches.push("!=", pseudos)
            }),
            rbuggyQSA = rbuggyQSA.length && new RegExp(rbuggyQSA.join("|")),
            rbuggyMatches = rbuggyMatches.length && new RegExp(rbuggyMatches.join("|")),
            hasCompare = rnative.test(docElem.compareDocumentPosition),
            contains = hasCompare || rnative.test(docElem.contains) ? function(a, b) {
                var adown = 9 === a.nodeType ? a.documentElement : a
                  , bup = b && b.parentNode;
                return a === bup || !(!bup || 1 !== bup.nodeType || !(adown.contains ? adown.contains(bup) : a.compareDocumentPosition && 16 & a.compareDocumentPosition(bup)))
            }
            : function(a, b) {
                if (b)
                    for (; b = b.parentNode; )
                        if (b === a)
                            return !0;
                return !1
            }
            ,
            sortOrder = hasCompare ? function(a, b) {
                if (a === b)
                    return hasDuplicate = !0,
                    0;
                var compare = !a.compareDocumentPosition - !b.compareDocumentPosition;
                return compare || (1 & (compare = (a.ownerDocument || a) === (b.ownerDocument || b) ? a.compareDocumentPosition(b) : 1) || !support.sortDetached && b.compareDocumentPosition(a) === compare ? a === doc || a.ownerDocument === preferredDoc && contains(preferredDoc, a) ? -1 : b === doc || b.ownerDocument === preferredDoc && contains(preferredDoc, b) ? 1 : sortInput ? indexOf.call(sortInput, a) - indexOf.call(sortInput, b) : 0 : 4 & compare ? -1 : 1)
            }
            : function(a, b) {
                if (a === b)
                    return hasDuplicate = !0,
                    0;
                var cur, i = 0, aup = a.parentNode, bup = b.parentNode, ap = [a], bp = [b];
                if (!aup || !bup)
                    return a === doc ? -1 : b === doc ? 1 : aup ? -1 : bup ? 1 : sortInput ? indexOf.call(sortInput, a) - indexOf.call(sortInput, b) : 0;
                if (aup === bup)
                    return siblingCheck(a, b);
                for (cur = a; cur = cur.parentNode; )
                    ap.unshift(cur);
                for (cur = b; cur = cur.parentNode; )
                    bp.unshift(cur);
                for (; ap[i] === bp[i]; )
                    i++;
                return i ? siblingCheck(ap[i], bp[i]) : ap[i] === preferredDoc ? -1 : bp[i] === preferredDoc ? 1 : 0
            }
            ,
            doc) : document
        }
        ,
        Sizzle.matches = function(expr, elements) {
            return Sizzle(expr, null, null, elements)
        }
        ,
        Sizzle.matchesSelector = function(elem, expr) {
            if ((elem.ownerDocument || elem) !== document && setDocument(elem),
            expr = expr.replace(rattributeQuotes, "='$1']"),
            support.matchesSelector && documentIsHTML && (!rbuggyMatches || !rbuggyMatches.test(expr)) && (!rbuggyQSA || !rbuggyQSA.test(expr)))
                try {
                    var ret = matches.call(elem, expr);
                    if (ret || support.disconnectedMatch || elem.document && 11 !== elem.document.nodeType)
                        return ret
                } catch (e) {}
            return 0 < Sizzle(expr, document, null, [elem]).length
        }
        ,
        Sizzle.contains = function(context, elem) {
            return (context.ownerDocument || context) !== document && setDocument(context),
            contains(context, elem)
        }
        ,
        Sizzle.attr = function(elem, name) {
            (elem.ownerDocument || elem) !== document && setDocument(elem);
            var fn = Expr.attrHandle[name.toLowerCase()]
              , val = fn && hasOwn.call(Expr.attrHandle, name.toLowerCase()) ? fn(elem, name, !documentIsHTML) : undefined;
            return val !== undefined ? val : support.attributes || !documentIsHTML ? elem.getAttribute(name) : (val = elem.getAttributeNode(name)) && val.specified ? val.value : null
        }
        ,
        Sizzle.error = function(msg) {
            throw new Error("Syntax error, unrecognized expression: " + msg)
        }
        ,
        Sizzle.uniqueSort = function(results) {
            var elem, duplicates = [], j = 0, i = 0;
            if (hasDuplicate = !support.detectDuplicates,
            sortInput = !support.sortStable && results.slice(0),
            results.sort(sortOrder),
            hasDuplicate) {
                for (; elem = results[i++]; )
                    elem === results[i] && (j = duplicates.push(i));
                for (; j--; )
                    results.splice(duplicates[j], 1)
            }
            return sortInput = null,
            results
        }
        ,
        getText = Sizzle.getText = function(elem) {
            var node, ret = "", i = 0, nodeType = elem.nodeType;
            if (nodeType) {
                if (1 === nodeType || 9 === nodeType || 11 === nodeType) {
                    if ("string" == typeof elem.textContent)
                        return elem.textContent;
                    for (elem = elem.firstChild; elem; elem = elem.nextSibling)
                        ret += getText(elem)
                } else if (3 === nodeType || 4 === nodeType)
                    return elem.nodeValue
            } else
                for (; node = elem[i++]; )
                    ret += getText(node);
            return ret
        }
        ,
        (Expr = Sizzle.selectors = {
            cacheLength: 50,
            createPseudo: markFunction,
            match: matchExpr,
            attrHandle: {},
            find: {},
            relative: {
                ">": {
                    dir: "parentNode",
                    first: !0
                },
                " ": {
                    dir: "parentNode"
                },
                "+": {
                    dir: "previousSibling",
                    first: !0
                },
                "~": {
                    dir: "previousSibling"
                }
            },
            preFilter: {
                ATTR: function(match) {
                    return match[1] = match[1].replace(runescape, funescape),
                    match[3] = (match[3] || match[4] || match[5] || "").replace(runescape, funescape),
                    "~=" === match[2] && (match[3] = " " + match[3] + " "),
                    match.slice(0, 4)
                },
                CHILD: function(match) {
                    return match[1] = match[1].toLowerCase(),
                    "nth" === match[1].slice(0, 3) ? (match[3] || Sizzle.error(match[0]),
                    match[4] = +(match[4] ? match[5] + (match[6] || 1) : 2 * ("even" === match[3] || "odd" === match[3])),
                    match[5] = +(match[7] + match[8] || "odd" === match[3])) : match[3] && Sizzle.error(match[0]),
                    match
                },
                PSEUDO: function(match) {
                    var excess, unquoted = !match[6] && match[2];
                    return matchExpr.CHILD.test(match[0]) ? null : (match[3] ? match[2] = match[4] || match[5] || "" : unquoted && rpseudo.test(unquoted) && (excess = tokenize(unquoted, !0)) && (excess = unquoted.indexOf(")", unquoted.length - excess) - unquoted.length) && (match[0] = match[0].slice(0, excess),
                    match[2] = unquoted.slice(0, excess)),
                    match.slice(0, 3))
                }
            },
            filter: {
                TAG: function(nodeNameSelector) {
                    var nodeName = nodeNameSelector.replace(runescape, funescape).toLowerCase();
                    return "*" === nodeNameSelector ? function() {
                        return !0
                    }
                    : function(elem) {
                        return elem.nodeName && elem.nodeName.toLowerCase() === nodeName
                    }
                },
                CLASS: function(className) {
                    var pattern = classCache[className + " "];
                    return pattern || (pattern = new RegExp("(^|" + whitespace + ")" + className + "(" + whitespace + "|$)")) && classCache(className, function(elem) {
                        return pattern.test("string" == typeof elem.className && elem.className || typeof elem.getAttribute !== strundefined && elem.getAttribute("class") || "")
                    })
                },
                ATTR: function(name, operator, check) {
                    return function(elem) {
                        var result = Sizzle.attr(elem, name);
                        return null == result ? "!=" === operator : !operator || (result += "",
                        "=" === operator ? result === check : "!=" === operator ? result !== check : "^=" === operator ? check && 0 === result.indexOf(check) : "*=" === operator ? check && -1 < result.indexOf(check) : "$=" === operator ? check && result.slice(-check.length) === check : "~=" === operator ? -1 < (" " + result + " ").indexOf(check) : "|=" === operator && (result === check || result.slice(0, check.length + 1) === check + "-"))
                    }
                },
                CHILD: function(type, what, argument, first, last) {
                    var simple = "nth" !== type.slice(0, 3)
                      , forward = "last" !== type.slice(-4)
                      , ofType = "of-type" === what;
                    return 1 === first && 0 === last ? function(elem) {
                        return !!elem.parentNode
                    }
                    : function(elem, context, xml) {
                        var cache, outerCache, node, diff, nodeIndex, start, dir = simple !== forward ? "nextSibling" : "previousSibling", parent = elem.parentNode, name = ofType && elem.nodeName.toLowerCase(), useCache = !xml && !ofType;
                        if (parent) {
                            if (simple) {
                                for (; dir; ) {
                                    for (node = elem; node = node[dir]; )
                                        if (ofType ? node.nodeName.toLowerCase() === name : 1 === node.nodeType)
                                            return !1;
                                    start = dir = "only" === type && !start && "nextSibling"
                                }
                                return !0
                            }
                            if (start = [forward ? parent.firstChild : parent.lastChild],
                            forward && useCache) {
                                for (nodeIndex = (cache = (outerCache = parent[expando] || (parent[expando] = {}))[type] || [])[0] === dirruns && cache[1],
                                diff = cache[0] === dirruns && cache[2],
                                node = nodeIndex && parent.childNodes[nodeIndex]; node = ++nodeIndex && node && node[dir] || (diff = nodeIndex = 0) || start.pop(); )
                                    if (1 === node.nodeType && ++diff && node === elem) {
                                        outerCache[type] = [dirruns, nodeIndex, diff];
                                        break
                                    }
                            } else if (useCache && (cache = (elem[expando] || (elem[expando] = {}))[type]) && cache[0] === dirruns)
                                diff = cache[1];
                            else
                                for (; (node = ++nodeIndex && node && node[dir] || (diff = nodeIndex = 0) || start.pop()) && ((ofType ? node.nodeName.toLowerCase() !== name : 1 !== node.nodeType) || !++diff || (useCache && ((node[expando] || (node[expando] = {}))[type] = [dirruns, diff]),
                                node !== elem)); )
                                    ;
                            return (diff -= last) === first || diff % first == 0 && 0 <= diff / first
                        }
                    }
                },
                PSEUDO: function(pseudo, argument) {
                    var args, fn = Expr.pseudos[pseudo] || Expr.setFilters[pseudo.toLowerCase()] || Sizzle.error("unsupported pseudo: " + pseudo);
                    return fn[expando] ? fn(argument) : 1 < fn.length ? (args = [pseudo, pseudo, "", argument],
                    Expr.setFilters.hasOwnProperty(pseudo.toLowerCase()) ? markFunction(function(seed, matches) {
                        for (var idx, matched = fn(seed, argument), i = matched.length; i--; )
                            seed[idx = indexOf.call(seed, matched[i])] = !(matches[idx] = matched[i])
                    }) : function(elem) {
                        return fn(elem, 0, args)
                    }
                    ) : fn
                }
            },
            pseudos: {
                not: markFunction(function(selector) {
                    var input = []
                      , results = []
                      , matcher = compile(selector.replace(rtrim, "$1"));
                    return matcher[expando] ? markFunction(function(seed, matches, context, xml) {
                        for (var elem, unmatched = matcher(seed, null, xml, []), i = seed.length; i--; )
                            (elem = unmatched[i]) && (seed[i] = !(matches[i] = elem))
                    }) : function(elem, context, xml) {
                        return input[0] = elem,
                        matcher(input, null, xml, results),
                        !results.pop()
                    }
                }),
                has: markFunction(function(selector) {
                    return function(elem) {
                        return 0 < Sizzle(selector, elem).length
                    }
                }),
                contains: markFunction(function(text) {
                    return function(elem) {
                        return -1 < (elem.textContent || elem.innerText || getText(elem)).indexOf(text)
                    }
                }),
                lang: markFunction(function(lang) {
                    return ridentifier.test(lang || "") || Sizzle.error("unsupported lang: " + lang),
                    lang = lang.replace(runescape, funescape).toLowerCase(),
                    function(elem) {
                        var elemLang;
                        do {
                            if (elemLang = documentIsHTML ? elem.lang : elem.getAttribute("xml:lang") || elem.getAttribute("lang"))
                                return (elemLang = elemLang.toLowerCase()) === lang || 0 === elemLang.indexOf(lang + "-")
                        } while ((elem = elem.parentNode) && 1 === elem.nodeType);
                        return !1
                    }
                }),
                target: function(elem) {
                    var hash = window.location && window.location.hash;
                    return hash && hash.slice(1) === elem.id
                },
                root: function(elem) {
                    return elem === docElem
                },
                focus: function(elem) {
                    return elem === document.activeElement && (!document.hasFocus || document.hasFocus()) && !!(elem.type || elem.href || ~elem.tabIndex)
                },
                enabled: function(elem) {
                    return !1 === elem.disabled
                },
                disabled: function(elem) {
                    return !0 === elem.disabled
                },
                checked: function(elem) {
                    var nodeName = elem.nodeName.toLowerCase();
                    return "input" === nodeName && !!elem.checked || "option" === nodeName && !!elem.selected
                },
                selected: function(elem) {
                    return elem.parentNode && elem.parentNode.selectedIndex,
                    !0 === elem.selected
                },
                empty: function(elem) {
                    for (elem = elem.firstChild; elem; elem = elem.nextSibling)
                        if (elem.nodeType < 6)
                            return !1;
                    return !0
                },
                parent: function(elem) {
                    return !Expr.pseudos.empty(elem)
                },
                header: function(elem) {
                    return rheader.test(elem.nodeName)
                },
                input: function(elem) {
                    return rinputs.test(elem.nodeName)
                },
                button: function(elem) {
                    var name = elem.nodeName.toLowerCase();
                    return "input" === name && "button" === elem.type || "button" === name
                },
                text: function(elem) {
                    var attr;
                    return "input" === elem.nodeName.toLowerCase() && "text" === elem.type && (null == (attr = elem.getAttribute("type")) || "text" === attr.toLowerCase())
                },
                first: createPositionalPseudo(function() {
                    return [0]
                }),
                last: createPositionalPseudo(function(matchIndexes, length) {
                    return [length - 1]
                }),
                eq: createPositionalPseudo(function(matchIndexes, length, argument) {
                    return [argument < 0 ? argument + length : argument]
                }),
                even: createPositionalPseudo(function(matchIndexes, length) {
                    for (var i = 0; i < length; i += 2)
                        matchIndexes.push(i);
                    return matchIndexes
                }),
                odd: createPositionalPseudo(function(matchIndexes, length) {
                    for (var i = 1; i < length; i += 2)
                        matchIndexes.push(i);
                    return matchIndexes
                }),
                lt: createPositionalPseudo(function(matchIndexes, length, argument) {
                    for (var i = argument < 0 ? argument + length : argument; 0 <= --i; )
                        matchIndexes.push(i);
                    return matchIndexes
                }),
                gt: createPositionalPseudo(function(matchIndexes, length, argument) {
                    for (var i = argument < 0 ? argument + length : argument; ++i < length; )
                        matchIndexes.push(i);
                    return matchIndexes
                })
            }
        }).pseudos.nth = Expr.pseudos.eq,
        {
            radio: !0,
            checkbox: !0,
            file: !0,
            password: !0,
            image: !0
        })
            Expr.pseudos[i] = createInputPseudo(i);
        for (i in {
            submit: !0,
            reset: !0
        })
            Expr.pseudos[i] = createButtonPseudo(i);
        return setFilters.prototype = Expr.filters = Expr.pseudos,
        Expr.setFilters = new setFilters,
        tokenize = Sizzle.tokenize = function(selector, parseOnly) {
            var matched, match, tokens, type, soFar, groups, preFilters, cached = tokenCache[selector + " "];
            if (cached)
                return parseOnly ? 0 : cached.slice(0);
            for (soFar = selector,
            groups = [],
            preFilters = Expr.preFilter; soFar; ) {
                for (type in matched && !(match = rcomma.exec(soFar)) || (match && (soFar = soFar.slice(match[0].length) || soFar),
                groups.push(tokens = [])),
                matched = !1,
                (match = rcombinators.exec(soFar)) && (matched = match.shift(),
                tokens.push({
                    value: matched,
                    type: match[0].replace(rtrim, " ")
                }),
                soFar = soFar.slice(matched.length)),
                Expr.filter)
                    !(match = matchExpr[type].exec(soFar)) || preFilters[type] && !(match = preFilters[type](match)) || (matched = match.shift(),
                    tokens.push({
                        value: matched,
                        type: type,
                        matches: match
                    }),
                    soFar = soFar.slice(matched.length));
                if (!matched)
                    break
            }
            return parseOnly ? soFar.length : soFar ? Sizzle.error(selector) : tokenCache(selector, groups).slice(0)
        }
        ,
        compile = Sizzle.compile = function(selector, match) {
            var i, setMatchers = [], elementMatchers = [], cached = compilerCache[selector + " "];
            if (!cached) {
                for (match || (match = tokenize(selector)),
                i = match.length; i--; )
                    (cached = matcherFromTokens(match[i]))[expando] ? setMatchers.push(cached) : elementMatchers.push(cached);
                (cached = compilerCache(selector, matcherFromGroupMatchers(elementMatchers, setMatchers))).selector = selector
            }
            return cached
        }
        ,
        select = Sizzle.select = function(selector, context, results, seed) {
            var i, tokens, token, type, find, compiled = "function" == typeof selector && selector, match = !seed && tokenize(selector = compiled.selector || selector);
            if (results = results || [],
            1 === match.length) {
                if (2 < (tokens = match[0] = match[0].slice(0)).length && "ID" === (token = tokens[0]).type && support.getById && 9 === context.nodeType && documentIsHTML && Expr.relative[tokens[1].type]) {
                    if (!(context = (Expr.find.ID(token.matches[0].replace(runescape, funescape), context) || [])[0]))
                        return results;
                    compiled && (context = context.parentNode),
                    selector = selector.slice(tokens.shift().value.length)
                }
                for (i = matchExpr.needsContext.test(selector) ? 0 : tokens.length; i-- && (token = tokens[i],
                !Expr.relative[type = token.type]); )
                    if ((find = Expr.find[type]) && (seed = find(token.matches[0].replace(runescape, funescape), rsibling.test(tokens[0].type) && testContext(context.parentNode) || context))) {
                        if (tokens.splice(i, 1),
                        !(selector = seed.length && toSelector(tokens)))
                            return push.apply(results, seed),
                            results;
                        break
                    }
            }
            return (compiled || compile(selector, match))(seed, context, !documentIsHTML, results, rsibling.test(selector) && testContext(context.parentNode) || context),
            results
        }
        ,
        support.sortStable = expando.split("").sort(sortOrder).join("") === expando,
        support.detectDuplicates = !!hasDuplicate,
        setDocument(),
        support.sortDetached = assert(function(div1) {
            return 1 & div1.compareDocumentPosition(document.createElement("div"))
        }),
        assert(function(div) {
            return div.innerHTML = "<a href='#'></a>",
            "#" === div.firstChild.getAttribute("href")
        }) || addHandle("type|href|height|width", function(elem, name, isXML) {
            if (!isXML)
                return elem.getAttribute(name, "type" === name.toLowerCase() ? 1 : 2)
        }),
        support.attributes && assert(function(div) {
            return div.innerHTML = "<input/>",
            div.firstChild.setAttribute("value", ""),
            "" === div.firstChild.getAttribute("value")
        }) || addHandle("value", function(elem, name, isXML) {
            if (!isXML && "input" === elem.nodeName.toLowerCase())
                return elem.defaultValue
        }),
        assert(function(div) {
            return null == div.getAttribute("disabled")
        }) || addHandle(booleans, function(elem, name, isXML) {
            var val;
            if (!isXML)
                return !0 === elem[name] ? name.toLowerCase() : (val = elem.getAttributeNode(name)) && val.specified ? val.value : null
        }),
        Sizzle
    }(window);
    jQuery.find = Sizzle,
    jQuery.expr = Sizzle.selectors,
    jQuery.expr[":"] = jQuery.expr.pseudos,
    jQuery.unique = Sizzle.uniqueSort,
    jQuery.text = Sizzle.getText,
    jQuery.isXMLDoc = Sizzle.isXML,
    jQuery.contains = Sizzle.contains;
    var rneedsContext = jQuery.expr.match.needsContext
      , rsingleTag = /^<(\w+)\s*\/?>(?:<\/\1>|)$/
      , risSimple = /^.[^:#\[\.,]*$/;
    jQuery.filter = function(expr, elems, not) {
        var elem = elems[0];
        return not && (expr = ":not(" + expr + ")"),
        1 === elems.length && 1 === elem.nodeType ? jQuery.find.matchesSelector(elem, expr) ? [elem] : [] : jQuery.find.matches(expr, jQuery.grep(elems, function(elem) {
            return 1 === elem.nodeType
        }))
    }
    ,
    jQuery.fn.extend({
        find: function(selector) {
            var i, len = this.length, ret = [], self = this;
            if ("string" != typeof selector)
                return this.pushStack(jQuery(selector).filter(function() {
                    for (i = 0; i < len; i++)
                        if (jQuery.contains(self[i], this))
                            return !0
                }));
            for (i = 0; i < len; i++)
                jQuery.find(selector, self[i], ret);
            return (ret = this.pushStack(1 < len ? jQuery.unique(ret) : ret)).selector = this.selector ? this.selector + " " + selector : selector,
            ret
        },
        filter: function(selector) {
            return this.pushStack(winnow(this, selector || [], !1))
        },
        not: function(selector) {
            return this.pushStack(winnow(this, selector || [], !0))
        },
        is: function(selector) {
            return !!winnow(this, "string" == typeof selector && rneedsContext.test(selector) ? jQuery(selector) : selector || [], !1).length
        }
    });
    var rootjQuery, rquickExpr = /^(?:\s*(<[\w\W]+>)[^>]*|#([\w-]*))$/;
    (jQuery.fn.init = function(selector, context) {
        var match, elem;
        if (!selector)
            return this;
        if ("string" != typeof selector)
            return selector.nodeType ? (this.context = this[0] = selector,
            this.length = 1,
            this) : jQuery.isFunction(selector) ? "undefined" != typeof rootjQuery.ready ? rootjQuery.ready(selector) : selector(jQuery) : (selector.selector !== undefined && (this.selector = selector.selector,
            this.context = selector.context),
            jQuery.makeArray(selector, this));
        if (!(match = "<" === selector[0] && ">" === selector[selector.length - 1] && 3 <= selector.length ? [null, selector, null] : rquickExpr.exec(selector)) || !match[1] && context)
            return !context || context.jquery ? (context || rootjQuery).find(selector) : this.constructor(context).find(selector);
        if (match[1]) {
            if (context = context instanceof jQuery ? context[0] : context,
            jQuery.merge(this, jQuery.parseHTML(match[1], context && context.nodeType ? context.ownerDocument || context : document, !0)),
            rsingleTag.test(match[1]) && jQuery.isPlainObject(context))
                for (match in context)
                    jQuery.isFunction(this[match]) ? this[match](context[match]) : this.attr(match, context[match]);
            return this
        }
        return (elem = document.getElementById(match[2])) && elem.parentNode && (this.length = 1,
        this[0] = elem),
        this.context = document,
        this.selector = selector,
        this
    }
    ).prototype = jQuery.fn,
    rootjQuery = jQuery(document);
    var rparentsprev = /^(?:parents|prev(?:Until|All))/
      , guaranteedUnique = {
        children: !0,
        contents: !0,
        next: !0,
        prev: !0
    };
    jQuery.extend({
        dir: function(elem, dir, until) {
            for (var matched = [], truncate = until !== undefined; (elem = elem[dir]) && 9 !== elem.nodeType; )
                if (1 === elem.nodeType) {
                    if (truncate && jQuery(elem).is(until))
                        break;
                    matched.push(elem)
                }
            return matched
        },
        sibling: function(n, elem) {
            for (var matched = []; n; n = n.nextSibling)
                1 === n.nodeType && n !== elem && matched.push(n);
            return matched
        }
    }),
    jQuery.fn.extend({
        has: function(target) {
            var targets = jQuery(target, this)
              , l = targets.length;
            return this.filter(function() {
                for (var i = 0; i < l; i++)
                    if (jQuery.contains(this, targets[i]))
                        return !0
            })
        },
        closest: function(selectors, context) {
            for (var cur, i = 0, l = this.length, matched = [], pos = rneedsContext.test(selectors) || "string" != typeof selectors ? jQuery(selectors, context || this.context) : 0; i < l; i++)
                for (cur = this[i]; cur && cur !== context; cur = cur.parentNode)
                    if (cur.nodeType < 11 && (pos ? -1 < pos.index(cur) : 1 === cur.nodeType && jQuery.find.matchesSelector(cur, selectors))) {
                        matched.push(cur);
                        break
                    }
            return this.pushStack(1 < matched.length ? jQuery.unique(matched) : matched)
        },
        index: function(elem) {
            return elem ? "string" == typeof elem ? indexOf.call(jQuery(elem), this[0]) : indexOf.call(this, elem.jquery ? elem[0] : elem) : this[0] && this[0].parentNode ? this.first().prevAll().length : -1
        },
        add: function(selector, context) {
            return this.pushStack(jQuery.unique(jQuery.merge(this.get(), jQuery(selector, context))))
        },
        addBack: function(selector) {
            return this.add(null == selector ? this.prevObject : this.prevObject.filter(selector))
        }
    }),
    jQuery.each({
        parent: function(elem) {
            var parent = elem.parentNode;
            return parent && 11 !== parent.nodeType ? parent : null
        },
        parents: function(elem) {
            return jQuery.dir(elem, "parentNode")
        },
        parentsUntil: function(elem, i, until) {
            return jQuery.dir(elem, "parentNode", until)
        },
        next: function(elem) {
            return sibling(elem, "nextSibling")
        },
        prev: function(elem) {
            return sibling(elem, "previousSibling")
        },
        nextAll: function(elem) {
            return jQuery.dir(elem, "nextSibling")
        },
        prevAll: function(elem) {
            return jQuery.dir(elem, "previousSibling")
        },
        nextUntil: function(elem, i, until) {
            return jQuery.dir(elem, "nextSibling", until)
        },
        prevUntil: function(elem, i, until) {
            return jQuery.dir(elem, "previousSibling", until)
        },
        siblings: function(elem) {
            return jQuery.sibling((elem.parentNode || {}).firstChild, elem)
        },
        children: function(elem) {
            return jQuery.sibling(elem.firstChild)
        },
        contents: function(elem) {
            return elem.contentDocument || jQuery.merge([], elem.childNodes)
        }
    }, function(name, fn) {
        jQuery.fn[name] = function(until, selector) {
            var matched = jQuery.map(this, fn, until);
            return "Until" !== name.slice(-5) && (selector = until),
            selector && "string" == typeof selector && (matched = jQuery.filter(selector, matched)),
            1 < this.length && (guaranteedUnique[name] || jQuery.unique(matched),
            rparentsprev.test(name) && matched.reverse()),
            this.pushStack(matched)
        }
    });
    var readyList, rnotwhite = /\S+/g, optionsCache = {};
    jQuery.Callbacks = function(options) {
        options = "string" == typeof options ? optionsCache[options] || createOptions(options) : jQuery.extend({}, options);
        var memory, fired, firing, firingStart, firingLength, firingIndex, list = [], stack = !options.once && [], fire = function(data) {
            for (memory = options.memory && data,
            fired = !0,
            firingIndex = firingStart || 0,
            firingStart = 0,
            firingLength = list.length,
            firing = !0; list && firingIndex < firingLength; firingIndex++)
                if (!1 === list[firingIndex].apply(data[0], data[1]) && options.stopOnFalse) {
                    memory = !1;
                    break
                }
            firing = !1,
            list && (stack ? stack.length && fire(stack.shift()) : memory ? list = [] : self.disable())
        }, self = {
            add: function() {
                if (list) {
                    var start = list.length;
                    !function add(args) {
                        jQuery.each(args, function(_, arg) {
                            var type = jQuery.type(arg);
                            "function" === type ? options.unique && self.has(arg) || list.push(arg) : arg && arg.length && "string" !== type && add(arg)
                        })
                    }(arguments),
                    firing ? firingLength = list.length : memory && (firingStart = start,
                    fire(memory))
                }
                return this
            },
            remove: function() {
                return list && jQuery.each(arguments, function(_, arg) {
                    for (var index; -1 < (index = jQuery.inArray(arg, list, index)); )
                        list.splice(index, 1),
                        firing && (index <= firingLength && firingLength--,
                        index <= firingIndex && firingIndex--)
                }),
                this
            },
            has: function(fn) {
                return fn ? -1 < jQuery.inArray(fn, list) : !(!list || !list.length)
            },
            empty: function() {
                return list = [],
                firingLength = 0,
                this
            },
            disable: function() {
                return list = stack = memory = undefined,
                this
            },
            disabled: function() {
                return !list
            },
            lock: function() {
                return stack = undefined,
                memory || self.disable(),
                this
            },
            locked: function() {
                return !stack
            },
            fireWith: function(context, args) {
                return !list || fired && !stack || (args = [context, (args = args || []).slice ? args.slice() : args],
                firing ? stack.push(args) : fire(args)),
                this
            },
            fire: function() {
                return self.fireWith(this, arguments),
                this
            },
            fired: function() {
                return !!fired
            }
        };
        return self
    }
    ,
    jQuery.extend({
        Deferred: function(func) {
            var tuples = [["resolve", "done", jQuery.Callbacks("once memory"), "resolved"], ["reject", "fail", jQuery.Callbacks("once memory"), "rejected"], ["notify", "progress", jQuery.Callbacks("memory")]]
              , state = "pending"
              , promise = {
                state: function() {
                    return state
                },
                always: function() {
                    return deferred.done(arguments).fail(arguments),
                    this
                },
                then: function() {
                    var fns = arguments;
                    return jQuery.Deferred(function(newDefer) {
                        jQuery.each(tuples, function(i, tuple) {
                            var fn = jQuery.isFunction(fns[i]) && fns[i];
                            deferred[tuple[1]](function() {
                                var returned = fn && fn.apply(this, arguments);
                                returned && jQuery.isFunction(returned.promise) ? returned.promise().done(newDefer.resolve).fail(newDefer.reject).progress(newDefer.notify) : newDefer[tuple[0] + "With"](this === promise ? newDefer.promise() : this, fn ? [returned] : arguments)
                            })
                        }),
                        fns = null
                    }).promise()
                },
                promise: function(obj) {
                    return null != obj ? jQuery.extend(obj, promise) : promise
                }
            }
              , deferred = {};
            return promise.pipe = promise.then,
            jQuery.each(tuples, function(i, tuple) {
                var list = tuple[2]
                  , stateString = tuple[3];
                promise[tuple[1]] = list.add,
                stateString && list.add(function() {
                    state = stateString
                }, tuples[1 ^ i][2].disable, tuples[2][2].lock),
                deferred[tuple[0]] = function() {
                    return deferred[tuple[0] + "With"](this === deferred ? promise : this, arguments),
                    this
                }
                ,
                deferred[tuple[0] + "With"] = list.fireWith
            }),
            promise.promise(deferred),
            func && func.call(deferred, deferred),
            deferred
        },
        when: function(subordinate) {
            var progressValues, progressContexts, resolveContexts, i = 0, resolveValues = slice.call(arguments), length = resolveValues.length, remaining = 1 !== length || subordinate && jQuery.isFunction(subordinate.promise) ? length : 0, deferred = 1 === remaining ? subordinate : jQuery.Deferred(), updateFunc = function(i, contexts, values) {
                return function(value) {
                    contexts[i] = this,
                    values[i] = 1 < arguments.length ? slice.call(arguments) : value,
                    values === progressValues ? deferred.notifyWith(contexts, values) : --remaining || deferred.resolveWith(contexts, values)
                }
            };
            if (1 < length)
                for (progressValues = new Array(length),
                progressContexts = new Array(length),
                resolveContexts = new Array(length); i < length; i++)
                    resolveValues[i] && jQuery.isFunction(resolveValues[i].promise) ? resolveValues[i].promise().done(updateFunc(i, resolveContexts, resolveValues)).fail(deferred.reject).progress(updateFunc(i, progressContexts, progressValues)) : --remaining;
            return remaining || deferred.resolveWith(resolveContexts, resolveValues),
            deferred.promise()
        }
    }),
    jQuery.fn.ready = function(fn) {
        return jQuery.ready.promise().done(fn),
        this
    }
    ,
    jQuery.extend({
        isReady: !1,
        readyWait: 1,
        holdReady: function(hold) {
            hold ? jQuery.readyWait++ : jQuery.ready(!0)
        },
        ready: function(wait) {
            (!0 === wait ? --jQuery.readyWait : jQuery.isReady) || (jQuery.isReady = !0) !== wait && 0 < --jQuery.readyWait || (readyList.resolveWith(document, [jQuery]),
            jQuery.fn.triggerHandler && (jQuery(document).triggerHandler("ready"),
            jQuery(document).off("ready")))
        }
    }),
    jQuery.ready.promise = function(obj) {
        return readyList || (readyList = jQuery.Deferred(),
        "complete" === document.readyState ? setTimeout(jQuery.ready) : (document.addEventListener("DOMContentLoaded", completed, !1),
        window.addEventListener("load", completed, !1))),
        readyList.promise(obj)
    }
    ,
    jQuery.ready.promise();
    var access = jQuery.access = function(elems, fn, key, value, chainable, emptyGet, raw) {
        var i = 0
          , len = elems.length
          , bulk = null == key;
        if ("object" === jQuery.type(key))
            for (i in chainable = !0,
            key)
                jQuery.access(elems, fn, i, key[i], !0, emptyGet, raw);
        else if (value !== undefined && (chainable = !0,
        jQuery.isFunction(value) || (raw = !0),
        bulk && (raw ? (fn.call(elems, value),
        fn = null) : (bulk = fn,
        fn = function(elem, key, value) {
            return bulk.call(jQuery(elem), value)
        }
        )),
        fn))
            for (; i < len; i++)
                fn(elems[i], key, raw ? value : value.call(elems[i], i, fn(elems[i], key)));
        return chainable ? elems : bulk ? fn.call(elems) : len ? fn(elems[0], key) : emptyGet
    }
    ;
    jQuery.acceptData = function(owner) {
        return 1 === owner.nodeType || 9 === owner.nodeType || !+owner.nodeType
    }
    ,
    Data.uid = 1,
    Data.accepts = jQuery.acceptData,
    Data.prototype = {
        key: function(owner) {
            if (!Data.accepts(owner))
                return 0;
            var descriptor = {}
              , unlock = owner[this.expando];
            if (!unlock) {
                unlock = Data.uid++;
                try {
                    descriptor[this.expando] = {
                        value: unlock
                    },
                    Object.defineProperties(owner, descriptor)
                } catch (e) {
                    descriptor[this.expando] = unlock,
                    jQuery.extend(owner, descriptor)
                }
            }
            return this.cache[unlock] || (this.cache[unlock] = {}),
            unlock
        },
        set: function(owner, data, value) {
            var prop, unlock = this.key(owner), cache = this.cache[unlock];
            if ("string" == typeof data)
                cache[data] = value;
            else if (jQuery.isEmptyObject(cache))
                jQuery.extend(this.cache[unlock], data);
            else
                for (prop in data)
                    cache[prop] = data[prop];
            return cache
        },
        get: function(owner, key) {
            var cache = this.cache[this.key(owner)];
            return key === undefined ? cache : cache[key]
        },
        access: function(owner, key, value) {
            var stored;
            return key === undefined || key && "string" == typeof key && value === undefined ? (stored = this.get(owner, key)) !== undefined ? stored : this.get(owner, jQuery.camelCase(key)) : (this.set(owner, key, value),
            value !== undefined ? value : key)
        },
        remove: function(owner, key) {
            var i, name, camel, unlock = this.key(owner), cache = this.cache[unlock];
            if (key === undefined)
                this.cache[unlock] = {};
            else {
                jQuery.isArray(key) ? name = key.concat(key.map(jQuery.camelCase)) : (camel = jQuery.camelCase(key),
                name = key in cache ? [key, camel] : (name = camel)in cache ? [name] : name.match(rnotwhite) || []),
                i = name.length;
                for (; i--; )
                    delete cache[name[i]]
            }
        },
        hasData: function(owner) {
            return !jQuery.isEmptyObject(this.cache[owner[this.expando]] || {})
        },
        discard: function(owner) {
            owner[this.expando] && delete this.cache[owner[this.expando]]
        }
    };
    var data_priv = new Data
      , data_user = new Data
      , rbrace = /^(?:\{[\w\W]*\}|\[[\w\W]*\])$/
      , rmultiDash = /([A-Z])/g;
    jQuery.extend({
        hasData: function(elem) {
            return data_user.hasData(elem) || data_priv.hasData(elem)
        },
        data: function(elem, name, data) {
            return data_user.access(elem, name, data)
        },
        removeData: function(elem, name) {
            data_user.remove(elem, name)
        },
        _data: function(elem, name, data) {
            return data_priv.access(elem, name, data)
        },
        _removeData: function(elem, name) {
            data_priv.remove(elem, name)
        }
    }),
    jQuery.fn.extend({
        data: function(key, value) {
            var i, name, data, elem = this[0], attrs = elem && elem.attributes;
            if (key !== undefined)
                return "object" == typeof key ? this.each(function() {
                    data_user.set(this, key)
                }) : access(this, function(value) {
                    var data, camelKey = jQuery.camelCase(key);
                    if (elem && value === undefined)
                        return (data = data_user.get(elem, key)) !== undefined ? data : (data = data_user.get(elem, camelKey)) !== undefined ? data : (data = dataAttr(elem, camelKey, undefined)) !== undefined ? data : void 0;
                    this.each(function() {
                        var data = data_user.get(this, camelKey);
                        data_user.set(this, camelKey, value),
                        -1 !== key.indexOf("-") && data !== undefined && data_user.set(this, key, value)
                    })
                }, null, value, 1 < arguments.length, null, !0);
            if (this.length && (data = data_user.get(elem),
            1 === elem.nodeType && !data_priv.get(elem, "hasDataAttrs"))) {
                for (i = attrs.length; i--; )
                    attrs[i] && 0 === (name = attrs[i].name).indexOf("data-") && (name = jQuery.camelCase(name.slice(5)),
                    dataAttr(elem, name, data[name]));
                data_priv.set(elem, "hasDataAttrs", !0)
            }
            return data
        },
        removeData: function(key) {
            return this.each(function() {
                data_user.remove(this, key)
            })
        }
    }),
    jQuery.extend({
        queue: function(elem, type, data) {
            var queue;
            if (elem)
                return type = (type || "fx") + "queue",
                queue = data_priv.get(elem, type),
                data && (!queue || jQuery.isArray(data) ? queue = data_priv.access(elem, type, jQuery.makeArray(data)) : queue.push(data)),
                queue || []
        },
        dequeue: function(elem, type) {
            type = type || "fx";
            var queue = jQuery.queue(elem, type)
              , startLength = queue.length
              , fn = queue.shift()
              , hooks = jQuery._queueHooks(elem, type)
              , next = function() {
                jQuery.dequeue(elem, type)
            };
            "inprogress" === fn && (fn = queue.shift(),
            startLength--),
            fn && ("fx" === type && queue.unshift("inprogress"),
            delete hooks.stop,
            fn.call(elem, next, hooks)),
            !startLength && hooks && hooks.empty.fire()
        },
        _queueHooks: function(elem, type) {
            var key = type + "queueHooks";
            return data_priv.get(elem, key) || data_priv.access(elem, key, {
                empty: jQuery.Callbacks("once memory").add(function() {
                    data_priv.remove(elem, [type + "queue", key])
                })
            })
        }
    }),
    jQuery.fn.extend({
        queue: function(type, data) {
            var setter = 2;
            return "string" != typeof type && (data = type,
            type = "fx",
            setter--),
            arguments.length < setter ? jQuery.queue(this[0], type) : data === undefined ? this : this.each(function() {
                var queue = jQuery.queue(this, type, data);
                jQuery._queueHooks(this, type),
                "fx" === type && "inprogress" !== queue[0] && jQuery.dequeue(this, type)
            })
        },
        dequeue: function(type) {
            return this.each(function() {
                jQuery.dequeue(this, type)
            })
        },
        clearQueue: function(type) {
            return this.queue(type || "fx", [])
        },
        promise: function(type, obj) {
            var tmp, count = 1, defer = jQuery.Deferred(), elements = this, i = this.length, resolve = function() {
                --count || defer.resolveWith(elements, [elements])
            };
            for ("string" != typeof type && (obj = type,
            type = undefined),
            type = type || "fx"; i--; )
                (tmp = data_priv.get(elements[i], type + "queueHooks")) && tmp.empty && (count++,
                tmp.empty.add(resolve));
            return resolve(),
            defer.promise(obj)
        }
    });
    var div, input, pnum = /[+-]?(?:\d*\.|)\d+(?:[eE][+-]?\d+|)/.source, cssExpand = ["Top", "Right", "Bottom", "Left"], isHidden = function(elem, el) {
        return elem = el || elem,
        "none" === jQuery.css(elem, "display") || !jQuery.contains(elem.ownerDocument, elem)
    }, rcheckableType = /^(?:checkbox|radio)$/i;
    div = document.createDocumentFragment().appendChild(document.createElement("div")),
    (input = document.createElement("input")).setAttribute("type", "radio"),
    input.setAttribute("checked", "checked"),
    input.setAttribute("name", "t"),
    div.appendChild(input),
    support.checkClone = div.cloneNode(!0).cloneNode(!0).lastChild.checked,
    div.innerHTML = "<textarea>x</textarea>",
    support.noCloneChecked = !!div.cloneNode(!0).lastChild.defaultValue;
    var strundefined = typeof undefined;
    support.focusinBubbles = "onfocusin"in window;
    var rkeyEvent = /^key/
      , rmouseEvent = /^(?:mouse|pointer|contextmenu)|click/
      , rfocusMorph = /^(?:focusinfocus|focusoutblur)$/
      , rtypenamespace = /^([^.]*)(?:\.(.+)|)$/;
    jQuery.event = {
        global: {},
        add: function(elem, types, handler, data, selector) {
            var handleObjIn, eventHandle, tmp, events, t, handleObj, special, handlers, type, namespaces, origType, elemData = data_priv.get(elem);
            if (elemData)
                for (handler.handler && (handler = (handleObjIn = handler).handler,
                selector = handleObjIn.selector),
                handler.guid || (handler.guid = jQuery.guid++),
                (events = elemData.events) || (events = elemData.events = {}),
                (eventHandle = elemData.handle) || (eventHandle = elemData.handle = function(e) {
                    return typeof jQuery !== strundefined && jQuery.event.triggered !== e.type ? jQuery.event.dispatch.apply(elem, arguments) : undefined
                }
                ),
                t = (types = (types || "").match(rnotwhite) || [""]).length; t--; )
                    type = origType = (tmp = rtypenamespace.exec(types[t]) || [])[1],
                    namespaces = (tmp[2] || "").split(".").sort(),
                    type && (special = jQuery.event.special[type] || {},
                    type = (selector ? special.delegateType : special.bindType) || type,
                    special = jQuery.event.special[type] || {},
                    handleObj = jQuery.extend({
                        type: type,
                        origType: origType,
                        data: data,
                        handler: handler,
                        guid: handler.guid,
                        selector: selector,
                        needsContext: selector && jQuery.expr.match.needsContext.test(selector),
                        namespace: namespaces.join(".")
                    }, handleObjIn),
                    (handlers = events[type]) || ((handlers = events[type] = []).delegateCount = 0,
                    special.setup && !1 !== special.setup.call(elem, data, namespaces, eventHandle) || elem.addEventListener && elem.addEventListener(type, eventHandle, !1)),
                    special.add && (special.add.call(elem, handleObj),
                    handleObj.handler.guid || (handleObj.handler.guid = handler.guid)),
                    selector ? handlers.splice(handlers.delegateCount++, 0, handleObj) : handlers.push(handleObj),
                    jQuery.event.global[type] = !0)
        },
        remove: function(elem, types, handler, selector, mappedTypes) {
            var j, origCount, tmp, events, t, handleObj, special, handlers, type, namespaces, origType, elemData = data_priv.hasData(elem) && data_priv.get(elem);
            if (elemData && (events = elemData.events)) {
                for (t = (types = (types || "").match(rnotwhite) || [""]).length; t--; )
                    if (type = origType = (tmp = rtypenamespace.exec(types[t]) || [])[1],
                    namespaces = (tmp[2] || "").split(".").sort(),
                    type) {
                        for (special = jQuery.event.special[type] || {},
                        handlers = events[type = (selector ? special.delegateType : special.bindType) || type] || [],
                        tmp = tmp[2] && new RegExp("(^|\\.)" + namespaces.join("\\.(?:.*\\.|)") + "(\\.|$)"),
                        origCount = j = handlers.length; j--; )
                            handleObj = handlers[j],
                            !mappedTypes && origType !== handleObj.origType || handler && handler.guid !== handleObj.guid || tmp && !tmp.test(handleObj.namespace) || selector && selector !== handleObj.selector && ("**" !== selector || !handleObj.selector) || (handlers.splice(j, 1),
                            handleObj.selector && handlers.delegateCount--,
                            special.remove && special.remove.call(elem, handleObj));
                        origCount && !handlers.length && (special.teardown && !1 !== special.teardown.call(elem, namespaces, elemData.handle) || jQuery.removeEvent(elem, type, elemData.handle),
                        delete events[type])
                    } else
                        for (type in events)
                            jQuery.event.remove(elem, type + types[t], handler, selector, !0);
                jQuery.isEmptyObject(events) && (delete elemData.handle,
                data_priv.remove(elem, "events"))
            }
        },
        trigger: function(event, data, elem, onlyHandlers) {
            var i, cur, tmp, bubbleType, ontype, handle, special, eventPath = [elem || document], type = hasOwn.call(event, "type") ? event.type : event, namespaces = hasOwn.call(event, "namespace") ? event.namespace.split(".") : [];
            if (cur = tmp = elem = elem || document,
            3 !== elem.nodeType && 8 !== elem.nodeType && !rfocusMorph.test(type + jQuery.event.triggered) && (0 <= type.indexOf(".") && (type = (namespaces = type.split(".")).shift(),
            namespaces.sort()),
            ontype = type.indexOf(":") < 0 && "on" + type,
            (event = event[jQuery.expando] ? event : new jQuery.Event(type,"object" == typeof event && event)).isTrigger = onlyHandlers ? 2 : 3,
            event.namespace = namespaces.join("."),
            event.namespace_re = event.namespace ? new RegExp("(^|\\.)" + namespaces.join("\\.(?:.*\\.|)") + "(\\.|$)") : null,
            event.result = undefined,
            event.target || (event.target = elem),
            data = null == data ? [event] : jQuery.makeArray(data, [event]),
            special = jQuery.event.special[type] || {},
            onlyHandlers || !special.trigger || !1 !== special.trigger.apply(elem, data))) {
                if (!onlyHandlers && !special.noBubble && !jQuery.isWindow(elem)) {
                    for (bubbleType = special.delegateType || type,
                    rfocusMorph.test(bubbleType + type) || (cur = cur.parentNode); cur; cur = cur.parentNode)
                        eventPath.push(cur),
                        tmp = cur;
                    tmp === (elem.ownerDocument || document) && eventPath.push(tmp.defaultView || tmp.parentWindow || window)
                }
                for (i = 0; (cur = eventPath[i++]) && !event.isPropagationStopped(); )
                    event.type = 1 < i ? bubbleType : special.bindType || type,
                    (handle = (data_priv.get(cur, "events") || {})[event.type] && data_priv.get(cur, "handle")) && handle.apply(cur, data),
                    (handle = ontype && cur[ontype]) && handle.apply && jQuery.acceptData(cur) && (event.result = handle.apply(cur, data),
                    !1 === event.result && event.preventDefault());
                return event.type = type,
                onlyHandlers || event.isDefaultPrevented() || special._default && !1 !== special._default.apply(eventPath.pop(), data) || !jQuery.acceptData(elem) || ontype && jQuery.isFunction(elem[type]) && !jQuery.isWindow(elem) && ((tmp = elem[ontype]) && (elem[ontype] = null),
                elem[jQuery.event.triggered = type](),
                jQuery.event.triggered = undefined,
                tmp && (elem[ontype] = tmp)),
                event.result
            }
        },
        dispatch: function(event) {
            event = jQuery.event.fix(event);
            var i, j, ret, matched, handleObj, handlerQueue = [], args = slice.call(arguments), handlers = (data_priv.get(this, "events") || {})[event.type] || [], special = jQuery.event.special[event.type] || {};
            if ((args[0] = event).delegateTarget = this,
            !special.preDispatch || !1 !== special.preDispatch.call(this, event)) {
                for (handlerQueue = jQuery.event.handlers.call(this, event, handlers),
                i = 0; (matched = handlerQueue[i++]) && !event.isPropagationStopped(); )
                    for (event.currentTarget = matched.elem,
                    j = 0; (handleObj = matched.handlers[j++]) && !event.isImmediatePropagationStopped(); )
                        event.namespace_re && !event.namespace_re.test(handleObj.namespace) || (event.handleObj = handleObj,
                        event.data = handleObj.data,
                        (ret = ((jQuery.event.special[handleObj.origType] || {}).handle || handleObj.handler).apply(matched.elem, args)) !== undefined && !1 === (event.result = ret) && (event.preventDefault(),
                        event.stopPropagation()));
                return special.postDispatch && special.postDispatch.call(this, event),
                event.result
            }
        },
        handlers: function(event, handlers) {
            var i, matches, sel, handleObj, handlerQueue = [], delegateCount = handlers.delegateCount, cur = event.target;
            if (delegateCount && cur.nodeType && (!event.button || "click" !== event.type))
                for (; cur !== this; cur = cur.parentNode || this)
                    if (!0 !== cur.disabled || "click" !== event.type) {
                        for (matches = [],
                        i = 0; i < delegateCount; i++)
                            matches[sel = (handleObj = handlers[i]).selector + " "] === undefined && (matches[sel] = handleObj.needsContext ? 0 <= jQuery(sel, this).index(cur) : jQuery.find(sel, this, null, [cur]).length),
                            matches[sel] && matches.push(handleObj);
                        matches.length && handlerQueue.push({
                            elem: cur,
                            handlers: matches
                        })
                    }
            return delegateCount < handlers.length && handlerQueue.push({
                elem: this,
                handlers: handlers.slice(delegateCount)
            }),
            handlerQueue
        },
        props: "altKey bubbles cancelable ctrlKey currentTarget eventPhase metaKey relatedTarget shiftKey target timeStamp view which".split(" "),
        fixHooks: {},
        keyHooks: {
            props: "char charCode key keyCode".split(" "),
            filter: function(event, original) {
                return null == event.which && (event.which = null != original.charCode ? original.charCode : original.keyCode),
                event
            }
        },
        mouseHooks: {
            props: "button buttons clientX clientY offsetX offsetY pageX pageY screenX screenY toElement".split(" "),
            filter: function(event, original) {
                var eventDoc, doc, body, button = original.button;
                return null == event.pageX && null != original.clientX && (doc = (eventDoc = event.target.ownerDocument || document).documentElement,
                body = eventDoc.body,
                event.pageX = original.clientX + (doc && doc.scrollLeft || body && body.scrollLeft || 0) - (doc && doc.clientLeft || body && body.clientLeft || 0),
                event.pageY = original.clientY + (doc && doc.scrollTop || body && body.scrollTop || 0) - (doc && doc.clientTop || body && body.clientTop || 0)),
                event.which || button === undefined || (event.which = 1 & button ? 1 : 2 & button ? 3 : 4 & button ? 2 : 0),
                event
            }
        },
        fix: function(event) {
            if (event[jQuery.expando])
                return event;
            var i, prop, copy, type = event.type, originalEvent = event, fixHook = this.fixHooks[type];
            for (fixHook || (this.fixHooks[type] = fixHook = rmouseEvent.test(type) ? this.mouseHooks : rkeyEvent.test(type) ? this.keyHooks : {}),
            copy = fixHook.props ? this.props.concat(fixHook.props) : this.props,
            event = new jQuery.Event(originalEvent),
            i = copy.length; i--; )
                event[prop = copy[i]] = originalEvent[prop];
            return event.target || (event.target = document),
            3 === event.target.nodeType && (event.target = event.target.parentNode),
            fixHook.filter ? fixHook.filter(event, originalEvent) : event
        },
        special: {
            load: {
                noBubble: !0
            },
            focus: {
                trigger: function() {
                    if (this !== safeActiveElement() && this.focus)
                        return this.focus(),
                        !1
                },
                delegateType: "focusin"
            },
            blur: {
                trigger: function() {
                    if (this === safeActiveElement() && this.blur)
                        return this.blur(),
                        !1
                },
                delegateType: "focusout"
            },
            click: {
                trigger: function() {
                    if ("checkbox" === this.type && this.click && jQuery.nodeName(this, "input"))
                        return this.click(),
                        !1
                },
                _default: function(event) {
                    return jQuery.nodeName(event.target, "a")
                }
            },
            beforeunload: {
                postDispatch: function(event) {
                    event.result !== undefined && event.originalEvent && (event.originalEvent.returnValue = event.result)
                }
            }
        },
        simulate: function(type, elem, event, bubble) {
            var e = jQuery.extend(new jQuery.Event, event, {
                type: type,
                isSimulated: !0,
                originalEvent: {}
            });
            bubble ? jQuery.event.trigger(e, null, elem) : jQuery.event.dispatch.call(elem, e),
            e.isDefaultPrevented() && event.preventDefault()
        }
    },
    jQuery.removeEvent = function(elem, type, handle) {
        elem.removeEventListener && elem.removeEventListener(type, handle, !1)
    }
    ,
    jQuery.Event = function(src, props) {
        if (!(this instanceof jQuery.Event))
            return new jQuery.Event(src,props);
        src && src.type ? (this.originalEvent = src,
        this.type = src.type,
        this.isDefaultPrevented = src.defaultPrevented || src.defaultPrevented === undefined && !1 === src.returnValue ? returnTrue : returnFalse) : this.type = src,
        props && jQuery.extend(this, props),
        this.timeStamp = src && src.timeStamp || jQuery.now(),
        this[jQuery.expando] = !0
    }
    ,
    jQuery.Event.prototype = {
        isDefaultPrevented: returnFalse,
        isPropagationStopped: returnFalse,
        isImmediatePropagationStopped: returnFalse,
        preventDefault: function() {
            var e = this.originalEvent;
            this.isDefaultPrevented = returnTrue,
            e && e.preventDefault && e.preventDefault()
        },
        stopPropagation: function() {
            var e = this.originalEvent;
            this.isPropagationStopped = returnTrue,
            e && e.stopPropagation && e.stopPropagation()
        },
        stopImmediatePropagation: function() {
            var e = this.originalEvent;
            this.isImmediatePropagationStopped = returnTrue,
            e && e.stopImmediatePropagation && e.stopImmediatePropagation(),
            this.stopPropagation()
        }
    },
    jQuery.each({
        mouseenter: "mouseover",
        mouseleave: "mouseout",
        pointerenter: "pointerover",
        pointerleave: "pointerout"
    }, function(orig, fix) {
        jQuery.event.special[orig] = {
            delegateType: fix,
            bindType: fix,
            handle: function(event) {
                var ret, target = this, related = event.relatedTarget, handleObj = event.handleObj;
                return related && (related === target || jQuery.contains(target, related)) || (event.type = handleObj.origType,
                ret = handleObj.handler.apply(this, arguments),
                event.type = fix),
                ret
            }
        }
    }),
    support.focusinBubbles || jQuery.each({
        focus: "focusin",
        blur: "focusout"
    }, function(orig, fix) {
        var handler = function(event) {
            jQuery.event.simulate(fix, event.target, jQuery.event.fix(event), !0)
        };
        jQuery.event.special[fix] = {
            setup: function() {
                var doc = this.ownerDocument || this
                  , attaches = data_priv.access(doc, fix);
                attaches || doc.addEventListener(orig, handler, !0),
                data_priv.access(doc, fix, (attaches || 0) + 1)
            },
            teardown: function() {
                var doc = this.ownerDocument || this
                  , attaches = data_priv.access(doc, fix) - 1;
                attaches ? data_priv.access(doc, fix, attaches) : (doc.removeEventListener(orig, handler, !0),
                data_priv.remove(doc, fix))
            }
        }
    }),
    jQuery.fn.extend({
        on: function(types, selector, data, fn, one) {
            var origFn, type;
            if ("object" == typeof types) {
                for (type in "string" != typeof selector && (data = data || selector,
                selector = undefined),
                types)
                    this.on(type, selector, data, types[type], one);
                return this
            }
            if (null == data && null == fn ? (fn = selector,
            data = selector = undefined) : null == fn && ("string" == typeof selector ? (fn = data,
            data = undefined) : (fn = data,
            data = selector,
            selector = undefined)),
            !1 === fn)
                fn = returnFalse;
            else if (!fn)
                return this;
            return 1 === one && (origFn = fn,
            (fn = function(event) {
                return jQuery().off(event),
                origFn.apply(this, arguments)
            }
            ).guid = origFn.guid || (origFn.guid = jQuery.guid++)),
            this.each(function() {
                jQuery.event.add(this, types, fn, data, selector)
            })
        },
        one: function(types, selector, data, fn) {
            return this.on(types, selector, data, fn, 1)
        },
        off: function(types, selector, fn) {
            var handleObj, type;
            if (types && types.preventDefault && types.handleObj)
                return handleObj = types.handleObj,
                jQuery(types.delegateTarget).off(handleObj.namespace ? handleObj.origType + "." + handleObj.namespace : handleObj.origType, handleObj.selector, handleObj.handler),
                this;
            if ("object" != typeof types)
                return !1 !== selector && "function" != typeof selector || (fn = selector,
                selector = undefined),
                !1 === fn && (fn = returnFalse),
                this.each(function() {
                    jQuery.event.remove(this, types, fn, selector)
                });
            for (type in types)
                this.off(type, selector, types[type]);
            return this
        },
        trigger: function(type, data) {
            return this.each(function() {
                jQuery.event.trigger(type, data, this)
            })
        },
        triggerHandler: function(type, data) {
            var elem = this[0];
            if (elem)
                return jQuery.event.trigger(type, data, elem, !0)
        }
    });
    var rxhtmlTag = /<(?!area|br|col|embed|hr|img|input|link|meta|param)(([\w:]+)[^>]*)\/>/gi
      , rtagName = /<([\w:]+)/
      , rhtml = /<|&#?\w+;/
      , rnoInnerhtml = /<(?:script|style|link)/i
      , rchecked = /checked\s*(?:[^=]|=\s*.checked.)/i
      , rscriptType = /^$|\/(?:java|ecma)script/i
      , rscriptTypeMasked = /^true\/(.*)/
      , rcleanScript = /^\s*<!(?:\[CDATA\[|--)|(?:\]\]|--)>\s*$/g
      , wrapMap = {
        option: [1, "<select multiple='multiple'>", "</select>"],
        thead: [1, "<table>", "</table>"],
        col: [2, "<table><colgroup>", "</colgroup></table>"],
        tr: [2, "<table><tbody>", "</tbody></table>"],
        td: [3, "<table><tbody><tr>", "</tr></tbody></table>"],
        _default: [0, "", ""]
    };
    wrapMap.optgroup = wrapMap.option,
    wrapMap.tbody = wrapMap.tfoot = wrapMap.colgroup = wrapMap.caption = wrapMap.thead,
    wrapMap.th = wrapMap.td,
    jQuery.extend({
        clone: function(elem, dataAndEvents, deepDataAndEvents) {
            var i, l, srcElements, destElements, clone = elem.cloneNode(!0), inPage = jQuery.contains(elem.ownerDocument, elem);
            if (!(support.noCloneChecked || 1 !== elem.nodeType && 11 !== elem.nodeType || jQuery.isXMLDoc(elem)))
                for (destElements = getAll(clone),
                i = 0,
                l = (srcElements = getAll(elem)).length; i < l; i++)
                    fixInput(srcElements[i], destElements[i]);
            if (dataAndEvents)
                if (deepDataAndEvents)
                    for (srcElements = srcElements || getAll(elem),
                    destElements = destElements || getAll(clone),
                    i = 0,
                    l = srcElements.length; i < l; i++)
                        cloneCopyEvent(srcElements[i], destElements[i]);
                else
                    cloneCopyEvent(elem, clone);
            return 0 < (destElements = getAll(clone, "script")).length && setGlobalEval(destElements, !inPage && getAll(elem, "script")),
            clone
        },
        buildFragment: function(elems, context, scripts, selection) {
            for (var elem, tmp, tag, wrap, contains, j, fragment = context.createDocumentFragment(), nodes = [], i = 0, l = elems.length; i < l; i++)
                if ((elem = elems[i]) || 0 === elem)
                    if ("object" === jQuery.type(elem))
                        jQuery.merge(nodes, elem.nodeType ? [elem] : elem);
                    else if (rhtml.test(elem)) {
                        for (tmp = tmp || fragment.appendChild(context.createElement("div")),
                        tag = (rtagName.exec(elem) || ["", ""])[1].toLowerCase(),
                        wrap = wrapMap[tag] || wrapMap._default,
                        tmp.innerHTML = wrap[1] + elem.replace(rxhtmlTag, "<$1></$2>") + wrap[2],
                        j = wrap[0]; j--; )
                            tmp = tmp.lastChild;
                        jQuery.merge(nodes, tmp.childNodes),
                        (tmp = fragment.firstChild).textContent = ""
                    } else
                        nodes.push(context.createTextNode(elem));
            for (fragment.textContent = "",
            i = 0; elem = nodes[i++]; )
                if ((!selection || -1 === jQuery.inArray(elem, selection)) && (contains = jQuery.contains(elem.ownerDocument, elem),
                tmp = getAll(fragment.appendChild(elem), "script"),
                contains && setGlobalEval(tmp),
                scripts))
                    for (j = 0; elem = tmp[j++]; )
                        rscriptType.test(elem.type || "") && scripts.push(elem);
            return fragment
        },
        cleanData: function(elems) {
            for (var data, elem, type, key, special = jQuery.event.special, i = 0; (elem = elems[i]) !== undefined; i++) {
                if (jQuery.acceptData(elem) && (key = elem[data_priv.expando]) && (data = data_priv.cache[key])) {
                    if (data.events)
                        for (type in data.events)
                            special[type] ? jQuery.event.remove(elem, type) : jQuery.removeEvent(elem, type, data.handle);
                    data_priv.cache[key] && delete data_priv.cache[key]
                }
                delete data_user.cache[elem[data_user.expando]]
            }
        }
    }),
    jQuery.fn.extend({
        text: function(value) {
            return access(this, function(value) {
                return value === undefined ? jQuery.text(this) : this.empty().each(function() {
                    1 !== this.nodeType && 11 !== this.nodeType && 9 !== this.nodeType || (this.textContent = value)
                })
            }, null, value, arguments.length)
        },
        append: function() {
            return this.domManip(arguments, function(elem) {
                1 !== this.nodeType && 11 !== this.nodeType && 9 !== this.nodeType || manipulationTarget(this, elem).appendChild(elem)
            })
        },
        prepend: function() {
            return this.domManip(arguments, function(elem) {
                if (1 === this.nodeType || 11 === this.nodeType || 9 === this.nodeType) {
                    var target = manipulationTarget(this, elem);
                    target.insertBefore(elem, target.firstChild)
                }
            })
        },
        before: function() {
            return this.domManip(arguments, function(elem) {
                this.parentNode && this.parentNode.insertBefore(elem, this)
            })
        },
        after: function() {
            return this.domManip(arguments, function(elem) {
                this.parentNode && this.parentNode.insertBefore(elem, this.nextSibling)
            })
        },
        remove: function(selector, keepData) {
            for (var elem, elems = selector ? jQuery.filter(selector, this) : this, i = 0; null != (elem = elems[i]); i++)
                keepData || 1 !== elem.nodeType || jQuery.cleanData(getAll(elem)),
                elem.parentNode && (keepData && jQuery.contains(elem.ownerDocument, elem) && setGlobalEval(getAll(elem, "script")),
                elem.parentNode.removeChild(elem));
            return this
        },
        empty: function() {
            for (var elem, i = 0; null != (elem = this[i]); i++)
                1 === elem.nodeType && (jQuery.cleanData(getAll(elem, !1)),
                elem.textContent = "");
            return this
        },
        clone: function(dataAndEvents, deepDataAndEvents) {
            return dataAndEvents = null != dataAndEvents && dataAndEvents,
            deepDataAndEvents = null == deepDataAndEvents ? dataAndEvents : deepDataAndEvents,
            this.map(function() {
                return jQuery.clone(this, dataAndEvents, deepDataAndEvents)
            })
        },
        html: function(value) {
            return access(this, function(value) {
                var elem = this[0] || {}
                  , i = 0
                  , l = this.length;
                if (value === undefined && 1 === elem.nodeType)
                    return elem.innerHTML;
                if ("string" == typeof value && !rnoInnerhtml.test(value) && !wrapMap[(rtagName.exec(value) || ["", ""])[1].toLowerCase()]) {
                    value = value.replace(rxhtmlTag, "<$1></$2>");
                    try {
                        for (; i < l; i++)
                            1 === (elem = this[i] || {}).nodeType && (jQuery.cleanData(getAll(elem, !1)),
                            elem.innerHTML = value);
                        elem = 0
                    } catch (e) {}
                }
                elem && this.empty().append(value)
            }, null, value, arguments.length)
        },
        replaceWith: function(argument_0) {
            var arg = argument_0;
            return this.domManip(arguments, function(elem) {
                arg = this.parentNode,
                jQuery.cleanData(getAll(this)),
                arg && arg.replaceChild(elem, this)
            }),
            arg && (arg.length || arg.nodeType) ? this : this.remove()
        },
        detach: function(selector) {
            return this.remove(selector, !0)
        },
        domManip: function(args, callback) {
            args = concat.apply([], args);
            var fragment, first, scripts, hasScripts, node, doc, i = 0, l = this.length, set = this, iNoClone = l - 1, value = args[0], isFunction = jQuery.isFunction(value);
            if (isFunction || 1 < l && "string" == typeof value && !support.checkClone && rchecked.test(value))
                return this.each(function(index) {
                    var self = set.eq(index);
                    isFunction && (args[0] = value.call(this, index, self.html())),
                    self.domManip(args, callback)
                });
            if (l && (first = (fragment = jQuery.buildFragment(args, this[0].ownerDocument, !1, this)).firstChild,
            1 === fragment.childNodes.length && (fragment = first),
            first)) {
                for (hasScripts = (scripts = jQuery.map(getAll(fragment, "script"), disableScript)).length; i < l; i++)
                    node = fragment,
                    i !== iNoClone && (node = jQuery.clone(node, !0, !0),
                    hasScripts && jQuery.merge(scripts, getAll(node, "script"))),
                    callback.call(this[i], node, i);
                if (hasScripts)
                    for (doc = scripts[scripts.length - 1].ownerDocument,
                    jQuery.map(scripts, restoreScript),
                    i = 0; i < hasScripts; i++)
                        node = scripts[i],
                        rscriptType.test(node.type || "") && !data_priv.access(node, "globalEval") && jQuery.contains(doc, node) && (node.src ? jQuery._evalUrl && jQuery._evalUrl(node.src) : jQuery.globalEval(node.textContent.replace(rcleanScript, "")))
            }
            return this
        }
    }),
    jQuery.each({
        appendTo: "append",
        prependTo: "prepend",
        insertBefore: "before",
        insertAfter: "after",
        replaceAll: "replaceWith"
    }, function(name, original) {
        jQuery.fn[name] = function(selector) {
            for (var elems, ret = [], insert = jQuery(selector), last = insert.length - 1, i = 0; i <= last; i++)
                elems = i === last ? this : this.clone(!0),
                jQuery(insert[i])[original](elems),
                push.apply(ret, elems.get());
            return this.pushStack(ret)
        }
    });
    var iframe, elemdisplay = {}, rmargin = /^margin/, rnumnonpx = new RegExp("^(" + pnum + ")(?!px)[a-z%]+$","i"), getStyles = function(elem) {
        return elem.ownerDocument.defaultView.getComputedStyle(elem, null)
    };
    !function() {
        function computePixelPositionAndBoxSizingReliable() {
            div.style.cssText = "-webkit-box-sizing:border-box;-moz-box-sizing:border-box;box-sizing:border-box;display:block;margin-top:1%;top:1%;border:1px;padding:1px;width:4px;position:absolute",
            div.innerHTML = "",
            docElem.appendChild(container);
            var divStyle = window.getComputedStyle(div, null);
            pixelPositionVal = "1%" !== divStyle.top,
            boxSizingReliableVal = "4px" === divStyle.width,
            docElem.removeChild(container)
        }
        var pixelPositionVal, boxSizingReliableVal, docElem = document.documentElement, container = document.createElement("div"), div = document.createElement("div");
        div.style && (div.style.backgroundClip = "content-box",
        div.cloneNode(!0).style.backgroundClip = "",
        support.clearCloneStyle = "content-box" === div.style.backgroundClip,
        container.style.cssText = "border:0;width:0;height:0;top:0;left:-9999px;margin-top:1px;position:absolute",
        container.appendChild(div),
        window.getComputedStyle && jQuery.extend(support, {
            pixelPosition: function() {
                return computePixelPositionAndBoxSizingReliable(),
                pixelPositionVal
            },
            boxSizingReliable: function() {
                return null == boxSizingReliableVal && computePixelPositionAndBoxSizingReliable(),
                boxSizingReliableVal
            },
            reliableMarginRight: function() {
                var ret, marginDiv = div.appendChild(document.createElement("div"));
                return marginDiv.style.cssText = div.style.cssText = "-webkit-box-sizing:content-box;-moz-box-sizing:content-box;box-sizing:content-box;display:block;margin:0;border:0;padding:0",
                marginDiv.style.marginRight = marginDiv.style.width = "0",
                div.style.width = "1px",
                docElem.appendChild(container),
                ret = !parseFloat(window.getComputedStyle(marginDiv, null).marginRight),
                docElem.removeChild(container),
                ret
            }
        }))
    }(),
    jQuery.swap = function(elem, options, callback, args) {
        var ret, name, old = {};
        for (name in options)
            old[name] = elem.style[name],
            elem.style[name] = options[name];
        for (name in ret = callback.apply(elem, args || []),
        options)
            elem.style[name] = old[name];
        return ret
    }
    ;
    var rdisplayswap = /^(none|table(?!-c[ea]).+)/
      , rnumsplit = new RegExp("^(" + pnum + ")(.*)$","i")
      , rrelNum = new RegExp("^([+-])=(" + pnum + ")","i")
      , cssShow = {
        position: "absolute",
        visibility: "hidden",
        display: "block"
    }
      , cssNormalTransform = {
        letterSpacing: "0",
        fontWeight: "400"
    }
      , cssPrefixes = ["Webkit", "O", "Moz", "ms"];
    jQuery.extend({
        cssHooks: {
            opacity: {
                get: function(elem, computed) {
                    if (computed) {
                        var ret = curCSS(elem, "opacity");
                        return "" === ret ? "1" : ret
                    }
                }
            }
        },
        cssNumber: {
            columnCount: !0,
            fillOpacity: !0,
            flexGrow: !0,
            flexShrink: !0,
            fontWeight: !0,
            lineHeight: !0,
            opacity: !0,
            order: !0,
            orphans: !0,
            widows: !0,
            zIndex: !0,
            zoom: !0
        },
        cssProps: {
            "float": "cssFloat"
        },
        style: function(elem, name, value, extra) {
            if (elem && 3 !== elem.nodeType && 8 !== elem.nodeType && elem.style) {
                var ret, type, hooks, origName = jQuery.camelCase(name), style = elem.style;
                if (name = jQuery.cssProps[origName] || (jQuery.cssProps[origName] = vendorPropName(style, origName)),
                hooks = jQuery.cssHooks[name] || jQuery.cssHooks[origName],
                value === undefined)
                    return hooks && "get"in hooks && (ret = hooks.get(elem, !1, extra)) !== undefined ? ret : style[name];
                "string" === (type = typeof value) && (ret = rrelNum.exec(value)) && (value = (ret[1] + 1) * ret[2] + parseFloat(jQuery.css(elem, name)),
                type = "number"),
                null != value && value == value && ("number" !== type || jQuery.cssNumber[origName] || (value += "px"),
                support.clearCloneStyle || "" !== value || 0 !== name.indexOf("background") || (style[name] = "inherit"),
                hooks && "set"in hooks && (value = hooks.set(elem, value, extra)) === undefined || (style[name] = value))
            }
        },
        css: function(elem, name, extra, styles) {
            var val, num, hooks, origName = jQuery.camelCase(name);
            return name = jQuery.cssProps[origName] || (jQuery.cssProps[origName] = vendorPropName(elem.style, origName)),
            (hooks = jQuery.cssHooks[name] || jQuery.cssHooks[origName]) && "get"in hooks && (val = hooks.get(elem, !0, extra)),
            val === undefined && (val = curCSS(elem, name, styles)),
            "normal" === val && name in cssNormalTransform && (val = cssNormalTransform[name]),
            "" === extra || extra ? (num = parseFloat(val),
            !0 === extra || jQuery.isNumeric(num) ? num || 0 : val) : val
        }
    }),
    jQuery.each(["height", "width"], function(i, name) {
        jQuery.cssHooks[name] = {
            get: function(elem, computed, extra) {
                if (computed)
                    return rdisplayswap.test(jQuery.css(elem, "display")) && 0 === elem.offsetWidth ? jQuery.swap(elem, cssShow, function() {
                        return getWidthOrHeight(elem, name, extra)
                    }) : getWidthOrHeight(elem, name, extra)
            },
            set: function(elem, value, extra) {
                var styles = extra && getStyles(elem);
                return setPositiveNumber(elem, value, extra ? augmentWidthOrHeight(elem, name, extra, "border-box" === jQuery.css(elem, "boxSizing", !1, styles), styles) : 0)
            }
        }
    }),
    jQuery.cssHooks.marginRight = addGetHookIf(support.reliableMarginRight, function(elem, computed) {
        if (computed)
            return jQuery.swap(elem, {
                display: "inline-block"
            }, curCSS, [elem, "marginRight"])
    }),
    jQuery.each({
        margin: "",
        padding: "",
        border: "Width"
    }, function(prefix, suffix) {
        jQuery.cssHooks[prefix + suffix] = {
            expand: function(value) {
                for (var i = 0, expanded = {}, parts = "string" == typeof value ? value.split(" ") : [value]; i < 4; i++)
                    expanded[prefix + cssExpand[i] + suffix] = parts[i] || parts[i - 2] || parts[0];
                return expanded
            }
        },
        rmargin.test(prefix) || (jQuery.cssHooks[prefix + suffix].set = setPositiveNumber)
    }),
    jQuery.fn.extend({
        css: function(name, value) {
            return access(this, function(elem, name, value) {
                var styles, len, map = {}, i = 0;
                if (jQuery.isArray(name)) {
                    for (styles = getStyles(elem),
                    len = name.length; i < len; i++)
                        map[name[i]] = jQuery.css(elem, name[i], !1, styles);
                    return map
                }
                return value !== undefined ? jQuery.style(elem, name, value) : jQuery.css(elem, name)
            }, name, value, 1 < arguments.length)
        },
        show: function() {
            return showHide(this, !0)
        },
        hide: function() {
            return showHide(this)
        },
        toggle: function(state) {
            return "boolean" == typeof state ? state ? this.show() : this.hide() : this.each(function() {
                isHidden(this) ? jQuery(this).show() : jQuery(this).hide()
            })
        }
    }),
    (jQuery.Tween = Tween).prototype = {
        constructor: Tween,
        init: function(elem, options, prop, end, easing, unit) {
            this.elem = elem,
            this.prop = prop,
            this.easing = easing || "swing",
            this.options = options,
            this.start = this.now = this.cur(),
            this.end = end,
            this.unit = unit || (jQuery.cssNumber[prop] ? "" : "px")
        },
        cur: function() {
            var hooks = Tween.propHooks[this.prop];
            return hooks && hooks.get ? hooks.get(this) : Tween.propHooks._default.get(this)
        },
        run: function(percent) {
            var eased, hooks = Tween.propHooks[this.prop];
            return this.options.duration ? this.pos = eased = jQuery.easing[this.easing](percent, this.options.duration * percent, 0, 1, this.options.duration) : this.pos = eased = percent,
            this.now = (this.end - this.start) * eased + this.start,
            this.options.step && this.options.step.call(this.elem, this.now, this),
            hooks && hooks.set ? hooks.set(this) : Tween.propHooks._default.set(this),
            this
        }
    },
    Tween.prototype.init.prototype = Tween.prototype,
    Tween.propHooks = {
        _default: {
            get: function(tween) {
                var result;
                return null == tween.elem[tween.prop] || tween.elem.style && null != tween.elem.style[tween.prop] ? (result = jQuery.css(tween.elem, tween.prop, "")) && "auto" !== result ? result : 0 : tween.elem[tween.prop]
            },
            set: function(tween) {
                jQuery.fx.step[tween.prop] ? jQuery.fx.step[tween.prop](tween) : tween.elem.style && (null != tween.elem.style[jQuery.cssProps[tween.prop]] || jQuery.cssHooks[tween.prop]) ? jQuery.style(tween.elem, tween.prop, tween.now + tween.unit) : tween.elem[tween.prop] = tween.now
            }
        }
    },
    Tween.propHooks.scrollTop = Tween.propHooks.scrollLeft = {
        set: function(tween) {
            tween.elem.nodeType && tween.elem.parentNode && (tween.elem[tween.prop] = tween.now)
        }
    },
    jQuery.easing = {
        linear: function(p) {
            return p
        },
        swing: function(p) {
            return .5 - Math.cos(p * Math.PI) / 2
        }
    },
    jQuery.fx = Tween.prototype.init,
    jQuery.fx.step = {};
    var fxNow, timerId, rfxtypes = /^(?:toggle|show|hide)$/, rfxnum = new RegExp("^(?:([+-])=|)(" + pnum + ")([a-z%]*)$","i"), rrun = /queueHooks$/, animationPrefilters = [defaultPrefilter], tweeners = {
        "*": [function(prop, value) {
            var tween = this.createTween(prop, value)
              , target = tween.cur()
              , parts = rfxnum.exec(value)
              , unit = parts && parts[3] || (jQuery.cssNumber[prop] ? "" : "px")
              , start = (jQuery.cssNumber[prop] || "px" !== unit && +target) && rfxnum.exec(jQuery.css(tween.elem, prop))
              , scale = 1
              , maxIterations = 20;
            if (start && start[3] !== unit)
                for (unit = unit || start[3],
                parts = parts || [],
                start = +target || 1; start /= scale = scale || ".5",
                jQuery.style(tween.elem, prop, start + unit),
                scale !== (scale = tween.cur() / target) && 1 !== scale && --maxIterations; )
                    ;
            return parts && (start = tween.start = +start || +target || 0,
            tween.unit = unit,
            tween.end = parts[1] ? start + (parts[1] + 1) * parts[2] : +parts[2]),
            tween
        }
        ]
    };
    jQuery.Animation = jQuery.extend(Animation, {
        tweener: function(props, callback) {
            jQuery.isFunction(props) ? (callback = props,
            props = ["*"]) : props = props.split(" ");
            for (var prop, index = 0, length = props.length; index < length; index++)
                prop = props[index],
                tweeners[prop] = tweeners[prop] || [],
                tweeners[prop].unshift(callback)
        },
        prefilter: function(callback, prepend) {
            prepend ? animationPrefilters.unshift(callback) : animationPrefilters.push(callback)
        }
    }),
    jQuery.speed = function(speed, easing, fn) {
        var opt = speed && "object" == typeof speed ? jQuery.extend({}, speed) : {
            complete: fn || !fn && easing || jQuery.isFunction(speed) && speed,
            duration: speed,
            easing: fn && easing || easing && !jQuery.isFunction(easing) && easing
        };
        return opt.duration = jQuery.fx.off ? 0 : "number" == typeof opt.duration ? opt.duration : opt.duration in jQuery.fx.speeds ? jQuery.fx.speeds[opt.duration] : jQuery.fx.speeds._default,
        null != opt.queue && !0 !== opt.queue || (opt.queue = "fx"),
        opt.old = opt.complete,
        opt.complete = function() {
            jQuery.isFunction(opt.old) && opt.old.call(this),
            opt.queue && jQuery.dequeue(this, opt.queue)
        }
        ,
        opt
    }
    ,
    jQuery.fn.extend({
        fadeTo: function(speed, to, easing, callback) {
            return this.filter(isHidden).css("opacity", 0).show().end().animate({
                opacity: to
            }, speed, easing, callback)
        },
        animate: function(prop, speed, easing, callback) {
            var empty = jQuery.isEmptyObject(prop)
              , optall = jQuery.speed(speed, easing, callback)
              , doAnimation = function() {
                var anim = Animation(this, jQuery.extend({}, prop), optall);
                (empty || data_priv.get(this, "finish")) && anim.stop(!0)
            };
            return doAnimation.finish = doAnimation,
            empty || !1 === optall.queue ? this.each(doAnimation) : this.queue(optall.queue, doAnimation)
        },
        stop: function(type, clearQueue, gotoEnd) {
            var stopQueue = function(hooks) {
                var stop = hooks.stop;
                delete hooks.stop,
                stop(gotoEnd)
            };
            return "string" != typeof type && (gotoEnd = clearQueue,
            clearQueue = type,
            type = undefined),
            clearQueue && !1 !== type && this.queue(type || "fx", []),
            this.each(function() {
                var dequeue = !0
                  , index = null != type && type + "queueHooks"
                  , timers = jQuery.timers
                  , data = data_priv.get(this);
                if (index)
                    data[index] && data[index].stop && stopQueue(data[index]);
                else
                    for (index in data)
                        data[index] && data[index].stop && rrun.test(index) && stopQueue(data[index]);
                for (index = timers.length; index--; )
                    timers[index].elem !== this || null != type && timers[index].queue !== type || (timers[index].anim.stop(gotoEnd),
                    dequeue = !1,
                    timers.splice(index, 1));
                !dequeue && gotoEnd || jQuery.dequeue(this, type)
            })
        },
        finish: function(type) {
            return !1 !== type && (type = type || "fx"),
            this.each(function() {
                var index, data = data_priv.get(this), queue = data[type + "queue"], hooks = data[type + "queueHooks"], timers = jQuery.timers, length = queue ? queue.length : 0;
                for (data.finish = !0,
                jQuery.queue(this, type, []),
                hooks && hooks.stop && hooks.stop.call(this, !0),
                index = timers.length; index--; )
                    timers[index].elem === this && timers[index].queue === type && (timers[index].anim.stop(!0),
                    timers.splice(index, 1));
                for (index = 0; index < length; index++)
                    queue[index] && queue[index].finish && queue[index].finish.call(this);
                delete data.finish
            })
        }
    }),
    jQuery.each(["toggle", "show", "hide"], function(i, name) {
        var cssFn = jQuery.fn[name];
        jQuery.fn[name] = function(speed, easing, callback) {
            return null == speed || "boolean" == typeof speed ? cssFn.apply(this, arguments) : this.animate(genFx(name, !0), speed, easing, callback)
        }
    }),
    jQuery.each({
        slideDown: genFx("show"),
        slideUp: genFx("hide"),
        slideToggle: genFx("toggle"),
        fadeIn: {
            opacity: "show"
        },
        fadeOut: {
            opacity: "hide"
        },
        fadeToggle: {
            opacity: "toggle"
        }
    }, function(name, props) {
        jQuery.fn[name] = function(speed, easing, callback) {
            return this.animate(props, speed, easing, callback)
        }
    }),
    jQuery.timers = [],
    jQuery.fx.tick = function() {
        var timer, i = 0, timers = jQuery.timers;
        for (fxNow = jQuery.now(); i < timers.length; i++)
            (timer = timers[i])() || timers[i] !== timer || timers.splice(i--, 1);
        timers.length || jQuery.fx.stop(),
        fxNow = undefined
    }
    ,
    jQuery.fx.timer = function(timer) {
        jQuery.timers.push(timer),
        timer() ? jQuery.fx.start() : jQuery.timers.pop()
    }
    ,
    jQuery.fx.interval = 13,
    jQuery.fx.start = function() {
        timerId || (timerId = setInterval(jQuery.fx.tick, jQuery.fx.interval))
    }
    ,
    jQuery.fx.stop = function() {
        clearInterval(timerId),
        timerId = null
    }
    ,
    jQuery.fx.speeds = {
        slow: 600,
        fast: 200,
        _default: 400
    },
    jQuery.fn.delay = function(time, type) {
        return time = jQuery.fx && jQuery.fx.speeds[time] || time,
        type = type || "fx",
        this.queue(type, function(next, hooks) {
            var timeout = setTimeout(next, time);
            hooks.stop = function() {
                clearTimeout(timeout)
            }
        })
    }
    ,
    function() {
        var input = document.createElement("input")
          , select = document.createElement("select")
          , opt = select.appendChild(document.createElement("option"));
        input.type = "checkbox",
        support.checkOn = "" !== input.value,
        support.optSelected = opt.selected,
        select.disabled = !0,
        support.optDisabled = !opt.disabled,
        (input = document.createElement("input")).value = "t",
        input.type = "radio",
        support.radioValue = "t" === input.value
    }();
    var nodeHook, boolHook, attrHandle = jQuery.expr.attrHandle;
    jQuery.fn.extend({
        attr: function(name, value) {
            return access(this, jQuery.attr, name, value, 1 < arguments.length)
        },
        removeAttr: function(name) {
            return this.each(function() {
                jQuery.removeAttr(this, name)
            })
        }
    }),
    jQuery.extend({
        attr: function(elem, name, value) {
            var hooks, ret, nType = elem.nodeType;
            if (elem && 3 !== nType && 8 !== nType && 2 !== nType)
                return typeof elem.getAttribute === strundefined ? jQuery.prop(elem, name, value) : (1 === nType && jQuery.isXMLDoc(elem) || (name = name.toLowerCase(),
                hooks = jQuery.attrHooks[name] || (jQuery.expr.match.bool.test(name) ? boolHook : nodeHook)),
                value === undefined ? hooks && "get"in hooks && null !== (ret = hooks.get(elem, name)) ? ret : null == (ret = jQuery.find.attr(elem, name)) ? undefined : ret : null !== value ? hooks && "set"in hooks && (ret = hooks.set(elem, value, name)) !== undefined ? ret : (elem.setAttribute(name, value + ""),
                value) : void jQuery.removeAttr(elem, name))
        },
        removeAttr: function(elem, value) {
            var name, propName, i = 0, attrNames = value && value.match(rnotwhite);
            if (attrNames && 1 === elem.nodeType)
                for (; name = attrNames[i++]; )
                    propName = jQuery.propFix[name] || name,
                    jQuery.expr.match.bool.test(name) && (elem[propName] = !1),
                    elem.removeAttribute(name)
        },
        attrHooks: {
            type: {
                set: function(elem, value) {
                    if (!support.radioValue && "radio" === value && jQuery.nodeName(elem, "input")) {
                        var val = elem.value;
                        return elem.setAttribute("type", value),
                        val && (elem.value = val),
                        value
                    }
                }
            }
        }
    }),
    boolHook = {
        set: function(elem, value, name) {
            return !1 === value ? jQuery.removeAttr(elem, name) : elem.setAttribute(name, name),
            name
        }
    },
    jQuery.each(jQuery.expr.match.bool.source.match(/\w+/g), function(i, name) {
        var getter = attrHandle[name] || jQuery.find.attr;
        attrHandle[name] = function(elem, name, isXML) {
            var ret, handle;
            return isXML || (handle = attrHandle[name],
            attrHandle[name] = ret,
            ret = null != getter(elem, name, isXML) ? name.toLowerCase() : null,
            attrHandle[name] = handle),
            ret
        }
    });
    var rfocusable = /^(?:input|select|textarea|button)$/i;
    jQuery.fn.extend({
        prop: function(name, value) {
            return access(this, jQuery.prop, name, value, 1 < arguments.length)
        },
        removeProp: function(name) {
            return this.each(function() {
                delete this[jQuery.propFix[name] || name]
            })
        }
    }),
    jQuery.extend({
        propFix: {
            "for": "htmlFor",
            "class": "className"
        },
        prop: function(elem, name, value) {
            var ret, hooks, nType = elem.nodeType;
            if (elem && 3 !== nType && 8 !== nType && 2 !== nType)
                return (1 !== nType || !jQuery.isXMLDoc(elem)) && (name = jQuery.propFix[name] || name,
                hooks = jQuery.propHooks[name]),
                value !== undefined ? hooks && "set"in hooks && (ret = hooks.set(elem, value, name)) !== undefined ? ret : elem[name] = value : hooks && "get"in hooks && null !== (ret = hooks.get(elem, name)) ? ret : elem[name]
        },
        propHooks: {
            tabIndex: {
                get: function(elem) {
                    return elem.hasAttribute("tabindex") || rfocusable.test(elem.nodeName) || elem.href ? elem.tabIndex : -1
                }
            }
        }
    }),
    support.optSelected || (jQuery.propHooks.selected = {
        get: function(elem) {
            var parent = elem.parentNode;
            return parent && parent.parentNode && parent.parentNode.selectedIndex,
            null
        }
    }),
    jQuery.each(["tabIndex", "readOnly", "maxLength", "cellSpacing", "cellPadding", "rowSpan", "colSpan", "useMap", "frameBorder", "contentEditable"], function() {
        jQuery.propFix[this.toLowerCase()] = this
    });
    var rclass = /[\t\r\n\f]/g;
    jQuery.fn.extend({
        addClass: function(value) {
            var classes, elem, cur, clazz, j, finalValue, proceed = "string" == typeof value && value, i = 0, len = this.length;
            if (jQuery.isFunction(value))
                return this.each(function(j) {
                    jQuery(this).addClass(value.call(this, j, this.className))
                });
            if (proceed)
                for (classes = (value || "").match(rnotwhite) || []; i < len; i++)
                    if (cur = 1 === (elem = this[i]).nodeType && (elem.className ? (" " + elem.className + " ").replace(rclass, " ") : " ")) {
                        for (j = 0; clazz = classes[j++]; )
                            cur.indexOf(" " + clazz + " ") < 0 && (cur += clazz + " ");
                        finalValue = jQuery.trim(cur),
                        elem.className !== finalValue && (elem.className = finalValue)
                    }
            return this
        },
        removeClass: function(value) {
            var classes, elem, cur, clazz, j, finalValue, proceed = 0 === arguments.length || "string" == typeof value && value, i = 0, len = this.length;
            if (jQuery.isFunction(value))
                return this.each(function(j) {
                    jQuery(this).removeClass(value.call(this, j, this.className))
                });
            if (proceed)
                for (classes = (value || "").match(rnotwhite) || []; i < len; i++)
                    if (cur = 1 === (elem = this[i]).nodeType && (elem.className ? (" " + elem.className + " ").replace(rclass, " ") : "")) {
                        for (j = 0; clazz = classes[j++]; )
                            for (; 0 <= cur.indexOf(" " + clazz + " "); )
                                cur = cur.replace(" " + clazz + " ", " ");
                        finalValue = value ? jQuery.trim(cur) : "",
                        elem.className !== finalValue && (elem.className = finalValue)
                    }
            return this
        },
        toggleClass: function(value, stateVal) {
            var type = typeof value;
            return "boolean" == typeof stateVal && "string" === type ? stateVal ? this.addClass(value) : this.removeClass(value) : jQuery.isFunction(value) ? this.each(function(i) {
                jQuery(this).toggleClass(value.call(this, i, this.className, stateVal), stateVal)
            }) : this.each(function() {
                if ("string" === type)
                    for (var className, i = 0, self = jQuery(this), classNames = value.match(rnotwhite) || []; className = classNames[i++]; )
                        self.hasClass(className) ? self.removeClass(className) : self.addClass(className);
                else
                    type !== strundefined && "boolean" !== type || (this.className && data_priv.set(this, "__className__", this.className),
                    this.className = this.className || !1 === value ? "" : data_priv.get(this, "__className__") || "")
            })
        },
        hasClass: function(selector) {
            for (var className = " " + selector + " ", i = 0, l = this.length; i < l; i++)
                if (1 === this[i].nodeType && 0 <= (" " + this[i].className + " ").replace(rclass, " ").indexOf(className))
                    return !0;
            return !1
        }
    });
    var rreturn = /\r/g;
    jQuery.fn.extend({
        val: function(value) {
            var hooks, ret, isFunction, elem = this[0];
            return arguments.length ? (isFunction = jQuery.isFunction(value),
            this.each(function(i) {
                var val;
                1 === this.nodeType && (null == (val = isFunction ? value.call(this, i, jQuery(this).val()) : value) ? val = "" : "number" == typeof val ? val += "" : jQuery.isArray(val) && (val = jQuery.map(val, function(value) {
                    return null == value ? "" : value + ""
                })),
                (hooks = jQuery.valHooks[this.type] || jQuery.valHooks[this.nodeName.toLowerCase()]) && "set"in hooks && hooks.set(this, val, "value") !== undefined || (this.value = val))
            })) : elem ? (hooks = jQuery.valHooks[elem.type] || jQuery.valHooks[elem.nodeName.toLowerCase()]) && "get"in hooks && (ret = hooks.get(elem, "value")) !== undefined ? ret : "string" == typeof (ret = elem.value) ? ret.replace(rreturn, "") : null == ret ? "" : ret : void 0
        }
    }),
    jQuery.extend({
        valHooks: {
            option: {
                get: function(elem) {
                    var val = jQuery.find.attr(elem, "value");
                    return null != val ? val : jQuery.trim(jQuery.text(elem))
                }
            },
            select: {
                get: function(elem) {
                    for (var value, option, options = elem.options, index = elem.selectedIndex, one = "select-one" === elem.type || index < 0, values = one ? null : [], max = one ? index + 1 : options.length, i = index < 0 ? max : one ? index : 0; i < max; i++)
                        if (((option = options[i]).selected || i === index) && (support.optDisabled ? !option.disabled : null === option.getAttribute("disabled")) && (!option.parentNode.disabled || !jQuery.nodeName(option.parentNode, "optgroup"))) {
                            if (value = jQuery(option).val(),
                            one)
                                return value;
                            values.push(value)
                        }
                    return values
                },
                set: function(elem, value) {
                    for (var optionSet, option, options = elem.options, values = jQuery.makeArray(value), i = options.length; i--; )
                        ((option = options[i]).selected = 0 <= jQuery.inArray(option.value, values)) && (optionSet = !0);
                    return optionSet || (elem.selectedIndex = -1),
                    values
                }
            }
        }
    }),
    jQuery.each(["radio", "checkbox"], function() {
        jQuery.valHooks[this] = {
            set: function(elem, value) {
                if (jQuery.isArray(value))
                    return elem.checked = 0 <= jQuery.inArray(jQuery(elem).val(), value)
            }
        },
        support.checkOn || (jQuery.valHooks[this].get = function(elem) {
            return null === elem.getAttribute("value") ? "on" : elem.value
        }
        )
    }),
    jQuery.each("blur focus focusin focusout load resize scroll unload click dblclick mousedown mouseup mousemove mouseover mouseout mouseenter mouseleave change select submit keydown keypress keyup error contextmenu".split(" "), function(i, name) {
        jQuery.fn[name] = function(data, fn) {
            return 0 < arguments.length ? this.on(name, null, data, fn) : this.trigger(name)
        }
    }),
    jQuery.fn.extend({
        hover: function(fnOver, fnOut) {
            return this.mouseenter(fnOver).mouseleave(fnOut || fnOver)
        },
        bind: function(types, data, fn) {
            return this.on(types, null, data, fn)
        },
        unbind: function(types, fn) {
            return this.off(types, null, fn)
        },
        delegate: function(selector, types, data, fn) {
            return this.on(types, selector, data, fn)
        },
        undelegate: function(selector, types, fn) {
            return 1 === arguments.length ? this.off(selector, "**") : this.off(types, selector || "**", fn)
        }
    });
    var nonce = jQuery.now()
      , rquery = /\?/;
    jQuery.parseJSON = function(data) {
        return JSON.parse(data + "")
    }
    ,
    jQuery.parseXML = function(data) {
        var xml;
        if (!data || "string" != typeof data)
            return null;
        try {
            xml = (new DOMParser).parseFromString(data, "text/xml")
        } catch (e) {
            xml = undefined
        }
        return xml && !xml.getElementsByTagName("parsererror").length || jQuery.error("Invalid XML: " + data),
        xml
    }
    ;
    var ajaxLocParts, ajaxLocation, rhash = /#.*$/, rts = /([?&])_=[^&]*/, rheaders = /^(.*?):[ \t]*([^\r\n]*)$/gm, rlocalProtocol = /^(?:about|app|app-storage|.+-extension|file|res|widget):$/, rnoContent = /^(?:GET|HEAD)$/, rprotocol = /^\/\//, rurl = /^([\w.+-]+:)(?:\/\/(?:[^\/?#]*@|)([^\/?#:]*)(?::(\d+)|)|)/, prefilters = {}, transports = {}, allTypes = "*/".concat("*");
    try {
        ajaxLocation = location.href
    } catch (e) {
        (ajaxLocation = document.createElement("a")).href = "",
        ajaxLocation = ajaxLocation.href
    }
    ajaxLocParts = rurl.exec(ajaxLocation.toLowerCase()) || [],
    jQuery.extend({
        active: 0,
        lastModified: {},
        etag: {},
        ajaxSettings: {
            url: ajaxLocation,
            type: "GET",
            isLocal: rlocalProtocol.test(ajaxLocParts[1]),
            global: !0,
            processData: !0,
            async: !0,
            contentType: "application/x-www-form-urlencoded; charset=UTF-8",
            accepts: {
                "*": allTypes,
                text: "text/plain",
                html: "text/html",
                xml: "application/xml, text/xml",
                json: "application/json, text/javascript"
            },
            contents: {
                xml: /xml/,
                html: /html/,
                json: /json/
            },
            responseFields: {
                xml: "responseXML",
                text: "responseText",
                json: "responseJSON"
            },
            converters: {
                "* text": String,
                "text html": !0,
                "text json": jQuery.parseJSON,
                "text xml": jQuery.parseXML
            },
            flatOptions: {
                url: !0,
                context: !0
            }
        },
        ajaxSetup: function(target, settings) {
            return settings ? ajaxExtend(ajaxExtend(target, jQuery.ajaxSettings), settings) : ajaxExtend(jQuery.ajaxSettings, target)
        },
        ajaxPrefilter: addToPrefiltersOrTransports(prefilters),
        ajaxTransport: addToPrefiltersOrTransports(transports),
        ajax: function(url, options) {
            function done(status, nativeStatusText, responses, headers) {
                var isSuccess, success, error, response, modified, statusText = nativeStatusText;
                2 !== state && (state = 2,
                timeoutTimer && clearTimeout(timeoutTimer),
                transport = undefined,
                responseHeadersString = headers || "",
                jqXHR.readyState = 0 < status ? 4 : 0,
                isSuccess = 200 <= status && status < 300 || 304 === status,
                responses && (response = ajaxHandleResponses(s, jqXHR, responses)),
                response = ajaxConvert(s, response, jqXHR, isSuccess),
                isSuccess ? (s.ifModified && ((modified = jqXHR.getResponseHeader("Last-Modified")) && (jQuery.lastModified[cacheURL] = modified),
                (modified = jqXHR.getResponseHeader("etag")) && (jQuery.etag[cacheURL] = modified)),
                204 === status || "HEAD" === s.type ? statusText = "nocontent" : 304 === status ? statusText = "notmodified" : (statusText = response.state,
                success = response.data,
                isSuccess = !(error = response.error))) : (error = statusText,
                !status && statusText || (statusText = "error",
                status < 0 && (status = 0))),
                jqXHR.status = status,
                jqXHR.statusText = (nativeStatusText || statusText) + "",
                isSuccess ? deferred.resolveWith(callbackContext, [success, statusText, jqXHR]) : deferred.rejectWith(callbackContext, [jqXHR, statusText, error]),
                jqXHR.statusCode(statusCode),
                statusCode = undefined,
                fireGlobals && globalEventContext.trigger(isSuccess ? "ajaxSuccess" : "ajaxError", [jqXHR, s, isSuccess ? success : error]),
                completeDeferred.fireWith(callbackContext, [jqXHR, statusText]),
                fireGlobals && (globalEventContext.trigger("ajaxComplete", [jqXHR, s]),
                --jQuery.active || jQuery.event.trigger("ajaxStop")))
            }
            "object" == typeof url && (options = url,
            url = undefined),
            options = options || {};
            var transport, cacheURL, responseHeadersString, responseHeaders, timeoutTimer, parts, fireGlobals, i, s = jQuery.ajaxSetup({}, options), callbackContext = s.context || s, globalEventContext = s.context && (callbackContext.nodeType || callbackContext.jquery) ? jQuery(callbackContext) : jQuery.event, deferred = jQuery.Deferred(), completeDeferred = jQuery.Callbacks("once memory"), statusCode = s.statusCode || {}, requestHeaders = {}, requestHeadersNames = {}, state = 0, strAbort = "canceled", jqXHR = {
                readyState: 0,
                getResponseHeader: function(key) {
                    var match;
                    if (2 === state) {
                        if (!responseHeaders)
                            for (responseHeaders = {}; match = rheaders.exec(responseHeadersString); )
                                responseHeaders[match[1].toLowerCase()] = match[2];
                        match = responseHeaders[key.toLowerCase()]
                    }
                    return null == match ? null : match
                },
                getAllResponseHeaders: function() {
                    return 2 === state ? responseHeadersString : null
                },
                setRequestHeader: function(name, value) {
                    var lname = name.toLowerCase();
                    return state || (name = requestHeadersNames[lname] = requestHeadersNames[lname] || name,
                    requestHeaders[name] = value),
                    this
                },
                overrideMimeType: function(type) {
                    return state || (s.mimeType = type),
                    this
                },
                statusCode: function(map) {
                    var code;
                    if (map)
                        if (state < 2)
                            for (code in map)
                                statusCode[code] = [statusCode[code], map[code]];
                        else
                            jqXHR.always(map[jqXHR.status]);
                    return this
                },
                abort: function(statusText) {
                    var finalText = statusText || strAbort;
                    return transport && transport.abort(finalText),
                    done(0, finalText),
                    this
                }
            };
            if (deferred.promise(jqXHR).complete = completeDeferred.add,
            jqXHR.success = jqXHR.done,
            jqXHR.error = jqXHR.fail,
            s.url = ((url || s.url || ajaxLocation) + "").replace(rhash, "").replace(rprotocol, ajaxLocParts[1] + "//"),
            s.type = options.method || options.type || s.method || s.type,
            s.dataTypes = jQuery.trim(s.dataType || "*").toLowerCase().match(rnotwhite) || [""],
            null == s.crossDomain && (parts = rurl.exec(s.url.toLowerCase()),
            s.crossDomain = !(!parts || parts[1] === ajaxLocParts[1] && parts[2] === ajaxLocParts[2] && (parts[3] || ("http:" === parts[1] ? "80" : "443")) === (ajaxLocParts[3] || ("http:" === ajaxLocParts[1] ? "80" : "443")))),
            s.data && s.processData && "string" != typeof s.data && (s.data = jQuery.param(s.data, s.traditional)),
            inspectPrefiltersOrTransports(prefilters, s, options, jqXHR),
            2 === state)
                return jqXHR;
            for (i in (fireGlobals = s.global) && 0 == jQuery.active++ && jQuery.event.trigger("ajaxStart"),
            s.type = s.type.toUpperCase(),
            s.hasContent = !rnoContent.test(s.type),
            cacheURL = s.url,
            s.hasContent || (s.data && (cacheURL = s.url += (rquery.test(cacheURL) ? "&" : "?") + s.data,
            delete s.data),
            !1 === s.cache && (s.url = rts.test(cacheURL) ? cacheURL.replace(rts, "$1_=" + nonce++) : cacheURL + (rquery.test(cacheURL) ? "&" : "?") + "_=" + nonce++)),
            s.ifModified && (jQuery.lastModified[cacheURL] && jqXHR.setRequestHeader("If-Modified-Since", jQuery.lastModified[cacheURL]),
            jQuery.etag[cacheURL] && jqXHR.setRequestHeader("If-None-Match", jQuery.etag[cacheURL])),
            (s.data && s.hasContent && !1 !== s.contentType || options.contentType) && jqXHR.setRequestHeader("Content-Type", s.contentType),
            jqXHR.setRequestHeader("Accept", s.dataTypes[0] && s.accepts[s.dataTypes[0]] ? s.accepts[s.dataTypes[0]] + ("*" !== s.dataTypes[0] ? ", " + allTypes + "; q=0.01" : "") : s.accepts["*"]),
            s.headers)
                jqXHR.setRequestHeader(i, s.headers[i]);
            if (s.beforeSend && (!1 === s.beforeSend.call(callbackContext, jqXHR, s) || 2 === state))
                return jqXHR.abort();
            for (i in strAbort = "abort",
            {
                success: 1,
                error: 1,
                complete: 1
            })
                jqXHR[i](s[i]);
            if (transport = inspectPrefiltersOrTransports(transports, s, options, jqXHR)) {
                jqXHR.readyState = 1,
                fireGlobals && globalEventContext.trigger("ajaxSend", [jqXHR, s]),
                s.async && 0 < s.timeout && (timeoutTimer = setTimeout(function() {
                    jqXHR.abort("timeout")
                }, s.timeout));
                try {
                    state = 1,
                    transport.send(requestHeaders, done)
                } catch (e) {
                    if (!(state < 2))
                        throw e;
                    done(-1, e)
                }
            } else
                done(-1, "No Transport");
            return jqXHR
        },
        getJSON: function(url, data, callback) {
            return jQuery.get(url, data, callback, "json")
        },
        getScript: function(url, callback) {
            return jQuery.get(url, undefined, callback, "script")
        }
    }),
    jQuery.each(["get", "post"], function(i, method) {
        jQuery[method] = function(url, data, callback, type) {
            return jQuery.isFunction(data) && (type = type || callback,
            callback = data,
            data = undefined),
            jQuery.ajax({
                url: url,
                type: method,
                dataType: type,
                data: data,
                success: callback
            })
        }
    }),
    jQuery.each(["ajaxStart", "ajaxStop", "ajaxComplete", "ajaxError", "ajaxSuccess", "ajaxSend"], function(i, type) {
        jQuery.fn[type] = function(fn) {
            return this.on(type, fn)
        }
    }),
    jQuery._evalUrl = function(url) {
        return jQuery.ajax({
            url: url,
            type: "GET",
            dataType: "script",
            async: !1,
            global: !1,
            "throws": !0
        })
    }
    ,
    jQuery.fn.extend({
        wrapAll: function(html) {
            var wrap;
            return jQuery.isFunction(html) ? this.each(function(i) {
                jQuery(this).wrapAll(html.call(this, i))
            }) : (this[0] && (wrap = jQuery(html, this[0].ownerDocument).eq(0).clone(!0),
            this[0].parentNode && wrap.insertBefore(this[0]),
            wrap.map(function() {
                for (var elem = this; elem.firstElementChild; )
                    elem = elem.firstElementChild;
                return elem
            }).append(this)),
            this)
        },
        wrapInner: function(html) {
            return jQuery.isFunction(html) ? this.each(function(i) {
                jQuery(this).wrapInner(html.call(this, i))
            }) : this.each(function() {
                var self = jQuery(this)
                  , contents = self.contents();
                contents.length ? contents.wrapAll(html) : self.append(html)
            })
        },
        wrap: function(html) {
            var isFunction = jQuery.isFunction(html);
            return this.each(function(i) {
                jQuery(this).wrapAll(isFunction ? html.call(this, i) : html)
            })
        },
        unwrap: function() {
            return this.parent().each(function() {
                jQuery.nodeName(this, "body") || jQuery(this).replaceWith(this.childNodes)
            }).end()
        }
    }),
    jQuery.expr.filters.hidden = function(elem) {
        return elem.offsetWidth <= 0 && elem.offsetHeight <= 0
    }
    ,
    jQuery.expr.filters.visible = function(elem) {
        return !jQuery.expr.filters.hidden(elem)
    }
    ;
    var r20 = /%20/g
      , rbracket = /\[\]$/
      , rCRLF = /\r?\n/g
      , rsubmitterTypes = /^(?:submit|button|image|reset|file)$/i
      , rsubmittable = /^(?:input|select|textarea|keygen)/i;
    jQuery.param = function(a, traditional) {
        var prefix, s = [], add = function(key, value) {
            value = jQuery.isFunction(value) ? value() : null == value ? "" : value,
            s[s.length] = encodeURIComponent(key) + "=" + encodeURIComponent(value)
        };
        if (traditional === undefined && (traditional = jQuery.ajaxSettings && jQuery.ajaxSettings.traditional),
        jQuery.isArray(a) || a.jquery && !jQuery.isPlainObject(a))
            jQuery.each(a, function() {
                add(this.name, this.value)
            });
        else
            for (prefix in a)
                buildParams(prefix, a[prefix], traditional, add);
        return s.join("&").replace(r20, "+")
    }
    ,
    jQuery.fn.extend({
        serialize: function() {
            return jQuery.param(this.serializeArray())
        },
        serializeArray: function() {
            return this.map(function() {
                var elements = jQuery.prop(this, "elements");
                return elements ? jQuery.makeArray(elements) : this
            }).filter(function() {
                var type = this.type;
                return this.name && !jQuery(this).is(":disabled") && rsubmittable.test(this.nodeName) && !rsubmitterTypes.test(type) && (this.checked || !rcheckableType.test(type))
            }).map(function(i, elem) {
                var val = jQuery(this).val();
                return null == val ? null : jQuery.isArray(val) ? jQuery.map(val, function(val) {
                    return {
                        name: elem.name,
                        value: val.replace(rCRLF, "\r\n")
                    }
                }) : {
                    name: elem.name,
                    value: val.replace(rCRLF, "\r\n")
                }
            }).get()
        }
    }),
    jQuery.ajaxSettings.xhr = function() {
        try {
            return new XMLHttpRequest
        } catch (e) {}
    }
    ;
    var xhrId = 0
      , xhrCallbacks = {}
      , xhrSuccessStatus = {
        0: 200,
        1223: 204
    }
      , xhrSupported = jQuery.ajaxSettings.xhr();
    window.ActiveXObject && jQuery(window).on("unload", function() {
        for (var key in xhrCallbacks)
            xhrCallbacks[key]()
    }),
    support.cors = !!xhrSupported && "withCredentials"in xhrSupported,
    support.ajax = xhrSupported = !!xhrSupported,
    jQuery.ajaxTransport(function(options) {
        var callback;
        if (support.cors || xhrSupported && !options.crossDomain)
            return {
                send: function(headers, complete) {
                    var i, xhr = options.xhr(), id = ++xhrId;
                    if (xhr.open(options.type, options.url, options.async, options.username, options.password),
                    options.xhrFields)
                        for (i in options.xhrFields)
                            xhr[i] = options.xhrFields[i];
                    for (i in options.mimeType && xhr.overrideMimeType && xhr.overrideMimeType(options.mimeType),
                    options.crossDomain || headers["X-Requested-With"] || (headers["X-Requested-With"] = "XMLHttpRequest"),
                    headers)
                        xhr.setRequestHeader(i, headers[i]);
                    callback = function(type) {
                        return function() {
                            callback && (delete xhrCallbacks[id],
                            callback = xhr.onload = xhr.onerror = null,
                            "abort" === type ? xhr.abort() : "error" === type ? complete(xhr.status, xhr.statusText) : complete(xhrSuccessStatus[xhr.status] || xhr.status, xhr.statusText, "string" == typeof xhr.responseText ? {
                                text: xhr.responseText
                            } : undefined, xhr.getAllResponseHeaders()))
                        }
                    }
                    ,
                    xhr.onload = callback(),
                    xhr.onerror = callback("error"),
                    callback = xhrCallbacks[id] = callback("abort");
                    try {
                        xhr.send(options.hasContent && options.data || null)
                    } catch (e) {
                        if (callback)
                            throw e
                    }
                },
                abort: function() {
                    callback && callback()
                }
            }
    }),
    jQuery.ajaxSetup({
        accepts: {
            script: "text/javascript, application/javascript, application/ecmascript, application/x-ecmascript"
        },
        contents: {
            script: /(?:java|ecma)script/
        },
        converters: {
            "text script": function(text) {
                return jQuery.globalEval(text),
                text
            }
        }
    }),
    jQuery.ajaxPrefilter("script", function(s) {
        s.cache === undefined && (s.cache = !1),
        s.crossDomain && (s.type = "GET")
    }),
    jQuery.ajaxTransport("script", function(s) {
        var script, callback;
        if (s.crossDomain)
            return {
                send: function(_, complete) {
                    script = jQuery("<script>").prop({
                        async: !0,
                        charset: s.scriptCharset,
                        src: s.url
                    }).on("load error", callback = function(evt) {
                        script.remove(),
                        callback = null,
                        evt && complete("error" === evt.type ? 404 : 200, evt.type)
                    }
                    ),
                    document.head.appendChild(script[0])
                },
                abort: function() {
                    callback && callback()
                }
            }
    });
    var oldCallbacks = []
      , rjsonp = /(=)\?(?=&|$)|\?\?/;
    jQuery.ajaxSetup({
        jsonp: "callback",
        jsonpCallback: function() {
            var callback = oldCallbacks.pop() || jQuery.expando + "_" + nonce++;
            return this[callback] = !0,
            callback
        }
    }),
    jQuery.ajaxPrefilter("json jsonp", function(s, originalSettings, jqXHR) {
        var callbackName, overwritten, responseContainer, jsonProp = !1 !== s.jsonp && (rjsonp.test(s.url) ? "url" : "string" == typeof s.data && !(s.contentType || "").indexOf("application/x-www-form-urlencoded") && rjsonp.test(s.data) && "data");
        if (jsonProp || "jsonp" === s.dataTypes[0])
            return callbackName = s.jsonpCallback = jQuery.isFunction(s.jsonpCallback) ? s.jsonpCallback() : s.jsonpCallback,
            jsonProp ? s[jsonProp] = s[jsonProp].replace(rjsonp, "$1" + callbackName) : !1 !== s.jsonp && (s.url += (rquery.test(s.url) ? "&" : "?") + s.jsonp + "=" + callbackName),
            s.converters["script json"] = function() {
                return responseContainer || jQuery.error(callbackName + " was not called"),
                responseContainer[0]
            }
            ,
            s.dataTypes[0] = "json",
            overwritten = window[callbackName],
            window[callbackName] = function() {
                responseContainer = arguments
            }
            ,
            jqXHR.always(function() {
                window[callbackName] = overwritten,
                s[callbackName] && (s.jsonpCallback = originalSettings.jsonpCallback,
                oldCallbacks.push(callbackName)),
                responseContainer && jQuery.isFunction(overwritten) && overwritten(responseContainer[0]),
                responseContainer = overwritten = undefined
            }),
            "script"
    }),
    jQuery.parseHTML = function(data, context, keepScripts) {
        if (!data || "string" != typeof data)
            return null;
        "boolean" == typeof context && (keepScripts = context,
        context = !1),
        context = context || document;
        var parsed = rsingleTag.exec(data)
          , scripts = !keepScripts && [];
        return parsed ? [context.createElement(parsed[1])] : (parsed = jQuery.buildFragment([data], context, scripts),
        scripts && scripts.length && jQuery(scripts).remove(),
        jQuery.merge([], parsed.childNodes))
    }
    ;
    var _load = jQuery.fn.load;
    jQuery.fn.load = function(url, params, callback) {
        if ("string" != typeof url && _load)
            return _load.apply(this, arguments);
        var selector, type, response, self = this, off = url.indexOf(" ");
        return 0 <= off && (selector = jQuery.trim(url.slice(off)),
        url = url.slice(0, off)),
        jQuery.isFunction(params) ? (callback = params,
        params = undefined) : params && "object" == typeof params && (type = "POST"),
        0 < self.length && jQuery.ajax({
            url: url,
            type: type,
            dataType: "html",
            data: params
        }).done(function(responseText) {
            response = arguments,
            self.html(selector ? jQuery("<div>").append(jQuery.parseHTML(responseText)).find(selector) : responseText)
        }).complete(callback && function(jqXHR, status) {
            self.each(callback, response || [jqXHR.responseText, status, jqXHR])
        }
        ),
        this
    }
    ,
    jQuery.expr.filters.animated = function(elem) {
        return jQuery.grep(jQuery.timers, function(fn) {
            return elem === fn.elem
        }).length
    }
    ;
    var docElem = window.document.documentElement;
    jQuery.offset = {
        setOffset: function(elem, options, i) {
            var curPosition, curLeft, curCSSTop, curTop, curOffset, curCSSLeft, position = jQuery.css(elem, "position"), curElem = jQuery(elem), props = {};
            "static" === position && (elem.style.position = "relative"),
            curOffset = curElem.offset(),
            curCSSTop = jQuery.css(elem, "top"),
            curCSSLeft = jQuery.css(elem, "left"),
            ("absolute" === position || "fixed" === position) && -1 < (curCSSTop + curCSSLeft).indexOf("auto") ? (curTop = (curPosition = curElem.position()).top,
            curLeft = curPosition.left) : (curTop = parseFloat(curCSSTop) || 0,
            curLeft = parseFloat(curCSSLeft) || 0),
            jQuery.isFunction(options) && (options = options.call(elem, i, curOffset)),
            null != options.top && (props.top = options.top - curOffset.top + curTop),
            null != options.left && (props.left = options.left - curOffset.left + curLeft),
            "using"in options ? options.using.call(elem, props) : curElem.css(props)
        }
    },
    jQuery.fn.extend({
        offset: function(options) {
            if (arguments.length)
                return options === undefined ? this : this.each(function(i) {
                    jQuery.offset.setOffset(this, options, i)
                });
            var docElem, win, elem = this[0], box = {
                top: 0,
                left: 0
            }, doc = elem && elem.ownerDocument;
            return doc ? (docElem = doc.documentElement,
            jQuery.contains(docElem, elem) ? (typeof elem.getBoundingClientRect !== strundefined && (box = elem.getBoundingClientRect()),
            win = getWindow(doc),
            {
                top: box.top + win.pageYOffset - docElem.clientTop,
                left: box.left + win.pageXOffset - docElem.clientLeft
            }) : box) : void 0
        },
        position: function() {
            if (this[0]) {
                var offsetParent, offset, elem = this[0], parentOffset = {
                    top: 0,
                    left: 0
                };
                return "fixed" === jQuery.css(elem, "position") ? offset = elem.getBoundingClientRect() : (offsetParent = this.offsetParent(),
                offset = this.offset(),
                jQuery.nodeName(offsetParent[0], "html") || (parentOffset = offsetParent.offset()),
                parentOffset.top += jQuery.css(offsetParent[0], "borderTopWidth", !0),
                parentOffset.left += jQuery.css(offsetParent[0], "borderLeftWidth", !0)),
                {
                    top: offset.top - parentOffset.top - jQuery.css(elem, "marginTop", !0),
                    left: offset.left - parentOffset.left - jQuery.css(elem, "marginLeft", !0)
                }
            }
        },
        offsetParent: function() {
            return this.map(function() {
                for (var offsetParent = this.offsetParent || docElem; offsetParent && !jQuery.nodeName(offsetParent, "html") && "static" === jQuery.css(offsetParent, "position"); )
                    offsetParent = offsetParent.offsetParent;
                return offsetParent || docElem
            })
        }
    }),
    jQuery.each({
        scrollLeft: "pageXOffset",
        scrollTop: "pageYOffset"
    }, function(method, prop) {
        var top = "pageYOffset" === prop;
        jQuery.fn[method] = function(val) {
            return access(this, function(elem, method, val) {
                var win = getWindow(elem);
                if (val === undefined)
                    return win ? win[prop] : elem[method];
                win ? win.scrollTo(top ? window.pageXOffset : val, top ? val : window.pageYOffset) : elem[method] = val
            }, method, val, arguments.length, null)
        }
    }),
    jQuery.each(["top", "left"], function(i, prop) {
        jQuery.cssHooks[prop] = addGetHookIf(support.pixelPosition, function(elem, computed) {
            if (computed)
                return computed = curCSS(elem, prop),
                rnumnonpx.test(computed) ? jQuery(elem).position()[prop] + "px" : computed
        })
    }),
    jQuery.each({
        Height: "height",
        Width: "width"
    }, function(name, type) {
        jQuery.each({
            padding: "inner" + name,
            content: type,
            "": "outer" + name
        }, function(defaultExtra, funcName) {
            jQuery.fn[funcName] = function(margin, value) {
                var chainable = arguments.length && (defaultExtra || "boolean" != typeof margin)
                  , extra = defaultExtra || (!0 === margin || !0 === value ? "margin" : "border");
                return access(this, function(elem, type, value) {
                    var doc;
                    return jQuery.isWindow(elem) ? elem.document.documentElement["client" + name] : 9 === elem.nodeType ? (doc = elem.documentElement,
                    Math.max(elem.body["scroll" + name], doc["scroll" + name], elem.body["offset" + name], doc["offset" + name], doc["client" + name])) : value === undefined ? jQuery.css(elem, type, extra) : jQuery.style(elem, type, value, extra)
                }, type, chainable ? margin : undefined, chainable, null)
            }
        })
    }),
    jQuery.fn.size = function() {
        return this.length
    }
    ,
    jQuery.fn.andSelf = jQuery.fn.addBack,
    "function" == typeof define && define.amd && define("jquery", [], function() {
        return jQuery
    });
    var _jQuery = window.jQuery
      , _$ = window.$;
    return jQuery.noConflict = function(deep) {
        return window.$ === jQuery && (window.$ = _$),
        deep && window.jQuery === jQuery && (window.jQuery = _jQuery),
        jQuery
    }
    ,
    typeof noGlobal === strundefined && (window.jQuery = window.$ = jQuery),
    jQuery
}),
function($, undefined) {
    "use strict";
    var rails;
    $.rails !== undefined && $.error("jquery-ujs has already been loaded!");
    var $document = $(document);
    $.rails = rails = {
        linkClickSelector: "a[data-confirm], a[data-method], a[data-remote]:not([disabled]), a[data-disable-with], a[data-disable]",
        buttonClickSelector: "button[data-remote]:not([form]):not(form button), button[data-confirm]:not([form]):not(form button)",
        inputChangeSelector: "select[data-remote], input[data-remote], textarea[data-remote]",
        formSubmitSelector: "form",
        formInputClickSelector: "form input[type=submit], form input[type=image], form button[type=submit], form button:not([type]), input[type=submit][form], input[type=image][form], button[type=submit][form], button[form]:not([type])",
        disableSelector: "input[data-disable-with]:enabled, button[data-disable-with]:enabled, textarea[data-disable-with]:enabled, input[data-disable]:enabled, button[data-disable]:enabled, textarea[data-disable]:enabled",
        enableSelector: "input[data-disable-with]:disabled, button[data-disable-with]:disabled, textarea[data-disable-with]:disabled, input[data-disable]:disabled, button[data-disable]:disabled, textarea[data-disable]:disabled",
        requiredInputSelector: "input[name][required]:not([disabled]), textarea[name][required]:not([disabled])",
        fileInputSelector: "input[name][type=file]:not([disabled])",
        linkDisableSelector: "a[data-disable-with], a[data-disable]",
        buttonDisableSelector: "button[data-remote][data-disable-with], button[data-remote][data-disable]",
        csrfToken: function() {
            return $("meta[name=csrf-token]").attr("content")
        },
        csrfParam: function() {
            return $("meta[name=csrf-param]").attr("content")
        },
        CSRFProtection: function(xhr) {
            var token = rails.csrfToken();
            token && xhr.setRequestHeader("X-CSRF-Token", token)
        },
        refreshCSRFTokens: function() {
            $('form input[name="' + rails.csrfParam() + '"]').val(rails.csrfToken())
        },
        fire: function(obj, name, data) {
            var event = $.Event(name);
            return obj.trigger(event, data),
            !1 !== event.result
        },
        confirm: function(message) {
            return confirm(message)
        },
        ajax: function(options) {
            return $.ajax(options)
        },
        href: function(element) {
            return element[0].href
        },
        isRemote: function(element) {
            return element.data("remote") !== undefined && !1 !== element.data("remote")
        },
        handleRemote: function(element) {
            var method, url, data, withCredentials, dataType, options;
            if (rails.fire(element, "ajax:before")) {
                if (withCredentials = element.data("with-credentials") || null,
                dataType = element.data("type") || $.ajaxSettings && $.ajaxSettings.dataType,
                element.is("form")) {
                    method = element.data("ujs:submit-button-formmethod") || element.attr("method"),
                    url = element.data("ujs:submit-button-formaction") || element.attr("action"),
                    data = $(element[0]).serializeArray();
                    var button = element.data("ujs:submit-button");
                    button && (data.push(button),
                    element.data("ujs:submit-button", null)),
                    element.data("ujs:submit-button-formmethod", null),
                    element.data("ujs:submit-button-formaction", null)
                } else
                    element.is(rails.inputChangeSelector) ? (method = element.data("method"),
                    url = element.data("url"),
                    data = element.serialize(),
                    element.data("params") && (data = data + "&" + element.data("params"))) : element.is(rails.buttonClickSelector) ? (method = element.data("method") || "get",
                    url = element.data("url"),
                    data = element.serialize(),
                    element.data("params") && (data = data + "&" + element.data("params"))) : (method = element.data("method"),
                    url = rails.href(element),
                    data = element.data("params") || null);
                return options = {
                    type: method || "GET",
                    data: data,
                    dataType: dataType,
                    beforeSend: function(xhr, settings) {
                        if (settings.dataType === undefined && xhr.setRequestHeader("accept", "*/*;q=0.5, " + settings.accepts.script),
                        !rails.fire(element, "ajax:beforeSend", [xhr, settings]))
                            return !1;
                        element.trigger("ajax:send", xhr)
                    },
                    success: function(data, status, xhr) {
                        element.trigger("ajax:success", [data, status, xhr])
                    },
                    complete: function(xhr, status) {
                        element.trigger("ajax:complete", [xhr, status])
                    },
                    error: function(xhr, status, error) {
                        element.trigger("ajax:error", [xhr, status, error])
                    },
                    crossDomain: rails.isCrossDomain(url)
                },
                withCredentials && (options.xhrFields = {
                    withCredentials: withCredentials
                }),
                url && (options.url = url),
                rails.ajax(options)
            }
            return !1
        },
        isCrossDomain: function(url) {
            var originAnchor = document.createElement("a");
            originAnchor.href = location.href;
            var urlAnchor = document.createElement("a");
            try {
                return urlAnchor.href = url,
                urlAnchor.href = urlAnchor.href,
                !((!urlAnchor.protocol || ":" === urlAnchor.protocol) && !urlAnchor.host || originAnchor.protocol + "//" + originAnchor.host == urlAnchor.protocol + "//" + urlAnchor.host)
            } catch (e) {
                return !0
            }
        },
        handleMethod: function(link) {
            var href = rails.href(link)
              , method = link.data("method")
              , target = link.attr("target")
              , csrfToken = rails.csrfToken()
              , csrfParam = rails.csrfParam()
              , form = $('<form method="post" action="' + href + '"></form>')
              , metadataInput = '<input name="_method" value="' + method + '" type="hidden" />';
            csrfParam === undefined || csrfToken === undefined || rails.isCrossDomain(href) || (metadataInput += '<input name="' + csrfParam + '" value="' + csrfToken + '" type="hidden" />'),
            target && form.attr("target", target),
            form.hide().append(metadataInput).appendTo("body"),
            form.submit()
        },
        formElements: function(form, selector) {
            return form.is("form") ? $(form[0].elements).filter(selector) : form.find(selector)
        },
        disableFormElements: function(form) {
            rails.formElements(form, rails.disableSelector).each(function() {
                rails.disableFormElement($(this))
            })
        },
        disableFormElement: function(element) {
            var method, replacement;
            method = element.is("button") ? "html" : "val",
            (replacement = element.data("disable-with")) !== undefined && (element.data("ujs:enable-with", element[method]()),
            element[method](replacement)),
            element.prop("disabled", !0),
            element.data("ujs:disabled", !0)
        },
        enableFormElements: function(form) {
            rails.formElements(form, rails.enableSelector).each(function() {
                rails.enableFormElement($(this))
            })
        },
        enableFormElement: function(element) {
            var method = element.is("button") ? "html" : "val";
            element.data("ujs:enable-with") !== undefined && (element[method](element.data("ujs:enable-with")),
            element.removeData("ujs:enable-with")),
            element.prop("disabled", !1),
            element.removeData("ujs:disabled")
        },
        allowAction: function(element) {
            var callback, message = element.data("confirm"), answer = !1;
            if (!message)
                return !0;
            if (rails.fire(element, "confirm")) {
                try {
                    answer = rails.confirm(message)
                } catch (e) {
                    (console.error || console.log).call(console, e.stack || e)
                }
                callback = rails.fire(element, "confirm:complete", [answer])
            }
            return answer && callback
        },
        blankInputs: function(form, specifiedSelector, nonBlank) {
            var input, radiosForNameWithNoneSelected, radioName, foundInputs = $(), selector = specifiedSelector || "input,textarea", requiredInputs = form.find(selector), checkedRadioButtonNames = {};
            return requiredInputs.each(function() {
                (input = $(this)).is("input[type=radio]") ? (radioName = input.attr("name"),
                checkedRadioButtonNames[radioName] || (0 === form.find('input[type=radio]:checked[name="' + radioName + '"]').length && (radiosForNameWithNoneSelected = form.find('input[type=radio][name="' + radioName + '"]'),
                foundInputs = foundInputs.add(radiosForNameWithNoneSelected)),
                checkedRadioButtonNames[radioName] = radioName)) : (input.is("input[type=checkbox],input[type=radio]") ? input.is(":checked") : !!input.val()) === nonBlank && (foundInputs = foundInputs.add(input))
            }),
            !!foundInputs.length && foundInputs
        },
        nonBlankInputs: function(form, specifiedSelector) {
            return rails.blankInputs(form, specifiedSelector, !0)
        },
        stopEverything: function(e) {
            return $(e.target).trigger("ujs:everythingStopped"),
            e.stopImmediatePropagation(),
            !1
        },
        disableElement: function(element) {
            var replacement = element.data("disable-with");
            replacement !== undefined && (element.data("ujs:enable-with", element.html()),
            element.html(replacement)),
            element.bind("click.railsDisable", function(e) {
                return rails.stopEverything(e)
            }),
            element.data("ujs:disabled", !0)
        },
        enableElement: function(element) {
            element.data("ujs:enable-with") !== undefined && (element.html(element.data("ujs:enable-with")),
            element.removeData("ujs:enable-with")),
            element.unbind("click.railsDisable"),
            element.removeData("ujs:disabled")
        }
    },
    rails.fire($document, "rails:attachBindings") && ($.ajaxPrefilter(function(options, originalOptions, xhr) {
        options.crossDomain || rails.CSRFProtection(xhr)
    }),
    $(window).on("pageshow.rails", function() {
        $($.rails.enableSelector).each(function() {
            var element = $(this);
            element.data("ujs:disabled") && $.rails.enableFormElement(element)
        }),
        $($.rails.linkDisableSelector).each(function() {
            var element = $(this);
            element.data("ujs:disabled") && $.rails.enableElement(element)
        })
    }),
    $document.on("ajax:complete", rails.linkDisableSelector, function() {
        rails.enableElement($(this))
    }),
    $document.on("ajax:complete", rails.buttonDisableSelector, function() {
        rails.enableFormElement($(this))
    }),
    $document.on("click.rails", rails.linkClickSelector, function(e) {
        var link = $(this)
          , method = link.data("method")
          , data = link.data("params")
          , metaClick = e.metaKey || e.ctrlKey;
        if (!rails.allowAction(link))
            return rails.stopEverything(e);
        if (!metaClick && link.is(rails.linkDisableSelector) && rails.disableElement(link),
        rails.isRemote(link)) {
            if (metaClick && (!method || "GET" === method) && !data)
                return !0;
            var handleRemote = rails.handleRemote(link);
            return !1 === handleRemote ? rails.enableElement(link) : handleRemote.fail(function() {
                rails.enableElement(link)
            }),
            !1
        }
        return method ? (rails.handleMethod(link),
        !1) : void 0
    }),
    $document.on("click.rails", rails.buttonClickSelector, function(e) {
        var button = $(this);
        if (!rails.allowAction(button) || !rails.isRemote(button))
            return rails.stopEverything(e);
        button.is(rails.buttonDisableSelector) && rails.disableFormElement(button);
        var handleRemote = rails.handleRemote(button);
        return !1 === handleRemote ? rails.enableFormElement(button) : handleRemote.fail(function() {
            rails.enableFormElement(button)
        }),
        !1
    }),
    $document.on("change.rails", rails.inputChangeSelector, function(e) {
        var link = $(this);
        return rails.allowAction(link) && rails.isRemote(link) ? (rails.handleRemote(link),
        !1) : rails.stopEverything(e)
    }),
    $document.on("submit.rails", rails.formSubmitSelector, function(e) {
        var blankRequiredInputs, nonBlankFileInputs, form = $(this), remote = rails.isRemote(form);
        if (!rails.allowAction(form))
            return rails.stopEverything(e);
        if (form.attr("novalidate") === undefined)
            if (form.data("ujs:formnovalidate-button") === undefined) {
                if ((blankRequiredInputs = rails.blankInputs(form, rails.requiredInputSelector, !1)) && rails.fire(form, "ajax:aborted:required", [blankRequiredInputs]))
                    return rails.stopEverything(e)
            } else
                form.data("ujs:formnovalidate-button", undefined);
        if (remote) {
            if (nonBlankFileInputs = rails.nonBlankInputs(form, rails.fileInputSelector)) {
                setTimeout(function() {
                    rails.disableFormElements(form)
                }, 13);
                var aborted = rails.fire(form, "ajax:aborted:file", [nonBlankFileInputs]);
                return aborted || setTimeout(function() {
                    rails.enableFormElements(form)
                }, 13),
                aborted
            }
            return rails.handleRemote(form),
            !1
        }
        setTimeout(function() {
            rails.disableFormElements(form)
        }, 13)
    }),
    $document.on("click.rails", rails.formInputClickSelector, function(event) {
        var button = $(this);
        if (!rails.allowAction(button))
            return rails.stopEverything(event);
        var name = button.attr("name")
          , data = name ? {
            name: name,
            value: button.val()
        } : null
          , form = button.closest("form");
        0 === form.length && (form = $("#" + button.attr("form"))),
        form.data("ujs:submit-button", data),
        form.data("ujs:formnovalidate-button", button.attr("formnovalidate")),
        form.data("ujs:submit-button-formaction", button.attr("formaction")),
        form.data("ujs:submit-button-formmethod", button.attr("formmethod"))
    }),
    $document.on("ajax:send.rails", rails.formSubmitSelector, function(event) {
        this === event.target && rails.disableFormElements($(this))
    }),
    $document.on("ajax:complete.rails", rails.formSubmitSelector, function(event) {
        this === event.target && rails.enableFormElements($(this))
    }),
    $(function() {
        rails.refreshCSRFTokens()
    }))
}(jQuery),
"undefined" == typeof jQuery)
    throw new Error("Bootstrap's JavaScript requires jQuery");
/* ========================================================================
 * Bootstrap: transition.js v3.2.0
 * http://getbootstrap.com/javascript/#transitions
 * ========================================================================
 * Copyright 2011-2014 Twitter, Inc.
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
 * ======================================================================== */
!function($) {
    "use strict";
    function transitionEnd() {
        var el = document.createElement("bootstrap")
          , transEndEventNames = {
            WebkitTransition: "webkitTransitionEnd",
            MozTransition: "transitionend",
            OTransition: "oTransitionEnd otransitionend",
            transition: "transitionend"
        };
        for (var name in transEndEventNames)
            if (el.style[name] !== undefined)
                return {
                    end: transEndEventNames[name]
                };
        return !1
    }
    $.fn.emulateTransitionEnd = function(duration) {
        var called = !1
          , $el = this;
        return $(this).one("bsTransitionEnd", function() {
            called = !0
        }),
        setTimeout(function() {
            called || $($el).trigger($.support.transition.end)
        }, duration),
        this
    }
    ,
    $(function() {
        $.support.transition = transitionEnd(),
        $.support.transition && ($.event.special.bsTransitionEnd = {
            bindType: $.support.transition.end,
            delegateType: $.support.transition.end,
            handle: function(e) {
                if ($(e.target).is(this))
                    return e.handleObj.handler.apply(this, arguments)
            }
        })
    })
}(jQuery),
function($) {
    "use strict";
    function Plugin(option) {
        return this.each(function() {
            var $this = $(this)
              , data = $this.data("bs.alert");
            data || $this.data("bs.alert", data = new Alert(this)),
            "string" == typeof option && data[option].call($this)
        })
    }
    var dismiss = '[data-dismiss="alert"]'
      , Alert = function(el) {
        $(el).on("click", dismiss, this.close)
    };
    Alert.VERSION = "3.2.0",
    Alert.prototype.close = function(e) {
        function removeElement() {
            $parent.detach().trigger("closed.bs.alert").remove()
        }
        var $this = $(this)
          , selector = $this.attr("data-target");
        selector || (selector = (selector = $this.attr("href")) && selector.replace(/.*(?=#[^\s]*$)/, ""));
        var $parent = $(selector);
        e && e.preventDefault(),
        $parent.length || ($parent = $this.hasClass("alert") ? $this : $this.parent()),
        $parent.trigger(e = $.Event("close.bs.alert")),
        e.isDefaultPrevented() || ($parent.removeClass("in"),
        $.support.transition && $parent.hasClass("fade") ? $parent.one("bsTransitionEnd", removeElement).emulateTransitionEnd(150) : removeElement())
    }
    ;
    var old = $.fn.alert;
    $.fn.alert = Plugin,
    $.fn.alert.Constructor = Alert,
    $.fn.alert.noConflict = function() {
        return $.fn.alert = old,
        this
    }
    ,
    $(document).on("click.bs.alert.data-api", dismiss, Alert.prototype.close)
}(jQuery),
function($) {
    "use strict";
    function Plugin(option) {
        return this.each(function() {
            var $this = $(this)
              , data = $this.data("bs.button")
              , options = "object" == typeof option && option;
            data || $this.data("bs.button", data = new Button(this,options)),
            "toggle" == option ? data.toggle() : option && data.setState(option)
        })
    }
    var Button = function(element, options) {
        this.$element = $(element),
        this.options = $.extend({}, Button.DEFAULTS, options),
        this.isLoading = !1
    };
    Button.VERSION = "3.2.0",
    Button.DEFAULTS = {
        loadingText: "loading..."
    },
    Button.prototype.setState = function(state) {
        var d = "disabled"
          , $el = this.$element
          , val = $el.is("input") ? "val" : "html"
          , data = $el.data();
        state += "Text",
        null == data.resetText && $el.data("resetText", $el[val]()),
        $el[val](null == data[state] ? this.options[state] : data[state]),
        setTimeout($.proxy(function() {
            "loadingText" == state ? (this.isLoading = !0,
            $el.addClass(d).attr(d, d)) : this.isLoading && (this.isLoading = !1,
            $el.removeClass(d).removeAttr(d))
        }, this), 0)
    }
    ,
    Button.prototype.toggle = function() {
        var changed = !0
          , $parent = this.$element.closest('[data-toggle="buttons"]');
        if ($parent.length) {
            var $input = this.$element.find("input");
            "radio" == $input.prop("type") && ($input.prop("checked") && this.$element.hasClass("active") ? changed = !1 : $parent.find(".active").removeClass("active")),
            changed && $input.prop("checked", !this.$element.hasClass("active")).trigger("change")
        }
        changed && this.$element.toggleClass("active")
    }
    ;
    var old = $.fn.button;
    $.fn.button = Plugin,
    $.fn.button.Constructor = Button,
    $.fn.button.noConflict = function() {
        return $.fn.button = old,
        this
    }
    ,
    $(document).on("click.bs.button.data-api", '[data-toggle^="button"]', function(e) {
        var $btn = $(e.target);
        $btn.hasClass("btn") || ($btn = $btn.closest(".btn")),
        Plugin.call($btn, "toggle"),
        e.preventDefault()
    })
}(jQuery),
function($) {
    "use strict";
    function Plugin(option) {
        return this.each(function() {
            var $this = $(this)
              , data = $this.data("bs.carousel")
              , options = $.extend({}, Carousel.DEFAULTS, $this.data(), "object" == typeof option && option)
              , action = "string" == typeof option ? option : options.slide;
            data || $this.data("bs.carousel", data = new Carousel(this,options)),
            "number" == typeof option ? data.to(option) : action ? data[action]() : options.interval && data.pause().cycle()
        })
    }
    var Carousel = function(element, options) {
        this.$element = $(element).on("keydown.bs.carousel", $.proxy(this.keydown, this)),
        this.$indicators = this.$element.find(".carousel-indicators"),
        this.options = options,
        this.paused = this.sliding = this.interval = this.$active = this.$items = null,
        "hover" == this.options.pause && this.$element.on("mouseenter.bs.carousel", $.proxy(this.pause, this)).on("mouseleave.bs.carousel", $.proxy(this.cycle, this))
    };
    Carousel.VERSION = "3.2.0",
    Carousel.DEFAULTS = {
        interval: 5e3,
        pause: "hover",
        wrap: !0
    },
    Carousel.prototype.keydown = function(e) {
        switch (e.which) {
        case 37:
            this.prev();
            break;
        case 39:
            this.next();
            break;
        default:
            return
        }
        e.preventDefault()
    }
    ,
    Carousel.prototype.cycle = function(e) {
        return e || (this.paused = !1),
        this.interval && clearInterval(this.interval),
        this.options.interval && !this.paused && (this.interval = setInterval($.proxy(this.next, this), this.options.interval)),
        this
    }
    ,
    Carousel.prototype.getItemIndex = function(item) {
        return this.$items = item.parent().children(".item"),
        this.$items.index(item || this.$active)
    }
    ,
    Carousel.prototype.to = function(pos) {
        var that = this
          , activeIndex = this.getItemIndex(this.$active = this.$element.find(".item.active"));
        if (!(pos > this.$items.length - 1 || pos < 0))
            return this.sliding ? this.$element.one("slid.bs.carousel", function() {
                that.to(pos)
            }) : activeIndex == pos ? this.pause().cycle() : this.slide(activeIndex < pos ? "next" : "prev", $(this.$items[pos]))
    }
    ,
    Carousel.prototype.pause = function(e) {
        return e || (this.paused = !0),
        this.$element.find(".next, .prev").length && $.support.transition && (this.$element.trigger($.support.transition.end),
        this.cycle(!0)),
        this.interval = clearInterval(this.interval),
        this
    }
    ,
    Carousel.prototype.next = function() {
        if (!this.sliding)
            return this.slide("next")
    }
    ,
    Carousel.prototype.prev = function() {
        if (!this.sliding)
            return this.slide("prev")
    }
    ,
    Carousel.prototype.slide = function(type, next) {
        var $active = this.$element.find(".item.active")
          , $next = next || $active[type]()
          , isCycling = this.interval
          , direction = "next" == type ? "left" : "right"
          , fallback = "next" == type ? "first" : "last"
          , that = this;
        if (!$next.length) {
            if (!this.options.wrap)
                return;
            $next = this.$element.find(".item")[fallback]()
        }
        if ($next.hasClass("active"))
            return this.sliding = !1;
        var relatedTarget = $next[0]
          , slideEvent = $.Event("slide.bs.carousel", {
            relatedTarget: relatedTarget,
            direction: direction
        });
        if (this.$element.trigger(slideEvent),
        !slideEvent.isDefaultPrevented()) {
            if (this.sliding = !0,
            isCycling && this.pause(),
            this.$indicators.length) {
                this.$indicators.find(".active").removeClass("active");
                var $nextIndicator = $(this.$indicators.children()[this.getItemIndex($next)]);
                $nextIndicator && $nextIndicator.addClass("active")
            }
            var slidEvent = $.Event("slid.bs.carousel", {
                relatedTarget: relatedTarget,
                direction: direction
            });
            return $.support.transition && this.$element.hasClass("slide") ? ($next.addClass(type),
            $next[0].offsetWidth,
            $active.addClass(direction),
            $next.addClass(direction),
            $active.one("bsTransitionEnd", function() {
                $next.removeClass([type, direction].join(" ")).addClass("active"),
                $active.removeClass(["active", direction].join(" ")),
                that.sliding = !1,
                setTimeout(function() {
                    that.$element.trigger(slidEvent)
                }, 0)
            }).emulateTransitionEnd(1e3 * $active.css("transition-duration").slice(0, -1))) : ($active.removeClass("active"),
            $next.addClass("active"),
            this.sliding = !1,
            this.$element.trigger(slidEvent)),
            isCycling && this.cycle(),
            this
        }
    }
    ;
    var old = $.fn.carousel;
    $.fn.carousel = Plugin,
    $.fn.carousel.Constructor = Carousel,
    $.fn.carousel.noConflict = function() {
        return $.fn.carousel = old,
        this
    }
    ,
    $(document).on("click.bs.carousel.data-api", "[data-slide], [data-slide-to]", function(e) {
        var href, $this = $(this), $target = $($this.attr("data-target") || (href = $this.attr("href")) && href.replace(/.*(?=#[^\s]+$)/, ""));
        if ($target.hasClass("carousel")) {
            var options = $.extend({}, $target.data(), $this.data())
              , slideIndex = $this.attr("data-slide-to");
            slideIndex && (options.interval = !1),
            Plugin.call($target, options),
            slideIndex && $target.data("bs.carousel").to(slideIndex),
            e.preventDefault()
        }
    }),
    $(window).on("load", function() {
        $('[data-ride="carousel"]').each(function() {
            var $carousel = $(this);
            Plugin.call($carousel, $carousel.data())
        })
    })
}(jQuery),
function($) {
    "use strict";
    function Plugin(option) {
        return this.each(function() {
            var $this = $(this)
              , data = $this.data("bs.collapse")
              , options = $.extend({}, Collapse.DEFAULTS, $this.data(), "object" == typeof option && option);
            !data && options.toggle && "show" == option && (option = !option),
            data || $this.data("bs.collapse", data = new Collapse(this,options)),
            "string" == typeof option && data[option]()
        })
    }
    var Collapse = function(element, options) {
        this.$element = $(element),
        this.options = $.extend({}, Collapse.DEFAULTS, options),
        this.transitioning = null,
        this.options.parent && (this.$parent = $(this.options.parent)),
        this.options.toggle && this.toggle()
    };
    Collapse.VERSION = "3.2.0",
    Collapse.DEFAULTS = {
        toggle: !0
    },
    Collapse.prototype.dimension = function() {
        return this.$element.hasClass("width") ? "width" : "height"
    }
    ,
    Collapse.prototype.show = function() {
        if (!this.transitioning && !this.$element.hasClass("in")) {
            var startEvent = $.Event("show.bs.collapse");
            if (this.$element.trigger(startEvent),
            !startEvent.isDefaultPrevented()) {
                var actives = this.$parent && this.$parent.find("> .panel > .in");
                if (actives && actives.length) {
                    var hasData = actives.data("bs.collapse");
                    if (hasData && hasData.transitioning)
                        return;
                    Plugin.call(actives, "hide"),
                    hasData || actives.data("bs.collapse", null)
                }
                var dimension = this.dimension();
                this.$element.removeClass("collapse").addClass("collapsing")[dimension](0),
                this.transitioning = 1;
                var complete = function() {
                    this.$element.removeClass("collapsing").addClass("collapse in")[dimension](""),
                    this.transitioning = 0,
                    this.$element.trigger("shown.bs.collapse")
                };
                if (!$.support.transition)
                    return complete.call(this);
                var scrollSize = $.camelCase(["scroll", dimension].join("-"));
                this.$element.one("bsTransitionEnd", $.proxy(complete, this)).emulateTransitionEnd(350)[dimension](this.$element[0][scrollSize])
            }
        }
    }
    ,
    Collapse.prototype.hide = function() {
        if (!this.transitioning && this.$element.hasClass("in")) {
            var startEvent = $.Event("hide.bs.collapse");
            if (this.$element.trigger(startEvent),
            !startEvent.isDefaultPrevented()) {
                var dimension = this.dimension();
                this.$element[dimension](this.$element[dimension]())[0].offsetHeight,
                this.$element.addClass("collapsing").removeClass("collapse").removeClass("in"),
                this.transitioning = 1;
                var complete = function() {
                    this.transitioning = 0,
                    this.$element.trigger("hidden.bs.collapse").removeClass("collapsing").addClass("collapse")
                };
                if (!$.support.transition)
                    return complete.call(this);
                this.$element[dimension](0).one("bsTransitionEnd", $.proxy(complete, this)).emulateTransitionEnd(350)
            }
        }
    }
    ,
    Collapse.prototype.toggle = function() {
        this[this.$element.hasClass("in") ? "hide" : "show"]()
    }
    ;
    var old = $.fn.collapse;
    $.fn.collapse = Plugin,
    $.fn.collapse.Constructor = Collapse,
    $.fn.collapse.noConflict = function() {
        return $.fn.collapse = old,
        this
    }
    ,
    $(document).on("click.bs.collapse.data-api", '[data-toggle="collapse"]', function(e) {
        var href, $this = $(this), target = $this.attr("data-target") || e.preventDefault() || (href = $this.attr("href")) && href.replace(/.*(?=#[^\s]+$)/, ""), $target = $(target), data = $target.data("bs.collapse"), option = data ? "toggle" : $this.data(), parent = $this.attr("data-parent"), $parent = parent && $(parent);
        data && data.transitioning || ($parent && $parent.find('[data-toggle="collapse"][data-parent="' + parent + '"]').not($this).addClass("collapsed"),
        $this[$target.hasClass("in") ? "addClass" : "removeClass"]("collapsed")),
        Plugin.call($target, option)
    })
}(jQuery),
function($) {
    "use strict";
    function clearMenus(e) {
        e && 3 === e.which || ($(backdrop).remove(),
        $(toggle).each(function() {
            var $parent = getParent($(this))
              , relatedTarget = {
                relatedTarget: this
            };
            $parent.hasClass("open") && ($parent.trigger(e = $.Event("hide.bs.dropdown", relatedTarget)),
            e.isDefaultPrevented() || $parent.removeClass("open").trigger("hidden.bs.dropdown", relatedTarget))
        }))
    }
    function getParent($this) {
        var selector = $this.attr("data-target");
        selector || (selector = (selector = $this.attr("href")) && /#[A-Za-z]/.test(selector) && selector.replace(/.*(?=#[^\s]*$)/, ""));
        var $parent = selector && $(selector);
        return $parent && $parent.length ? $parent : $this.parent()
    }
    function Plugin(option) {
        return this.each(function() {
            var $this = $(this)
              , data = $this.data("bs.dropdown");
            data || $this.data("bs.dropdown", data = new Dropdown(this)),
            "string" == typeof option && data[option].call($this)
        })
    }
    var backdrop = ".dropdown-backdrop"
      , toggle = '[data-toggle="dropdown"]'
      , Dropdown = function(element) {
        $(element).on("click.bs.dropdown", this.toggle)
    };
    Dropdown.VERSION = "3.2.0",
    Dropdown.prototype.toggle = function(e) {
        var $this = $(this);
        if (!$this.is(".disabled, :disabled")) {
            var $parent = getParent($this)
              , isActive = $parent.hasClass("open");
            if (clearMenus(),
            !isActive) {
                "ontouchstart"in document.documentElement && !$parent.closest(".navbar-nav").length && $('<div class="dropdown-backdrop"/>').insertAfter($(this)).on("click", clearMenus);
                var relatedTarget = {
                    relatedTarget: this
                };
                if ($parent.trigger(e = $.Event("show.bs.dropdown", relatedTarget)),
                e.isDefaultPrevented())
                    return;
                $this.trigger("focus"),
                $parent.toggleClass("open").trigger("shown.bs.dropdown", relatedTarget)
            }
            return !1
        }
    }
    ,
    Dropdown.prototype.keydown = function(e) {
        if (/(38|40|27)/.test(e.keyCode)) {
            var $this = $(this);
            if (e.preventDefault(),
            e.stopPropagation(),
            !$this.is(".disabled, :disabled")) {
                var $parent = getParent($this)
                  , isActive = $parent.hasClass("open");
                if (!isActive || isActive && 27 == e.keyCode)
                    return 27 == e.which && $parent.find(toggle).trigger("focus"),
                    $this.trigger("click");
                var desc = " li:not(.divider):visible a"
                  , $items = $parent.find('[role="menu"]' + desc + ', [role="listbox"]' + desc);
                if ($items.length) {
                    var index = $items.index($items.filter(":focus"));
                    38 == e.keyCode && 0 < index && index--,
                    40 == e.keyCode && index < $items.length - 1 && index++,
                    ~index || (index = 0),
                    $items.eq(index).trigger("focus")
                }
            }
        }
    }
    ;
    var old = $.fn.dropdown;
    $.fn.dropdown = Plugin,
    $.fn.dropdown.Constructor = Dropdown,
    $.fn.dropdown.noConflict = function() {
        return $.fn.dropdown = old,
        this
    }
    ,
    $(document).on("click.bs.dropdown.data-api", clearMenus).on("click.bs.dropdown.data-api", ".dropdown form", function(e) {
        e.stopPropagation()
    }).on("click.bs.dropdown.data-api", toggle, Dropdown.prototype.toggle).on("keydown.bs.dropdown.data-api", toggle + ', [role="menu"], [role="listbox"]', Dropdown.prototype.keydown)
}(jQuery),
function($) {
    "use strict";
    function Plugin(option, _relatedTarget) {
        return this.each(function() {
            var $this = $(this)
              , data = $this.data("bs.modal")
              , options = $.extend({}, Modal.DEFAULTS, $this.data(), "object" == typeof option && option);
            data || $this.data("bs.modal", data = new Modal(this,options)),
            "string" == typeof option ? data[option](_relatedTarget) : options.show && data.show(_relatedTarget)
        })
    }
    var Modal = function(element, options) {
        this.options = options,
        this.$body = $(document.body),
        this.$element = $(element),
        this.$backdrop = this.isShown = null,
        this.scrollbarWidth = 0,
        this.options.remote && this.$element.find(".modal-content").load(this.options.remote, $.proxy(function() {
            this.$element.trigger("loaded.bs.modal")
        }, this))
    };
    Modal.VERSION = "3.2.0",
    Modal.DEFAULTS = {
        backdrop: !0,
        keyboard: !0,
        show: !0
    },
    Modal.prototype.toggle = function(_relatedTarget) {
        return this.isShown ? this.hide() : this.show(_relatedTarget)
    }
    ,
    Modal.prototype.show = function(_relatedTarget) {
        var that = this
          , e = $.Event("show.bs.modal", {
            relatedTarget: _relatedTarget
        });
        this.$element.trigger(e),
        this.isShown || e.isDefaultPrevented() || (this.isShown = !0,
        this.checkScrollbar(),
        this.$body.addClass("modal-open"),
        this.setScrollbar(),
        this.escape(),
        this.$element.on("click.dismiss.bs.modal", '[data-dismiss="modal"]', $.proxy(this.hide, this)),
        this.backdrop(function() {
            var transition = $.support.transition && that.$element.hasClass("fade");
            that.$element.parent().length || that.$element.appendTo(that.$body),
            that.$element.show().scrollTop(0),
            transition && that.$element[0].offsetWidth,
            that.$element.addClass("in").attr("aria-hidden", !1),
            that.enforceFocus();
            var e = $.Event("shown.bs.modal", {
                relatedTarget: _relatedTarget
            });
            transition ? that.$element.find(".modal-dialog").one("bsTransitionEnd", function() {
                that.$element.trigger("focus").trigger(e)
            }).emulateTransitionEnd(300) : that.$element.trigger("focus").trigger(e)
        }))
    }
    ,
    Modal.prototype.hide = function(e) {
        e && e.preventDefault(),
        e = $.Event("hide.bs.modal"),
        this.$element.trigger(e),
        this.isShown && !e.isDefaultPrevented() && (this.isShown = !1,
        this.$body.removeClass("modal-open"),
        this.resetScrollbar(),
        this.escape(),
        $(document).off("focusin.bs.modal"),
        this.$element.removeClass("in").attr("aria-hidden", !0).off("click.dismiss.bs.modal"),
        $.support.transition && this.$element.hasClass("fade") ? this.$element.one("bsTransitionEnd", $.proxy(this.hideModal, this)).emulateTransitionEnd(300) : this.hideModal())
    }
    ,
    Modal.prototype.enforceFocus = function() {
        $(document).off("focusin.bs.modal").on("focusin.bs.modal", $.proxy(function(e) {
            this.$element[0] === e.target || this.$element.has(e.target).length || this.$element.trigger("focus")
        }, this))
    }
    ,
    Modal.prototype.escape = function() {
        this.isShown && this.options.keyboard ? this.$element.on("keyup.dismiss.bs.modal", $.proxy(function(e) {
            27 == e.which && this.hide()
        }, this)) : this.isShown || this.$element.off("keyup.dismiss.bs.modal")
    }
    ,
    Modal.prototype.hideModal = function() {
        var that = this;
        this.$element.hide(),
        this.backdrop(function() {
            that.$element.trigger("hidden.bs.modal")
        })
    }
    ,
    Modal.prototype.removeBackdrop = function() {
        this.$backdrop && this.$backdrop.remove(),
        this.$backdrop = null
    }
    ,
    Modal.prototype.backdrop = function(callback) {
        var that = this
          , animate = this.$element.hasClass("fade") ? "fade" : "";
        if (this.isShown && this.options.backdrop) {
            var doAnimate = $.support.transition && animate;
            if (this.$backdrop = $('<div class="modal-backdrop ' + animate + '" />').appendTo(this.$body),
            this.$element.on("click.dismiss.bs.modal", $.proxy(function(e) {
                e.target === e.currentTarget && ("static" == this.options.backdrop ? this.$element[0].focus.call(this.$element[0]) : this.hide.call(this))
            }, this)),
            doAnimate && this.$backdrop[0].offsetWidth,
            this.$backdrop.addClass("in"),
            !callback)
                return;
            doAnimate ? this.$backdrop.one("bsTransitionEnd", callback).emulateTransitionEnd(150) : callback()
        } else if (!this.isShown && this.$backdrop) {
            this.$backdrop.removeClass("in");
            var callbackRemove = function() {
                that.removeBackdrop(),
                callback && callback()
            };
            $.support.transition && this.$element.hasClass("fade") ? this.$backdrop.one("bsTransitionEnd", callbackRemove).emulateTransitionEnd(150) : callbackRemove()
        } else
            callback && callback()
    }
    ,
    Modal.prototype.checkScrollbar = function() {
        document.body.clientWidth >= window.innerWidth || (this.scrollbarWidth = this.scrollbarWidth || this.measureScrollbar())
    }
    ,
    Modal.prototype.setScrollbar = function() {
        var bodyPad = parseInt(this.$body.css("padding-right") || 0, 10);
        this.scrollbarWidth && this.$body.css("padding-right", bodyPad + this.scrollbarWidth)
    }
    ,
    Modal.prototype.resetScrollbar = function() {
        this.$body.css("padding-right", "")
    }
    ,
    Modal.prototype.measureScrollbar = function() {
        var scrollDiv = document.createElement("div");
        scrollDiv.className = "modal-scrollbar-measure",
        this.$body.append(scrollDiv);
        var scrollbarWidth = scrollDiv.offsetWidth - scrollDiv.clientWidth;
        return this.$body[0].removeChild(scrollDiv),
        scrollbarWidth
    }
    ;
    var old = $.fn.modal;
    $.fn.modal = Plugin,
    $.fn.modal.Constructor = Modal,
    $.fn.modal.noConflict = function() {
        return $.fn.modal = old,
        this
    }
    ,
    $(document).on("click.bs.modal.data-api", '[data-toggle="modal"]', function(e) {
        var $this = $(this)
          , href = $this.attr("href")
          , $target = $($this.attr("data-target") || href && href.replace(/.*(?=#[^\s]+$)/, ""))
          , option = $target.data("bs.modal") ? "toggle" : $.extend({
            remote: !/#/.test(href) && href
        }, $target.data(), $this.data());
        $this.is("a") && e.preventDefault(),
        $target.one("show.bs.modal", function(showEvent) {
            showEvent.isDefaultPrevented() || $target.one("hidden.bs.modal", function() {
                $this.is(":visible") && $this.trigger("focus")
            })
        }),
        Plugin.call($target, option, this)
    })
}(jQuery),
function($) {
    "use strict";
    function Plugin(option) {
        return this.each(function() {
            var $this = $(this)
              , data = $this.data("bs.tooltip")
              , options = "object" == typeof option && option;
            (data || "destroy" != option) && (data || $this.data("bs.tooltip", data = new Tooltip(this,options)),
            "string" == typeof option && data[option]())
        })
    }
    var Tooltip = function(element, options) {
        this.type = this.options = this.enabled = this.timeout = this.hoverState = this.$element = null,
        this.init("tooltip", element, options)
    };
    Tooltip.VERSION = "3.2.0",
    Tooltip.DEFAULTS = {
        animation: !0,
        placement: "top",
        selector: !1,
        template: '<div class="tooltip" role="tooltip"><div class="tooltip-arrow"></div><div class="tooltip-inner"></div></div>',
        trigger: "hover focus",
        title: "",
        delay: 0,
        html: !1,
        container: !1,
        viewport: {
            selector: "body",
            padding: 0
        }
    },
    Tooltip.prototype.init = function(type, element, options) {
        this.enabled = !0,
        this.type = type,
        this.$element = $(element),
        this.options = this.getOptions(options),
        this.$viewport = this.options.viewport && $(this.options.viewport.selector || this.options.viewport);
        for (var triggers = this.options.trigger.split(" "), i = triggers.length; i--; ) {
            var trigger = triggers[i];
            if ("click" == trigger)
                this.$element.on("click." + this.type, this.options.selector, $.proxy(this.toggle, this));
            else if ("manual" != trigger) {
                var eventIn = "hover" == trigger ? "mouseenter" : "focusin"
                  , eventOut = "hover" == trigger ? "mouseleave" : "focusout";
                this.$element.on(eventIn + "." + this.type, this.options.selector, $.proxy(this.enter, this)),
                this.$element.on(eventOut + "." + this.type, this.options.selector, $.proxy(this.leave, this))
            }
        }
        this.options.selector ? this._options = $.extend({}, this.options, {
            trigger: "manual",
            selector: ""
        }) : this.fixTitle()
    }
    ,
    Tooltip.prototype.getDefaults = function() {
        return Tooltip.DEFAULTS
    }
    ,
    Tooltip.prototype.getOptions = function(options) {
        return (options = $.extend({}, this.getDefaults(), this.$element.data(), options)).delay && "number" == typeof options.delay && (options.delay = {
            show: options.delay,
            hide: options.delay
        }),
        options
    }
    ,
    Tooltip.prototype.getDelegateOptions = function() {
        var options = {}
          , defaults = this.getDefaults();
        return this._options && $.each(this._options, function(key, value) {
            defaults[key] != value && (options[key] = value)
        }),
        options
    }
    ,
    Tooltip.prototype.enter = function(obj) {
        var self = obj instanceof this.constructor ? obj : $(obj.currentTarget).data("bs." + this.type);
        if (self || (self = new this.constructor(obj.currentTarget,this.getDelegateOptions()),
        $(obj.currentTarget).data("bs." + this.type, self)),
        clearTimeout(self.timeout),
        self.hoverState = "in",
        !self.options.delay || !self.options.delay.show)
            return self.show();
        self.timeout = setTimeout(function() {
            "in" == self.hoverState && self.show()
        }, self.options.delay.show)
    }
    ,
    Tooltip.prototype.leave = function(obj) {
        var self = obj instanceof this.constructor ? obj : $(obj.currentTarget).data("bs." + this.type);
        if (self || (self = new this.constructor(obj.currentTarget,this.getDelegateOptions()),
        $(obj.currentTarget).data("bs." + this.type, self)),
        clearTimeout(self.timeout),
        self.hoverState = "out",
        !self.options.delay || !self.options.delay.hide)
            return self.hide();
        self.timeout = setTimeout(function() {
            "out" == self.hoverState && self.hide()
        }, self.options.delay.hide)
    }
    ,
    Tooltip.prototype.show = function() {
        var e = $.Event("show.bs." + this.type);
        if (this.hasContent() && this.enabled) {
            this.$element.trigger(e);
            var inDom = $.contains(document.documentElement, this.$element[0]);
            if (e.isDefaultPrevented() || !inDom)
                return;
            var that = this
              , $tip = this.tip()
              , tipId = this.getUID(this.type);
            this.setContent(),
            $tip.attr("id", tipId),
            this.$element.attr("aria-describedby", tipId),
            this.options.animation && $tip.addClass("fade");
            var placement = "function" == typeof this.options.placement ? this.options.placement.call(this, $tip[0], this.$element[0]) : this.options.placement
              , autoToken = /\s?auto?\s?/i
              , autoPlace = autoToken.test(placement);
            autoPlace && (placement = placement.replace(autoToken, "") || "top"),
            $tip.detach().css({
                top: 0,
                left: 0,
                display: "block"
            }).addClass(placement).data("bs." + this.type, this),
            this.options.container ? $tip.appendTo(this.options.container) : $tip.insertAfter(this.$element);
            var pos = this.getPosition()
              , actualWidth = $tip[0].offsetWidth
              , actualHeight = $tip[0].offsetHeight;
            if (autoPlace) {
                var orgPlacement = placement
                  , $parent = this.$element.parent()
                  , parentDim = this.getPosition($parent);
                placement = "bottom" == placement && pos.top + pos.height + actualHeight - parentDim.scroll > parentDim.height ? "top" : "top" == placement && pos.top - parentDim.scroll - actualHeight < 0 ? "bottom" : "right" == placement && pos.right + actualWidth > parentDim.width ? "left" : "left" == placement && pos.left - actualWidth < parentDim.left ? "right" : placement,
                $tip.removeClass(orgPlacement).addClass(placement)
            }
            var calculatedOffset = this.getCalculatedOffset(placement, pos, actualWidth, actualHeight);
            this.applyPlacement(calculatedOffset, placement);
            var complete = function() {
                that.$element.trigger("shown.bs." + that.type),
                that.hoverState = null
            };
            $.support.transition && this.$tip.hasClass("fade") ? $tip.one("bsTransitionEnd", complete).emulateTransitionEnd(150) : complete()
        }
    }
    ,
    Tooltip.prototype.applyPlacement = function(offset, placement) {
        var $tip = this.tip()
          , width = $tip[0].offsetWidth
          , height = $tip[0].offsetHeight
          , marginTop = parseInt($tip.css("margin-top"), 10)
          , marginLeft = parseInt($tip.css("margin-left"), 10);
        isNaN(marginTop) && (marginTop = 0),
        isNaN(marginLeft) && (marginLeft = 0),
        offset.top = offset.top + marginTop,
        offset.left = offset.left + marginLeft,
        $.offset.setOffset($tip[0], $.extend({
            using: function(props) {
                $tip.css({
                    top: Math.round(props.top),
                    left: Math.round(props.left)
                })
            }
        }, offset), 0),
        $tip.addClass("in");
        var actualWidth = $tip[0].offsetWidth
          , actualHeight = $tip[0].offsetHeight;
        "top" == placement && actualHeight != height && (offset.top = offset.top + height - actualHeight);
        var delta = this.getViewportAdjustedDelta(placement, offset, actualWidth, actualHeight);
        delta.left ? offset.left += delta.left : offset.top += delta.top;
        var arrowDelta = delta.left ? 2 * delta.left - width + actualWidth : 2 * delta.top - height + actualHeight
          , arrowPosition = delta.left ? "left" : "top"
          , arrowOffsetPosition = delta.left ? "offsetWidth" : "offsetHeight";
        $tip.offset(offset),
        this.replaceArrow(arrowDelta, $tip[0][arrowOffsetPosition], arrowPosition)
    }
    ,
    Tooltip.prototype.replaceArrow = function(delta, dimension, position) {
        this.arrow().css(position, delta ? 50 * (1 - delta / dimension) + "%" : "")
    }
    ,
    Tooltip.prototype.setContent = function() {
        var $tip = this.tip()
          , title = this.getTitle();
        $tip.find(".tooltip-inner")[this.options.html ? "html" : "text"](title),
        $tip.removeClass("fade in top bottom left right")
    }
    ,
    Tooltip.prototype.hide = function() {
        function complete() {
            "in" != that.hoverState && $tip.detach(),
            that.$element.trigger("hidden.bs." + that.type)
        }
        var that = this
          , $tip = this.tip()
          , e = $.Event("hide.bs." + this.type);
        if (this.$element.removeAttr("aria-describedby"),
        this.$element.trigger(e),
        !e.isDefaultPrevented())
            return $tip.removeClass("in"),
            $.support.transition && this.$tip.hasClass("fade") ? $tip.one("bsTransitionEnd", complete).emulateTransitionEnd(150) : complete(),
            this.hoverState = null,
            this
    }
    ,
    Tooltip.prototype.fixTitle = function() {
        var $e = this.$element;
        ($e.attr("title") || "string" != typeof $e.attr("data-original-title")) && $e.attr("data-original-title", $e.attr("title") || "").attr("title", "")
    }
    ,
    Tooltip.prototype.hasContent = function() {
        return this.getTitle()
    }
    ,
    Tooltip.prototype.getPosition = function($element) {
        var el = ($element = $element || this.$element)[0]
          , isBody = "BODY" == el.tagName;
        return $.extend({}, "function" == typeof el.getBoundingClientRect ? el.getBoundingClientRect() : null, {
            scroll: isBody ? document.documentElement.scrollTop || document.body.scrollTop : $element.scrollTop(),
            width: isBody ? $(window).width() : $element.outerWidth(),
            height: isBody ? $(window).height() : $element.outerHeight()
        }, isBody ? {
            top: 0,
            left: 0
        } : $element.offset())
    }
    ,
    Tooltip.prototype.getCalculatedOffset = function(placement, pos, actualWidth, actualHeight) {
        return "bottom" == placement ? {
            top: pos.top + pos.height,
            left: pos.left + pos.width / 2 - actualWidth / 2
        } : "top" == placement ? {
            top: pos.top - actualHeight,
            left: pos.left + pos.width / 2 - actualWidth / 2
        } : "left" == placement ? {
            top: pos.top + pos.height / 2 - actualHeight / 2,
            left: pos.left - actualWidth
        } : {
            top: pos.top + pos.height / 2 - actualHeight / 2,
            left: pos.left + pos.width
        }
    }
    ,
    Tooltip.prototype.getViewportAdjustedDelta = function(placement, pos, actualWidth, actualHeight) {
        var delta = {
            top: 0,
            left: 0
        };
        if (!this.$viewport)
            return delta;
        var viewportPadding = this.options.viewport && this.options.viewport.padding || 0
          , viewportDimensions = this.getPosition(this.$viewport);
        if (/right|left/.test(placement)) {
            var topEdgeOffset = pos.top - viewportPadding - viewportDimensions.scroll
              , bottomEdgeOffset = pos.top + viewportPadding - viewportDimensions.scroll + actualHeight;
            topEdgeOffset < viewportDimensions.top ? delta.top = viewportDimensions.top - topEdgeOffset : bottomEdgeOffset > viewportDimensions.top + viewportDimensions.height && (delta.top = viewportDimensions.top + viewportDimensions.height - bottomEdgeOffset)
        } else {
            var leftEdgeOffset = pos.left - viewportPadding
              , rightEdgeOffset = pos.left + viewportPadding + actualWidth;
            leftEdgeOffset < viewportDimensions.left ? delta.left = viewportDimensions.left - leftEdgeOffset : rightEdgeOffset > viewportDimensions.width && (delta.left = viewportDimensions.left + viewportDimensions.width - rightEdgeOffset)
        }
        return delta
    }
    ,
    Tooltip.prototype.getTitle = function() {
        var $e = this.$element
          , o = this.options;
        return $e.attr("data-original-title") || ("function" == typeof o.title ? o.title.call($e[0]) : o.title)
    }
    ,
    Tooltip.prototype.getUID = function(prefix) {
        for (; prefix += ~~(1e6 * Math.random()),
        document.getElementById(prefix); )
            ;
        return prefix
    }
    ,
    Tooltip.prototype.tip = function() {
        return this.$tip = this.$tip || $(this.options.template)
    }
    ,
    Tooltip.prototype.arrow = function() {
        return this.$arrow = this.$arrow || this.tip().find(".tooltip-arrow")
    }
    ,
    Tooltip.prototype.validate = function() {
        this.$element[0].parentNode || (this.hide(),
        this.$element = null,
        this.options = null)
    }
    ,
    Tooltip.prototype.enable = function() {
        this.enabled = !0
    }
    ,
    Tooltip.prototype.disable = function() {
        this.enabled = !1
    }
    ,
    Tooltip.prototype.toggleEnabled = function() {
        this.enabled = !this.enabled
    }
    ,
    Tooltip.prototype.toggle = function(e) {
        var self = this;
        e && ((self = $(e.currentTarget).data("bs." + this.type)) || (self = new this.constructor(e.currentTarget,this.getDelegateOptions()),
        $(e.currentTarget).data("bs." + this.type, self))),
        self.tip().hasClass("in") ? self.leave(self) : self.enter(self)
    }
    ,
    Tooltip.prototype.destroy = function() {
        clearTimeout(this.timeout),
        this.hide().$element.off("." + this.type).removeData("bs." + this.type)
    }
    ;
    var old = $.fn.tooltip;
    $.fn.tooltip = Plugin,
    $.fn.tooltip.Constructor = Tooltip,
    $.fn.tooltip.noConflict = function() {
        return $.fn.tooltip = old,
        this
    }
}(jQuery),
function($) {
    "use strict";
    function Plugin(option) {
        return this.each(function() {
            var $this = $(this)
              , data = $this.data("bs.popover")
              , options = "object" == typeof option && option;
            (data || "destroy" != option) && (data || $this.data("bs.popover", data = new Popover(this,options)),
            "string" == typeof option && data[option]())
        })
    }
    var Popover = function(element, options) {
        this.init("popover", element, options)
    };
    if (!$.fn.tooltip)
        throw new Error("Popover requires tooltip.js");
    Popover.VERSION = "3.2.0",
    Popover.DEFAULTS = $.extend({}, $.fn.tooltip.Constructor.DEFAULTS, {
        placement: "right",
        trigger: "click",
        content: "",
        template: '<div class="popover" role="tooltip"><div class="arrow"></div><h3 class="popover-title"></h3><div class="popover-content"></div></div>'
    }),
    Popover.prototype = $.extend({}, $.fn.tooltip.Constructor.prototype),
    (Popover.prototype.constructor = Popover).prototype.getDefaults = function() {
        return Popover.DEFAULTS
    }
    ,
    Popover.prototype.setContent = function() {
        var $tip = this.tip()
          , title = this.getTitle()
          , content = this.getContent();
        $tip.find(".popover-title")[this.options.html ? "html" : "text"](title),
        $tip.find(".popover-content").empty()[this.options.html ? "string" == typeof content ? "html" : "append" : "text"](content),
        $tip.removeClass("fade top bottom left right in"),
        $tip.find(".popover-title").html() || $tip.find(".popover-title").hide()
    }
    ,
    Popover.prototype.hasContent = function() {
        return this.getTitle() || this.getContent()
    }
    ,
    Popover.prototype.getContent = function() {
        var $e = this.$element
          , o = this.options;
        return $e.attr("data-content") || ("function" == typeof o.content ? o.content.call($e[0]) : o.content)
    }
    ,
    Popover.prototype.arrow = function() {
        return this.$arrow = this.$arrow || this.tip().find(".arrow")
    }
    ,
    Popover.prototype.tip = function() {
        return this.$tip || (this.$tip = $(this.options.template)),
        this.$tip
    }
    ;
    var old = $.fn.popover;
    $.fn.popover = Plugin,
    $.fn.popover.Constructor = Popover,
    $.fn.popover.noConflict = function() {
        return $.fn.popover = old,
        this
    }
}(jQuery),
function($) {
    "use strict";
    function ScrollSpy(element, options) {
        var process = $.proxy(this.process, this);
        this.$body = $("body"),
        this.$scrollElement = $(element).is("body") ? $(window) : $(element),
        this.options = $.extend({}, ScrollSpy.DEFAULTS, options),
        this.selector = (this.options.target || "") + " .nav li > a",
        this.offsets = [],
        this.targets = [],
        this.activeTarget = null,
        this.scrollHeight = 0,
        this.$scrollElement.on("scroll.bs.scrollspy", process),
        this.refresh(),
        this.process()
    }
    function Plugin(option) {
        return this.each(function() {
            var $this = $(this)
              , data = $this.data("bs.scrollspy")
              , options = "object" == typeof option && option;
            data || $this.data("bs.scrollspy", data = new ScrollSpy(this,options)),
            "string" == typeof option && data[option]()
        })
    }
    ScrollSpy.VERSION = "3.2.0",
    ScrollSpy.DEFAULTS = {
        offset: 10
    },
    ScrollSpy.prototype.getScrollHeight = function() {
        return this.$scrollElement[0].scrollHeight || Math.max(this.$body[0].scrollHeight, document.documentElement.scrollHeight)
    }
    ,
    ScrollSpy.prototype.refresh = function() {
        var offsetMethod = "offset"
          , offsetBase = 0;
        $.isWindow(this.$scrollElement[0]) || (offsetMethod = "position",
        offsetBase = this.$scrollElement.scrollTop()),
        this.offsets = [],
        this.targets = [],
        this.scrollHeight = this.getScrollHeight();
        var self = this;
        this.$body.find(this.selector).map(function() {
            var $el = $(this)
              , href = $el.data("target") || $el.attr("href")
              , $href = /^#./.test(href) && $(href);
            return $href && $href.length && $href.is(":visible") && [[$href[offsetMethod]().top + offsetBase, href]] || null
        }).sort(function(a, b) {
            return a[0] - b[0]
        }).each(function() {
            self.offsets.push(this[0]),
            self.targets.push(this[1])
        })
    }
    ,
    ScrollSpy.prototype.process = function() {
        var i, scrollTop = this.$scrollElement.scrollTop() + this.options.offset, scrollHeight = this.getScrollHeight(), maxScroll = this.options.offset + scrollHeight - this.$scrollElement.height(), offsets = this.offsets, targets = this.targets, activeTarget = this.activeTarget;
        if (this.scrollHeight != scrollHeight && this.refresh(),
        maxScroll <= scrollTop)
            return activeTarget != (i = targets[targets.length - 1]) && this.activate(i);
        if (activeTarget && scrollTop <= offsets[0])
            return activeTarget != (i = targets[0]) && this.activate(i);
        for (i = offsets.length; i--; )
            activeTarget != targets[i] && scrollTop >= offsets[i] && (!offsets[i + 1] || scrollTop <= offsets[i + 1]) && this.activate(targets[i])
    }
    ,
    ScrollSpy.prototype.activate = function(target) {
        this.activeTarget = target,
        $(this.selector).parentsUntil(this.options.target, ".active").removeClass("active");
        var selector = this.selector + '[data-target="' + target + '"],' + this.selector + '[href="' + target + '"]'
          , active = $(selector).parents("li").addClass("active");
        active.parent(".dropdown-menu").length && (active = active.closest("li.dropdown").addClass("active")),
        active.trigger("activate.bs.scrollspy")
    }
    ;
    var old = $.fn.scrollspy;
    $.fn.scrollspy = Plugin,
    $.fn.scrollspy.Constructor = ScrollSpy,
    $.fn.scrollspy.noConflict = function() {
        return $.fn.scrollspy = old,
        this
    }
    ,
    $(window).on("load.bs.scrollspy.data-api", function() {
        $('[data-spy="scroll"]').each(function() {
            var $spy = $(this);
            Plugin.call($spy, $spy.data())
        })
    })
}(jQuery),
function($) {
    "use strict";
    function Plugin(option) {
        return this.each(function() {
            var $this = $(this)
              , data = $this.data("bs.tab");
            data || $this.data("bs.tab", data = new Tab(this)),
            "string" == typeof option && data[option]()
        })
    }
    var Tab = function(element) {
        this.element = $(element)
    };
    Tab.VERSION = "3.2.0",
    Tab.prototype.show = function() {
        var $this = this.element
          , $ul = $this.closest("ul:not(.dropdown-menu)")
          , selector = $this.data("target");
        if (selector || (selector = (selector = $this.attr("href")) && selector.replace(/.*(?=#[^\s]*$)/, "")),
        !$this.parent("li").hasClass("active")) {
            var previous = $ul.find(".active:last a")[0]
              , e = $.Event("show.bs.tab", {
                relatedTarget: previous
            });
            if ($this.trigger(e),
            !e.isDefaultPrevented()) {
                var $target = $(selector);
                this.activate($this.closest("li"), $ul),
                this.activate($target, $target.parent(), function() {
                    $this.trigger({
                        type: "shown.bs.tab",
                        relatedTarget: previous
                    })
                })
            }
        }
    }
    ,
    Tab.prototype.activate = function(element, container, callback) {
        function next() {
            $active.removeClass("active").find("> .dropdown-menu > .active").removeClass("active"),
            element.addClass("active"),
            transition ? (element[0].offsetWidth,
            element.addClass("in")) : element.removeClass("fade"),
            element.parent(".dropdown-menu") && element.closest("li.dropdown").addClass("active"),
            callback && callback()
        }
        var $active = container.find("> .active")
          , transition = callback && $.support.transition && $active.hasClass("fade");
        transition ? $active.one("bsTransitionEnd", next).emulateTransitionEnd(150) : next(),
        $active.removeClass("in")
    }
    ;
    var old = $.fn.tab;
    $.fn.tab = Plugin,
    $.fn.tab.Constructor = Tab,
    $.fn.tab.noConflict = function() {
        return $.fn.tab = old,
        this
    }
    ,
    $(document).on("click.bs.tab.data-api", '[data-toggle="tab"], [data-toggle="pill"]', function(e) {
        e.preventDefault(),
        Plugin.call($(this), "show")
    })
}(jQuery),
function($) {
    "use strict";
    function Plugin(option) {
        return this.each(function() {
            var $this = $(this)
              , data = $this.data("bs.affix")
              , options = "object" == typeof option && option;
            data || $this.data("bs.affix", data = new Affix(this,options)),
            "string" == typeof option && data[option]()
        })
    }
    var Affix = function(element, options) {
        this.options = $.extend({}, Affix.DEFAULTS, options),
        this.$target = $(this.options.target).on("scroll.bs.affix.data-api", $.proxy(this.checkPosition, this)).on("click.bs.affix.data-api", $.proxy(this.checkPositionWithEventLoop, this)),
        this.$element = $(element),
        this.affixed = this.unpin = this.pinnedOffset = null,
        this.checkPosition()
    };
    Affix.VERSION = "3.2.0",
    Affix.RESET = "affix affix-top affix-bottom",
    Affix.DEFAULTS = {
        offset: 0,
        target: window
    },
    Affix.prototype.getPinnedOffset = function() {
        if (this.pinnedOffset)
            return this.pinnedOffset;
        this.$element.removeClass(Affix.RESET).addClass("affix");
        var scrollTop = this.$target.scrollTop()
          , position = this.$element.offset();
        return this.pinnedOffset = position.top - scrollTop
    }
    ,
    Affix.prototype.checkPositionWithEventLoop = function() {
        setTimeout($.proxy(this.checkPosition, this), 1)
    }
    ,
    Affix.prototype.checkPosition = function() {
        if (this.$element.is(":visible")) {
            var scrollHeight = $(document).height()
              , scrollTop = this.$target.scrollTop()
              , position = this.$element.offset()
              , offset = this.options.offset
              , offsetTop = offset.top
              , offsetBottom = offset.bottom;
            "object" != typeof offset && (offsetBottom = offsetTop = offset),
            "function" == typeof offsetTop && (offsetTop = offset.top(this.$element)),
            "function" == typeof offsetBottom && (offsetBottom = offset.bottom(this.$element));
            var affix = !(null != this.unpin && scrollTop + this.unpin <= position.top) && (null != offsetBottom && position.top + this.$element.height() >= scrollHeight - offsetBottom ? "bottom" : null != offsetTop && scrollTop <= offsetTop && "top");
            if (this.affixed !== affix) {
                null != this.unpin && this.$element.css("top", "");
                var affixType = "affix" + (affix ? "-" + affix : "")
                  , e = $.Event(affixType + ".bs.affix");
                this.$element.trigger(e),
                e.isDefaultPrevented() || (this.affixed = affix,
                this.unpin = "bottom" == affix ? this.getPinnedOffset() : null,
                this.$element.removeClass(Affix.RESET).addClass(affixType).trigger($.Event(affixType.replace("affix", "affixed"))),
                "bottom" == affix && this.$element.offset({
                    top: scrollHeight - this.$element.height() - offsetBottom
                }))
            }
        }
    }
    ;
    var old = $.fn.affix;
    $.fn.affix = Plugin,
    $.fn.affix.Constructor = Affix,
    $.fn.affix.noConflict = function() {
        return $.fn.affix = old,
        this
    }
    ,
    $(window).on("load", function() {
        $('[data-spy="affix"]').each(function() {
            var $spy = $(this)
              , data = $spy.data();
            data.offset = data.offset || {},
            data.offsetBottom && (data.offset.bottom = data.offsetBottom),
            data.offsetTop && (data.offset.top = data.offsetTop),
            Plugin.call($spy, data)
        })
    })
}(jQuery),
function(factory) {
    if ("function" == typeof define && define.amd)
        define(factory);
    else if ("object" == typeof exports)
        module.exports = factory();
    else {
        var OldCookies = window.Cookies
          , api = window.Cookies = factory();
        api.noConflict = function() {
            return window.Cookies = OldCookies,
            api
        }
    }
}(function() {
    function extend() {
        for (var i = 0, result = {}; i < arguments.length; i++) {
            var attributes = arguments[i];
            for (var key in attributes)
                result[key] = attributes[key]
        }
        return result
    }
    function init(converter) {
        function api(key, value, attributes) {
            var result;
            if ("undefined" != typeof document) {
                if (1 < arguments.length) {
                    if ("number" == typeof (attributes = extend({
                        path: "/"
                    }, api.defaults, attributes)).expires) {
                        var expires = new Date;
                        expires.setMilliseconds(expires.getMilliseconds() + 864e5 * attributes.expires),
                        attributes.expires = expires
                    }
                    try {
                        result = JSON.stringify(value),
                        /^[\{\[]/.test(result) && (value = result)
                    } catch (e) {}
                    return value = converter.write ? converter.write(value, key) : encodeURIComponent(String(value)).replace(/%(23|24|26|2B|3A|3C|3E|3D|2F|3F|40|5B|5D|5E|60|7B|7D|7C)/g, decodeURIComponent),
                    key = (key = (key = encodeURIComponent(String(key))).replace(/%(23|24|26|2B|5E|60|7C)/g, decodeURIComponent)).replace(/[\(\)]/g, escape),
                    document.cookie = [key, "=", value, attributes.expires && "; expires=" + attributes.expires.toUTCString(), attributes.path && "; path=" + attributes.path, attributes.domain && "; domain=" + attributes.domain, attributes.secure ? "; secure" : ""].join("")
                }
                key || (result = {});
                for (var cookies = document.cookie ? document.cookie.split("; ") : [], rdecode = /(%[0-9A-Z]{2})+/g, i = 0; i < cookies.length; i++) {
                    var parts = cookies[i].split("=")
                      , name = parts[0].replace(rdecode, decodeURIComponent)
                      , cookie = parts.slice(1).join("=");
                    '"' === cookie.charAt(0) && (cookie = cookie.slice(1, -1));
                    try {
                        if (cookie = converter.read ? converter.read(cookie, name) : converter(cookie, name) || cookie.replace(rdecode, decodeURIComponent),
                        this.json)
                            try {
                                cookie = JSON.parse(cookie)
                            } catch (e) {}
                        if (key === name) {
                            result = cookie;
                            break
                        }
                        key || (result[name] = cookie)
                    } catch (e) {}
                }
                return result
            }
        }
        return (api.set = api).get = function(key) {
            return api(key)
        }
        ,
        api.getJSON = function() {
            return api.apply({
                json: !0
            }, [].slice.call(arguments))
        }
        ,
        api.defaults = {},
        api.remove = function(key, attributes) {
            api(key, "", extend(attributes, {
                expires: -1
            }))
        }
        ,
        api.withConverter = init,
        api
    }
    return init(function() {})
}),
function() {
    var ajaxRequest, browser_go, handleAppImages, handleBackgroundImages, handleClickEvents, openApp, openAppstore, runner, saveAppTry, saveAppstoreTry, saveFallbackUrlTry, setAppOpenGo, setClearGo, setDelays, updateHit, root, factory;
    root = this,
    factory = function() {
        var addEvent, customEvent, doc, hidden, idleStartedTime, idleTime, ie, ifvisible, init, initialized, status, trackIdleStatus, visibilityChange, cgid, listeners, setListener;
        return ifvisible = {},
        doc = document,
        initialized = !1,
        status = "active",
        idleStartedTime = !(idleTime = 6e4),
        function() {
            return (65536 * (1 + Math.random()) | 0).toString(16).substring(1)
        }
        ,
        listeners = {},
        cgid = "__ceGUID",
        setListener = !(customEvent = {
            add: function(obj, event, callback) {
                return obj[cgid] = undefined,
                obj[cgid] || (obj[cgid] = "ifvisible.object.event.identifier"),
                listeners[obj[cgid]] || (listeners[obj[cgid]] = {}),
                listeners[obj[cgid]][event] || (listeners[obj[cgid]][event] = []),
                listeners[obj[cgid]][event].push(callback)
            },
            remove: function(obj, event, callback) {
                var cl, i, j, len, ref;
                if (callback) {
                    if (obj[cgid] && listeners[obj[cgid]] && listeners[obj[cgid]][event])
                        for (i = j = 0,
                        len = (ref = listeners[obj[cgid]][event]).length; j < len; i = ++j)
                            if ((cl = ref[i]) === callback)
                                return listeners[obj[cgid]][event].splice(i, 1),
                                cl
                } else if (obj[cgid] && listeners[obj[cgid]] && listeners[obj[cgid]][event])
                    return delete listeners[obj[cgid]][event]
            },
            fire: function(obj, event, memo) {
                var ev, j, len, ref, results;
                if (obj[cgid] && listeners[obj[cgid]] && listeners[obj[cgid]][event]) {
                    for (results = [],
                    j = 0,
                    len = (ref = listeners[obj[cgid]][event]).length; j < len; j++)
                        ev = ref[j],
                        results.push(ev(memo || {}));
                    return results
                }
            }
        }),
        addEvent = function(el, ev, fn) {
            return setListener || (setListener = el.addEventListener ? function(el, ev, fn) {
                return el.addEventListener(ev, fn, !1)
            }
            : el.attachEvent ? function(el, ev, fn) {
                return el.attachEvent("on" + ev, fn, !1)
            }
            : function(el, ev, fn) {
                return el["on" + ev] = fn
            }
            ),
            setListener(el, ev, fn)
        }
        ,
        function(element, event) {
            var evt;
            return doc.createEventObject ? element.fireEvent("on" + event, evt) : ((evt = doc.createEvent("HTMLEvents")).initEvent(event, !0, !0),
            !element.dispatchEvent(evt))
        }
        ,
        ie = function() {
            var all, check, div, undef, v;
            for (undef = void 0,
            v = 3,
            div = doc.createElement("div"),
            all = div.getElementsByTagName("i"),
            check = function() {
                return div.innerHTML = "<!--[if gt IE " + ++v + "]><i></i><![endif]-->",
                all[0]
            }
            ; check(); )
                ;
            return 4 < v ? v : undef
        }(),
        hidden = !1,
        visibilityChange = void 0,
        "undefined" != typeof doc.hidden ? (hidden = "hidden",
        visibilityChange = "visibilitychange") : "undefined" != typeof doc.mozHidden ? (hidden = "mozHidden",
        visibilityChange = "mozvisibilitychange") : "undefined" != typeof doc.msHidden ? (hidden = "msHidden",
        visibilityChange = "msvisibilitychange") : "undefined" != typeof doc.webkitHidden && (hidden = "webkitHidden",
        visibilityChange = "webkitvisibilitychange"),
        trackIdleStatus = function() {
            var timer, wakeUp;
            return timer = [],
            (wakeUp = function() {
                return timer.map(clearTimeout),
                "active" !== status && ifvisible.wakeup(),
                idleStartedTime = +new Date,
                timer.push(setTimeout(function() {
                    if ("active" === status)
                        return ifvisible.idle()
                }, idleTime))
            }
            )(),
            addEvent(doc, "mousemove", wakeUp),
            addEvent(doc, "keyup", wakeUp),
            addEvent(doc, "touchstart", wakeUp),
            addEvent(window, "scroll", wakeUp),
            ifvisible.focus(wakeUp),
            ifvisible.wakeup(wakeUp)
        }
        ,
        init = function() {
            var blur;
            return !!initialized || (!1 === hidden ? (blur = "blur",
            ie < 9 && (blur = "focusout"),
            addEvent(window, blur, function() {
                return ifvisible.blur()
            }),
            addEvent(window, "focus", function() {
                return ifvisible.focus()
            })) : addEvent(doc, visibilityChange, function() {
                return doc[hidden] ? ifvisible.blur() : ifvisible.focus()
            }, !1),
            initialized = !0,
            trackIdleStatus())
        }
        ,
        ifvisible = {
            setIdleDuration: function(seconds) {
                return idleTime = 1e3 * seconds
            },
            getIdleDuration: function() {
                return idleTime
            },
            getIdleInfo: function() {
                var now, res;
                return now = +new Date,
                res = {},
                "idle" === status ? (res.isIdle = !0,
                res.idleFor = now - idleStartedTime,
                res.timeLeft = 0,
                res.timeLeftPer = 100) : (res.isIdle = !1,
                res.idleFor = now - idleStartedTime,
                res.timeLeft = idleStartedTime + idleTime - now,
                res.timeLeftPer = (100 - 100 * res.timeLeft / idleTime).toFixed(2)),
                res
            },
            focus: function(callback) {
                return "function" == typeof callback ? this.on("focus", callback) : (status = "active",
                customEvent.fire(this, "focus"),
                customEvent.fire(this, "wakeup"),
                customEvent.fire(this, "statusChanged", {
                    status: status
                })),
                this
            },
            blur: function(callback) {
                return "function" == typeof callback ? this.on("blur", callback) : (status = "hidden",
                customEvent.fire(this, "blur"),
                customEvent.fire(this, "idle"),
                customEvent.fire(this, "statusChanged", {
                    status: status
                })),
                this
            },
            idle: function(callback) {
                return "function" == typeof callback ? this.on("idle", callback) : (status = "idle",
                customEvent.fire(this, "idle"),
                customEvent.fire(this, "statusChanged", {
                    status: status
                })),
                this
            },
            wakeup: function(callback) {
                return "function" == typeof callback ? this.on("wakeup", callback) : (status = "active",
                customEvent.fire(this, "wakeup"),
                customEvent.fire(this, "statusChanged", {
                    status: status
                })),
                this
            },
            on: function(name, callback) {
                return init(),
                customEvent.add(this, name, callback),
                this
            },
            off: function(name, callback) {
                return init(),
                customEvent.remove(this, name, callback),
                this
            },
            onEvery: function(seconds, callback) {
                var paused, t;
                return init(),
                paused = !1,
                callback && (t = setInterval(function() {
                    if ("active" === status && !1 === paused)
                        return callback()
                }, 1e3 * seconds)),
                {
                    stop: function() {
                        return clearInterval(t)
                    },
                    pause: function() {
                        return paused = !0
                    },
                    resume: function() {
                        return paused = !1
                    },
                    code: t,
                    callback: callback
                }
            },
            now: function(check) {
                return init(),
                status === (check || "active")
            }
        }
    }
    ,
    "function" == typeof define && define.amd ? define(function() {
        return factory()
    }) : "object" == typeof exports ? module.exports = factory() : root.ifvisible = factory(),
    $(document).ajaxSend(function(e, xhr) {
        var token;
        token = $("meta[name='csrf-token']").attr("content"),
        xhr.setRequestHeader("X-CSRF-Token", token)
    }),
    $(document).ready(function() {
        return window.isMobile = {
            Android: function() {
                return /Android/i.test(navigator.userAgent)
            },
            BlackBerry: function() {
                return /BlackBerry/i.test(navigator.userAgent)
            },
            iOS: function() {
                return /iPhone|iPad|iPod/i.test(navigator.userAgent)
            },
            Windows: function() {
                return /IEMobile/i.test(navigator.userAgent)
            },
            any: function() {
                return isMobile.Android() || isMobile.BlackBerry() || isMobile.iOS() || isMobile.Windows()
            }
        },
        runner()
    }),
    ajaxRequest = function() {
        var activexmodes, i;
        if (activexmodes = ["Msxml2.XMLHTTP", "Microsoft.XMLHTTP"],
        !window.ActiveXObject)
            return !!window.XMLHttpRequest && new XMLHttpRequest;
        for (i = 0; i < activexmodes.length; ) {
            try {
                return new ActiveXObject(activexmodes[i])
            } catch (error) {
                error
            }
            i++
        }
    }
    ,
    handleBackgroundImages = function() {
        return null != window.background_image_1440 && null != window.background_image_2880 ? 1440 < $(document).width() || 1440 < $(document).height() ? (console.log("F"),
        $("html").css("background-image", "url(" + window.background_image_2880 + ")")) : (console.log("a"),
        $("html").css("background-image", "url(" + window.background_image_1440 + ")")) : ($(".dumbBoxOverlay").css("display", "none"),
        $(".appBox").css("background-color", "transparent"))
    }
    ,
    handleAppImages = function() {
        var app;
        if (app = window.app.toLowerCase(),
        window.app_icon ? $("#app-download-img").attr("src", window.app_icon) : "android" === window.os_family.toLowerCase() ? ($("#app-download-img").attr("src", "/assets/google_play_store.png"),
        $("#app-download-img2").attr("src", "/assets/google_play_store.png")) : "ios" === window.os_family.toLowerCase() && ($("#app-download-img").attr("src", "/assets/app_store_icon.png"),
        $("#app-download-img2").attr("src", "/assets/app_store_icon.png")),
        "custom" === app)
            return $("#app-img").hide()
    }
    ,
    setDelays = function() {
        if (window.app_open_delay = 1e3,
        window.appstore_open_delay = 1e3,
        window.isMobile.iOS() && (window.delay_check = 100 + 1e3 * window.ios_delay,
        window.delay = 1e3 * window.ios_delay,
        window.app_open_delay = 1e3 * window.ios_delay,
        window.appstore_open_delay = 1e3 * window.ios_delay,
        window.total_delay = window.app_open_delay + window.app_store_open_delay,
        window.action_success = !1,
        window.app_open_delay < 250 && (window.app_open_delay = 250),
        window.appstore_open_delay < 250))
            return window.appstore_open_delay = 250
    }
    ,
    handleClickEvents = function() {
        return window.location.href.includes("disabled=true") && $("#choice_page_link_to_urlg").click(function() {
            return !1
        }),
        $("#browser-button").click(function() {
            return !window.location.href.includes("disabled=true") && browser_go()
        }),
        $("#browser-text").click(function(event) {
            return window.location.href.includes("disabled=true") || (event.preventDefault(),
            browser_go()),
            !1
        }),
        $("#app-button").click(function() {
            return !window.location.href.includes("disabled=true") && setAppOpenGo()
        }),
        $("#app-text").click(function(event) {
            return window.location.href.includes("disabled=true") || (event.preventDefault(),
            setAppOpenGo()),
            !1
        })
    }
    ,
    setAppOpenGo = function() {
        return Cookies.set("urlgAction", "openApp", {
            domain: window.domain
        }),
        window.location = window.launch_url
    }
    ,
    setClearGo = function() {
        return Cookies.set("urlgAction", "clearAll", {
            domain: window.domain
        }),
        window.location = window.launch_url
    }
    ,
    openApp = function() {
        var startAt;
        return console.log("launch.coffee openApp"),
        saveAppTry(),
        startAt = (new Date).getTime(),
        window.location = window.app_scheme,
        setTimeout(function() {
            if ((new Date).getTime() - startAt < 5e3)
                return window.location = window.location.href + "?app_installed=false"
        }, window.app_open_delay)
    }
    ,
    openAppstore = function() {
        var startAt;
        return saveAppstoreTry(),
        startAt = (new Date).getTime(),
        window.location = window.app_store_url,
        setTimeout(function() {
            if ((new Date).getTime() - startAt < 5e3)
                return setClearGo()
        }, window.app_open_delay)
    }
    ,
    saveAppTry = function() {
        return updateHit("?app_opened=true")
    }
    ,
    saveAppstoreTry = function() {
        var str;
        return str = "?app_opened=false&app_downloaded=" + !document.hidden,
        updateHit(str)
    }
    ,
    saveFallbackUrlTry = function() {
        return updateHit("?app_opened=false&app_downloaded=false")
    }
    ,
    updateHit = function(str) {
        var mypostrequest;
        return (mypostrequest = new ajaxRequest).open("GET", window.hit_update_qs_update_path + str, !0),
        mypostrequest.setRequestHeader("Content-type", "application/x-www-form-urlencoded"),
        mypostrequest.send()
    }
    ,
    runner = function() {
        return handleAppImages(),
        setDelays(),
        handleBackgroundImages(),
        -1 === window.location.href.indexOf("/android") && -1 === window.location.href.indexOf("/ios") ? ($("#app-button").click(function() {
            return window.location = window.app_store_url
        }),
        void $(".isoCard").click(function() {
            return event.preventDefault(),
            window.location = window.app_store_url
        })) : (console.log("Runner----"),
        window.app_store_url && console.log(window.app_store_url),
        window.app_scheme && console.log(window.app_scheme),
        console.log("Domain: " + window.domain),
        window.action = Cookies.get("urlgAction", {
            domain: window.domain
        }),
        console.log("Action: " + window.action),
        "openApp" === window.action && (Cookies.remove("urlgAction", {
            domain: window.domain
        }),
        openApp()),
        "openAppstore" === window.action && (Cookies.remove("urlgAction", {
            domain: window.domain
        }),
        document.hidden || openAppstore()),
        "clearAll" === window.action && (Cookies.remove("urlgAction", {
            domain: window.domain
        }),
        document.hidden || saveFallbackUrlTry()),
        window.location.href.includes("app_opened=false") && updateHit("?app_opened=false"),
        handleClickEvents())
    }
    ,
    browser_go = function() {
        var hip, url;
        return hip = window.hit_update_path,
        url = window.mobile_web,
        null != window.special && "" !== window.special && " " !== window.special && (url = window.special),
        console.log(url),
        $.ajax({
            type: "PUT",
            data: {
                hit: {
                    app_opened: !1
                }
            },
            dataType: "json",
            url: hip,
            complete: function() {
                return window.location.href = url
            }
        })
    }
}
.call(this);
