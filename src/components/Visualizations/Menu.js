import {PrioritySatisfaction} from './Questions/PrioritySatisfaction.js'
import {AffectVictory} from './Questions/Affect_victory';
import {ConcernsVictory} from './Questions/Concerns_victory';
import {AcresManagedBarChart} from './Questions/AcresManaged.js';
import { CropPercentages } from "./Questions/CropPercentages";
import {InfoSourcesBarChart} from "./Questions/InfoSources";
import {InternetSourcesBarChart} from "./Questions/InternetSources";
import { PriorityConcerns } from "./Questions/PriorityConcerns";
import { AmountVictory } from "./Questions/AmountValued";
import { EngageVictory } from "./Questions/Engage_victory";
import { PrimaryGrowingReasons } from "./Questions/PrimaryGrowingReasons";
import "@fontsource/metropolis";

function VisMenu(props) {

  var vis_key = { 

    "Priorities vs Satisfaction" :        (<PrioritySatisfaction dataset={props.dataset}/>),
    "Crop Percentages":                   (<CropPercentages dataset={props.dataset}/>),
    "Priority Effect":                    (<AffectVictory dataset={props.dataset}/>),
    "Production Concerns":                (<ConcernsVictory dataset={props.dataset}/>),
    "Acres Managed":                      (<AcresManagedBarChart dataset={props.dataset}/>),
    "Information Sources":                (<InfoSourcesBarChart dataset={props.dataset}/>),
    "Internet Sources":                   (<InternetSourcesBarChart dataset={props.dataset}/>),
    "Priority Concerns":                  (<PriorityConcerns dataset={props.dataset}/>),
    "Values":                             (<AmountVictory dataset={props.dataset}/>),
    "UCCE Engagement":                    (<EngageVictory dataset={props.dataset}/>),
    "Primary Growing Reasons":            (<PrimaryGrowingReasons dataset={props.dataset}/>)
  }

  return (vis_key[props.vis])
}

export {VisMenu};