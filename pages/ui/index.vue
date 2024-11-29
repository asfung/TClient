<!-- <template>

  <v-card class="mx-auto" max-width="344" v-for="i in 10" :key="i">
    
    <p>feed ke {{ i }}</p>
    <v-img height="200px" src="https://cdn.vuetifyjs.com/images/cards/sunshine.jpg" cover></v-img>

    <v-card-title>
      Top western road trips
    </v-card-title>

    <v-card-subtitle>
      1,000 miles of wonder
    </v-card-subtitle>

    <v-card-actions>
      <v-btn color="orange-lighten-2" text="Explore"></v-btn>

      <v-spacer></v-spacer>

      <v-btn :icon="show ? 'mdi-chevron-up' : 'mdi-chevron-down'" @click="show = !show"></v-btn>
    </v-card-actions>

    <v-expand-transition>
      <div v-show="show">
        <v-divider></v-divider>
        <v-card-text>
          I'm a thing. But, like most politicians, he promised more than he could deliver. You won't have time
          for sleeping, soldier, not with all the bed making you'll be doing. Then we'll go with that data
          file! Hey, you add a one and two zeros to that or we walk! You're going to do his laundry? I've got
          to find a way to escape.
        </v-card-text>
      </div>
    </v-expand-transition>
  </v-card>

</template>

<script>
export default {
  data() {
    return {
      show: false,
    }
  }
}
</script> -->


<template>
  <!-- <Post /> -->
  <div class="">
    <div class="flex flex-col">
      <div class="flex items-center justify-between">
        <div class="flex items-center gap-2 w-full">
          <p class="text-lg">unsplash</p>
          <Image
          src={BlueCheckmark}
          width={14}
          height={14}
          alt="Logo"
          class="rounded-full"
          />
        </div>
        <div class="flex items-center gap-3">
          <span class="text-xs text-gray-500">
            2h
          </span>
          <a href="#">
            <FiMoreHorizontal class="text-gray-100" />
          </a>
        </div>
      </div>

      <div class="text-xs mt-1">
        <p class="text-gray-200">
        Best fruit shots of 2023.{' '}
        <span class="ml1 mr-1">📸</span> By{' '}
        <span class="ml-1 text-blue-400">
          @realstoman
        </span>
        </p>
        <div class="mt-2 flex justify-start gap-1.5 overflow-x-scroll scroll-smooth">
          <v-img
            src="https://picsum.photos/200/300"
            alt="Author"
            width={150}
            height={100}
            class="rounded-md"
            />
            <v-img
              src="https://picsum.photos/200/300"
              alt="Author"
              width={150}
              height={100}
              class="rounded-md"
              />
              <v-img
                src="https://picsum.photos/200/300"
                alt="Author"
                width={150}
                height={100}
                class="rounded-md"
                />
                <v-img
                  src="https://picsum.photos/200/300"
                  alt="Author"
                  width={150}
                  height={100}
                  class="rounded-md"
                  />
                  <v-img
                    src="https://picsum.photos/200/300"
                    alt="Author"
                    width={150}
                    height={100}
                    class="rounded-md"
                    />

                    <v-img
                      src="https://picsum.photos/200/300"
                      alt="Author"
                      width={150}
                      height={100}
                      class="rounded-md"
                      />

                      <v-img
                        src="https://picsum.photos/200/300"
                        alt="Author"
                        width={150}
                        height={100}
                        class="rounded-md"
                        />

                        <v-img
                          src="https://picsum.photos/200/300"
                          alt="Author"
                          width={150}
                          height={100}
                          class="rounded-md"
                          />
        </div>
      </div>
    </div>


  </div>
</template>

<script>
export default {

}
</script>
