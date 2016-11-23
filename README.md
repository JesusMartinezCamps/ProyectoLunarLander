# Documentación sobre el videojuego LunarLander, de Lenguaje de Marcas.
En este documento detallo todos los aspectos referentes al proyecto hasta la fecha. He seguido el proyecto que Lamiae me pasó.
En la carpeta _Documentación de Proyecto_ aparece el .pdf que Lamiae me había parado para que hiciese la página, más adelante explico porque el resultado final es tan diferente, aunque manteniendo la esencia. He dividido la documentación en:

* Estructura de los directorios que he creado.
* Detalles de los _.html_.
* Detalles de los _.css_.
* Detalles sobre el tratamiento de las imágenes.

## Estructura de los directorios:
El directorio principal es ProyectoLunarLander, en el esta la _Documentación de Proyecto_ donde he guardado el .pdf que Lamie me pasó, y una carpeta de _Versiones_, dentro hay dos carpetas que guandan respectivamente las versiones _Horizontal_ y _Vertical_ del juego.

En cada una de las versiones, hay una carpeta .css que guarda dicho documento, una carpeta donde estan las imágenes, el icono del juego y el gif de la nave.

Una carpeta _font_ donde esta la fuente que me pidieron para el videojuego y una carpeta _js_ vacia para cuando haya que empezar con el.

## Detalles de los _.html_.
Hay tres _.html_, el de __index.html__ contiene el juego principal, en un futuro con JavaScript el __div__ con _id="invisible"_ estará centrado y aparecerá o desaparecerá cuando se abra el menú de pausa, a demás el icono cambiara entre Pausa y Play.
Las págians __instrucciones.html__ y __about.html__ cuentan con el atributo _viewport_ para que adapten automaticamente al tamaño de las letras al tamaño de la pantalla.

El de __instrucciones.html__ y el de __about.html__ son muy parecidos, solo cambia el texto y algunas medida, lo más significativo es que en el about el menú de la versión móvil, debido a su tamaño más pequeño y a que no cabía todo el texto, le he puesto un _scroll_ y se puede bajar con el dedo.
Estan todos comentados, señalando donde empiezan y acaban los bloques de código comunes, o señalando lineas importantes del _head_.

Una vez dentro del juego, se puede navegar entre las diferentes páginas con iconos.

La estructura del juego es:
* El fondo esta hecho con un pequeño recuadro repetido por todo el fondo en un _background-repeat_.
* Un div con un width del 100% y el gif de la nave centrado.
* Divs cuadrados para el planeta y la luna del fondo.
* Imágenes sueltas para los botones.
* Un div para el panel, y dentro diferentes Div para cada tipo de información.


## Detalles de los _.css_.
Las páginas son __responsive__, esta hecho con medidas porcentuales y se adaptan al tamaño de la pantalla,  los objetos solo se hacen pequeños al encoger la pantalla en vertical, si se hace comprime en horizontal los objetos no se deforman.

Muchos menús tienen también una propiedad de _max-width/height_ para que tampoco se deformen demasiado en caso de que las medidas de alguna pantalla sean extremadamente grandes.
También he agrupado bloques de código entre comentarios que marquen el inicio y el fin como en los _.html_.


## Detalles sobre el tratamiento de las imágenes.
Aquí es donde más problemas he tenido, se deben a que primero traté de usar lo que me habían dado, pero todas tenian muy poca calidad, estaban pixeladas o con bordes de sierra, a demás no combinaban nada. Faltaban los botones para el reinicio, el de las instrucciones y el de __about__, y el __propulsor__ estaba mal escrito.

Por lo tanto, traté de hacer los mismos desde 0, pero con el mismo estilo, y al acabar vi que no pegaban nada, por lo que finalmente hice esta "temática azul".

Me pasaron un fondo que era una imágen plana, cuando terminé de recortar las diferentes partes, vi que tampoco cuadraban mucho y no me parecía estético, por lo que busque todo el fondo por internet, solo usé las estrellas del fondo.

Lo mismo me pasó con la nave, que no era simétrica y no me parecía que quedara bien, por lo que terminé por coger una de internet, y cambié ciertas cosas y la pinté según el resto de la página, con tal de respetar la esencia de la original el fuego que la propulsa está hecho con el que me pasaron. Y aprobeché y la convertí en gif, en que se muestra sería su estado "off" y hay otro con más fuego para cuando se esté propulsando. Pero respeté la posición que me habían pedido para los botones.

Mantuve las barras horizontales y la posición para el panel de información, pero lo cambié por el mismo motivo estético que todo lo demás.
