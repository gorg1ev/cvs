import { z } from "zod";

export const formSchema = z.object({
  business_number: z.string().min(9, {
    message: "Дел. бр. мора да биде најмалко 9 карактери",
  }),
  date: z.date(),
  vin: z.string().min(17, {
    message: "Идентификационен број на возилото мора да е 17 карактери",
  }),
  engine_number: z.string().min(1, { message: "Ова поле е задолжително" }),
  brand: z.string().min(1, { message: "Ова поле е задолжително" }),
  type: z.string().min(1, { message: "Ова поле е задолжително" }),
  year: z.string().min(4, { message: "Ова поле е задолжително" }),
  model: z.string().min(1, { message: "Ова поле е задолжително" }),
  category: z.string().min(1, { message: "Ова поле е задолжително" }),
  car_body: z.string().optional(),
  address: z.string().min(1, { message: "Ова поле е задолжително" }),
  variant_version: z.string().min(1, { message: "Ова поле е задолжително" }),
  exhaust_gases: z.string().min(1, { message: "Ова поле е задолжително" }),
  glasses: z.enum(["Не се затемнани", "Фабрички Затемнани", "Фолија"]),
  side_glasses: z.string().optional(),
  back_glasses: z.string().optional(),
  hook: z.enum(["Нема кука", "Со кука"]),
  hook_type: z.string().optional(),
  hook_approval: z.string().optional(),
  responsible_person: z.string().min(1, { message: "Ова поле е задолжително" }),
});

export const defaultValues: VehicleReportFormInputs = {
  business_number: "",
  date: new Date(),
  vin: "",
  engine_number: "",
  brand: "",
  type: "",
  year: "",
  model: "",
  category: "",
  car_body: "",
  address: "",
  variant_version: "",
  exhaust_gases: "",
  glasses: "Не се затемнани",
  side_glasses: "",
  back_glasses: "",
  hook: "Нема кука",
  hook_type: "AX50",
  hook_approval: "",
  responsible_person: "",
};
