<template>

    <!-- Sección de acciones -->
    <Card class="mt-4" v-motion-slide-visible-once-bottom>
      <template #content>
        <div class="flex justify-content-between align-items-center">
          <div>
            <h3 class="m-0 text-lg font-semibold text-900">Items del Servidor</h3>
            <p class="mt-1 mb-0 text-600" v-if="totalItems > 0">
              Total de items registrados: {{ totalItems }}
            </p>
          </div>
          <Button :label="cargandoItems ? 'Cargando...' : 'Ver Items Existentes'"
            :icon="cargandoItems ? 'pi pi-spin pi-spinner' : 'pi pi-eye'" :loading="cargandoItems"
            :disabled="cargandoItems" @click="obtenerItems" outlined class="ml-4" />
        </div>
      </template>
    </Card>
    
    <!-- Lista de items agregados en esta sesión -->
    <div v-if="items.length > 0" class="mt-4 ListItemsProducts" v-motion-slide-visible-once-bottom>
        <Card>
        <template #title>
          <div class="flex gap-0 gap-2 align-items-center gap">
            <i class="text-xl text-green-500 pi pi-check-circle"></i>
            Items Agregados en esta Sesión
          </div>
        </template>
        <template #content>
          <div class="grid">
            <div v-for="(addedItem, index) in itemsAgregados" :key="addedItem.id || addedItem.internal_id"
              class="col-12 md:col-6 lg:col-4" v-motion-slide-visible-once-bottom
              :style="{ '--motion-delay': `${index * 100}ms` }">
              <Card class="item-added-card">
                <template #content>
                  <div class="flex mb-3 align-items-start justify-content-between">
                    <Badge value="Nuevo" severity="success" />
                    <Tag :value="addedItem.currency_type_id" severity="secondary" />
                  </div>

                  <h4 class="mb-2 font-semibold text-900">{{ addedItem.name }}</h4>

                  <div class="space-y-1 text-sm text-600">
                    <div><strong>ID:</strong> {{ addedItem.id }}</div>
                    <div><strong>Descripción:</strong> {{ addedItem.description }}</div>
                    <div><strong>ID Interno:</strong> {{ addedItem.internal_id }}</div>
                    <div><strong>Unidad:</strong> {{ addedItem.unit_type_id }}</div>
                    <div><strong>IGV:</strong> {{ addedItem.has_igv ? 'Sí' : 'No' }}</div>
                  </div>

                  <Divider />

                  <div class="grid grid-nogutter">
                    <div class="col-6">
                      <div class="text-sm text-600">Venta</div>
                      <div class="font-semibold text-green-600">
                        {{ formatCurrency(addedItem.sale_unit_price, addedItem.currency_type_id) }}
                      </div>
                    </div>
                    <div class="col-6">
                      <div class="text-sm text-600">Compra</div>
                      <div class="font-semibold text-blue-600">
                        {{ formatCurrency(addedItem.purchase_unit_price, addedItem.currency_type_id) }}
                      </div>
                    </div>
                  </div>
                </template>
              </Card>
            </div>
          </div>
        </template>
      </Card>
    </div>
    
</template>
<script setup>
import { defineProps } from 'vue';

// definimos la prop "items" que recibirá desde el padre
const props = defineProps({
  items: {
    type: Array,
    default: () => []
  }
});

// puedes definir tu función auxiliar aquí si no la tienes global
function formatCurrency(value, currency) {
  return new Intl.NumberFormat("es-PE", {
    style: "currency",
    currency: currency || "PEN"
  }).format(value);
}
</script>