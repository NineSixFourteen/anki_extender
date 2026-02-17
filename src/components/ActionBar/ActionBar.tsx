import s from './ActionBar.module.css';
import { useCards } from '~/lib/Models/CardContext';
import { useStatusBarInfo } from '~/lib/Models/StatusContext';

export function ActionBar(){

  let missingFields:string[] = [];



  return (
    <div class={s.actionBar}>
      <div class={s.actionBarInner}>
        <div class={s.controlGroup}>
          <label>Target Deck</label>
          <select class={s.select}>
            <option>Default</option>
            <option>Spanish::Vocabulary</option>
          </select>
        </div>

        <div class={s.controlGroup}>
        </div>
      </div>
    </div>
  );
};

export default ActionBar;