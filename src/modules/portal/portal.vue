<template>
  <div class="portal-container">
    <!-- Fondo de imagen con animación de carga suave -->
    <div class="background-image">
      <img src="@/assets/img/awa2.jpg" alt="Fondo AWA"
        class="object-cover w-full h-full transition-opacity duration-1000 opacity-0" @load="handleImageLoad" />
    </div>

    <!-- Contenido sobre el fondo -->
    <div class="content-overlay">
      <!-- Logo -->
      <div class="logo-container">
        <img src="@/assets/img/logo-awa.png" type="image/x-icon" class="h-50 w-60" alt="Logo AWA" />
      </div>

      <!-- Títulos -->
      <div class="mb-6 text-center">
        <h3 class="mb-2 text-2xl font-bold text-white">Bienvenido al portal</h3>
        <h3 class="text-xl text-white">Consulta tu d uda</h3>
      </div>

      <!-- Formulario con contenedor transparente difuminado -->
      <div class="flex justify-center" v-motion-slide-visible-once-bottom>
        <div class="blurred-container">
          <Form :resolver="resolver" @submit="onFormSubmit" class="flex flex-col w-full gap-4">
            <FormField v-slot="$field" name="username" initialValue="" class="flex flex-col gap-1">
              <label for="dni" class="mb-1 font-semibold text-white">Ingrese su Dni</label>
              <InputText v-bind="$field.props" type="text" placeholder="dni" class="w-full" />
              <Message v-if="$field?.invalid" severity="error" size="small" variant="simple">{{ $field.error?.message }}
              </Message>
            </FormField>
            <Button type="submit" severity="secondary" :label="isLoading ? 'Consultando...' : 'Consultar'"
              class="w-full" :disabled="isLoading" />
          </Form>

        </div>
      </div>
    </div>

    <Toast />
  </div>
</template>

<script setup>
import { reactive } from 'vue';
import { watch, ref, getCurrentInstance } from 'vue';
import { zodResolver } from '@primevue/forms/resolvers/zod';
import { z } from 'zod';
import { useToast } from 'primevue/usetoast';
import { useRoute, useRouter } from 'vue-router';

const route = useRoute(); // ruta actual
const router = useRouter(); // router para navegación
const app = getCurrentInstance().appContext.app;

const isNoLayoutRoute = ref(route.meta.noLayout);
const isLoading = ref(false);

// Observa cambios en la ruta para actualizar isNoLayoutRoute
watch(route, (newRoute) => {
  isNoLayoutRoute.value = newRoute.meta.noLayout;
});

const toast = useToast();
const apiUrl = import.meta.env.VITE_API_URL;

const resolver = zodResolver(
  z.object({
    username: z.string().min(1, { message: 'El dni es requerido' })
  })
);

const handleImageLoad = (event) => {
  event.target.classList.remove('opacity-0');
  event.target.classList.add('opacity-100');
};

const onFormSubmit = async ({ valid, values }) => {
  console.log('Form submitted with values:', values);

  if (valid) {
    isLoading.value = true;
    const dni = values.username;

    try {
      const response = await fetch(`${apiUrl}system-dni/search/?doc_number=${dni}`);

      if (!response.ok) {
        throw new Error(`Error HTTP: ${response.status}`);
      }

      const data = await response.json();
      console.log('Datos recibidos:', data);

      // ESTRUCTURA REAL: data es un array, necesitamos el primer elemento
      // data.data[0].partner en lugar de data.data.partner
      if (data.data && data.data.length > 0 && data.data[0].partner) {
        toast.add({
          severity: 'success',
          summary: 'DNI encontrado correctamente',
          life: 3000
        });

        app.config.globalProperties.$appState.dniData = data;
        router.push('/debe-pagos');

      } else {
        toast.add({
          severity: 'error',
          summary: 'DNI no encontrado en el sistema',
          life: 3000
        });
      }

    } catch (error) {
      console.error('Error completo:', error);
      toast.add({
        severity: 'error',
        summary: 'Error de conexión con el servidor',
        detail: error.message,
        life: 3000
      });
    } finally {
      isLoading.value = false;
    }
  } else {
    toast.add({
      severity: 'error',
      summary: 'Por favor ingrese un DNI válido',
      life: 3000
    });
  }
};

//  traer datos del servidor para validar el DNI
const fetchDniValidation = async (dni) => {
  try {
    const response = await fetch(`${apiUrl}system-dni/search/?doc_number=${dni}`);

    if (!response.ok) {
      console.error('Error HTTP:', response.status, response.statusText);
      return false;
    }

    const data = await response.json();
    console.log('Respuesta completa del servidor:', data);

    // CORRECCIÓN: Verificar array y primer elemento
    return data.data && data.data.length > 0 && data.data[0].partner ? true : false;

  } catch (error) {
    console.error('Error fetching DNI validation:', error);
    return false;
  }
};
</script>

<style scoped>
.portal-container {
  position: relative;
  width: 100%;
  height: 100vh;
  overflow: hidden;
  /*    considera agregar un color de fondo de respaldo cuando la imagen no cargue. */
  background-color: #000;

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
  transition: opacity 1s ease-in-out;
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
  box-shadow: 0 8px 32px rgba(131, 3, 3, 0.1);
}

.text-white {
  color: white;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.5);

}

/* color del contorno de la caja de texto */
.InputText {
  border-color: aqua;
}
</style>
