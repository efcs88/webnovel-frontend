import Image from "next/image";
import NavBar  from "@/src/components/NavBar";
import Hero from "@/src/components/Hero"
export default function Home() {
  return (
    <div >
      <NavBar/>
      <main>
        <section>
          <Hero 
          title="Webnovel"
          content="Este es un sistema web para escribir novelas"/>  
        </section>
      </main>
    </div>
  );
}
