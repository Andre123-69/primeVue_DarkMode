<template>
  <div class="card">
    <h3 class="mb-4 text-center">
      desde pagos y deudas
    </h3>
    
    <div class="grid grid-cols-1 gap-6 p-4 md:grid-cols-2">
      <!-- Contenedor Debe -->
      <div class="p-6 border rounded-lg shadow-md bg-surface-100 dark:bg-surface-800 border-surface-200 dark:border-surface-700">
        <h4 class="mb-4 text-lg font-semibold text-center text-primary">Debe</h4>
        <div class="space-y-3">
          <div class="p-3 text-center text-white bg-gray-600 rounded">
            Contenido de deudas
          </div>
        </div>
      </div>

      <!-- Contenedor Pagos -->
      <div class="p-6 border rounded-lg shadow-md bg-surface-100 dark:bg-surface-800 border-surface-200 dark:border-surface-700">
        <h4 class="mb-4 text-lg font-semibold text-center text-primary">Pagos</h4>
        <div class="space-y-3">
          <div class="p-3 text-center text-white bg-gray-600 rounded">
            Contenido de pagos
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'DebeDeudas'
}
</script>

<style scoped>
</style>
