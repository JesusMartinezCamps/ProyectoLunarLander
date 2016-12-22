¡¡Importante!! Las funciones de __onmouseover__ y __onmouseout__ parecen no cargar correctamente en Chrome, pero en Firefox no da ese problema. (Explicado en el primer párrafo de "Añadidos y cambios").

El readme es practicamente identico an anterior, salvo por el último punto de __Añadidos y cambios__ .
# Documentación sobre el videojuego LunarLander, de Lenguaje de Marcas.
En este documento se detallan los aspectos mas relevantes sobre el proyecto del videojuego web Lunar Lander.
En la carpeta _Documentación de Proyecto_ está el .pdf que Lamiae pasó para usarlo como guía aunque la mayoría ha sido cambiado para intentar mejorar el diseño en la medida de lo posible, más adelante se detallan estos cambios. La documentación se divide en:

* Estructura de los directorios.
* Detalles de los _.html_.
* Detalles de los _.css_.
* Detalles sobre el tratamiento de las imágenes.
* __Añadidos y cambios__ respecto la ultima version tras añadir el _Javascript_.

## Estructura de los directorios:
El directorio principal es ProyectoLunarLander, en el esta la _Documentación de Proyecto_ donde esta guardado el .pdf que Lamie pasó como guía, y el directorio _lunarLanderJS_, con las tres páginas .html, y los directorios donde se guardan los archivos .css, .js, .img y .font.

## Detalles de los _.html_.
Hay tres _.html_, el  __index.html__ contiene el juego principal.
Las páginas __instrucciones.html__ y __about.html__ contienen la página con las instrucciones y la página de informacion respectivamente.
Todos los archivos estan debidamente comentados, de forma que sea mas facil identificar los bloques de código relacionados, como todo lo referente a un mismo menú. Con un mediaquery y dependiendo de la dimensión.

## Detalles de los _.css_.
Las páginas son __responsive__, esta hecho con medidas porcentuales y se adaptan al tamaño de la pantalla,  los objetos solo se hacen pequeños al encoger la pantalla en vertical, si se hace comprime en horizontal los objetos no se deforman.

Muchos menús tienen también una propiedad de _max-width/height_ para que tampoco se deformen demasiado en caso de que las medidas de alguna pantalla sean extremadamente grandes.
También he agrupado bloques de código entre comentarios que marquen el inicio y el fin como en los _.html_.


## Detalles sobre el tratamiento de las imágenes.
Aquí es donde más problemas han surgido, se deben a que en primer lugar traté de usar el material de la guía original, pero todas las imágenes tenian poca calidad y no eran simetricas, estaban pixeladas o con bordes de sierra, a demás no las unas con las otras. Faltaban una serie de imágenes pertenecientes a los menús, o estaban mal escritos..

Como resultado, todas las imágenes estan hechas desde cero, siguen un patron similar, tanto en color como en forma, todo el videojuego tiene un tono azul y plateado.


## Cambios tras añadir el Javascript.
La página se ha desarrollado haciendo las comprobaciones en un navegador Firefox actualizado, y al probarlo en Chrome las funciones de __onmouseover__ y __onmouseout__ parece que dan problema, por lo tanto y al haberlas en todas las opciones de los menús no se puede navegar por ellos, mientras que en Firefox no dan ningún problema.

Al empezar se creó la _branch_ __versionJS__ sobre la que se se trabajó en esta parte del proyexto hasta que finalmente todo funcionaba correctamente y se fusionó de nuevo con la rama Master.

A medida que se aprendia mas sobre JavaScript las ideas originales sobre los menús iban evolucionando, es algo que se nota especialmente en la estructura del HTML, ya que lo que empezó siendo un simple menú con los botones que vinculan a las otras dos páginas, y los botones que interactuan directamente sobre las opciones jugables, se convirtió en un menu principal que constaba de dos botones (uno para las _Opciones de juego_ con la posibilidad de reiniciar o reanudar partida, y otro para acceder a las páginas de informacin e intrucciones), al que mas tarde se le añadiria una tercera opción para acceder al cambio de dificultad.

Aquí es donde el proyecto se topó con la primera gran dificultad, debido a que hasta el momento con javascript solo sabia hacer que aparecieran o desaparecieran elementos, en ese momento era necesario que lo que primero era un menú con tres opciones (recordemos, __opciones de juego__ , __dificultad__ e __informacion__ ) tenia que transformarse en un menu con solo dos opciones (_reinicio_ y _reanudar partida_, _facil_ y _dificil_, _instrucciones_ e _informacion_ respectivamente).
En este punto no había mas inconveniente que mostrar dos de los tres divs al ejecutar funcion javascript que los mostraba, por lo que sólo se tuvo que crear mas funciones para cada posibilidad lo que con los conocimientos de aquel momento no fue mayor problema.

Fue en el momento de implementar los cambios para la versión movil donde, el mismo menú con tres opciones, tenian que pasar de estar desplegados de forma horitontal, a vertical para adaptarse al tamaño de la pantalla. Fue un error no haber pensado antes, porque por la falta de tiempo tenía que hacer que el mismo boton (por ejemplo el de pausar el juego) desplegara un mismo div de forma diferente según las dimensiones de la pantalla).

La forma de solucionarlo, y teniendo en cuenta que era la primera vez que programaba algo en este lenguaje, fue crear dos nuevas funciones, __menu2__ y __menu3__, que representan cada uno, la serie de instrucciones a ejecutar dependiendo del tamaño del menú a desplegar para cada boton, y creé un nuevo div en el HTML que ocupase el 100% del ancho y alto de la pantalla, para tener en todo momento una referencia segura de donde sacar las dimensiones, y que en cada una de las funciones __menu__ se comprobase el mañaño de dicho div, de ser mayor que __X__px se cargen las medidas para la version horizontal, y de ser menor que se carguen las de la version vertical.

Esta medida tiene un problema, al contrario que la página en general que se adapta a la pantalla en tiempo real, estos menús solo cambian de versión Horizontal y vertical al momento de su carga (el momento en que la funcin __menu__ ejecuta la comprobacin del ancho), por lo que el videojuego es responsive, y funciona para ambas versiones, salvo que los menús solo lo hacen al momento de cargar dicho menú.


__Añadidos jugables y ciertos cambios en la interfaz principal__ :
Todas las imágenes han sido comprimidas para optimizar su peso.

Se han cambiado ligeramente las velocidades para que en facil no vaya tan despacio como en el JS que se pasó de base, y la dificulta Dificil tiene la misma velocidad necesaria para que el aterrizaje sea bueno, pero con una gravedad mucho mayor.

Hay un contador tanto de aterrizajes efectuados correctamente como de los aterrizajes fallidos, si se hacen bien tres seguidos en la dificultad facil, la ventana de victoria cambia para permitirte pasar a la dificil, y si fallas cinco seguidos en la dificultad dificil, te permite bajar a facil.

Debido al panel de información diseñado con barras dinámicas para mostrar la información, la implementación de ese panel a la versión vertical era imposible (hacerlo mas pequeño sin mas no era viable por su tamaño) por lo que se divide en dos dejando a la nave desplazada hacia la izquierda en lugar de estar centrada. Como digo esta fue una decisión adrede.

Funcionalidades añadidas hay varias:
  - El .gif de la nave cambia segun se apriete el boton de fuel o no, y si tiene o no fuel en el deposito.
  - Hay dos barras en la _velocidad_, que representan la velocidad positiva o negativa a la que se mueve la nave.
  - Barra vertical que representa a la altura como ayuda para el aterrizaje.
  - Dos niveles de dificultad.
  - Imagen de nave destruida para el aterrizaje fallado.
  - Menús personalizados para el fin de la partida dependiendo de si se aterriza correctamente o no.
  - Menús personalizados para el fin de la partida, si se aterriza correctamente o incorrectamente un numero de veces seguidas y dependiendo de la dificultad.
  - Menús con animaciones.
  - Animaciones visuales al pasar el raton por encima de las opciones en los menus.
