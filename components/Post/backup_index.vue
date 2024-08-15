<template>
  <div>
    <v-card class="mx-auto" max-width="344" v-for="item in feeds" :key="item">
      
      <p>feed ke {{ i }}</p>
      <v-img height="200px" src="https://cdn.vuetifyjs.com/images/cards/sunshine.jpg" cover></v-img>
  
      <v-card-title>
        {{ item.title }}
      </v-card-title>
  
      <v-card-subtitle>
        {{ item.subtitle }}
      </v-card-subtitle>
  
      <v-card-actions>
        <v-btn color="orange-lighten-2" text="Explore"></v-btn>
  
        <v-spacer></v-spacer>
  
        <v-btn :icon="item.show ? 'mdi-chevron-up' : 'mdi-chevron-down'" @click="item.show = !item.show"></v-btn>
      </v-card-actions>
  
      <v-expand-transition>
        <div v-show="item.show">
          <v-divider></v-divider>
          <v-card-text>
            {{ item.description }}
          </v-card-text>
        </div>
      </v-expand-transition>
    </v-card>
    <div id="sentinel"></div>

  </div>
  </template>
  
  <script>
  export default {
    mounted() {
      this.observeSentinel()
    },
    methods: {
      observeSentinel() {
        const sentinel = document.getElementById('sentinel')
        const observer = new IntersectionObserver((entries) => {
          if (entries[0].isIntersecting && this.hasNextPage) {
            this.loadMoreData()
          }
        }, { threshold: 1.0 })
        observer.observe(sentinel)
      },
      loadMoreData() {
        this.isLoading = true
        // Simulate loading data from API or database
        setTimeout(() => {
          const newData = [
            // generate new data or fetch from API/database
            {
              id: "10",
              title: "New selekences",
              subtitle: "New selekencess cessss",
              description: "New kddlksamdlksamkdlmaslkdmsakmasdmsaklmsalkmsakldmsalkdmsalkmmaslkmdasl",
              show: false,
            },
            // ...
          ]
          this.feeds.push(...newData)
          this.isLoading = false
          this.hasNextPage = newData.length === 10 // adjust this condition based on your data
        }, 2000)
      },
    },
    data() {
      return {
        // show: false,
        isLoading: false,
        hasNextPage: true,
        feeds: [
            {
                id: "1",
                title: "selekences",
                subtitle: "selekencess cessss",
                description: "kddlksamdlksamkdlmaslkdmsakmasdmsaklmsalkmsakldmsalkdmsalkmmaslkmdasl",
                show: false,
            },

            {
                id: "2",
                title: "selekences",
                subtitle: "selekencess cessss",
                description: "kddlksamdlksamkdlmaslkdmsakmasdmsaklmsalkmsakldmsalkdmsalkmmaslkmdasl",
                show: false,
            },

            {
                id: "3",
                title: "selekences",
                subtitle: "selekencess cessss",
                description: "kddlksamdlksamkdlmaslkdmsakmasdmsaklmsalkmsakldmsalkdmsalkmmaslkmdasl",
                show: false,
            },

            {
                id: "4",
                title: "selekences",
                subtitle: "selekencess cessss",
                description: "kddlksamdlksamkdlmaslkdmsakmasdmsaklmsalkmsakldmsalkdmsalkmmaslkmdasl",
                show: false,
            },

            {
                id: "5",
                title: "selekences",
                subtitle: "selekencess cessss",
                description: "kddlksamdlksamkdlmaslkdmsakmasdmsaklmsalkmsakldmsalkdmsalkmmaslkmdasl",
                show: false,
            },


            {
                id: "6",
                title: "selekences",
                subtitle: "selekencess cessss",
                description: "kddlksamdlksamkdlmaslkdmsakmasdmsaklmsalkmsakldmsalkdmsalkmmaslkmdasl",
                show: false,
            },

            {
                id: "7",
                title: "selekences",
                subtitle: "selekencess cessss",
                description: "kddlksamdlksamkdlmaslkdmsakmasdmsaklmsalkmsakldmsalkdmsalkmmaslkmdasl",
                show: false,
            },


            {
                id: "8",
                title: "selekences",
                subtitle: "selekencess cessss",
                description: "kddlksamdlksamkdlmaslkdmsakmasdmsaklmsalkmsakldmsalkdmsalkmmaslkmdasl",
                show: false,
            },


            {
                id: "9",
                title: "selekences",
                subtitle: "selekencess cessss",
                description: "kddlksamdlksamkdlmaslkdmsakmasdmsaklmsalkmsakldmsalkdmsalkmmaslkmdasl",
                show: false,
            },

        ]
      }
    }
  }
  </script>
