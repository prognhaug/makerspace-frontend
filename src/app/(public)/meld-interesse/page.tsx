"use client";

import React from "react";
import { useForm } from "react-hook-form";
import Button from "@/components/ui/Button";
import Input from "@/components/ui/forms/Input";

type FormData = {
  name: string;
  email: string;
};

export default function ExpressInterest() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
    setError,
  } = useForm<FormData>({
    mode: "onTouched", // This triggers validation on blur
  });

  const onSubmit = async (data: FormData) => {
    try {
      console.log(data);

      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000));

      // Reset form after successful submission
      reset();

      // Show success message
      alert("Takk for din interesse!");
    } catch (error) {
      console.error("Error submitting form:", error);

      // Example of setting a form error manually
      setError("name", {
        type: "manual",
        message: "Det oppstod en feil. Prøv igjen senere.",
      });
    }
  };

  // For testing - uncomment to see errors immediately
  // React.useEffect(() => {
  //   setError("name", { type: "manual", message: "Test error message" });
  // }, [setError]);

  return (
    <div className="min-h-screen bg-primary-faint py-16 px-4">
      <div className="max-w-md mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-size-h2 font-bold text-text mb-4">
            MELD INTERESSE
          </h1>
          <p className="text-text font-work-sans text-size-p1">
            Meld interesse og få mail når du kan melde deg inn.
          </p>
        </div>

        <form
          onSubmit={handleSubmit(onSubmit)}
          className="space-y-6 max-w-sm mx-auto"
          noValidate
        >
          <Input
            label="Navn"
            {...register("name", { required: "Navn er påkrevd" })}
            error={errors.name?.message}
          />

          <Input
            label="E-post"
            type="email"
            {...register("email", {
              required: "E-post er påkrevd",
              pattern: {
                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                message: "Ugyldig e-postadresse",
              },
            })}
            error={errors.email?.message}
          />

          <Button
            type="submit"
            disabled={isSubmitting}
            variant="default"
            size="lg"
            fullWidth
            className="mt-6"
          >
            {isSubmitting ? "Sender..." : "Meld interesse"}
          </Button>
        </form>
      </div>
    </div>
  );
}
