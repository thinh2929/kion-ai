interface MemeDisplayProps {
  emotion: string;
}

interface EmotionMap {
  [key: string]: string;
}

const MEME_MAP: EmotionMap = {
  "Bình thường": "https://media.tenor.com/WK1cs2WmrLwAAAAM/bruh-meme.gif",
  "Ngạc nhiên":
    "https://media.tenor.com/_zWYqfZdneIAAAAM/shocked-face-shocked-meme.gif",
  "Sigma":
    "https://www.thanglongwaterpuppet.org/wp-content/uploads/2025/10/sigma-meme-xuat-hien-thuong-xuyen-trong-cac-nhom-hai-huoc-tren-mang.jpg",
  "Hả": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTFBZS76hYQY-kNjt--1VEKpo2Ebt5CPXWswQ&s",
  "wtf?": "https://media.tenor.com/p-Pi0DJ-8SwAAAAM/anime.gif",
  "Tức giận":
    "https://i.redd.it/angry-cats-v0-37n6eeti7j5b1.jpg?width=1283&format=pjpg&auto=webp&s=a2797d6f7df7607a774adeff9370a4882ca69946",
  "Fuck": "https://m.media-amazon.com/images/I/511XDpqi-vL._AC_UF894,1000_QL80_.jpg",
  "Dừng": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ1bP6Z7G9SusTdE1ySqAeIns_p_ZfD8KjD0g&s",
};

const MemeDisplay = ({ emotion }: MemeDisplayProps) => {
  return (
    <div className="flex-1 flex items-center justify-center flex-col h-100 w-fit">
      <h1 className="text-white">{`Cảm xúc: ${emotion}`}</h1>
      <img src={MEME_MAP[emotion]} alt="emotion" className="h-full" />
    </div>
  );
};

export default MemeDisplay;
