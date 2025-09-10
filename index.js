document.getElementById("btnCutCrop").addEventListener("click", async()=>{
   cortarImagen();//Se ejecuta la función
});

async function cortarImagen() {
   const { jsPDF } = window.jspdf;
   
   const divImgOrigen = document.getElementById('divImgOrigen');

   const opciones = {
      orientation: 'p', //l = landscape | p = portrait
      unit: 'mm',
      format: 'letter', //Formato de hoja de impresión
      putOnlyUsedFonts: true
   }

   margins = {
      top: 20,
      bottom: 20,
      left: 20,
      width: 522
   }

   let prop_archivo = {
      title: "PDF recortar imagen",
      subject: "Ejemplo Cut&Crop Image",
      author: "JChuc",
      keywords: "codeando con jc, marjasoft, ",
      creator: "Codeando con JC"
   }

   //Crear nuevo documento PDF
   const doc = new jsPDF(opciones);
   //Establecer las propiedades del documento generado
   doc.setProperties(prop_archivo);

   //Obtener el ancho de la página.
   var pageWidth = doc.internal.pageSize.width || doc.internal.pageSize.getWidth();
   //Obtener el largo de pagina
   var altopag = doc.internal.pageSize.getHeight() - 30;
   //Ocupar el 90 % del ancho total de la página
   var anchoParrafo = pageWidth * 0.90;

   var marginTop = 12;//Margen superior aplicable al documento PDF
   var marginLeft = 10;//Margen izquierdo aplicable al documento PDF
   
   //Sección de encabezado
   doc.setFontSize(14);//Establecer tamaño de fuente
   doc.text("Prueba de imagen. Cut&Crop", marginLeft, marginTop);//texto
   //Agregar el espaciado para el texto anterior.
   marginTop += fnObtenAlturaTexto(doc.getTextDimensions("Prueba de imagen. Cut&Crop").h);

   html2canvas(divImgOrigen, {
      //x,y. permiten obtener todo el contenido del div, aunque se requiera aplicar el scroll en el documento html para ver el contenido completo
      x: document.getElementById("divImgOrigen").scrollLeft,
      y: document.getElementById("divImgOrigen").scrollTop,
      scale: 1
   }).then(async (canvas) => {
      
      //Variables para colocar la imagen en el pdf
      let altoImg = (canvas.height * anchoParrafo) / canvas.width;
      var imgData = canvas.toDataURL();
      const finPag = altopag - marginTop;

      doc.setFontSize(9);
      doc.text(`Altura página: ${altopag}, Restante página: ${finPag}\rAltura Imagen: ${altoImg}\r`, marginLeft, marginTop);
      
      //Agregar el espaciado para el texto anterior.
      marginTop += fnObtenAlturaTexto(doc.getTextDimensions("Altura página\rAltura Imagen:").h);

      if (finPag < altoImg) {//el tamaño rebasa alto de página
         const canvasSup = await recortarImgPS(canvas);//Obtener imagen superior del canvas
         const canvasInf = await recortarImgPI(canvas);//Obtener imagen inferior del canvas

         visualizarRecorte(canvasSup, "corteImg1");
         visualizarRecorte(canvasInf, "corteImg2");

         doc.addImage(canvasSup, 'PNG', marginLeft, marginTop, anchoParrafo, altoImg/2, '', 'MEDIUM');//Agregar parte superior de la imagen al PDF

         marginTop = 12;//Reiniciar el margen superior

         doc.addPage();//Agregar una nueva página
         doc.addImage(canvasInf, 'PNG', marginLeft, marginTop, anchoParrafo, altoImg/2, '', 'MEDIUM');//Agregar parte inferior de la imagen al PDF
         
      } else {//imagen se puede colocar en la parte inferior de página
         doc.addImage(imgData, 'PNG', marginLeft, marginTop, anchoParrafo, altoImg, '', 'MEDIUM');
         marginTop += altoImg;//Aumentar el margen superior 
      }

      doc.save("imgcutandcrop.pdf");//guardar el archivo PDF
   });
}

async function recortarImgPI(canvasOrigen) {
   return new Promise((resolve, reject) => {
      var canvasInf = document.createElement("canvas");//Crear elemento  canvas
      const ctx = canvasInf.getContext('2d');
      
      const sourceX = 0;
      const sourceY = canvasOrigen.height / 2;
      const sourceWidth = canvasOrigen.width;
      const sourceHeight = canvasOrigen.height / 2;

      const destX = 0;
      const destY = 0;
      const destWidth = canvasOrigen.width;
      const destHeight = canvasOrigen.height / 2;

      canvasInf.id = 'canvasInferior';

      canvasInf.width = canvasOrigen.width;
      canvasInf.height = canvasOrigen.height/2;

      ctx.drawImage(canvasOrigen, sourceX, sourceY, sourceWidth, sourceHeight, destX, destY, destWidth, destHeight);
  
      //Agregar el elemento Canvas generado al Body del documento actual
      //document.body.appendChild(canvasInf);

      resolve(canvasInf.toDataURL());
   })
}

async function recortarImgPS(canvasOrigen) {
   return new Promise((resolve, reject) => {
      var canvasSup = document.createElement("canvas");
      const ctx = canvasSup.getContext('2d');
      
      const sourceX = 0;
      const sourceY = 0;
      const sourceWidth = canvasOrigen.width;
      const sourceHeight = canvasOrigen.height / 2;

      const destX = 0;
      const destY = 0;
      const destWidth = canvasOrigen.width;
      const destHeight = canvasOrigen.height / 2;

      canvasSup.id = 'canvasSuperior';

      canvasSup.width = canvasOrigen.width;
      canvasSup.height = canvasOrigen.height/2;

      ctx.drawImage(canvasOrigen, sourceX, sourceY, sourceWidth, sourceHeight, destX, destY, destWidth, destHeight);
  
      //Agregar el elemento Canvas generado al Body del documento actual
      //document.body.appendChild(canvasSup);

      resolve(canvasSup.toDataURL());
   })
}

//colocar el resultado del recorte en un elemento html
function visualizarRecorte(imgData, item) {
   var img = document.createElement('img');//crear elemento nueva imagen
   img.src = imgData;//El source, es el contenido de toDataURL()
   document.getElementById(item).appendChild(img); //Se agrega el elemento creado como hijo en el elemento html padre
}

function fnObtenAlturaTexto(altura) {
   return altura * 1.1;
}