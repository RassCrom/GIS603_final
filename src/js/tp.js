// These options control the camera position after animation
const start = {
    center: [66, 48],
    zoom: 4,
    pitch: 0,
    bearing: 0
};
const bbfPoint = {
    center: [79.20785, 45.0077],
    zoom: 14,
    bearing: 90,
    pitch: 75,
};
const batPoint = {
    center: [74.83143, 47.43429],
    zoom: 14,
    bearing: 79.35608,
    pitch: 56.98072,
};
const ttpPoint = {
    center: [76.9962896, 44.05961],
    zoom: 15.81,
    bearing: 152.9264,
    pitch: 73.9188,
};
const wbutPoint = {
    center: [77.1170973, 43.1696826],
    zoom: 14.74,
    bearing: 112.14607,
    pitch: 76.1594,
};
const kainPoint = {
    center: [78.4676862, 42.9771830],
    zoom: 13.90,
    bearing: 158.0138,
    pitch: 77.0389,
};

mapboxgl.accessToken = 'pk.eyJ1IjoicmFzc2Nyb20iLCJhIjoiY2wyNzlrcDY2MGk5cDNqcW5wZW9mZW5kciJ9.zdI6zJ4KbGx-V8mq1KoUCg';
const map = new mapboxgl.Map({
    container: 'map',
    // Replace YOUR_STYLE_URL with your style URL.
    style: 'mapbox://styles/rasscrom/clakuosq8000o15lg131x1p4b',
    projection: 'globe',
    ...start,
});

var sideIcon = document.getElementById('side-icon');
    btnSideBar = document.getElementById('btn');
    leftBar = document.getElementById('left-sidebar');
    btnFullscreen = document.getElementById('btn-fullscreen');
    rndm = document.getElementById('random');
    home = document.getElementById('btn-home');

const styleSideBar = window.getComputedStyle(leftBar);
const matrix = styleSideBar.transform || styleSideBar.webkitTransform || styleSideBar.mozTransform
const matrixValues = matrix.match(/matrix.*\((.+)\)/)[1].split(', ');

const animateSideBar = () => {
    let changeIconSide = document.getElementById('side-bar')
    if (leftBar.classList.contains('close-sidebar')) {
        anime({
            targets: '.left-sidebar',
            translateX: 0,
            opacity: 1,
            easing: 'easeInOutElastic(1, .6)'
        })
        leftBar.classList.remove('close-sidebar');
        changeIconSide.classList.remove('fa-arrow-alt-circle-left')
        changeIconSide.classList.add('fa-arrow-alt-circle-right');
    } else {
        anime({
            targets: '.left-sidebar',
            translateX: 560,
            opacity: 1,
            easing: 'easeInOutElastic(1, .6)'
        })
        leftBar.classList.add('close-sidebar');
        changeIconSide.classList.remove('fa-arrow-alt-circle-right');
        changeIconSide.classList.add('fa-arrow-alt-circle-left');
    }
}

btnSideBar.addEventListener('click', animateSideBar)

// var contextMenu = document.getElementById('context-menu');
// map.on('contextmenu', function (e) {
//     e.preventDefault();
//     contextMenu.style.left = e.point.x + 'px';
//     contextMenu.style.top = e.point.y + 'px';
//     contextMenu.style.display = 'block';
//     copyCoordinates(e.lngLat);
// });
//
// // Copy coordinates to clipboard and hide context menu
// function copyCoordinates(lngLat) {
//     var coordinates = lngLat.lng.toFixed(6) + ', ' + lngLat.lat.toFixed(6);
//     contextMenu.innerHTML = '<div>Coordinates: ' + coordinates + '</div>';
//     var copyButton = document.createElement('button');
//     copyButton.textContent = 'Copy';
//     copyButton.addEventListener('click', function () {
//         navigator.clipboard.writeText(coordinates);
//         contextMenu.style.display = 'none';
//     });
//     contextMenu.appendChild(copyButton);
// }

map.on('click', (event) => {
    // If the user clicked on one of your markers, get its information.
    const features = map.queryRenderedFeatures(event.point, {
        layers: ['mapkz-tp'] // replace with your layer name
    });
    if (!features.length) {
        return;
    }
    const feature = features[0]

    // Code from the next step will go here.
    const popup = new mapboxgl.Popup({ offset: [0, 0] })
    .setLngLat(feature.geometry.coordinates)
    .setHTML(
        `Name: <h3 style='font-size:1.2rem;color:green; margin-bottom:5px;'>${feature.properties.Name}</h3>
        <p>Description:<br> ${feature.properties['Short description']}</p>`
    ).addTo(map);
});

map.on('click', (event) => {
    // If the user clicked on one of your markers, get its information.
    const features = map.queryRenderedFeatures(event.point, {
        layers: ['peaks-6nxjqk'] // replace with your layer name
    });
    if (!features.length) {
        return;
    }
    const feature = features[0]

    // Code from the next step will go here.
    const popup = new mapboxgl.Popup({ offset: [0, 0] })
        .setLngLat(feature.geometry.coordinates)
        .setHTML(
            `Name: <h3 style='font-size:1.2rem;color:green; margin-bottom:5px;'>${feature.properties.Name}</h3>
        <p>Location:<br> ${feature.properties['Location']}</p>`
        ).addTo(map);
});

map.on('mouseenter', ['mapkz-tp', 'peaks-6nxjqk'], function () {
    map.getCanvas().style.cursor = 'pointer';
});

map.on('mouseleave', ['mapkz-tp', 'peaks-6nxjqk'], function () {
    map.getCanvas().style.cursor = '';
});

map.addControl(new mapboxgl.NavigationControl());
map.addControl(new mapboxgl.ScaleControl());
// map.addControl(new mapboxgl.FullscreenControl());

// document.getElementById('buttons').addEventListener('click', (event) => {
//     const language = event.target.id.substr('button-'.length);
//
//     map.setLayoutProperty('country-label', 'text-field', [
//         'get',
//         `name_${language}`
//     ]);
// })

new Accordion('.accordion-container', {
    duration: 400,
    showMultiple: true,
    // onOpen: function(currentElement) {
    //     console.log(currentElement);
    // }
});

// View map fullscreen
function fullScreenToggler() {
    let doc = document;
    elm = document.body;
    changeIconFull = document.getElementById('full');

    if (!doc.fullscreenElement) {
        elm.requestFullscreen()
        changeIconFull.classList.remove('fa-expand')
        changeIconFull.classList.add('fa-compress')
    } else {
        doc.exitFullscreen()
        changeIconFull.classList.remove('fa-compress')
        changeIconFull.classList.add('fa-expand')
    }

    // !doc.fullscreenElement ? elm.requestFullscreen() : doc.exitFullscreen();

}

btnFullscreen.addEventListener('click', fullScreenToggler)

// FLY TO HOME POSITION
const flyToHome = () => {
    map.flyTo({
        center: [66, 48],
        zoom: 4,
        duration: 5000,
        essential: true
    })
}

home.addEventListener('click', flyToHome)


let isAtStart = true;

// FLY to
const bat = document.getElementById('bat')
bat.addEventListener('click', () => {

    map.flyTo({
        ...batPoint,
        duration: 11000,
        essential: true
    })
})

const bbf = document.getElementById('bbf')
bbf.addEventListener('click', () => {

    map.flyTo({
        ...bbfPoint,
        duration: 11000,
        essential: true
    })
})

const ttp = document.getElementById('ttp')
ttp.addEventListener('click', () => {

    map.flyTo({
        ...ttpPoint,
        duration: 11000,
        essential: true
    })
})

const wbut = document.getElementById('wbut')
wbut.addEventListener('click', () => {

    map.flyTo({
        ...wbutPoint,
        duration: 11000,
        essential: true
    })
})

const kain = document.getElementById('kain')
kain.addEventListener('click', () => {

    map.flyTo({
        ...kainPoint,
        duration: 11000,
        essential: true
    })
})

let lat;
let lng;
let bearing;
let pitch;
let zoom;
let i = 0;
let txt = ['Burhan-bulak Falls is the tallest waterfall in Kazakhstan. It is located in the Kora River gorge in the Jongar Alatau mountains. At an altitude of 2000 metres, the Falls are 168 metres long.',
    'Bektauata is a range of mountains in Aktogay District, Karaganda, Kazakhstan. There is almost no vegetation on the slopes of the range, which are bare and rocky. In the valleys and by some of the rockpools there is tree growth, including aspen and willow, as well as shrubs.',
    'Petroglyphs are included in the State list of historical and cultural monuments of local significance of the Almaty region, 2010 as a monument of the "early iron"era. This Dating is incorrect. The monument has been under state protection since 1981, but there is no physical protection at the site.',
    "This place is absolutely amazing and well worth a visit. It's situated only approximately 30 minutes from the city, easy to locate and hard to get lost in. there is a steady climb of a couple kilometres into the mountains and then a very rough couple kilometres through boulders and stinging nettle.",
    "Lake Kaindy is located in the south of Kazakhstan, within Kolsay Lakes National Park. It is located 2,000 metres (6,600 ft) above sea level. The lake contains trunks of submerged Picea schrenkiana trees that rise above the surface of the lake.",
    "",
];
let speed = 30;

function kainFunc(e) {
    lat = map.getCenter().lat;
    lng = map.getCenter().lng.toFixed(7);
    bearing = map.getBearing();
    pitch = map.getPitch();
    zoom = map.getZoom();

    if ((11 <= zoom) && (kainPoint.pitch - 0.5 <= pitch <= kainPoint.pitch + 0.5) && (kainPoint.center[1] - 0.1 <= lat <= kainPoint.center[1] + 0.1) && (parseFloat(lng) === kainPoint.center[0])) {
        document.getElementsByClassName('kain')[0].style.visibility = 'visible';
        document.getElementsByClassName('kain')[0].style.opacity = '1';
        document.getElementsByClassName('kain')[1].style.visibility = 'visible';
        document.getElementsByClassName('kain')[1].style.opacity = '1';
        typedKain.pause(500).go()
    } else {
        document.getElementsByClassName('kain')[0].style.visibility = 'hidden'
        document.getElementsByClassName('kain')[0].style.opacity = '0';
        document.getElementsByClassName('kain')[1].style.visibility = 'hidden'
        document.getElementsByClassName('kain')[1].style.opacity = '0';

    }

}
map.on('render', kainFunc);

let typedKain = new TypeIt("#spanKain", {
    speed: 30,
    strings: [txt[4]],
    cursorChar: "|",
    cursor: {
        autoPause: false,
        animation: {
            options: {
                duration: 1000,
                easing: "linear",
                direction: "alternate",
            },
            frames: [
                {
                    transformOrigin: "0.575em 0.7em",
                    transform: "rotate(0deg) scale(1)",
                },
                {
                    transformOrigin: "0.575em 0.7em",
                    transform: "rotate(360deg) scale(2.5)",
                },
            ],
        },
    },
});

function wbutFunc(e) {
    lat = map.getCenter().lat;
    lng = map.getCenter().lng.toFixed(7);
    bearing = map.getBearing();
    pitch = map.getPitch();
    zoom = map.getZoom();

    if ((11 <= zoom) && (wbutPoint.pitch - 0.5 <= pitch <= wbutPoint.pitch + 0.5) && (wbutPoint.center[1] - 0.1 <= lat <= wbutPoint.center[1] + 0.1) && (parseFloat(lng) === wbutPoint.center[0])) {
        document.getElementsByClassName('wbut')[0].style.visibility = 'visible';
        document.getElementsByClassName('wbut')[0].style.opacity = '1';
        document.getElementsByClassName('wbut')[1].style.visibility = 'visible';
        document.getElementsByClassName('wbut')[1].style.opacity = '1';
        typedWbut.pause(500).go()
    } else {
        document.getElementsByClassName('wbut')[0].style.visibility = 'hidden'
        document.getElementsByClassName('wbut')[0].style.opacity = '0';
        document.getElementsByClassName('wbut')[1].style.visibility = 'hidden'
        document.getElementsByClassName('wbut')[1].style.opacity = '0';

    }

}
map.on('render', wbutFunc);

let typedWbut = new TypeIt("#spanWbut", {
    speed: 30,
    strings: [txt[3]],
    cursorChar: "|",
    cursor: {
        autoPause: false,
        animation: {
            options: {
                duration: 1000,
                easing: "linear",
                direction: "alternate",
            },
            frames: [
                {
                    transformOrigin: "0.575em 0.7em",
                    transform: "rotate(0deg) scale(1)",
                },
                {
                    transformOrigin: "0.575em 0.7em",
                    transform: "rotate(360deg) scale(2.5)",
                },
            ],
        },
    },
});

function ttpFunc(e) {
    lat = map.getCenter().lat;
    lng = map.getCenter().lng.toFixed(7);
    bearing = map.getBearing();
    pitch = map.getPitch();
    zoom = map.getZoom();

    if ((11 <= zoom) && (ttpPoint.pitch - 0.5 <= pitch <= ttpPoint.pitch + 0.5) && (ttpPoint.center[1] - 0.1 <= lat <= ttpPoint.center[1] + 0.1) && (parseFloat(lng) === ttpPoint.center[0])) {
        document.getElementsByClassName('ttp')[0].style.visibility = 'visible';
        document.getElementsByClassName('ttp')[0].style.opacity = '1';
        document.getElementsByClassName('ttp')[1].style.visibility = 'visible';
        document.getElementsByClassName('ttp')[1].style.opacity = '1';
        typedTtp.pause(500).go()
    } else {
        document.getElementsByClassName('ttp')[0].style.visibility = 'hidden'
        document.getElementsByClassName('ttp')[0].style.opacity = '0';
        document.getElementsByClassName('ttp')[1].style.visibility = 'hidden'
        document.getElementsByClassName('ttp')[1].style.opacity = '0';

    }

}
map.on('render', ttpFunc);

let typedTtp = new TypeIt("#spanTtp", {
    speed: 30,
    strings: [txt[2]],
    cursorChar: "|",
    cursor: {
        autoPause: false,
        animation: {
            options: {
                duration: 1000,
                easing: "linear",
                direction: "alternate",
            },
            frames: [
                {
                    transformOrigin: "0.575em 0.7em",
                    transform: "rotate(0deg) scale(1)",
                },
                {
                    transformOrigin: "0.575em 0.7em",
                    transform: "rotate(360deg) scale(2.5)",
                },
            ],
        },
    },
});

function batFunc(e) {
    lat = map.getCenter().lat;
    lng = map.getCenter().lng.toFixed(5);
    bearing = map.getBearing();
    pitch = map.getPitch();
    zoom = map.getZoom();

    if ((11 <= zoom) && (batPoint.pitch - 0.5 <= pitch <= batPoint.pitch + 0.5) && (batPoint.center[1] - 0.1 <= lat <= batPoint.center[1] + 0.1) && (parseFloat(lng) === batPoint.center[0])) {
        document.getElementsByClassName('bat')[0].style.visibility = 'visible';
        document.getElementsByClassName('bat')[0].style.opacity = '1';
        document.getElementsByClassName('bat')[1].style.visibility = 'visible';
        document.getElementsByClassName('bat')[1].style.opacity = '1';
        typedBat.pause(500).go()
    } else {
        document.getElementsByClassName('bat')[0].style.visibility = 'hidden'
        document.getElementsByClassName('bat')[0].style.opacity = '0';
        document.getElementsByClassName('bat')[1].style.visibility = 'hidden'
        document.getElementsByClassName('bat')[1].style.opacity = '0';

    }

}
map.on('render', batFunc);

let typedBat = new TypeIt("#spanBat", {
    speed: 30,
    strings: [txt[1]],
    cursorChar: "|",
    cursor: {
        autoPause: false,
        animation: {
            options: {
                duration: 1000,
                easing: "linear",
                direction: "alternate",
            },
            frames: [
                {
                    transformOrigin: "0.575em 0.7em",
                    transform: "rotate(0deg) scale(1)",
                },
                {
                    transformOrigin: "0.575em 0.7em",
                    transform: "rotate(360deg) scale(2.5)",
                },
            ],
        },
    },
});

function bbfFunc(e) {
    lat = map.getCenter().lat;
    lng = map.getCenter().lng.toFixed(5);
    bearing = map.getBearing();
    pitch = map.getPitch();
    zoom = map.getZoom();

    if ((12.5 <= zoom) && (74.5 <= pitch <= 75.5) && (bbfPoint.center[1] - 0.1 <= lat <= bbfPoint.center[1] + 0.1) && (parseFloat(lng) === bbfPoint.center[0])) {
        document.getElementsByClassName('bbf')[0].style.visibility = 'visible';
        document.getElementsByClassName('bbf')[0].style.opacity = '1';
        document.getElementsByClassName('bbf')[1].style.visibility = 'visible';
        document.getElementsByClassName('bbf')[1].style.opacity = '1';
        typedBbf.pause(500).go()
    } else {
        document.getElementsByClassName('bbf')[0].style.visibility = 'hidden'
        document.getElementsByClassName('bbf')[0].style.opacity = '0';
        document.getElementsByClassName('bbf')[1].style.visibility = 'hidden'
        document.getElementsByClassName('bbf')[1].style.opacity = '0';

    }
}
map.on('render', bbfFunc);

let typedBbf = new TypeIt("#spanBbf", {
    speed: 30,
    strings: [txt[0]],
    cursorChar: "|",
    cursor: {
        autoPause: false,
        animation: {
            options: {
                duration: 1000,
                easing: "linear",
                direction: "alternate",
            },
            frames: [
                {
                    transformOrigin: "0.575em 0.7em",
                    transform: "rotate(0deg) scale(1)",
                },
                {
                    transformOrigin: "0.575em 0.7em",
                    transform: "rotate(360deg) scale(2.5)",
                },
            ],
        },
    },
});

const closer = document.getElementById('closer')
closer.addEventListener('click', () => {
    document.getElementById('welcome-txt').style.opacity = '0';
    document.getElementById('welcome-txt').style.visibility = 'hidden';
})