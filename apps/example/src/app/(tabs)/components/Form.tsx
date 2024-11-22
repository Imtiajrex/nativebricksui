import { zodResolver } from '@hookform/resolvers/zod';
import { Button, FormInput, FormSelect, toast } from '@nativebricks/core';
import React from 'react';
import { useForm } from 'react-hook-form';
import { Text, View } from 'react-native';
import { z } from 'zod';
const schema = z.object({
  name: z.string().min(2, { message: 'Name should be atleast 2 characters long' }),
  email: z.string().email(),
  password: z.string().min(8),
  job: z.enum(['designer', 'developer', 'manager']),
});
type FormValues = z.infer<typeof schema>;
export default function FormPage() {
  const { control, handleSubmit, reset } = useForm<FormValues>({
    defaultValues: {
      name: '',
      email: '',
      password: '',
    },
    resolver: zodResolver(schema),
  });
  const submitHandler = (data: FormValues) => {
    reset();
    toast.success('Form Submitted Successfully');
  };
  return (
    <View className="container">
      <FormInput
        control={control}
        name={'name'}
        label="Full Name"
        placeholder="Ex: Ok"
        helperText="Enter your full name"
      />
      <FormInput
        control={control}
        name={'email'}
        label="Email"
        placeholder="Ex: example@gmail.com"
      />
      <FormSelect
        control={control}
        name={'job'}
        label="Your Job"
        options={['designer', 'developer', 'manager']}
        placeholder="Select your job"
      />
      <FormInput control={control} name={'password'} label="Password" />
      <Button onPress={handleSubmit(submitHandler)}>
        <Text className="text-sm font-medium">Submit</Text>
      </Button>
    </View>
  );
}
