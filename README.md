# Please Readme

beberapa package mungkin ga kepakai tapi bisa abaikan dulu

clone branch dev-zam2 ini atau checkout ke brach ini boleh lalu :

-npm install

ada yang harus diedit di file lokasi ini : node_modules\linkedom\esm\interface\document.js

comment baris ini (line 1)

// import performance from '../../commonjs/perf_hooks.cjs';

dan baris ini (line 121): 
            // case 'performance':
            
            //   return performance;

soalnya kalo ga di comment mungkin bisa jadi error 

 jika error : 429 Too Many Requests

maka harus ubah token yang baru di .env 

REACT_APP_API_URL_TOKEN=xxxx