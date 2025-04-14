import { format } from "date-fns";
import fs from "fs";
import path from "path";
import pizzip from "pizzip";
import docxtemplater from "docxtemplater";
import { saveAsDialog } from "../saveAsDialog.js";
import { BaseWindow } from "electron";
import { app } from "electron";
import { generateVehicleText } from "./generateVehicleText.js";
import { isDev } from "../utils.js";

export function generateTehnicalReport(
  mainWindow: BaseWindow,
  data: VehicleReportFormInputs
) {
  let templatePath;

  if (isDev()) {
    templatePath = path.join(app.getAppPath(), "electron/assets/input.docx");
  } else {
    templatePath = path.join(process.resourcesPath, "assets/input.docx");
  }

  const content = fs.readFileSync(templatePath);

  const zip = new pizzip(content);

  const doc = new docxtemplater(zip, {
    paragraphLoop: true,
    linebreaks: true,
  });

  const text = generateVehicleText({
    glasses: data.glasses,
    side_glasses: data.side_glasses,
    back_glasses: data.back_glasses,
    hook: data.hook,
    hook_type: data.hook_type,
    hook_approval: data.hook_approval,
  });

  doc.render({
    business_number: data.business_number,
    business_number_2: data.business_number,
    date: format(data.date, "dd/MM/yyyy"),
    date_2: format(data.date, "dd/MM/yyyy"),
    vin: data.vin,
    engine_number: data.engine_number,
    brand: data.brand,
    type: data.type,
    year: data.year,
    model: data.model,
    category: data.category,
    car_body: data.car_body,
    address: data.address,
    variant_version: data.variant_version,
    exhaust_gases: data.exhaust_gases,
    responsible_person: data.responsible_person,
    text,
    category_2: data.category.split("-")[0],
  });

  const buf = doc.getZip().generate({
    type: "nodebuffer",
    compression: "DEFLATE",
  });

  saveAsDialog(
    mainWindow,
    `${data.business_number.replace("/", "-")}.doc`,
    buf
  );
}
