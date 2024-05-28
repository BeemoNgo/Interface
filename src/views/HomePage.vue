/* eslint-disable */
<template>
  <div class="homepage">
    <div class="content">
      <h1>
        <span>Discover, find,</span><br />
        <span class="highlight">Sell extraordinary</span><br />
        <span>Monster NFTs</span>
      </h1>
      <p>Marketplace For Monster Character Collections Non Fungible Token NFTs</p>
      <div class="buttons">
        <RouterLink to="/explore" class="btn explore">Explore</RouterLink>
        <RouterLink to="/create" class="btn create">Connect your wallet</RouterLink>
      </div>
    </div>
    <div class="image-container">
      <img src="../assets/pikachu.png" alt="Monster NFT" class="animated-image" />
    </div>
  </div>
</template>

<script>
export default {
  name: 'HomePage',
};
</script>

<style scoped>
@keyframes float {
  0% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-20px);
  }
  100% {
    transform: translateY(0);
  }
}

.homepage {
  display: flex;
  justify-content: space-between;
  margin-top: 20px;
  background-color: #00001A;
  color: white;
  padding: 20px 20px;
  height: calc(100vh - 90px); /* Adjusted to account for the navbar height */
}

.content {
  max-width: 40%;
  flex: 1;
  margin-right: 10px; /* Reduce space between content and image */
}

h1 {
  font-size: 3rem; /* Adjusted font size */
  line-height: 1.2;
}

h1 .highlight {
  background: linear-gradient(90deg, #ff4f81, #3755ff);
  background-clip: text; /* Standard property */
  -webkit-background-clip: text; /* WebKit-specific property for Safari and Chrome */
  -webkit-text-fill-color: transparent;
  text-shadow: 0px 0px 5px rgba(255, 79, 129, 0.5), 0px 0px 5px rgba(55, 85, 255, 0.5);
  font-weight: bold;
}

p {
  margin-top: 20px;
  font-size: 1.2rem; /* Adjusted font size */
  color: #b5b5b5;
}

.buttons {
  margin-top: 30px;
}

.btn {
  background-color: transparent;
  border: 2px solid #7a25f8;
  color: white;
  padding: 10px 20px;
  font-size: 1rem; /* Adjusted font size */
  border-radius: 5px;
  margin-right: 10px;
  cursor: pointer;
  transition: all 0.3s ease;
}

.btn:hover {
  background-color: #7a25f8;
}

.image-container {
  max-width: 60%;
  flex: 2;
}

.animated-image {
  max-width: 100%;
  height: auto;
  animation: float 3s ease-in-out infinite;
}
</style>
