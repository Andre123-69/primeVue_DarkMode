<template>
  <div class="portal-container">
    <!-- Fondo de imagen -->
    <div class="background-image">
      <img src="../../assets/img/awa.jpg" alt="Fondo AWA" class="object-cover w-full h-full" />
    </div>

    <!-- Contenido sobre el fondo -->
    <div class="content-overlay">
      <!-- Logo -->
      <div class="logo-container">
        <img src="../../assets/img/logo-awa.png" type="image/x-icon" class="h-20 w-30" alt="Logo AWA" />
      </div>

      <!-- Títulos -->
      <div class="mb-6 text-center">
        <h3 class="mb-2 text-2xl font-bold text-white">Bienvenido al portal</h3>
        <h3 class="text-xl text-white">Consulta tu deuda</h3>
      </div>

      <!-- Formulario con contenedor transparente difuminado -->
      <div class="flex justify-center">
        <div class="blurred-container">
          <Form :resolver="resolver" @submit="onFormSubmit" class="flex flex-col w-full gap-4">
            <FormField v-slot="$field" name="username" initialValue="" class="flex flex-col gap-1">
              <label for="dni" class="mb-1 font-semibold text-white">Ingrese su Dni</label>
              <InputText type="text" placeholder="dni" class="w-full" />
              <Message v-if="$field?.invalid" severity="error" size="small" variant="simple">{{ $field.error?.message }}</Message>
            </FormField>
            <RouterLink to="/debe-pagos">
              <Button 
                type="submit" 
                severity="secondary" 
                label="Consultar"      
                class="w-full"
              />
            </RouterLink>
          </Form>
        </div>
      </div>
    </div>
    
    <Toast />
  </div>
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

<style scoped>
.portal-container {
  position: relative;
  width: 100%;
  height: 100vh;
  overflow: hidden;
}

.background-image {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 1;
}

.background-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.content-overlay {
  position: relative;
  z-index: 2;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 2rem;
}

.logo-container {
  margin-bottom: 2rem;
}

.blurred-container {
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: 12px;
  padding: 2rem;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
}

.text-white {
  color: white;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.5);
}
</style>
