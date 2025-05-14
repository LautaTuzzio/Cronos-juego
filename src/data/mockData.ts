// Mock data for the game
const mockData = {
  "civilizaciones": [
    {
      "id": "roma",
      "nombre": "Imperio Romano",
      "descripcion": "Una de las civilizaciones más influyentes de la historia occidental, que abarcó tres continentes y estableció las bases de la cultura, el derecho y la política moderna.",
      "imagen": "https://images.pexels.com/photos/2064827/pexels-photo-2064827.jpeg",
      "periodoHistorico": "753 a.C. - 476 d.C.",
      "eventos": [
        {
          "id": "roma_001",
          "titulo": "Fundación de Roma",
          "anio": "-753",
          "descripcionBreve": "Según la leyenda, Rómulo funda la ciudad de Roma tras matar a su hermano Remo.",
          "descripcionCompleta": "La mitología romana cuenta que la ciudad fue fundada por los gemelos Rómulo y Remo, hijos de la vestal Rea Silvia y el dios Marte, que fueron abandonados en el río Tíber y amamantados por una loba. Tras una disputa, Rómulo mató a Remo y nombró la ciudad en su honor.",
          "imagen": "https://images.pexels.com/photos/1797158/pexels-photo-1797158.jpeg",
          "importancia": "Este evento marca el inicio simbólico de la ciudad que se convertiría en el centro del mayor imperio de la antigüedad occidental."
        },
        {
          "id": "roma_002",
          "titulo": "Establecimiento de la República Romana",
          "anio": "-509",
          "descripcionBreve": "Tras la expulsión del último rey etrusco, se establece la República.",
          "descripcionCompleta": "El último rey de Roma, Tarquinio el Soberbio, fue expulsado tras el suicidio de Lucrecia, quien había sido ultrajada por el hijo del rey. Esto llevó al establecimiento de un nuevo sistema de gobierno donde el poder era compartido por dos cónsules elegidos anualmente y un senado.",
          "imagen": "https://images.pexels.com/photos/11801517/pexels-photo-11801517.jpeg",
          "importancia": "Estableció un sistema de gobierno con principios que influirían en las democracias modernas."
        },
        {
          "id": "roma_003",
          "titulo": "Conquista de la Galia por Julio César",
          "anio": "-58",
          "descripcionBreve": "Julio César completa la conquista de la Galia (actual Francia) tras ocho años de campaña.",
          "descripcionCompleta": "Entre el 58 y el 50 a.C., Julio César dirigió una serie de campañas militares contra los pueblos galos, expandiendo el territorio romano hasta el Atlántico y el Rin. Esta conquista le dio gran prestigio militar y político, fortaleciendo su posición en Roma.",
          "imagen": "https://images.pexels.com/photos/16487383/pexels-photo-16487383/free-photo-of-estatua-azul-campo-rural.jpeg",
          "importancia": "Expandió significativamente el territorio romano y catapultó el poder político de César."
        },
        {
          "id": "roma_004",
          "titulo": "Asesinato de Julio César",
          "anio": "-44",
          "descripcionBreve": "Julio César es asesinado en los idus de marzo por un grupo de senadores liderados por Bruto y Casio.",
          "descripcionCompleta": "Tras ser nombrado dictador perpetuo, César fue visto como una amenaza para la República. Un grupo de senadores conspiraron para asesinarlo, atacándolo con puñales durante una sesión del Senado el 15 de marzo del 44 a.C.",
          "imagen": "https://images.pexels.com/photos/5633645/pexels-photo-5633645.jpeg",
          "importancia": "Su muerte desencadenó una serie de guerras civiles que llevarían al fin de la República y el surgimiento del Imperio Romano."
        },
        {
          "id": "roma_005",
          "titulo": "Augusto establece el Imperio Romano",
          "anio": "-27",
          "descripcionBreve": "Octavio, sobrino y heredero de César, recibe el título de Augusto y establece el Imperio Romano.",
          "descripcionCompleta": "Tras derrotar a Marco Antonio y Cleopatra en la batalla de Accio, Octavio consolidó su poder. En el 27 a.C., el Senado le concedió el título de Augusto y poderes extraordinarios, marcando el fin de la República y el inicio del periodo imperial.",
          "imagen": "https://images.pexels.com/photos/2832083/pexels-photo-2832083.jpeg",
          "importancia": "Inició la Pax Romana, un periodo de relativa paz y prosperidad que duró más de 200 años."
        }
      ]
    },
    {
      "id": "grecia",
      "nombre": "Antigua Grecia",
      "descripcion": "Cuna de la democracia y la filosofía occidental, la civilización griega estableció las bases del pensamiento, arte y ciencia modernos.",
      "imagen": "https://images.pexels.com/photos/164336/pexels-photo-164336.jpeg",
      "periodoHistorico": "1200 a.C. - 146 a.C.",
      "eventos": [
        {
          "id": "grecia_001",
          "titulo": "Guerra de Troya",
          "anio": "-1200",
          "descripcionBreve": "Conflicto entre aqueos y troyanos narrado por Homero en la Ilíada.",
          "descripcionCompleta": "Aunque mezclada con elementos mitológicos, los arqueólogos han confirmado que hubo un conflicto histórico en esta época. La ciudad de Troya (en la actual Turquía) fue destruida aproximadamente en 1180 a.C.",
          "imagen": "https://images.pexels.com/photos/842947/pexels-photo-842947.jpeg",
          "importancia": "Este conflicto marcó el fin de la Edad del Bronce y el inicio de la Edad Oscura griega."
        },
        {
          "id": "grecia_002",
          "titulo": "Primera Olimpiada",
          "anio": "-776",
          "descripcionBreve": "Celebración de los primeros Juegos Olímpicos registrados en Olimpia.",
          "descripcionCompleta": "Los primeros Juegos Olímpicos documentados se celebraron en Olimpia en honor a Zeus. Se realizaban cada cuatro años, y durante su celebración se establecía una tregua sagrada entre las ciudades-estado griegas.",
          "imagen": "https://images.pexels.com/photos/3689877/pexels-photo-3689877.jpeg",
          "importancia": "Estableció una tradición que continúa hasta hoy y sirvió como sistema de datación en la antigua Grecia."
        },
        {
          "id": "grecia_003",
          "titulo": "Reformas de Solón en Atenas",
          "anio": "-594",
          "descripcionBreve": "Solón implementa reformas políticas y económicas en Atenas, sentando las bases de la democracia.",
          "descripcionCompleta": "Nombrado arconte con poderes especiales, Solón canceló las deudas que habían llevado a muchos atenienses a la esclavitud y creó un sistema de cuatro clases sociales basado en la riqueza, no en el nacimiento.",
          "imagen": "https://images.pexels.com/photos/5840882/pexels-photo-5840882.jpeg",
          "importancia": "Sus reformas pusieron los cimientos para el posterior desarrollo de la democracia ateniense."
        },
        {
          "id": "grecia_004",
          "titulo": "Batalla de Maratón",
          "anio": "-490",
          "descripcionBreve": "Los atenienses derrotan a los persas en la llanura de Maratón.",
          "descripcionCompleta": "Durante la primera invasión persa a Grecia, un ejército ateniense numéricamente inferior derrotó a los persas en la llanura de Maratón. Según la leyenda, un mensajero corrió desde el campo de batalla hasta Atenas para anunciar la victoria, muriendo tras dar la noticia.",
          "imagen": "https://images.pexels.com/photos/7268635/pexels-photo-7268635.jpeg",
          "importancia": "Primera gran victoria griega contra el Imperio Persa, preservando la independencia de Atenas."
        },
        {
          "id": "grecia_005",
          "titulo": "Edad de Oro de Pericles",
          "anio": "-450",
          "descripcionBreve": "Bajo el liderazgo de Pericles, Atenas alcanza su apogeo cultural y político.",
          "descripcionCompleta": "Durante esta época, Atenas se convirtió en el centro cultural del mundo griego. Se construyeron grandes obras arquitectónicas como el Partenón, y florecieron la filosofía, el teatro y las artes, con figuras como Sócrates, Sófocles y Fidias.",
          "imagen": "https://images.pexels.com/photos/106244/pexels-photo-106244.jpeg",
          "importancia": "Periodo de máximo esplendor cultural y político de Atenas, con avances que definirían la civilización occidental."
        }
      ]
    },
    {
      "id": "francia",
      "nombre": "Revolución Francesa",
      "descripcion": "Periodo de cambios sociales y políticos radicales que transformaron Francia y tuvieron un impacto profundo en toda Europa.",
      "imagen": "https://images.pexels.com/photos/69935/eiffel-tower-paris-panorama-view-69935.jpeg",
      "periodoHistorico": "1789 - 1799",
      "eventos": [
        {
          "id": "francia_001",
          "titulo": "Toma de la Bastilla",
          "anio": "1789",
          "descripcionBreve": "Manifestantes parisinos asaltan la fortaleza-prisión de la Bastilla, símbolo del poder real.",
          "descripcionCompleta": "El 14 de julio de 1789, una muchedumbre parisina asaltó la Bastilla, antigua fortaleza medieval utilizada como prisión, en busca de armas y municiones. Aunque solo quedaban siete prisioneros en su interior, el evento se convirtió en símbolo del levantamiento contra el absolutismo.",
          "imagen": "https://images.pexels.com/photos/819764/pexels-photo-819764.jpeg",
          "importancia": "Considerado el inicio simbólico de la Revolución Francesa y celebrado como fiesta nacional francesa."
        },
        {
          "id": "francia_002",
          "titulo": "Declaración de los Derechos del Hombre y del Ciudadano",
          "anio": "1789",
          "descripcionBreve": "La Asamblea Nacional aprueba un documento que establece los derechos fundamentales de todos los ciudadanos.",
          "descripcionCompleta": "Inspirada en la Declaración de Independencia de Estados Unidos y las ideas de la Ilustración, este documento proclamaba que los derechos naturales de los hombres son la libertad, la propiedad, la seguridad y la resistencia a la opresión. Estableció la igualdad de todos los ciudadanos ante la ley.",
          "imagen": "https://images.pexels.com/photos/6607387/pexels-photo-6607387.jpeg",
          "importancia": "Documento fundacional de los derechos humanos en la tradición continental europea."
        },
        {
          "id": "francia_003",
          "titulo": "Ejecución de Luis XVI",
          "anio": "1793",
          "descripcionBreve": "El rey Luis XVI es guillotinado tras ser condenado por traición.",
          "descripcionCompleta": "Tras el intento de fuga de la familia real a Varennes y el descubrimiento de su correspondencia secreta con potencias extranjeras, Luis XVI fue juzgado por la Convención Nacional, condenado por traición y guillotinado el 21 de enero de 1793 en la Plaza de la Revolución (actual Plaza de la Concordia).",
          "imagen": "https://images.pexels.com/photos/730618/pexels-photo-730618.jpeg",
          "importancia": "Simbolizó el fin definitivo de la monarquía absoluta en Francia y radicalizó la Revolución."
        },
        {
          "id": "francia_004",
          "titulo": "El Terror",
          "anio": "1793",
          "descripcionBreve": "Periodo de violencia política liderado por Robespierre y el Comité de Salvación Pública.",
          "descripcionCompleta": "Entre 1793 y 1794, el gobierno revolucionario dirigido por Maximilien Robespierre ejecutó miles de personas consideradas enemigas de la Revolución mediante juicios sumarios. La guillotina se convirtió en símbolo de este periodo, con ejecuciones públicas diarias en París.",
          "imagen": "https://images.pexels.com/photos/1831919/pexels-photo-1831919.jpeg",
          "importancia": "Mostró cómo los ideales revolucionarios podían derivar en extremismo y represión."
        },
        {
          "id": "francia_005",
          "titulo": "Golpe de Estado del 18 de Brumario",
          "anio": "1799",
          "descripcionBreve": "Napoleón Bonaparte toma el poder mediante un golpe de Estado, poniendo fin al Directorio.",
          "descripcionCompleta": "El 9 de noviembre de 1799 (18 de Brumario según el calendario revolucionario), Napoleón Bonaparte, con apoyo de su hermano Lucien y miembros descontentos del Directorio, disolvió la legislatura y estableció el Consulado, con él mismo como Primer Cónsul.",
          "imagen": "https://images.pexels.com/photos/4916025/pexels-photo-4916025.jpeg",
          "importancia": "Marcó el fin de la Revolución Francesa y el inicio de la era napoleónica."
        }
      ]
    }
  ]
};

export default mockData;