<template>
  <div>
    <v-card class="mx-auto dark:bg-slate-900 dark:text-white" max-width="344" v-for="(item, i) in feeds" :key="item.id">
      <p>feed ke {{ i + 1 }}</p>
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
    <div id="checkpoint-section"></div>
  </div>
</template>

<script>
export default {
  mounted() {
      this.observeSentinel()
    // this.observeSentinelFlash()
  },
  methods: {
    observeSentinel() {
      const sentinel = document.getElementById('checkpoint-section')
      const observer = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && this.hasNextPage) {
          this.loadMoreData()
        }
      }, { threshold: 1.0 })
      observer.observe(sentinel)
    },
    observeSentinelFlash() {
      const sentinel = document.getElementById('checkpoint-section')
      const observer = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting) {
          const scrollPosition = window.scrollY + window.innerHeight
          const bottomPosition = document.body.offsetHeight
          const threshold = 200

          if (scrollPosition + threshold >= bottomPosition && this.hasNextPage) {
            this.loadMoreData()
          }
        }
      }, { threshold: 1.0 })
      observer.observe(sentinel)
    },
    loadMoreData() {
      this.isLoading = true
      console.log('waiting for laod new data')
      setTimeout(() => {
        const newData = Array.from({ length: 10 }, (_, i) => ({
          id: `${this.feeds.length + i + 1}`,
          title: `selekences ${this.feeds.length + i + 1}`,
          subtitle: `selekencess cessss ${this.feeds.length + i + 1}`,
          description: `kddlksamdlksamkdlmaslkdmsakmasdmsaklmsalkmsakldmsalkdmsalkmmaslkmdasl ${this.feeds.length + i + 1}`,
          show: false,
        }))
        console.log(`before fetch: ${this.feeds.length}`)
        this.feeds.push(...newData)
        console.log(`after fetch: ${this.feeds.length}`)
        this.isLoading = false
        this.hasNextPage = newData.length === 10
        console.log(this.hasNextPage)
      }, 2000)
    },
  },
  data() {
    return {
      isLoading: false,
      hasNextPage: true,
      feeds: Array.from({ length: 10 }, (_, i) => ({
        id: `${i + 1}`,
        title: `selekences ${i + 1}`,
        subtitle: `selekencess cessss ${i + 1}`,
        description: `kddlksamdlksamkdlmaslkdmsakmasdmsaklmsalkmsakldmsalkdmsalkmmaslkmdasl ${i + 1}`,
        show: false,
      })),
    }
  }
}
</script>