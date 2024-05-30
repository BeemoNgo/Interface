/* eslint-disable */
<template>
  <div>
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
          <RouterLink to="/user" class="btn create">Connect your wallet</RouterLink>
        </div>
      </div>
      <div class="image-container">
        <img src="../assets/pikachu.png" alt="Monster NFT" class="animated-image" />
      </div>
    </div>
    <div class="card rounded-xl mtop mbottom mx-10 p-4 left-align" style="background-color: black; height: 350px;">
      <div class="row">
        <div class="col-12 col-md-12">
          <h1 class="mt-4 text-white">Download App</h1>
          <p class="text-white">
            Lorem ipsum dolor sit amet consectetur adipisicing elit.<br />
            Provident sequi esse tempore maiores quasi quia non.<br />
            Itaque laboriosam dicta nostrum accusantium assumenda,<br />
            vitae ab ut vel tenetur minima natus commodi!
          </p>
          <button class="btn btn-light mb-2 text-white">
            <i class="fab fa-apple"></i> App Store
          </button>
          <button class="btn btn-light mb-2 text-white ml-2">
            <i class="fab fa-google-play"></i> Play Store
          </button>
        </div>
      </div>
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
  flex-direction: column;
  justify-content: space-around; /* Adjust or remove this if creating unwanted space */
  align-items: center;
}

.content {
  flex: 1;
  width: 100%;
  max-width: 40%;
  margin-right: 10px; /* Reduce space between content and image */
  text-align: left; 
  padding-left: 50px;
  color: aliceblue;
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



.btn {
  flex: 1 1 auto; /* Allow buttons to grow and shrink but respect content */
  margin: 5px; /* Add margin around buttons */
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
  width: 100%; /* Use full width */
  display: flex;
  justify-content: center; /* Center the image within the container */
  margin: 0 auto; /* Remove margin */
  padding: 0; /* Remove padding */
}

.animated-image {
  max-width: 100%;
  height: auto;
  animation: float 3s ease-in-out infinite;
}

.card {
  min-height: 400px;
  background-color: black;
  border: none;
  color: white;
  display: flex;
  flex-direction: column; /* Stack children vertically */
  justify-content: space-around; /* Distribute space around items */
  padding: 20px; /* Add padding to avoid touching the edges */
}

.mt-n4 {
  margin-top: -1.5rem;
}

.ml-4 {
  margin-left: 1.5rem;
}

.mx-10 {
  margin-left: 2.5rem;
  margin-right: 2.5rem;
}

.p-4 {
  padding: 1.5rem;
}

.mtop {
  margin-top: 20px;
}

.mbottom {
  margin-bottom: 20px;
}
@media (min-width: 768px) {
  
  .homepage {
    flex-direction: row;
  }
  
  .content {
    max-width: 40%;
    margin-left: auto; /* Keeps content aligned to the center/right based on the width */
    margin-right: auto; /* Adds automatic margin to both sides */
  }
}

/* Large devices (desktops, 992px and up) */
@media (min-width: 992px) {
  .content {
    max-width: 40%;
  }

  .image-container {
    max-width: 60%;
  }
}
</style>
