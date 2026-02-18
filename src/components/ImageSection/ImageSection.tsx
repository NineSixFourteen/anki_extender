import { Component, createSignal, Show } from "solid-js";
import { useCards } from "~/lib/Models/CardContext";
import { ImageSearch } from "./ImageSearch/ImageSearch";
import { ImageZone } from "./ImageZone/ImageZone";
import { ImageText } from "./ImageText/ImageText";


interface ImageSectionImports {
    imageSearch: Function,
    setImageSearch: Function,

}

export const ImageSection: Component<ImageSectionImports> = (props) => {

  const [imgData, setImgData] = createSignal("");

  const { setCardStore } = useCards();

  return (
    <div class="column">
      <div class="label"><div>Image</div></div>
      
      <ImageSearch imageSearch={props.imageSearch} setImageSearch={props.setImageSearch} />
      <ImageZone imgData={imgData} setImgData={setImgData} setCardStore={setCardStore}/>
      <ImageText setCardStore={setCardStore} />
      
      <input type="hidden" name="frontImage" value={imgData()} />
    </div>
  );
}