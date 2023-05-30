<template>
  <div>
    <!-- Section 1: Beautiful Background Image with Text Overlay -->
    <v-container id="section1">
      <v-parallax height="600" src="/public/images/background-image.jpg">
        <v-overlay absolute opacity="0.6" color="black">
          <v-container>
            <v-row align="center" justify="center">
              <v-col cols="12" md="8" class="text-center">
                <h1 class="display-1 white--text">Welcome to CutWalk</h1>
                <p class="headline white--text">Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
                <v-btn color="primary" large>Get Started</v-btn>
              </v-col>
            </v-row>
          </v-container>
        </v-overlay>
      </v-parallax>
    </v-container>

    <!-- Section 2: How it Works -->
    <v-container id="section2" class="my-10">
      <h2 class="display-2 text-center">How it Works</h2>
      <v-row>
        <!-- Text and Explanation -->
        <v-col cols="12" md="6">
          <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed dictum scelerisque neque, at ultricies urna consectetur vitae. Sed a nisi risus.</p>
          <p>Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Ut non fermentum tellus.</p>
        </v-col>
        <!-- Pictures -->
        <v-col cols="12" md="6">
          <v-img src="/path/to/image1.jpg" class="mb-5"></v-img>
          <v-img src="/path/to/image2.jpg"></v-img>
        </v-col>
      </v-row>
    </v-container>
    <!-- Section 3: Machines -->
    <v-container id="section3" class="my-10">
      <h2 class="display-2 text-center">Machines</h2>
      <v-row>
        <!-- Machine 1 -->
        <v-col cols="12" md="6">
          <v-card class="mx-auto" max-width="400">
            <v-img src="/path/to/machine1.jpg"></v-img>
            <v-card-title class="text-center">Machine 1</v-card-title>
            <v-card-text>
              <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
              <p>Sed dictum scelerisque neque, at ultricies urna consectetur vitae.</p>
            </v-card-text>
          </v-card>
        </v-col>
        <!-- Machine 2 -->
        <v-col cols="12" md="4">
          <v-card class="mx-auto" max-width="400">
            <v-img src="/path/to/machine2.jpg"></v-img>
            <v-card-title class="text-center">Machine 2</v-card-title>
            <v-card-text>
              <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
              <p>Sed dictum scelerisque neque, at ultricies urna consectetur vitae.</p>
            </v-card-text>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
    <!-- Section 4: Materials -->
    <v-container id="section4" class="my-10">
      <h2 class="display-2 text-center">Materials</h2>
      <v-row>
        <!-- Material 1 -->
        <v-col cols="12" md="4">
          <v-card class="mx-auto" max-width="400">
            <v-img src="/path/to/material1.jpg"></v-img>
            <v-card-title class="text-center">Material 1</v-card-title>
            <v-card-text>
              <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
              <p>Sed dictum scelerisque neque, at ultricies urna consectetur vitae.</p>
            </v-card-text>
          </v-card>
        </v-col>
        <!-- Material 2 -->
        <v-col cols="12" md="4">
          <v-card class="mx-auto" max-width="400">
            <v-img src="/path/to/material2.jpg"></v-img>
            <v-card-title class="text-center">Material 2</v-card-title>
            <v-card-text>
              <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
              <p>Sed dictum scelerisque neque, at ultricies urna consectetur vitae.</p>
            </v-card-text>
          </v-card>
        </v-col>
        <!-- Material 3 -->
        <v-col cols="12" md="4">
          <v-card class="mx-auto" max-width="400">
            <v-img src="/path/to/material3.jpg"></v-img>
            <v-card-title class="text-center">Material 3</v-card-title>
            <v-card-text>
              <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
              <p>Sed dictum scelerisque neque, at ultricies urna consectetur vitae.</p>
            </v-card-text>
          </v-card>
        </v-col>
      </v-row>
    </v-container>

    <!-- Section 5: Pricing -->
    <v-container id="section5" class="my-10">
      <h2 class="display-2 text-center">Pricing</h2>
      <v-row align="center" justify="center">
        <v-col cols="12" md="8" class="text-center">
          <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed dictum scelerisque neque, at ultricies urna consectetur vitae.</p>
          <p>Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Ut non fermentum tellus.</p>
        </v-col>
      </v-row>
    </v-container>
  </div>

</template>

<script>
import { ref } from 'vue';

export default {
  setup() {
    const getSectionLink = (sectionNumber) => {
      return `#section${sectionNumber}`;
    };

    return { getSectionLink };
  }
};
</script>
