                         /*******************************************************************************
                         *                                                                             *
                         *                    UNIVERSIDAD DE CUNDINAMARCA                              *
                         *                             EXT CHIA                                        *
                         *                    Desarrollador: Miguel Chaves                             *   
                         *                    Semestre  X                                              *
                         *                    Electiva profesional III                                 *
                         *                                                                             *
                         *  Este programa permite Codificar una letra o frase por medio del codigo     *
                         *  Espejo                                                         			   *
                         *                                                                             *
                         *******************************************************************************/
window.onload = function()
{
	/*Segmento de código que permite codificar una palabra o frase*/
	var Codificar = function(PalabraUsuario)
	{		
		//Declaración de variables	
		var PalabraCodificada = [""];
		var Letras1 = ["a","b","c","d","e","f","g","h","i","j","k","l","m"];
		var Letras2 = ["z","y","x","w","v","u","t","s","r","q","p","o","n"];
		var patron = /\d/;//expresion regular que busca un digito
		var Validacion = patron.test(PalabraUsuario); //si todo son letras devuelve un valor falso

		if(PalabraUsuario == 0 || PalabraUsuario == null)//valida si no se han ingresado datos
		{
			nom_div("Palabra").className = "blanco";
			nom_div("Resultado").innerHTML = "";
		}else
		{
			if(Validacion)//pregunta si validacion es verdadero
			{
				nom_div("Palabra").className = "nocumple";
				nom_div("Resultado").innerHTML = "Por favor ingrese solo letras";
			}else
			{
				nom_div("Palabra").className = "cumple";
				
				PalabraUsuario = PalabraUsuario.toLowerCase();// convierte lo ingresado por el usuario en minusculas

				for(var i = 0; i < PalabraUsuario.length; i++)
				{
					for(var j = 0; j < Letras1.length; j++)
					{
						if(PalabraUsuario[i] == Letras1[j])
						{
							PalabraCodificada[i] = Letras2[j];
						}
						else 
						{
							if(PalabraUsuario [i] == Letras2[j])
							{
								PalabraCodificada[i] = Letras1[j];
							}else
							{
								if(PalabraUsuario[i] == " ")
								{
									PalabraCodificada[i] = " ";
								}
							}						
						}
					}//fin ciclo j
				}//fin ciclo i

			PalabraCodificada = PalabraCodificada.join(""); // convierte el arreglo Palabra Codificada en un string que se muestra sin comas
			nom_div("Resultado").innerHTML = PalabraCodificada; // imprime la palabra ya codificada en la div Resultado
			}	
		}
	}
	
	// Llama a la funcion codificar cuando el usuariodeje de oprimir una tecla
	nom_div("Palabra").onkeyup = function(e)
	{
		var Palabra1 = nom_div("Palabra").value;//captura la palabra que el usuario ingreso
		Codificar(Palabra1);//llama a la funcion con el parametro Palabra 1
	}

	//Funcion para evitar escribir todo el documen.getElementbyid
	function nom_div(div)
	{
		return document.getElementById(div);
	}
}



























