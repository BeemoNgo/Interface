/* eslint-disable */
<template>
    <div class="text-muted py-4 shadow-lg" style="background-color: #141420;">
        <div class="d-flex flex-column flex-md-row flex-lg-row justify-content-around align-items-center">
            <ul class="list-inline d-flex align-items-center p-0 m-0">
                <li class="list-inline-item px-1">
                    <a href="https://www.facebook.com/profile.php?id=100011571906529"><font-awesome-icon icon="fab fa-facebook text-secondary" class="h3"/></a>
                </li>
            </ul>
            <div class="d-flex flex-column">
                <h5 class="h6 text-center text-warning bold">Thao Ngan Ngo</h5>
                <h5 class="h6 text-center text-white">Custom Project - COS30043</h5>
            </div>
            <div class="d-flex flex-column">
                <h5 class="w-100 h6 text-white text-center bold">Developed by : Thao Ngan Ngo <i class="fas fa-envelope"></i></h5>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    name: 'FooterComponent',
}
</script>
<style>
  .footer {
  position: fixed;
  left: 0;
  bottom: 0;
  width: 100%;
  background-color: #333; /* or any color */
  color: white;
  text-align: center;
  padding: 10px 0;
}
</style>
