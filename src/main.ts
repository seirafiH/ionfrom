import "./ionic";

import iconHome from "@ionic/core/dist/ionic/svg/home.svg";
import iconMenu from "@ionic/core/dist/ionic/svg/menu.svg";

export { ionForm as IonForm } from "./ionform/generateForm";

const ICON_MAP = ["home.svg", iconHome, "menu.svg", iconMenu];

document.querySelectorAll("ion-icon").forEach((el: HTMLIonIconElement) => {
  const dataSrc: string | null = el.getAttribute("data-src");
  if (dataSrc != null) el.src = ICON_MAP[ICON_MAP.indexOf(dataSrc) + 1];
});
