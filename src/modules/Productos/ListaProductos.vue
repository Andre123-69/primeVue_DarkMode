<template >
    <div>
        <h1>Lista de Productos llmados del servidor</h1>
        <div class="grid">
            <div class="col-12 md:col-6">
                <label for="search" class="block mb-2 font-semibold text-900">Buscar Producto</label>
                <InputText id="search" v-model="searchQuery" placeholder="Buscar por nombre o ID" />
            </div>
            <div class="col-12 md:col-6">
                <Button label="Agregar Nuevo Producto" icon="pi pi-plus" @click="showAddProductDialog" />
            </div>

        </div>
  
    </div>
</template>
<script setup>




</script>
<style scoped>
    
</style>