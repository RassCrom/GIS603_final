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

let popup = new mapboxgl.Popup({
        closeButton: true,
        closeOnClick: true,
        focusAfterOpen: true,
        anchor: 'bottom',
        offset: [0, -10] // Set the offset to position the popup just above the marker
})
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
    popup.setLngLat(feature.geometry.coordinates)
        .setHTML(
            `Name: <h3 style='font-size:1.2rem;color:green; margin-bottom:5px;'>${feature.properties.Name}</h3>
            <p>Description:<br> ${feature.properties['Short description']}</p><br>
            <button class="place-links" id="route">Route</button>`
        ).addTo(map);
    let routeFav = document.getElementById('route');
    routeFav.addEventListener('click', ()=> {
        // const routePopup = document.createElement('div')
        // routePopup.classList = 'routes';
        // document.body.appendChild(routePopup)


    })
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


    popup.setLngLat(feature.geometry.coordinates)
        .setHTML(
            `Name: <h3 style='font-size:1.2rem;color:green; margin-bottom:5px;'>${feature.properties.Name}</h3>
        <p>Location:<br> ${feature.properties['Location']}</p>`
        ).addTo(map);
});
let popupCave;
map.on('click', (event) => {

    // If the user clicked on one of your markers, get its information.
    const features = map.queryRenderedFeatures(event.point, {
        layers: ['caves-4wy3gj'] // replace with your layer name
    });
    if (!features.length) {
        return;
    }
    const feature = features[0]
    // Code from the next step will go here.
    popupCave = new mapboxgl.Popup({ offset: [0, 0] })
        .setLngLat(feature.geometry.coordinates)
        .setHTML(
            `Name: <h3 style='font-size:1.2rem;color:green; margin-bottom:5px;'>${feature.properties.name}</h3>`
        ).addTo(map);
});
const btnsCave = document.querySelectorAll('.cave');

// caves caves-4wy3gj
map.on('load', () => {
    let caveDivs = []
    let countCave = 0
    let layer = map.getLayer('caves-4wy3gj');
    let sourceId = layer.source;
    const caveDiv = document.querySelector('.caves')

    let features = map.querySourceFeatures(sourceId, {
        'sourceLayer': 'caves-4wy3gj'
    })

    for (let i = 0; i < features.length; i++) {
        if (i === 6) {
            break
        }

        const button = document.createElement('button');

        button.classList = 'place-links'
        button.textContent = `${features[i].properties.name}`;
        button.id = `cave${i}`;
        button.value = `${i}`

        caveDiv.appendChild(button);
        caveDivs.push(button);
    }

    caveDivs.forEach(e => {
        e.addEventListener('click', i=> {
            animateSideBar();
            map.flyTo({
                center: [features[i.target.value].geometry.coordinates[0], features[i.target.value].geometry.coordinates[1]],
                zoom: 14,
                duration: 6000,
                bearing: 152.9264,
                pitch: 73.9188,
            });
            const popup = new mapboxgl.Popup({
                closeButton: true,
                closeOnClick: true,
                focusAfterOpen: true,
                anchor: 'bottom',
                offset: [7.7, -55] // Set the offset to position the popup just above the marker
            })
                .setLngLat(features[i.target.value].geometry.coordinates)
                .setHTML(
                    `Name: <h3 style='font-size:1.2rem;color:green; margin-bottom:5px;'>${features[i.target.value].properties.name}</h3>`
                ).addTo(map);
        })
    })

})

// peaks
map.on('load', function() {
    let countCave = 0
    // Get the layer by its ID
    let layer = map.getLayer('mapkz-tp');

    // Get the source ID for the layer
    let sourceId = layer.source;

    // Get the features for the source layer
    let features = map.querySourceFeatures('composite', {
        'sourceLayer': 'peaks-6nxjqk'
    });

    btnsCave.forEach(i => {
        if (countCave < 11) {
            i.innerHTML = features[countCave].properties.Name;
            i.addEventListener('click', e=>{
                animateSideBar();
                map.flyTo({
                    center: [features[e.target.value].geometry.coordinates[0], features[0].geometry.coordinates[1]],
                    zoom: 14,
                    duration: 6000,
                    bearing: 152.9264,
                    pitch: 73.9188,
                });
                const popup = new mapboxgl.Popup({
                    closeButton: true,
                    closeOnClick: true,
                    focusAfterOpen: true,
                    anchor: 'bottom',
                    offset: [7.7, -55] // Set the offset to position the popup just above the marker
                })
                    .setLngLat(features[e.target.value].geometry.coordinates)
                    .setHTML(
                        `Name: <h3 style='font-size:1.2rem;color:green; margin-bottom:5px;'>${features[e.target.value].properties.name}</h3>
        <p>Location:<br> ${features[e.target.value].properties['Location']}</p>`
                    ).addTo(map);

            })
        }

        countCave += 1
    })

    // // Loop through each feature and log its coordinates
    // features.forEach(function(feature) {
    //     let coordinates = feature.geometry.coordinates;
    //     console.log(coordinates);
    // });
});

map.on('mouseenter', ['mapkz-tp', 'peaks-6nxjqk', 'caves-4wy3gj'], function () {
    map.getCanvas().style.cursor = 'pointer';
});

map.on('mouseleave', ['mapkz-tp', 'peaks-6nxjqk', 'caves-4wy3gj'], function () {
    map.getCanvas().style.cursor = '';
});

map.addControl(new mapboxgl.NavigationControl());
map.addControl(new mapboxgl.ScaleControl());

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
        tearing: 0,
        bearing: 0,
        duration: 5000,
        essential: true
    })
}

home.addEventListener('click', flyToHome)


let isAtStart = true;

// FLY to
const bat = document.getElementById('bat')
bat.addEventListener('click', () => {
    animateSideBar()

    map.flyTo({
        ...batPoint,
        duration: 11000,
        essential: true
    })
})

const bbf = document.getElementById('bbf')
bbf.addEventListener('click', () => {

    animateSideBar()
    map.flyTo({
        ...bbfPoint,
        duration: 11000,
        essential: true
    })
})

const ttp = document.getElementById('ttp')
ttp.addEventListener('click', () => {
    animateSideBar()

    map.flyTo({
        ...ttpPoint,
        duration: 11000,
        essential: true
    })
})

const wbut = document.getElementById('wbut')
wbut.addEventListener('click', () => {
    animateSideBar()

    map.flyTo({
        ...wbutPoint,
        duration: 11000,
        essential: true
    })
})

const kain = document.getElementById('kain')
kain.addEventListener('click', () => {
    animateSideBar()
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
    speed: speed,
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
    speed: speed,
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
    speed: speed,
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
    speed: speed,
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
    speed: speed,
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
        },
    },
});

// const closer = document.getElementById('closer')
// closer.addEventListener('click', () => {
//     document.getElementById('welcome-txt').style.opacity = '0';
//     document.getElementById('welcome-txt').style.visibility = 'hidden';
// })

// filter
let allFilter = document.getElementById('all-filter')
    fav = document.getElementById('fav')
    peaks = document.getElementById('peaks')
    test = document.getElementById('test')
    checkedBoxes = [];
    acOne = document.getElementById('ac-one')
    acTwo = document.getElementById('ac-two')
    acThree = document.getElementById('ac-three')

// Get all the checkboxes
const checkboxes = document.querySelectorAll('input[type="checkbox"]');

// Get all the content divs
const contentDivs = document.querySelectorAll('.ac');

// Array to store the checked checkbox values
let checkedValues = ['ac-0', 'ac-1', 'ac-2'];

// Add event listener to each checkbox
checkboxes.forEach((checkbox) => {
    checkbox.addEventListener('change', (event) => {
        // Get the value of the checked checkbox
        console.log(event.target)
        const checkedValue = event.target.value;

        // If the checkbox is checked, add its value to the checkedValues array; otherwise, remove it
        if (checkbox.checked) {
            checkedValues.push(checkedValue);
        } else {
            checkedValues = checkedValues.filter(value => value !== checkedValue);
        }

        // Loop through all content divs
        contentDivs.forEach((contentDiv) => {
            // If the id of the content div includes any of the checked values, show it; otherwise, hide it
            if (checkedValues.some(value => contentDiv.id.includes(value))) {
                contentDiv.style.display = 'block';
            } else if (checkedValues.some(value => !contentDiv.id.includes(value))) {
                contentDiv.style.display = 'none';
            }
         })
    });
});
