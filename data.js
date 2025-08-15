// Collections → Projects (cars) → Photos (replace URLs with your own later)
window.COLLECTIONS = [
  { slug:"automotive", title:"Automotive", blurb:"Selected car projects.", cover:"https://images.unsplash.com/photo-1511919884226-fd3cad34687c?q=80&w=1600&auto=format&fit=crop" },
  { slug:"lifestyle",  title:"Lifestyle",  blurb:"People and places.",    cover:"https://images.unsplash.com/photo-1517263904808-5dc91e3e7044?q=80&w=1600&auto=format&fit=crop" }
];

window.PROJECTS = [
  { slug:"porsche-911-gt3rs", collection:"automotive", title:"Porsche 911 GT3 RS", year:2025, location:"Garage", blurb:"Night garage", cover:"images/automobile/gt3rs/03-lg.jpg" },
  { slug:"ford-gt",  collection:"automotive", title:"2017 Ford GT", year:2024, location:"Backyard", blurb:"Golden hour", cover:"images/automobile/ford_gt/wheel-lg.jpg" },
  { slug:"city-cafe",         collection:"lifestyle",  title:"City Café", year:2023, location:"River North", blurb:"Quiet morning light.", cover:"https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?q=80&w=1600&auto=format&fit=crop" }
];

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
