import { format } from "date-fns";
import { useForm } from "react-hook-form";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { Input } from "../ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { defaultValues, formSchema } from "./FormSchema";
import { Button } from "../ui/button";
import { CalendarIcon, Check, Clipboard } from "lucide-react";
import { cn } from "@/lib/utils";
import { Calendar } from "../ui/calendar";
import { InputOTP, InputOTPGroup, InputOTPSlot } from "../ui/input-otp";
import {
  addresses,
  car_body,
  CHASSIS_NUMBER,
  EURO_STANDART_NUNBER,
  glasses,
  hook,
  responsible_person,
  YEAR_NUMBER,
} from "./constants";
import { REGEXP_ONLY_DIGITS_AND_CHARS } from "input-otp";
import { RadioGroup, RadioGroupItem } from "../ui/radio-group";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { useEffect, useState } from "react";

export default function TehnicalReportForm() {
  const [clipboard, setClipboard] = useState(false);
  const form = useForm<VehicleReportFormInputs>({
    resolver: zodResolver(formSchema),
    defaultValues: defaultValues,
  });

  const pickedCategory = form.watch("category");
  const pickedGlass = form.watch("glasses");
  const pickedHook = form.watch("hook");

  function onSubmit(values: VehicleReportFormInputs) {
    window.electron.generateTehnicalReport(values);
  }

  function handleResetForm() {
    form.setFocus("business_number");
    form.reset();
  }

  function copyToClipboard() {
    navigator.clipboard.writeText(form.getValues("vin"));
    setClipboard(true);
  }

  useEffect(() => {
    const timer = setTimeout(() => {
      setClipboard(false);
    }, 3000);

    return () => {
      clearInterval(timer);
    };
  }, [clipboard]);

  useEffect(() => {
    console.log(form);
  }, [form]);

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="px-5 grid gap-5 grid-cols-[310px_310px_310px] grid-rows-[75px_75px_75px_75px_90px_75px_75px_75px]"
      >
        <FormField
          control={form.control}
          name="business_number"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Деловен Број</FormLabel>
              <FormControl>
                <Input {...field} className="h-[30px]" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="vin"
          render={({ field }) => (
            <FormItem className="col-span-2">
              <FormLabel>Идентификационен број на возилото</FormLabel>
              <div className="flex item-center gap-3">
                <FormControl>
                  <InputOTP
                    maxLength={CHASSIS_NUMBER}
                    {...field}
                    pattern={REGEXP_ONLY_DIGITS_AND_CHARS}
                  >
                    <InputOTPGroup>
                      {Array.from({ length: CHASSIS_NUMBER }).map(
                        (_, index) => (
                          <InputOTPSlot
                            key={index}
                            index={index}
                            className="h-[30px] w-[30px]"
                          />
                        )
                      )}
                    </InputOTPGroup>
                  </InputOTP>
                </FormControl>
                <Button
                  className="size-7"
                  type="button"
                  onClick={copyToClipboard}
                >
                  {!clipboard ? <Clipboard /> : <Check />}
                </Button>
              </div>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="date"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Датум</FormLabel>
              <Popover>
                <PopoverTrigger asChild>
                  <FormControl>
                    <Button
                      variant="outline"
                      className={cn(
                        "w-full pl-3 text-left font-normal h-[30px]"
                      )}
                    >
                      {format(field.value, "dd/MM/yyyy")}
                      <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                    </Button>
                  </FormControl>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    mode="single"
                    selected={field.value}
                    onSelect={(date) => field.onChange(date || new Date())}
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="engine_number"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Број на мотор</FormLabel>
              <FormControl>
                <Input {...field} className="h-[30px]" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="brand"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Марка на возилото</FormLabel>
              <FormControl>
                <Input {...field} className="h-[30px]" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="type"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Тип на возилото</FormLabel>
              <FormControl>
                <Input {...field} className="h-[30px]" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="year"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Година на производство на возилото</FormLabel>
              <FormControl>
                <InputOTP maxLength={YEAR_NUMBER} {...field}>
                  <InputOTPGroup>
                    {Array.from({ length: YEAR_NUMBER }).map((_, index) => (
                      <InputOTPSlot
                        key={index}
                        index={index}
                        className="h-[30px] w-[30px]"
                      />
                    ))}
                  </InputOTPGroup>
                </InputOTP>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="model"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Комерцијална ознака</FormLabel>
              <FormControl>
                <Input {...field} className="h-[30px]" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="address"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Име и адреса на комплетното возило</FormLabel>
              <FormControl>
                <Select onValueChange={field.onChange} value={field.value}>
                  <SelectTrigger className="h-[30px]">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {addresses.map((option, i) => (
                      <SelectItem value={option} key={i}>
                        {option}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="variant_version"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Варијанта / изведба</FormLabel>
              <FormControl>
                <Input {...field} className="h-[30px]" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="exhaust_gases"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Емисија на издувни гасови</FormLabel>
              <FormControl>
                <Select onValueChange={field.onChange} value={field.value}>
                  <SelectTrigger className="h-[30px]">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {Array.from({ length: EURO_STANDART_NUNBER }).map(
                      (_, i) => (
                        <SelectItem value={`EURO ${i + 1}`} key={i}>
                          Euro {i + 1}
                        </SelectItem>
                      )
                    )}
                  </SelectContent>
                </Select>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="category"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Категорија на возилото</FormLabel>
              <FormControl>
                <Select onValueChange={field.onChange} value={field.value}>
                  <SelectTrigger className="h-[30px]">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {Object.keys(car_body).map((body, i) => (
                      <SelectItem value={body} key={i}>
                        {body}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        {car_body[pickedCategory]?.length > 0 ? (
          <FormField
            control={form.control}
            name="car_body"
            render={({ field }) => (
              <FormItem className="row-start-6">
                <FormLabel>Облик и намена на каросерија</FormLabel>
                <FormControl>
                  <Select onValueChange={field.onChange} value={field.value}>
                    <SelectTrigger className="h-[30px]">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {car_body[pickedCategory]?.map(
                        (option: string, i: number) => (
                          <SelectItem value={option} key={i}>
                            {option}
                          </SelectItem>
                        )
                      )}
                    </SelectContent>
                  </Select>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        ) : (
          <></>
        )}
        <FormField
          control={form.control}
          name="glasses"
          render={({ field }) => (
            <FormItem className="space-y-3">
              <FormLabel>Стакла</FormLabel>
              <FormControl>
                <RadioGroup
                  onValueChange={field.onChange}
                  value={field.value}
                  className="flex flex-col space-y-1"
                >
                  {glasses.map((option, i) => (
                    <FormItem
                      className="flex items-center space-x-3 space-y-0"
                      key={i}
                    >
                      <FormControl>
                        <RadioGroupItem value={option} />
                      </FormControl>
                      <FormLabel className="font-normal">{option}</FormLabel>
                    </FormItem>
                  ))}
                </RadioGroup>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        {pickedGlass === "Фабрички Затемнани" && (
          <>
            <FormField
              control={form.control}
              name="side_glasses"
              render={({ field }) => (
                <FormItem className="row-start-6 col-start-2">
                  <FormLabel>Бочни Стакла</FormLabel>
                  <FormControl>
                    <Input {...field} className="h-[30px]" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="back_glasses"
              render={({ field }) => (
                <FormItem className="row-start-7 col-start-2">
                  <FormLabel>Задното сигурносно стакло</FormLabel>
                  <FormControl>
                    <Input {...field} className="h-[30px]" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </>
        )}
        <FormField
          control={form.control}
          name="hook"
          render={({ field }) => (
            <FormItem className="space-y-3">
              <FormLabel>Кука</FormLabel>
              <FormControl>
                <RadioGroup
                  onValueChange={field.onChange}
                  value={field.value}
                  className="flex flex-col space-y-1"
                >
                  {hook.map((option, i) => (
                    <FormItem
                      className="flex items-center space-x-3 space-y-0"
                      key={i}
                    >
                      <FormControl>
                        <RadioGroupItem value={option} />
                      </FormControl>
                      <FormLabel className="font-normal">{option}</FormLabel>
                    </FormItem>
                  ))}
                </RadioGroup>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        {pickedHook === "Со кука" && (
          <>
            <FormField
              control={form.control}
              name="hook_type"
              render={({ field }) => (
                <FormItem className="row-start-6 col-start-3">
                  <FormLabel>Тип на кука</FormLabel>
                  <FormControl>
                    <Input {...field} className="h-[30px]" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="hook_approval"
              render={({ field }) => (
                <FormItem className="row-start-7 col-start-3">
                  <FormLabel>Одобрение на кука</FormLabel>
                  <FormControl>
                    <Input {...field} className="h-[30px]" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </>
        )}
        <FormField
          control={form.control}
          name="responsible_person"
          render={({ field }) => (
            <FormItem className="row-start-7">
              <FormLabel>Oдговорно лице</FormLabel>
              <FormControl>
                <Select onValueChange={field.onChange} value={field.value}>
                  <SelectTrigger className="h-[30px]">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {responsible_person.map((option, i) => (
                      <SelectItem value={option} key={i}>
                        {option}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className=" row-start-8 flex gap-2 mt-5">
          <Button type="submit" className="w-[200px] row-start-8">
            Генерирај Извештај
          </Button>
          <Button
            type="button"
            className="w-[100px]"
            variant="destructive"
            onClick={handleResetForm}
          >
            Избриши
          </Button>
        </div>
      </form>
    </Form>
  );
}
