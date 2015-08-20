/*jslint */
/*global AdobeEdge: false, window: false, document: false, console:false, alert: false */
(function (compId) {

    "use strict";
    var im='images/',
        aud='media/',
        vid='media/',
        js='js/',
        fonts = {
        },
        opts = {
            'gAudioPreloadPreference': 'auto',
            'gVideoPreloadPreference': 'auto'
        },
        resources = [
        ],
        scripts = [
            js+"jquery-2.0.3.min.js"
        ],
        symbols = {
            "stage": {
                version: "5.0.0",
                minimumCompatibleVersion: "5.0.0",
                build: "5.0.0.375",
                scaleToFit: "width",
                centerStage: "none",
                resizeInstances: false,
                content: {
                    dom: [
                        {
                            id: 'Text',
                            type: 'text',
                            rect: ['1', '154', '139px', '20px', 'auto', 'auto'],
                            text: "<br>",
                            align: "center",
                            font: ['Courier, Courier New, monospace', [24, ""], "rgba(0,0,0,1)", "normal", "none", "", "break-word", ""]
                        },
                        {
                            id: 'cloud-up',
                            type: 'image',
                            rect: ['76px', '11px', '128px', '128px', 'auto', 'auto'],
                            opacity: 0.25495427846909,
                            fill: ["rgba(0,0,0,0)",im+"cloud-up.png",'0px','0px']
                        },
                        {
                            id: 'cloud-down',
                            type: 'image',
                            rect: ['320px', '11px', '128px', '128px', 'auto', 'auto'],
                            opacity: 0.24920605123043,
                            fill: ["rgba(0,0,0,0)",im+"cloud-down.png",'0px','0px']
                        }
                    ],
                    style: {
                        '${Stage}': {
                            isStage: true,
                            rect: ['null', 'null', '540', '190', 'auto', 'auto'],
                            overflow: 'hidden',
                            fill: ["rgba(255,255,255,1)"]
                        }
                    }
                },
                timeline: {
                    duration: 4000,
                    autoPlay: true,
                    data: [
                        [
                            "eid40",
                            "opacity",
                            0,
                            250,
                            "linear",
                            "${cloud-down}",
                            '0.249206',
                            '1'
                        ],
                        [
                            "eid41",
                            "opacity",
                            250,
                            250,
                            "linear",
                            "${cloud-down}",
                            '1',
                            '0.25225482723577'
                        ],
                        [
                            "eid44",
                            "opacity",
                            1007,
                            250,
                            "linear",
                            "${cloud-down}",
                            '0.249206',
                            '1'
                        ],
                        [
                            "eid43",
                            "opacity",
                            1257,
                            250,
                            "linear",
                            "${cloud-down}",
                            '1',
                            '0.25225482723577'
                        ],
                        [
                            "eid46",
                            "opacity",
                            2000,
                            250,
                            "linear",
                            "${cloud-down}",
                            '0.249206',
                            '1'
                        ],
                        [
                            "eid45",
                            "opacity",
                            2250,
                            250,
                            "linear",
                            "${cloud-down}",
                            '1',
                            '0.25225482723577'
                        ],
                        [
                            "eid48",
                            "opacity",
                            3000,
                            250,
                            "linear",
                            "${cloud-down}",
                            '0.249206',
                            '1'
                        ],
                        [
                            "eid47",
                            "opacity",
                            3250,
                            250,
                            "linear",
                            "${cloud-down}",
                            '1',
                            '0.25225482723577'
                        ],
                        [
                            "eid30",
                            "opacity",
                            0,
                            250,
                            "linear",
                            "${cloud-up}",
                            '0.254954',
                            '1'
                        ],
                        [
                            "eid31",
                            "opacity",
                            250,
                            250,
                            "linear",
                            "${cloud-up}",
                            '1',
                            '0.254954'
                        ],
                        [
                            "eid36",
                            "opacity",
                            500,
                            250,
                            "linear",
                            "${cloud-up}",
                            '0.254954',
                            '1'
                        ],
                        [
                            "eid34",
                            "opacity",
                            750,
                            250,
                            "linear",
                            "${cloud-up}",
                            '1',
                            '0.254954'
                        ],
                        [
                            "eid37",
                            "opacity",
                            1000,
                            250,
                            "linear",
                            "${cloud-up}",
                            '0.254954',
                            '1'
                        ],
                        [
                            "eid35",
                            "opacity",
                            1250,
                            250,
                            "linear",
                            "${cloud-up}",
                            '1',
                            '0.254954'
                        ],
                        [
                            "eid50",
                            "opacity",
                            1500,
                            250,
                            "linear",
                            "${cloud-up}",
                            '0.254954',
                            '1'
                        ],
                        [
                            "eid49",
                            "opacity",
                            1750,
                            250,
                            "linear",
                            "${cloud-up}",
                            '1',
                            '0.254954'
                        ],
                        [
                            "eid42",
                            "opacity",
                            4000,
                            0,
                            "linear",
                            "${cloud-up}",
                            '0.254954',
                            '0.254954'
                        ]
                    ]
                }
            }
        };

    AdobeEdge.registerCompositionDefn(compId, symbols, fonts, scripts, resources, opts);

    if (!window.edge_authoring_mode) AdobeEdge.getComposition(compId).load("buffer_edgeActions.js");
})("EDGE-112562383");
