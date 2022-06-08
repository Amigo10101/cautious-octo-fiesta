import React from 'react';
import { useForm } from 'react-hook-form';

export default function Addoffice() {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const onSubmit = data => console.log(data);
  console.log(errors);
  
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <input type="text" placeholder="Parent Company Name" {...register("Parent Company Name", {required: true, maxLength: 20})} />
      <input type="text" placeholder="Office Detail" {...register("Office Detail", {required: true, maxLength: 100})} />
      <input type="text" placeholder="Office Address" {...register("Office Address", {required: true    })} />
      <input type="tel" placeholder="Mobile number" {...register("Mobile number", {required: true, minLength: 6, maxLength: 12})} />
      <select {...register("Office Type", { required: true })}>
        <option value="Mr">Mr</option>
        <option value="Mrs">Mrs</option>
        <option value="Miss">Miss</option>
        <option value="Dr">Dr</option>
      </select>

      <input type="submit" />
    </form>
  );
}