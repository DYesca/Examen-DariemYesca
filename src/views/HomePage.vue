<template> 
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-title>GitHub Repository Finder</ion-title>
      </ion-toolbar>
    </ion-header>
    <ion-content class="ion-padding">
      
      <!-- Selector de lenguaje -->
      <ion-item>
        <ion-label>Language</ion-label>
        <ion-select v-model="selectedLanguage" placeholder="Select a Language">
          <ion-select-option v-for="lang in languages" :key="lang" :value="lang">
            {{ lang }}
          </ion-select-option>
        </ion-select>
      </ion-item>

      <!-- Botón de búsqueda -->
      <ion-button expand="block" @click="searchRepository" class="search-btn">
        Search
      </ion-button>

      <!-- Estado de carga -->
      <div v-if="loading" class="loading-state">
        <ion-spinner></ion-spinner>
        <p>Loading, please wait...</p>
      </div>

      <!-- Estado de error -->
      <div v-if="error" class="error-state">
        <p>Error fetching repositories</p>
        <ion-button expand="block" color="danger" @click="searchRepository">
          Click to retry
        </ion-button>
      </div>

      <!-- Estado de éxito (muestra el repositorio) -->
      <div v-if="repository">
        <ion-card>
          <ion-card-header>
            <ion-card-title>{{ repository.name }}</ion-card-title>
          </ion-card-header>
          <ion-card-content>
            <p>{{ repository.description || "No description available" }}</p>
            <div class="repo-stats">
              <ion-chip color="primary">{{ repository.language }}</ion-chip>
              <ion-chip color="warning">⭐ {{ repository.stargazers_count }}</ion-chip>
              <ion-chip color="tertiary">🍴 {{ repository.forks_count }}</ion-chip>
              <ion-chip color="danger">⚠ {{ repository.open_issues_count }}</ion-chip>
            </div>
          </ion-card-content>
        </ion-card>
        <ion-button expand="block" @click="searchRepository" class="refresh-btn">
          Refresh
        </ion-button>
      </div>

      <!-- Estado vacío -->
      <div v-if="!selectedLanguage && !loading && !repository" class="empty-state">
        <p>Please select a language</p>
      </div>

    </ion-content>
  </ion-page>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import { fetchRandomRepository } from '@/composables/useGithubApi';
import { languages } from '@/data/data.js';
import {
  IonPage,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonSelect,
  IonSelectOption,
  IonButton,
  IonSpinner,
  IonCard,
  IonCardHeader,
  IonCardTitle,
  IonCardContent,
  IonChip,
  IonItem,
  IonLabel
} from '@ionic/vue';

export default defineComponent({
  components: {
    IonPage,
    IonHeader,
    IonToolbar,
    IonTitle,
    IonContent,
    IonSelect,
    IonSelectOption,
    IonButton,
    IonSpinner,
    IonCard,
    IonCardHeader,
    IonCardTitle,
    IonCardContent,
    IonChip,
    IonItem,
    IonLabel
  },
  setup() {
    const selectedLanguage = ref<string | null>(null);
    const repository = ref<Record<string, any> | null>(null);
    const loading = ref<boolean>(false);
    const error = ref<boolean>(false);

    const searchRepository = async () => {
      if (!selectedLanguage.value) return;
      loading.value = true;
      error.value = false;
      repository.value = null;

      try {
        const repo = await fetchRandomRepository(selectedLanguage.value);
        repository.value = repo;
      } catch (e) {
        error.value = true;
      } finally {
        loading.value = false;
      }
    };

    return { selectedLanguage, repository, loading, error, searchRepository, languages };
  }
});
</script>

<style scoped>
/* Estado vacío */
.empty-state {
  text-align: center;
  color: #666;
  font-size: 1.1rem;
  padding: 20px;
}

/* Estado de carga */
.loading-state {
  text-align: center;
  font-size: 1.1rem;
  color: #666;
  padding: 20px;
}

/* Estado de error */
.error-state {
  text-align: center;
  background: #ffebe8;
  color: #d9534f;
  padding: 15px;
  border-radius: 10px;
  margin: 15px 0;
}

/* Botón de búsqueda */
.search-btn {
  margin-top: 15px;
}

/* Botón de refrescar */
.refresh-btn {
  margin-top: 10px;
}

/* Estilos para la tarjeta del repositorio */
.repo-stats {
  display: flex;
  gap: 10px;
  flex-wrap: wrap;
}
</style>
