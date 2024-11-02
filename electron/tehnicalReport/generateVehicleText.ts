import {
  wrapedGlasses,
  tintedGlasses,
  hook,
  baseic_vehicle,
} from "./constants.js";

export function generateVehicleText(info: VehicleTextInfo) {
  let text = "";

  if (info.glasses === "Фабрички Затемнани")
    text = tintedGlasses
      .replace("{side_glasses}", info.side_glasses ?? "")
      .replace("{back_glasses}", info.back_glasses ?? "");
  else if (info.glasses === "Фолија") text = wrapedGlasses;

  if (info.hook === "Со кука")
    text += hook
      .replace("{hook_type}", info.hook_type ?? "")
      .replace("{hook_approval}", info.hook_approval ?? "");

  if (info.glasses === "Не се затемнани" && info.hook === "Нема кука")
    text = baseic_vehicle;

  return text;
}
