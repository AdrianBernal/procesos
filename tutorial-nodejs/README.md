tutorial-nodejs
===============

Ejemplos para aprender lo básico sobre nodejs.
Los ejemplos están tomdas de los tutoriales de nodejs de youtube de Ebin Paulosep.

1. Instalar Node (nodejs.org)
2. Directorio de trabajo para aplicaciones nodejs
3. Instalar npm (si fuera necesario, ojo puede que en Windows haya que agregar una carpeta llamada npm en \Users\nombre-usuario\AppData\Roaming)
4. Examinar ejemplo1-node.js y realizar en orden todos los ejemplos
5. Examinar servidor.js y realizar en orden todos los ejemplos
6. Examinar the Node Package Manager
	 instalar npm install underscore -g
	 actualizar módulos: npm update underscore
	 buscar módulos: npmjs.org
	 instalar módulos: npm install nombre-module
7. Instalar express
	npm install express
	Realizar todos los ejemplos del archivo node-express.js
8. Conectar a GitHub
	Realizar los ejemplos del archivo connect-git.js
9. Fabricar módulos
	ejemplo-module.js
	ej-modulo-server.js
10. Publicar módulos en npm
	crear package.json -> npm init
	crear una cuenta en npm -> npm adduser
	publicar módulo -> npm publish
	cambiar la versión -> npm publish
11. Mongodb
	instalar mongo (mongodb.org)
	npm install mongodb
	comprobar servicio y consola
	ejemplo1-mongo.js
	ejemplo1-mongo-consulta.js
	comprobar elementos desde consola mongo: show dbs / use nombre-db / show collections / db.user.find()
	ejemplo2-mongo-server.js (usamos la funcion getUser)

(Para los siguientes ejemplos se utiliza la libreria ntwitter. Consulta el API en https://github.com/AvianFlu/ntwitter)
(Para ver la estructura json de los tweets consultar: https://dev.twitter.com/overview/api/tweets)

12. Ejemplo para conectar al API de twitter: ejemplo-twitter/tw1.js
13. Insertar twits en la base de datos prueba: ejemplo-twitter/tw2-mongo.js
14. Leer twits de Mongo y publicarlos en la web: ejemplo-twitter/tw3-leerDeMongo.js.js
15. Leer twits en tiempo real y publicarlos en la web: ejemplo-twitter/tw4-leerDeMongoRT.js
16. Igual que el ejemplo anterior pero sin necesidad de actualizar: ejemplo-twitter/tw5-leerDeMongoRT-sinAct.js


