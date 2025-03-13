
<script setup lang="ts">
import {
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
  IonCard,
  IonCardHeader,
  IonCardTitle,
  IonCardContent,
  IonIcon,
  IonSelect,
  IonSelectOption,
  IonButton,
  IonChip,
} from "@ionic/vue";
import { getRepos } from "@/services/github";
import { ref } from "vue";
import { logoGithub, star, gitBranch, warning } from "ionicons/icons";
import lenguages from "../data.json";
const lang = ref("");
const description = ref("Repository description");
const title = ref("Github Repository Finder");
const estrellas = ref(0);
const rama = ref(0);
const warnin = ref(0);

function findRepo() {
  if (lang.value === "") {
    return;
  }
  getRepos(lang.value).then((data) => {
    const random = Math.floor(Math.random() * data.length);
    title.value = data[random].name;
    description.value = data[random].description ?? "No description available";
    estrellas.value = data[random].stargazers_count;
    rama.value = data[random].forks_count;
    warnin.value = data[random].open_issues_count;
  });
}
</script>
<template>
  <ion-page>
    <ion-header :translucent="true">
      <ion-toolbar>
        <ion-title>Examen 1 Moviles</ion-title>
      </ion-toolbar>
    </ion-header>
    <ion-content :fullscreen="true" class="ion-padding">
      <div id="container">
        <ion-card>
          <ion-card-header>
            <div class="header-content">
              <ion-icon :icon="logoGithub" size="large"></ion-icon>
              <ion-card-title>{{ title }}</ion-card-title>
            </div>
          </ion-card-header>

          <ion-card-content>
            <ion-select v-model="lang" placeholder="Select a Language">
              <ion-select-option
                v-for="lang in lenguages"
                :key="lang.value"
                :value="lang.value"
                >{{ lang.value }}</ion-select-option
              >
            </ion-select>
            <p id="description">{{ description }}</p>
            <div class="chip-container">
              <ion-chip color="primary">
                <ion-icon :icon="star"></ion-icon>
                <ion-label>Estrellas: {{ estrellas }}</ion-label>
              </ion-chip>
              <ion-chip color="secondary">
                <ion-icon :icon="gitBranch"></ion-icon>
                <ion-label>Branch: {{ rama }}</ion-label>
              </ion-chip>
              <ion-chip color="warning">
                <ion-icon :icon="warning"></ion-icon>
                <ion-label>Errores: {{ warnin }}</ion-label>
              </ion-chip>
            </div>
          </ion-card-content>
          <ion-button color="success" size="default" @click="findRepo()">Buscar Repositorio</ion-button>
        </ion-card>
      </div>
    </ion-content>
  </ion-page>
</template>


<style scoped>
#container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
  border-radius: 10px;
  background-color:black;
}

.header-content {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
}

.chip-container {
  display: flex;
  justify-content: space-around;
  margin-top: 10px;
}

ion-button {
  text-align: center;
  margin-top: 10px;
  margin-left: 50%;
  transform: translateX(-50%);

}

ion-card {
  width: 100%;
  max-width: 500px;
  background-color: white;
}

ion-card-title {
  text-align: center;
  color: black;
}

ion-select {
  color: black;
  width: 100%;
  margin-top: 10px;
}

#description {
  margin-top: 10px;
  text-align: center;
  color: black;
}
</style>   
