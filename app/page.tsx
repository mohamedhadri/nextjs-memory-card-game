import BackGround from "./components/BackGround/BackGround";
import Fireflies from "./components/Fireflies";
import MemoGame from "./components/MemoGame";



export default function Home() {
  return (
    <>
  
  <BackGround/>
 
  <main className="flex  flex-col items-center justify-between p-24">
  <Fireflies/>
  <MemoGame/>
    </main>
    </>
    
  );
}
