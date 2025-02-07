<template>
  <div class="border-default rounded-lg h-screen">
    <div class="search">
      <UCommandPalette :groups="groups" :autoselect="false" @update:model-value="actionCompletionItem"
        :close-button="{ icon: 'i-heroicons-x-mark-20-solid', color: 'gray', variant: 'link', padded: false }" />
    </div>

    <div class="result-post">

    </div>

  </div>
</template>

<script setup>
const groups = [{
  key: 'users',
  label: q => q && `Users matching “${q}”...`,
  search: async (q) => {
    if (!q) {
      return []
    }

    console.log(q)

    const users = await $fetch('https://jsonplaceholder.typicode.com/users', { params: { q } })

    const userResult = users.map(user => ({ 
      id: user.id, 
      label: user.name, 
      suffix: user.email 
    }))
    console.log(userResult)
    return userResult
  },
  
}]

const actionCompletionItem = (option) => {
  // console.log(option)
  console.log(option.label)

}

</script>