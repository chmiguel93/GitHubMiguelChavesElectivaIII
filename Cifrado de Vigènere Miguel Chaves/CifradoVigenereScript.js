                         /*******************************************************************************
                         *                                                                             *
                         *                    UNIVERSIDAD DE CUNDINAMARCA                              *
                         *                             EXT CHIA                                        *
                         *                    Desarrollador: Miguel Chaves                             *   
                         *                    Semestre  X                                              *
                         *                    Electiva profesional III                                 *
                         *                                                                             *
                         *  Este programa permite cifrar una palabra o frase por medio del cifrado     *
                         *  Vigenere																   *	
                         *                                                                             *
                         *******************************************************************************/

window.onload = function()
{
	crea_escenario();// llama la funcion crea_escenario cuando ya ha cargado la página previamente
	
	var hor; //guarda los id's de las letras horizontales tecleadas
	var ver; //guarda los id's de las letras verticales tecleadas
	var Clave;

	nom_div("Clave").onkeyup = function(e) //añade evento onkeyup ala caja de texto Clave
	{
		Clave = nom_div("Clave").value;//captura el valor de la caja de texto
		Clave = Clave.replace(/\s/g,''); // quita los espacios
		CapturaClave(Clave);//llama a la funcion con el parametro Clave
		hor = CapturaClave(Clave); // captura lo que devuelve la funcion CapturaClave en la variable hor
	}

	nom_div("Palabra").onkeyup = function(e) //añade evento onkeyup ala caja de texto Clave
	{
		var palabra = nom_div("Palabra").value;//captura el valor de la caja de texto
		palabra = palabra.replace(/\s/g,'');
		CapturaPalabra(palabra);//llama a la funcion con el parametro Palabra
		ver = CapturaPalabra(palabra); //captura lo que devuelve la funcion CapturaPalabra en la variable ver
		BuscarInter(hor,ver,Clave,palabra); // llama a la funcion BuscarInter con los parametros hor y ver, clave y palabra

	}
}

var LetrasClave = []; //guarda las letras del encabezado horizontal
var LetrasPalabra = []; //guarda las letras del encabezado vertical


/*Segmento de código que permite crear la tabla de cifrado*/
function crea_escenario ()
{
	var txt = "<table id='Tabla' cellpadding='0' cellspacing='0'>";
	var ids = "";
	var col=0;	
	var letras = [];
	var conLetras ;

	for(var fil = 0; fil < 27; fil++)
	{
		txt += "<tr>";
		if(fil === 0)
		{
			for(col = 0; col < 27; col++)
			{
				if(col === 0)
				{
					txt += "<td>"+""+"</td>";
				}else
				{
					conLetras = 65+(col-1)+fil;
					LetrasClave [col-1] = String.fromCharCode(conLetras);
					letras = String.fromCharCode(conLetras);
					ids = fil + "_" + col;
					txt += "<td id = '"+(ids)+"' class = 'resaltar'>"+letras+"</td>";
				}							
			}
		}else
		{
			col =0;
			conLetras = 65+(fil-1);						
			LetrasPalabra [fil-1] = String.fromCharCode(conLetras);
			letras = String.fromCharCode(conLetras);

			ids =  fil + "_" + col;
			txt += "<td id = '"+(ids)+"' class = 'resaltar'>"+letras+"</td>";

			for(var c = 0; c < 26; c++)
				{
					conLetras = 65+c+(fil-1);
					if(conLetras > 90)
					{
						conLetras = (conLetras-65) % 26 + 65;
					}
					letras = String.fromCharCode(conLetras);

					ids =  fil + "_" + (c+1);
					txt += "<td id = '"+(ids)+"'>"+letras+"</td>";			
				}
		}		
		txt += "</tr>";
	}
		
	txt += "</table>";
	nom_div("Espacio").innerHTML = txt;
} // Fin funcion crea_escenario

function CapturaClave(Clave)
{
	var ClaveUsuario = Clave;
	var idCapturado = "";
	var Iguales = [];
	var Diferentes = [];
	var borrar;	

	ClaveUsuario = ClaveUsuario.toUpperCase();//convierte lo ingresado en mayuscula

	if(ClaveUsuario == "")//si la clave es vacia (el usuairo no ingreso nada)
	{
		for(var j=0; j<LetrasClave.length; j++)
		{
			var id1 = "0"+"_"+(j+1); //se le añade un id a Diferentes para usarlo mas adelante al aplicar estilos
			Diferentes[j] = id1;
		}
	}else //si el usuario si ingreso algo
	{
		for(var i = 0; i<ClaveUsuario.length; i++)//recorre claveusuario
		{
			for(var j=0; j<LetrasClave.length; j++)//recorre letrasclave
			{

				Diferentes[j] = idCapturado = "0"+"_"+(j+1);//se le añade al arreglo diferentes el id consegutivo
				if(ClaveUsuario[i] == LetrasClave[j])//si la clave del usuario es igual a alguna letra del arreglo letrasclave
				{
					idCapturado = "0"+"_"+(j+1);//se crea un id consecutivo
					Iguales[i] = idCapturado;//se le añade ese id a un arreglo llamado iguales	
					nom_div(Iguales[i]).className = "rojo";//añade el estilo rojo a cada id que sea igual al ingresado por el ususaio			
				}
			}
		}

		//ciclo para eliminar elementos que se encuentran iguales del arreglo "Diferentes"
		for(var a =0; a<Iguales.length; a++)
		{
			for(var b=0; b<Diferentes.length; b++)
			{
				if(Iguales[a] == Diferentes[b]) // si un valor de iguales es igual a un valor del arrelgo diferentes
				{
					Diferentes.splice(b,1);  //eliminamos el elemento que esta igual en los dos arreglos
				}
			}
		}
	}	
   
   // ciclo para recorrer el arreglo diferentes y aplciar el estilo resaltar, es usado cuando uno borra una letra entonces la devuelve a su estaod original
	for(var k=0; k<Diferentes.length; k++)
	{
		nom_div(Diferentes[k]).className = "resaltar";
	}
	return Iguales;// devuelve el contenido de la variable Iguales
}// Fin funcion CapturaClave


function CapturaPalabra(Palabra)
{
	var PalabraUser = Palabra;
	var idCapturadop = "";
	var Igualesp = [];
	var Diferentesp = [];

	PalabraUser = PalabraUser.toUpperCase();

	if(PalabraUser == "")//si la clave es vacia (el usuairo no ingreso nada)
	{
		for(var j=0; j<LetrasPalabra.length; j++)
		{
			var id2 = (j+1)+"_"+"0"; //se le añade un id a Diferentes para usarlo mas adelante al aplicar estilos
			Diferentesp[j] = id2;
		}
	}else
	{
		for(var i = 0; i<PalabraUser.length; i++)
		{
			for(var j=0; j<LetrasPalabra.length; j++)
			{
				if(PalabraUser[i] == LetrasPalabra[j])
				{
					idCapturadop = (j+1)+"_"+"0";
					Igualesp[i] = idCapturadop;
					nom_div(Igualesp[i]).className = "rojo";			
				}
				Diferentesp[j] = idCapturadop = (j+1)+"_"+"0";
			}
		}

		//ciclo para eliminar elementos que se encuentran iguales del arreglo "Diferentes"
		for(var a =0; a<Igualesp.length; a++)
		{
			for(var b=0; b<Diferentesp.length; b++)
			{
				if(Igualesp[a] == Diferentesp[b]) // si un valor de iguales es igual a un valor del arrelgo diferentes
				{
					Diferentesp.splice(b,1);  //eliminamos el elemento que esta igual en los dos arreglos
				}
			}
		}
	}

	// ciclo para recorrer el arreglo diferentes y aplciar el estilo resaltar, es usado cuando uno borra una letra entonces la devuelve a su estaod original
	for(var k=0; k<Diferentesp.length; k++)
	{
		nom_div(Diferentesp[k]).className = "resaltar";
	}
	return Igualesp;// devuelve el contenido de la variable Igualesp
}// Fin funcion CapturaPalabra


// busca la interseccion entre la letra horizontal y vertical pulsada
function BuscarInter(h,v,clave,palabra)
{
	var horizontal = h; // guarda id de teclas horizontales
	var vertical = v; // guarda id de teclas verticales
	var cl = clave; // guarda palabra clave sin espacios
	var pl = palabra; //guarda palabra a cifrar sin espacios
	var IdCodificado = [];
	var fila = []
	var columna = [];
	var a = 0;
	var b = 1;
	var PalabraCodificada = [];	
	var diferenciaC = cl.length - pl.length;
	var diferenciaP = pl.length - cl.length;

	nom_div("resultado").value ="Por favor ingrese solo letras";

// se transforman los id's en string para luego aplicar el metodo split
	horizontal = horizontal.toString();
	vertical = vertical.toString();

	horizontal = horizontal.split("_");// separamos por "_" 
	horizontal = horizontal.toString();// convertimos en string nuevamente para aplicar una vez mas el metodo split
	horizontal = horizontal.split(",");// separamos por ","  para identificar mas adelante fila y columna
	
	vertical = vertical.split("_");
	vertical = vertical.toString();
	vertical = vertical.split(",");

	if(cl.length >= pl.length)// clave mayor a palabra
	{
		//quita la cantidad de letras de diferencia entre al clave y la palabra
		cl = cl.split("");
		cl.splice(pl.length,diferenciaC); //ubicamos la cantidad de letras que se deben conservar y borramos de hay en adelante la cantidad que tiene diferencia
		cl = cl.join("");
		nom_div("Comparacion").innerHTML = "Clave: "+cl + "<br> Frase: "+ pl;
		Codificar();// llama funcion codificar

	}else // clave menor a palabra
	{
		var aumentada = [];
		var j = 0;
		var clafinal =  [];
		cl = cl.split("");

		for(var i=0; i<diferenciaP; i++)
		{
			if(cl[j] == undefined)
			{
				j = 0;
			}
			aumentada[i] = cl[j];
			j++;			
		}
		clafinal = cl.concat(aumentada);
		clafinal = clafinal.join("");
		console.log(clafinal);
		nom_div("Clave").value = clafinal;
		nom_div("Comparacion").innerHTML = "Frase: "+ pl +" <br> Clave: "+clafinal ;
		clafinal = CapturaClave(clafinal);// llama funcion codificar
		console.log("ultiima clase final" + clafinal);
		Codificar2(clafinal);
	}

	function Codificar()
	{
		//ciclo para identificar las filas (f) y columnas (c)
		for(var i=0; i<pl.length; i++)
		{
			fila[i] = vertical[a];
			a = a+2;
			columna[i] = horizontal[b];
			b = b+2;
			IdCodificado[i] = fila[i] + "_" + columna[i];
			PalabraCodificada[i] = nom_div(IdCodificado[i]).innerHTML;
			nom_div(IdCodificado[i]).className = "naranja";
		}

		PalabraCodificada = PalabraCodificada.join("");
		PalabraCodificada = PalabraCodificada.toLowerCase();
		nom_div("resultado").value = PalabraCodificada;
	}

	function Codificar2(cla)
	{
		var horizontal = cla;

		horizontal = horizontal.toString();
		horizontal = horizontal.split("_");// separamos por "_" 
		horizontal = horizontal.toString();// convertimos en string nuevamente para aplicar una vez mas el metodo split
		horizontal = horizontal.split(",");

		//ciclo para identificar las filas (f) y columnas (c)
		for(var i=0; i<pl.length; i++)
		{
			fila[i] = vertical[a];
			a = a+2;
			columna[i] = horizontal[b];
			b = b+2;
			IdCodificado[i] = fila[i] + "_" + columna[i];
			PalabraCodificada[i] = nom_div(IdCodificado[i]).innerHTML;
			nom_div(IdCodificado[i]).className = "naranja";
		}

		PalabraCodificada = PalabraCodificada.join("");
		PalabraCodificada = PalabraCodificada.toLowerCase();
		nom_div("resultado").value = PalabraCodificada;
	}

} // fin función BuscarInter

//Funcion para evitar escribir todo el documen.getElementbyid
function nom_div(div)
{
	return document.getElementById(div);
}