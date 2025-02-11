import { zodResolver } from '@hookform/resolvers/zod';
import { Button, Form, toast } from '@nativebricks/core';
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
    console.log(data);
    toast.success('Form Submitted Successfully');
  };
  return (
    <View className="container">
      <Form.Input
        control={control}
        name="name"
        label="Name"
        placeholder="Enter your name"
        asterisk
        asteriskClassName="text-red-500"
      />
      <Form.Input
        control={control}
        name="email"
        label="Email"
        placeholder="Enter your email"
        asterisk
        helperText="Example: johndoe@gmail.com"
        asteriskClassName="text-red-500"
      />
      <Form.PasswordInput
        control={control}
        name="password"
        label="Password"
        placeholder="Enter your password"
        helperText="Must be atleast 8 characters long"
        asterisk
        asteriskClassName="text-red-500"
      />
      <Form.Select
        control={control}
        name="job"
        label="Job"
        placeholder="Select your job"
        options={[
          {
            label: 'Designer',
            value: 'designer',
          },
          {
            label: 'Developer',
            value: 'developer',
          },
          {
            label: 'Manager',
            value: 'manager',
          },
        ]}
      />
      <Button onPress={handleSubmit(submitHandler, console.error)}>
        <Text className="text-sm font-medium">Submit</Text>
      </Button>
    </View>
  );
}
