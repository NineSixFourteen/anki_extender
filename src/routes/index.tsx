import { ImageSection } from "~/components/ImageSection/ImageSection";
import { WordSection } from "~/components/WordSection/WordSection";
import { Navbar } from '~/components/Navbar/Navbar';
import { ActionBar } from '~/components/ActionBar/ActionBar'
import { HelpSection } from "~/components/HelpSection/HelpSection";
import { StatusBar } from "~/components/StatusBar/StatusBar";

export default function Home() {

  return (
    <main class="pb-24">
      <Navbar />
      <ActionBar/>
      <div class="main-wrapper">
          <div class="grid-container">
            <ImageSection />
            <WordSection/>
            <HelpSection />
          </div>
      </div>
      <StatusBar />
    </main>
  );
}