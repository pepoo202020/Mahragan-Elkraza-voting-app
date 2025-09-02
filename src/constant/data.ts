// Mock data for artworks
export const mockArtworks = [
  {
    id: 1,
    title: "Icon of Saint Mary",
    artist: "Father Michael",
    category: "drawing",
    year: 2024,
    imageUrl:
      "https://images.unsplash.com/photo-1473177104440-ffee2f376098?w=400&h=300&fit=crop",
    isVideo: false,
    votes: 42,
    publishDate: "2 days ago",
    comments: [
      { user: "Sarah K.", text: "Beautiful iconography work!" },
      { user: "David M.", text: "The colors are so vibrant and spiritual." },
    ],
  },
  {
    id: 2,
    title: "Coptic Chant Performance",
    artist: "Deacon John",
    category: "music",
    year: 2024,
    imageUrl:
      "https://images.unsplash.com/photo-1492321936769-b49830bc1d1e?w=400&h=300&fit=crop",
    isVideo: true,
    votes: 38,
    publishDate: "5 days ago",
    comments: [
      { user: "Maria L.", text: "Such a heavenly voice!" },
      { user: "Peter R.", text: "This brought tears to my eyes." },
    ],
  },
  {
    id: 3,
    title: "Cathedral Light Study",
    artist: "Anna Basilios",
    category: "design",
    year: 2023,
    imageUrl:
      "https://images.unsplash.com/photo-1466442929976-97f336a657be?w=400&h=300&fit=crop",
    isVideo: false,
    votes: 55,
    publishDate: "1 week ago",
    comments: [
      { user: "Mark T.", text: "The way light filters through is magical." },
      { user: "Ruth S.", text: "Reminds me of our church's morning prayers." },
    ],
  },
  {
    id: 4,
    title: "Cross Illumination",
    artist: "Bishoy Habib",
    category: "video",
    year: 2024,
    imageUrl:
      "https://images.unsplash.com/photo-1494891848038-7bd202a2afeb?w=400&h=300&fit=crop",
    isVideo: true,
    votes: 29,
    publishDate: "3 days ago",
    comments: [
      { user: "Grace N.", text: "Beautiful symbolic representation." },
    ],
  },
  {
    id: 5,
    title: "Sacred Geometry",
    artist: "Mina Samir",
    category: "drawing",
    year: 2023,
    imageUrl:
      "https://images.unsplash.com/photo-1551038247-3d9af20df552?w=400&h=300&fit=crop",
    isVideo: false,
    votes: 67,
    publishDate: "2 weeks ago",
    comments: [
      { user: "Joseph A.", text: "The mathematical precision is stunning." },
      { user: "Mary F.", text: "Sacred art at its finest!" },
    ],
  },
];

export const categories = [
  { value: "all", label: { en: "All Categories", ar: "كل التصنيفات" } },
  { value: "drawing", label: { en: "Drawing", ar: "اللوحات" } },
  { value: "video", label: { en: "Video", ar: "الفيديو" } },
  { value: "design", label: { en: "Design", ar: "تصميم" } },
  { value: "music", label: { en: "Music", ar: "الموسيقى" } },
];

export const sortOptions = [
  { value: "latest", label: { en: "Latest", ar: "الأحدث" } },
  { value: "most-loved", label: { en: "Most Loved", ar: "الاكثر اعجابا" } },
];
