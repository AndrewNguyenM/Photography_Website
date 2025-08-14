<!-- ======================================================================
/photos.js
Sample data using Unsplash (replace with your own later)
====================================================================== -->
<script>
  // why: keep content editable without code changes
  const PROJECTS = [
    {
      slug: "automotive",
      title: "Automotive",
      blurb: "Motion, lines, and reflections — selected cars and track work.",
      cover: "https://images.unsplash.com/photo-1511919884226-fd3cad34687c?q=80&w=1600&auto=format&fit=crop"
    },
    {
      slug: "lifestyle",
      title: "Lifestyle",
      blurb: "People, place, and mood — candid moments and environments.",
      cover: "https://images.unsplash.com/photo-1517263904808-5dc91e3e7044?q=80&w=1600&auto=format&fit=crop"
    }
  ];

  const PHOTOS = {
    automotive: [
      { srcSmall:"https://images.unsplash.com/photo-1503376780353-7e6692767b70?q=80&w=800&auto=format&fit=crop", srcLarge:"https://images.unsplash.com/photo-1503376780353-7e6692767b70?q=80&w=2000&auto=format&fit=crop", w:1600, h:1067, title:"Night at the pits", caption:"" },
      { srcSmall:"https://images.unsplash.com/photo-1511919884226-fd3cad34687c?q=80&w=800&auto=format&fit=crop", srcLarge:"https://images.unsplash.com/photo-1511919884226-fd3cad34687c?q=80&w=2000&auto=format&fit=crop", w:1600, h:1067, title:"Silver coupe", caption:"" },
      { srcSmall:"https://images.unsplash.com/photo-1519641471654-76ce0107ad1b?q=80&w=800&auto=format&fit=crop", srcLarge:"https://images.unsplash.com/photo-1519641471654-76ce0107ad1b?q=80&w=2000&auto=format&fit=crop", w:1600, h:1067, title:"Garage detail", caption:"" },
      { srcSmall:"https://images.unsplash.com/photo-1502877338535-766e1452684a?q=80&w=800&auto=format&fit=crop", srcLarge:"https://images.unsplash.com/photo-1502877338535-766e1452684a?q=80&w=2000&auto=format&fit=crop", w:1600, h:1067, title:"Track day", caption:"" },
      { srcSmall:"https://images.unsplash.com/photo-1441148345475-03a2e82f9719?q=80&w=800&auto=format&fit=crop", srcLarge:"https://images.unsplash.com/photo-1441148345475-03a2e82f9719?q=80&w=2000&auto=format&fit=crop", w:1600, h:1067, title:"Red classic", caption:"" },
      { srcSmall:"https://images.unsplash.com/photo-1483721310020-03333e577078?q=80&w=800&auto=format&fit=crop", srcLarge:"https://images.unsplash.com/photo-1483721310020-03333e577078?q=80&w=2000&auto=format&fit=crop", w:1600, h:1067, title:"Workshop", caption:"" }
    ],
    lifestyle: [
      { srcSmall:"https://images.unsplash.com/photo-1520975922284-78f8f7d4a1ae?q=80&w=800&auto=format&fit=crop", srcLarge:"https://images.unsplash.com/photo-1520975922284-78f8f7d4a1ae?q=80&w=2000&auto=format&fit=crop", w:1600, h:1067, title:"Sunlit", caption:"" },
      { srcSmall:"https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=800&auto=format&fit=crop", srcLarge:"https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=2000&auto=format&fit=crop", w:1600, h:1067, title:"Portrait", caption:"" },
      { srcSmall:"https://images.unsplash.com/photo-1469474968028-56623f02e42e?q=80&w=800&auto=format&fit=crop", srcLarge:"https://images.unsplash.com/photo-1469474968028-56623f02e42e?q=80&w=2000&auto=format&fit=crop", w:1600, h:1067, title:"On the road", caption:"" },
      { srcSmall:"https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?q=80&w=800&auto=format&fit=crop", srcLarge:"https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?q=80&w=2000&auto=format&fit=crop", w:1600, h:1067, title:"Coffee shop", caption:"" }
    ]
  };
</script>
