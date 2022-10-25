# Please Readme

![](https://gfycat.com/angrylightclownanemonefish)

<div style='position:relative; padding-bottom:calc(56.25% + 44px)'><iframe src='https://gfycat.com/ifr/AngryLightClownanemonefish' frameborder='0' scrolling='no' width='100%' height='100%' style='position:absolute;top:0;left:0;' allowfullscreen></iframe></div>

beberapa package mungkin ga kepakai tapi bisa abaikan dulu

clone branch dev-zam2 ini atau checkout ke brach ini boleh lalu :

-npm install

ada yang harus diedit di file lokasi ini : node_modules\linkedom\esm\interface\document.js

silahkan comment baris ini (line 1):

//import performance from '../../commonjs/perf_hooks.cjs';

dan baris ini (line 121):

            //case 'performance':

            //return performance;

soalnya kalo ga di comment mungkin bisa jadi error

jika error : 429 Too Many Requests

maka harus ubah token yang baru di .env

REACT_APP_API_URL_TOKEN=xxxx

ini tak coba lg dengn nytime3 [update] , nytime terkendala dengan CORS

-sudah ditambahkan fitur login dan regis
-memecah bbrpa component dan layout
