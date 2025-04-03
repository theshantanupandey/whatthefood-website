
import React from "react";
import { 
  FormField, 
  FormItem, 
  FormLabel, 
  FormControl, 
  FormDescription, 
  FormMessage 
} from "@/components/ui/form";
import { useId } from "react";
import { FieldPath, FieldValues, UseFormReturn } from "react-hook-form";

interface EnhancedFormFieldProps<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>
> {
  form: UseFormReturn<TFieldValues>;
  name: TName;
  label: string;
  description?: string;
  required?: boolean;
  showRequiredIndicator?: boolean;
  descriptionId?: string;
  children: React.ReactNode | ((props: { error?: string; id: string }) => React.ReactNode);
}

export function EnhancedFormField<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>
>({
  form,
  name,
  label,
  description,
  required = false,
  showRequiredIndicator = true,
  descriptionId: customDescriptionId,
  children,
}: EnhancedFormFieldProps<TFieldValues, TName>) {
  const uniqueId = useId();
  const descriptionId = customDescriptionId || `${uniqueId}-description`;
  const isChildrenFunction = typeof children === 'function';

  return (
    <FormField
      control={form.control}
      name={name}
      render={({ field, fieldState }) => (
        <FormItem>
          <FormLabel htmlFor={field.name}>
            {label}
            {required && showRequiredIndicator && <span className="text-destructive ml-1">*</span>}
          </FormLabel>
          <FormControl>
            {isChildrenFunction
              ? children({ error: fieldState.error?.message, id: field.name })
              : React.cloneElement(children as React.ReactElement, {
                  ...field,
                  id: field.name,
                  'aria-describedby': description ? descriptionId : undefined,
                  'aria-required': required,
                  'aria-invalid': !!fieldState.error,
                })
            }
          </FormControl>
          {description && (
            <FormDescription id={descriptionId}>
              {description}
            </FormDescription>
          )}
          <FormMessage />
        </FormItem>
      )}
    />
  );
}
