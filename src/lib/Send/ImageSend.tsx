import { handleResponse } from "~/components/Common/LoadingBar/lib/StatusBarContextHelper";
import { sendStoredMediaUrl, sendStoredMediaData} from './common';

export async function sendImageToAnki(CardStore:any,setStatusContext:Function) {
  const result = await sendStoredMediaData(CardStore,false);
  handleResponse(result,'Image',setStatusContext);
  return result.error ? false : true;
}
