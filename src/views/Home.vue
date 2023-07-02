<template>
  <div>
    <!-- Section 1: Beautiful Background Image with Text Overlay -->

      <v-parallax height="800" src="/public/images/background-image.jpg"></v-parallax>


    <!-- Section 2: How it Works -->
    <v-container id="section2" class="my-10 px-5">
      <h2 class="display-2 text-center">How it Works</h2>
      <p>CutWalk is a powerful web application designed to simplify the process of calculating waterjet cutting
        costs. With CutWalk, you can quickly and accurately estimate the price for your cutting job based on your
        specific CAD files.</p>
      <v-expansion-panels variant="accordion" class="my-10">
        <v-expansion-panel

          title="Upload your CAD file"
          text="Start by uploading your 2D CAD file in DXF format to CutWalk. This file will serve as the basis for the
                cost calculation."
        >
        </v-expansion-panel>

        <v-expansion-panel
          title="Select material and thickness"
          text="Choose the material type and thickness from the available options. CutWalk provides a comprehensive
                library of material parameters to ensure accurate calculations."
        >
        </v-expansion-panel>

        <v-expansion-panel
          title="Choose cutting quality"
          text="Select the desired cutting quality based on your requirements. CutWalk offers various options to meet
                different precision needs."
        >
        </v-expansion-panel>

        <v-expansion-panel
          title="Get instant price estimation"
          text="Once you've entered all the necessary information, CutWalk will instantly calculate the cost of your
                cutting job. You'll see the price displayed on the screen, allowing you to make informed decisions about
                your order."
        >
        </v-expansion-panel>

        <v-expansion-panel
          title="Place your order"
          text="If you're satisfied with the price estimation, you can proceed to place your order directly through
                CutWalk. The order will be automatically sent to Tschenett AG for processing, and you'll receive
                confirmation along with delivery or pickup information."
        >
        </v-expansion-panel>
      </v-expansion-panels>

      <p>Experience the convenience and accuracy of CutWalk today. Upload your CAD file, customize your order, and
        get an instant price estimation for your waterjet cutting needs.</p>
    </v-container>

    <v-container>
      <v-row align="center" justify="center">
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
        <v-col cols="12" md="6" class="my-5">
          <v-card class="mx-auto">
            <v-card-title class="text-center">STM PremiumCut</v-card-title>
            <v-img class="pa-5" src="../../public/images/stm_premiumcut.png"></v-img>
            <v-card-text>
              <p class="my-5">STM PremiumCut waterjet cutting system is ideally suited for cutting tasks with high
                accuracy
                requirements and high speeds as well as for tube processing. The systems operate in a resource-saving
                manner and are characterized by extremely low power, water and air consumption, as well as the highest
                upgrade and adaptability capabilities.</p>
              <p>The proven STM PremiumCut waterjet cutting systems in combination with the innovative STM 3D cutting
                head result in a universal waterjet cutting system. Two different models are available with cutting
                angles up to 12° or up to 68°. The 5-axis kinematics also enable cutting angle error compensation and
                the integrated collision protection provides additional safety.</p>
            </v-card-text>
          </v-card>
        </v-col>
        <!-- Machine 2 -->
        <v-col cols="12" md="6" class="my-5">
          <v-card class="mx-auto">
            <v-card-title class="text-center">TT-600 Lasercutter</v-card-title>
            <v-img class="pa-5" src="../../public/images/tt-600.jpg"></v-img>
            <v-card-text>
              <p class="my-5">From the textile industry to wood processing, and from acrylic glass machining to advertising
                technology, the CO2 flatbed laser is a versatile tool that also excels in its compact size.</p>
              <p class="my-5">The CO2 flatbed laser is very well suited for cutting acrylic glass, wood, paper (without scorch
                marks), and much more. In addition to cutting, it can also perform highly precise engravings, including
                deep engravings depending on the material.</p>
              <p>Marking/engraving metals such as stainless steel, copper, titanium, etc. is possible with a CO2
                laser. In such cases, a metal marking solution should be used.</p>
            </v-card-text>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
    <!-- Section 4: Materials -->
    <v-container id="section4" class="my-10">
      <h2 class="display-2 text-center">Materials</h2>
      <v-row>

        <v-col cols="12" md="4">
          <v-card class="mx-auto" max-width="400">
            <v-card-title class="text-center">Metal</v-card-title>
            <v-img class="pa-5" src="../../public/images/metal.png"></v-img>
            <v-card-text>
              <p> Waterjet cutting is effective for precise and clean cuts in various metal types.</p>
            </v-card-text>
          </v-card>
        </v-col>

        <v-col cols="12" md="4">
          <v-card class="mx-auto" max-width="400">
            <v-card-title class="text-center">Glass</v-card-title>
            <v-img class="pa-5" src="../../public/images/glass.png"></v-img>
            <v-card-text>
              <p>Waterjet cutting provides accurate and intricate cuts on glass materials without causing thermal stress.</p>
            </v-card-text>
          </v-card>
        </v-col>

        <v-col cols="12" md="4">
          <v-card class="mx-auto" max-width="400">
            <v-card-title class="text-center">Stone</v-card-title>
            <v-img class="pa-5" src="../../public/images/stone.png"></v-img>
            <v-card-text>
              <p>Waterjet cutting can create detailed patterns and shapes on stone surfaces.</p>
            </v-card-text>
          </v-card>
        </v-col>

        <v-col cols="12" md="4">
          <v-card class="mx-auto" max-width="400">
            <v-card-title class="text-center">Ceramics</v-card-title>
            <v-img class="pa-5" src="../../public/images/ceramics.png"></v-img>
            <v-card-text>
              <p>Waterjet cutting is ideal for producing intricate designs on ceramic materials.</p>
            </v-card-text>
          </v-card>
        </v-col>

        <v-col cols="12" md="4">
          <v-card class="mx-auto" max-width="400">
            <v-card-title class="text-center">Plastics </v-card-title>
            <v-img class="pa-5" src="../../public/images/plastics.png"></v-img>
            <v-card-text>
              <p>Waterjet cutting offers high precision and smooth edges when working with plastic materials.</p>
            </v-card-text>
          </v-card>
        </v-col>

        <v-col cols="12" md="4">
          <v-card class="mx-auto" max-width="400">
            <v-card-title class="text-center">Rubber</v-card-title>
            <v-img class="pa-5" src="../../public/images/rubber.png"></v-img>
            <v-card-text>
              <p>Waterjet cutting is suitable for accurately cutting rubber materials without causing deformation.</p>
            </v-card-text>
          </v-card>
        </v-col>

        <v-col cols="12" md="4">
          <v-card class="mx-auto" max-width="400">
            <v-card-title class="text-center">Wood</v-card-title>
            <v-img class="pa-5" src="../../public/images/wood.png"></v-img>
            <v-card-text>
              <p>Waterjet cutting enables precise cuts on different types of wood, maintaining the material's integrity.</p>
            </v-card-text>
          </v-card>
        </v-col>

        <v-col cols="12" md="4">
          <v-card class="mx-auto" max-width="400">
            <v-card-title class="text-center">Foam</v-card-title>
            <v-img class="pa-5" src="../../public/images/foam.png"></v-img>
            <v-card-text>
              <p>Waterjet cutting provides clean and precise cuts on foam materials used in packaging, insulation, and upholstery.</p>
            </v-card-text>
          </v-card>
        </v-col>

        <v-col cols="12" md="4">
          <v-card class="mx-auto" max-width="400">
            <v-card-title class="text-center">Composites</v-card-title>
            <v-img class="pa-5" src="../../public/images/composites.png"></v-img>
            <v-card-text>
              <p>Waterjet cutting can accurately cut composite materials without fraying or delamination.</p>
            </v-card-text>
          </v-card>
        </v-col>

      </v-row>
    </v-container>
  </div>

</template>

<script>

export default {
  setup() {
    const getSectionLink = (sectionNumber) => {
      return `#section${sectionNumber}`;
    };

    return {getSectionLink};
  }
};
</script>
