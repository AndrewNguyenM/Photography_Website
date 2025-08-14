<!-- ============================== /data.js ============================= -->
// Collections → Projects (cars) → Photos (replace URLs with your own later)
window.COLLECTIONS = [
  { slug:"automotive", title:"Automotive", blurb:"Selected car projects.", cover:"https://images.unsplash.com/photo-1511919884226-fd3cad34687c?q=80&w=1600&auto=format&fit=crop" },
  { slug:"lifestyle",  title:"Lifestyle",  blurb:"People and places.",    cover:"https://images.unsplash.com/photo-1517263904808-5dc91e3e7044?q=80&w=1600&auto=format&fit=crop" }
];

window.PROJECTS = [
  { slug:"porsche-911-gt3rs", collection:"automotive", title:"Porsche 911 GT3 RS", year:2025, location:"Chicago", blurb:"Night garage + rolling shots.", cover:"https://images.unsplash.com/photo-1519641471654-76ce0107ad1b?q=80&w=1600&auto=format&fit=crop" },
  { slug:"toyota-supra-a90",  collection:"automotive", title:"Toyota GR Supra (A90)", year:2024, location:"Track day", blurb:"Paddock & golden hour.", cover:"https://images.unsplash.com/photo-1502877338535-766e1452684a?q=80&w=1600&auto=format&fit=crop" },
  { slug:"city-cafe",         collection:"lifestyle",  title:"City Café", year:2023, location:"River North", blurb:"Quiet morning light.", cover:"https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?q=80&w=1600&auto=format&fit=crop" }
];

window.PHOTOS = {
  "porsche-911-gt3rs": [
    { srcSmall:"https://images.unsplash.com/photo-1519641471654-76ce0107ad1b?q=80&w=800&auto=format&fit=crop", srcLarge:"https://images.unsplash.com/photo-1519641471654-76ce0107ad1b?q=80&w=2000&auto=format&fit=crop", w:1600, h:1067, title:"Detail", caption:"" },
    { srcSmall:"https://images.unsplash.com/photo-1503376780353-7e6692767b70?q=80&w=800&auto=format&fit=crop", srcLarge:"https://images.unsplash.com/photo-1503376780353-7e6692767b70?q=80&w=2000&auto=format&fit=crop", w:1600, h:1067, title:"Night roll", caption:"" }
  ],
  "toyota-supra-a90": [
    { srcSmall:"https://images.unsplash.com/photo-1502877338535-766e1452684a?q=80&w=800&auto=format&fit=crop", srcLarge:"https://images.unsplash.com/photo-1502877338535-766e1452684a?q=80&w=2000&auto=format&fit=crop", w:1600, h:1067, title:"Paddock", caption:"" },
    { srcSmall:"https://images.unsplash.com/photo-1441148345475-03a2e82f9719?q=80&w=800&auto=format&fit=crop", srcLarge:"https://images.unsplash.com/photo-1441148345475-03a2e82f9719?q=80&w=2000&auto=format&fit=crop", w:1600, h:1067, title:"Classic inspo", caption:"" }
  ],
  "city-cafe": [
    { srcSmall:"https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?q=80&w=800&auto=format&fit=crop", srcLarge:"https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?q=80&w=2000&auto=format&fit=crop", w:1600, h:1067, title:"Window light", caption:"" }
  ]
};
