"use client";
import React from "react";
import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "./ui/form";
import { Input, InputWrapper } from "./ui/input";
import { Control, FieldPath, FieldValues, Form } from "react-hook-form";
import { FormFieldType } from "./forms/PatientForm";
import { Euro } from "lucide-react";
import Image from "next/image";
import "react-phone-number-input/style.css";
import PhoneInput from "react-phone-number-input";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { Select, SelectContent, SelectTrigger, SelectValue } from "./ui/select";
import { Textarea } from "./ui/textarea";
import { Checkbox } from "./ui/checkbox";
import { Label } from "./ui/label";

interface CustomProps<T extends FieldValues = FieldValues> {
  control: Control<T>;
  fieldType: FormFieldType;
  name: FieldPath<T>;
  label?: string;
  placeholder?: string;
  iconSrc?: string;
  iconAlt?: string;
  disabled?: boolean;
  dateFormat?: string;
  showTimeSelect?: boolean;
  children?: React.ReactNode;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  renderSkeleton?: (field: any) => React.ReactNode;
}

const RenderField = ({
  field,
  props,
}: {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  field: any;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  props: CustomProps<any>;
}) => {
  const {
    fieldType,
    iconSrc,
    iconAlt,
    placeholder,
    showTimeSelect,
    dateFormat,
    renderSkeleton,
  } = props;

  switch (fieldType) {
    case FormFieldType.INPUT:
      return (
        <InputWrapper className="shad-input">
          {iconSrc && (
            <Image
              src={iconSrc}
              alt={iconAlt || "icon"}
              width={24}
              height={24}
            />
          )}
          <Input
            className="border-0 !h-full rounded-none"
            {...field}
            placeholder={placeholder}
            {...props}
          />
        </InputWrapper>
      );

    case FormFieldType.TEXTAREA:
      return (
        <FormControl>
          <Textarea
            className="shad-textarea"
            disabled={props.disabled}
            {...field}
            placeholder={placeholder}
          />
        </FormControl>
      );

    case FormFieldType.PHONE_INPUT:
      return (
        <FormControl>
          <PhoneInput
            defaultCountry="EG"
            placeholder={placeholder}
            international
            withCountyCallingCode
            value={field.value}
            onChange={field.onChange}
            className="input-phone border-0 [&_input]:outline-0 [&_input]:h-full [&_select]:bg-dark-400"
          />
        </FormControl>
      );

    case FormFieldType.DATE_PICKER:
      return (
        <div className="flex items-center rounded-md border border-dark-500 bg-dark-400">
          <Image
            src="/assets/icons/calendar.svg"
            alt="calendar"
            width={24}
            height={24}
            className="ml-2"
          />

          <FormControl>
            <DatePicker
              selected={field.value}
              onChange={(date) => field.onChange(date)}
              className="w-full"
              dateFormat={dateFormat ?? "MM/dd/yyyy"}
              showTimeSelect={showTimeSelect ?? false}
              timeInputLabel="Time:"
              wrapperClassName="date-picker [&_input]:outline-0 [&_input]:h-full "
            />
          </FormControl>
        </div>
      );

    case FormFieldType.SKELETON:
      return renderSkeleton ? renderSkeleton(field) : null;

    case FormFieldType.SELECT:
      return (
        <FormControl>
          <Select defaultValue={field.value} onValueChange={field.onChange}>
            <FormControl>
              <SelectTrigger className="shad-select-trigger">
                <SelectValue placeholder={placeholder} />
              </SelectTrigger>
            </FormControl>
            <SelectContent className="shad-select-content">
              {props.children}
            </SelectContent>
          </Select>
        </FormControl>
      );

    case FormFieldType.CHECKBOX:
      return (
        <FormControl>
          <div className="flex items-center gap-4">
            <Checkbox
              id={props.name}
              checked={field.value}
              onCheckedChange={field.onChange}
            />
            <Label htmlFor={props.name} className="checkbox-label">
              {props.label}
            </Label>
          </div>
        </FormControl>
      );
    default:
      return null;
  }
};

function CustomFormField<T extends FieldValues = FieldValues>(
  props: CustomProps<T>
) {
  const { control, fieldType, name, label } = props;
  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem className="flex-1">
          {fieldType !== FormFieldType.CHECKBOX && label && (
            <FormLabel>{label}</FormLabel>
          )}

          <RenderField field={field} props={props} />

          <FormMessage className="!text-red-400" />
        </FormItem>
      )}
    />
  );
}

export default CustomFormField;
