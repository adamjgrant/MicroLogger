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
                id: 'Rectangle',
                type: 'rect',
                rect: ['20px', '23px','498px','342px','auto', 'auto'],
                fill: ["rgba(255,255,255,1.00)"],
                stroke: [6,"rgba(0,0,0,1)","dashed"]
            },
            {
                id: 'Rectangle2',
                type: 'rect',
                rect: ['162px', '32px','226px','336px','auto', 'auto'],
                fill: ["rgba(227,226,226,1.00)"],
                stroke: [6,"rgb(0, 0, 0)","none"]
            },
            {
                id: 'Text',
                type: 'text',
                rect: ['212px', '84px','125px','60px','auto', 'auto'],
                text: "Content",
                align: "center",
                font: ['Courier, Courier New, monospace', 17, "rgba(0,0,0,1)", "normal", "none", ""]
            },
            {
                id: 'TextCopy',
                type: 'text',
                rect: ['212px', '170px','125px','60px','auto', 'auto'],
                text: "Viewport",
                align: "center",
                font: ['Courier, Courier New, monospace', 17, "rgba(0,0,0,1)", "normal", "none", ""]
            }],
            symbolInstances: [

            ]
        },
    states: {
        "Base State": {
            "${_Rectangle2}": [
                ["style", "top", '32px'],
                ["color", "background-color", 'rgba(227,226,226,1.00)'],
                ["style", "height", '124px'],
                ["style", "border-style", 'none'],
                ["style", "left", '162px'],
                ["style", "width", '226px']
            ],
            "${_Text}": [
                ["style", "top", '84px'],
                ["style", "text-align", 'center'],
                ["style", "font-family", 'Courier, Courier New, monospace'],
                ["style", "left", '212px'],
                ["style", "font-size", '17px']
            ],
            "${_Stage}": [
                ["color", "background-color", 'rgba(255,255,255,1)'],
                ["style", "width", '550px'],
                ["style", "height", '200px'],
                ["style", "overflow", 'hidden']
            ],
            "${_Rectangle}": [
                ["color", "background-color", 'rgba(255,255,255,1.00)'],
                ["style", "top", '23px'],
                ["style", "border-width", '6px'],
                ["style", "height", '130px'],
                ["style", "border-style", 'dashed'],
                ["style", "left", '20px'],
                ["style", "width", '498px']
            ],
            "${_TextCopy}": [
                ["style", "top", '170px'],
                ["style", "text-align", 'center'],
                ["style", "font-family", 'Courier, Courier New, monospace'],
                ["style", "left", '212px'],
                ["style", "font-size", '17px']
            ]
        }
    },
    timelines: {
        "Default Timeline": {
            fromState: "Base State",
            toState: "",
            duration: 4000,
            autoPlay: true,
            timeline: [
                { id: "eid18", tween: [ "style", "${_Rectangle2}", "top", '32px', { fromValue: '32px'}], position: 0, duration: 0, easing: "swing" },
                { id: "eid26", tween: [ "style", "${_Rectangle2}", "top", '32px', { fromValue: '32px'}], position: 1394, duration: 0, easing: "swing" },
                { id: "eid34", tween: [ "style", "${_Rectangle2}", "top", '32px', { fromValue: '32px'}], position: 2000, duration: 0, easing: "swing" },
                { id: "eid30", tween: [ "style", "${_Rectangle2}", "top", '32px', { fromValue: '32px'}], position: 2614, duration: 0, easing: "swing" },
                { id: "eid22", tween: [ "style", "${_Rectangle2}", "top", '32px', { fromValue: '32px'}], position: 4000, duration: 0, easing: "swing" },
                { id: "eid7", tween: [ "style", "${_Rectangle}", "top", '23px', { fromValue: '23px'}], position: 0, duration: 0 },
                { id: "eid3", tween: [ "style", "${_Rectangle}", "top", '23px', { fromValue: '23px'}], position: 2000, duration: 0 },
                { id: "eid12", tween: [ "style", "${_Rectangle}", "top", '23px', { fromValue: '23px'}], position: 4000, duration: 0 },
                { id: "eid42", tween: [ "style", "${_Rectangle2}", "height", '122px', { fromValue: '124px'}], position: 0, duration: 1394 },
                { id: "eid44", tween: [ "style", "${_Rectangle2}", "height", '124px', { fromValue: '122px'}], position: 1394, duration: 606 },
                { id: "eid48", tween: [ "style", "${_Rectangle2}", "height", '123px', { fromValue: '124px'}], position: 2000, duration: 614 },
                { id: "eid49", tween: [ "style", "${_Rectangle2}", "height", '124px', { fromValue: '123px'}], position: 2614, duration: 1386 },
                { id: "eid41", tween: [ "style", "${_Rectangle}", "height", '128px', { fromValue: '130px'}], position: 0, duration: 1394 },
                { id: "eid45", tween: [ "style", "${_Rectangle}", "height", '129px', { fromValue: '128px'}], position: 1394, duration: 606 },
                { id: "eid52", tween: [ "style", "${_Rectangle}", "height", '130px', { fromValue: '129px'}], position: 2000, duration: 614 },
                { id: "eid53", tween: [ "style", "${_Rectangle}", "height", '129px', { fromValue: '130px'}], position: 2614, duration: 1386 },
                { id: "eid17", tween: [ "style", "${_Rectangle2}", "left", '162px', { fromValue: '162px'}], position: 0, duration: 0, easing: "swing" },
                { id: "eid37", tween: [ "style", "${_Rectangle2}", "left", '221px', { fromValue: '162px'}], position: 1394, duration: 606 },
                { id: "eid38", tween: [ "style", "${_Rectangle2}", "left", '162px', { fromValue: '221px'}], position: 2000, duration: 614 },
                { id: "eid21", tween: [ "style", "${_Rectangle2}", "left", '162px', { fromValue: '162px'}], position: 4000, duration: 0, easing: "swing" },
                { id: "eid19", tween: [ "style", "${_Rectangle2}", "width", '226px', { fromValue: '226px'}], position: 0, duration: 0, easing: "swing" },
                { id: "eid39", tween: [ "style", "${_Rectangle2}", "width", '106px', { fromValue: '226px'}], position: 1394, duration: 606 },
                { id: "eid40", tween: [ "style", "${_Rectangle2}", "width", '226px', { fromValue: '106px'}], position: 2000, duration: 614 },
                { id: "eid23", tween: [ "style", "${_Rectangle2}", "width", '226px', { fromValue: '226px'}], position: 4000, duration: 0, easing: "swing" },
                { id: "eid10", tween: [ "style", "${_Rectangle}", "width", '111px', { fromValue: '498px'}], position: 0, duration: 2000 },
                { id: "eid15", tween: [ "style", "${_Rectangle}", "width", '498px', { fromValue: '111px'}], position: 2000, duration: 2000 },
                { id: "eid11", tween: [ "style", "${_Rectangle}", "left", '213px', { fromValue: '20px'}], position: 0, duration: 2000 },
                { id: "eid14", tween: [ "style", "${_Rectangle}", "left", '20px', { fromValue: '213px'}], position: 2000, duration: 2000 }            ]
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
})(jQuery, AdobeEdge, "EDGE-116087028");
