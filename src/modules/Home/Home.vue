<template >
    <div class="card">
        <div class="relative flex justify-center mb-5">
            <!-- imagen de fondo -->
           <!--  <img src="../../assets/img/fondo-awa.jpg" class=""   /> -->
        </div>

        <div>
            <h3>Bienvenido al portal</h3>
            <h3>Consulta tu deuda</h3>
        </div>
        <div>
            <!-- imagen del logo -->
            <img src="../../assets/img/logo-awa.png" type="image/x-icon" class="h-20 w-30" alt="Logo AWA" />
        </div>

        <!-- formulario -->
        <div class="flex justify-center">
        <Form :resolver="resolver" @submit="onFormSubmit" class="flex flex-col w-full gap-4 sm:w-56">
            <FormField v-slot="$field" name="username" initialValue="" class="flex flex-col gap-1">
                <label for="dni" class="mb-1">Ingrese su Dni</label>
                <InputText type="text" placeholder="dni" />
                <Message v-if="$field?.invalid" severity="error" size="small" variant="simple">{{ $field.error?.message }}</Message>
            </FormField>
            <RouterLink to="/debe-pagos">
            <Button 
            type="submit" 
            severity="secondary" 
            label="Submit"      
            />
            </RouterLink>
        </Form>
    </div>
        
    </div>
    <Toast />

</template>
<script setup>
import { reactive } from 'vue';
import { zodResolver } from '@primevue/forms/resolvers/zod';
import { z } from 'zod';
import { useToast } from 'primevue/usetoast';

const toast = useToast();

const resolver = zodResolver(
  z.object({
    username: z.string().min(1, { message: 'El dni es requerido' })
  })
);

const onFormSubmit = ({ valid }) => {
  if (valid) {
    toast.add({ severity: 'success', summary: 'Dni ingresado correctamente', life: 3000 });
  }
};
</script>
<style >
    
</style>