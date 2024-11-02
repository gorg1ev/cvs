type VehicleReportFormInputs = {
  business_number: string;
  date: Date;
  vin: string;
  engine_number: string;
  brand: string;
  type: string;
  year: string;
  model: string;
  category: string;
  car_body?: string;
  address: string;
  variant_version: string;
  exhaust_gases: string;
  glasses: glassesType;
  side_glasses?: string;
  back_glasses?: string;
  hook: hookType;
  hook_type?: string;
  hook_approval?: string;
  responsible_person: string;
};

type CarBody = {
  [key: string]: string[];
};

type glassesType = "Не се затемнани" | "Фабрички Затемнани" | "Фолија";

type hookType = "Нема кука" | "Со кука";

interface Window {
  electron: {
    generateTehnicalReport: (data: VehicleReportFormInputs) => void;
  };
}

type VehicleTextInfo = {
  glasses: glassesType;
  side_glasses?: string;
  back_glasses?: string;
  hook: hookType;
  hook_type?: string;
  hook_approval?: string;
};
