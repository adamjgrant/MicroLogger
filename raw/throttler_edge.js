/**
 * Adobe Edge: symbol definitions
 */
(function($, Edge, compId){
//images folder
var im='images/';

var fonts = {};
var opts = {
    'gAudioPreloadPreference': 'auto',

    'gVideoPreloadPreference': 'auto'
};
var resources = [
];
var symbols = {
"stage": {
    version: "4.0.1",
    minimumCompatibleVersion: "4.0.1",
    build: "4.0.1.365",
    baseState: "Base State",
    scaleToFit: "width",
    centerStage: "none",
    initialState: "Base State",
    gpuAccelerate: false,
    resizeInstances: false,
    content: {
            dom: [
            {
                id: 'Ellipse',
                type: 'ellipse',
                rect: ['39px', '61px','128px','128px','auto', 'auto'],
                borderRadius: ["50%", "50%", "50%", "50%"],
                fill: ["rgba(192,192,192,1)"],
                stroke: [0,"rgba(0,0,0,1)","none"]
            },
            {
                id: 'EllipseCopy',
                type: 'ellipse',
                rect: ['432px', '61px','128px','128px','auto', 'auto'],
                borderRadius: ["50%", "50%", "50%", "50%"],
                fill: ["rgba(192,192,192,1)"],
                stroke: [0,"rgba(0,0,0,1)","none"]
            },
            {
                id: 'Text',
                type: 'text',
                rect: ['1px', '154px','139px','20px','auto', 'auto'],
                text: "Input",
                align: "center",
                font: ['Courier, Courier New, monospace', 24, "rgba(0,0,0,1)", "normal", "none", ""]
            },
            {
                id: 'TextCopy',
                type: 'text',
                rect: ['398px', '154px','139px','20px','auto', 'auto'],
                text: "Output",
                align: "center",
                font: ['Courier, Courier New, monospace', 24, "rgba(0,0,0,1)", "normal", "none", ""]
            }],
            symbolInstances: [

            ]
        },
    states: {
        "Base State": {
            "${_Text}": [
                ["style", "top", '154px'],
                ["style", "font-family", 'Courier, Courier New, monospace'],
                ["style", "left", '1px'],
                ["style", "text-align", 'center']
            ],
            "${_Stage}": [
                ["color", "background-color", 'rgba(255,255,255,1)'],
                ["style", "overflow", 'hidden'],
                ["style", "height", '190px'],
                ["style", "width", '540px']
            ],
            "${_EllipseCopy}": [
                ["style", "top", '11px'],
                ["style", "left", '403px'],
                ["color", "background-color", 'rgba(216,205,180,1.00)']
            ],
            "${_TextCopy}": [
                ["style", "top", '154px'],
                ["style", "font-family", 'Courier, Courier New, monospace'],
                ["style", "left", '398px'],
                ["style", "text-align", 'center']
            ],
            "${_Ellipse}": [
                ["style", "top", '11px'],
                ["style", "left", '10px'],
                ["color", "background-color", 'rgba(216,205,180,1.00)']
            ]
        }
    },
    timelines: {
        "Default Timeline": {
            fromState: "Base State",
            toState: "",
            duration: 2000,
            autoPlay: true,
            timeline: [
                { id: "eid20", tween: [ "style", "${_Ellipse}", "top", '11px', { fromValue: '11px'}], position: 2000, duration: 0, easing: "swing" },
                { id: "eid18", tween: [ "style", "${_EllipseCopy}", "top", '11px', { fromValue: '11px'}], position: 2000, duration: 0, easing: "swing" },
                { id: "eid23", tween: [ "style", "${_Ellipse}", "left", '10px', { fromValue: '10px'}], position: 2000, duration: 0, easing: "swing" },
                { id: "eid26", tween: [ "color", "${_EllipseCopy}", "background-color", 'rgba(216,205,180,1.00)', { animationColorSpace: 'RGB', valueTemplate: undefined, fromValue: 'rgba(216,205,180,1.00)'}], position: 0, duration: 0, easing: "swing" },
                { id: "eid17", tween: [ "color", "${_EllipseCopy}", "background-color", 'rgba(253,215,38,1.00)', { animationColorSpace: 'RGB', valueTemplate: undefined, fromValue: 'rgba(216,205,180,1.00)'}], position: 1500, duration: 250, easing: "swing" },
                { id: "eid27", tween: [ "color", "${_EllipseCopy}", "background-color", 'rgba(216,205,180,1.00)', { animationColorSpace: 'RGB', valueTemplate: undefined, fromValue: 'rgba(253,215,38,1.00)'}], position: 1750, duration: 250, easing: "swing" },
                { id: "eid22", tween: [ "style", "${_EllipseCopy}", "left", '403px', { fromValue: '403px'}], position: 2000, duration: 0, easing: "swing" },
                { id: "eid4", tween: [ "color", "${_Ellipse}", "background-color", 'rgba(253,215,38,1.00)', { animationColorSpace: 'RGB', valueTemplate: undefined, fromValue: 'rgba(216,205,180,1.00)'}], position: 0, duration: 250, easing: "swing" },
                { id: "eid5", tween: [ "color", "${_Ellipse}", "background-color", 'rgba(216,205,180,1.00)', { animationColorSpace: 'RGB', valueTemplate: undefined, fromValue: 'rgba(253,215,38,1.00)'}], position: 250, duration: 250, easing: "swing" },
                { id: "eid6", tween: [ "color", "${_Ellipse}", "background-color", 'rgba(253,215,38,1.00)', { animationColorSpace: 'RGB', valueTemplate: undefined, fromValue: 'rgba(216,205,180,1.00)'}], position: 500, duration: 250, easing: "swing" },
                { id: "eid7", tween: [ "color", "${_Ellipse}", "background-color", 'rgba(216,205,180,1.00)', { animationColorSpace: 'RGB', valueTemplate: undefined, fromValue: 'rgba(253,215,38,1.00)'}], position: 750, duration: 250, easing: "swing" },
                { id: "eid8", tween: [ "color", "${_Ellipse}", "background-color", 'rgba(253,215,38,1.00)', { animationColorSpace: 'RGB', valueTemplate: undefined, fromValue: 'rgba(216,205,180,1.00)'}], position: 1000, duration: 250, easing: "swing" },
                { id: "eid9", tween: [ "color", "${_Ellipse}", "background-color", 'rgba(216,205,180,1.00)', { animationColorSpace: 'RGB', valueTemplate: undefined, fromValue: 'rgba(253,215,38,1.00)'}], position: 1250, duration: 250, easing: "swing" },
                { id: "eid10", tween: [ "color", "${_Ellipse}", "background-color", 'rgba(253,215,38,1.00)', { animationColorSpace: 'RGB', valueTemplate: undefined, fromValue: 'rgba(216,205,180,1.00)'}], position: 1500, duration: 250, easing: "swing" },
                { id: "eid11", tween: [ "color", "${_Ellipse}", "background-color", 'rgba(216,205,180,1.00)', { animationColorSpace: 'RGB', valueTemplate: undefined, fromValue: 'rgba(253,215,38,1.00)'}], position: 1750, duration: 250, easing: "swing" }            ]
        }
    }
}
};


Edge.registerCompositionDefn(compId, symbols, fonts, resources, opts);

/**
 * Adobe Edge DOM Ready Event Handler
 */
$(window).ready(function() {
     Edge.launchComposition(compId);
});
})(jQuery, AdobeEdge, "EDGE-112562383");
