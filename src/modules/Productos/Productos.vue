<template>
  <div class="item-form-container">
    <!-- Header con animación -->
    <div class="header-section" v-motion-fade-visible-once>
      <div class="flex gap-3 mb-4 align-items-center">
        <i class="text-3xl pi pi-plus-circle text-primary"></i>
        <h2 class="m-0 text-2xl font-bold text-900">Registrar Nuevo Item</h2>
      </div>
      <Divider />
    </div>

    <!-- Formulario Principal -->
    <Card class="form-card" v-motion-slide-visible-once-bottom>
      <template #content>
        <form @submit.prevent="enviarItem">
          <div class="grid">
            <!-- Primera fila -->
            <div class=" col-12 md:col-6">
              <div class="field ">
                <label for="item_type_id" class="font-semibold text-900">
                  Tipo de Item <span class="text-red-500">*</span>
                </label>
                <InputText id="item_type_id" v-model="item.item_type_id" placeholder="Ej: 01" class="w-full" required />
              </div>
            </div>

            <div class="col-12 md:col-6 ">
              <div class="field ">  
                <label for="internal_id" class="font-semibold text-900">
                  ID Interno <span class="text-red-500">*</span>
                </label>
                <InputText id="internal_id" v-model="item.internal_id" placeholder="Ej: rrr" class="w-full" required />
              </div>
            </div>

            <!-- Segunda fila -->
            <div class="col-12 md:col-6">
              <div class="field">
                <label for="name" class="font-semibold text-900">
                  Nombre <span class="text-red-500">*</span>
                </label>
                <InputText id="name" v-model="item.name" placeholder="Nombre del item" class="w-full" required />
              </div>
            </div>

            <div class="col-12 md:col-6">
              <div class="field">
                <label for="description" class="font-semibold text-900">
                  Descripción <span class="text-red-500">*</span>
                </label>
                <InputText id="description" v-model="item.description" placeholder="Descripción del item" class="w-full"
                  required />
              </div>
            </div>

            <!-- Tercera fila -->
            <div class="col-12 md:col-4">
              <div class="field">
                <label for="unit_type_id" class="font-semibold text-900">
                  Tipo de Unidad <span class="text-red-500">*</span>
                </label>
                <Dropdown id="unit_type_id" v-model="item.unit_type_id" :options="unidadOptions" option-label="label"
                  option-value="value" placeholder="Seleccione unidad" class="w-full" required />
              </div>
            </div>

            <div class="col-12 md:col-4">
              <div class="field">
                <label for="currency_type_id" class="font-semibold text-900">
                  Tipo de Moneda <span class="text-red-500">*</span>
                </label>
                <Dropdown id="currency_type_id" v-model="item.currency_type_id" :options="monedaOptions"
                  option-label="label" option-value="value" placeholder="Seleccione moneda" class="w-full" required />
              </div>
            </div>

            <div class="col-12 md:col-4">
              <div class="field">
                <label for="sale_unit_price" class="font-semibold text-900">
                  Precio de Venta <span class="text-red-500">*</span>
                </label>
                <InputNumber id="sale_unit_price" v-model="item.sale_unit_price" mode="decimal" :min-fraction-digits="2"
                  :max-fraction-digits="2" placeholder="0.00" class="w-full" required />
              </div>
            </div>

            <!-- Cuarta fila -->
            <div class="col-12 md:col-4">
              <div class="field">
                <label for="purchase_unit_price" class="font-semibold text-900">
                  Precio de Compra
                </label>
                <InputNumber id="purchase_unit_price" v-model="item.purchase_unit_price" mode="decimal"
                  :min-fraction-digits="2" :max-fraction-digits="2" placeholder="0.00" class="w-full" required />
              </div>
            </div>

            <div class="col-12 md:col-6">
              <div class="field">
                <label for="sale_affectation_igv_type_id" class="font-semibold text-900">
                  Afectación IGV Venta
                </label>
                <Dropdown id="sale_affectation_igv_type_id" v-model="item.sale_affectation_igv_type_id"
                  :options="igvOptions" option-label="label" option-value="value" placeholder="Seleccione afectación"
                  class="w-full" />
              </div>
            </div>

            <!-- Checkboxes -->
            <div class="col-12">
              <div class="field">
                <label class="block mb-3 font-semibold text-900">Configuraciones Tributarias</label>
                <div class="gap-4">
                  <div class="field-checkbox">
                    <Checkbox id="has_igv" v-model="item.has_igv" :binary="true" />
                    <label for="has_igv" class="">Tiene IGV</label>
                  </div>

                  <div class="field-checkbox">
                    <Checkbox id="has_isc" v-model="item.has_isc" :binary="true" />
                    <label for="has_isc" class="">Tiene ISC</label>
                  </div>

                  <div class="field-checkbox">
                    <Checkbox id="has_perception" v-model="item.has_perception" :binary="true" />
                    <label for="has_perception" class="ml-2">Tiene Percepción</label>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- Botones -->
          <div class="flex gap-2 mt-4 justify-content-end">
            <Button label="Cancelar" icon="pi pi-times" severity="secondary" outlined @click="limpiarFormulario" />
            <Button type="submit" :label="cargando ? 'Enviando...' : 'Agregar Item'"
              :icon="cargando ? 'pi pi-spin pi-spinner' : 'pi pi-plus'" :loading="cargando" :disabled="cargando" />
          </div>
        </form>
      </template>
    </Card>

    <!-- Mensajes -->
    <Message v-if="mensaje" :severity="tipoMensaje === 'exito' ? 'success' : 'error'" :closable="true"
      @close="mensaje = ''" class="mt-3" v-motion-fade-visible-once>
      {{ mensaje }}
    </Message>

    


    <!-- Toast para mensajes -->
    <Toast />
  </div>
</template>

<script>
import { useToast } from 'primevue/usetoast';

import { ref } from 'vue';
import ListItemsProducts from '../../components/ListItemsProducts.vue';
const token = ref('mjVjhO5tf1JtZojEQDOGIB5wdcf7D5gM4Flt1K5Gd34crU4UUzkNxo3rSupq')
const apiUrl = ref('https://demo.tsifactur.cpe.pe/api/items/records') 

const itemsAgregados = ref([]) 

const itemsDelServidor = ref([
  {
    id: 1,
    name: "Producto A",
    description: "Descripción del producto A",
    internal_id: "INT-001",
    unit_type_id: "UNI",
    has_igv: true,
    currency_type_id: "PEN",
    sale_unit_price: 25.5,
    purchase_unit_price: 20
  }
]);

export default {
  name: 'ItemFormPrime',
  setup() {
    const toast = useToast();
    return { toast };
  },
  data() {
    return {
      // URL y token de la API
      apiUrl: 'https://demo.tsifactur.cpe.pe/api/item',
      token: 'mjVjhO5tf1JtZojEQDOGIB5wdcf7D5gM4Flt1K5Gd34crU4UUzkNxo3rSupq',


      // Estado del componente
      cargando: false,
      cargandoItems: false,
      mensaje: '',
      tipoMensaje: '',
      itemsAgregados: [],
      itemsDelServidor: [],
      totalItems: 0,

      // Opciones para dropdowns
      unidadOptions: [
        { label: 'NIU - Unidad', value: 'NIU' },
        { label: 'KGM - Kilogramo', value: 'KGM' },
        { label: 'MTR - Metro', value: 'MTR' },
        { label: 'LTR - Litro', value: 'LTR' },
        { label: 'SET - Juego', value: 'SET' }
      ],

      monedaOptions: [
        { label: 'PEN - Sol Peruano', value: 'PEN' },
        { label: 'USD - Dólar Americano', value: 'USD' },
        { label: 'EUR - Euro', value: 'EUR' }
      ],

      igvOptions: [
        { label: '10 - Gravado', value: '10' },
        { label: '20 - Exonerado', value: '20' },
        { label: '30 - Inafecto', value: '30' }
      ],

      // Datos del formulario
      item: {
        id: null,
        item_type_id: "01",
        internal_id: "",
        item_code: null,
        item_code_gs1: null,
        description: "",
        name: "",
        second_name: null,
        unit_type_id: "NIU",
        currency_type_id: "PEN",
        sale_unit_price: null,
        purchase_unit_price: 0,
        has_isc: false,
        system_isc_type_id: null,
        percentage_isc: 0,
        suggested_price: 0,
        sale_affectation_igv_type_id: "10",
        purchase_affectation_igv_type_id: "10",
        calculate_quantity: false,
        stock: 0,
        stock_min: 0,
        has_igv: true,
        has_perception: false,
        item_unit_types: [],
        percentage_of_profit: 0,
        percentage_perception: 0,
        image: null,
        image_url: null,
        temp_path: null,
        is_set: false,
        account_id: null,
        category_id: null,
        brand_id: null,
        date_of_due: null,
        lot_code: null,
        lots_enabled: false,
        lots: []
      }
    }
  },
  methods: {
    async enviarItem() {
      this.cargando = true;
      this.mensaje = '';

      try {
        const datosParaEnviar = {
          id: null,
          item_type_id: this.item.item_type_id || "01",
          internal_id: this.item.internal_id,
          item_code: null,
          item_code_gs1: null,
          description: this.item.description,
          name: this.item.name,
          second_name: null,
          unit_type_id: this.item.unit_type_id || "NIU",
          currency_type_id: this.item.currency_type_id || "PEN",
          sale_unit_price: this.item.sale_unit_price.toString(),
          purchase_unit_price: parseInt(this.item.purchase_unit_price) || 0,
          has_isc: this.item.has_isc || false,
          system_isc_type_id: null,
          percentage_isc: 0,
          suggested_price: 0,
          sale_affectation_igv_type_id: this.item.sale_affectation_igv_type_id || "10",
          purchase_affectation_igv_type_id: this.item.purchase_affectation_igv_type_id || "10",
          calculate_quantity: false,
          stock: 0,
          stock_min: 0,
          has_igv: this.item.has_igv !== undefined ? this.item.has_igv : true,
          has_perception: this.item.has_perception || false,
          item_unit_types: [],
          percentage_of_profit: 0,
          percentage_perception: 0,
          image: null,
          image_url: null,
          temp_path: null,
          is_set: false,
          account_id: null,
          category_id: null,
          brand_id: null,
          date_of_due: null,
          lot_code: null,
          lots_enabled: false,
          lots: []
        };

        const response = await fetch(this.apiUrl, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${this.token}`,
          },
          body: JSON.stringify(datosParaEnviar)
        });

        const responseText = await response.text();

        if (!response.ok) {
          let errorDetail = responseText;
          try {
            const errorJson = JSON.parse(responseText);
            if (errorJson.message) {
              errorDetail = errorJson.message;
            } else if (errorJson.errors) {
              errorDetail = JSON.stringify(errorJson.errors);
            }
          } catch (e) {
            // Si no es JSON, usar el texto tal como está
          }

          throw new Error(`Error HTTP: ${response.status} - ${errorDetail}`);
        }

        let resultado;
        try {
          resultado = JSON.parse(responseText);
        } catch (e) {
          resultado = { mensaje: 'Item creado exitosamente', data: responseText };
        }

        // Mostrar toast de éxito
        if (resultado.success && resultado.msg) {
          this.toast.add({
            severity: 'success',
            summary: 'Éxito',
            detail: `${resultado.msg} - ID: ${resultado.data.id}`,
            life: 5000
          });
        } else {
          this.toast.add({
            severity: 'success',
            summary: 'Item Agregado',
            detail: 'Item agregado exitosamente!',
            life: 5000
          });
        }

        // Agregar el item a la lista
        this.itemsAgregados.unshift(resultado.data || resultado);

        // Limpiar formulario
        this.limpiarFormulario();

      } catch (error) {
        console.error('Error al enviar item:', error);
        let detalle = error.message;
        if (detalle.includes('Integrity constraint violation')) {
          detalle = 'El tipo de item seleccionado no es válido. Por favor, verifica que el campo "Tipo de Item" tenga un valor permitido.';
        }

        this.toast.add({
          severity: 'error',
          summary: 'Error',
          detail: `Error: ${detalle}`,
          life: 8000
        });
      } finally {
        this.cargando = false;
      }
    },

    limpiarFormulario() {
      this.item.internal_id = '';
      this.item.description = '';
      this.item.name = '';
      this.item.sale_unit_price = null;
      this.item.purchase_unit_price = 0;
    },

    async obtenerItems() {
      this.cargandoItems = true;

      try {
        const response = await fetch(this.apiUrl, {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${this.token}`,
            'Content-Type': 'application/json',
          }
        });

        const responseText = await response.text();

        if (!response.ok) {
          let errorDetail = `Error ${response.status}: ${response.statusText}`;
          try {
            const errorJson = JSON.parse(responseText);
            if (errorJson.message) errorDetail = errorJson.message;
          } catch (e) { }

          this.toast.add({
            severity: 'error',
            summary: 'Error',
            detail: `No se pudieron obtener los items: ${errorDetail}`,
            life: 5000
          });
          return;
        }

        let items = [];
        try {
          const result = JSON.parse(responseText);

          if (result.data && Array.isArray(result.data)) {
            items = result.data;
          } else if (Array.isArray(result)) {
            items = result;
          } else if (result.items && Array.isArray(result.items)) {
            items = result.items;
          }

          this.itemsDelServidor = items;
          this.totalItems = items.length;

          if (items.length > 0) {
            this.toast.add({
              severity: 'info',
              summary: 'Items Cargados',
              detail: `Se encontraron ${items.length} items en el servidor`,
              life: 3000
            });
          } else {
            this.toast.add({
              severity: 'warn',
              summary: 'Sin Items',
              detail: 'No hay items registrados en el servidor aún',
              life: 3000
            });
          }

        } catch (e) {
          console.error('Error al parsear respuesta GET:', e);
          this.toast.add({
            severity: 'error',
            summary: 'Error de Datos',
            detail: 'La respuesta del servidor no se pudo procesar',
            life: 5000
          });
        }

      } catch (error) {
        console.error('Error al obtener items:', error);
        this.toast.add({
          severity: 'error',
          summary: 'Error de Conexión',
          detail: `Error de conexión: ${error.message}`,
          life: 5000
        });
      } finally {
        this.cargandoItems = false;
      }
    },

    formatCurrency(value, currency = 'PEN') {
      const symbols = {
        'PEN': 'S/',
        'USD': '$',
        'EUR': '€'
      };
      return `${symbols[currency] || 'S/'} ${parseFloat(value || 0).toFixed(2)}`;
    },

    verDetalle(item) {
      this.toast.add({
        severity: 'info',
        summary: 'Detalle del Item',
        detail: `Mostrando información de: ${item.name}`,
        life: 3000
      });
    }
  }
}
</script>

<style scoped>
.item-form-container {
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
}

.header-section {
  margin-bottom: 2rem;
}

.form-card {
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  border-radius: 12px;
  overflow: hidden;
}

.item-server-card,
.item-added-card {
  height: 100%;
  border-radius: 8px;
  transition: all 0.3s ease;
}

.item-server-card:hover,
.item-added-card:hover {
  transform: translateY(-2px);
  box-shadow: 0 6px 12px rgba(0, 0, 0, 0.15);
}

.item-server-card {
  border-left: 4px solid #3b82f6;
}

.item-added-card {
  border-left: 4px solid #10b981;
}

.space-y-1>div:not(:first-child) {
  margin-top: 0.25rem;
}

/* Animaciones personalizadas */
@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(30px);
  }

  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.fade-in-up {
  animation: fadeInUp 0.6s ease-out;
}

/* Responsive adjustments */
@media (max-width: 768px) {
  .item-form-container {
    padding: 10px;
  }

  .grid>div {
    padding: 0.5rem;
  }
}

/* Field spacing */
.field {
  margin-bottom: 1.5rem;
}

.field label {
  margin-bottom: 0.5rem;
  display: block;
}

/* Custom PrimeVue overrides */
:deep(.p-card-content) {
  padding: 3rem;

  margin-bottom: 2rem;
}

:deep(.p-button) {
  border-radius: 6px;
}

:deep(.p-inputtext),
:deep(.p-dropdown),
:deep(.p-inputnumber-input) {
  border-radius: 6px;
  border: 1px solid #d1d5db;
  transition: all 0.2s;
}

:deep(.p-inputtext:focus),
:deep(.p-dropdown:not(.p-disabled):focus),
:deep(.p-inputnumber:not(.p-disabled):focus) {
  border-color: #3b82f6;
  box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
}

:deep(.p-toast-message) {
  border-radius: 8px;
}
</style>