<template>
  <div class="chat-container">
    <h1 class="text-white">HELP CENTER</h1>
    <Chat/> <!-- Use the chat components -->
  </div>
</template>

<script>
import Chat from '@/components/chatComponents/Chat.vue'

export default {
  name: 'ChatRoom',
  components: { Chat }
}
</script>

<style scoped>
.chat-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
  background-color: #00001A; /* Dark blue background */
  height: 100vh;
}
.text-white {
  margin-bottom: 20px;
}
</style>