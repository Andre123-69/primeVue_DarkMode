/* Responsive adjustments */
@media (max-width: 768px) {
  .item-form-container {
    padding: 10px;
  }
  
  .flex.justify-content-end {
    flex-direction: column;
    gap: 0.5rem !important;
  }
  
  .flex.justify-content-end > button {
    width: 100%;
  }
}<template>
  <div class="item-form-container">
    <!-- Header -->
    <div class="header-section" v-motion-fade-visible-once>
      <h2 class="m-0 text-2xl font-bold text-900 mb-4">Registrar Nuevo Item</h2>
    </div>

    <!-- Formulario Principal -->
    <Card class="form-card" v-motion-slide-visible-once-bottom>
      <template #content>
        <form @submit.prevent="enviarItem">
          <!-- Primera fila - campos principales en una sola línea horizontal -->
          <div class="align-items-form">
            <div class="field-group col-12 md:col-2">
              <label for="item_type_id" class="field-label">
                Tipo de Item <span class="text-red-500">*</span>
              </label>
              <InputText 
                id="item_type_id" 
                v-model="item.item_type_id" 
                placeholder="Ej: 01" 
                class="w-full" 
                required 
              />
            </div>

            <div class="field-group col-12 md:col-2">
              <label for="internal_id" class="field-label">
                ID Interno <span class="text-red-500">*</span>
              </label>
              <InputText 
                id="internal_id" 
                v-model="item.internal_id" 
                placeholder="Ej: rrr" 
                class="w-full" 
                required 
              />
            </div>

            <div class="field-group col-12 md:col-2">
              <label class="field-label">IGV</label>
              <div class="igv-control">
                <Tag 
                  :value="item.has_igv ? 'Con IGV' : 'Sin IGV'" 
                  :severity="item.has_igv ? 'success' : 'danger'"
                  :icon="item.has_igv ? 'pi pi-check' : 'pi pi-times'"
                />
                <InputSwitch v-model="item.has_igv" class="mt-2" />
              </div>
            </div>

            <div class="field-group col-12 md:col-3">
              <label for="unit_type_id" class="field-label">
                Tipo de Unidad <span class="text-red-500">*</span>
              </label>
              <Dropdown 
                id="unit_type_id" 
                v-model="item.unit_type_id" 
                :options="unidadOptions" 
                option-label="label"
                option-value="value" 
                placeholder="Seleccione unidad" 
                class="w-full" 
                required 
              />
            </div>

            <div class="field-group col-12 md:col-3">
              <label for="currency_type_id" class="field-label">
                Moneda <span class="text-red-500">*</span>
              </label>
              <Dropdown 
                id="currency_type_id" 
                v-model="item.currency_type_id" 
                :options="monedaOptions"
                option-label="label" 
                option-value="value" 
                placeholder="Seleccione moneda" 
                class="w-full" 
                required 
              />
            </div>
          </div>

          <!-- Segunda fila -->
          <div class="align-items-form">
            <div class="field-group col-12 md:col-6">
              <label for="name" class="field-label">
                Nombre del Item <span class="text-red-500">*</span>
              </label>
              <InputText 
                id="name" 
                v-model="item.name" 
                placeholder="Ingrese el nombre del item" 
                class="w-full" 
                required 
              />
            </div>

            <div class="field-group col-12 md:col-3">
              <label for="sale_unit_price" class="field-label">
                Precio de Venta <span class="text-red-500">*</span>
              </label>
              <InputNumber 
                id="sale_unit_price" 
                v-model="item.sale_unit_price" 
                mode="currency" 
                currency="PEN" 
                locale="es-PE"
                :min-fraction-digits="2"
                :max-fraction-digits="2" 
                placeholder="0.00" 
                class="w-full" 
                required 
              />
            </div>

            <div class="field-group col-12 md:col-3">
              <label for="purchase_unit_price" class="field-label">
                Precio de Compra
              </label>
              <InputNumber 
                id="purchase_unit_price" 
                v-model="item.purchase_unit_price" 
                mode="currency" 
                currency="PEN" 
                locale="es-PE"
                :min-fraction-digits="2"
                :max-fraction-digits="2" 
                placeholder="0.00" 
                class="w-full" 
              />
            </div>
          </div>

          <!-- Tercera fila -->
          <div class="align-items-form">
            <div class="field-group col-12 md:col-8">
              <label for="description" class="field-label">
                Descripción del Item <span class="text-red-500">*</span>
              </label>
              <Textarea 
                id="description" 
                v-model="item.description" 
                rows="4" 
                placeholder="Describa las características del item"
                class="w-full" 
                required 
              />
            </div>

            <div class="field-group col-12 md:col-4">
              <label for="sale_affectation_igv_type_id" class="field-label">
                Afectación IGV
              </label>
              <Dropdown 
                id="sale_affectation_igv_type_id" 
                v-model="item.sale_affectation_igv_type_id"
                :options="igvOptions" 
                option-label="label" 
                option-value="value" 
                placeholder="Seleccione afectación"
                class="w-full mb-3" 
              />

              <!-- Checkboxes adicionales -->
              <div class="field">
                <label class="block mb-2 field-label">Configuraciones</label>
                
                <div class="field-checkbox mb-2">
                  <Checkbox id="has_isc" v-model="item.has_isc" :binary="true" />
                  <label for="has_isc" class="ml-2">Tiene ISC</label>
                </div>

                <div class="field-checkbox">
                  <Checkbox id="has_perception" v-model="item.has_perception" :binary="true" />
                  <label for="has_perception" class="ml-2">Tiene Percepción</label>
                </div>
              </div>
            </div>
          </div>

          <!-- Mensaje informativo -->
          <div class="mt-4">
            <Message 
              severity="info" 
              :closable="false"
              class="w-full"
            >
              <template #icon>
                <i class="pi pi-info-circle"></i>
              </template>
              Complete todos los campos obligatorios marcados con (*)
            </Message>
          </div>

          <!-- Botones de acción -->
          <div class="flex gap-3 mt-5 justify-content-end">
            <Button 
              label="Cancelar" 
              icon="pi pi-times" 
              severity="secondary" 
              outlined 
              @click="limpiarFormulario"
              class="px-4 py-2"
            />
            <Button 
              type="submit" 
              :label="cargando ? 'Enviando...' : 'Agregar Item'"
              :icon="cargando ? 'pi pi-spin pi-spinner' : 'pi pi-plus'" 
              :loading="cargando" 
              :disabled="cargando"
              severity="success"
              class="px-4 py-2"
            />
          </div>
        </form>
      </template>
    </Card>

    <!-- Toast para mensajes -->
    <Toast />
  </div>
</template>

<script>
import { useToast } from 'primevue/usetoast';
import { ref } from 'vue';

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
      itemsAgregados: [],

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
        { label: 'USD - Dólar', value: 'USD' },
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
      this.item.item_type_id = "01";
      this.item.unit_type_id = "NIU";
      this.item.currency_type_id = "PEN";
      this.item.has_igv = true;
      this.item.has_isc = false;
      this.item.has_perception = false;
      this.item.sale_affectation_igv_type_id = "10";

      this.toast.add({
        severity: 'info',
        summary: 'Formulario Limpiado',
        detail: 'Se ha limpiado el formulario',
        life: 3000
      });
    }
  }
}
</script>

<style scoped>
.item-form-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
}

.header-section {
  margin-bottom: 1.5rem;
}

.form-card {
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  border-radius: 8px;
  border: 1px solid #e5e7eb;
}

.field {
  margin-bottom: 1rem;
}

.field label {
  font-size: 0.875rem;
  font-weight: 500;
}

/* Estilos para el layout horizontal como en la imagen */
.align-items-form {
  display: grid;
  grid-template-columns: repeat(12, 1fr);
  gap: 1rem;
  margin-bottom: 1.5rem;
}

.field-group {
  display: flex;
  flex-direction: column;
}

.field-group.col-12 {
  grid-column: span 12;
}

.field-group.col-12.md\:col-2 {
  grid-column: span 12;
}

.field-group.col-12.md\:col-3 {
  grid-column: span 12;
}

.field-group.col-12.md\:col-4 {
  grid-column: span 12;
}

.field-group.col-12.md\:col-6 {
  grid-column: span 12;
}

.field-group.col-12.md\:col-8 {
  grid-column: span 12;
}

/* Responsive: MD y superiores */
@media (min-width: 768px) {
  .field-group.col-12.md\:col-2 {
    grid-column: span 2;
  }
  
  .field-group.col-12.md\:col-3 {
    grid-column: span 3;
  }
  
  .field-group.col-12.md\:col-4 {
    grid-column: span 4;
  }
  
  .field-group.col-12.md\:col-6 {
    grid-column: span 6;
  }
  
  .field-group.col-12.md\:col-8 {
    grid-column: span 8;
  }
}

.field-label {
  font-size: 0.875rem;
  font-weight: 500;
  margin-bottom: 0.5rem;
  display: block;
}

.igv-control {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 0.5rem;
}

/* Custom PrimeVue styling */
:deep(.p-card-content) {
  padding: 2rem;
}

:deep(.p-button) {
  border-radius: 6px;
  font-weight: 500;
}

:deep(.p-inputtext),
:deep(.p-dropdown),
:deep(.p-inputnumber-input),
:deep(.p-inputtextarea) {
  border-radius: 6px;
  border: 1px solid #d1d5db;
  font-size: 0.875rem;
}

:deep(.p-inputtext:focus),
:deep(.p-dropdown:not(.p-disabled):focus),
:deep(.p-inputnumber:not(.p-disabled):focus),
:deep(.p-inputtextarea:focus) {
  border-color: #3decf8;
  box-shadow: 0 0 0 2px rgba(16, 185, 129, 0.2);
}

:deep(.p-tag) {
  border-radius: 4px;
  font-size: 0.75rem;
}

:deep(.p-message) {
  border-radius: 6px;
  font-size: 0.875rem;
}

:deep(.p-toast-message) {
  border-radius: 8px;
}

/* Tag de estado IGV */
:deep(.p-tag.p-tag-success) {
  background-color: #10b981;
  color: white;
}

:deep(.p-tag.p-tag-danger) {
  background-color: #ef4444;
  color: white;
}
</style>