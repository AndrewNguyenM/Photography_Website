// Collections → Projects (cars) → Photos (replace URLs with your own later)
window.COLLECTIONS = [
  { slug:"automotive", title:"Automotive", blurb:"Selected car projects.", cover:"https://images.unsplash.com/photo-1511919884226-fd3cad34687c?q=80&w=1600&auto=format&fit=crop" },
  { slug:"lifestyle",  title:"Lifestyle",  blurb:"People and places.",    cover:"https://images.unsplash.com/photo-1517263904808-5dc91e3e7044?q=80&w=1600&auto=format&fit=crop" }
];


//   THE WINDOW PAGES ICONS 
window.PROJECTS = [
  { slug:"porsche-911-gt3rs", collection:"automotive", title:"Porsche 911 GT3 RS", year:2025, location:"Garage", blurb:"Night garage", cover:"images/automobile/gt3rs/03-lg.jpg" },
  { slug:"ford-gt",  collection:"automotive", title:"2017 Ford GT", year:2024, location:"Backyard", blurb:"Golden hour", cover:"images/automobile/ford_gt/wheel-lg.jpg" },
  { slug:"2001-honda-s2000", collection:"automotive", title:"Honda S2000", year:2025, location:"Troy", blurb:"S2000 - Kaushik Paladugu", cover:"images/automobile/s2000/IMG_0090-2.jpg" },
  { slug:"city-cafe",         collection:"lifestyle",  title:"City Café", year:2023, location:"River North", blurb:"Quiet morning light.", cover:"https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?q=80&w=1600&auto=format&fit=crop" },
  { slug:"yamaha-r3", collection:"automotive", title:"Yamaha R3", year:2025, location:"Sterling Heights", blurb:"Yamaha R3 - Musanna Khan", cover:"images/automobile/Yamaha_R3/bike.jpg" },
  { slug:"gr86", collection:"automotive", title:"GR86", year:2025, location:"Troy", blurb:"GR86 - Andrew Nguyen", cover:"images/automobile/gr86/wide-GR86.jpg"}
];

//INSIDE EACH WINDOWED BOX
window.PHOTOS = {
  "porsche-911-gt3rs": [
    {
      srcSmall: "images/automobile/gt3rs/03-sm.jpg",
      srcLarge: "images/automobile/gt3rs/03-lg.jpg",
      w: 1259, h: 2000,
      title: "LEGO GT3 RS — rear",
      story: "Late-night build session. Single LED panel, black felt background, shooting handheld.",
      meta: {
        date: "2025-05-13",
        location: "Home Garage",
        camera: "Canon R6",
        lens: "RF 50mm f/1.8",
        shutter: "1/80s",
        aperture: "f/2.0",
        iso: "800",
        focalLength: "50mm"
      }
    },
    {
      srcSmall: "images/automobile/gt3rs/topdown-sm.jpg",
      srcLarge: "images/automobile/gt3rs/topdown-lg.jpg",
      w: 1259, h: 2000,
      title: "LEGO GT3 RS — topdown",
      story: "Top-down detail with a bounce card to lift shadows.",
      meta: { date: "2025-05-10", location: "Home Garage", camera:"Canon R6", lens:"RF 50mm", shutter:"1/60s", aperture:"f/2.8", iso:"640", focalLength:"50mm" }
    }
  ],
  "ford-gt": [
    {
      srcSmall: "images/automobile/ford_gt/wheel-sm.jpg",
      srcLarge: "images/automobile/ford_gt/wheel-lg.jpg",
      w: 1259, h: 2000,
      title: "LEGO Ford GT - Side",
      story: "Golden hour side profile on a DIY tabletop set.",
      meta: { date: "2024-08-22", location: "Backyard", camera:"Canon R6", lens:"RF 85mm f/2", shutter:"1/200s", aperture:"f/2.8", iso:"200", focalLength:"85mm" }
    }
  ],

  "2001-honda-s2000": [
    {
      scrSmall: "images/automobile/s2000/IMG_0086-2.jpg",
      srcLarge: "images/automobile/s2000/IMG_0086-2.jpg",
      w: 1259, h: 2000,
      title: "Honda S2000",
      story: "Kaushik's 2001 Honda S2000",
      meta: {
        date: "2025-08-16",
        location: "Garage",
        camera: "Canon T7",
        lens: "RF 50mm f/1.8",
        shutter: "1/80s",
        aperture: "f/2.0",
        iso: "800",
        focalLength: "50mm"
      }
    },
        {
      scrSmall: "images/automobile/s2000/badge.jpg",
      srcLarge: "images/automobile/s2000/badge.jpg",
      w: 1259, h: 2000,
      title: "Honda S2000",
      story: "2001 Honda S2000 - badge",
      meta: {
        date: "2025-08-16",
        location: "Garage",
        camera: "Canon T7",
        lens: "RF 50mm f/1.8",
        shutter: "1/80s",
        aperture: "f/2.0",
        iso: "800",
        focalLength: "50mm"
      }
    },
    {
      scrSmall: "images/automobile/s2000/wheel.jpg",
      srcLarge: "images/automobile/s2000/wheel.jpg",
      w: 1259, h: 2000,
      title: "Honda S2000",
      story: "Honda S2000 - Front",
      meta: {
        date: "2025-08-16",
        location: "Garage",
        camera: "Canon T7",
        lens: "RF 50mm f/1.8",
        shutter: "1/80s",
        aperture: "f/2.0",
        iso: "800",
        focalLength: "50mm"
      }
    },
        {
      scrSmall: "images/automobile/s2000/IMG_0090-2.jpg",
      srcLarge: "images/automobile/s2000/IMG_0090-2.jpg",
      w: 1259, h: 2000,
      title: "Honda S2000",
      story: "Honda S2000",
      meta: {
        date: "2025-08-16",
        location: "Garage",
        camera: "Canon T7",
        lens: "RF 50mm f/1.8",
        shutter: "1/80s",
        aperture: "f/2.0",
        iso: "800",
        focalLength: "50mm"
      }
    },
  ],

  "yamaha-r3": [
    {
      scrSmall: "images/automobile/Yamaha_R3/moose.jpg",
      srcLarge: "images/automobile/Yamaha_R3/moose.jpg",
      w: 1259, h: 2000,
      title: "Yamaha R3",
      story: "Moose on Yamaha R3",
      meta: {
        date: "2025-08-24",
        location: "Park",
        camera: "Canon T7",
        lens: "RF 50mm f/1.8",
        shutter: "1/80s",
        aperture: "f/2.0",
        iso: "800",
        focalLength: "50mm"
      }
    },
    {
      scrSmall: "images/automobile/Yamaha_R3/bike.jpg",
      srcLarge: "images/automobile/Yamaha_R3/bike.jpg",
      w: 1259, h: 2000,
      title: "Yamaha R3",
      story: "Moose's Yamaha R3",
      meta: {
        date: "2025-08-24",
        location: "Park",
        camera: "Canon T7",
        lens: "RF 50mm f/1.8",
        shutter: "1/80s",
        aperture: "f/2.0",
        iso: "800",
        focalLength: "50mm"
      }
    },
    ],

  "gr86": [
    {
      scrSmall: "images/automobile/gr86/wide-GR86.jpg",
      srcLarge: "images/automobile/gr86/wide-GR86.jpg",
      w: 1259, h: 2000,
      title: "GR86",
      story: "My GR86",
      meta: {
        date: "2025-10-07",
        location: "Park",
        camera: "Canon T7",
        lens: "RF 50mm f/1.8",
        shutter: "1/80s",
        aperture: "f/2.0",
        iso: "800",
        focalLength: "50mm"
      }
    },
    {
      scrSmall: "images/automobile/gr86/rear-GR86.jpg",
      srcLarge: "images/automobile/gr86/rear-GR86.jpg",
      w: 1259, h: 2000,
      title: "GR86",
      story: "GR86 Rear",
      meta: {
        date: "2025-10-07",
        location: "Park",
        camera: "Canon T7",
        lens: "RF 50mm f/1.8",
        shutter: "1/80s",
        aperture: "f/2.0",
        iso: "800",
        focalLength: "50mm"
      }
    },
  ],

  "city-cafe": [
    {
      srcSmall:"https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?q=80&w=800&auto=format&fit=crop",
      srcLarge:"https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?q=80&w=2000&auto=format&fit=crop",
      w:1600, h:1067, title:"Window light",
      story:"Quiet morning in River North. Window light only.",
      meta:{ date:"2023-04-02", location:"River North", camera:"X100V", lens:"23mm", shutter:"1/125s", aperture:"f/2", iso:"320", focalLength:"23mm" }
    }
  ]

};
