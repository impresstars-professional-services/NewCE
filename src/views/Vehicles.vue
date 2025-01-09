<template>
  <div class="vehicles container mx-auto mt-8 p-4">
    <h1 class="text-3xl font-bold mb-6">Your Vehicles</h1>
    
    <div v-if="isLoading" class="text-center py-4">
      <div class="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
      <p class="mt-4 text-gray-600">Loading vehicles...</p>
    </div>
    
    <div v-else-if="error" class="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
      {{ error }}
    </div>
    
    <div v-else>
      <div v-if="vehicles.length > 0">
        <div v-for="vehicle in vehicles" :key="vehicle.id" class="bg-white rounded-lg shadow-md p-4 mb-4">
          <h2 class="text-xl font-semibold mb-2">{{ vehicle.make }} {{ vehicle.model }}</h2>
          <p>Year: {{ vehicle.year }}, Color: {{ vehicle.color }}</p>
          <p>Type: {{ vehicle.type }}</p>
          <div class="mt-2">
            <BaseButton @click="editVehicle(vehicle)" class="mr-2">Edit</BaseButton>
            <BaseButton @click="confirmDeleteVehicle(vehicle.id)" color="red">Delete</BaseButton>
          </div>
        </div>
      </div>
      <div v-else class="text-center text-gray-600">
        You haven't added any vehicles yet.
      </div>
      
      <BaseButton @click="openAddVehicleModal" class="mt-4">Add New Vehicle</BaseButton>
    </div>

    <VehicleModal
      v-if="showVehicleModal"
      :vehicle="currentVehicle"
      @save="handleSaveVehicle"
      @close="closeVehicleModal"
    />

    <ConfirmModal
      v-if="showDeleteConfirmModal"
      message="Are you sure you want to delete this vehicle?"
      @confirm="handleDeleteVehicle"
      @cancel="showDeleteConfirmModal = false"
    />
  </div>
</template>

<script>
import { ref, onMounted } from 'vue'
import { useStore } from 'vuex'
import { useVehicle } from '../composables/vehicle'
import BaseButton from '../components/BaseButton.vue'
import VehicleModal from '../components/VehicleModal.vue'
import ConfirmModal from '../components/ConfirmModal.vue'

export default {
  name: 'Vehicles',
  components: {
    BaseButton,
    VehicleModal,
    ConfirmModal
  },
  setup() {
    const store = useStore()
    const { vehicles, isLoading, error, saveVehicle, deleteVehicle } = useVehicle()
    const showVehicleModal = ref(false)
    const showDeleteConfirmModal = ref(false)
    const currentVehicle = ref(null)
    const vehicleToDeleteId = ref(null)

    onMounted(async () => {
      await store.dispatch('vehicles/fetchVehicles')
    })

    const openAddVehicleModal = () => {
      currentVehicle.value = null
      showVehicleModal.value = true
    }

    const closeVehicleModal = () => {
      showVehicleModal.value = false
      currentVehicle.value = null
    }

    const editVehicle = (vehicle) => {
      currentVehicle.value = { ...vehicle }
      showVehicleModal.value = true
    }

    const confirmDeleteVehicle = (id) => {
      vehicleToDeleteId.value = id
      showDeleteConfirmModal.value = true
    }

    const handleSaveVehicle = async (vehicle) => {
      const result = await saveVehicle(vehicle)
      if (result.success) {
        closeVehicleModal()
      }
    }

    const handleDeleteVehicle = async () => {
      if (!vehicleToDeleteId.value) return
      
      const result = await deleteVehicle(vehicleToDeleteId.value)
      if (result.success) {
        showDeleteConfirmModal.value = false
        vehicleToDeleteId.value = null
      }
    }

    return {
      vehicles,
      isLoading,
      error,
      showVehicleModal,
      showDeleteConfirmModal,
      currentVehicle,
      openAddVehicleModal,
      closeVehicleModal,
      editVehicle,
      confirmDeleteVehicle,
      handleSaveVehicle,
      handleDeleteVehicle
    }
  }
}
</script>