# Recortar una imagen que rebasa el tamaño de una hoja para generar un documento PDF.


## Descripción

Se debe generar un archivo PDF haciendo uso de la librería jsPDF y html2canvas, sin embargo, al momento de que html2canvas genera la imagen, esta rebasa el tamaño máximo permitido de la página. Como solución, la imagen generada, es particionada en parte superior e inferior. La partición superior, es colocada en lo restante de la primera página y en la próxima página del documento, se coloca la parte inferior. 
Se utiliza HTML, Javascript, jsPDF, html2canvas y Bootstrap v5.3

Recuerda, codear, Codear es divertido !


## Índice

- [Instalación](#instalación)
- [Uso](#uso)
- [Créditos](#créditos)
- [Licencia](#licencia)


## Instalación

No se requiere instalación, solamente que los archivos esten ubicados en las rutas correctas dentro del directorio del ejemplo.
Para utilizar lo necesario de Bootstrap se hace desde la url CDN


## Uso


* Se solicita al usuario seleccionar una imagen. Se pueden seleccionar solamente una desde el explorador.
* Al seleccionar la imagen del explorador, se muestra la vista previa de cada imagen.
* Se presenta un input range, para modificar el porcentaje de calidad de compresión.
* Se muestra el porcentaje en número para el input range.
* Existe un botón para iniciar el proceso de compresión
* Se presenta la opción para descargar la imagen.


## Crédito

Código HTML y Javascript. Javier Chuc - CodeandoConJC

Bootstrap. 
Biblioteca multiplataforma o conjunto de herramientas de código abierto para diseño de sitios y aplicaciones web. 
https://getbootstrap.com/

## Licencia

MIT License

Copyright (c) 2023 Javier Chuc/CodeandoConJC

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.


