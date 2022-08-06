# koken-vue
Vue3 Prototype Replacement of the retired Koken Photography CMS.

# Features
- Uses `axios` to fetch photos from Strapi API
- Auth with Strapi user
- Upload multiple photos at once into Strapi database
- Drag and drop photos to categories
- Live updates to photo details in API as you edit
- Filtering photos array based on selected category

## Admin Example
![Admin Panel](https://github.com/kevinstory/koken-vue/blob/main/koken-vue.jpg?raw=true)

## Public Site Example
![Public Site](https://github.com/kevinstory/koken-vue/blob/main/koken-vue_public.jpg?raw=true)


## Install

## Project setup
```
npm install
```

### Compiles and hot-reloads for development
```
npm run dev
```

### Compiles and minifies for production
```
npm run build
```

## Overview

**koken-vue** is an experiment for me to explore more VueJS skills to prototype the Koken content management system. I do not currently intend to put this into production. This uses Strapi for authentication into the Admin section and to manage photos. All photos were taken from Unsplash. 

## Resources Used

- [Vue](https://vuejs.org/) version **^3.2.27**
- [Strapi](https://strapi.io/) version **^3.6.8**
- [TailwindCSS](https://tailwindcss.com/) version **^3.1.7**
- [Pinia](https://pinia.vuejs.org/) version **^2.0.14**