<template>
  <div class="p-6">
    <div class="mb-6 text-center">
      <h2 class="text-2xl font-bold text-primary">Consulta de Deudas y Pagos</h2>
      <p class="text-gray-600" v-if="partnerData">Bienvenido {{ partnerData.names }}</p>
    </div>

    <div class="grid grid-cols-1 gap-6 p-4 md:grid-cols-2" v-motion-slide-visible-once-bottom>
      <!-- Contenedor Debe -->
      <div
        class="p-6 border rounded-lg shadow-md bg-surface-100 dark:bg-surface-800 border-surface-200 dark:border-surface-700">
        <h4 class="mb-4 text-lg font-semibold text-center text-primary">Deudas</h4>
        <div class="space-y-4">
          <div v-if="debts.length === 0" class="p-4 text-center text-gray-500"> No hay deudas pendientes
          </div>
          <div v-for="(debt, index) in debts" :key="index" class="p-4 border rounded-lg">
            <dl class="space-y-2">
              <div>
                <dt class="font-semibold">Periodo:</dt>
                <dd class="text-gray-600">{{ debt.period }}</dd>
              </div>
              <div>
                <dt class="font-semibold">Monto adeudado:</dt>
                <dd class="text-gray-600">S/ {{ debt.amount }}</dd>
              </div>
              <div>
                <dt class="font-semibold">Servicio:</dt>
                <dd class="text-gray-600">{{ debt.service_description }}</dd>
              </div>
              <div>
                <dt class="font-semibold">Días de mora:</dt>
                <dd class="text-gray-600">{{ debt.days_overdue }} días</dd>
              </div>
              <div>
                <dt class="font-semibold">Dirección:</dt>
                <dd class="text-gray-600">{{ debt.property_address }}</dd>
              </div>
            </dl>
            <Button
              label="Info" severity="info"
              class="w-full p-2 mt-4 ">
              Imprimir Recibo
              
            </Button>
          </div>
        </div>
      </div>

      <!-- Contenedor Pagos -->
      <div
        class="p-6 border rounded-lg shadow-md bg-surface-100 dark:bg-surface-800 border-surface-200 dark:border-surface-700">
        <h4 class="mb-4 text-lg font-semibold text-center text-primary">Pagos</h4>
        <div class="space-y-4">
          <div v-if="payments.length === 0" class="p-4 text-center text-gray-500">
            No hay pagos registrados
          </div>
          <div v-for="(payment, index) in payments" :key="index" class="p-4 border rounded-lg">
            <dl class="space-y-2">
              <div>
                <dt class="font-semibold">Periodo:</dt>
                <dd class="text-gray-600">{{ payment.period }}</dd>
              </div>
              <div>
                <dt class="font-semibold">Monto pagado:</dt>
                <dd class="text-gray-600">S/ {{ payment.amount }}</dd>
              </div>
              <div>
                <dt class="font-semibold">Servicio:</dt>
                <dd class="text-gray-600">{{ payment.service_description }}</dd>
              </div>
              <div>
                <dt class="font-semibold">Fecha de pago:</dt>
                <dd class="text-gray-600">{{ formatDate(payment.pay_date) }}</dd>
              </div>
              <div>
                <dt class="font-semibold">Dirección:</dt>
                <dd class="text-gray-600">{{ payment.property_address }}</dd>
              </div>
            </dl>
            <Button
              label="Info" severity="info"
              class="w-full p-极 mt-4 font-semibold">
              Imprimir Recibo
            </Button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { Button } from 'primevue';
import { ref, onMounted, getCurrentInstance } from 'vue';

export default {
  name: 'DebeDeudas',
  setup() {
    const app = getCurrentInstance().appContext.app;
    const partnerData = ref(null);
    const debts = ref([]);
    const payments = ref([]);

    onMounted(() => {
      const dniData = app.config.globalProperties.$appState.dniData;

      // CORRECCIÓN: Acceder al primer elemento del array
      if (dniData && dniData.data && dniData.data.length > 0 && dniData.data[0].partner) {
        partnerData.value = dniData.data[0].partner; // ← CAMBIO AQUÍ

        // Filtrar deudas (MOROSO)
        debts.value = dniData.data[0].partner.properties.flatMap(property =>
          property.debts.filter(debt => debt.state_display === "MOROSO")
        );

        // Filtrar pagos (PAGADO)
        payments.value = dniData.data[0].partner.properties.flatMap(property =>
          property.debts.filter(debt => debt.state_display === "PAGADO")
        );
      }
    });

    const formatDate = (dateString) => {
      if (!dateString) return 'No especificada';
      const date = new Date(dateString);
      return date.toLocaleDateString('es-ES');
    };

    return {
      partnerData,
      debts,
      payments,
      formatDate
    };
  }
}
</script>

<style scoped></style>